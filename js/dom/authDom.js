export function toggleToLogin(signupForm, loginForm) {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
}

export function toggleToSignup(signupForm, loginForm) {
  loginForm.style.display = "none";
  signupForm.style.display = "block";
}

export function clearInputFields() {
    const inputs=document.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = "";
    });
}