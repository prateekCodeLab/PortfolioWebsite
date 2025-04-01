// Contact Form Validation
document.addEventListener("DOMContentLoaded", function() {
    // Get the contact form element
    const form = document.getElementById("contact-form");

    // Add a submit event listener to the form
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
        alert("Your message has been sent!"); // Show a confirmation message
        form.reset(); // Reset the form fields
    });
});

// Theme Switcher
document.addEventListener("DOMContentLoaded", function() {
    // Get the theme toggle button and body element
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;

    // Check for saved theme in localStorage (persists user preference)
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode"); // Apply light mode
        toggleButton.textContent = "🌞"; // Update button icon
    }

    // Add click event listener to toggle theme
    toggleButton.addEventListener("click", function() {
        body.classList.toggle("light-mode"); // Toggle light/dark mode

        // Save user preference in localStorage
        if (body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            toggleButton.textContent = "🌞";
        } else {
            localStorage.setItem("theme", "dark");
            toggleButton.textContent = "🌙";
        }
    });
});

// Smooth Scrolling Fallback (in case CSS scroll-behavior fails)
document.addEventListener("DOMContentLoaded", function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll(".nav-link");

    // Add click event listener to each nav link
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute("href").substring(1); // Get the target section ID (e.g., "home")
            const targetSection = document.getElementById(targetId); // Find the target section

            // Scroll to the target section with smooth behavior
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust for fixed navbar height
                    behavior: "smooth"
                });
            }
        });
    });
});

// Active Link Highlighting
document.addEventListener("DOMContentLoaded", function () {
    // Get all sections and navigation links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    // Function to update the active link based on scroll position
    function changeActiveLink() {
        let scrollPosition = window.scrollY + 100; // Add offset for better detection

        // Loop through each section to determine which is in view
        sections.forEach((section) => {
            if (
                scrollPosition >= section.offsetTop &&
                scrollPosition < section.offsetTop + section.offsetHeight
            ) {
                // Remove active class from all links
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    // Add active class to the link corresponding to the current section
                    if (link.getAttribute("href").includes(section.id)) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    // Add scroll event listener to update active link on scroll
    window.addEventListener("scroll", changeActiveLink);

    // Run the function initially to set the active link on page load
    changeActiveLink();
});