async function fetchHabits() {
    try {
      const res = await fetch("http://localhost:5000/habits");
      const habits = await res.json();
  
      let totalDays = 0;
      let completedDays = 0;
  
      habits.forEach(habit => {
        habit.progress.forEach(day => {
          totalDays++;
          if (day) completedDays++;
        });
      });
  
      const percent = totalDays ? Math.round((completedDays / totalDays) * 100) : 0;
  
      const summaryBox = document.getElementById("progress");
      summaryBox.innerHTML = `
        <strong>Total Habits Tracked:</strong> ${habits.length}<br>
        <strong>Progress:</strong> ${completedDays} / ${totalDays} days completed (${percent}%)
      `;
  
      // Update progress bar
      const progressBarFill = document.getElementById("progress-bar-fill");
      progressBarFill.style.width = percent + "%";
  
    } catch (error) {
      console.error("Error loading progress summary:", error);
    }
  }
  
  fetchHabits();
  