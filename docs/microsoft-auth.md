# Microsoft authentication setup

Private journal HTML remains AES-encrypted on GitHub Pages. Plaintext React Server Component route payloads are removed after the build. Readers can authenticate with either the authorized Microsoft personal account or a private passcode. The Azure Function validates the chosen credential before deriving the requested page's key from the server-only master passphrase.

## 1. Microsoft app registration

Create an app registration with:

- **Supported account types:** Personal Microsoft accounts only
- **SPA redirect URI:** `https://muyangamigo.github.io/travel-log/auth/callback/`
- **Application ID URI:** `api://<application-client-id>`
- **Delegated scope:** `PrivateJournal.Read`

The site uses authorization-code flow with PKCE. Do not create or store a client secret.

## 2. Azure Function

Create a Node.js 22 Azure Function app and configure these application settings:

| Setting | Value |
| --- | --- |
| `MICROSOFT_CLIENT_ID` | Application (client) ID from the app registration |
| `ALLOWED_MICROSOFT_SUB` | Immutable `sub` claim of the authorized personal account |
| `ALLOWED_ORIGIN` | `https://muyangamigo.github.io` |
| `TRAVEL_LOG_PRIVATE_PASSWORD` | Server-only master passphrase; exactly the same value as the GitHub Actions secret |
| `TRAVEL_LOG_PRIVATE_PASSCODE` | A separate private passcode of at least 12 characters |

Obtain the account's `sub` claim during a controlled local bootstrap, then set it as `ALLOWED_MICROSOFT_SUB` before exposing the Function. Microsoft documents `sub` as immutable; email and `preferred_username` claims are never used for authorization.

The private passcode must not match `TRAVEL_LOG_PRIVATE_PASSWORD`. The passcode is sent only to the HTTPS Function for scrypt-based constant-time validation and is never embedded in the static site or used directly as an encryption key. Failed attempts are durably limited to five per source per 15-minute window in the Function app's `AzureWebJobsStorage` table account.

The Microsoft callback returns its bearer token once in the private page's URL fragment. The gate removes the fragment before calling the Function and never stores the bearer token in origin-scoped Web Storage.

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
