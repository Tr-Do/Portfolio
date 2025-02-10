const text = ["</ Github >", "Software Engineer"];
let index = 0;
let a = 0;

document.addEventListener("scroll", function () {
    let navbar = document.querySelector(".vertical-navbar");
    navbar.style.top = window.scrollY + 340 + "px";
});

let isNavbarScrolling = false;

document.querySelectorAll('.vertical-navbar a').forEach(navItem => {
    navItem.addEventListener('click', function (event) {
        const sectionId = this.getAttribute('data-section');

        if (!sectionId) return;

        event.preventDefault();
        isNavbarScrolling = true;

        document.querySelectorAll(".vertical-navbar a").forEach(link => link.classList.remove("active"));
        this.classList.add("active");

        document.documentElement.classList.add("disable-animations");

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

window.addEventListener("scroll", () => {
    if (!isNavbarScrolling) {
        document.documentElement.classList.remove("disable-animations");
    }
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

                const activeLink = document.querySelector(`.vertical-navbar a[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }
    window.addEventListener("scroll", changeActiveNav);
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".redacted").forEach(element => {
        element.addEventListener("click", function () {
            this.classList.remove("redacted");
            this.classList.add("revealed");
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    if (typeof encryptedData !== "undefined") {
        document.querySelectorAll(".redacted").forEach(element => {
            element.addEventListener("click", function () {
                let dataKey = this.id;
                if (encryptedData[dataKey]) {
                    this.textContent = decryptData(encryptedData[dataKey]);
                    this.classList.remove("redacted");
                    this.classList.add("revealed");
                }
            });
        });
    } else {
        console.error("secureData.js is not loaded properly.");
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
document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("agreeCheckbox");
    const submitButton = document.getElementById("submitButton");
    const contactForm = document.getElementById("contactForm");
    const responseMessage = document.createElement("p");

    responseMessage.classList.add("text-success", "fw-bold", "mt-2");
    responseMessage.style.display = "none";

    submitButton.parentNode.appendChild(responseMessage);
    checkbox.addEventListener("change", function () {
        submitButton.disabled = !this.checked;
    });
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                submitButton.style.display = "none";
                responseMessage.textContent = "Send message successfully!";
                responseMessage.style.display = "block";
                contactForm.reset();
                checkbox.checked = false;
            } else {
                responseMessage.textContent = "Error sending message. Try again.";
                responseMessage.style.color = "red";
                responseMessage.style.display = "block";
            }
        }).catch(error => {
            console.error("Error:", error);
            responseMessage.textContent = "There was a problem submitting the form.";
            responseMessage.style.color = "red";
            responseMessage.style.display = "block";
        });
    });
});




window.onload = animation;