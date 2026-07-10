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
- Production entries collect total amount, total weight, and amount completed, then calculate completed weight
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
