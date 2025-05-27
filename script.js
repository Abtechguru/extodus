// ========== Mobile Menu Toggle ==========
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('open');
            menuBtn.classList.toggle('active');
        });

        // Close menu on nav link click (for one page nav)
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    navbar.classList.remove('open');
                    menuBtn.classList.remove('active');
                }
            });
        });
    }

    // ========== Sticky Header on Scroll ==========
    const header = document.querySelector('.sticky-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========== Carousel Functionality ==========
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        let currentSlide = 0;
        const slides = carousel.querySelectorAll('.carousel-item');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel-control.prev');
        const nextBtn = carousel.querySelector('.carousel-control.next');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                let idx = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(idx);
            });
            nextBtn.addEventListener('click', () => {
                let idx = (currentSlide + 1) % slides.length;
                showSlide(idx);
            });
        }

        indicators.forEach((dot, i) => {
            dot.addEventListener('click', () => showSlide(i));
        });

        // Auto-slide every 6s
        setInterval(() => {
            showSlide((currentSlide + 1) % slides.length);
        }, 6000);

        showSlide(0);
    }

    // ========== Fleet Filter ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const fleetCards = document.querySelectorAll('.fleet-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            fleetCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ========== Car Details Tabs ==========
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.car-details-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tabContents.forEach(tab => {
                tab.classList.toggle('active', tab.id === btn.dataset.tab);
            });
        });
    });

    // ========== Car Details Image Gallery ==========
    document.querySelectorAll('.thumbnail-container').forEach(container => {
        container.querySelectorAll('.thumbnail').forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                container.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
                const mainImg = container.parentElement.querySelector('.main-image img');
                mainImg.src = thumbnail.dataset.main;
            });
        });
    });

    // ========== Testimonials Slider ==========
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    let testimonialIdx = 0;
    function showTestimonial(idx) {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === idx);
        });
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
        testimonialIdx = idx;
    }
    if (testimonialCards.length > 0) {
        document.querySelector('.testimonial-prev').addEventListener('click', () => {
            showTestimonial((testimonialIdx - 1 + testimonialCards.length) % testimonialCards.length);
        });
        document.querySelector('.testimonial-next').addEventListener('click', () => {
            showTestimonial((testimonialIdx + 1) % testimonialCards.length);
        });
        testimonialDots.forEach((dot, i) => {
            dot.addEventListener('click', () => showTestimonial(i));
        });
        setInterval(() => {
            showTestimonial((testimonialIdx + 1) % testimonialCards.length);
        }, 6500);
        showTestimonial(0);
    }

    // ========== Booking Form Validation ==========
    const bookingForm = document.getElementById('carBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic Validation Example
            let valid = true;
            bookingForm.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('input-error');
                } else {
                    input.classList.remove('input-error');
                }
            });
            if (!valid) {
                alert('Please fill in all required fields.');
                return;
            }
            // Add your AJAX or submission logic here
            alert('Booking submitted! We will contact you soon.');
            bookingForm.reset();
        });
    }

    // ========== Quick Booking Form ==========
    const quickBookingForm = document.querySelector('.quick-booking-form');
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', e => {
            e.preventDefault();
            // You can add AJAX or redirect logic here
            alert('Checking availability... Our team will contact you shortly.');
            quickBookingForm.reset();
        });
    }

    // ========== Contact Form Validation ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            let valid = true;
            contactForm.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('input-error');
                } else {
                    input.classList.remove('input-error');
                }
            });
            if (!valid) {
                alert('Please fill in all required fields.');
                return;
            }
            // Add your AJAX or submission logic here
            alert('Thank you for contacting us. We will respond shortly.');
            contactForm.reset();
        });
    }

    // ========== Newsletter Subscription ==========
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', e => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (!emailInput.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
                emailInput.classList.add('input-error');
                alert('Please enter a valid email address.');
                return;
            }
            emailInput.classList.remove('input-error');
            // Add your AJAX or subscription logic here
            alert('Subscribed! You will receive our latest updates.');
            newsletterForm.reset();
        });
    }

    // ========== Responsive Adjustments ==========
    function responsiveAdjustments() {
        // Example: Collapse menu if desktop
        if (window.innerWidth >= 992) {
            document.querySelector('.navbar').classList.remove('open');
            document.querySelector('.mobile-menu-btn').classList.remove('active');
        }
    }
    window.addEventListener('resize', responsiveAdjustments);

    // ========== Keyboard Accessibility ==========
    // Allow menu toggle via Enter/Space
    if (menuBtn) {
        menuBtn.setAttribute('tabindex', '0');
        menuBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuBtn.click();
            }
        });
    }
});

// ========== Google Maps Inline Embed ==========
/**
 * Replaces the Google Maps API loader with an inline iframe embed.
 * Usage: Call embedGoogleMap with a container selector/id and a location string or coordinates.
 * Example: embedGoogleMap('#map-container', 'New York, NY');
 */
function embedGoogleMap(containerSelector, location, options = {}) {
    const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
    if (!container) return;
    // Default options for width, height, zoom, etc.
    const width = options.width || "100%";
    const height = options.height || "400";
    const zoom = options.zoom || 14;
    // URL encode the location
    const loc = encodeURIComponent(location);
    const src = `https://www.google.com/maps?q=${loc}&z=${zoom}&output=embed`;
    // Clean previous map if any
    container.innerHTML = '';
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', src);
    iframe.setAttribute('width', width);
    iframe.setAttribute('height', height);
    iframe.setAttribute('style', 'border:0;');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    container.appendChild(iframe);
}

// ========== Accessibility Improvements ==========
(function enhanceAccessibility() {
    // Add ARIA roles, improve focus, etc.
    document.querySelectorAll('.btn-primary, .btn-outline, .filter-btn, .tab-btn').forEach(btn => {
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
    });
})();
