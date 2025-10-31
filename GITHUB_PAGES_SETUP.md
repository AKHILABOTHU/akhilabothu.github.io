# GitHub Pages Setup - IMPORTANT

## The Issue

If you see "Failed to resolve module specifier 'vue'" or a white screen, it means GitHub Pages is serving **source files** instead of **built files**.

## Solution: Configure GitHub Pages Correctly

### Step 1: Go to Repository Settings

1. Navigate to: https://github.com/AKHILABOTHU/akhilabothu.github.io/settings/pages

### Step 2: Set Source to GitHub Actions

**CRITICAL**: Under "Source", select:
- ✅ **GitHub Actions** (NOT "Deploy from a branch")
- ❌ Do NOT select "Deploy from a branch" or "/ (root)"

### Step 3: Verify Workflow

1. Go to the **Actions** tab
2. After pushing to `main`, you should see the "Deploy to GitHub Pages" workflow run
3. Wait for it to complete (green checkmark)
4. Your site will be live at: https://akhilabothu.github.io

## Why This Happens

- The **source** `index.html` has `<script src="/src/main.js">` (for development)
- The **built** `dist/index.html` has `<script src="/assets/index-*.js">` (for production)
- If GitHub Pages serves from a branch, it serves source files → white screen
- If GitHub Pages uses GitHub Actions, it serves built files → works correctly

## Manual Verification

After deployment, check:
- ✅ URL: https://akhilabothu.github.io should show your portfolio
- ✅ Browser console should have NO errors about "vue" module
- ✅ View page source should reference `/assets/index-*.js` NOT `/src/main.js`

## Troubleshooting

### Still seeing white screen?

1. **Clear browser cache**: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. **Check Actions tab**: Ensure workflow completed successfully
3. **Verify Settings → Pages**: Must be set to "GitHub Actions"
4. **Wait 2-3 minutes**: GitHub Pages sometimes takes time to update

### Workflow failing?

- Check the Actions tab for error messages
- Ensure `package.json` has correct build script
- Verify Node.js version in workflow (currently set to 20)

