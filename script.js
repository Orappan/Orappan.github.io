/* ===============================
   PROFESSION CHANGING TEXT
================================ */

// Wait until the HTML page has fully loaded before running the script.
// This ensures that the element we want to animate actually exists.
document.addEventListener("DOMContentLoaded", () => {

  // Select the HTML element where the animated text will appear.
  // This is the element whose text content will change dynamically.
  const textElement = document.querySelector("#profession");

  // Characters to use for the "scrambling" effect.
  // When a letter hasn't been revealed yet, a random letter from this string will be shown.
  const alphabetChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // List of words or phrases that will appear one after another in the animation.
  const wordList = [
    "Cybersecurity Enthusiast",
    "Penetration Tester",
    "Bug Bounty Hunter",
    "Application Security Expert"
    //"Entrepreneur",
  ];

  // Keep track of the index of the current word being animated.
  let currentWordIndex = 0;

  // Will store the ID of the current animation frame so it can be canceled when switching words.
  let animationFrameId;

  // Function to animate a single word from the word list
  const animateText = () => {

    // How many letters of the current word have been revealed so far.
    // Starts at 0 for a new word.
    let revealProgress = 0;

    // The word currently being animated.
    const currentWord = wordList[currentWordIndex];

    // This function is called repeatedly to create the animation frame by frame.
    const animateStep = () => {

      // Build the text that will appear on the screen during this frame.
      // Split the word into individual letters to process each one separately.
      textElement.textContent = currentWord
        .split("") 
        .map((char, charIndex) => {
          // If the current letter's index is less than revealProgress, show the real letter.
          if (charIndex < revealProgress) return char;

          // If it's a space, leave it as a space (we don't scramble spaces)
          if (char === " ") return " ";

          // Otherwise, show a random letter for the scrambling effect
          // Math.random() * 26 generates a number between 0 and 26 (exclusive)
          // The bitwise OR "| 0" converts it to an integer
          return alphabetChars[Math.random() * 26 | 0];
        })
        .join(""); // Turn the array of letters back into a string

      // Slowly reveal the next letter
      // revealProgress increases by 0.33 each frame for a smooth gradual reveal
      revealProgress += 0.33;

      // If there are still letters to reveal, schedule the next animation frame
      if (revealProgress <= currentWord.length) {
        animationFrameId = requestAnimationFrame(animateStep);
      }
      // Once revealProgress exceeds the word length, the animation stops naturally
    };

    // Start the animation loop for this word
    animationFrameId = requestAnimationFrame(animateStep);
  };

  // Immediately start animating the first word when the page loads
  animateText();

  // Every 4 seconds, switch to the next word in the list
  setInterval(() => {

    // Stop the current animation to avoid overlapping frames
    cancelAnimationFrame(animationFrameId);

    // Move to the next word
    // The modulo operator (%) makes sure that after the last word,
    // we go back to the first word (creates an infinite loop)
    currentWordIndex = (currentWordIndex + 1) % wordList.length;

    // Start animating the new word
    animateText();

  }, 3000); // 3000 milliseconds = 3 seconds
});


/* ===============================
   PROJECT HORIZONTAL SCROLL CONTROLS
================================ */

const projectContainer = document.querySelector('.projects-container');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

const scrollAmount = 320;

if (scrollLeftBtn && projectContainer) {
  scrollLeftBtn.addEventListener('click', () => {
    projectContainer.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });
}

if (scrollRightBtn && projectContainer) {
  scrollRightBtn.addEventListener('click', () => {
    projectContainer.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
}

/* ===============================
   JOB EXPERIENCE CALCULATOR
================================ */

// ---------- Helper function ----------
const monthsBetween = (start, end) => {
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months--;
  return months;
};

// ---------- Helper to convert human-friendly month to JS month ----------
const makeDate = (year, month, day) => new Date(year, month - 1, day); // month: 1=Jan, 2=Feb, etc.

// ---------- JOBS DATA ----------
const jobs = [
  { start: makeDate(2021, 3, 12), end: makeDate(2024, 3, 28) }, // Job 1 March 12 2021
  //{ start: makeDate(2023, 4, 8), end: makeDate(2023, 5, 21) },  // Job 2
  { start: makeDate(2025, 4, 14), end: new Date() }             // Current job April 12 2025
];

// ---------- TOTAL EXPERIENCE ----------
const totalMonths = jobs.reduce((sum, job) => sum + monthsBetween(job.start, job.end), 0);
const experienceYears = (totalMonths / 12).toFixed(1);

// ---------- OUTPUT ----------
document.getElementById("experience").innerText = `${experienceYears} years`;


/* ===============================
   CONTACT FORM ACTIONS
================================ */

const sendEmailBtn = document.getElementById('sendEmail');
const sendWhatsAppBtn = document.getElementById('sendWhatsApp');

const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');

/* Send Email */
if (sendEmailBtn) {
  sendEmailBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
      alert('Please fill in both Name and Message.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(message);

    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
  });
}

/* Send WhatsApp */
if (sendWhatsAppBtn) {
  sendWhatsAppBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
      alert('Please fill in both Name and Message.');
      return;
    }

    const fullMessage = encodeURIComponent(
      `Hi Jithan, my name is ${name}.\n\n${message}`
    );

    window.open(`https://wa.me/919526375741?text=${fullMessage}`, '_blank');
  });
}
