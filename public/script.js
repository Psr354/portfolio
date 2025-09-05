

// animasi progress bar skills
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.style.width;
                
                
                progressBar.style.width = '0%';
                
               
                setTimeout(() => {
                    progressBar.style.width = percentage;
                }, 200);
                
                
                observer.unobserve(progressBar);
            }
        });
    }, { 
        threshold: 0.5, 
        rootMargin: '0px 0px -100px 0px' 
    });

    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active navigation link based on scroll position
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
    
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
               
                const activeLink = document.querySelector(`.navbar-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    
    window.addEventListener('scroll', setActiveLink);
    
    
    setActiveLink();
}

// Skill tag hover effects
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

// Initialize all features when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website initialized by Psr354');
    
    // Initialize all features
    animateProgressBars();
    initSmoothScrolling();
    initActiveNavigation();
    initSkillTagInteractions();
    
    // Add loading animation complete class
    document.body.classList.add('loaded');
    
    console.log('All interactive features loaded successfully');
});

// Recalculate positions on window resize
window.addEventListener('resize', function() {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        console.log('📱 Window resized, recalculating positions');
        // Re-initialize active navigation on resize
        initActiveNavigation();
    }, 250);
});

// Keyboard navigation support
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
// notifikasi form kontak
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (form) {
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
  }
});


