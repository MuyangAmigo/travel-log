# Microsoft authentication setup

Private journal HTML remains AES-encrypted on GitHub Pages. Plaintext React Server Component route payloads are removed after the build. Readers can authenticate with either the authorized Microsoft personal account or a private passcode. The Azure Function validates the chosen credential before deriving the requested page's key from the server-only master passphrase.

## 1. Microsoft app registration

Create an app registration with:

- **Supported account types:** Personal Microsoft accounts only
- **SPA redirect URI:** `https://muyangamigo.github.io/travel-log/auth/callback/`
- **Application ID URI:** `api://<application-client-id>`
- **Delegated scopes:**
  - `PrivateJournal.Read` for unlocking encrypted trip pages
  - `TravelJournal.Edit` for owner-only editor operations

The site uses authorization-code flow with PKCE. Do not create or store a client secret. These scopes are requested in separate flows: a private-trip sign-in requests only `PrivateJournal.Read`, while an editor sign-in requests only `TravelJournal.Edit`.

## 2. Azure Function

Create a Node.js 22 Azure Function app and configure these application settings:

| Setting | Value |
| --- | --- |
| `MICROSOFT_CLIENT_ID` | Application (client) ID from the app registration |
| `ALLOWED_MICROSOFT_SUB` | Immutable `sub` claim of the authorized personal account |
| `ALLOWED_ORIGIN` | `https://muyangamigo.github.io` |
| `TRAVEL_LOG_PRIVATE_PASSWORD` | Server-only master passphrase; exactly the same value as the GitHub Actions secret |
| `TRAVEL_LOG_PRIVATE_PASSCODE` | A separate private passcode of at least 12 characters |
| `GITHUB_REPOSITORY` | `MuyangAmigo/travel-log`; the editor API never accepts a repository from the browser |
| `GITHUB_APP_ID` | Repository-scoped editor GitHub App ID |
| `GITHUB_APP_INSTALLATION_ID` | Installation ID for that app on this repository |
| `GITHUB_APP_PRIVATE_KEY` | Server-only PEM private key; use `\n` escapes in a single-line Function setting |
| `AZURE_OPENAI_ENDPOINT` | HTTPS endpoint for the translation resource |
| `AZURE_OPENAI_DEPLOYMENT` | Deployment that supports strict structured outputs |
| `AZURE_OPENAI_API_VERSION` | Optional; defaults to `2024-10-21` |
| `AZURE_OPENAI_API_KEY` | Optional local-development fallback; omit in Azure to use the Function's managed identity |
| `AZURE_STORAGE_ACCOUNT_NAME` | Must be `junjieblob` |
| `AZURE_STORAGE_CONTAINER_NAME` | Must be `images` |
| `AZURE_CLIENT_ID` | Optional client ID only when the Function uses a user-assigned managed identity |

Production uses the `junjie-travel-log-openai` resource in East US 2 with a Global Standard `gpt-5-mini` deployment named `travel-journal-translation`. Local key authentication is disabled on that resource.

Obtain the account's `sub` claim during a controlled local bootstrap, then set it as `ALLOWED_MICROSOFT_SUB` before exposing the Function. Microsoft documents `sub` as immutable; email and `preferred_username` claims are never used for authorization.

The API validates the delegated `scp` claim for each endpoint. The unlock endpoint requires `PrivateJournal.Read`. Every editor endpoint uses the shared editor authorizer, which requires both `TravelJournal.Edit` and an exact match with `ALLOWED_MICROSOFT_SUB`. The private passcode remains an unlock-only fallback and never authorizes editing.

The private passcode must not match `TRAVEL_LOG_PRIVATE_PASSWORD`. The passcode is sent only to the HTTPS Function for scrypt-based constant-time validation and is never embedded in the static site or used directly as an encryption key. Failed attempts are durably limited to five per source per 15-minute window in the Function app's `AzureWebJobsStorage` table account.

The Microsoft callback keeps the bearer token in `sessionStorage` for the lifetime of the current browser tab, then returns to the requested private page. Other private entries opened in that tab reuse the valid token and unlock without another sign-in. Closing the tab ends the journal session; the token is never persisted in `localStorage` or a cookie. The gate clears expired, rejected, and malformed sessions.

The same callback supports the editor flow with `flow=editor` and records the requested delegated scope with the tab-scoped session. PKCE returns are restricted by flow: reader authentication can return only to a localized `/<locale>/trips/<slug>/` route, and editor authentication can return only to the exact static `/edit/` route (under the configured base path). Query strings and fragments are preserved, but same-origin subpaths are rejected.

Download the Function app publish profile and add it as the repository secret `AZURE_FUNCTION_PUBLISH_PROFILE`.

## 3. GitHub repository configuration

Add these Actions values:

| Kind | Name | Value |
| --- | --- | --- |
| Variable | `MICROSOFT_CLIENT_ID` | Application (client) ID |
| Variable | `TRAVEL_LOG_AUTH_API_URL` | `https://<function-app>.azurewebsites.net/api/unlock` |
| Variable | `AZURE_FUNCTION_APP_NAME` | Azure Function app name |
| Secret | `TRAVEL_LOG_PRIVATE_PASSWORD` | Shared encryption passphrase used by the build and Function |
| Secret | `TRAVEL_LOG_PRIVATE_PASSCODE` | Recovery copy of the Function's separate private passcode |
| Secret | `AZURE_FUNCTION_PUBLISH_PROFILE` | Function app publish profile XML |

The GitHub Pages workflow serializes the entire promotion: it tests the API, builds the site artifact, deploys the Function, performs a real passcode-authenticated canary, verifies that Azure and GitHub derive the same page key, and only then deploys Pages. It refuses to emit private pages if any authentication setting is missing, malformed, or out of sync.

## Local production build

Run the Function locally with `api/local.settings.json`, then build the site with:

```bash
cd site
NEXT_PUBLIC_MICROSOFT_CLIENT_ID=11111111-2222-3333-4444-555555555555 \
NEXT_PUBLIC_MICROSOFT_REDIRECT_URI=http://localhost:3000/auth/callback/ \
TRAVEL_LOG_AUTH_API_URL=http://localhost:7071/api/unlock \
TRAVEL_LOG_PRIVATE_PASSWORD=test \
npm run build
```

Register `http://localhost:3000/auth/callback/` as an additional SPA redirect URI before testing an actual Microsoft login locally.

To test the editor authentication flow, expose `TravelJournal.Edit` on the same application registration and start PKCE with the editor flow, targeting `http://localhost:3000/edit/`. Granting `PrivateJournal.Read` alone must not authorize editor API requests.

For UI-only local testing before the editor scope and cloud dependencies are configured, run the loopback mock API:

```bash
cd site
npm run preview:editor-api
```

Then start the site in a second terminal with:

```bash
cd site
NEXT_PUBLIC_TRAVEL_LOG_EDITOR_PREVIEW=1 \
NEXT_PUBLIC_TRAVEL_LOG_EDITOR_API_URL=http://localhost:7072/editor \
npm run dev -- --webpack
```

This bypass is accepted only when `NODE_ENV=development`, the explicit flag is `1`, and the browser hostname is `localhost` or another loopback address. The mock server binds to `127.0.0.1`, loads only registered local trip documents, keeps simulated publishes in memory, and does not support image uploads. Production builds cannot enable this bypass.

## 4. Editor API

All routes require the exact configured browser origin, a Microsoft bearer token with `TravelJournal.Edit`, and the pinned immutable `sub`. `ALLOWED_ORIGIN` must use HTTPS; plain HTTP is accepted only for `localhost` or a loopback address during local development. Responses, including errors and preflights, use `Cache-Control: no-store`. The API accepts existing registered slugs only; it derives that allowlist from `site/src/lib/trips.ts` on the current `main` commit and never accepts a repository, branch, or path from the browser.

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/editor/trips` | List summaries and blob SHAs for registered structured documents |
| `GET` | `/api/editor/trips/{slug}` | Load one registered document with its base commit and blob SHA |
| `POST` | `/api/editor/trips/{slug}/translate` | Translate only the named Chinese field paths and merge validated English |
| `POST` | `/api/editor/trips/{slug}/uploads` | Issue a ten-minute create-only SAS for one normalized image filename |
| `POST` | `/api/editor/trips/{slug}/images/verify` | Verify uploaded size, MIME type, and blob availability |
| `POST` | `/api/editor/trips/{slug}/publish` | Verify all referenced images and atomically update the existing document on `main` |

Translation and publish bodies are limited to 2 MiB. Image uploads allow JPEG, PNG, WebP, GIF, and AVIF up to 50 MiB. Upload authorization is blob-scoped beneath `images/travel/<slug>/`, grants create permission only, and requires `If-None-Match: *`. Publishing requires `approved: true`, the loaded base commit SHA, and the loaded content blob SHA. Any intervening `main` or document change returns a conflict and creates no visible branch update.

Azure OpenAI receives only the requested Chinese localized fields with stable paths and ancestor IDs. A changed or new field may use an empty English draft value only while being translated. The strict structured response must return the same paths, IDs, order, and cardinality, and the merged document must contain complete non-empty bilingual text. A shape, schema, or translation failure leaves the draft uncommitted.

### GitHub App

Create a dedicated GitHub App with repository **Contents: read and write** and **Metadata: read-only** permissions. Install it only on `MuyangAmigo/travel-log`. Do not grant administration, pull request, workflow, or organization permissions. The Function exchanges a short-lived App JWT for an installation token, creates one blob/tree/commit, and advances `refs/heads/main` with `force: false`. Branch protection must explicitly allow this App if direct updates are protected.

### Managed identity and Storage CORS

Enable a system-assigned managed identity on the Function (or set `AZURE_CLIENT_ID` for a user-assigned identity). Assign **Cognitive Services OpenAI User** on the translation resource and **Storage Blob Data Contributor** at the `junjieblob` storage-account scope. The Function then obtains short-lived tokens for translation and image uploads without storing an Azure OpenAI key. Explicitly target:

- Subscription: `Visual Studio Enterprise Subscription`
- Subscription ID: `a0adf30d-bf1c-4bff-9a92-b6d937d0154f`
- Resource group: `junjieweb`
- Storage account: `junjieblob`
- Container: `images`

The Blob service CORS rule must allow the production origin and a separate local-development rule as needed. Permit `PUT`, allow `content-type`, `if-none-match`, `x-ms-blob-type`, and `x-ms-version`, and expose `etag`, `content-length`, and `content-type`. Do not enable account-key access for the Function.

For local uploads, run `az login`, select the subscription above, and let the Function host set `AZURE_FUNCTIONS_ENVIRONMENT=Development`; the API obtains a short-lived storage token from Azure CLI. Production uses only the Function managed-identity endpoint.
