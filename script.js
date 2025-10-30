let score = localStorage.getItem("aiQuestScore") || 0;
localStorage.setItem("aiQuestScore", 0); // Reset score on page load
score = 0;
document.getElementById("score").textContent = `Score: ${score}`;

const levels = [
  { question: "What have you developed as a system engineer?", options: ["I develop secure apps.", "I have developed secure apps.", "I was developing secure apps."], correct: 1, audio: "level1.mp3" },
  { question: "Drones have already improved logistics. True or False?", options: ["True", "False"], correct: 0, audio: "level2.mp3" },
  { question: "Which sentence describes a daily routine?", options: ["I worked on servers yesterday.", "I work on servers every day.", "I am working on servers."], correct: 1, audio: "level3.mp3" },
  { question: "Which sentence uses Past Perfect correctly?", options: ["I had learned Python before Java.", "I learn Python now.", "I have learned Python."], correct: 0, audio: "level4.mp3" },
  { question: "Which sentence uses 'just' correctly?", options: ["I just finish the report.", "I have just finished the report.", "I finished just the report."], correct: 1, audio: "level5.mp3" },
  { question: "Which sentence uses Present Continuous?", options: ["I am coding now.", "I coded yesterday.", "I have coded."], correct: 0 },
  { question: "Which is a current programming trend?", options: ["Quantum computing", "Punch cards", "Floppy disks"], correct: 0 },
  { question: "Which sentence predicts the future?", options: ["AI will replace some jobs.", "AI replaced jobs.", "AI replaces jobs."], correct: 0 },
  { question: "Which sentence shows change over time?", options: ["Tech has changed education.", "Tech changed education.", "Tech will change education."], correct: 0 },
  { question: "Which sentence mixes tenses?", options: ["Cybersecurity was evolving and has evolved.", "Cybersecurity evolves.", "Cybersecurity will evolve."], correct: 0 }
];

let currentLevel = 0;

function showLevel(index) {
  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = ""; // Clear previous content

  const level = levels[index];
  const section = document.createElement("section");
  section.className = "quiz";
  section.innerHTML = `
    <h2>Level ${index + 1}</h2>
    <p>${level.question}</p>
    ${level.audio ? `<audio controls autoplay><source src="audio/${level.audio}" type="audio/mpeg"></audio>` : ""}
    <div class="options">
      ${level.options.map((opt, idx) => `<button onclick="checkAnswer(${idx}, ${level.correct})">${opt}</button>`).join("")}
    </div>
    <p id="feedback"></p>
  `;
  gameArea.appendChild(section);
}

function checkAnswer(selected, correct) {
  const feedback = document.getElementById("feedback");
  const audio = new Audio(selected === correct ? "audio/correct.mp3" : "audio/wrong.mp3");
  audio.play();

  if (selected === correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    score = parseInt(score) + 10;
  } else {
    feedback.textContent = "❌ Incorrect. Try again!";
    feedback.style.color = "red";
    score = Math.max(0, parseInt(score) - 10);
  }

  localStorage.setItem("aiQuestScore", score);
  document.getElementById("score").textContent = `Score: ${score}`;

  // Wait 2 seconds, then show next level
  setTimeout(() => {
  currentLevel++;
  if (currentLevel < levels.length) {
    showLevel(currentLevel);
  } else {
    document.getElementById("gameArea").innerHTML = `
      <h2>🎉 Game Completed!</h2>
      <p>Your final score is ${score}.</p>
      <button onclick="restartGame()" class="restart-btn">🔁 Play Again</button>
    `;
  }
}, 2000);
}
function restartGame() {
  score = 0;
  currentLevel = 0;
  localStorage.setItem("aiQuestScore", 0);
  document.getElementById("score").textContent = `Score: ${score}`;
  showLevel(currentLevel);
}


// Start the game
showLevel(currentLevel);