const fname = 'adfdsafdafdsaf';
const text = ["</ Github >", "Software Engineer"];
let index = 0;
let a = 0

document.addEventListener("scroll", function () {
    let navbar = document.querySelector(".vertical-navbar");
    navbar.style.top = window.scrollY + 340 + "px";
});

document.querySelectorAll('.vertical-navbar a').forEach(navItem => {
    navItem.addEventListener('click', function (event) {
        const sectionId = this.getAttribute('data-section');

        if (sectionId) {
            event.preventDefault();
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});
document.querySelectorAll(".redacted").forEach(item => {
    item.addEventListener("click", function () {
        const targetId = this.id;

        if (encryptedData[targetId]) {
            this.textContent = decryptData(encryptedData[targetId]);
            this.classList.add("revealed");
        }
    });
});

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


                document
                    .querySelector(`.vertical-navbar a[data-section="${sectionId}"]`)
                    .classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", changeActiveNav);
});
document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("https://formspree.io/f/xanqbavb", {
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            body: formData
        });

        if (response.ok) {
            document.getElementById("response-message").innerHTML = "<p class='text-success'>Message sent successfully!</p>";
            form.reset();
        } else {
            document.getElementById("response-message").innerHTML = "<p class='text-danger'>Error sending message. Please try again.</p>";
        }
    } catch (error) {
        document.getElementById("response-message").innerHTML = "<p class='text-danger'>Network error. Try again later.</p>";
    }
});

const checkbox = document.getElementById("agreeCheckbox");
const submitButton = document.getElementById("submitButton");

submitButton.disabled = true;

checkbox.addEventListener("change", function () {
    submitButton.disabled = !this.checked;
});

document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("https://formspree.io/f/xanqbavb", {
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            body: formData
        });

        if (response.ok) {
            document.getElementById("response-message").innerHTML = "<p class='text-success'>Message sent successfully!</p>";
            form.reset();
            submitButton.disabled = true;
        } else {
            document.getElementById("response-message").innerHTML = "<p class='text-danger'>Error sending message. Please try again.</p>";
        }
    } catch (error) {
        document.getElementById("response-message").innerHTML = "<p class='text-danger'>Network error. Try again later.</p>";
    }
});

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