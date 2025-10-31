# Deployment Guide for GitHub Pages

## Issue Fixed

The error "Failed to resolve module specifier 'vue'" occurs when GitHub Pages serves source files instead of built files.

## Solution

Make sure GitHub Pages is configured to use **GitHub Actions** as the source, not the repository root.

## Steps to Deploy

### 1. Push Your Code

```bash
# Initialize git (if not done)
git init

# Add remote
git remote add origin git@github.com:AKHILABOTHU/akhilabothu.github.io.git

# Add all files
git add .

# Commit
git commit -m "Initial deployment with GitHub Pages"

# Push to main branch
git branch -M main
git push -u origin main
```

### 2. Configure GitHub Pages

1. Go to your repository: https://github.com/AKHILABOTHU/akhilabothu.github.io
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions** (NOT "Deploy from a branch")
4. The workflow will automatically run on push

### 3. Verify Deployment

- After pushing, go to **Actions** tab in your repository
- Wait for the workflow to complete
- Your site will be available at: `https://akhilabothu.github.io`

## Important Notes

- **Do NOT** select "Deploy from a branch" in GitHub Pages settings
- Always use **GitHub Actions** as the source
- The workflow automatically builds from `dist/` folder
- If you see the Vue module error, it means source files are being served instead of built files

## Troubleshooting

### If you see "Failed to resolve module specifier 'vue'":

1. Check GitHub Pages Settings → Source should be "GitHub Actions"
2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
3. Check the Actions tab to ensure the workflow completed successfully
4. Wait a few minutes for GitHub Pages to update

### Manual Build Check:

```bash
# Build locally to verify
npm run build

# Check dist/index.html references bundled files (not src/main.js)
cat dist/index.html | grep "assets/index"
```

The built file should reference `/assets/index-*.js` NOT `/src/main.js`

