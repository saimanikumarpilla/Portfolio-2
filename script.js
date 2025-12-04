// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100; // Account for floating nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active section highlighting
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Remove active class from all nav items
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current section nav item
    if (currentSection) {
        const activeNavItems = document.querySelectorAll(`[data-section="${currentSection}"]`);
        activeNavItems.forEach(item => {
            item.classList.add('active');
        });
    }
}

// Floating nav background change on scroll
function updateNavBackground() {
    const floatingNav = document.querySelector('.floating-nav');
    const mobileBottomNav = document.querySelector('.mobile-bottom-nav');
    const scrollPosition = window.scrollY;
    
    if (floatingNav) {
        if (scrollPosition > 50) {
            floatingNav.style.transform = 'translateX(-50%) translateY(0)';
            floatingNav.style.opacity = '1';
        } else {
            floatingNav.style.transform = 'translateX(-50%) translateY(-10px)';
            floatingNav.style.opacity = '0.9';
        }
    }
    
    // Mobile bottom nav hover effect
    if (mobileBottomNav) {
        if (scrollPosition > 50) {
            mobileBottomNav.style.transform = 'translateX(-50%) translateY(0)';
            mobileBottomNav.style.opacity = '1';
        } else {
            mobileBottomNav.style.transform = 'translateX(-50%) translateY(-5px)';
            mobileBottomNav.style.opacity = '0.95';
        }
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize active section and nav background
    updateActiveSection();
    updateNavBackground();
});

// Scroll event listeners
window.addEventListener('scroll', () => {
    updateActiveSection();
    updateNavBackground();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Skill progress animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.opacity = '1';
        }, index * 100);
    });
}

// Trigger skill animation when skills section is visible
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
}

// Add CSS for notifications and enhanced nav effects
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    /* Enhanced nav effects */
    .nav-link, .mobile-nav-link {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-link:hover, .mobile-nav-link:hover {
        transform: translateY(-2px) scale(1.05);
    }
    
    .nav-item.active .nav-link,
    .mobile-nav-item.active .mobile-nav-link {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
        }
        50% {
            box-shadow: 0 5px 25px rgba(37, 99, 235, 0.5);
        }
    }
    
    /* Floating nav entrance animation */
    .floating-nav {
        animation: slideDown 0.6s ease-out;
    }
    
    .mobile-bottom-nav {
        animation: slideUp 0.6s ease-out;
    }
    
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    /* Mobile nav enhancements */
    .mobile-nav-link {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .mobile-nav-link:hover {
        transform: scale(1.05) translateY(-2px);
    }
    
    .mobile-nav-item.active .mobile-nav-link {
        animation: mobilePulse 2s infinite;
    }
    
    @keyframes mobilePulse {
        0%, 100% {
            box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
        }
        50% {
            box-shadow: 0 5px 25px rgba(37, 99, 235, 0.5);
        }
    }
    
    /* Mobile bottom nav specific styles */
    .mobile-bottom-nav {
        transition: all 0.3s ease;
    }
    
    .mobile-nav-container {
        transition: all 0.3s ease;
    }
    
    .mobile-nav-container:hover {
        transform: translateY(-2px);
    }
`;

document.head.appendChild(additionalStyles); 