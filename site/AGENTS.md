# Site guidance

Follow the root [validation and delivery policy](../AGENTS.md#validation-and-delivery).
Commit agent-guidance updates only when intentional and relevant to the requested
work. Keep unrelated generated edits, including `next-env.d.ts` and agent-guidance
files, out of trip changes.
The managed block's generic recommendation to commit it with other work does
not authorize unrelated generated edits; this repository policy takes precedence.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
