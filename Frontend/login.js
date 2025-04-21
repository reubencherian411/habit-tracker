// login.js
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  
  try {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    
    const data = await res.json();
    localStorage.setItem('auth', JSON.stringify({
      userId: data.userId,
      email: data.email
    }));
    window.location.href = "dashboard.html";
  } catch (err) {
    alert("Login failed");
  }
});