const text = ["</ Github >", "Software Engineer"];
let index = 0;
let a = 0;

document.addEventListener("scroll", function () {
    let navbar = document.querySelector(".vertical-navbar");
    navbar.style.top = window.scrollY + 340 + "px";
});

let isNavbarScrolling = false;

// Add Click Event for Navbar Links
document.querySelectorAll('.vertical-navbar a').forEach(navItem => {
    navItem.addEventListener('click', function (event) {
        const sectionId = this.getAttribute('data-section');

        // Prevent active class from applying to external links
        if (!sectionId) return;

        event.preventDefault();
        isNavbarScrolling = true;

        // Remove 'active' class from all navbar links
        document.querySelectorAll(".vertical-navbar a").forEach(link => link.classList.remove("active"));

        // Add 'active' class only to the clicked link
        this.classList.add("active");

        // Temporarily disable animations
        document.documentElement.classList.add("disable-animations");

        // Smoothly scroll to the target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }

        setTimeout(() => {
            isNavbarScrolling = false;
            document.documentElement.classList.remove("disable-animations");
        }, 1000);
    });
});

// Detect manual scrolling and re-enable animations immediately
window.addEventListener("scroll", () => {
    if (!isNavbarScrolling) {
        document.documentElement.classList.remove("disable-animations");
    }
});

// Change Active Navbar Link on Scroll
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".vertical-navbar a");

    function changeActiveNav() {
        let scrollPosition = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => link.classList.remove("active"));

                const activeLink = document.querySelector(`.vertical-navbar a[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }
    window.addEventListener("scroll", changeActiveNav);
});

// Typing Animation
function animation() {
    if (a >= text.length) {
        return;
    }
    if (index < text[a].length) {
        document.getElementById(`${a}`).innerHTML += text[a].charAt(index);
        index++;
        setTimeout(animation, 40);
    } else {
        document.getElementById(`${a}`).parentElement.style.borderRight = "none";
        index = 0;
        a++;
        animation();
    }
}

window.onload = animation;
