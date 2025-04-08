// Preloader
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
    document.getElementById('home').scrollIntoView({ behavior: 'auto' });
});

// Single DOMContentLoaded listener for all initialization
document.addEventListener("DOMContentLoaded", function() {
    // Contact Form Validation
    const form = document.getElementById("contact-form");
    const nameInput = form.querySelector('input[name="name"]');
    const subjectInput = form.querySelector('input[name="subject"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const nameError = document.getElementById("name-error");
    const subjectError = document.getElementById("subject-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let isValid = true;
        nameError.textContent = ""; subjectError.textContent = ""; emailError.textContent = ""; messageError.textContent = "";
        if (nameInput.value.trim() === "") { nameError.textContent = "Name is required"; isValid = false; }
        if (subjectInput.value.trim() === "") { subjectError.textContent = "Subject is required"; isValid = false; }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) { emailError.textContent = "Please enter a valid email"; isValid = false; }
        if (messageInput.value.trim() === "") { messageError.textContent = "Message is required"; isValid = false; }
        if (isValid) { alert("Your message has been sent!"); form.reset(); }
    });

    // Theme Switcher
    const toggleButton = document.getElementById("theme-toggle");
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
    let currentThemeIndex = 0;
    if (localStorage.getItem("theme")) {
        currentThemeIndex = themes.findIndex(t => t.name === localStorage.getItem("theme"));
    }
    applyTheme(currentThemeIndex);

    toggleButton.addEventListener("click", function() {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        applyTheme(currentThemeIndex);
    });

    function applyTheme(index) {
        const theme = themes[index];
        body.style.background = theme.bg;
        body.style.color = theme.color;
        body.className = `${theme.name}-mode`;
        localStorage.setItem("theme", theme.name);
        toggleButton.textContent = theme.icon;
        document.documentElement.style.setProperty('--accent-color', theme.accent);
    }

    // Smooth Scrolling
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) window.scrollTo({ top: targetSection.offsetTop - 80, behavior: "smooth" });
        });
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll("section");
    const navLinksArray = document.querySelectorAll(".nav-link");
    function changeActiveLink() {
        let scrollPosition = window.scrollY + 60;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 60;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinksArray.forEach(link => {
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

    // Project Modals
    const projectCards = document.querySelectorAll(".project-card");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close");
    modals.forEach(modal => { modal.style.display = "none"; });
    projectCards.forEach(card => {
        card.addEventListener("click", function() {
            const modalId = this.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            modal.style.display = "block";
            modal.scrollTop = 0;
        });
    });
    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const modal = this.closest(".modal");
            modal.style.display = "none";
        });
    });
    window.addEventListener("click", function(event) {
        modals.forEach(modal => { if (event.target === modal) modal.style.display = "none"; });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById("back-to-top");
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) backToTopButton.style.display = "block";
        else backToTopButton.style.display = "none";
    });
    backToTopButton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Typing Animation
    const textElement = document.getElementById("typing-text");
    const texts = ["Passionate Web Developer", "Creative Designer", "Innovative Creator"];
    let textIndex = 0, charIndex = 0, isDeleting = false;
    function type() {
        const currentText = texts[textIndex];
        if (!isDeleting && charIndex < currentText.length) { textElement.textContent += currentText.charAt(charIndex); charIndex++; setTimeout(type, 100); }
        else if (isDeleting && charIndex > 0) { textElement.textContent = currentText.substring(0, charIndex - 1); charIndex--; setTimeout(type, 50); }
        else if (!isDeleting && charIndex === currentText.length) setTimeout(() => { isDeleting = true; type(); }, 1500);
        else if (isDeleting && charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % texts.length; setTimeout(type, 500); }
    }
    setTimeout(type, 500);

    // Fade-in and Slide-in Effects for Sections
    window.addEventListener("scroll", function() {
        const timelineItems = document.querySelectorAll(".timeline-item");
        const sectionTitles = document.querySelectorAll(".about-title, .projects-title, .contact-title");
        const screenPosition = window.innerHeight / 1.3;

        timelineItems.forEach(item => {
            if (item.getBoundingClientRect().top < screenPosition) item.classList.add("active");
        });

        sectionTitles.forEach(title => {
            if (title.getBoundingClientRect().top < screenPosition) title.classList.add("visible");
        });
    });

    // Matrix Rain Animation
    const canvas = document.createElement("canvas");
    canvas.id = "matrix-canvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        ctx.fillStyle = "rgba(13, 27, 42, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#43A8A8";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
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
        const columns = canvas.width / fontSize;
        drops.length = columns;
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    });
});