let redirectUrl = "";

function fetchEvents() {
  fetch('/api/events')
    .then(res => res.json())
    .then(events => {
      const container = document.getElementById("events-container");
      events.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
          <h3>${event.name}</h3>
          <p>${event.date}</p>
          <p>${event.venue}</p>
          <button onclick="openModal('${event.url}')">GET TICKETS</button>
        `;
        container.appendChild(card);
      });
    });
}

function openModal(url) {
  redirectUrl = url;
  document.getElementById("emailModal").style.display = "block";
}

function closeModal() {
  document.getElementById("emailModal").style.display = "none";
}

function submitEmail() {
  const email = document.getElementById("emailInput").value;

  if (email && email.includes("@")) {
    fetch('/api/submit-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, eventUrl: redirectUrl })
    })
    .then(res => {
      if (res.ok) {
        closeModal();
        window.open(redirectUrl, "_blank");
      } else {
        alert("Failed to save email.");
      }
    });
  } else {
    alert("Please enter a valid email.");
  }
}

window.onload = fetchEvents;