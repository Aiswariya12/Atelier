

document.addEventListener('DOMContentLoaded', () => {
  setupLoginForm();
  setupRegisterForm();
});

//Login Page Functionalities

function setupLoginForm() {
  const loginBtn = document.querySelector('.minicontainer button[type="submit"]');
  const emailInput = document.querySelector('.address input[type="email"]');
  const passwordInput = document.querySelector('.address input[type="password"], .one1 input');
  const toggleEye = document.querySelector('.one1 span:last-child');
  const googleBtn = document.querySelector('.btn');
  const appleBtn = document.querySelector('.btn5');

  // Password visibility toggle
  if (toggleEye && passwordInput) {
    toggleEye.style.cursor = 'pointer';
    toggleEye.setAttribute('title', 'Show/Hide password');
    toggleEye.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      toggleEye.style.opacity = isPassword ? '0.6' : '1';
    });
  }

  // Social sign-in simulation
  if (googleBtn) {
    googleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      AtelierStore.showToast('Connecting to Google Identity...', 'info');
      setTimeout(() => {
        AtelierStore.setCurrentUser({ name: 'Alexander Vance', email: 'alexander@atelier.com', provider: 'google' });
        AtelierStore.showToast('Successfully signed in with Google!', 'success');
        setTimeout(() => window.location.href = './index.html', 1000);
      }, 1000);
    });
  }

  if (appleBtn) {
    appleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      AtelierStore.showToast('Connecting to Apple ID...', 'info');
      setTimeout(() => {
        AtelierStore.setCurrentUser({ name: 'Alexander Vance', email: 'alexander@atelier.com', provider: 'apple' });
        AtelierStore.showToast('Successfully signed in with Apple!', 'success');
        setTimeout(() => window.location.href = './index.html', 1000);
      }, 1000);
    });
  }

  // Submit Login
  if (loginBtn && emailInput && passwordInput) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const pass = passwordInput.value.trim();

      if (!email || !email.includes('@')) {
        AtelierStore.showToast('Please enter a valid email address.', 'error');
        emailInput.focus();
        return;
      }

      if (!pass || pass.length < 6) {
        AtelierStore.showToast('Password must be at least 6 characters.', 'error');
        passwordInput.focus();
        return;
      }

      loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
      loginBtn.style.pointerEvents = 'none';

      setTimeout(() => {
        const username = email.split('@')[0];
        const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
        AtelierStore.setCurrentUser({ name: formattedName, email: email });
        AtelierStore.showToast(`Welcome back, ${formattedName}!`, 'success');
        setTimeout(() => {
          window.location.href = './index.html';
        }, 1000);
      }, 1200);
    });
  }
}

/**
 * Register Page Functionalities
 */
function setupRegisterForm() {
  const registerBtn = document.querySelector('.right button[type="submit"]');
  const nameInput = document.querySelector('.one input');
  const emailInput = document.querySelector('.two input');
  const passwordInputs = document.querySelectorAll('.three .box input');
  const termsCheckbox = document.querySelector('.checkboxx input[type="checkbox"]');
  const strengthLabel = document.querySelector('.bar3');
  const strengthBars = document.querySelectorAll('.bar .d1');

  if (passwordInputs.length < 2) return;

  const passwordInput = passwordInputs[0];
  const confirmPasswordInput = passwordInputs[1];

  // Dynamic Password Strength Meter
  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    const strength = calculatePasswordStrength(val);

    if (!strengthLabel || strengthBars.length === 0) return;

    if (val.length === 0) {
      strengthLabel.textContent = 'None';
      strengthLabel.style.color = '#697489';
      strengthBars.forEach(b => {
        b.style.backgroundColor = '#E2E8F0';
        b.style.opacity = '1';
      });
      return;
    }

    if (strength === 1) {
      strengthLabel.textContent = 'Weak';
      strengthLabel.style.color = '#EF4444';
      if (strengthBars[0]) strengthBars[0].style.backgroundColor = '#EF4444';
      if (strengthBars[1]) strengthBars[1].style.backgroundColor = '#E2E8F0';
      if (strengthBars[2]) strengthBars[2].style.backgroundColor = '#E2E8F0';
    } else if (strength === 2) {
      strengthLabel.textContent = 'Medium';
      strengthLabel.style.color = '#F59E0B';
      if (strengthBars[0]) strengthBars[0].style.backgroundColor = '#F59E0B';
      if (strengthBars[1]) strengthBars[1].style.backgroundColor = '#F59E0B';
      if (strengthBars[2]) strengthBars[2].style.backgroundColor = '#E2E8F0';
    } else {
      strengthLabel.textContent = 'Strong';
      strengthLabel.style.color = '#10B981';
      strengthBars.forEach(b => b.style.backgroundColor = '#10B981');
    }
  });

  function calculatePasswordStrength(password) {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 9 && /[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
    if (password.length >= 10 && /[^A-Za-z0-9]/.test(password)) score++;
    return Math.max(1, Math.min(3, score || 1));
  }

  // Password Confirmation Validation
  confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value.length > 0) {
      confirmPasswordInput.style.borderColor = '#10B981';
    } else {
      confirmPasswordInput.style.borderColor = '#EF4444';
    }
  });

  // Submit Registration
  if (registerBtn) {
    const parentA = registerBtn.closest('a');
    if (parentA) {
      parentA.addEventListener('click', (e) => e.preventDefault());
    }

    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const pass = passwordInput.value.trim();
      const confirmPass = confirmPasswordInput.value.trim();

      if (!name) {
        AtelierStore.showToast('Please enter your full name.', 'error');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!email || !email.includes('@')) {
        AtelierStore.showToast('Please enter a valid email address.', 'error');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!pass || pass.length < 6) {
        AtelierStore.showToast('Password must be at least 6 characters.', 'error');
        passwordInput.focus();
        return;
      }

      if (pass !== confirmPass) {
        AtelierStore.showToast('Passwords do not match.', 'error');
        confirmPasswordInput.focus();
        return;
      }

      if (termsCheckbox && !termsCheckbox.checked) {
        AtelierStore.showToast('Please agree to the Terms of Service & Privacy Policy.', 'error');
        termsCheckbox.focus();
        return;
      }

      registerBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';
      registerBtn.style.pointerEvents = 'none';

      setTimeout(() => {
        AtelierStore.setCurrentUser({ name, email });
        AtelierStore.showToast(`Account created for ${name}! Welcome to Atelier.`, 'success');
        setTimeout(() => {
          window.location.href = './index.html';
        }, 1200);
      }, 1500);
    });
  }
}
