# Portfolio v2 — production migration notes

**Release name:** Portfolio v2  
**Migration date:** November 11, 2026  
**Repository:** `magregory1998/magregory1998.github.io`  
**Branch:** `main`  
**Moved from:** `design-preview/` → **repository root** `/`  
**Preview URL:** https://magregory1998.github.io/design-preview/  
**Production URL:** https://magregory1998.github.io/  
**Prior production state (Git commit):** `2f55ba49b7dd10f87f563b1e14cbff2058398786`

## What moved

The complete six-page Portfolio v2 design-preview site was copied to the production root:
- `design-preview/index.html` → `index.html`
- `design-preview/about.html` → `about.html`
- `design-preview/projects/{floor,fire,accident,medical}.html` → `projects/{floor,fire,accident,medical}.html`
- `design-preview/assets/style.css` → `assets/style.css`
- `design-preview/assets/site.js` → `assets/site.js`
- `design-preview/assets/img/` → `assets/img/` (all existing available assets, including the sharp portrait files)

No preview-source content, filenames, typography, metrics, or styling were intentionally edited during the copy. Relative asset and page paths work from both the preview and production locations. The `design-preview/` source remains available for future cleanup.

## Older case study URLs

Existing production case study addresses redirect to the new Portfolio v2 routes:
- `projects/floor-planning.html` → `projects/floor.html`
- `projects/fire-emergency.html` → `projects/fire.html`
- `projects/accident-reconstruction.html` → `projects/accident.html`
- `projects/medical-healthcare.html` → `projects/medical.html`

Because GitHub Pages is static, these are HTML meta-refresh redirects, not HTTP 301 responses.

## Rollback and future cleanup

The previous production files remain recoverable from Git history at `2f55ba49b7dd10f87f563b1e14cbff2058398786`. Any later content, accessibility, mobile-layout, SEO, and legacy-asset cleanup should occur after this **Portfolio v2** promotion, not be mixed into it.

Created during the direct `main`-branch production overwrite. GitHub Pages publication may lag behind the commit.
