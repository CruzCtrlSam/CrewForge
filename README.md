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
- Optional production setup can be left unassigned when a job is created
- Wind Farm jobs do not require description, control code, or weight during job creation
- Optional production setup for weighted work can be started with a control code and completed later
- Payroll deliverables can be exported as CSV
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
- Optional Supabase-backed shared trial data so phone and office views can sync
- Bilingual English/Spanish labels
- Local demo data saved in the browser with `localStorage`
- PDF-style export using the browser print dialog

## Trial Access Codes

- `FOREMAN` - choose the foreman name after entering the code
- `PAYROLL` - payroll review view
- `MANAGER` - management read/review view
- `ADMIN` - admin setup view

## Files

- `index.html` - app entry point
- `styles.css` - visual styling
- `script.js` - app behavior and demo data
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

## Current Demo Limits

This is still a trial prototype. Supabase sync can share demo data across devices, but the trial codes are not true secure logins and the demo setup is not production-grade permission control. For real company use, CrewForge would need hosted authentication, row-level security, and server-side records for payroll and management reporting.
