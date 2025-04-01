// Contact Form Validation
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Your message has been sent!");
        form.reset();
    });
});



// Theme Switcher
document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;

    // Check for saved theme in localStorage
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        toggleButton.textContent = "🌞";
    }

    toggleButton.addEventListener("click", function() {
        body.classList.toggle("light-mode");

        // Save user preference
        if (body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            toggleButton.textContent = "🌞";
        } else {
            localStorage.setItem("theme", "dark");
            toggleButton.textContent = "🌙";
        }
    });
});



// Active Link Highlighting
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function changeActiveLink() {
        let scrollPosition = window.scrollY + 100; // Offset for better detection

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
});



