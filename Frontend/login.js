document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:27017/HabitTracker", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    alert(data.message);
    if (response.status === 200) window.location.href = "add-habit.html";
  });
  