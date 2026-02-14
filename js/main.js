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
document.querySelectorAll(".accordion-item").forEach((item) => {
    const button = item.querySelector("button");
    const content = item.querySelector(".accordion-content");

    function toggle() {
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
    }

    button.addEventListener("click", toggle);
    if (content) {
        content.style.cursor = "pointer";
        content.addEventListener("click", toggle);
    }
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


// Infinite loop scroll for testimonials
const testimonialScroll = document.getElementById("testimonial-scroll");
const testimonialTrack = document.getElementById("testimonial-track");
if (testimonialScroll && testimonialTrack) {
    const originals = [...testimonialTrack.children];
    const count = originals.length;
    // Clone all cards and append
    originals.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        testimonialTrack.appendChild(clone);
    });
    // When scrolled past the original set, jump back seamlessly
    testimonialScroll.addEventListener("scroll", () => {
        const halfWidth = testimonialTrack.scrollWidth / 2;
        if (testimonialScroll.scrollLeft >= halfWidth) {
            testimonialScroll.scrollLeft -= halfWidth;
        } else if (testimonialScroll.scrollLeft <= 0) {
            testimonialScroll.scrollLeft += halfWidth;
        }
    });
}

// Autoplay videos (iOS fallback — play when visible)
const videoObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    },
    { threshold: 0.25 }
);
document.querySelectorAll("video[autoplay]").forEach((video) => {
    video.play().catch(() => {});
    videoObserver.observe(video);
});

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
