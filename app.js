document.addEventListener('DOMContentLoaded', () => {
  // --- Client-Side Routing ---
  function handleRoute() {
    let hash = window.location.hash || '#home';
    
    // Validate hash, fallback if non-existent
    const validHashes = ['#home', '#services', '#about', '#testimonials', '#contact'];
    if (!validHashes.includes(hash)) {
      hash = '#home';
    }
    
    // Update nav item active states in header
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === hash) {
        item.classList.add('active');
      }
    });
    
    // Update footer link active states (optional)
    document.querySelectorAll('.footer-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === hash) {
        link.style.color = 'var(--accent-gold)';
      } else {
        link.style.color = '';
      }
    });
    
    // Switch active view
    const views = document.querySelectorAll('.page-view');
    views.forEach(view => {
      view.classList.remove('active');
    });
    
    const targetView = document.querySelector(hash);
    if (targetView) {
      targetView.classList.add('active');
      // Scroll smoothly back to top on transition
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }
  }
  
  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // Initialize routing on load
  
  // --- Sticky Header Navigation ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Sidebar / Hamburger Navigation ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Interactive Before/After Sliders ---
  function initBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(slider => {
      let isDragging = false;
      
      function updatePos(clientX) {
        const rect = slider.getBoundingClientRect();
        let posX = clientX - rect.left;
        let percentage = (posX / rect.width) * 100;
        
        // Clamping percentage between 0% and 100%
        percentage = Math.max(0, Math.min(100, percentage));
        
        slider.style.setProperty('--slider-pos', `${percentage}%`);
      }
      
      // Touch and Mouse Event Helpers
      const handleStart = (e) => {
        isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        updatePos(clientX);
      };
      
      const handleMove = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        updatePos(clientX);
      };
      
      const handleEnd = () => {
        isDragging = false;
      };
      
      // Attach listeners to container (allows tapping anywhere to snap)
      slider.addEventListener('mousedown', handleStart);
      slider.addEventListener('touchstart', handleStart, { passive: true });
      
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove, { passive: false });
      
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchend', handleEnd);
    });
  }
  
  initBeforeAfterSliders();

  // --- Portfolio Slider Tabs ---
  const tabs = document.querySelectorAll('.slider-tab');
  const sliderItems = document.querySelectorAll('.slider-item');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const targetId = tab.getAttribute('data-target');
      sliderItems.forEach(item => {
        if (item.getAttribute('id') === targetId) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- Testimonial Switcher Logic ---
  const dots = document.querySelectorAll('.testimonial-dot');
  const cards = document.querySelectorAll('.testimonial-card');
  
  if (dots.length > 0 && cards.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        // Clear active class from dots & cards
        dots.forEach(d => d.classList.remove('active'));
        cards.forEach(c => c.classList.remove('active'));
        
        // Add active classes
        dot.classList.add('active');
        cards[index].classList.add('active');
      });
    });
  }

  // --- Contact Booking Form Submit ---
  const contactForm = document.getElementById('contactForm');
  const successCard = document.getElementById('successCard');
  const formHeader = document.querySelector('.contact-form-container .form-header');
  
  if (contactForm && successCard) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Collect values (for logging/simulating)
      const name = document.getElementById('clientName').value;
      const email = document.getElementById('clientEmail').value;
      const service = document.getElementById('clientService').value;
      const details = document.getElementById('clientDetails').value;
      
      console.log('Consultation Request Submitted:', { name, email, service, details });
      
      // Hide form elements with slide effect
      contactForm.style.transition = 'opacity 0.3s ease';
      contactForm.style.opacity = '0';
      
      if (formHeader) {
        formHeader.style.transition = 'opacity 0.3s ease';
        formHeader.style.opacity = '0';
      }
      
      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formHeader) formHeader.style.display = 'none';
        
        // Show success screen
        successCard.classList.add('active');
        
        // Customize success block with client name
        const clientNameSpan = document.getElementById('successClientName');
        if (clientNameSpan) {
          clientNameSpan.textContent = `, ${name}`;
        }
      }, 300);
    });
  }
});
