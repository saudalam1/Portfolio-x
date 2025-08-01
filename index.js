// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const resumeBtn = document.querySelector('.resume-btn');
    const body = document.body;

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        // Toggle button animation
        mobileMenuBtn.classList.toggle('active');
        
        // Toggle menu visibility
        navMenu.classList.toggle('active');
        resumeBtn.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.nav-list li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = event.target.closest('.nav-menu');
        const isClickOnButton = event.target.closest('.mobile-menu-btn');
        
        if (!isClickInsideMenu && !isClickOnButton && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Function to close mobile menu
    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        resumeBtn.classList.remove('active');
        body.style.overflow = 'auto';
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // What I Do Section Enhancements
    initializeWhatIDoSection();
});

// What I Do Section Interactive Features
function initializeWhatIDoSection() {
    const skillsSection = document.querySelector('.what-i-do');
    const skillIcons = document.querySelectorAll('.skills-png img');
    const skillItems = document.querySelectorAll('.skills ul li');
    const svgElement = document.querySelector('.what-i-do-pic svg');

    // Animate skill icons on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillIcons();
                animateSkillItems();
                if (svgElement) {
                    animateSVG();
                }
            }
        });
    }, observerOptions);

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Skill icons hover effects
    skillIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.transition = 'all 0.3s ease';
            
            // Add glow effect
            this.style.filter = 'brightness(1.3) drop-shadow(0 0 10px rgba(56, 189, 248, 0.5))';
            
            // Show tooltip
            showTooltip(this, this.alt);
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1)';
            
            // Hide tooltip
            hideTooltip();
        });

        // Click effect
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Skill items hover effects
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = 'var(--accent-color)';
            this.style.transition = 'all 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = 'var(--text-primary)';
        });
    });

    // SVG interaction
    if (svgElement) {
        svgElement.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 10px 30px rgba(56, 189, 248, 0.4))';
        });

        svgElement.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 10px 30px rgba(56, 189, 248, 0.2))';
        });
    }
}

// Animate skill icons with staggered delay
function animateSkillIcons() {
    const skillIcons = document.querySelectorAll('.skills-png img');
    
    skillIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            icon.style.transition = 'all 0.6s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Animate skill list items
function animateSkillItems() {
    const skillItems = document.querySelectorAll('.skills ul li');
    
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 600 + (index * 200));
    });
}

// Animate SVG elements
function animateSVG() {


    svgGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'rotate(10deg) scale(0.9)';
        
        setTimeout(() => {
            group.style.transition = 'all 1s ease';
            group.style.opacity = '1';
            group.style.transform = 'rotate(0deg) scale(1)';
        }, 300 + (index * 100));
    });
}

// Tooltip functionality
function showTooltip(element, text) {
    // Remove existing tooltip
    hideTooltip();
    
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--secondary-bg);
        color: var(--text-primary);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.875rem;
        font-family: 'Roboto Mono', monospace;
        border: 1px solid var(--border-color);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    // Show tooltip
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }, 10);
}

function hideTooltip() {
    const existingTooltip = document.querySelector('.skill-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
}

// Parallax effect for SVG
window.addEventListener('scroll', function() {
    const svgElement = document.querySelector('.what-i-do-pic svg');
    if (svgElement) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        svgElement.style.transform = `translateY(${rate}px)`;
    }
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(event) {
    const skillIcons = document.querySelectorAll('.skills-png img');
    const currentIndex = Array.from(skillIcons).findIndex(icon => icon === document.activeElement);
    
    if (event.key === 'ArrowRight' && currentIndex < skillIcons.length - 1) {
        skillIcons[currentIndex + 1].focus();
    } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
        skillIcons[currentIndex - 1].focus();
    }
});

// Make skill icons focusable for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const skillIcons = document.querySelectorAll('.skills-png img');
    skillIcons.forEach(icon => {
        icon.setAttribute('tabindex', '0');
        icon.setAttribute('role', 'button');
        icon.setAttribute('aria-label', icon.alt);
    });
}); 


    // Form submission handling
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const messageDiv = document.getElementById('formMessage');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Add loading state
      submitBtn.classList.add('loading');
      btnText.style.opacity = '0';

      // Simulate form submission (replace with actual form handling)
      try {
        await simulateFormSubmission();
        showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon! 🎉', 'success');
        form.reset();
      } catch (error) {
        showMessage('Oops! Something went wrong. Please try again or contact me directly. 😅', 'error');
      }

      // Remove loading state
      submitBtn.classList.remove('loading');
      btnText.style.opacity = '1';
    });

    // Simulate form submission (replace with actual API call)
    function simulateFormSubmission() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          Math.random() > 0.2 ? resolve() : reject();
        }, 2000);
      });
    }

    // Show success/error messages
    function showMessage(text, type) {
      messageDiv.textContent = text;
      messageDiv.className = `message ${type}`;
      messageDiv.classList.add('show');

      setTimeout(() => {
        messageDiv.classList.remove('show');
      }, 5000);
    }

    // Copy to clipboard function
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        showMessage(`Copied "${text}" to clipboard! 📋`, 'success');
      }).catch(() => {
        showMessage('Unable to copy to clipboard. Please copy manually.', 'error');
      });
    }

    // Form validation with real-time feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', validateInput);
      input.addEventListener('input', clearValidation);
    });

    function validateInput(e) {
      const input = e.target;
      const value = input.value.trim();

      // Remove existing validation styles
      input.style.borderColor = '';

      if (!value) {
        input.style.borderColor = 'var(--error-color)';
        return false;
      }

      if (input.type === 'email' && !isValidEmail(value)) {
        input.style.borderColor = 'var(--error-color)';
        return false;
      }

      input.style.borderColor = 'var(--success-color)';
      return true;
    }

    function clearValidation(e) {
      e.target.style.borderColor = '';
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('[style*="animation"]').forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });

    // Add typing effect to form labels
    function addTypingEffect() {
      const labels = form.querySelectorAll('label');
      labels.forEach((label, index) => {
        const text = label.textContent;
        label.textContent = '';

        setTimeout(() => {
          let i = 0;
          const typeInterval = setInterval(() => {
            label.textContent = text.slice(0, i + 1);
            i++;
            if (i >= text.length) {
              clearInterval(typeInterval);
            }
          }, 50);
        }, 2000 + (index * 200));
      });
    }

    // Initialize typing effect when form comes into view
    const formObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          addTypingEffect();
          formObserver.unobserve(entry.target);
        }
      });
    });

    formObserver.observe(form);

    // Add particle effect on form interaction
    function createParticle(x, y) {
      const particle = document.createElement('div');
      particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: particleFloat 1s ease-out forwards;
            `;

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);
    }

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
            @keyframes particleFloat {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px) scale(0);
                }
            }
        `;
    document.head.appendChild(style);

    // Add particles on form focus
    inputs.forEach(input => {
      input.addEventListener('focus', (e) => {
        const rect = e.target.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            createParticle(
              rect.left + Math.random() * rect.width,
              rect.top + Math.random() * rect.height
            );
          }, i * 100);
        }
      });
    });




    const shadow = document.querySelector('.cursor-shadow');

document.addEventListener('mousemove', (e) => {
  shadow.style.left = `${e.clientX}px`;
  shadow.style.top = `${e.clientY}px`;
});
