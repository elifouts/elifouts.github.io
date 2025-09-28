// Shared GitHub Repository Data
const githubRepos = [
    {
        name: "Dotfiles",
        subtitle: "My Hyperland Dotfiles For Arch!",
        url: "https://github.com/username/dotfiles",
        description: "A fast easily configurable and modular fetch for your terminal. Works on most OS",
        language: "CSS",
        languageColor: "css",
        stars: "588",
        forks: "25",
        updatedTime: "2 days ago"
    },
    {
        name: "MyFetch",
        subtitle: "Fetching things terminal things ya know how it goes.",
        url: "https://github.com/username/myfetch",
        description: "DevBits Is a open source application me and a couple friends are creating that is targeted to connect developers and people in tech.",
        language: "Shell",
        languageColor: "shell",
        stars: "3",
        forks: "0",
        updatedTime: "1 week ago"
    },
    {
        name: "DevBits",
        subtitle: "X and LinkedIn Crossover for Developers!",
        url: "https://github.com/username/devbits",
        description: "Social platform designed specifically for developers to connect, share projects, and collaborate on innovative tech solutions.",
        language: "Go",
        languageColor: "go",
        stars: "3",
        forks: "1",
        updatedTime: "3 days ago"
    },
    {
        name: "PLM-AutoTools",
        subtitle: "Advanced PLM System Integration Suite",
        url: "https://github.com/username/plm-autotools",
        description: "Comprehensive automation toolkit for Product Lifecycle Management systems with advanced workflow optimization and data processing capabilities.",
        language: "Python",
        languageColor: "python",
        stars: "127",
        forks: "34",
        updatedTime: "1 day ago"
    },
    {
        name: "ReactFlow-Dashboard",
        subtitle: "Interactive Data Visualization Platform",
        url: "https://github.com/username/reactflow-dashboard",
        description: "Modern dashboard solution built with React and TypeScript, featuring real-time data visualization and responsive design patterns.",
        language: "TypeScript",
        languageColor: "typescript",
        stars: "89",
        forks: "17",
        updatedTime: "4 days ago"
    },
    {
        name: "API-Gateway-Pro",
        subtitle: "Enterprise API Management System",
        url: "https://github.com/username/api-gateway-pro",
        description: "Scalable API gateway solution with advanced routing, authentication, and monitoring capabilities for microservices architecture.",
        language: "JavaScript",
        languageColor: "javascript",
        stars: "245",
        forks: "56",
        updatedTime: "5 days ago"
    }
];

// Function to generate a single GitHub repo card
function generateGithubCard(repo, isSlider = false) {
    const cardClass = isSlider ? 'col' : 'col-lg-4 col-md-6 col-sm-6';
    
    return `
        <div class="${cardClass}">
            <div class="github-repo-card" data-repo-url="${repo.url}">
                <div class="repo-header">
                    <div class="repo-icon">
                        <i class="fab fa-github"></i>
                    </div>
                    <div class="repo-title-section">
                        <h5 class="repo-name">${repo.name}</h5>
                        <p class="repo-subtitle">${repo.subtitle}</p>
                    </div>
                </div>
                <div class="repo-description-section">
                    <p class="repo-description">${repo.description}</p>
                </div>
                <div class="repo-stats-bottom">
                    <div class="stat-item language-stat">
                        <div class="language-dot ${repo.languageColor}"></div>
                        <span class="language-name">${repo.language}</span>
                    </div>
                    <div class="stat-item star-stat">
                        <i class="fas fa-star"></i>
                        <span>${repo.stars}</span>
                    </div>
                    <div class="stat-item fork-stat">
                        <i class="fas fa-code-branch"></i>
                        <span>${repo.forks}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to populate slider (homepage)
function populateGithubSlider(containerId, limit = 6) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const reposToShow = githubRepos.slice(0, limit);
    container.innerHTML = reposToShow.map(repo => generateGithubCard(repo, true)).join('');
    
    // Add click handlers
    addGithubCardClickHandlers();
    
    // Initialize slider after populating cards
    setTimeout(() => {
        if (typeof $ !== 'undefined' && typeof initGithubSlider === 'function') {
            initGithubSlider();
        }
    }, 200);
}

// Function to populate grid (projects page)
function populateGithubGrid(containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const reposToShow = limit ? githubRepos.slice(0, limit) : githubRepos;
    container.innerHTML = reposToShow.map(repo => generateGithubCard(repo, false)).join('');
    
    // Add click handlers
    addGithubCardClickHandlers();
}

// Function to add click handlers to GitHub cards
function addGithubCardClickHandlers() {
    document.querySelectorAll('.github-repo-card').forEach(card => {
        card.addEventListener('click', function() {
            const url = this.getAttribute('data-repo-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // For homepage slider
    populateGithubSlider('github-slider-container', 6);
    
    // For projects page grid
    populateGithubGrid('github-grid-container');
});

// Also initialize on window load as backup
window.addEventListener('load', function() {
    // Check if cards are already populated
    const container = document.getElementById('github-slider-container');
    if (container && container.children.length === 0) {
        populateGithubSlider('github-slider-container', 6);
    }
});