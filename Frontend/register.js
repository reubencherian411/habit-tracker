document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:27017/HabitTracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    alert(data.message);
    if (response.status === 201) window.location.href = "login.html";
});
