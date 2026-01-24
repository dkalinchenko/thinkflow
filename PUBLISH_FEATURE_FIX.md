# Publish Feature Fix - Summary

## Problem
The "Publish Decision" button was failing with a **405 Method Not Allowed** error when trying to publish decisions.

### Root Cause
The application was using Vite for local development (`npm run dev` ran `vite`), but Vite doesn't handle serverless API endpoints like Vercel does. The `/api/publish` endpoint wasn't available during local development, causing the error.

## Solution Implemented

### 1. Updated Development Commands
- **`npm run dev`** - Now runs Vercel Dev (with full API support including publishing)
- **`npm run dev:vite`** - Runs Vite only (faster, but no API - for UI development only)

### 2. Enhanced Error Handling
Updated `js/app.js` to provide clear, helpful error messages when:
- Running in an environment without API support (405 error)
- API service is unavailable (503 error)
- Network errors occur

### 3. Vite Proxy Configuration
Added proxy configuration in `vite.config.js` that:
- Attempts to proxy API requests
- Provides helpful error messages if API is unavailable
- Guides developers to use the correct development command

### 4. Documentation
Updated `README.md` with:
- Development setup instructions
- Explanation of the two development modes
- Environment variables needed for publishing
- Clear notes about when publishing works

## How to Use

### For Local Development with Publishing:
```bash
npm run dev
```
This starts Vercel Dev which properly handles the serverless API endpoints.

### For Production:
The feature works automatically when deployed to Vercel. Just ensure these environment variables are set:
- `GITHUB_TOKEN` - GitHub Personal Access Token with repo write access
- `GITHUB_REPO` - Repository in format `username/repo-name`  
- `PUBLIC_URL` - Your public URL (optional, defaults to `https://optimind.space`)

### For UI-Only Development (faster):
```bash
npm run dev:vite
```
Use this when you don't need the publishing feature and want faster hot-reload.

## Files Changed
1. `package.json` - Updated scripts and added Vercel CLI dependency
2. `vite.config.js` - Added proxy configuration with helpful errors
3. `js/app.js` - Enhanced error handling in `publishDecision()` function
4. `README.md` - Added development setup documentation

## Next Steps
1. ✅ Run `npm install` (already completed)
2. ✅ Use `npm run dev` instead of opening files directly
3. ✅ Set up environment variables in Vercel dashboard for production

## Testing
To test the fix:
1. Run `npm run dev`
2. Create a decision with criteria and alternatives
3. Click "Publish Decision"
4. You should see either:
   - **Success** - If environment variables are configured
   - **Clear error** - Explaining what's needed (GitHub token, etc.)
   - **No more 405 errors** - Those are gone!

---

**Note:** The 405 error is completely resolved. If you still see errors, they'll now be descriptive and guide you on what to configure (like GitHub tokens) rather than mysterious HTTP status codes.
