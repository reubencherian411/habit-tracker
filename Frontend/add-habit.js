document.getElementById("createHabitBtn").addEventListener("click", async () => {
    const habitName = document.getElementById("habitInput").value;
    const userId = localStorage.getItem("userId");

    if (!habitName) {
        alert("Please enter a habit.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/habits/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, name: habitName }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Habit added successfully!");
            window.location.href = "weekly-view.html"; // Redirect to Weekly View Page
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Request failed:", error);
        alert("Failed to connect to the server.");
    }
});
