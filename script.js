// JavaScript for modern website functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Modern website loaded successfully!');
    
    // Initialize all functionality
    initContactForm();
    initThemeToggle();
    initDateDisplay();
    initSmoothScrolling();
    initAnimations();
    updateVisitorCounter();
    initEmergencyInfo();
    initHealthcareFeatures();
    initPatientLookup();
});

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (validateForm(name, email, message)) {
                // Simulate form submission with subtle effect
                showFormMessage('success', `Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon!`);
                contactForm.reset();
                
                // Add gentle celebration effect
                celebrateFormSubmission();
            } else {
                showFormMessage('error', 'Please fill in all fields correctly. Email must be valid and message should be at least 10 characters.');
            }
        });
        
        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
}

// Form validation functions
function validateForm(name, email, message) {
    const inquiryType = document.getElementById('inquiry-type').value;
    
    // Check for medical emergency
    if (inquiryType === 'emergency') {
        alert('⚠️ For medical emergencies, please call 911 or visit our Emergency Department immediately!');
        return false;
    }
    
    return name && name.length >= 2 && 
           email && isValidEmail(email) && 
           message && message.length >= 10 &&
           inquiryType && inquiryType !== '';
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Check for emergency keywords in message field
    if (field.name === 'message' && checkForEmergencyKeywords(value)) {
        showEmergencyWarning();
    }
    
    switch(field.type) {
        case 'text':
            isValid = value.length >= 2;
            break;
        case 'email':
            isValid = isValidEmail(value);
            break;
        case 'tel':
            isValid = value === '' || /^[\d\s\-\(\)\+\.]+$/.test(value);
            break;
        default:
            if (field.tagName === 'SELECT') {
                isValid = value !== '';
            } else {
                isValid = value.length >= 10;
            }
    }
    
    if (isValid) {
        field.style.borderColor = '#28a745';
        field.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
    } else {
        field.style.borderColor = '#dc3545';
        field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(type, message) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        if (type === 'success') {
            formMessage.className = `form-message ${type}`;
            formMessage.innerHTML = `${message}<br><small>📧 You will receive a confirmation email shortly. For urgent matters, please call our main number.</small>`;
        } else {
            formMessage.className = `form-message ${type}`;
            formMessage.innerHTML = message;
        }
        formMessage.style.display = 'block';
        
        // Auto-hide after 7 seconds for healthcare context
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 7000);
    }
}

// Subtle celebration effect for form submission
function celebrateFormSubmission() {
    const submitBtn = document.querySelector('.btn-primary');
    if (submitBtn) {
        submitBtn.style.transform = 'scale(1.05)';
        submitBtn.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
        }, 300);
    }
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('changeColorBtn');
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeToggleBtn.textContent = 'Light Theme';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggleBtn.textContent = 'Dark Theme';
                localStorage.setItem('theme', 'light');
            }
            
            // Add subtle transition effect
            document.body.style.transition = 'all 0.5s ease';
        });
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.textContent = 'Light Theme';
        }
    }
}

// Date Display Functionality
function initDateDisplay() {
    const showDateBtn = document.getElementById('showDateBtn');
    const dateDisplay = document.getElementById('dateDisplay');
    
    if (showDateBtn && dateDisplay) {
        showDateBtn.addEventListener('click', function() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            
            const formattedDate = now.toLocaleDateString('en-US', options);
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            
            dateDisplay.innerHTML = `
                <strong>Current Date & Time:</strong><br>
                ${formattedDate}<br>
                <small>Time Zone: ${timeZone}</small>
            `;
            
            dateDisplay.style.display = 'block';
            dateDisplay.classList.add('show');
            
            // Update button text
            showDateBtn.textContent = 'Refresh Date';
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add subtle highlight effect to target section
                targetElement.style.transform = 'scale(1.02)';
                targetElement.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    targetElement.style.transform = 'scale(1)';
                }, 500);
            }
        });
    });
}

// Scroll Animations
function initAnimations() {
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
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add subtle parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        if (header && scrolled < window.innerHeight) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Visitor Counter (using localStorage for demo)
function updateVisitorCounter() {
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('visitCount', visitCount);
    
    console.log(`Welcome! This is visit #${visitCount} to this page.`);
    
    // Create a subtle notification for returning visitors
    if (visitCount > 1) {
        setTimeout(() => {
            showWelcomeMessage(visitCount);
        }, 1000);
    }
}

// Show welcome message for returning visitors
function showWelcomeMessage(visitCount) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #48bb78, #38b2ac);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        font-size: 0.9rem;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.5s ease;
    `;
    
    message.innerHTML = `🏥 Welcome back to HealthCare Plus!<br>Visit #${visitCount} - Your health matters to us.`;
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 500);
    }, 4000);
}

// Keyboard shortcuts for accessibility
document.addEventListener('keydown', function(e) {
    // Alt + D for dark theme toggle
    if (e.altKey && e.key === 'd') {
        const themeBtn = document.getElementById('changeColorBtn');
        if (themeBtn) themeBtn.click();
    }
    
    // Alt + T for date/time
    if (e.altKey && e.key === 't') {
        const dateBtn = document.getElementById('showDateBtn');
        if (dateBtn) dateBtn.click();
    }
    
    // Alt + C to focus contact form
    if (e.altKey && e.key === 'c') {
        const nameField = document.getElementById('name');
        if (nameField) nameField.focus();
    }
    
    // Alt + E for emergency information
    if (e.altKey && e.key === 'e') {
        const emergencyBtn = document.getElementById('emergencyBtn');
        if (emergencyBtn) emergencyBtn.click();
    }
    
    // Alt + A to scroll to appointments
    if (e.altKey && e.key === 'a') {
        const appointmentSection = document.getElementById('appointment');
        if (appointmentSection) {
            appointmentSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize header animation
    const header = document.querySelector('header');
    if (header) {
        header.style.transform = 'translateY(-20px)';
        header.style.opacity = '0';
        header.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }, 200);
    }
});

// Emergency information functionality
function initEmergencyInfo() {
    const emergencyBtn = document.getElementById('emergencyBtn');
    const emergencyInfo = document.getElementById('emergencyInfo');
    
    if (emergencyBtn && emergencyInfo) {
        emergencyBtn.addEventListener('click', function() {
            if (emergencyInfo.style.display === 'none' || !emergencyInfo.style.display) {
                emergencyInfo.style.display = 'block';
                emergencyInfo.classList.add('show');
                emergencyBtn.textContent = '❌ Hide Emergency Info';
            } else {
                emergencyInfo.style.display = 'none';
                emergencyBtn.textContent = '🚨 Emergency Information';
            }
        });
    }
}

// Healthcare-specific features
function initHealthcareFeatures() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.feature-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Add appointment booking simulation
    const appointmentCards = document.querySelectorAll('.appointment-card');
    appointmentCards.forEach(card => {
        card.addEventListener('click', function() {
            const type = this.querySelector('h3').textContent.includes('In-Person') ? 'in-person' : 'telemedicine';
            showAppointmentDialog(type);
        });
    });
    
    // Add health stats animation
    animateHealthStats();
}

// Simulate appointment booking
function showAppointmentDialog(type) {
    const appointmentType = type === 'in-person' ? 'In-Person Visit' : 'Telemedicine Consultation';
    const message = `You selected: ${appointmentType}\n\nIn a real healthcare website, this would open an appointment booking system.\n\nWould you like to be redirected to our appointment portal?`;
    
    if (confirm(message)) {
        // In a real application, this would redirect to booking system
        alert('📅 Redirecting to appointment booking system...\n\n(This is a demo - no actual booking system is connected)');
    }
}

// Animate health statistics counters
function animateHealthStats() {
    const statCards = document.querySelectorAll('.stat-card h3');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateCounter(entry.target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, observerOptions);
    
    statCards.forEach(stat => {
        observer.observe(stat);
    });
}

// Counter animation for statistics
function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^\d]/g, ''));
    const suffix = text.replace(/[\d]/g, '');
    
    if (number) {
        let current = 0;
        const increment = number / 50; // Animation duration
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = number + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }
}

// Medical emergency warning for certain interactions
function checkForEmergencyKeywords(text) {
    const emergencyKeywords = ['emergency', 'urgent', 'chest pain', 'bleeding', 'unconscious', 'breathing', 'heart attack', 'stroke'];
    const lowerText = text.toLowerCase();
    
    return emergencyKeywords.some(keyword => lowerText.includes(keyword));
}

// Show emergency warning
function showEmergencyWarning() {
    const warning = document.createElement('div');
    warning.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #f56565, #e53e3e);
        color: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 2000;
        text-align: center;
        max-width: 400px;
        font-weight: bold;
    `;
    
    warning.innerHTML = `
        <h3>⚠️ MEDICAL EMERGENCY?</h3>
        <p>If this is a medical emergency, please:</p>
        <ul style="text-align: left; margin: 1rem 0;">
            <li>Call 911 immediately</li>
            <li>Visit our Emergency Department</li>
            <li>Do not use this contact form</li>
        </ul>
        <button onclick="this.parentElement.remove()" style="background: white; color: #e53e3e; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; font-weight: bold;">I Understand</button>
    `;
    
    document.body.appendChild(warning);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (warning.parentElement) {
            warning.parentElement.removeChild(warning);
        }
    }, 10000);
}

// Simple Patient Lookup functionality
function initPatientLookup() {
    const searchInput = document.getElementById('patientSearch');
    const searchBtn = document.getElementById('searchPatientBtn');
    const resultDiv = document.getElementById('patientResult');
    
    // Sample patient data for testing
    const patientDatabase = {
        'P001': {
            name: 'John Smith',
            age: 45,
            status: 'Active Patient',
            lastVisit: '2025-07-15',
            doctor: 'Dr. Johnson'
        },
        'P002': {
            name: 'Mary Johnson',
            age: 32,
            status: 'Active Patient', 
            lastVisit: '2025-07-20',
            doctor: 'Dr. Wilson'
        },
        'P003': {
            name: 'Robert Brown',
            age: 58,
            status: 'Inactive',
            lastVisit: '2024-12-10',
            doctor: 'Dr. Davis'
        }
    };
    
    if (searchBtn && searchInput && resultDiv) {
        searchBtn.addEventListener('click', function() {
            performPatientSearch();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performPatientSearch();
            }
        });
        
        searchInput.addEventListener('input', function() {
            // Clear results when input changes
            resultDiv.style.display = 'none';
            resultDiv.className = 'patient-result';
        });
    }
    
    function performPatientSearch() {
        const patientId = searchInput.value.trim().toUpperCase();
        
        // Validate input
        if (!patientId) {
            showPatientResult('error', 'Please enter a Patient ID');
            return;
        }
        
        if (patientId.length < 3) {
            showPatientResult('error', 'Patient ID must be at least 3 characters');
            return;
        }
        
        // Search for patient
        if (patientDatabase[patientId]) {
            const patient = patientDatabase[patientId];
            showPatientResult('success', formatPatientInfo(patient));
        } else {
            showPatientResult('error', 'Patient not found. Please check the Patient ID and try again.');
        }
    }
    
    function formatPatientInfo(patient) {
        return `
            <strong>Patient Found:</strong><br>
            <strong>Name:</strong> ${patient.name}<br>
            <strong>Age:</strong> ${patient.age}<br>
            <strong>Status:</strong> ${patient.status}<br>
            <strong>Last Visit:</strong> ${patient.lastVisit}<br>
            <strong>Primary Doctor:</strong> ${patient.doctor}
        `;
    }
    
    function showPatientResult(type, message) {
        resultDiv.className = `patient-result ${type}`;
        resultDiv.innerHTML = message;
        resultDiv.style.display = 'block';
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            resultDiv.style.display = 'none';
        }, 10000);
    }
}