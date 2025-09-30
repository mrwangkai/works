// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', formData);

        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll (optional enhancement)
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .detail-section, .resume-item, .info-card');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Impact Metrics Section Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
    const impactSection = document.getElementById('impactMetrics');

    if (impactSection) {
        let lastScrollTop = 0;
        const scrollThreshold = 200; // Distance to scroll before minimizing

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const impactSectionTop = impactSection.offsetTop;
            const impactSectionHeight = impactSection.offsetHeight;
            const scrolledPastSection = scrollTop > (impactSectionTop + impactSectionHeight + scrollThreshold);

            if (scrolledPastSection && scrollTop > lastScrollTop) {
                // Scrolling down and past the section
                impactSection.classList.add('minimized');
            } else if (scrollTop < (impactSectionTop + impactSectionHeight)) {
                // Scrolled back up before the section ends
                impactSection.classList.remove('minimized');
            }

            lastScrollTop = scrollTop;
        };

        // Throttle scroll events for better performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
});

// Table of Contents Active State on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const tocLinks = document.querySelectorAll('.toc-link');

    if (tocLinks.length > 0) {
        const sections = document.querySelectorAll('.content-section[id]');
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;

        const updateActiveLink = () => {
            let currentSection = '';
            const scrollPosition = window.scrollY + navbarHeight + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        };

        // Throttle scroll events for better performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveLink();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial check
        updateActiveLink();
    }
});

// Contact Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactModal();
    }
});

// Handle modal form submission
document.addEventListener('DOMContentLoaded', () => {
    const modalForm = document.getElementById('modalContactForm');

    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                email: document.getElementById('modalEmail').value,
                message: document.getElementById('modalMessage').value
            };

            console.log('Form submitted:', formData);
            alert('Thank you for your message! I will get back to you soon.');
            closeContactModal();
            modalForm.reset();
        });
    }
});