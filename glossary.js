const glossaryTerms = [
  { term: "Algorithm", definition: "A set of rules for solving problems." },
  { term: "Cybersecurity", definition: "Protection of systems from digital attacks." },
  { term: "Machine Learning", definition: "AI that learns from data." },
  { term: "Encryption", definition: "Securing data by converting it into code." },
  { term: "Cloud Computing", definition: "Storing and accessing data over the internet." },
  { term: "Backend", definition: "Server-side logic and database management." },
  { term: "Frontend", definition: "User interface and client-side code." },
  { term: "Data Privacy", definition: "Protection of personal and sensitive information." },
  { term: "Automation", definition: "Using technology to perform tasks without human input." },
  { term: "Quantum Computing", definition: "Advanced computing using quantum mechanics." }
];

function toggleGlossary() {
  const box = document.getElementById("glossaryBox");
  box.classList.toggle("hidden");
  if (!box.classList.contains("hidden")) {
    box.innerHTML = glossaryTerms.map(term =>
      `<div class="card"><strong>${term.term}</strong><p>${term.definition}</p></div>`
    ).join("");
  }
}
