// GitHub API Configuration
// This file should NOT be committed to public repositories

const GitHubConfig = {
    // Replace with your GitHub Personal Access Token
    // Get one from: https://github.com/settings/tokens
    // Required permissions: public_repo, repo:status, metadata
    // token: '', // REMOVED for security. Use environment variable or .env file instead.
    
    // Alternative: Use environment variable if available
    // token: process.env.GITHUB_TOKEN || 'YOUR_GITHUB_TOKEN_HERE',
    
    // API settings
    baseUrl: 'https://api.github.com',
    userAgent: 'Portfolio-Website-v1.0',
    
    // Rate limit settings (for authenticated requests)
    rateLimits: {
        authenticated: 5000,    // 5,000 requests per hour
        unauthenticated: 60     // 60 requests per hour
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubConfig;
} else {
    window.GitHubConfig = GitHubConfig;
}