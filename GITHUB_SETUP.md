# GitHub API Authentication Setup

This guide will help you set up unlimited GitHub API requests for your portfolio.

## Quick Setup (5 minutes)

### Step 1: Create GitHub Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "Portfolio Website"
4. Select these permissions:
   - ✅ `public_repo` (Access public repositories)
   - ✅ `repo:status` (Read repository status)
   - ✅ `metadata` (Read repository metadata)
5. Click "Generate token"
6. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

### Step 2: Add Token to Your Site

1. Open `config/github-config.js`
2. Replace `YOUR_GITHUB_TOKEN_HERE` with your actual token:
   ```javascript
   token: 'ghp_your_actual_token_here',
   ```
3. Save the file

### Step 3: Security Important!

- **NEVER commit the token to public repositories**
- Add `config/github-config.js` to your `.gitignore` file
- Keep your token private and secure

## Rate Limits

| Mode                | Requests per Hour |
| ------------------- | ----------------- |
| **Unauthenticated** | 60                |
| **Authenticated**   | 5,000             |

## Benefits of Authentication

- ✅ **5,000 requests/hour** (vs 60 unauthenticated)
- ✅ **No more rate limit errors**
- ✅ **Faster, more reliable API access**
- ✅ **Real-time repository data**

## Troubleshooting

### Token Not Working?

- Check if token has correct permissions
- Make sure token is not expired
- Verify no extra spaces in the config file

### Still Getting Rate Limited?

- Check browser console for authentication status
- Verify config file is loading correctly
- Ensure token format is correct (`ghp_...`)

### Security Concerns?

- You can revoke the token anytime from GitHub settings
- The token only has read access to public repositories
- No write permissions or private repo access

## Alternative: Environment Variable (Advanced)

For enhanced security, you can use environment variables:

```javascript
token: process.env.GITHUB_TOKEN || null,
```

This requires a server-side setup and is more complex for static sites.
