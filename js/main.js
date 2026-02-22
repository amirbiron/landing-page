// =========================
// Smooth Scroll & Navigation
// =========================

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Toggle icon
            const icon = mobileMenuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});

// =========================
// Intersection Observer for Animations
// =========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all slide-up elements
document.querySelectorAll('.slide-up').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// =========================
// CTA Button Actions
// =========================

document.querySelectorAll('.cta-btn-primary, .cta-btn-large, .pricing-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// =========================
// Demo Request Handler
// =========================

function handleDemoRequest() {
    // Show a success message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 50%;
        transform: translateX(50%);
        background: linear-gradient(135deg, #2563EB, #7C3AED);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideDown 0.5s ease-out;
        text-align: center;
    `;
    message.innerHTML = `
        <i class="fas fa-check-circle" style="margin-left: 0.5rem; font-size: 1.2rem;"></i>
        תודה על התעניינותך! ניצור איתך קשר בקרוב
    `;

    document.body.appendChild(message);

    // Add slide down animation
    const slideDownStyle = document.createElement('style');
    slideDownStyle.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translate(50%, -100%);
            }
            to {
                opacity: 1;
                transform: translate(50%, 0);
            }
        }
    `;
    document.head.appendChild(slideDownStyle);

    // Remove after 4 seconds
    setTimeout(() => {
        message.style.animation = 'slideUp 0.5s ease-out';
        setTimeout(() => message.remove(), 500);
    }, 4000);

    // Here you can add actual form submission or API call
    console.log('Demo request submitted');
}

// =========================
// Pricing Card Interactions
// =========================

document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// =========================
// Stats Counter Animation
// =========================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

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

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('%')) {
                    const num = parseInt(text);
                    stat.textContent = '0%';
                    animateCounter(stat, num, 1500);
                    stat.textContent += '%';
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// =========================
// Mobile Menu Enhancement
// =========================

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// =========================
// Chat Animation in Phone Mockup
// =========================

function animateChatMessages() {
    const messages = document.querySelectorAll('.message');
    let delay = 0;

    messages.forEach((message, index) => {
        message.style.opacity = '0';
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.animation = 'messageSlide 0.5s ease-out forwards';
        }, delay);
        delay += 800;
    });
}

// Observe phone mockup for chat animation
const phoneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateChatMessages();
            phoneObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) {
    phoneObserver.observe(phoneMockup);
}

// =========================
// Performance Optimization
// =========================

// Lazy load images (if you add any)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// =========================
// Accessibility Enhancements
// =========================

// Add keyboard navigation for interactive elements
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            element.click();
        }
    });
});

// Focus management for modals/dialogs (if added)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }
});

console.log('🤖 BotPro Landing Page Loaded Successfully!');
