function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.style.width;
                
                // Reset width to 0 for animation effect
                progressBar.style.width = '0%';
                
                // Animate to target width after a short delay
                setTimeout(() => {
                    progressBar.style.width = percentage;
                }, 200);
                
                // Stop observing this element to prevent re-animation
                observer.unobserve(progressBar);
            }
        });
    }, { 
        threshold: 0.5, // Trigger when 50% of element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation slightly earlier
    });

    // Start observing all progress bars
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

/**
 * Add smooth scrolling to navigation links
 * Improves user experience when clicking menu items
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add active state to navigation links based on scroll position
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');
    
    function setActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.navbar-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Listen to scroll events
    window.addEventListener('scroll', setActiveLink);
    
    // Set initial active state
    setActiveLink();
}

/**
 * Add hover effects to skill tags
 * Makes them more interactive
 */
function initSkillTagInteractions() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Initialize all interactive features when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio website initialized by Psr354');
    
    // Initialize all features
    animateProgressBars();
    initSmoothScrolling();
    initActiveNavigation();
    initSkillTagInteractions();
    
    // Add loading animation complete class
    document.body.classList.add('loaded');
    
    console.log('✅ All interactive features loaded successfully');
});

/**
 * Handle window resize events
 * Ensures responsive behavior
 */
window.addEventListener('resize', function() {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        console.log('📱 Window resized, recalculating positions');
        // Re-initialize active navigation on resize
        initActiveNavigation();
    }, 250);
});

/**
 * Add keyboard navigation support
 * Improves accessibility
 */
document.addEventListener('keydown', function(e) {
    // ESC key to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Arrow keys for section navigation
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const sections = document.querySelectorAll('section[id], div[id]');
        const currentScroll = window.scrollY;
        
        for (let section of sections) {
            if (section.offsetTop > currentScroll + 100) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const sections = Array.from(document.querySelectorAll('section[id], div[id]')).reverse();
        const currentScroll = window.scrollY;
        
        for (let section of sections) {
            if (section.offsetTop < currentScroll - 100) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // supaya form tidak langsung reload/submit
      alert("ditunggu balasannya ya!");
      // kalau mau kirim form beneran, bisa tambahkan logic fetch/ajax di sini
      form.reset(); // reset form setelah alert
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    try {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Pesan berhasil dikirim, ditunggu balasannya ya!");
        form.reset();
      } else {
        alert("Gagal mengirim pesan: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan saat mengirim pesan. Coba lagi nanti.");
    }
  });
});

