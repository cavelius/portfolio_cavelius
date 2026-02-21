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

// Autoplay videos: hide until playing (avoids iOS play button overlay)
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
    video.addEventListener("playing", () => {
        video.classList.add("is-playing");
    });
    video.play().catch(() => {});
    videoObserver.observe(video);
});
// Also try playing on first user interaction (iOS sometimes needs this)
function playAllVideos() {
    document.querySelectorAll("video[autoplay]").forEach((v) => {
        v.play().catch(() => {});
    });
}
document.addEventListener("touchstart", playAllVideos, { once: true });
document.addEventListener("scroll", playAllVideos, { once: true });

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (targetId === "#") return;
        // Don't intercept overlay project links
        if (targetId.startsWith("#projekt-")) return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ── Project overlay system ──
const projectOverlay = document.getElementById("project-overlay");
const projectOverlayContent = document.getElementById("project-overlay-content");
const projectOverlayScroll = projectOverlay ? projectOverlay.querySelector(".project-overlay__scroll") : null;
const projectCache = {};
function openProject(slug, pushHistory) {
    if (!projectOverlay || !projectOverlayContent) return;

    // Save scroll position and lock body
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty("--scroll-y", scrollY + "px");
    document.body.classList.add("overlay-open");

    // Show overlay
    projectOverlay.classList.add("is-open");
    projectOverlay.setAttribute("aria-hidden", "false");
    projectOverlayScroll.scrollTop = 0;

    // Update URL
    if (pushHistory !== false) {
        history.pushState({ project: slug }, "", "#projekt-" + slug);
    }

    // Load content (with cache)
    if (projectCache[slug]) {
        projectOverlayContent.innerHTML = projectCache[slug];
        initOverlayContent();
    } else {
        projectOverlayContent.innerHTML = '<div class="flex items-center justify-center min-h-[50vh]"><p class="text-gray-01">Laden…</p></div>';
        fetch("projects/" + slug + ".html")
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.text();
            })
            .then((html) => {
                projectCache[slug] = html;
                projectOverlayContent.innerHTML = html;
                initOverlayContent();
            })
            .catch(() => {
                projectOverlayContent.innerHTML = '<div class="flex items-center justify-center min-h-[50vh]"><p class="text-gray-01">Projekt konnte nicht geladen werden.</p></div>';
            });
    }

    // Focus management
    setTimeout(() => {
        const closeBtn = projectOverlayContent.querySelector("[data-close-overlay]");
        if (closeBtn) closeBtn.focus();
    }, 100);
}

function closeProject(pushHistory) {
    if (!projectOverlay) return;

    projectOverlay.classList.remove("is-open");
    projectOverlay.setAttribute("aria-hidden", "true");

    // Restore scroll position
    document.body.classList.remove("overlay-open");
    const scrollY = parseInt(document.documentElement.style.getPropertyValue("--scroll-y") || "0");
    window.scrollTo(0, scrollY);

    // Update URL
    if (pushHistory !== false) {
        history.pushState(null, "", window.location.pathname);
    }
}

function initOverlayContent() {
    // Apply fade-in animations to new content
    projectOverlayContent.querySelectorAll(".project-detail-section").forEach((el) => {
        observer.observe(el);
    });
    // Trigger visibility check for elements already in view
    setTimeout(() => {
        projectOverlayContent.querySelectorAll(".project-detail-section").forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 1.5) {
                el.classList.add("is-visible");
            }
        });
    }, 50);

    // Wire up close buttons inside the overlay
    projectOverlayContent.querySelectorAll("[data-close-overlay]").forEach((btn) => {
        btn.addEventListener("click", () => closeProject());
    });

    // Wire up "Weitere Projekte" links inside overlay
    projectOverlayContent.querySelectorAll("[data-project]").forEach((card) => {
        card.style.cursor = "pointer";
        card.addEventListener("click", (e) => {
            e.preventDefault();
            const slug = card.getAttribute("data-project");
            if (slug) {
                projectOverlayScroll.scrollTop = 0;
                openProject(slug);
            }
        });
    });

    // Initialize videos inside overlay
    projectOverlayContent.querySelectorAll("video[autoplay]").forEach((video) => {
        video.addEventListener("playing", () => {
            video.classList.add("is-playing");
        });
        video.play().catch(() => {});
        videoObserver.observe(video);
    });

}

// Event delegation: click on project cards in #projekte
const projekteSection = document.getElementById("projekte");
if (projekteSection) {
    projekteSection.addEventListener("click", (e) => {
        const article = e.target.closest("[data-project]");
        if (article) {
            e.preventDefault();
            openProject(article.getAttribute("data-project"));
        }
    });
}

// Escape key closes overlay
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectOverlay && projectOverlay.classList.contains("is-open")) {
        closeProject();
    }
});

// Browser back/forward
window.addEventListener("popstate", (e) => {
    if (e.state && e.state.project) {
        openProject(e.state.project, false);
    } else if (projectOverlay && projectOverlay.classList.contains("is-open")) {
        closeProject(false);
    }
});

// Direct link: open overlay if URL has #projekt-* hash on load
window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (hash.startsWith("#projekt-")) {
        const slug = hash.replace("#projekt-", "");
        if (slug) openProject(slug, false);
    }
});
