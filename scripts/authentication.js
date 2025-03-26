document.getElementById('signup-form')?.addEventListener('submit', (e) => {
  e.preventDefault();

  clearErrors();

  let isValid = true;

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');

  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const confirmPasswordError = document.getElementById('confirm-password-error');
  const formError = document.getElementById('form-error');

  [emailError, passwordError, confirmPasswordError, formError].forEach((el) => {
    if (el) el.textContent = '';
  });

  if (name.value.trim() === '') {
    showError('name', 'Full name is required.');
    isValid = false;
  }

  if (email.value.trim() === '') {
    showError('email', 'Email address is required.');
    isValid = false;
  } else if (!validateEmail(email.value)) {
    showError('email', 'Please enter a valid email address.');
    isValid = false;
  }

  if (password.value.trim() === '') {
    showError('password', 'Password is required.');
    isValid = false;
  } else if (password.value.length < 6) {
    showError('password', 'Password must be at least 6 characters.');
    isValid = false;
  }

  if (confirmPassword.value.trim() === '') {
    showError('confirm-password', 'Please confirm your password.');
    isValid = false;
  } else if (confirmPassword.value !== password.value) {
    showError('confirm-password', 'Passwords do not match.');
    isValid = false;
  }

  if (isValid) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: name.value.trim(),
        email: email.value.trim(),
        password: password.value,
      })
    );

    window.location.href = './sign-in.html';
  }
});


function showError(field, message) {
  const errorElement = document.getElementById(`${field}-error`);
  if (errorElement) errorElement.textContent = message;
}

function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((message) => (message.textContent = ''));
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}


  document.getElementById('signin-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
  
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const formError = document.getElementById('form-error');
  
    emailError.textContent = '';
    passwordError.textContent = '';
    formError.textContent = '';
  
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user || user.email !== email || user.password !== password) {
      formError.textContent = 'Invalid email or password';
      return;
    }
  
    window.location.href = '../index.html';
  });

  