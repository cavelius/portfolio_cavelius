// Fade-in animations on scroll
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
    }
);

document.querySelectorAll(".fade-in-section, .fade-in-stagger").forEach((element) => {
    observer.observe(element);
});

window.addEventListener("load", () => {
    document.querySelectorAll(".fade-in-section, .fade-in-stagger").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.5) {
            el.classList.add("is-visible");
        }
    });
});

// Über mich text expand/collapse (mobile only)
const ueberMichBtn = document.getElementById("ueber-mich-expand");
const ueberMichText = document.getElementById("ueber-mich-text");
if (ueberMichBtn && ueberMichText) {
    ueberMichBtn.addEventListener("click", () => {
        const isExpanded = ueberMichText.classList.contains("is-expanded");
        if (isExpanded) {
            ueberMichText.classList.remove("is-expanded");
            ueberMichBtn.querySelector("span").textContent = "Weiterlesen";
            ueberMichBtn.querySelector("svg").style.transform = "";
            ueberMichBtn.setAttribute("aria-expanded", "false");
        } else {
            ueberMichText.classList.add("is-expanded");
            ueberMichBtn.querySelector("span").textContent = "Weniger anzeigen";
            ueberMichBtn.querySelector("svg").style.transform = "rotate(180deg)";
            ueberMichBtn.setAttribute("aria-expanded", "true");
        }
    });
}

// Accordion toggle for Werdegang section
document.querySelectorAll(".accordion-item button").forEach((button) => {
    button.addEventListener("click", () => {
        const item = button.closest(".accordion-item");
        const isOpen = item.getAttribute("data-open") === "true";

        // Close all other accordion items
        document.querySelectorAll(".accordion-item").forEach((otherItem) => {
            otherItem.setAttribute("data-open", "false");
            otherItem.querySelector("button").setAttribute("aria-expanded", "false");
        });

        // Toggle current item
        if (!isOpen) {
            item.setAttribute("data-open", "true");
            button.setAttribute("aria-expanded", "true");
        }
    });
});

// Floating nav: highlight active section
const navLinks = document.querySelectorAll("#floating-nav a");
const sections = document.querySelectorAll("#projekte, #ueber-mich, #kontakt");

function updateActiveNav() {
    let current = "";
    const atBottom = (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 50);
    if (atBottom) {
        current = "kontakt";
    } else {
        sections.forEach((section) => {
            const top = section.getBoundingClientRect().top;
            if (top <= window.innerHeight / 2) {
                current = section.id;
            }
        });
    }
    navLinks.forEach((link) => {
        const dot = link.querySelector(".nav-dot");
        if (link.getAttribute("href") === "#" + current) {
            if (dot) dot.classList.add("active");
        } else {
            if (dot) dot.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

// Infinite marquee for testimonials
const marqueeTrack = document.querySelector(".marquee-track");
if (marqueeTrack) {
    const items = [...marqueeTrack.children];
    items.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        marqueeTrack.appendChild(clone);
    });
    requestAnimationFrame(() => {
        const firstClone = marqueeTrack.children[items.length];
        if (firstClone) {
            marqueeTrack.style.setProperty("--scroll-distance", `-${firstClone.offsetLeft}px`);
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});
