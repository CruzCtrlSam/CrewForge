# CrewForge

CrewForge is a static demo app for crew timesheets, production tracking, jobs, and office review workflows.

Tagline: Crew time and job progress, forged into one.

## What This Demo Shows

- Operating areas: Rebar Fabrication, Solar Piles Fabrication, Rebar Installation
- Foreman view with simplified timesheets and production updates
- Office view with dashboard, timesheet review, production, jobs, deliverables, and people setup
- Trial access screen with demo codes for foreman, payroll, management, and admin views
- Responsive layout adjustments for phone, tablet, and desktop review
- Production entries collect both total amount and total weight, then calculate completed weight
- Redesigned production cards with grouped setup, progress, delay, and remove actions
- Production job filter also controls the default job for new production entries
- Bilingual English/Spanish labels
- Local demo data saved in the browser with `localStorage`
- PDF-style export using the browser print dialog

## Trial Access Codes

- `LIDIO` - Lidio Barron foreman view
- `HUGUER` - Huguer Vazquez foreman view
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
- `.nojekyll` - lets GitHub Pages serve the static files directly

## Publish With GitHub Pages

1. Create a new GitHub repository.
2. Upload these files and folders to the root of the repo:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets/`
   - `.nojekyll`
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

This is a front-end prototype. It does not yet have real logins, a server database, or true permissions. For a production version, CrewForge would need hosted authentication, role-based access control, and server-side records for payroll and management reporting.
