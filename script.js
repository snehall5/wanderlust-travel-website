// ========================================
// WANDERLUST — JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

// 1. Automatically update footer year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// 2. Navbar style on scroll
const navbar = document.querySelector(".navbar");

function updateNavbar() {
    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 30);
    }
}

updateNavbar();
window.addEventListener("scroll", updateNavbar);


// 3. Close mobile navigation after clicking a link
const navbarMenu = document.getElementById("navbarMenu");
const navLinks = document.querySelectorAll("#navbarMenu .nav-link, #navbarMenu .btn-book");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (
            navbarMenu &&
            navbarMenu.classList.contains("show") &&
            typeof bootstrap !== "undefined"
        ) {
            const collapseInstance =
                bootstrap.Collapse.getOrCreateInstance(navbarMenu);

            collapseInstance.hide();
        }
    });
});


// 4. Highlight the active navigation link
const sections = document.querySelectorAll(
    "#home, #destinations, #about, #contact"
);

const navigationLinks = document.querySelectorAll(
    '.navbar .nav-link[href^="#"]'
);

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach(function (section) {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop <= 150) {
            currentSection = section.id;
        }
    });

    navigationLinks.forEach(function (link) {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection
        );
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();


// 5. Destination favorite buttons
const favoriteButtons = document.querySelectorAll(".favorite-btn");

favoriteButtons.forEach(function (button, index) {
    const storageKey = "wanderlust-favorite-" + index;

    // Restore saved favorite state
    const savedFavorite = localStorage.getItem(storageKey) === "true";

    button.classList.toggle("is-favorite", savedFavorite);
    button.setAttribute("aria-pressed", String(savedFavorite));
    button.textContent = savedFavorite ? "♥" : "♡";

    button.addEventListener("click", function () {
        const isFavorite = button.classList.toggle("is-favorite");

        button.setAttribute("aria-pressed", String(isFavorite));
        button.textContent = isFavorite ? "♥" : "♡";

        localStorage.setItem(storageKey, String(isFavorite));

        const destinationCard = button.closest(".destination-card");
        const destinationName = destinationCard
            ? destinationCard.querySelector("h3").textContent
            : "destination";

        showToast(
            isFavorite
                ? destinationName + " added to your favorites! ♥"
                : destinationName + " removed from your favorites."
        );
    });
});


// 6. Contact form validation and feedback
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const destination = document.getElementById("destination").value;
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !destination || !message) {
            formMessage.textContent = "Please complete all fields.";
            return;
        }

        formMessage.textContent =
            "Thank you, " + name +
            "! Your message has been validated successfully. " +
            "This demo form does not send emails yet.";

        contactForm.reset();
    });
}


// 7. Toast notification
function showToast(message) {
    let toast = document.getElementById("wanderlustToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "wanderlustToast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");

        Object.assign(toast.style, {
            position: "fixed",
            bottom: "25px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "15px 22px",
            background: "#202a27",
            color: "#ffffff",
            borderRadius: "5px",
            fontSize: "13px",
            lineHeight: "1.5",
            textAlign: "center",
            maxWidth: "90%",
            width: "max-content",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            zIndex: "9999",
            opacity: "0",
            transition: "opacity 0.3s ease"
        });

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = "1";

    clearTimeout(toast.hideTimer);

    toast.hideTimer = setTimeout(function () {
        toast.style.opacity = "0";
    }, 2600);
}


// 8. Smooth scrolling for internal navigation links
const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (!targetElement) {
            return;
        }

        event.preventDefault();

        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        if (history.replaceState) {
            history.replaceState(null, "", targetId);
        }
    });
});


// 9. Simple image loading fallback
const destinationImages = document.querySelectorAll(
    ".destination-image img, .about-image"
);

destinationImages.forEach(function (img) {
    img.addEventListener("error", function () {
        img.style.opacity = "0.35";
        img.alt = "Destination image could not be loaded";
    });
});


console.log("🌍 Wanderlust website initialized successfully!");


});
