const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const contactForm = document.getElementById("contactForm");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        document.body.classList.toggle("menu-open", isOpen);
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
            document.body.classList.remove("menu-open");
        });
    });
}

const revealElements = document.querySelectorAll(".section > .container");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal", "visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

function setFieldState(input, errorElement, message) {
    input.classList.toggle("invalid", Boolean(message));
    errorElement.textContent = message;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");

    let valid = true;

    if (name.value.trim().length < 2) {
        setFieldState(name, nameError, "Informe seu nome.");
        valid = false;
    } else {
        setFieldState(name, nameError, "");
    }

    if (!isValidEmail(email.value.trim())) {
        setFieldState(email, emailError, "Digite um e-mail válido.");
        valid = false;
    } else {
        setFieldState(email, emailError, "");
    }

    if (!subject.value) {
        setFieldState(subject, subjectError, "Selecione um assunto.");
        valid = false;
    } else {
        setFieldState(subject, subjectError, "");
    }

    if (message.value.trim().length < 10) {
        setFieldState(message, messageError, "Escreva uma mensagem com pelo menos 10 caracteres.");
        valid = false;
    } else {
        setFieldState(message, messageError, "");
    }

    return valid;
}

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const feedback = document.getElementById("formFeedback");

        if (!validateForm()) {
            feedback.textContent = "Revise os campos destacados.";
            feedback.removeAttribute("data-success");
            return;
        }

        feedback.textContent = "Mensagem enviada com sucesso! Entraremos em contato em breve.";
        feedback.dataset.success = "true";
        contactForm.reset();

        document.querySelectorAll(".invalid").forEach((field) => field.classList.remove("invalid"));
        document.querySelectorAll(".field-error").forEach((error) => error.textContent = "");
    });
}

document.querySelectorAll("#contactForm input, #contactForm select, #contactForm textarea")
    .forEach((field) => {
        field.addEventListener("blur", validateForm);
});
