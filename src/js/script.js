document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#loginForm");
    const registerForm = document.querySelector("#registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.querySelector("#loginEmail").value;
            const password = document.querySelector("#loginPassword").value;

            if (email === "" || password === "") {
                alert("Please fill in all fields!");
            } else {
                alert("Login successful! (Fitur ini belum ada backend)");
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.querySelector("#registerName").value;
            const email = document.querySelector("#registerEmail").value;
            const password = document.querySelector("#registerPassword").value;

            if (name === "" || email === "" || password === "") {
                alert("Please fill in all fields!");
            } else {
                alert("Registration successful! (Fitur ini belum ada backend)");
            }
        });
    }
});
