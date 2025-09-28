// Starfield background with flickering stars
function createStarfield() {
    // Create canvas
    const starCanvas = document.createElement('canvas');
    starCanvas.className = 'starfield-bg';
    document.body.prepend(starCanvas);
    
    // Get context and initialize variables
    const ctx = starCanvas.getContext('2d');
    let w, h, dpr;
    let stars = [];
    
    // Function to update canvas size
    function updateCanvasSize() {
        // Get device pixel ratio and viewport size
        dpr = window.devicePixelRatio || 1;
        w = window.innerWidth;
        h = window.innerHeight;
        
        // Set canvas size accounting for pixel ratio
        starCanvas.width = w * dpr;
        starCanvas.height = h * dpr;
        
        // Scale context to account for pixel ratio
        ctx.scale(dpr, dpr);
        
        // Set display size
        starCanvas.style.width = w + 'px';
        starCanvas.style.height = h + 'px';
    }
    
    // Function to generate stars
    function generateStars() {
        // Calculate number of stars based on screen size
        const area = w * h;
        const density = Math.min(2500, Math.floor(area / 1500)); // Increased density for more stars
        
        stars = [];
        // Create grid-based distribution
        const gridSize = 80; // Increased grid size for more spaced stars
        const cols = Math.ceil(w / gridSize);
        const rows = Math.ceil(h / gridSize);
        
        for (let i = 0; i < density; i++) {
            // Ensure even distribution across screen
            const gridX = Math.floor(Math.random() * cols);
            const gridY = Math.floor(Math.random() * rows);
            
            // Determine star size category
            const sizeCategory = Math.random();
            let radius;
            
            if (sizeCategory < 0.7) { // 70% tiny stars
                radius = Math.random() * 0.3 + 0.1; // 0.1 to 0.4
            } else if (sizeCategory < 0.9) { // 20% small stars
                radius = Math.random() * 0.3 + 0.4; // 0.4 to 0.7
            } else { // 10% medium stars
                radius = Math.random() * 0.3 + 0.7; // 0.7 to 1.0
            }
            
            stars.push({
                x: (gridX * gridSize) + (Math.random() * gridSize),
                y: (gridY * gridSize) + (Math.random() * gridSize),
                r: radius,
                flicker: Math.random() * 2 * Math.PI,
                speed: Math.random() * 0.02 + 0.01,
                brightness: Math.random() * 0.4 + 0.3 // Slightly dimmer overall
            });
        }
    }
    
    // Function to draw stars
    function drawStars() {
        ctx.clearRect(0, 0, w, h);
        
        stars.forEach(star => {
            star.flicker += star.speed;
            const alpha = star.brightness * (0.7 + 0.3 * Math.sin(star.flicker));
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();
        });
        
        requestAnimationFrame(drawStars);
    }
    
    // Initialize
    function init() {
        updateCanvasSize();
        generateStars();
        drawStars();
    }
    
    // Event Listeners
    window.addEventListener('resize', () => {
        updateCanvasSize();
        generateStars(); // Regenerate stars on resize
    });
    
    // Start the starfield
    init();
}

// Initialize when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createStarfield);
} else {
    createStarfield();
}