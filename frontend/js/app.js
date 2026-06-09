const loginForm =
    document.getElementById("login-form");

const messageDiv =
    document.getElementById("message");

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username")
                .value
                .trim();

        const password =
            document.getElementById("password")
                .value;

        try {

            messageDiv.textContent =
                "Logging in...";

            await login(
                username,
                password
            );

            messageDiv.textContent =
                "Login successful";

            renderDashboard();

        }
        catch (error) {

            messageDiv.textContent =
                error.message;
        }
    }
);

if (isAuthenticated()) {

    renderDashboard();
}