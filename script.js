document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const ageInput = document.getElementById('age');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        const errorElement = document.getElementById('nameError');
        
        if (name.length < 3) {
            showError(nameInput, errorElement, 'El nombre debe tener al menos 3 caracteres');
            return false;
        }
        
        showSuccess(nameInput, errorElement);
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('emailError');
        
        if (!emailRegex.test(email)) {
            showError(emailInput, errorElement, 'Por favor ingrese un correo electrónico válido');
            return false;
        }
        
        showSuccess(emailInput, errorElement);
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        const errorElement = document.getElementById('passwordError');
        
        if (!passwordRegex.test(password)) {
            showError(passwordInput, errorElement, 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial');
            return false;
        }
        
        showSuccess(passwordInput, errorElement);
        return true;
    }

    function validateConfirmPassword() {
        const confirmPassword = confirmPasswordInput.value;
        const password = passwordInput.value;
        const errorElement = document.getElementById('confirmPasswordError');
        
        if (confirmPassword !== password) {
            showError(confirmPasswordInput, errorElement, 'Las contraseñas no coinciden');
            return false;
        }
        
        showSuccess(confirmPasswordInput, errorElement);
        return true;
    }

    function validateAge() {
        const age = parseInt(ageInput.value);
        const errorElement = document.getElementById('ageError');
        
        if (isNaN(age) || age < 18) {
            showError(ageInput, errorElement, 'Debes ser mayor o igual a 18 años');
            return false;
        }
        
        showSuccess(ageInput, errorElement);
        return true;
    }

    // Helper functions
    function showError(input, errorElement, message) {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorElement.textContent = message;
    }

    function showSuccess(input, errorElement) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorElement.textContent = '';
    }

    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isAgeValid = validateAge();

        // Enable submit button only if all validations pass
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgeValid) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Event listeners for real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', () => {
        validatePassword();
        // Only validate confirm password if it has a value
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
    });
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    ageInput.addEventListener('input', validateAge);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!submitBtn.disabled) {
            alert('¡Formulario enviado con éxito!');
            form.reset();
            submitBtn.disabled = true;
            // Remove validation classes on reset
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
        }
    });

    // Reset button
    resetBtn.addEventListener('click', function() {
        form.reset();
        submitBtn.disabled = true;
        // Clear all error messages and remove validation classes
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
    });

    // Initial validation check
    validateForm();
});
