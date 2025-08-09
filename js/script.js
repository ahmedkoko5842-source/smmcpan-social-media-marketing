// SMMCPAN Website JavaScript
// Handles tab switching, form validation, and interactive features

document.addEventListener("DOMContentLoaded", function() {
    
    // Tab Switching Functionality
    function initializeTabs() {
        try {
            const tabButtons = document.querySelectorAll(".tab-button");
            const tabPanels = document.querySelectorAll(".tab-panel");
            
            if (tabButtons.length === 0 || tabPanels.length === 0) {
                console.log("No tabs found on this page");
                return;
            }
            
            tabButtons.forEach((button, index) => {
                button.addEventListener("click", function() {
                    // Remove active class from all buttons and panels
                    tabButtons.forEach(btn => btn.classList.remove("active"));
                    tabPanels.forEach(panel => panel.classList.remove("active"));
                    
                    // Add active class to clicked button
                    this.classList.add("active");
                    
                    // Show corresponding panel
                    const tabId = this.getAttribute("data-tab");
                    const targetPanel = document.getElementById(tabId);
                    
                    if (targetPanel) {
                        targetPanel.classList.add("active");
                    } else {
                        // Fallback: use index-based selection
                        if (tabPanels[index]) {
                            tabPanels[index].classList.add("active");
                        }
                    }
                });
            });
        } catch (error) {
            console.error("Error initializing tabs:", error);
        }
    }
    
    // Form Validation Functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(input, message) {
        input.classList.add("input-error");
        let errorElement = input.parentNode.querySelector(".error-message");
        
        if (!errorElement) {
            errorElement = document.createElement("div");
            errorElement.className = "error-message";
            input.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.classList.add("show");
    }
    
    function clearError(input) {
        input.classList.remove("input-error");
        const errorElement = input.parentNode.querySelector(".error-message");
        if (errorElement) {
            errorElement.classList.remove("show");
        }
    }
    
    function clearAllErrors(form) {
        const inputs = form.querySelectorAll("input");
        inputs.forEach(input => clearError(input));
    }
    
    // Login Form Validation
    function initializeLoginForm() {
        const loginForm = document.querySelector(".login-form");
        
        if (!loginForm) {
            return;
        }
        
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            try {
                clearAllErrors(this);
                
                const emailInput = this.querySelector('input[type="email"]');
                const passwordInput = this.querySelector('input[type="password"]');
                
                let isValid = true;
                
                // Validate email
                if (!emailInput.value.trim()) {
                    showError(emailInput, "البريد الالكتروني مطلوب");
                    isValid = false;
                } else if (!validateEmail(emailInput.value.trim())) {
                    showError(emailInput, "يرجى ادخال بريد الكتروني صحيح");
                    isValid = false;
                }
                
                // Validate password
                if (!passwordInput.value.trim()) {
                    showError(passwordInput, "كلمة المرور مطلوبة");
                    isValid = false;
                } else if (passwordInput.value.length < 6) {
                    showError(passwordInput, "كلمة المرور يجب أن تكون 6 أحرف على الأقل");
                    isValid = false;
                }
                
                if (isValid) {
                    // Simulate login process
                    this.classList.add("loading");
                    setTimeout(() => {
                        this.classList.remove("loading");
                        alert("تم تسجيل الدخول بنجاح (محاكاة)");
                    }, 1000);
                }
                
            } catch (error) {
                console.error("Login form error:", error);
                alert("حدث خطأ أثناء تسجيل الدخول");
            }
        });
    }
    
    // Signup Form Validation
    function initializeSignupForm() {
        const signupForm = document.getElementById("signup-form");
        
        if (!signupForm) {
            return;
        }
        
        signupForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            try {
                clearAllErrors(this);
                
                const fullNameInput = document.getElementById("full-name");
                const emailInput = document.getElementById("email");
                const passwordInput = document.getElementById("password");
                const confirmPasswordInput = document.getElementById("confirm-password");
                
                let isValid = true;
                
                // Validate full name
                if (!fullNameInput.value.trim()) {
                    showError(fullNameInput, "الاسم الكامل مطلوب");
                    isValid = false;
                } else if (fullNameInput.value.trim().length < 2) {
                    showError(fullNameInput, "الاسم يجب أن يكون حرفين على الأقل");
                    isValid = false;
                }
                
                // Validate email
                if (!emailInput.value.trim()) {
                    showError(emailInput, "البريد الالكتروني مطلوب");
                    isValid = false;
                } else if (!validateEmail(emailInput.value.trim())) {
                    showError(emailInput, "يرجى ادخال بريد الكتروني صحيح");
                    isValid = false;
                }
                
                // Validate password
                if (!passwordInput.value.trim()) {
                    showError(passwordInput, "كلمة المرور مطلوبة");
                    isValid = false;
                } else if (passwordInput.value.length < 8) {
                    showError(passwordInput, "كلمة المرور يجب أن تكون 8 أحرف على الأقل");
                    isValid = false;
                }
                
                // Validate confirm password
                if (!confirmPasswordInput.value.trim()) {
                    showError(confirmPasswordInput, "تأكيد كلمة المرور مطلوب");
                    isValid = false;
                } else if (passwordInput.value !== confirmPasswordInput.value) {
                    showError(confirmPasswordInput, "كلمتا المرور غير متطابقتين");
                    isValid = false;
                }
                
                if (isValid) {
                    // Simulate signup process
                    this.classList.add("loading");
                    setTimeout(() => {
                        this.classList.remove("loading");
                        alert("تم التسجيل بنجاح (محاكاة)");
                        // Redirect to login page
                        window.location.href = "login.html";
                    }, 1500);
                }
                
            } catch (error) {
                console.error("Signup form error:", error);
                alert("حدث خطأ أثناء التسجيل");
            }
        });
    }
    
    // Reset Password Form Validation
    function initializeResetPasswordForm() {
        const resetForm = document.getElementById("reset-password-form");
        
        if (!resetForm) {
            return;
        }
        
        resetForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            try {
                clearAllErrors(this);
                
                const emailInput = document.getElementById("reset-email");
                let isValid = true;
                
                // Validate email
                if (!emailInput.value.trim()) {
                    showError(emailInput, "البريد الالكتروني مطلوب");
                    isValid = false;
                } else if (!validateEmail(emailInput.value.trim())) {
                    showError(emailInput, "يرجى ادخال بريد الكتروني صحيح");
                    isValid = false;
                }
                
                if (isValid) {
                    // Simulate reset process
                    this.classList.add("loading");
                    setTimeout(() => {
                        this.classList.remove("loading");
                        alert("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الالكتروني (محاكاة)");
                        emailInput.value = "";
                    }, 1000);
                }
                
            } catch (error) {
                console.error("Reset password form error:", error);
                alert("حدث خطأ أثناء إرسال رابط إعادة التعيين");
            }
        });
    }
    
    // Features Slider Functionality
    function initializeFeaturesSlider() {
        try {
            const prevBtn = document.querySelector(".slider-btn.prev");
            const nextBtn = document.querySelector(".slider-btn.next");
            const featuresGrid = document.querySelector(".features-grid");
            
            if (!prevBtn || !nextBtn || !featuresGrid) {
                return;
            }
            
            let currentIndex = 0;
            const items = featuresGrid.querySelectorAll(".feature-item");
            const itemsPerView = window.innerWidth <= 768 ? 1 : 3;
            const maxIndex = Math.max(0, items.length - itemsPerView);
            
            function updateSlider() {
                const translateX = currentIndex * (100 / itemsPerView);
                featuresGrid.style.transform = `translateX(-${translateX}%)`;
                
                // Update button states
                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex >= maxIndex;
            }
            
            prevBtn.addEventListener("click", function() {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });
            
            nextBtn.addEventListener("click", function() {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateSlider();
                }
            });
            
            // Initialize slider
            updateSlider();
            
            // Update on window resize
            window.addEventListener("resize", function() {
                currentIndex = 0;
                updateSlider();
            });
            
        } catch (error) {
            console.error("Error initializing features slider:", error);
        }
    }
    
    // Smooth Scrolling for Anchor Links
    function initializeSmoothScrolling() {
        try {
            const links = document.querySelectorAll('a[href^="#"]');
            
            links.forEach(link => {
                link.addEventListener("click", function(e) {
                    const targetId = this.getAttribute("href");
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                });
            });
        } catch (error) {
            console.error("Error initializing smooth scrolling:", error);
        }
    }
    
    // Image Error Handling
    function initializeImageErrorHandling() {
        try {
            const images = document.querySelectorAll("img");
            
            images.forEach(img => {
                img.addEventListener("error", function() {
                    // Create a placeholder div
                    const placeholder = document.createElement("div");
                    placeholder.style.width = this.width || "50px";
                    placeholder.style.height = this.height || "50px";
                    placeholder.style.backgroundColor = "#f0f0f0";
                    placeholder.style.display = "flex";
                    placeholder.style.alignItems = "center";
                    placeholder.style.justifyContent = "center";
                    placeholder.style.color = "#999";
                    placeholder.style.fontSize = "12px";
                    placeholder.style.border = "1px solid #ddd";
                    placeholder.textContent = "صورة";
                    
                    // Replace the broken image with placeholder
                    this.parentNode.replaceChild(placeholder, this);
                });
            });
        } catch (error) {
            console.error("Error initializing image error handling:", error);
        }
    }
    
    // Input Real-time Validation
    function initializeRealTimeValidation() {
        try {
            const emailInputs = document.querySelectorAll('input[type="email"]');
            const passwordInputs = document.querySelectorAll('input[type="password"]');
            
            emailInputs.forEach(input => {
                input.addEventListener("blur", function() {
                    if (this.value.trim() && !validateEmail(this.value.trim())) {
                        showError(this, "يرجى ادخال بريد الكتروني صحيح");
                    } else {
                        clearError(this);
                    }
                });
                
                input.addEventListener("input", function() {
                    if (this.classList.contains("input-error")) {
                        clearError(this);
                    }
                });
            });
            
            passwordInputs.forEach(input => {
                input.addEventListener("input", function() {
                    if (this.classList.contains("input-error")) {
                        clearError(this);
                    }
                });
            });
        } catch (error) {
            console.error("Error initializing real-time validation:", error);
        }
    }
    
    // Testimonials Carousel (if needed)
    function initializeTestimonialsCarousel() {
        try {
            const testimonialsGrid = document.querySelector(".testimonials-grid");
            
            if (!testimonialsGrid) {
                return;
            }
            
            // Add touch/swipe support for mobile
            let startX = 0;
            let currentX = 0;
            let isDragging = false;
            
            testimonialsGrid.addEventListener("touchstart", function(e) {
                startX = e.touches[0].clientX;
                isDragging = true;
            });
            
            testimonialsGrid.addEventListener("touchmove", function(e) {
                if (!isDragging) return;
                currentX = e.touches[0].clientX;
            });
            
            testimonialsGrid.addEventListener("touchend", function(e) {
                if (!isDragging) return;
                
                const diffX = startX - currentX;
                
                if (Math.abs(diffX) > 50) {
                    // Implement carousel logic here if needed
                    console.log("Swipe detected:", diffX > 0 ? "left" : "right");
                }
                
                isDragging = false;
            });
        } catch (error) {
            console.error("Error initializing testimonials carousel:", error);
        }
    }
    
    // Initialize all functionality
    function initializeAll() {
        initializeTabs();
        initializeLoginForm();
        initializeSignupForm();
        initializeResetPasswordForm();
        initializeFeaturesSlider();
        initializeSmoothScrolling();
        initializeImageErrorHandling();
        initializeRealTimeValidation();
        initializeTestimonialsCarousel();
        
        console.log("SMMCPAN website initialized successfully");
    }
    
    // Run initialization
    initializeAll();
    
    // Handle page visibility changes
    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === "visible") {
            // Re-initialize if needed when page becomes visible
            console.log("Page became visible");
        }
    });
    
    // Global error handler
    window.addEventListener("error", function(e) {
        console.error("Global error:", e.error);
        // Don't show error to user in production
    });
    
    // Expose some functions globally for debugging
    window.SMMCPAN = {
        validateEmail: validateEmail,
        showError: showError,
        clearError: clearError
    };
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}
