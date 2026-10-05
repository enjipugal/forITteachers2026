/* =========================================================
   TEACHER'S DAY 2026
   SCHOOL FESTIVAL / YEARBOOK JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("section[id]");

const allLinks = document.querySelectorAll('a[href^="#"]');

const teacherItems = document.querySelectorAll(".teacher-item");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const opened =
            navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            opened ? "true" : "false"
        );

    });

}


/* =========================================================
   CLOSE NAVIGATION AFTER CLICK
========================================================= */

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        if (!navigation || !menuButton) {
            return;
        }

        navigation.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================================================
   CLOSE NAVIGATION WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {

    if (!navigation || !menuButton) {
        return;
    }

    const clickedNavigation =
        navigation.contains(event.target);

    const clickedButton =
        menuButton.contains(event.target);

    if (
        navigation.classList.contains("open") &&
        !clickedNavigation &&
        !clickedButton
    ) {

        navigation.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }

    if (!navigation || !menuButton) {
        return;
    }

    navigation.classList.remove("open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

});


/* =========================================================
   SMOOTH SCROLLING
========================================================= */

allLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetID =
            link.getAttribute("href");

        if (
            !targetID ||
            targetID === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetID);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            header
                ? header.offsetHeight
                : 0;

        const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            12;

        window.scrollTo({
            top: targetTop,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 45) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNav() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach((item) => {

        const target =
            item.getAttribute("href");

        item.classList.toggle(
            "active",
            target === `#${currentSection}`
        );

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

updateActiveNav();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealTargets = document.querySelectorAll(
    ".section-intro, .teacher-item, .teachers-footer-note, .celebrate-header, .celebrate-board, .celebrate-actions"
);


revealTargets.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


revealTargets.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   STAGGER TEACHER CARDS
========================================================= */

teacherItems.forEach((item, index) => {

    item.style.transitionDelay =
        `${index * 80}ms`;

});


/* =========================================================
   TEACHER CARD TILT
========================================================= */

teacherItems.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth <= 900) {
            return;
        }

        const rect =
            card.getBoundingClientRect();

        const mouseX =
            event.clientX - rect.left;

        const mouseY =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateY =
            ((mouseX - centerX) / centerX) * 1.2;

        const rotateX =
            ((mouseY - centerY) / centerY) * -1.2;

        card.style.transform =
            `translate(-4px, -4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================================
   PARALLAX BACKGROUND SHAPES
========================================================= */

const homeShapes =
    document.querySelectorAll(".home-shape");


window.addEventListener(
    "scroll",
    () => {

        if (window.innerWidth <= 900) {
            return;
        }

        const scroll =
            window.scrollY;

        homeShapes.forEach(
            (shape, index) => {

                const speed =
                    (index + 1) * 0.035;

                shape.style.transform =
                    `translateY(${scroll * speed}px)`;

            }
        );

    },
    { passive: true }
);


/* =========================================================
   IMAGE ERROR FALLBACK
========================================================= */

const images =
    document.querySelectorAll("img");


images.forEach((image) => {

    image.addEventListener("error", () => {

        image.style.background =
            "#145cff";

        image.style.objectFit =
            "cover";

    });

});


/* =========================================================
   RESIZE
========================================================= */

let resizeTimeout;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimeout);

    resizeTimeout =
        setTimeout(() => {

            if (
                window.innerWidth > 900 &&
                navigation
            ) {

                navigation.classList.remove("open");

                if (menuButton) {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }, 150);

});


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateHeader();
        updateActiveNav();

    }
);