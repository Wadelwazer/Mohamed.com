/* ==========================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Interactive Elements & Animations
   ========================================== */

// ==========================================
// 1. MOBILE MENU TOGGLE
// ==========================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// ==========================================
// 2. ANALYTICS CANVAS ANIMATION
// ==========================================

const canvas = document.getElementById('analyticsCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationId;

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function drawAnalytics() {
        const width = canvas.width;
        const height = canvas.height;
        const time = Date.now() / 1000;

        // Clear canvas
        ctx.fillStyle = '#0f0f0f';
        ctx.fillRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let i = 0; i < width; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
        for (let i = 0; i < height; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }

        // Draw animated bars
        const barWidth = 30;
        const spacing = 50;
        const maxHeight = height * 0.6;
        const startX = 50;

        for (let i = 0; i < 8; i++) {
            const x = startX + i * spacing;
            const barHeight = (Math.sin(time + i) + 1) * (maxHeight / 2);

            // Gradient for bars
            const gradient = ctx.createLinearGradient(x, height - barHeight, x, height);
            gradient.addColorStop(0, '#06b6d4');
            gradient.addColorStop(1, '#0ea5e9');

            ctx.fillStyle = gradient;
            ctx.fillRect(x, height - barHeight, barWidth, barHeight);

            // Glow effect
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, height - barHeight, barWidth, barHeight);
        }

        // Draw line chart
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 20; i++) {
            const x = width * 0.6 + (i * width * 0.3) / 20;
            const y = height * 0.3 + Math.sin((i / 20) * Math.PI * 2 + time) * 40;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();

        // Draw data points
        ctx.fillStyle = '#0ea5e9';
        for (let i = 0; i < 20; i++) {
            const x = width * 0.6 + (i * width * 0.3) / 20;
            const y = height * 0.3 + Math.sin((i / 20) * Math.PI * 2 + time) * 40;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        animationId = requestAnimationFrame(drawAnalytics);
    }

    // Initialize
    resizeCanvas();
    drawAnalytics();

    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
}

// ==========================================
// 3. SMOOTH SCROLL FOR NAVIGATION
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==========================================
// 4. INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.skill-card, .timeline-content, .education-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==========================================
// 5. PROGRESS BAR ANIMATION
// ==========================================

const progressBars = document.querySelectorAll('.progress-fill');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ==========================================
// 6. NAVBAR SCROLL EFFECT
// ==========================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(6, 182, 212, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==========================================
// 7. FORM HANDLING (if needed in future)
// ==========================================

// Example for future contact form
function handleFormSubmit(e) {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
}

// ==========================================
// 8. UTILITY FUNCTIONS
// ==========================================

// Smooth number counter animation
function animateCounter(element, target, duration = 1000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Add active state to nav links based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==========================================
// 9. INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully');
    updateActiveNavLink();
});
