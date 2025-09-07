// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements that need animation
document.addEventListener('DOMContentLoaded', () => {
    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
        observer.observe(el);
    });

    // About cards
    document.querySelectorAll('.about-card').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(el);
    });

    // Video placeholder
    document.querySelectorAll('.video-placeholder').forEach(el => {
        observer.observe(el);
    });

    // Service cards
    document.querySelectorAll('.service-card').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Pricing cards
    document.querySelectorAll('.pricing-card').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Team cards
    document.querySelectorAll('.team-card').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Engineering team section header
    document.querySelectorAll('#engineering-team .section-header').forEach(el => {
        observer.observe(el);
    });

    // Contact items
    document.querySelectorAll('.contact-item').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Contact form
    document.querySelectorAll('.contact-form').forEach(el => {
        observer.observe(el);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Parallax effect for neuron background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const neuronBackground = document.querySelector('.neuron-background');
    if (neuronBackground) {
        const rate = scrolled * -0.5;
        neuronBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const company = contactForm.querySelector('input[placeholder="Company Name"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
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
        background: ${type === 'success' ? '#00d4ff' : type === 'error' ? '#ff4757' : '#3742fa'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
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
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// YouTube API for video control
let player;
let isVideoInView = false;

// Load YouTube API
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Initialize YouTube player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('interia-video', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Player is ready
    console.log('YouTube player ready');
}

function onPlayerStateChange(event) {
    // Handle player state changes
    if (event.data === YT.PlayerState.PLAYING) {
        console.log('Video started playing');
    } else if (event.data === YT.PlayerState.PAUSED) {
        console.log('Video paused');
    }
}

// Video container animation and auto-play control
const videoContainer = document.querySelector('.video-container');
const aboutSection = document.querySelector('#about');

if (videoContainer) {
    // Add the video container to the observer for scroll animation
    observer.observe(videoContainer);
}

// Intersection Observer for video auto-play
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Video section is in view
            isVideoInView = true;
            if (player && player.playVideo) {
                player.playVideo();
            }
        } else {
            // Video section is out of view
            isVideoInView = false;
            if (player && player.pauseVideo) {
                player.pauseVideo();
            }
        }
    });
}, {
    threshold: 0.5, // Trigger when 50% of the section is visible
    rootMargin: '0px 0px -100px 0px'
});

// Observe the about section for video control
if (aboutSection) {
    videoObserver.observe(aboutSection);
}

// Load YouTube API when page loads
loadYouTubeAPI();

// Logo interaction handlers
const logoImages = document.querySelectorAll('.nav-logo-image, .hero-logo, .footer-logo-image');
logoImages.forEach(logo => {
    logo.addEventListener('click', () => {
        // Add click animation
        logo.style.transform = 'scale(0.9)';
        setTimeout(() => {
            logo.style.transform = '';
        }, 150);
    });
    
    logo.addEventListener('mouseenter', () => {
        logo.style.cursor = 'pointer';
    });
});

// Hero logo container click handler
const logoDisplayContainer = document.querySelector('.logo-display-container');
if (logoDisplayContainer) {
    logoDisplayContainer.addEventListener('click', () => {
        // Add click effect
        logoDisplayContainer.style.transform = 'scale(1.02)';
        setTimeout(() => {
            logoDisplayContainer.style.transform = '';
        }, 200);
    });
}

// Add particle effect to logo
function createLogoParticle() {
    const logoParticles = document.querySelector('.logo-particles');
    if (logoParticles) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.6;
            animation: particle-float 6s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        logoParticles.appendChild(particle);
        
        setTimeout(() => particle.remove(), 6000);
    }
}

// Create logo particles periodically
setInterval(createLogoParticle, 1000);

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover sound effect (optional)
    const interactiveElements = document.querySelectorAll('.btn, .service-card, .pricing-card, .team-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = element.style.transform.replace('scale(1)', 'scale(1.02)');
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = element.style.transform.replace('scale(1.02)', 'scale(1)');
        });
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    // Parallax effect
    const scrolled = window.pageYOffset;
    const neuronBackground = document.querySelector('.neuron-background');
    if (neuronBackground) {
        const rate = scrolled * -0.5;
        neuronBackground.style.transform = `translateY(${rate}px)`;
    }
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add cursor trail effect (optional enhancement)
let mouseX = 0;
let mouseY = 0;
let cursorTrail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create cursor trail effect
    if (Math.random() > 0.9) { // Only create trail occasionally
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${mouseX}px;
            top: ${mouseY}px;
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.6;
        `;
        
        document.body.appendChild(trail);
        
        // Animate and remove trail
        setTimeout(() => {
            trail.style.transform = 'scale(0)';
            trail.style.opacity = '0';
            setTimeout(() => trail.remove(), 300);
        }, 100);
    }
});

// Add particle effect to hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #00d4ff;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.3;
        animation: particle-float 10s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    
    document.querySelector('.hero').appendChild(particle);
    
    setTimeout(() => particle.remove(), 10000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Contact Form Handling with EmailJS
(function() {
    // Initialize EmailJS
    emailjs.init("JCdSg-L1I7Dyr_bTR");
    
    // Track page views and interactions
    if (typeof gtag !== 'undefined') {
        // Track page view
        gtag('event', 'page_view', {
            'page_title': 'Interia - AI-Powered VR Architecture',
            'page_location': window.location.href
        });
        
        // Track button clicks
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.classList.contains('btn')) {
                gtag('event', 'button_click', {
                    'event_category': 'engagement',
                    'event_label': e.target.textContent.trim()
                });
            }
        });
    }
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = {
                name: contactForm.querySelector('input[name="name"]').value,
                email: contactForm.querySelector('input[name="email"]').value,
                company: contactForm.querySelector('input[name="company"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value
            };
            
            // Send email using EmailJS
            emailjs.send('service_uaiznu8', 'template_fmsotjd', {
                name: formData.name,
                email: formData.email,
                company: formData.company,
                message: formData.message,
                reply_to: formData.email
            })
            .then(function(response) {
                // Success
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                // Track successful form submission in Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'event_category': 'contact',
                        'event_label': 'contact_form_success'
                    });
                }
            })
            .catch(function(error) {
                // Error
                showNotification('Failed to send message. Please try again or contact us directly.', 'error');
                console.error('EmailJS Error:', error);
            })
            .finally(function() {
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            });
        });
    }
    
    // Notification function
    function showNotification(message, type) {
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
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        
        // Add animation styles
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                margin-left: 10px;
            }
        `;
        document.head.appendChild(animationStyle);
        
        // Add close functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
})();

// Interactive Data Pipeline Animation System
function initializeDataPipeline() {
    const pipelineNodes = document.querySelectorAll('.pipeline-node');
    
    if (!pipelineNodes.length) return;
    
    let currentStep = 0;
    let isRunning = true;
    
    // Start the pipeline automatically
    startPipelineAnimation();
    
    function startPipelineAnimation() {
        // Start the pipeline sequence
        animatePipeline();
        
        // Track pipeline start in Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pipeline_auto_start', {
                'event_category': 'Interaction',
                'event_label': 'Data Pipeline Auto Started',
                'value': 1
            });
        }
    }
    
    function animatePipeline() {
        currentStep = 0;
        
        function processNextStep() {
            if (currentStep < pipelineNodes.length) {
                const node = pipelineNodes[currentStep];
                
                // Mark previous step as completed
                if (currentStep > 0) {
                    pipelineNodes[currentStep - 1].classList.remove('active');
                    pipelineNodes[currentStep - 1].classList.add('completed');
                }
                
                // Activate current step
                node.classList.add('active');
                
                currentStep++;
                
                // Continue to next step after delay
                setTimeout(processNextStep, 2000);
            } else {
                // Pipeline complete - restart cycle
                setTimeout(() => {
                    pipelineNodes.forEach(node => {
                        node.classList.remove('active', 'completed');
                    });
                    
                    // Restart the cycle
                    setTimeout(() => {
                        animatePipeline();
                    }, 3000);
                    
                    // Track completion
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'pipeline_cycle_complete', {
                            'event_category': 'Interaction',
                            'event_label': 'Data Pipeline Cycle Complete',
                            'value': 1
                        });
                    }
                }, 2000);
            }
        }
        
        processNextStep();
    }
    
    // Auto-start pipeline when it comes into view
    const pipelineContainer = document.querySelector('.data-pipeline');
    if (pipelineContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isRunning) {
                    isRunning = true;
                    startPipelineAnimation();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(pipelineContainer);
    }
}

// Initialize Interactive Logo when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveLogo();
    initializeDataPipeline();
    initializeAutoScroll();
});

// Interactive Logo Animation System
function initializeInteractiveLogo() {
    const logoContainer = document.querySelector('.interactive-logo-container');
    if (!logoContainer) return;
    
    // Add mouse interaction effects
    logoContainer.addEventListener('mousemove', function(e) {
        const rect = logoContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
            const intensity = 1 - (distance / maxDistance);
            const logoCenter = logoContainer.querySelector('.logo-center');
            const orbitalRings = logoContainer.querySelectorAll('.orbital-ring');
            
            if (logoCenter) {
                logoCenter.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            }
            
            orbitalRings.forEach((ring, index) => {
                const speed = intensity * (index + 1) * 0.5;
                ring.style.animationDuration = `${20 - speed}s`;
            });
        }
    });
    
    logoContainer.addEventListener('mouseleave', function() {
        const logoCenter = logoContainer.querySelector('.logo-center');
        const orbitalRings = logoContainer.querySelectorAll('.orbital-ring');
        
        if (logoCenter) {
            logoCenter.style.transform = '';
        }
        
        orbitalRings.forEach((ring, index) => {
            ring.style.animationDuration = '';
        });
    });
    
    // Track logo interaction in Google Analytics
    if (typeof gtag !== 'undefined') {
        logoContainer.addEventListener('click', function() {
            gtag('event', 'logo_interaction', {
                'event_category': 'Interaction',
                'event_label': 'Interactive Logo Clicked',
                'value': 1
            });
        });
    }
}

// Auto-Scroll Timer System
function initializeAutoScroll() {
    let autoScrollTimer;
    let isUserScrolling = false;
    let currentSection = 0; // 0 = Hero, 1 = How It Works
    const sections = ['#home', '#how-it-works'];
    const scrollInterval = 20000; // 25 seconds
    
    // Function to scroll to next section
    function scrollToNextSection() {
        if (isUserScrolling) return; // Don't auto-scroll if user is scrolling
        
        currentSection = (currentSection + 1) % sections.length;
        const targetSection = document.querySelector(sections[currentSection]);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Track auto-scroll in Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'auto_scroll', {
                    'event_category': 'Navigation',
                    'event_label': `Auto-scrolled to ${sections[currentSection]}`,
                    'value': 1
                });
            }
        }
    }
    
    // Function to start auto-scroll timer
    function startAutoScroll() {
        if (autoScrollTimer) clearInterval(autoScrollTimer);
        autoScrollTimer = setInterval(scrollToNextSection, scrollInterval);
    }
    
    // Function to stop auto-scroll timer
    function stopAutoScroll() {
        if (autoScrollTimer) {
            clearInterval(autoScrollTimer);
            autoScrollTimer = null;
        }
    }
    
    // Function to reset auto-scroll timer
    function resetAutoScroll() {
        stopAutoScroll();
        setTimeout(() => {
            if (!isUserScrolling) {
                startAutoScroll();
            }
        }, 5000); // Wait 5 seconds before restarting
    }
    
    // Detect user scrolling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        isUserScrolling = true;
        stopAutoScroll();
        
        // Clear existing timeout
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        // Set timeout to detect when user stops scrolling
        scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
            resetAutoScroll();
        }, 3000); // Wait 3 seconds after user stops scrolling
    });
    
    // Detect user interaction with navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            isUserScrolling = true;
            stopAutoScroll();
            
            // Reset timer after navigation
            setTimeout(() => {
                isUserScrolling = false;
                resetAutoScroll();
            }, 5000);
        });
    });
    
    // Detect user interaction with buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            isUserScrolling = true;
            stopAutoScroll();
            
            // Reset timer after button click
            setTimeout(() => {
                isUserScrolling = false;
                resetAutoScroll();
            }, 5000);
        });
    });
    
    // Start auto-scroll when page loads
    setTimeout(() => {
        if (!isUserScrolling) {
            startAutoScroll();
        }
    }, 5000); // Wait 5 seconds after page load
    
    // Pause auto-scroll when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoScroll();
        } else {
            if (!isUserScrolling) {
                resetAutoScroll();
            }
        }
    });
    
    // Track auto-scroll initialization in Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'auto_scroll_initialized', {
            'event_category': 'Navigation',
            'event_label': 'Auto-scroll timer started',
            'value': 1
        });
    }
}

// Add CSS animations for pipeline
const pipelineStyle = document.createElement('style');
pipelineStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pipelineStyle);


