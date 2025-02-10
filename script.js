const text = ["</\u00A0\u00A0\u00A0TRIEU DO\u00A0\u00A0\u00A0>", "Software Engineer"];
let index = 0;
let a = 0;

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

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.match(email) !== null ;
}

document.getElementById("emailForm").addEventListener("submit", function(event) {
    const emailInput = document.getElementById("email");
    if (!validateEmail(emailInput.value)) {
        emailInput.classList.add("is-invalid");
        event.preventDefault();
    } else {
        emailInput.classList.remove("is-invalid");
    }
});


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
                    let decryptedText = decryptData(encryptedData[dataKey]);
                    if (isValidURL(decryptedText)) {
                        let anchor = document.createElement("a");
                        anchor.href = decryptedText;
                        anchor.textContent = decryptedText;
                        anchor.target = "_blank";
                        this.innerHTML = '';
                        this.appendChild(anchor);
                    } else {
                        this.textContent = decryptedText;
                    }

                    this.classList.remove("redacted");
                    this.classList.add("revealed");
                }
            });
        });
    } else {
        console.error("secureData.js is not loaded properly.");
    }
});

function isValidURL(str) {
    try {
        new URL(str);
        return true;
    } catch (_) {
        return false;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("agreeCheckbox");
    const submitButton = document.getElementById("submitButton");
    const contactForm = document.getElementById("contactForm");

    const nameInput = document.getElementById("name");  // Name field
    const emailInput = document.getElementById("emailForm");  // Email field
    const messageInput = document.getElementById("message");  // Message field

    const responseMessage = document.createElement("p");
    responseMessage.classList.add("text-success", "fw-bold", "mt-2");
    responseMessage.style.display = "none";
    submitButton.parentNode.appendChild(responseMessage);

    // Function to validate email format
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Function to validate if a field is not empty
    function validateNotEmpty(input) {
        return input.value.trim() !== "";
    }

    // Function to check form validity (email + name + message + checkbox)
    function checkValidForm() {
        const isEmailValid = validateEmail(emailInput.value.trim());
        const isNameValid = validateNotEmpty(nameInput);
        const isMessageValid = validateNotEmpty(messageInput);
        const isCheckboxChecked = checkbox.checked;

        // Enable submit button only if all fields are valid and checkbox is checked
        submitButton.disabled = !(isEmailValid && isNameValid && isMessageValid && isCheckboxChecked);

        // Apply real-time border validation
        applyValidationStyle(emailInput, isEmailValid);
        applyValidationStyle(nameInput, isNameValid);
        applyValidationStyle(messageInput, isMessageValid);
    }

    // Function to apply red/normal border based on validation result
    function applyValidationStyle(inputElement, isValid) {
        if (!isValid) {
            inputElement.classList.add("is-invalid");
            inputElement.style.border = "2px solid red";
        } else {
            inputElement.classList.remove("is-invalid");
            inputElement.style.border = "";
        }
    }

    // Add event listeners for real-time validation
    checkbox.addEventListener("change", checkValidForm);
    emailInput.addEventListener("input", checkValidForm);
    nameInput.addEventListener("input", checkValidForm);
    messageInput.addEventListener("input", checkValidForm);

    // Form submission handler
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Final validation check before submission
        if (!validateEmail(emailInput.value.trim()) || !validateNotEmpty(nameInput) || !validateNotEmpty(messageInput)) {
            alert("Please fill in all fields correctly before submitting.");
            return;
        }

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
                responseMessage.textContent = "Message sent successfully!";
                responseMessage.style.display = "block";
                responseMessage.style.color = "green";
                contactForm.reset();
                checkbox.checked = false;
                submitButton.disabled = true;
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