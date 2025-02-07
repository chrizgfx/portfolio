document.addEventListener('DOMContentLoaded', () => {
    // Add home-page class if on index.html
    // if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    //     document.body.classList.add('home-page');
    // }

    // Add overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // Navigation toggle with overlay
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in-section').forEach((section) => {
        observer.observe(section);
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
        });
    };

    // If on about page, trigger skill animations
    if (window.location.pathname.includes('about')) {
        setTimeout(animateSkills, 500);
    }

    // Fix typewriter width
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        const text = typewriter.textContent;
        const temp = document.createElement('span');
        temp.style.visibility = 'hidden';
        temp.style.whiteSpace = 'nowrap';
        temp.style.font = window.getComputedStyle(typewriter).font;
        temp.textContent = text;
        document.body.appendChild(temp);
        const width = temp.offsetWidth;
        document.body.removeChild(temp);
        typewriter.style.setProperty('--text-width', width + 'px');
    }
});

// Parallax effect for grid background
// window.addEventListener('scroll', () => {
//     const grid = document.querySelector('.grid-background');
//     const scrolled = window.pageYOffset;
//     grid.style.transform = `translateY(${scrolled * 0.5}px)`;
// });

// Parallax scrolling effect
function handleParallax() {
    if (window.innerWidth < 768) return;

    const parallaxContainer = document.querySelector('.parallax-container');
    const layers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const containerRect = parallaxContainer.getBoundingClientRect();
        
        if (containerRect.top <= window.innerHeight && containerRect.bottom >= 0) {
            layers.forEach(layer => {
                const speed = layer.getAttribute('data-speed');
                const yMove = scrollTop * speed;
                layer.style.transform = `translate3d(0, ${yMove}px, 0)`;
            });
        }
    });
}

// Remove any previous scroll listeners
window.onload = () => {
    handleParallax();
};
window.addEventListener('resize', handleParallax);
