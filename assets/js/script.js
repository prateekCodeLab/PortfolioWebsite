// Preloader
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none"; // Hide preloader when page is fully loaded
});

// Contact Form Validation
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const subjectInput = form.querySelector('input[name="subject"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const subjectError = document.getElementById("subject-error");
    const messageError = document.getElementById("message-error");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let isValid = true;

        // Reset error messages
        nameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";

        // Validate name
        if (nameInput.value.trim() === "") {
            nameError.textContent = "Name is required";
            isValid = false;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = "Please enter a valid email";
            isValid = false;
        }

        // Validate subject
        if (subjectInput.value.trim() === "") {
            subjectError.textContent = "Subject is required";
            isValid = false;
        }

        // Validate message
        if (messageInput.value.trim() === "") {
            messageError.textContent = "Message is required";
            isValid = false;
        }

        if (isValid) {
            alert("Your message has been sent!");
            form.reset();
        }
    });
});

// Theme Switcher
document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;

    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        toggleButton.textContent = "🌞";
    }

    toggleButton.addEventListener("click", function() {
        body.classList.toggle("light-mode");
        if (body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            toggleButton.textContent = "🌞";
        } else {
            localStorage.setItem("theme", "dark");
            toggleButton.textContent = "🌙";
        }
    });
});

// Smooth Scrolling Fallback
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });
});

// Active Link Highlighting
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function changeActiveLink() {
        let scrollPosition = window.scrollY + 100;

        sections.forEach((section) => {
            if (
                scrollPosition >= section.offsetTop &&
                scrollPosition < section.offsetTop + section.offsetHeight
            ) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href").includes(section.id)) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", changeActiveLink);
    changeActiveLink();
});

// Project Modals
document.addEventListener("DOMContentLoaded", function() {
    const projectCards = document.querySelectorAll(".project-card");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close");

    projectCards.forEach(card => {
        card.addEventListener("click", function() {
            const modalId = this.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            modal.style.display = "block";
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const modal = this.closest(".modal");
            modal.style.display = "none";
        });
    });

    window.addEventListener("click", function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});

// Back to Top Button
document.addEventListener("DOMContentLoaded", function() {
    const backToTopButton = document.getElementById("back-to-top");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "flex";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// Typing Animation for Hero Text
document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById("typing-text");
    const text = textElement.textContent;
    textElement.textContent = "";
    let i = 0;

    function type() {
        if (i < text.length) {
            textElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }

    setTimeout(type, 500);
});