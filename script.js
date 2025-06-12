async function generateIdea() {
  const skills = document.getElementById("skills").value.trim();
  const outputEl = document.getElementById("output");
  const loadingEl = document.getElementById("loading");

  if (!skills) return alert("Please enter your skills.");

  outputEl.textContent = "";
  loadingEl.classList.remove("hidden");

  try {
    const response = await fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ skills })
    });

    const result = await response.json();
    loadingEl.classList.add("hidden");

    if (result.output) {
      typeWriterEffect(result.output, outputEl);
      outputEl.scrollIntoView({ behavior: "smooth" });
    } else {
      outputEl.textContent = result.error || "Something went wrong!";
    }
  } catch (err) {
    loadingEl.classList.add("hidden");
    outputEl.textContent = "Error connecting to server.";
  }
}

function typeWriterEffect(text, element) {
  let i = 0;
  element.textContent = "";
  const interval = setInterval(() => {
    element.textContent += text[i++];
    if (i >= text.length) clearInterval(interval);
  }, 20);
}

document.getElementById("theme-toggle").onclick = () => {
  document.body.classList.toggle("light-mode");
};

// Simple placeholder for email subscription
document.getElementById("subscribe-form").onsubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  alert(`Subscribed with: ${email}`);
};
