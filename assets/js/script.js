// Preloader Functionality
// Hides preloader and scrolls to home on full page load
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
    document.getElementById('home').scrollIntoView({ behavior: 'auto' });
});

// Main Initialization Wrapped in DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    // Utility Functions
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // Navigation Module
    const initNavigation = () => {
        // Smooth Scrolling for Nav Links
        const navLinks = $$(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetSection = $(`#${targetId}`);
                if (targetSection) {
                    window.scrollTo({ top: targetSection.offsetTop - 80, behavior: "smooth" });
                }
                if (window.innerWidth <= 768) toggleMobileMenu(); // Close menu on mobile
            });
        });

        // Active Link Highlighting
        const sections = $$("section, article, aside");
        function changeActiveLink() {
            let scrollPosition = window.scrollY + 60;
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 60;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${section.id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        }
        window.addEventListener("scroll", changeActiveLink);
        changeActiveLink();

        // Burger Menu Toggle
        const burgerMenu = $("#burger-menu");
        const navLinksContainer = $("#nav-links");
        burgerMenu.addEventListener("click", toggleMobileMenu);

        function toggleMobileMenu() {
            navLinksContainer.classList.toggle("active");
            burgerMenu.classList.toggle("active");
            // Toggle between bars and X icon
            const icon = burgerMenu.querySelector("i");
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
        }
    };

    // Form Validation Module
    const initForm = () => {
        const form = $("#contact-form");
        const inputs = {
            name: form.querySelector('input[name="name"]'),
            subject: form.querySelector('input[name="subject"]'),
            email: form.querySelector('input[name="email"]'),
            message: form.querySelector('textarea[name="message"]')
        };
        const errors = {
            name: $("#name-error"),
            subject: $("#subject-error"),
            email: $("#email-error"),
            message: $("#message-error")
        };

        form.addEventListener("submit", function(event) {
            event.preventDefault();
            let isValid = true;

            // Clear previous errors
            Object.values(errors).forEach(error => error.textContent = "");

            // Validate inputs
            if (!inputs.name.value.trim()) { errors.name.textContent = "Name is required"; isValid = false; }
            if (!inputs.subject.value.trim()) { errors.subject.textContent = "Subject is required"; isValid = false; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email.value.trim())) { errors.email.textContent = "Please enter a valid email"; isValid = false; }
            if (!inputs.message.value.trim()) { errors.message.textContent = "Message is required"; isValid = false; }

            // Send email if valid
            if (isValid) {
                const formData = {
                    name: inputs.name.value.trim(),
                    email: inputs.email.value.trim(),
                    subject: inputs.subject.value.trim(),
                    message: inputs.message.value.trim()
                };
                emailjs.send("service_cdrxsjd", "template_xavmzpn", formData)
                    .then(response => {
                        console.log("Email sent:", response.status, response.text);
                        alert("Your message has been sent successfully!");
                        form.reset();
                    }, error => {
                        console.error("Failed to send:", error);
                        alert("Oops! Something went wrong. Please try again.");
                    });
            }
        });
    };

    // Theme Switcher Module
    const initTheme = () => {
        const toggleButton = $("#theme-toggle");
        const body = document.body;
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
        let currentThemeIndex = localStorage.getItem("theme") ? themes.findIndex(t => t.name === localStorage.getItem("theme")) : 0;

        function applyTheme(index) {
            const theme = themes[index];
            body.style.background = theme.bg;
            body.style.color = theme.color;
            body.className = `${theme.name}-mode`;
            localStorage.setItem("theme", theme.name);
            toggleButton.textContent = theme.icon;
            document.documentElement.style.setProperty('--accent-color', theme.accent);
        }

        applyTheme(currentThemeIndex);
        toggleButton.addEventListener("click", () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            applyTheme(currentThemeIndex);
        });
    };

    // Project Modals Module
    const initModals = () => {
        const projectCards = $$(".project-card");
        const modals = $$(".modal");
        const closeButtons = $$(".close");

        modals.forEach(modal => modal.style.display = "none");

        projectCards.forEach(card => {
            card.addEventListener("click", () => {
                const modalId = card.getAttribute("data-modal");
                const modal = $(`#${modalId}`);
                modal.style.display = "block";
                modal.scrollTop = 0;
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener("click", () => {
                const modal = button.closest(".modal");
                modal.style.display = "none";
            });
        });

        window.addEventListener("click", (event) => {
            modals.forEach(modal => {
                if (event.target === modal) modal.style.display = "none";
            });
        });
    };

    // Back to Top Module
    const initBackToTop = () => {
        const backToTopButton = $("#back-to-top");
        window.addEventListener("scroll", () => {
            backToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
        });
        backToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    };

    // Typing Animation Module
    // Optimized for mobile with adjustable speed
    const initTyping = () => {
        const textElement = $("#typing-text");
        const texts = ["Passionate Web Developer", "Creative Designer", "Innovative Creator"];
        let textIndex = 0, charIndex = 0, isDeleting = false;

        function type() {
            const currentText = texts[textIndex];
            const typeSpeed = window.innerWidth < 768 ? 150 : 100; // Slower on mobile for readability
            if (!isDeleting && charIndex < currentText.length) {
                textElement.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(type, typeSpeed);
            } else if (isDeleting && charIndex > 0) {
                textElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 50);
            } else if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => { isDeleting = true; type(); }, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            }
        }
        setTimeout(type, 500);
    };

    // Scroll Animations Module
    const initScrollAnimations = () => {
        const timelineItems = $$(".timeline-item");
        const sectionTitles = $$(".about-title, .projects-title, .contact-title");
        const sections = $$(".hero, .about, .projects, .contact");
        const screenPosition = window.innerHeight / 1.3;

        window.addEventListener("scroll", () => {
            timelineItems.forEach(item => {
                if (item.getBoundingClientRect().top < screenPosition) item.classList.add("active");
            });
            sectionTitles.forEach(title => {
                if (title.getBoundingClientRect().top < screenPosition) title.classList.add("visible");
            });
            sections.forEach(section => {
                if (section.getBoundingClientRect().top < screenPosition) section.classList.add("visible");
            });
        });
    };

    // Matrix Rain Animation Module
    const initMatrixRain = () => {
        const canvas = document.createElement("canvas");
        canvas.id = "matrix-canvas";
        document.body.appendChild(canvas);
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function draw() {
            ctx.fillStyle = "rgba(13, 27, 42, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#43A8A8";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }

        function animate() {
            draw();
            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const newColumns = canvas.width / fontSize;
            drops.length = Math.floor(newColumns);
            for (let i = 0; i < newColumns; i++) drops[i] = 1;
        });
    };

    // Initialize All Modules
    initNavigation();
    initForm();
    initTheme();
    initModals();
    initBackToTop();
    initTyping();
    initScrollAnimations();
    initMatrixRain();
});