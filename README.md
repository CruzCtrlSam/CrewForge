# CrewForge

CrewForge is a static demo app for crew timesheets, production tracking, jobs, and office review workflows.

Tagline: Crew time and job progress, forged into one.

## What This Demo Shows

- Operating areas: Rebar Fabrication, Solar Piles Fabrication, Rebar Installation
- Foreman view with simplified timesheets and production updates
- Office view with dashboard, timesheet review, production, jobs, deliverables, and people setup
- Installation timesheets are selected by foreman; the matching crew fills automatically
- Field workers and foremen can still be borrowed into a week and have their role changed for that week
- Fabrication timesheets use day/night shifts instead of crews
- Fabrication roles include foreman, machine operator, helper, quality control, and cleaning
- Fabrication timesheets include light-duty checkboxes for each day
- Trial access screen with demo codes for foreman, payroll, management, and admin views
- Responsive layout adjustments for phone, tablet, and desktop review
- Updated CrewForge logo, favicon, and thumbnail assets from the latest logo PDF
- Separate post-login operating area icons for Rebar Fabrication and Solar Piles Fabrication
- Persistent CrewForge branding on login, area selection, sidebar, and app top bar
- Tablet-landscape layout adjusts earlier so iPad sideways view has more room for the work area
- Production entries collect total amount, total weight, and amount completed, then calculate completed weight
- Admin/payroll can add a job and optionally create the first production control-code item assigned to a foreman
- Job Documents tab lets admin/payroll upload job packets, safety plans, JHAs, permits, and inspection forms for foremen to view, download, or print
- Optional production setup can be left unassigned when a job is created
- Wind Farm jobs do not require description, control code, or weight during job creation
- Optional production setup for weighted work can be started with a control code and completed later
- Payroll deliverables can be exported as CSV
- Admin, payroll, and management can generate an Employee Report in Deliverables with totals, detail rows, PDF print, and CSV export
- Admin/payroll can enter hourly rates for employees in People / Crews or People / Shifts
- Admin/payroll can adjust crew members by adding/removing workers and editing roles/rates
- Weekly installation timesheets re-sync with the current default crew while preserving entered hours and borrowed workers
- Production submit is available near the top and bottom of the Production view when production items exist
- Installation jobs use a job-type dropdown: Wind Farm, T-line Substation, or Data Center
- Wind Farm installation jobs can generate foundation IDs, such as `T001` through `T082`, for foremen to pick from a dropdown
- Wind Farm production tracks Bottom Mat, Top, and Pedestal completion by foundation ID, with completed and partial foundation lists
- Rebar fabrication jobs use those same types plus Commercial
- Commercial jobs can define custom production tracking items with a name, unit, and total planned amount
- Solar Piles jobs use admin-maintained dropdown lists for client and saved job names
- Redesigned production cards with grouped setup, progress, delay, and remove actions
- Production job filter also controls the default job for new production entries
- Production entries can be submitted for office review
- Admin/payroll can update job status or delete trial jobs from the Jobs table
- Supabase-backed company workspaces so phone and office views can sync
- Owner-only company and account administration
- Separate offline browser storage for every company
- Bilingual English/Spanish labels
- Local demo data saved in the browser with `localStorage`
- PDF-style export using the browser print dialog

## Secure Access

1. Enter the company code or choose **Owner sign in**.
2. Sign in with the email and password assigned to the account.
3. Supabase Auth and Row-Level Security limit the account to its assigned company workspace.

The CrewForge owner can use **Companies & Accounts / Companias y cuentas** to create company workspaces and Admin, Safety, or Quality accounts. See `SUPABASE_SETUP.md` for deployment details.

## Files

- `index.html` - app entry point
- `styles.css` - visual styling
- `script.js` - app behavior and demo data
- `service-worker.js` - PWA offline cache (holds the `crewforge-vNN` cache name)
- `manifest.webmanifest` - PWA install metadata
- `assets/crewforge-app-icon.png` - app/sidebar icon
- `assets/crewforge-logo-lockup.png` - full logo lockup for the opening screen
- `assets/crewforge-favicon.png` - browser tab icon
- `assets/crewforge-thumbnail.png` - Rebar Installation operating area icon
- `assets/crewforge-rebar-fabrication.png` - Rebar Fabrication operating area icon
- `assets/crewforge-solar-piles.png` - Solar Piles Fabrication operating area icon
- `assets/crewforge-logo.png` - earlier logo concept kept as a fallback asset
- `SUPABASE_SETUP.md` - shared trial setup notes
- `.nojekyll` - lets GitHub Pages serve the static files directly

## Publish With GitHub Pages

1. Create a new GitHub repository.
2. Upload these files and folders to the root of the repo:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `service-worker.js`
   - `manifest.webmanifest`
   - `assets/`
   - `.nojekyll`
   - `SUPABASE_SETUP.md`
   - `README.md`
3. In GitHub, go to `Settings`.
4. Open `Pages`.
5. Under `Build and deployment`, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Save.
7. GitHub will provide a public link after it finishes publishing.

## Updating After a Code Change (Important)

This app is a PWA, so browsers cache `script.js` and `styles.css`. Whenever you
change either file, you must bump the version in **three** places or users will
keep seeing the old app:

1. `index.html` - `styles.css?v=NN` and `script.js?v=NN`
2. `service-worker.js` - `CACHE_NAME = "crewforge-vNN"`

Increment `NN` by one (e.g. `109` -> `110`) in all three spots, commit, and push.
The new URLs force browsers to fetch fresh files, and the new cache name forces
the service worker to re-install and drop the old cache.

## Deployment Notes

The static application is published through GitHub Pages, while authentication, company lookup, tenant-isolated records, and privileged account creation use Supabase. Run both SQL setup files and deploy the `owner-admin` Edge Function before using the owner console in production. Never place a Supabase secret or service-role key in the browser application.
