/**
 * Rayees - Full Stack Developer Portfolio
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Mobile Navigation Toggle
    ========================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle Navigation Menu
            navLinks.classList.toggle('active');
            // Toggle Hamburger Animation
            hamburger.classList.toggle('toggle');
        });
    }

    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    /* ==========================================
       2. Typewriter Effect (Hero Section)
    ========================================== */
    const roles = ["Full Stack Developer.", "Freelancer.", "Problem Solver."];
    let typeIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 150;
    const typeElement = document.querySelector('.typewriter');

    function typeWriter() {
        if (!typeElement) return;

        const currentRole = roles[typeIndex];
        
        if (isDeleting) {
            // Remove characters
            typeElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50; // faster when deleting
        } else {
            // Add characters
            typeElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 150;
        }

        // Logic for pausing at full word or empty
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeDelay = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typeIndex = (typeIndex + 1) % roles.length;
            typeDelay = 500; // Pause before starting new word
        }

        setTimeout(typeWriter, typeDelay);
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);


    /* ==========================================
       3. Scroll Reveal Animations
    ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Initial check and event listener for scrolling
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load in case elements are already in view


    /* ==========================================
       4. Navbar Scroll Effect
    ========================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
            navbar.style.background = 'rgba(10, 10, 14, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(10, 10, 14, 0.85)';
        }
    });

    /* ==========================================
       5. EmailJS Integration for Contact Form
    ========================================== */
    // Initialize EmailJS. 
    // IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key
    (function(){
        // emailjs.init("YOUR_PUBLIC_KEY"); // UNCOMMENT and ADD YOUR KEY
    })();

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-button');
    const btnText = document.getElementById('button-text');
    const btnLoader = document.getElementById('button-loader');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Check if initialized
            // if(!window.emailjs) {
            //     showMessage('EmailJS is not properly configured. Please add your credentials.', 'error-msg');
            //     return;
            // }

            // Loading state
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            submitBtn.disabled = true;

            // Prepare template parameters from the form
            const templateParams = {
                from_name: document.getElementById('name').value,
                reply_to: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            /* 
               TODO: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with valid strings from EmailJS Dashboard
               Uncomment the block below to activate email sending.
            */

            /*
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    // Success
                    showMessage('Message sent successfully! I will get back to you soon.', 'success-msg');
                    contactForm.reset(); // clear form
                    resetButton();
                }, function(error) {
                    // Failed
                    showMessage('Failed to send message. Please try again later.', 'error-msg');
                    console.error('EmailJS Error:', error);
                    resetButton();
                });
            */
           
           // Mock simulation for demo purposes until API keys are provided:
           setTimeout(() => {
               showMessage('Note: EmailJS is simulated here. Please add your actual API keys in script.js to enable real emails!', 'success-msg');
               contactForm.reset();
               resetButton();
           }, 1500);
        });
    }

    // Helper functions for the form
    function showMessage(msg, typeClass) {
        formMessage.textContent = msg;
        formMessage.className = typeClass; // removes hidden, sets color class
        
        // Hide message after 6 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 6000);
    }

    function resetButton() {
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        submitBtn.disabled = false;
    }
});
