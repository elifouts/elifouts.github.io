
// Set active class on navigation based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Get the href path
        const href = link.getAttribute('href');
        
        // Compare the current path with the link's href
        if (href === './index.html' && (currentPath === '/' || currentPath.endsWith('index.html'))) {
            link.classList.add('active');
        } else if (href && currentPath.includes(href.replace('./', ''))) {
            link.classList.add('active');
        }
    });
}

//Navbar toggle icon
function navbar_toggler() {
    $('.navbar-toggler[data-toggle=collapse]').click(function () {
        if ($(".navbar-toggler[data-bs-toggle=collapse] i").hasClass('fa-bars')) {
        } else {
            $(".navbar-toggler[data-bs-toggle=collapse] i").removeClass("fa-times");
        }
    });
}
navbar_toggler();
  
// Navbar clone in mobile device
function navClone() {
    $('.js-clone-nav').each(function () {
        var $this = $(this);
        $this.clone().attr('class', 'navbar-nav ml-auto').appendTo('.d2c_mobile_view_body');
    });

    $('.d2c_mobile_view .nav-link').click(function () {
        $(".nav-link").removeClass("active");
        $('.d2c_mobile_view').removeClass('show');
        $(this).toggleClass('active');
    });
    }
    navClone();

// JS for fancybox Slide & button

function fancybox() {
  $('[data-fancybox]').fancybox({
      protect: true,
      buttons: [
          "fullScreen",
          "thumbs",
          "share",
          "slideShow",
          "close"
      ],
      image: {
          preload: false
      },
  });
}
fancybox();

// Call setActiveNavLink when page loads
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Partner Slider
$('.d2c_testimonial_slider').slick({
centerMode: true,
centerPadding: '0px',
dots: false,
arrows: true,
infinite: true,
autoplay:true,
speed: 1000,
slidesToShow: 3,
slidesToScroll: 1,
pauseOnHover:false,
responsive: [
    {
    breakpoint: 1500,
    settings: {
        slidesToShow: 3,
    }
    },
    {
    breakpoint: 992,
    settings: {
        slidesToShow: 2,
    }
    },
    {
    breakpoint: 480,
    settings: {
        slidesToShow: 1,
    }
    }
]
});

// Form Validation Js
(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
    })
})();


// Preloader JS
window.addEventListener('load', function() {
    var preloader = document.querySelector('.preloader');
    preloader.classList.add('hide');
});
// WOW JS
  wow = new WOW(
    {
    boxClass:     'wow',
    animateClass: 'animated',
    offset:       0,
    mobile:       false,
    live:         true
  }
  )
  wow.init();

// ScrollBtn JS
window.onscroll = function() { scrollFunction() };

// Subtle mouse-avoid and shrink effect for hero/about images and colored boxes
function addMouseAvoidEffect() {
  function applyEffect(el, direction) {
    el.addEventListener('mousemove', function(e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Move away from mouse, shrink slightly
      const moveX = ((centerX - x) / centerX) * 16 * direction.x;
      const moveY = ((centerY - y) / centerY) * 16 * direction.y;
      const scale = 0.97 + Math.abs(moveX + moveY) * 0.0007;
      el.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
    });
    el.addEventListener('mouseleave', function() {
      el.style.transform = '';
    });
  }
  // Hero image and box
  const heroImgWrapper = document.querySelector('.d2c_hero_img_wrapper');
  if (heroImgWrapper) applyEffect(heroImgWrapper, { x: 1, y: -1 });
  // About image and box
  const aboutImgWrapper = document.querySelector('.d2c_about_img_wrapper');
  if (aboutImgWrapper) applyEffect(aboutImgWrapper, { x: -1, y: 1 });
}
document.addEventListener('DOMContentLoaded', addMouseAvoidEffect);

// Starfield background with flickering stars
function createStarfield() {
  const starCanvas = document.createElement('canvas');
  starCanvas.className = 'starfield-bg';
  document.body.prepend(starCanvas);
  const ctx = starCanvas.getContext('2d');
  let w, h, dpr;

  function updateSize() {
    // Get device pixel ratio and screen dimensions
    dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = Math.max(window.innerHeight, document.documentElement.scrollHeight, document.body.scrollHeight);
    
    // Set canvas size accounting for pixel ratio
    starCanvas.width = w * dpr;
    starCanvas.height = h * dpr;
    
    // Scale context to ensure proper resolution
    ctx.scale(dpr, dpr);
    
    // Set display size
    starCanvas.style.width = w + 'px';
    starCanvas.style.height = h + 'px';
  }

  // Handle resize and scroll
  window.addEventListener('resize', updateSize);
  window.addEventListener('scroll', () => {
    const newHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight, document.body.scrollHeight);
    if (newHeight !== h) {
      updateSize();
      generateStars(); // Regenerate stars when height changes
    }
  });

  updateSize();

  // Generate stars with better distribution
  const stars = Array.from({length: 2000}, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.2 + 0.3,
    flicker: Math.random() * 2 * Math.PI,
    speed: Math.random() * 0.03 + 0.01
  }));
  function draw() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach(star => {
      star.flicker += star.speed;
      const alpha = 0.7 + 0.3 * Math.sin(star.flicker);
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}
document.addEventListener('DOMContentLoaded', createStarfield);

    function scrollFunction() {
    var scrollBtn = document.getElementById("scrollBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
}

// Counter
$(document).ready(function() {

    var counters = $(".count");
    var countersQuantity = counters.length;
    var counter = [];
  
    for (i = 0; i < countersQuantity; i++) {
      counter[i] = parseInt(counters[i].innerHTML);
    }
  
    var count = function(start, value, id) {
      var localStart = start;
      setInterval(function() {
        if (localStart < value) {
          localStart++;
          counters[id].innerHTML = localStart;
        }
      }, 40);
    }
  
    for (j = 0; j < countersQuantity; j++) {
      count(0, counter[j], j);
    }
  });

// Load More and Explore More Button JS
function updateSliceShow() {
    var windowWidth = $(window).width();
    var $defaultShow, $sliceShow;
  
    if (windowWidth < 768) {
      $defaultShow = 1;
      $sliceShow = 1;
    } else if (windowWidth < 992) {
      $defaultShow = 2;
      $sliceShow = 2;
    } else if (windowWidth < 1200) {
      $defaultShow = 6;
      $sliceShow = 3;
    } else {
      $defaultShow = 6;
      $sliceShow = 3;
    }
  
    return [$sliceShow, $defaultShow];
  }
  
  function load_more($sectionName = "", $locationCol, $btnParentClass ,$btnId, $defaultShow = 6, $sliceShow = 3) {
    $($locationCol).css("display", "none");
    $($sectionName + " " + $btnParentClass).css("display", "none");
  
    $($locationCol).slice(0, $defaultShow).fadeIn();
    if ($($locationCol + ":hidden").length != 0) {
      $($sectionName + " " + $btnParentClass).css("display", "flex");
  
      $($btnId).off("click").on("click", function (e) {
        e.preventDefault();
  
        $($locationCol + ":hidden").slice(0, $sliceShow).slideDown(500);
        if ($($locationCol + ":hidden").length == 0) {
          $($sectionName + " " + $btnParentClass).css("display", "none");
        }
      });
    }
  }
  
  $(document).ready(function () {
    var sliceDefault, sliceShow;
  
    [sliceShow, sliceDefault] = updateSliceShow();
  
    $(window).on("resize", function () {
      [sliceShow, sliceDefault] = updateSliceShow();
  
      load_more(".d2c_services_wrapper", ".service", ".d2c_service_btn" ,"#d2c_service_more", sliceDefault, sliceShow);
      load_more(".d2c_blog_wrapper", ".blog", ".d2c_blog_btn" ,"#d2c_blog_more", sliceDefault, sliceShow);
    });
  
    load_more(".d2c_services_wrapper", ".service", ".d2c_service_btn" ,"#d2c_service_more", sliceDefault, sliceShow);
    load_more(".d2c_blog_wrapper", ".blog", ".d2c_blog_btn" ,"#d2c_blog_more", sliceDefault, sliceShow);
  });

// GitHub Repository Slider
function initGithubSlider() {
  // Destroy existing slider if it exists
  if ($('.github-repo-slider').hasClass('slick-initialized')) {
    $('.github-repo-slider').slick('unslick');
  }
  
  $('.github-repo-slider').slick({
    centerMode: false,
    centerPadding: '0px',
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
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
          centerMode: true,
          centerPadding: '20px'
        }
      }
    ]
  });
}

// Initialize slider when window loads
$(window).on('load', function() {
  setTimeout(initGithubSlider, 500);
});




// Template Name: {{ReactProx- React Developer Portfolio Website Templates}}
// Template URL: {{https://designtocodes.com/product/reactprox-react-developer-portfolio-website-templates}}
// Description: {{Purchase your ReactProx- React Developer Portfolio and get seamless integration for react projects plus top-notch portfolio as well.}}
// Author: DesignToCodes
// Author URL: https://www.designtocodes.com
// Text Domain: {{ React Prox }}
