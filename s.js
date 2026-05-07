let highestZIndex = 1;

class Paper {
  holdingpaper = false;
  preMouseX = 0;
  preMouseY = 0;
  mouseX = 0;
  mouseY = 0;
  velocityX = 0;
  velocityY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    // Handle mouse events
    paper.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.holdingpaper = true;
      paper.classList.add("dragging");
      paper.style.zIndex = highestZIndex;
      highestZIndex++;
      this.preMouseX = e.clientX;
      this.preMouseY = e.clientY;
    });

    // Handle touch events
    paper.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.holdingpaper = true;
      paper.classList.add("dragging");
      paper.style.zIndex = highestZIndex;
      highestZIndex++;
      this.preMouseX = e.touches[0].clientX;
      this.preMouseY = e.touches[0].clientY;
    });

    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.velocityX = this.mouseX - this.preMouseX;
      this.velocityY = this.mouseY - this.preMouseY;

      if (this.holdingpaper) {
        this.currentPaperX += this.velocityX;
        this.currentPaperY += this.velocityY;
        this.preMouseX = this.mouseX;
        this.preMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
      }
    });

    document.addEventListener("touchmove", (e) => {
      this.mouseX = e.touches[0].clientX;
      this.mouseY = e.touches[0].clientY;
      this.velocityX = this.mouseX - this.preMouseX;
      this.velocityY = this.mouseY - this.preMouseY;

      if (this.holdingpaper) {
        this.currentPaperX += this.velocityX;
        this.currentPaperY += this.velocityY;
        this.preMouseX = this.mouseX;
        this.preMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
      }
    });

    // Handle mouse and touch release
    window.addEventListener("mouseup", () => {
      this.holdingpaper = false;
      paper.classList.remove("dragging");
    });

    window.addEventListener("touchend", () => {
      this.holdingpaper = false;
      paper.classList.remove("dragging");
    });
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});

// Enhanced Confetti Effect
const confettiSymbols = ["🎉", "✨", "💖", "🌟", "🎊", "💫", "🎁", "🎂"];
let confettiCount = 30; // Number of confetti pieces

function createConfettiPiece() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");

  // Random symbol, position, size, and animation properties
  confetti.textContent =
    confettiSymbols[Math.floor(Math.random() * confettiSymbols.length)];
  confetti.style.left = Math.random() * 100 + "vw";
  confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
  confetti.style.fontSize = Math.random() * 15 + 15 + "px"; // Dynamic size
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`; // Random rotation

  document.body.appendChild(confetti);

  // Remove confetti after animation ends
  confetti.addEventListener("animationend", () => confetti.remove());
}

function burstConfetti() {
  for (let i = 0; i < confettiCount; i++) {
    createConfettiPiece();
  }
}

// Trigger confetti burst on click (or screen tap for mobile)
document.addEventListener("click", burstConfetti);

// Play birthday song
document.addEventListener("click", () => {
  const audio = document.getElementById("birthdaySong");
  if (audio.paused) {
    audio.play();
  }
});
