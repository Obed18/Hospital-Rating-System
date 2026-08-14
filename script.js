const form = document.getElementById("feedbackForm");
const overallInput = document.getElementById("overallRating");
const overallStars = [...document.querySelectorAll(".big-star")];
const overallHint = document.getElementById("overallHint");
const toast = document.getElementById("toast");
const textarea = document.querySelector("textarea");
const count = document.getElementById("count");

const labels = {
  1: "Very poor — we'd like to do better",
  2: "Needs improvement",
  3: "Good experience",
  4: "Very good experience",
  5: "Excellent experience — thank you!"
};

function setStars(buttons, value, inputId) {
  buttons.forEach(btn => {
    btn.classList.toggle("active", Number(btn.dataset.value) <= value);
  });
  if (inputId) document.getElementById(inputId).value = value || "";
}

overallStars.forEach(star => {
  star.addEventListener("mouseenter", () => {
    const value = Number(star.dataset.value);
    overallStars.forEach(s => s.classList.toggle("active", Number(s.dataset.value) <= value));
  });

  star.addEventListener("mouseleave", () => {
    setStars(overallStars, Number(overallInput.value));
  });

  star.addEventListener("click", () => {
    const value = Number(star.dataset.value);
    overallInput.value = value;
    setStars(overallStars, value);
    overallHint.textContent = `${value}/5 — ${labels[value]}`;
  });
});

document.querySelectorAll(".rating-stars").forEach(group => {
  const field = group.dataset.field;
  const input = document.getElementById(field);

  for (let i = 1; i <= 5; i++) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "small-star";
    button.dataset.value = i;
    button.setAttribute("aria-label", `${i} star${i > 1 ? "s" : ""}`);
    button.innerHTML = `★<span class="number">${i}</span>`;

    button.addEventListener("click", () => {
      input.value = i;
      [...group.children].forEach(s => s.classList.toggle("active", Number(s.dataset.value) <= i));
    });

    group.appendChild(button);
  }
});

textarea.addEventListener("input", () => {
  count.textContent = textarea.value.length;
});

function showToast(message, type = "") {
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.className = "toast";
  }, 4500);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!overallInput.value) {
    showToast("Please select an overall rating first.", "error");
    document.getElementById("overallStars").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const requiredRatings = [
    "friendliness",
    "professionalism",
    "waiting_time",
    "cleanliness",
    "overall_service"
  ];

  const missing = requiredRatings.find(id => !document.getElementById(id).value);
  if (missing) {
    showToast("Please complete all five service ratings.", "error");
    return;
  }

  const button = form.querySelector(".submit-btn");
  const original = button.innerHTML;
  button.disabled = true;
  button.innerHTML = "Submitting…";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (!response.ok) throw new Error("Submission failed");

    form.reset();
    overallInput.value = "";
    setStars(overallStars, 0);
    overallHint.textContent = "Tap a star to rate your overall experience";
    document.querySelectorAll(".rating-stars").forEach(group => {
      [...group.children].forEach(s => s.classList.remove("active"));
    });
    document.querySelectorAll('input[type="hidden"]').forEach(input => {
      if (input.id && input.id !== "overallRating" && input.id !== "form_source") input.value = "";
    });
    count.textContent = "0";

    showToast("Thank you! Your feedback has been submitted successfully.", "success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    showToast("We couldn't submit your feedback. Please try again.", "error");
  } finally {
    button.disabled = false;
    button.innerHTML = original;
  }
});
