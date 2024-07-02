function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleButton = event.target;
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.textContent = "Hide";
    } else {
        passwordField.type = "password";
        toggleButton.textContent = "Show";
    }
}
function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleButton = event.target;
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.textContent = "Hide";
    } else {
        passwordField.type = "password";
        toggleButton.textContent = "Show";
    }
}

function toggleConfirmPassword() {
    const confirmPasswordField = document.getElementById("confirm-password");
    const toggleButton = event.target;
    if (confirmPasswordField.type === "password") {
        confirmPasswordField.type = "text";
        toggleButton.textContent = "Hide";
    } else {
        confirmPasswordField.type = "password";
        toggleButton.textContent = "Show";
    }
}
