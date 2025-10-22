// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Observe all fade-in sections
document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// Observe staggered fade-in elements
document.querySelectorAll('.fade-in-stagger').forEach(element => {
    observer.observe(element);
});

// Make hero section visible immediately on page load
window.addEventListener('load', () => {
    const heroSection = document.querySelector('.fade-in-section');
    if (heroSection) {
        heroSection.classList.add('is-visible');
    }
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const submitButton = document.getElementById('submitButton');
const successMessage = document.getElementById('successMessage');

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validateField(fieldId, value, rules) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);

    // Clear previous error
    errorElement.classList.add('hidden');
    errorElement.textContent = '';
    inputElement.classList.remove('border-red-600');

    // Trim value
    const trimmedValue = typeof value === 'string' ? value.trim() : value;

    // Validate required fields
    if (rules.required && !trimmedValue) {
        showError(fieldId, rules.requiredMessage || 'Dieses Feld ist erforderlich');
        return false;
    }

    // Validate email
    if (rules.email && trimmedValue && !validateEmail(trimmedValue)) {
        showError(fieldId, 'Ungültige E-Mail-Adresse');
        return false;
    }

    // Validate max length
    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
        showError(fieldId, `Maximal ${rules.maxLength} Zeichen erlaubt`);
        return false;
    }

    // Validate checkbox
    if (rules.checkbox && !value) {
        showError(fieldId, 'Sie müssen der Verarbeitung zustimmen');
        return false;
    }

    return true;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);

    errorElement.textContent = message;
    errorElement.classList.remove('hidden');

    if (inputElement) {
        inputElement.classList.add('border-red-600');
    }
}

function clearAllErrors() {
    ['firstName', 'email', 'message', 'consent'].forEach(fieldId => {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);

        if (errorElement) {
            errorElement.classList.add('hidden');
            errorElement.textContent = '';
        }

        if (inputElement) {
            inputElement.classList.remove('border-red-600');
        }
    });
}

// Handle form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous errors and success message
    clearAllErrors();
    successMessage.classList.add('hidden');

    // Get form values
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const consent = document.getElementById('consent').checked;

    // Validate all fields
    const isFirstNameValid = validateField('firstName', firstName, {
        required: true,
        maxLength: 100,
        requiredMessage: 'Vorname ist erforderlich'
    });

    const isEmailValid = validateField('email', email, {
        required: true,
        email: true,
        maxLength: 255,
        requiredMessage: 'E-Mail ist erforderlich'
    });

    const isMessageValid = validateField('message', message, {
        maxLength: 1000
    });

    const isConsentValid = validateField('consent', consent, {
        checkbox: true,
        requiredMessage: 'Sie müssen der Verarbeitung zustimmen'
    });

    // If any validation fails, stop here
    if (!isFirstNameValid || !isEmailValid || !isMessageValid || !isConsentValid) {
        return;
    }

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Wird gesendet...';

    try {
        // Simulate form submission (replace with actual API call)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Show success message
        successMessage.classList.remove('hidden');

        // Reset form
        contactForm.reset();

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (error) {
        console.error('Form submission error:', error);
        alert('Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Erstanfrage absenden';
    }
});
