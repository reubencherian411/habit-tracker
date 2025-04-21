document.getElementById("createHabitBtn").addEventListener("click", async () => {
    const habitName = document.getElementById("habitInput").value.trim();
    const auth = JSON.parse(localStorage.getItem('auth')); // Get stored auth data
  
    if (!habitName) {
      alert("Please enter a habit name");
      return;
    }
  
    if (!auth?.userId) {
      alert("Please login first");
      window.location.href = "login.html";
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/habits/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: habitName,
          userId: auth.userId // Include userId in the request
        })
      });
  
      if (!response.ok) throw new Error("Failed to add habit");
      window.location.href = "weekly-view.html";
    } catch (error) {
      console.error("Error adding habit:", error);
      alert(error.message);
    }
  });