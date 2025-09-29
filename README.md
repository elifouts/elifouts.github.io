# Eli Fouts — Portfolio (elifouts.github.io)

🎨 Live demo: https://elifouts.github.io

> A fast, dark-mode personal portfolio website with retro/gruvbox styling, smooth animations, and a small collection of interactive widgets.

![Hero preview](assets/images/hero_img.jpg)

## About

This repository is the static source for Eli Fouts' personal portfolio site. It uses plain HTML, CSS and a handful of small libraries to deliver a responsive, animated, and low-dependency portfolio experience that’s easy to host on GitHub Pages.

The visual theme leans on a Gruvbox-inspired palette, monospace fonts (JetBrains Mono), and subtle motion for a modern-but-retro developer portfolio.

## Highlights

- Lightweight static site — no build step required (simply open `index.html` or host with GitHub Pages).
- Animated hero, newsletter input with animated gradient button, and a starfield background effect.
- Projects section populated dynamically from the GitHub API (see `assets/js/github-repos.js`).
- Responsive photo gallery and a simple random-photo picker on the homepage.
- Accessibility-minded: readable contrast and keyboard-focus friendly controls.

## Tech & Libraries

- HTML5 + CSS3 (variables for colors in `assets/css/style.css`)
- JavaScript (vanilla + jQuery helpers)
- Bootstrap 5 — grid and small utilities
- WOW.js — reveal-on-scroll animations
- Slick Slider — project / carousel UI
- Fancybox — image lightbox for gallery
- Font Awesome — social & utility icons
