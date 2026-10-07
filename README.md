# Varshil Shah Portfolio

React portfolio deployed through Netlify for **varshilshah.tech**.

- Repository: https://github.com/varshil1/varshil1.github.io
- Production branch: `master`
- Build command: `npm run build`
- Publish directory: `build`

## Run locally

From the project folder:

```powershell
npm ci
npm start
```

Open http://localhost:3000. On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`.

The committed `.npmrc` contains `legacy-peer-deps=true`. Keep it: older Material UI dependencies declare React 16/17 peers, while this portfolio uses React 18. This setting bypasses peer enforcement; it does not upgrade those dependencies.

## Deploy future updates

1. Make and review your changes locally.
2. Verify the production build (PowerShell):

   ```powershell
   $env:CI = 'true'
   npm run build
   Remove-Item Env:CI
   ```

   Stop and fix any build failure before continuing. The output is generated in `build/`.

3. Review and commit only the intended source/configuration changes:

   ```powershell
   git status --short
   git diff
   git add <files-you-changed>
   git commit -m "Describe the portfolio update"
   git push origin master
   ```

   Replace `<files-you-changed>` with actual paths. Do not commit dependencies, generated build output, or credentials.

4. Open the existing Netlify project and its **Deploys** page. With active builds, pushing to `master` starts a deployment automatically.
5. Confirm the deployment corresponds to your latest commit and finishes successfully. If needed, use **Trigger deploy > Deploy site**.
6. Open https://varshilshah.tech and check desktop/mobile layouts, theme toggle, navigation, animations, project links, resume download, and contact behavior.

## Netlify settings

Use the existing project connected to the custom domain rather than creating a duplicate.

| Setting | Value |
| --- | --- |
| Git provider | GitHub |
| Repository | `varshil1/varshil1.github.io` |
| Production branch | `master` |
| Base directory | Leave blank (repository root) |
| Package directory | Leave blank |
| Build command | `npm run build` |
| Publish directory | `build` |
| Functions directory | Leave default `netlify/functions`; this app does not require functions |
| Build status | Active builds |

The production branch is configured under **Continuous deployment > Branches and deploy contexts**, not in the build command or directory fields. UI labels may change.

No manual `NPM_FLAGS` environment variable is needed while the committed `.npmrc` is present. The runtime selector does not select the Git branch.

During the October 2026 troubleshooting session, Netlify selected Node 24.21.0/npm 11.19.0; local verification used Node 18.17.1/npm 9.6.7. These are recorded observations, not a recommendation to install the older local runtime. No Node version pin was added in these fixes.

## Fixes performed during deployment setup

### 1. Repository checkout failed on a submodule

Error:

```text
No url found for submodule path
'node_modules/.cache/gh-pages/https!github.com!varshil1!portfolio.git'
in .gitmodules
```

The repository had generated dependencies tracked, including a nested Git repository in the gh-pages cache. Netlify interpreted that entry as a submodule and failed before installing packages.

Completed fix (commit `76218f95`):

- Added `.gitignore` rules for `node_modules/`, `build/`, local previews, environment files, and `.netlify/`.
- Removed `node_modules/` and `build/` from Git tracking, keeping local files intact.
- Committed and pushed the cleanup to `master`.

The one-time cleanup command was:

```powershell
git rm -r --cached -- node_modules build
```

This is already done; do not repeat it as part of ordinary deployments. Netlify installs dependencies and generates the build itself.

### 2. Dependency installation failed with ERESOLVE

Error: `@material-ui/core@4.12.4` declares React 16/17 peers, but the project uses React 18.2.0.

Completed fix (commit `c743cf46`): added the project `.npmrc`:

```ini
legacy-peer-deps=true
```

Verification performed:

```powershell
npm install --dry-run --ignore-scripts --no-audit --no-fund
$env:CI = 'true'
npm run build
Remove-Item Env:CI
```

Dependency resolution and the local production build passed. The dry run checked resolution against the local installation; it was not a fresh Linux installation. Netlify's deploy log is the final check for its environment.

Longer term, migrate or replace legacy React dependencies so this compatibility setting can be removed.

### 3. GitHub authentication and repository redirect

The old remote `https://github.com/varshil1/portfolio.git` redirected to `https://github.com/varshil1/varshil1.github.io.git`. Pushes succeeded through that redirect. To update an older clone to the canonical URL:

```powershell
git remote -v
git remote set-url origin https://github.com/varshil1/varshil1.github.io.git
```

If authentication expires on Windows with Git Credential Manager installed:

```powershell
git credential-manager github login --username varshil1 --browser --force
git push origin master
```

Finish the browser login before retrying the push. Never put access tokens in repository files or remote URLs.

## Manual deployment fallback

Run `npm run build`, then upload the **build folder** through the existing Netlify project's manual deploy area. Upload the compiled output, not `src/` or the whole repository. Prefer Git deployments for normal updates so deployment history follows commits.

The package's `npm run deploy` script invokes the Netlify CLI, which requires separate installation and authentication. It is not required for the Git-based steps above.

## References

- [Netlify React setup](https://docs.netlify.com/build/frameworks/framework-setup-guides/react/)
- [Netlify dependency troubleshooting](https://docs.netlify.com/build/configure-builds/troubleshooting-tips/)
- [npm ci and project configuration](https://docs.npmjs.com/cli/v11/commands/npm-ci/)
