# Phil Arfuso Portfolio

A focused portfolio landing page built with Next.js, TypeScript, and Tailwind CSS.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run verify
```

## Consulting drafts

`/consulting` presents the services defined in `src/content/consulting.ts`.
The business email comes from `src/content/profile.ts`. Public copy and generic
templates contain no client-specific commercial terms.

With Node 24 and npm 11, export editable Markdown drafts offline:

```bash
npm run consulting:kit -- --output /absolute/path/outside-this-checkout/empty-kit
```

Choose a new or empty directory outside the entire checkout. In-checkout paths,
including symlink or junction aliases, and non-empty destinations are rejected.
The export includes 14 draft documents and a versioned checksum manifest. Fill
the `[[NAMED_FIELDS]]`, remove unsupported claims, and review before use. Keep
personalized copies outside this public repository. Future exports do not update
earlier copies. Exporting does not send messages or update any pipeline.

The approved resume is served from `public/resume.pdf`.

Set `NEXT_PUBLIC_SITE_URL` to the deployed hostname or origin so social image
URLs resolve correctly. Both `www.philarfuso.me` and
`https://www.philarfuso.me` are accepted. Local development falls back to
`http://localhost:3000`.

SiteBehaviour analytics is enabled automatically in production builds and is
disabled during local development.
