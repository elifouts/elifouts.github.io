// GitHub Repositories API Integration
class GitHubAPI {
    constructor() {
        this.repos = [
            'elifouts/elifouts.github.io',
            'elifouts/Dotfiles',
            'elifouts/DriveGo',
            'elifouts/wallpapers',
            'elifouts/EfoutsCode',
            'elifouts/MyFetch',
            'elifouts/ManageMe',
            'elifouts/Poli-Search',
            'elifouts/DNA',
            'elifouts/DevBits'
        ];
        this.cache = new Map();
        this.rateLimit = { remaining: 60, reset: Date.now() };
        
        // GitHub Personal Access Token (PAT)
        // Try to get token from config file, otherwise use fallback
        this.githubToken = (typeof GitHubConfig !== 'undefined' && GitHubConfig.token !== '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') 
            ? GitHubConfig.token 
            : null;
            
        if (this.githubToken) {
            console.log('GitHub API - Authentication token loaded');
        } else {
            console.log('GitHub API - Running in unauthenticated mode (rate limited)');
        }
    }

    async fetchRepoData(repoPath) {
        // Check cache first
        if (this.cache.has(repoPath)) {
            console.log(`Using cached data for ${repoPath}`);
            return this.cache.get(repoPath);
        }

        // Check localStorage cache (persists between sessions)
        const cacheKey = `github_repo_${repoPath.replace('/', '_')}`;
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            try {
                const parsed = JSON.parse(cachedData);
                // Use cached data if less than 1 hour old
                if (Date.now() - parsed.timestamp < 3600000) {
                    console.log(`Using localStorage cache for ${repoPath}`);
                    this.cache.set(repoPath, parsed.data);
                    return parsed.data;
                }
            } catch (e) {
                console.warn(`Invalid cache data for ${repoPath}`);
            }
        }

        try {
            // Prepare headers for authentication
            const headers = {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-Website'
            };
            
            // Add authentication if token is provided
            if (this.githubToken && this.githubToken !== 'YOUR_TOKEN_HERE') {
                headers['Authorization'] = `Bearer ${this.githubToken}`;
                console.log(`Making authenticated request for ${repoPath}`);
            } else {
                console.log(`Making unauthenticated request for ${repoPath}`);
            }
            
            const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
                headers: headers
            });
            
            // Log rate limit info
            const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
            const rateLimitLimit = response.headers.get('x-ratelimit-limit');
            console.log(`Rate limit: ${rateLimitRemaining}/${rateLimitLimit} remaining`);
            
            // Check for rate limiting
            if (response.status === 403) {
                const rateLimitReset = response.headers.get('x-ratelimit-reset');
                
                if (rateLimitRemaining === '0') {
                    const resetTime = new Date(rateLimitReset * 1000);
                    console.warn(`GitHub API rate limit exceeded. Resets at: ${resetTime.toLocaleString()}`);
                    throw new Error(`Rate limit exceeded until ${resetTime.toLocaleString()}`);
                }
            }
            
            if (!response.ok) {
                throw new Error(`GitHub API Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            
            // Cache the result in memory and localStorage
            this.cache.set(repoPath, data);
            localStorage.setItem(cacheKey, JSON.stringify({
                data: data,
                timestamp: Date.now()
            }));
            
            console.log(`Successfully fetched fresh data for ${repoPath}`);
            return data;
        } catch (error) {
            console.error(`Failed to fetch data for ${repoPath}:`, error.message);
            
            // Return fallback data if API fails
            return this.getFallbackData(repoPath);
        }
    }

    getFallbackData(repoPath) {
        console.log(`Using fallback data for ${repoPath}`);
        
        const fallbackData = {
            'elifouts/elifouts.github.io': {
                name: 'elifouts.github.io',
                description: 'Personal portfolio website showcasing projects and skills',
                language: 'HTML',
                stargazers_count: 8,
                forks_count: 2,
                html_url: 'https://github.com/elifouts/elifouts.github.io',
                updated_at: '2024-01-15T10:30:00Z'
            },
            'elifouts/Dotfiles': {
                name: 'Dotfiles',
                description: 'Personal configuration files for development environment',
                language: 'Shell',
                stargazers_count: 5,
                forks_count: 1,
                html_url: 'https://github.com/elifouts/Dotfiles',
                updated_at: '2024-01-10T14:20:00Z'
            },
            'elifouts/wallpapers': {
                name: 'wallpapers',
                description: 'Curated collection of high-quality wallpapers',
                language: 'CSS',
                stargazers_count: 12,
                forks_count: 4,
                html_url: 'https://github.com/elifouts/wallpapers',
                updated_at: '2024-01-08T16:45:00Z'
            },
            'elifouts/EfoutsCode': {
                name: 'EfoutsCode',
                description: 'Collection of coding projects and experiments',
                language: 'JavaScript',
                stargazers_count: 6,
                forks_count: 2,
                html_url: 'https://github.com/elifouts/EfoutsCode',
                updated_at: '2024-01-05T12:15:00Z'
            },
            'elifouts/MyFetch': {
                name: 'MyFetch',
                description: 'Custom system information display tool',
                language: 'Python',
                stargazers_count: 15,
                forks_count: 3,
                html_url: 'https://github.com/elifouts/MyFetch',
                updated_at: '2024-01-12T09:30:00Z'
            },
            'elifouts/ManageMe': {
                name: 'ManageMe',
                description: 'Personal task and project management application',
                language: 'TypeScript',
                stargazers_count: 9,
                forks_count: 1,
                html_url: 'https://github.com/elifouts/ManageMe',
                updated_at: '2024-01-07T11:20:00Z'
            },
            'elifouts/Poli-Search': {
                name: 'Poli-Search',
                description: 'Political information search and analysis tool',
                language: 'JavaScript',
                stargazers_count: 4,
                forks_count: 1,
                html_url: 'https://github.com/elifouts/Poli-Search',
                updated_at: '2024-01-03T15:45:00Z'
            },
            'elifouts/DriveGo': {
                    name: 'DriveGo',
                    description: 'Car Enthusiest Routs',
                    language: 'JavaScript',
                    stargazers_count: 1,
                    forks_count: 2,
                    html_url: 'https://github.com/elifouts/DriveGo',
                    updated_at: '2024-01-03T15:45:00Z'
                }
        };

        return fallbackData[repoPath] || {
            name: repoPath.split('/')[1],
            description: 'Repository description not available',
            language: 'Unknown',
            stargazers_count: 0,
            forks_count: 0,
            html_url: `https://github.com/${repoPath}`,
            updated_at: new Date().toISOString()
        };
    }

    async fetchAllRepos() {
        const promises = this.repos.map(repo => this.fetchRepoData(repo));
        const results = await Promise.all(promises);
        return results.filter(repo => repo !== null);
    }

    getLanguageClass(language) {
        const languageMap = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'CSS': 'css',
            'Shell': 'shell',
            'Go': 'go',
            'HTML': 'css',
            'Java': 'javascript',
            'C++': 'css',
            'C': 'css',
            'PHP': 'css',
            'Ruby': 'css',
            'Swift': 'css',
            'Kotlin': 'css',
            'Rust': 'css',
            'Vue': 'javascript',
            'React': 'javascript'
        };
        return languageMap[language] || 'css';
    }

    formatDescription(description) {
        if (!description) return 'No description available';
        return description.length > 120 ? description.substring(0, 120) + '...' : description;
    }

    createRepoCard(repo, delay = '0.3s') {
        const repoName = repo.name;
        const repoUrl = repo.html_url;
        const description = this.formatDescription(repo.description);
        const stars = repo.stargazers_count || 0;
        const forks = repo.forks_count || 0;
        const language = repo.language || 'Unknown';
        const languageClass = this.getLanguageClass(language);
        
        // Generate subtitle based on repo name or description
        let subtitle = 'Open Source Project';
        if (repo.description) {
            const words = repo.description.split(' ');
            subtitle = words.slice(0, 3).join(' ');
            if (words.length > 3) subtitle += '...';
        }

        return `
            <div class="project-card-wrapper wow fadeInUp" data-wow-delay="${delay}">
                <div class="github-repo-card" data-repo-url="${repoUrl}">
                    <div class="repo-header">
                        <div class="repo-icon">
                            <i class="fab fa-github"></i>
                        </div>
                        <div class="repo-title-section">
                            <h5 class="repo-name">${repoName}</h5>
                            <p class="repo-subtitle">${subtitle}</p>
                        </div>
                    </div>
                    <div class="repo-description-section">
                        <p class="repo-description">${description}</p>
                    </div>
                    <div class="repo-stats-bottom">
                        <div class="stat-item language-stat">
                            <div class="language-dot ${languageClass}"></div>
                            <span class="language-name">${language}</span>
                        </div>
                        <div class="stat-item star-stat">
                            <i class="fas fa-star"></i>
                            <span>${stars}</span>
                        </div>
                        <div class="stat-item fork-stat">
                            <i class="fas fa-code-branch"></i>
                            <span>${forks}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async populateHomePageSlider() {
        try {
            const repos = await this.fetchAllRepos();
            if (repos.length === 0) return;

            const sliderContainer = document.getElementById('project-slider-container');
            if (!sliderContainer) return;

            // Use all repos dynamically for the home page slider
            // const homeRepos = repos.slice(0, 7); // Original code, removed limit
            const homeRepos = repos; // Dynamic - use all

            let html = '';
            
            homeRepos.forEach((repo, index) => {
                const delay = (0.3 + index * 0.1).toFixed(1) + 's';
                html += this.createRepoCard(repo, delay);
            });

            sliderContainer.innerHTML = html;
            
            // Re-initialize the slider if it was already initialized
            if (typeof $ !== 'undefined' && $('.project-slider').hasClass('slick-initialized')) {
                $('.project-slider').slick('unslick');
            }
            
            // Initialize/re-initialize the project slider
            if (typeof $ !== 'undefined') {
                $('.project-slider').slick({
                    dots: false,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    arrows: true,
                    variableWidth: true,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                arrows: false
                            }
                        }
                    ]
                });
            }

            // Add click handlers for navigation
            this.addClickHandlers();
            
        } catch (error) {
            console.error('Error populating home page slider:', error);
        }
    }

    async populateProjectsPage() {
        try {
            const repos = await this.fetchAllRepos();
            if (repos.length === 0) return;

            const projectsGrid = document.getElementById('projects-grid');
            if (!projectsGrid) return;

            let html = '';
            
            repos.forEach((repo, index) => {
                const delay = (0.3 + index * 0.1).toFixed(1) + 's';
                html += this.createRepoCard(repo, delay);
            });

            projectsGrid.innerHTML = html;
            
            // Add click handlers for navigation
            this.addClickHandlers();
            
        } catch (error) {
            console.error('Error populating projects page:', error);
        }
    }

    addClickHandlers() {
        // Add click handlers to all repo cards
        document.querySelectorAll('.github-repo-card').forEach(card => {
            card.addEventListener('click', function() {
                const repoUrl = this.getAttribute('data-repo-url');
                if (repoUrl) {
                    window.open(repoUrl, '_blank');
                }
            });
        });
    }

    async init() {
        try {
            // Check which page we're on and populate accordingly
            const currentPath = window.location.pathname;
            console.log('GitHub API - Current path:', currentPath);
            console.log('GitHub API - Initializing with enhanced error handling and caching...');
            
            if (currentPath.includes('service.html') || currentPath.includes('projects')) {
                console.log('GitHub API - Populating projects page');
                await this.populateProjectsPage();
            } else if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/Portfolio/')) {
                console.log('GitHub API - Populating home page slider');
                await this.populateHomePageSlider();
            } else {
                console.log('GitHub API - No matching page found for path:', currentPath);
            }
            
            console.log('GitHub API - Initialization completed successfully');
        } catch (error) {
            console.error('GitHub API - Initialization failed:', error);
            
            // Show user-friendly error message if needed
            if (error.message.includes('Rate limit exceeded')) {
                console.warn('GitHub API - Using cached/fallback data due to rate limiting');
            }
        }
    }
}

// Initialize the GitHub API when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    const githubAPI = new GitHubAPI();
    await githubAPI.init();
    
    // Re-initialize WOW for new elements
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubAPI;

}
