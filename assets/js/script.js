//script.js
// Preloader
// Hide preloader and scroll to home when page fully loads
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none"; // Hide the loading screen
    document.getElementById('home').scrollIntoView({ behavior: 'auto' }); // Jump to home section
});

// Single DOMContentLoaded listener for all initialization
// Run this code once the HTML is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Contact Form Validation
    // Set up form and input elements
    const form = document.getElementById("contact-form");
    const nameInput = form.querySelector('input[name="name"]');
    const subjectInput = form.querySelector('input[name="subject"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const nameError = document.getElementById("name-error");
    const subjectError = document.getElementById("subject-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    // Handle form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Stop form from submitting normally
        let isValid = true; // Track if form is valid
        // Clear previous error messages
        nameError.textContent = ""; 
        subjectError.textContent = ""; 
        emailError.textContent = ""; 
        messageError.textContent = "";

        // Check each field and show errors if invalid
        if (nameInput.value.trim() === "") { 
            nameError.textContent = "Name is required"; 
            isValid = false; 
        }
        if (subjectInput.value.trim() === "") { 
            subjectError.textContent = "Subject is required"; 
            isValid = false; 
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email format check
        if (!emailPattern.test(emailInput.value.trim())) { 
            emailError.textContent = "Please enter a valid email"; 
            isValid = false; 
        }
        if (messageInput.value.trim() === "") { 
            messageError.textContent = "Message is required"; 
            isValid = false; 
        }

        // If all fields are valid, send email via EmailJS and reset form
        if (isValid) { 
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            };

            emailjs.send("service_cdrxsjd", "template_xavmzpn", formData)
                .then(function(response) {
                    console.log("Email sent:", response.status, response.text);
                    alert("Your message has been sent successfully!");
                    form.reset();
                }, function(error) {
                    console.error("Failed to send:", error);
                    alert("Oops! Something went wrong. Please try again.");
                });
        }
    });

    // Theme Switcher
    // Set up theme toggle button and body element
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;
    // Array of theme objects with their properties
    const themes = [
        { name: "dark", bg: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #475569 100%)", color: "#F5F6F5", icon: "🌙", accent: "#7C3AED" },
        { name: "light", bg: "linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 50%, #D1D5DB 100%)", color: "#2D3748", icon: "🌞", accent: "#059669" },
        { name: "neon", bg: "linear-gradient(135deg, #0A0E14 0%, #1A2A44 50%, #2E5077 100%)", color: "#00FFAA", icon: "✨", accent: "#00FFAA" },
        { name: "violet", bg: "linear-gradient(135deg, #2A1F5E 0%, #3D2C6B 50%, #6B4E99 100%)", color: "#D4A4EB", icon: "🌸", accent: "#D4A4EB" },
        { name: "cyan", bg: "linear-gradient(135deg, #0D2E3A 0%, #1D4D6A 50%, #43A8A8 100%)", color: "#A3E4D7", icon: "💧", accent: "#43A8A8" },
        { name: "emerald", bg: "linear-gradient(135deg, #022C22 0%, #064E3B 50%, #10B981 100%)", color: "#ECFDF5", icon: "🍃", accent: "#10B981" },
        { name: "sunset", bg: "linear-gradient(135deg, #7C2D12 0%, #EA580C 50%, #A21CAF 100%)", color: "#1F2937", icon: "🌅", accent: "#F97316" },
        { name: "midnight", bg: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4C1D95 100%)", color: "#E2E8F0", icon: "🌠", accent: "#60A5FA" }
    ];
    let currentThemeIndex = 0; // Track current theme

    // Load saved theme from localStorage if available
    if (localStorage.getItem("theme")) {
        currentThemeIndex = themes.findIndex(t => t.name === localStorage.getItem("theme"));
    }
    applyTheme(currentThemeIndex); // Apply initial theme

    // Switch theme on button click
    toggleButton.addEventListener("click", function() {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length; // Cycle through themes
        applyTheme(currentThemeIndex);
    });

    // Function to apply a theme
    function applyTheme(index) {
        const theme = themes[index];
        body.style.background = theme.bg; // Set background gradient
        body.style.color = theme.color; // Set text color
        body.className = `${theme.name}-mode`; // Apply theme class
        localStorage.setItem("theme", theme.name); // Save theme choice
        toggleButton.textContent = theme.icon; // Update button icon
        document.documentElement.style.setProperty('--accent-color', theme.accent); // Set accent color
    }

    // Smooth Scrolling
    // Add smooth scrolling to nav links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Stop default anchor behavior
            const targetId = this.getAttribute("href").substring(1); // Get section ID
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({ 
                    top: targetSection.offsetTop - 80, // Adjust for nav height
                    behavior: "smooth" 
                });
            }
        });
    });

    // Active Link Highlighting
    // Highlight nav link based on scroll position
    const sections = document.querySelectorAll("section");
    const navLinksArray = document.querySelectorAll(".nav-link");
    function changeActiveLink() {
        let scrollPosition = window.scrollY + 60; // Account for nav height
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 60;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinksArray.forEach(link => {
                    link.classList.remove("active"); // Remove active from all
                    if (link.getAttribute("href") === `#${section.id}`) {
                        link.classList.add("active"); // Add to current section
                    }
                });
            }
        });
    }
    window.addEventListener("scroll", changeActiveLink); // Update on scroll
    changeActiveLink(); // Set initial active link

    // Project Modals
    // Handle project card clicks and modal display
    const projectCards = document.querySelectorAll(".project-card");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close");

    // Hide all modals initially
    modals.forEach(modal => { modal.style.display = "none"; });

    // Show modal when card is clicked
    projectCards.forEach(card => {
        card.addEventListener("click", function() {
            const modalId = this.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            modal.style.display = "block"; // Show the modal
            modal.scrollTop = 0; // Reset scroll position
        });
    });

    // Hide modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const modal = this.closest(".modal");
            modal.style.display = "none";
        });
    });

    // Hide modal when clicking outside content
    window.addEventListener("click", function(event) {
        modals.forEach(modal => { 
            if (event.target === modal) modal.style.display = "none"; 
        });
    });

    // Back to Top Button
    // Show/hide and scroll to top functionality
    const backToTopButton = document.getElementById("back-to-top");
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) backToTopButton.style.display = "block"; // Show after scrolling down
        else backToTopButton.style.display = "none"; // Hide near top
    });
    backToTopButton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
    });

    // Typing Animation
    // Animate text in hero section
    const textElement = document.getElementById("typing-text");
    const texts = ["Passionate Web Developer", "Creative Designer", "Innovative Creator"];
    let textIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        // Type characters one by one
        if (!isDeleting && charIndex < currentText.length) { 
            textElement.textContent += currentText.charAt(charIndex); 
            charIndex++; 
            setTimeout(type, 100); 
        }
        // Delete characters one by one
        else if (isDeleting && charIndex > 0) { 
            textElement.textContent = currentText.substring(0, charIndex - 1); 
            charIndex--; 
            setTimeout(type, 50); 
        }
        // Pause before deleting
        else if (!isDeleting && charIndex === currentText.length) { 
            setTimeout(() => { isDeleting = true; type(); }, 1500); 
        }
        // Move to next text
        else if (isDeleting && charIndex === 0) { 
            isDeleting = false; 
            textIndex = (textIndex + 1) % texts.length; 
            setTimeout(type, 500); 
        }
    }
    setTimeout(type, 500); // Start typing after delay

    // Fade-in and Slide-in Effects for Sections
    // Show elements when they enter viewport
    window.addEventListener("scroll", function() {
        const timelineItems = document.querySelectorAll(".timeline-item");
        const sectionTitles = document.querySelectorAll(".about-title, .projects-title, .contact-title");
        const screenPosition = window.innerHeight / 1.3; // Trigger when 1/3 into view

        // Activate timeline items
        timelineItems.forEach(item => {
            if (item.getBoundingClientRect().top < screenPosition) {
                item.classList.add("active");
            }
        });

        // Activate section titles
        sectionTitles.forEach(title => {
            if (title.getBoundingClientRect().top < screenPosition) {
                title.classList.add("visible");
            }
        });
    });

    // Matrix Rain Animation
    // Create a canvas for background effect
    const canvas = document.createElement("canvas");
    canvas.id = "matrix-canvas";
    document.body.appendChild(canvas); // Add to page
    const ctx = canvas.getContext("2d"); // 2D drawing context

    // Set canvas size to full window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters for the rain effect
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const fontSize = 16;
    const columns = canvas.width / fontSize; // Number of columns
    const drops = []; // Track drop positions

    // Initialize drop positions
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    // Draw the matrix rain
    function draw() {
        ctx.fillStyle = "rgba(13, 27, 42, 0.1)"; // Faint background to fade old characters
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear canvas
        ctx.fillStyle = "#43A8A8"; // Cyan color for letters
        ctx.font = fontSize + "px monospace"; // Font style

        // Draw each drop
        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length)); // Random letter
            ctx.fillText(text, i * fontSize, drops[i] * fontSize); // Draw letter
            // Reset drop if it reaches bottom and randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++; // Move drop down
        }
    }

    // Animate the matrix rain continuously
    function animate() {
        draw();
        requestAnimationFrame(animate); // Loop animation
    }
    animate(); // Start animation

    // Resize canvas when window size changes
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const columns = canvas.width / fontSize;
        drops.length = columns; // Adjust number of drops
        for (let i = 0; i < columns; i++) {
            drops[i] = 1; // Reset drop positions
        }
    });
});