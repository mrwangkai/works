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
    const formMessage = document.getElementById('formMessage');
    const submitButton = document.getElementById('submitButton');

    if (modalForm) {
        modalForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const email = document.getElementById('modalEmail').value;
            const message = document.getElementById('modalMessage').value;

            // Clear previous messages
            formMessage.className = 'form-message';
            formMessage.textContent = '';

            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                const response = await fetch('https://formspree.io/f/xnngyjge', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        message: message
                    })
                });

                if (response.ok) {
                    // Success
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
                    modalForm.reset();

                    // Close modal after 3 seconds
                    setTimeout(() => {
                        closeContactModal();
                        formMessage.className = 'form-message';
                        formMessage.textContent = '';
                    }, 3000);
                } else {
                    // Error from server
                    const errorData = await response.json().catch(() => ({}));
                    console.error('Formspree error:', response.status, errorData);

                    if (response.status === 403) {
                        formMessage.className = 'form-message error';
                        formMessage.textContent = 'Form not activated. Please check your email to confirm the Formspree form.';
                    } else {
                        formMessage.className = 'form-message error';
                        formMessage.textContent = 'Oops! There was a problem sending your message. Please try again.';
                    }
                }
            } catch (error) {
                // Network error
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Network error. Please check your connection and try again.';
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }
});

// Toggle Explorations Section
function toggleExplorations() {
    const content = document.querySelector('.explorations-content');
    const button = document.querySelector('.toggle-explorations');

    if (content.style.display === 'none') {
        content.style.display = 'block';
        button.textContent = 'Collapse';
    } else {
        content.style.display = 'none';
        button.textContent = 'Expand';
    }
}

// Detect if page is in iframe and handle back button
document.addEventListener('DOMContentLoaded', () => {
    if (window.self !== window.top) {
        // Page is in iframe
        document.body.classList.add('in-iframe');

        // Handle back link click
        const backLink = document.querySelector('.back-link');
        if (backLink) {
            backLink.addEventListener('click', (e) => {
                e.preventDefault();
                // Send message to parent window to close panel and scroll to works
                window.parent.postMessage({ action: 'closeProjectAndScrollToWorks' }, '*');
            });
        }
    }
});

// Mobile Progress Bar Navigation
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.querySelector('.mobile-progress-bar');

    if (!progressBar) return; // Only run on pages with progress bar

    const markers = document.querySelectorAll('.progress-marker');
    const progressLine = document.querySelector('.progress-line');
    const sections = [];

    // Build sections array from markers
    markers.forEach(marker => {
        const sectionId = marker.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            sections.push({
                id: sectionId,
                element: section,
                marker: marker
            });
        }
    });

    if (sections.length === 0) return;

    // Click handler for markers
    markers.forEach(marker => {
        marker.addEventListener('click', () => {
            const sectionId = marker.getAttribute('data-section');
            const section = document.getElementById(sectionId);

            if (section) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const progressBarHeight = progressBar.offsetHeight || 0;
                const offset = navbarHeight + progressBarHeight + 20;

                const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll tracking
    const observerOptions = {
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0
    };

    const updateProgress = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        let activeIndex = -1;

        // Find the active section
        sections.forEach((section, index) => {
            const rect = section.element.getBoundingClientRect();
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const progressBarHeight = progressBar.offsetHeight || 0;
            const threshold = navbarHeight + progressBarHeight + 100;

            if (rect.top <= threshold && rect.bottom > threshold) {
                activeIndex = index;
            }
        });

        // Update marker states
        markers.forEach((marker, index) => {
            marker.classList.remove('active', 'completed');

            if (index < activeIndex) {
                marker.classList.add('completed');
            } else if (index === activeIndex) {
                marker.classList.add('active');
            }
        });

        // Update progress line width
        if (activeIndex >= 0) {
            const progressPercent = (activeIndex / (sections.length - 1)) * 100;
            progressLine.style.setProperty('--progress-width', `${progressPercent}%`);
        } else {
            progressLine.style.setProperty('--progress-width', '0%');
        }
    };

    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial update
    updateProgress();
});

// Image Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create modal elements if they don't exist
    let imageModal = document.getElementById('imageModal');

    if (!imageModal) {
        imageModal = document.createElement('div');
        imageModal.id = 'imageModal';
        imageModal.className = 'image-modal';

        const closeButton = document.createElement('span');
        closeButton.className = 'image-modal-close';
        closeButton.innerHTML = '&times;';

        const modalImage = document.createElement('img');
        modalImage.className = 'image-modal-content';
        modalImage.id = 'modalImage';

        imageModal.appendChild(closeButton);
        imageModal.appendChild(modalImage);
        document.body.appendChild(imageModal);

        // Close modal when clicking X or outside image
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            closeImageModal();
        });

        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.classList.contains('active')) {
                closeImageModal();
            }
        });
    }

    // Add click handlers to all images in content sections
    const contentImages = document.querySelectorAll('.content-section img, .design-gallery img');

    contentImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            openImageModal(img.src, img.alt);
        });
    });
});

function openImageModal(imageSrc, imageAlt) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    if (modal && modalImg) {
        modalImg.src = imageSrc;
        modalImg.alt = imageAlt || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}