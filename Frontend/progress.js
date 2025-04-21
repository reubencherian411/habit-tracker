async function loadProgress() {
  const auth = JSON.parse(localStorage.getItem('auth'));
  if (!auth?.userId) return window.location.href = "login.html";

  try {
    const response = await fetch(`http://localhost:5000/habits?userId=${auth.userId}`);
    const habits = await response.json();

    // Get current week's progress only
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const currentWeekStart = new Date(currentDate);
    currentWeekStart.setDate(currentDate.getDate() - currentDayOfWeek);

    // Calculate weekly progress
    const weeklyProgress = habits.map(habit => {
      const weeklyCompletion = Object.entries(habit.progress || {})
        .filter(([dayIndex]) => {
          const progressDate = new Date(currentWeekStart);
          progressDate.setDate(progressDate.getDate() + parseInt(dayIndex));
          return progressDate <= currentDate;
        })
        .filter(([, completed]) => completed).length;

      return {
        name: habit.name,
        completed: weeklyCompletion,
        total: Math.min(7, currentDayOfWeek + 1) // Days passed this week
      };
    });

    // Render progress for each habit
    const progressHTML = weeklyProgress.map(habit => `
      <div class="habit-progress">
        <h3>${habit.name}</h3>
        <div class="progress-bar">
          <div style="width: ${(habit.completed / habit.total) * 100}%"></div>
        </div>
        <div class="stats">${habit.completed}/${habit.total} days</div>
      </div>
    `).join('');

    document.getElementById("progress").innerHTML = `
      <h2>This Week's Progress</h2>
      ${progressHTML}
    `;

  } catch (error) {
    console.error("Error:", error);
    alert("Failed to load progress");
  }
}