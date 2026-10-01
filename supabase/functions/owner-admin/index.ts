import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const allowedRoles = new Set(["Admin", "Safety", "Quality"]);

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

function cleanCode(value: unknown) {
  return String(value || "").trim().toUpperCase();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return response({ ok: false, error: "Method not allowed" }, 405);

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const authorization = req.headers.get("Authorization") || "";
    const token = authorization.replace(/^Bearer\s+/i, "");
    if (!supabaseUrl || !serviceRoleKey || !token) return response({ ok: false, error: "Authentication required" }, 401);

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    const { data: authData, error: authError } = await admin.auth.getUser(token);
    if (authError || !authData.user) return response({ ok: false, error: "Invalid session" }, 401);

    const ownerAddress = (Deno.env.get("CREWFORGE_OWNER_EMAIL") || "sam@raicesadvisors.com").toLowerCase();
    const callerEmail = String(authData.user.email || "").toLowerCase();
    const isOwner = callerEmail === ownerAddress || authData.user.app_metadata?.is_owner === true;
    if (!isOwner) return response({ ok: false, error: "Owner access required" }, 403);

    const body = await req.json();
    const action = String(body?.action || "");

    if (action === "list") {
      const { data: companies, error: companiesError } = await admin
        .from("companies")
        .select("code,name,workspace_id,active,created_at")
        .eq("active", true)
        .order("name");
      if (companiesError) throw companiesError;

      const authUsers = [];
      let page = 1;
      while (true) {
        const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
        if (error) throw error;
        authUsers.push(...data.users);
        if (data.users.length < 1000) break;
        page += 1;
      }
      const users = authUsers
        .filter((user) => user.app_metadata?.company_code)
        .map((user) => ({
          id: user.id,
          email: user.email || "",
          display_name: user.app_metadata?.display_name || user.email || "",
          company_code: cleanCode(user.app_metadata?.company_code),
          role: allowedRoles.has(user.app_metadata?.role) ? user.app_metadata.role : "Safety",
          banned_until: user.banned_until || null,
          created_at: user.created_at
        }));
      return response({ ok: true, companies: companies || [], users });
    }

    if (action === "create_company") {
      const code = cleanCode(body?.company?.code);
      const name = String(body?.company?.name || "").trim();
      if (!/^[A-Z0-9-]{3,20}$/.test(code)) return response({ ok: false, error: "Company code must be 3-20 letters, numbers, or hyphens" }, 400);
      if (name.length < 2 || name.length > 120) return response({ ok: false, error: "Enter a valid company name" }, 400);
      const workspaceId = code === "VALOR" ? "crewforge-demo" : `crewforge-${code.toLowerCase()}`;
      const { data, error } = await admin
        .from("companies")
        .insert({ code, name, workspace_id: workspaceId, created_by: authData.user.id })
        .select("code,name,workspace_id,active,created_at")
        .single();
      if (error) {
        if (error.code === "23505") return response({ ok: false, error: "That company code already exists" }, 409);
        throw error;
      }
      return response({ ok: true, company: data }, 201);
    }

    if (action === "create_user") {
      const companyCode = cleanCode(body?.user?.companyCode);
      const displayName = String(body?.user?.displayName || "").trim();
      const email = String(body?.user?.email || "").trim().toLowerCase();
      const password = String(body?.user?.password || "");
      const role = String(body?.user?.role || "Safety");
      if (!companyCode || !displayName || !email.includes("@") || password.length < 10 || !allowedRoles.has(role)) {
        return response({ ok: false, error: "Complete the company, name, valid email, role, and a 10-character initial password" }, 400);
      }
      const { data: company, error: companyError } = await admin
        .from("companies")
        .select("code")
        .eq("code", companyCode)
        .eq("active", true)
        .maybeSingle();
      if (companyError) throw companyError;
      if (!company) return response({ ok: false, error: "Company not found" }, 404);

      const { data: created, error: createError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        app_metadata: { company_code: companyCode, role, display_name: displayName }
      });
      if (createError || !created.user) return response({ ok: false, error: createError?.message || "Account could not be created" }, 400);

      const { error: memberError } = await admin.from("company_members").insert({
        user_id: created.user.id,
        company_code: companyCode,
        email,
        display_name: displayName,
        role,
        created_by: authData.user.id
      });
      if (memberError) {
        await admin.auth.admin.deleteUser(created.user.id);
        throw memberError;
      }
      return response({ ok: true, user: { id: created.user.id, email, display_name: displayName, company_code: companyCode, role } }, 201);
    }

    return response({ ok: false, error: "Unknown owner action" }, 400);
  } catch (error) {
    console.error("owner-admin failed", error);
    return response({ ok: false, error: error instanceof Error ? error.message : "Owner request failed" }, 500);
  }
});
