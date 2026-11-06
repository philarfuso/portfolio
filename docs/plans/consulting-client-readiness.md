# Consulting client-readiness plan

Status: planning only, November 6, 2026. No consulting page or sales-kit implementation has been made in this branch.

This public-safe handoff describes the next proposed delivery. The owner's complete planning context and execution prompt are transferred separately; do not commit private planning files or personalized sales drafts to this public repository.

## Verify the project before implementation

The audited repository is `philarfuso/portfolio`, `main` at `d7f89f84ffe934f3ff82badbf1d2f38d220dcd31` (`feat: add consulting availability and update resume PDF`). It was cloned from GitHub for an audit, not discovered as a pre-existing working project on Windows.

The intended website is `www.philarfuso.me`. Deployment parity has **not** been verified. On the Mac, locate the real working checkout, inspect uncommitted/unpushed work and its remote, and confirm that this repository actually powers that site before implementing anything. Preserve newer work and reconcile the plan with it.

## Proposed delivery

Build a consulting page in the existing portfolio and prepare reusable, editable sales materials. Manual profile updates, sending messages and domain activation can follow implementation. Keep automatic qualification extraction and expanded CRM features outside this batch.

### Public consulting experience

- Add `/consulting` in the existing App Router application.
- Present three distinct offers: implementation/agency capacity, ongoing technical ownership and a bounded application assessment.
- Explain problems addressed, concrete deliverables, boundaries, collaboration process and next step.
- Reuse existing public MEMX, Domani and Iffer's Pictures proof with accurate contribution/shared-ownership wording. Link to their current case-study routes; do not invent outcomes, testimonials or new client permissions.
- Use the existing `profile.consulting.email` for clear email CTAs with safely encoded optional offer context. Display the address as a fallback; do not claim a message was sent or a call booked.
- Add Consulting to desktop/mobile navigation, link from the existing availability area, and make the consulting contact path clear without removing general contact choices.
- Add route metadata/canonical behavior and public-route discovery consistent with the configured site URL.
- Preserve the existing visual language, home artwork, case-study themes, resume and reduced-motion behavior. No new branding system or separate website project is needed.

### Domain proposal, not an activated setting

Use `www.philarfuso.me/consulting` as the primary destination. The proposed later arrangement is a redirect from `philstackcoding.com` to that route, rather than two separately maintained or indexed copies. Hosting provider, DNS, TLS and redirect activation require verification and separate authorization. No host-dependent application or DNS change is included in this branch.

### Editable sales kit

Prepare draft positioning/profile copy, a service menu, search queries, recruiter/application introductions, three offer-specific outreach variants, contextual follow-ups, a discovery framework, three proposal/SOW starting points, and an assessment-to-follow-on engagement framework.

A small offline export command can produce version-labelled text templates and a manifest from generic templates/public offer definitions. Do not build a CMS, personalized AI composer, sales-document database, billing system or sending integration for this delivery.

- Require an explicit output directory **outside the entire repository**.
- Resolve real existing ancestors before writing, including symlinks/Windows junctions; reject in-repository destinations even if empty.
- Reject non-empty destinations and preserve earlier personalized exports.
- Keep client fields visibly unresolved rather than inventing facts or commercial terms.
- Export/copy never records an actual contact, proposal delivery, acceptance, revenue or capacity commitment.
- Public-safe generic templates may be committed. Personalized drafts, commercial assumptions, private proof notes and full internal execution records must stay outside this public checkout and web bundle.

## Verified extension points

- `src/content/profile.ts`: existing consulting availability and business email.
- `src/content/projects.ts` and `src/content/case-studies/`: current public proof.
- `src/components/site-header.tsx`: desktop/mobile navigation and current-page state.
- `src/app/page.tsx`: existing consulting availability entry point.
- `src/app/contact/page.tsx`: general contact channels to preserve.
- `src/app/layout.tsx`, `src/lib/site-url.ts`: configured metadata origin and hostname normalization.
- `src/app/globals.css`: established tokens, typography, motion and responsive rules.

Proposed additions: `src/content/consulting.ts`, `src/app/consulting/page.tsx`, public sitemap/robots files if still absent, `scripts/export-consulting-kit.mjs`, generic template sources and focused tests. Exact paths can follow current conventions after the Mac checkout is reconciled.

At audit time this project uses Next.js 16.3.3, React 19.2.8, Node >=24 and npm 11.11.0 with `package-lock.json`. Use its own workflow, not another project's package manager/framework versions. Read `AGENTS.md`, `CLAUDE.md` and the installed Next.js guides before coding.

## Batches

1. **N0: baseline and content contract.** Reconcile the actual Mac checkout and hosting relationship, refresh relevant source facts and freeze the accepted scope privately.
2. **N1: consulting experience.** Add the route, public content/proof, navigation/contact links and metadata.
3. **N2: sales kit.** Prepare generic templates, deterministic safe export, private personalized drafts and activation instructions. Can run alongside page work after shared offer definitions are stable.
4. **N3: integrated verification and handoff.** Verify behavior/content/privacy and prepare reviewable changes with independent review.

## Acceptance and verification

- An unauthenticated visitor can understand all three offers and use a real contact destination; core content/links work without JavaScript.
- Existing Work, Resume, Contact and case-study routes remain functional.
- Proof is source-grounded, missing proof is omitted, and private details do not enter rendered HTML, public commits or bundles. Use synthetic sentinels in privacy tests.
- Route metadata/site-origin normalization and real public sitemap links are correct.
- Check desktop and narrow mobile layouts, keyboard use, reduced motion and overflow.
- Exercise actual exporter outputs and failure boundaries, including non-empty destinations and aliased in-repository paths. Do not rely solely on source-regex assertions.
- Use existing `npm run verify` checks and meaningful additional tests. Block analytics/vendor traffic in automated QA; do not send a real email as a test.
- Keep the full scope, private execution record and internal QA report outside this public checkout using execute-plan's private-storage exception. A sanitized product patch-note report can be committed separately.

## Execution boundaries

This is not an instruction to start implementation automatically. Use the owner's separate execute-plan prompt when authorized. Review branches/PRs must preserve unrelated work. Merges, production deployment, DNS changes, external profile updates and sending outreach require separate authorization. Do not modify the private opportunity-tracking application's authentication, database or records for this website delivery.
