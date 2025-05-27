// ===== Global Variables =====
const ownerWhatsApp = '2348123646242';
const ownerEmail = 'tadebayor41@gmail.com';
const bookingEmail = 'bookings@extoduscars.com';

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initThemeToggle();
  initCarousel();
  initFleetFilter();
  initCarDetailsTabs();
  initTestimonials();
  initForms();
  initBackToTop();
});

// ===== Theme Toggle Functionality =====
function initThemeToggle() {
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(themeToggle);
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Update icon based on current theme
  updateThemeIcon(savedTheme);
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// ===== Carousel Functionality =====
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  
  const inner = carousel.querySelector('.carousel-inner');
  const items = carousel.querySelectorAll('.carousel-item');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const indicators = carousel.querySelectorAll('.indicator');
  
  let currentIndex = 0;
  const totalItems = items.length;
  
  // Set first item as active
  items[0].classList.add('active');
  indicators[0].classList.add('active');
  
  // Auto-rotate carousel every 5 seconds
  let interval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', () => interval = setInterval(nextSlide, 5000));
  
  // Navigation buttons
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
  
  function updateCarousel() {
    items.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    items[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    // Reset timer when manually changing slide
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  }
}

// ===== Fleet Filter Functionality =====
function initFleetFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Filter fleet cards
      fleetCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || filter === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ===== Car Details Tabs Functionality =====
function initCarDetailsTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.car-details-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding content
      const tabId = this.getAttribute('data-tab');
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
          content.classList.add('active');
        }
      });
      
      // Initialize image thumbnails for the active tab
      initImageThumbnails(tabId);
    });
  });
  
  // Initialize thumbnails for the first tab
  if (tabButtons.length > 0) {
    const firstTabId = tabButtons[0].getAttribute('data-tab');
    initImageThumbnails(firstTabId);
  }
}

// ===== Image Thumbnails Functionality =====
function initImageThumbnails(tabId) {
  const container = document.getElementById(tabId);
  if (!container) return;
  
  const thumbnails = container.querySelectorAll('.thumbnail');
  const mainImage = container.querySelector('.main-image img');
  
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Update active thumbnail
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      this.classList.add('active');
      
      // Update main image
      const newSrc = this.getAttribute('data-main');
      mainImage.src = newSrc;
      mainImage.alt = this.alt;
    });
  });
}

// ===== Testimonials Slider Functionality =====
function initTestimonials() {
  const testimonials = document.querySelector('.testimonials-slider');
  if (!testimonials) return;
  
  const testimonialCards = testimonials.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  
  let currentIndex = 0;
  const totalTestimonials = testimonialCards.length;
  
  // Set first testimonial as active
  testimonialCards[0].classList.add('active');
  dots[0].classList.add('active');
  
  // Navigation buttons
  prevBtn.addEventListener('click', prevTestimonial);
  nextBtn.addEventListener('click', nextTestimonial);
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToTestimonial(index));
  });
  
  function updateTestimonial() {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonialCards[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }
  
  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateTestimonial();
  }
  
  function prevTestimonial() {
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonial();
  }
  
  function goToTestimonial(index) {
    currentIndex = index;
    updateTestimonial();
  }
  
  // Auto-rotate testimonials every 8 seconds
  setInterval(nextTestimonial, 8000);
}

// ===== Form Handling =====
function initForms() {
  // Quick Booking Form
  const quickBookingForm = document.getElementById('quickBookingForm');
  if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleBookingForm(this, 'quick');
    });
  }
  
  // Main Booking Form
  const mainBookingForm = document.getElementById('carBookingForm');
  if (mainBookingForm) {
    mainBookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleBookingForm(this, 'main');
    });
  }
  
  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleContactForm(this);
    });
  }
  
  // Newsletter Form
  const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-subscribe');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleNewsletterForm(this);
    });
  });
}

// ===== Booking Form Handler =====
function handleBookingForm(form, type) {
  const formData = new FormData(form);
  const bookingData = {};
  
  // Collect form data
  for (const [key, value] of formData.entries()) {
    bookingData[key] = value;
  }
  
  // Add timestamp
  bookingData.timestamp = new Date().toISOString();
  
  // Format message based on form type
  let whatsappMessage = '';
  let emailSubject = '';
  let emailBody = '';
  
  if (type === 'quick') {
    whatsappMessage = `*New Quick Booking Request*\n\n` +
                     `*Name:* ${bookingData['quick-name']}\n` +
                     `*Vehicle Type:* ${bookingData['quick-car-type']}\n` +
                     `*Pickup Date:* ${bookingData['quick-pickup']}\n` +
                     `*Return Date:* ${bookingData['quick-dropoff']}\n` +
                     `*Special Requests:* ${bookingData['quick-special'] || 'None'}\n` +
                     `*Message:* ${bookingData['quick-message'] || 'None'}\n\n` +
                     `_Submitted via Extodus Car Hire Website_`;
    
    emailSubject = `Quick Booking Request - ${bookingData['quick-name']}`;
    emailBody = `You have received a new quick booking request:\n\n` +
                `Name: ${bookingData['quick-name']}\n` +
                `Vehicle Type: ${bookingData['quick-car-type']}\n` +
                `Pickup Date: ${bookingData['quick-pickup']}\n` +
                `Return Date: ${bookingData['quick-dropoff']}\n` +
                `Special Requests: ${bookingData['quick-special'] || 'None'}\n` +
                `Message: ${bookingData['quick-message'] || 'None'}\n\n` +
                `Timestamp: ${bookingData.timestamp}`;
  } else {
    // Main booking form
    whatsappMessage = `*New Vehicle Booking*\n\n` +
                     `*Name:* ${bookingData.name}\n` +
                     `*Email:* ${bookingData.email}\n` +
                     `*Phone:* ${bookingData.phone}\n` +
                     `*Vehicle:* ${getVehicleName(bookingData['car-selection'])}\n` +
                     `*Pickup:* ${bookingData['pickup-date']} at ${bookingData['pickup-time']}\n` +
                     `*Return:* ${bookingData['return-date']} at ${bookingData['return-time']}\n` +
                     `*Location:* ${getLocationName(bookingData['pickup-location'])}\n` +
                     `*Driver Option:* ${bookingData['driver-option']}\n` +
                     `*Special Requests:* ${bookingData['special-requests'] || 'None'}\n\n` +
                     `_Submitted via Extodus Car Hire Website_`;
    
    emailSubject = `New Booking - ${bookingData.name}`;
    emailBody = `You have received a new vehicle booking:\n\n` +
                `Name: ${bookingData.name}\n` +
                `Email: ${bookingData.email}\n` +
                `Phone: ${bookingData.phone}\n` +
                `Vehicle: ${getVehicleName(bookingData['car-selection'])}\n` +
                `Pickup: ${bookingData['pickup-date']} at ${bookingData['pickup-time']}\n` +
                `Return: ${bookingData['return-date']} at ${bookingData['return-time']}\n` +
                `Location: ${getLocationName(bookingData['pickup-location'])}\n` +
                `Driver Option: ${bookingData['driver-option']}\n` +
                `Special Requests: ${bookingData['special-requests'] || 'None'}\n\n` +
                `Timestamp: ${bookingData.timestamp}`;
  }
  
  // Send to WhatsApp
  const whatsappUrl = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(whatsappUrl, '_blank');
  
  // Send email (using mailto as fallback)
  const emailUrl = `mailto:${bookingEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  window.open(emailUrl);
  
  // Show confirmation to user
  showAlert('Booking Submitted', 'Your booking request has been sent successfully. We will contact you shortly to confirm your reservation.', 'success');
  
  // Reset form
  form.reset();
}

// Helper function to get vehicle name from value
function getVehicleName(value) {
  const vehicles = {
    'hilux': 'Toyota Hilux - ₦45,000/day',
    'prado': 'Toyota Prado - ₦65,000/day',
    'bumber': 'Toyota Bumber - ₦50,000/day',
    'brabus': 'Brabus - ₦120,000/day',
    'g-wagon': 'Mercedes G-Wagon - ₦150,000/day',
    'escalade': 'Cadillac Escalade - ₦130,000/day',
    'camry': 'Toyota Camry - ₦40,000/day',
    'flex': 'Ford Flex - ₦60,000/day',
    'sienna': 'Toyota Sienna - ₦55,000/day',
    'coaster': 'Toyota Coaster - ₦80,000/day'
  };
  return vehicles[value] || value;
}

// Helper function to get location name from value
function getLocationName(value) {
  const locations = {
    'lagos-airport': 'Lagos Airport (LOS)',
    'ibadan-city': 'Ibadan City Center',
    'victoria-island': 'Victoria Island, Lagos',
    'lekki': 'Lekki, Lagos',
    'other': 'Other Location'
  };
  return locations[value] || value;
}

// ===== Contact Form Handler =====
function handleContactForm(form) {
  const formData = new FormData(form);
  const contactData = {};
  
  // Collect form data
  for (const [key, value] of formData.entries()) {
    contactData[key] = value;
  }
  
  // Add timestamp
  contactData.timestamp = new Date().toISOString();
  
  // Format messages
  const emailSubject = `New Contact Message - ${contactData['contact-name']}`;
  const emailBody = `You have received a new contact message:\n\n` +
                   `Name: ${contactData['contact-name']}\n` +
                   `Email: ${contactData['contact-email']}\n` +
                   `Phone: ${contactData['contact-phone']}\n` +
                   `Subject: ${contactData['contact-subject']}\n` +
                   `Message: ${contactData['contact-message']}\n\n` +
                   `Timestamp: ${contactData.timestamp}`;
  
  // Send email
  const emailUrl = `mailto:${ownerEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  window.open(emailUrl);
  
  // Show confirmation to user
  showAlert('Message Sent', 'Your message has been sent successfully. We will get back to you soon.', 'success');
  
  // Reset form
  form.reset();
}

// ===== Newsletter Form Handler =====
function handleNewsletterForm(form) {
  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput.value.trim();
  
  if (!email || !validateEmail(email)) {
    showAlert('Invalid Email', 'Please enter a valid email address.', 'error');
    return;
  }
  
  // In a real implementation, you would send this to your server
  // For now, we'll just show a confirmation
  
  // Format messages
  const emailSubject = `New Newsletter Subscription`;
  const emailBody = `A new subscriber has joined your newsletter:\n\n` +
                   `Email: ${email}\n\n` +
                   `Timestamp: ${new Date().toISOString()}`;
  
  // Send email
  const emailUrl = `mailto:${ownerEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  window.open(emailUrl);
  
  // Show confirmation to user
  showAlert('Subscribed!', 'Thank you for subscribing to our newsletter.', 'success');
  
  // Reset form
  form.reset();
}

// ===== Back to Top Button =====
function initBackToTop() {
  const backToTop = document.createElement('a');
  backToTop.href = '#home';
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
}

// ===== Helper Functions =====
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showAlert(title, message, type) {
  // Create alert element
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  
  // Add content
  alert.innerHTML = `
    <h4>${title}</h4>
    <p>${message}</p>
    <button class="close-alert">&times;</button>
  `;
  
  // Style the alert
  alert.style.position = 'fixed';
  alert.style.top = '20px';
  alert.style.right = '20px';
  alert.style.maxWidth = '400px';
  alert.style.padding = '1rem';
  alert.style.backgroundColor = type === 'error' ? '#f8d7da' : '#d1e7dd';
  alert.style.color = type === 'error' ? '#842029' : '#0f5132';
  alert.style.border = type === 'error' ? '1px solid #f5c2c7' : '1px solid #badbcc';
  alert.style.borderRadius = '0.25rem';
  alert.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  alert.style.zIndex = '9999';
  alert.style.transition = 'all 0.3s ease';
  
  // Add close button functionality
  const closeBtn = alert.querySelector('.close-alert');
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '0.5rem';
  closeBtn.style.right = '0.5rem';
  closeBtn.style.background = 'none';
  closeBtn.style.border = 'none';
  closeBtn.style.fontSize = '1.25rem';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.padding = '0 0.5rem';
  
  closeBtn.addEventListener('click', function() {
    alert.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(alert);
    }, 300);
  });
  
  // Add to document
  document.body.appendChild(alert);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    alert.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(alert);
    }, 300);
  }, 5000);
}
