# Visual Explorer — Part 3: Loading, Empty & Error States

A responsive, plain HTML/CSS/JavaScript image-search app using the Wikimedia Commons API.

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a browser, or use VS Code Live Server.
3. Search for `cats`, `ocean`, `new york`, or `zxqwlk`.

## Part 3 checklist
- [x] Loading indicator appears before the `fetch()` request starts.
- [x] Loading state clears after the request completes.
- [x] Empty result list shows a clear no-results message.
- [x] `try...catch` handles request/API failures.
- [x] `response.ok` is checked before parsing the response.
- [x] Friendly error message is shown instead of a blank grid.
- [x] Result count is shown; cards fade in.
- [x] Responsive layout includes phone breakpoints.
- [x] Honors reduced-motion accessibility preference.
- [x] No frameworks, libraries, or build tools.

## Test the states
- **Loading:** search a term; the spinner and message appear while the request is in progress. For a longer visible pause, use DevTools Network throttling.
- **Empty:** search `zxqwlk` (or another nonsense term).
- **Error:** temporarily change the API hostname in `script.js` to an invalid hostname, reload, and search. Restore the original API URL after testing.
- **Mobile:** open the page in a narrow browser window or phone.

## Deploy free with GitHub Pages
1. Push this project to your **existing public Part 1/Part 2 repository**.
2. Create and push the requested feature branch:
   ```bash
   git switch -c part-3-polish-deploy
   git add .
   git commit -m "Add loading, empty and error states"
   git push -u origin part-3-polish-deploy
   ```
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save. (If the final code is merged into `main` through the PR, Pages will publish that version.)
6. Wait for GitHub Pages to publish. Your URL will look like:
   `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`
7. Open the live URL in a private/new browser window and on a phone to verify it.

## Pull request
Create a pull request from `part-3-polish-deploy` into `main`. Include both links in the PR description:

- Repository: `https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`
- Live app: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

Submit the pull request URL, which looks like:
`https://github.com/YOUR-USERNAME/YOUR-REPOSITORY/pull/3`

**Important:** This ZIP contains the updated app files and deployment instructions. It cannot publish to your GitHub account or create a real deployment/PR without access to your repository. To preserve your exact Part 1 repository and custom branding, apply these files to that repository (or share your Part 1 ZIP/repository URL for integration).
