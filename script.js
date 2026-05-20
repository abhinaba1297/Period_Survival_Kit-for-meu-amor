let idx = -1;
let comfort = 0;
let musicStarted = false;

const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const hintEl = document.getElementById("hint");
const comfortBar = document.getElementById("comfortBar");
const comfortText = document.getElementById("comfortText");
const backBtn = document.getElementById("backBtn");
const restartBtn = document.getElementById("restartBtn");
const emergencyBtn = document.getElementById("emergencyBtn");
const stageEl = document.getElementById("stage");

const photos = [
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg"
];

const QUESTIONS = [
  {
    text: "First medical question: are periods biologically rude?",
    options: ["Yes", "Extremely rude"],
    hint: "Diagnosis confirmed. Uterus behavior: unacceptable."
  },
  {
    text: "Would a warm blanket, snacks, and me teleporting there improve the situation?",
    options: ["Yes", "Teleport immediately"],
    hint: "Teleportation request submitted to the boyfriend department."
  },
  {
    text: "Should I officially prescribe unlimited rest today?",
    options: ["Yes doctor", "Strictly necessary"],
    hint: "Prescription: no guilt, no stress, just softness."
  },
  {
    text: "Do you accept emergency forehead kisses as part of the treatment plan?",
    options: ["Yes", "All of them"],
    hint: "Side effects may include smiling and missing me."
  },
  {
    text: "Should we agree that even on painful, annoying, low-energy days, you are still my favorite person?",
    options: ["Yes", "Obviously amor"],
    hint: "This result was statistically significant."
  }
];

const finalMessage =
`Meu amor,

I know today may not feel easy on your body or your mood, so I wanted to make you this tiny cozy corner — something soft, silly, and made only for you.

You do not have to be cheerful all the time. You do not have to be productive. You do not have to pretend you feel okay.

Today, you are allowed to rest. You are allowed to be soft. You are allowed to be a little grumpy, sleepy, dramatic, hungry, emotional, or all of them at once.

And through all of it, I hope you remember this: you are deeply loved.

I wish I could be there to hold you, bring you something warm, make you laugh, and remind you that even when your body is being unfair to you, you are still the sweetest, strongest, most beautiful soul I know.

I hope this little website makes your day even 1% lighter.

I love you, meu amor. 🤎`;

const emergencyMessages = [
  "You are loved. Like, aggressively loved.",
  "Drink water, bebê. Your boyfriend has spoken.",
  "You deserve rest without guilt today.",
  "I wish I could hold you right now.",
  "Your cramps are rude, but you are perfect.",
  "Sending one emergency forehead kiss.",
  "Babe protection mode: activated.",
  "You are doing better than you think, amor."
];

function startMusic(){
  const audio = document.getElementById("bgMusic");
  if (!audio || musicStarted) return;

  audio.volume = 0.7;
  audio.load();

  audio.play()
    .then(() => {
      musicStarted = true;
    })
    .catch(() => {
      alert("Music did not start. Check that song.mp3 is uploaded at the repo root.");
    });
}

function updateComfort(value){
  comfort = Math.min(100, value);
  comfortBar.style.width = `${comfort}%`;
  comfortText.textContent = `${comfort}%`;
}

function makeButton(label, primary=false){
  const btn = document.createElement("button");
  btn.className = primary ? "choice primary" : "choice";
  btn.textContent = label;
  return btn;
}

function render(){
  choicesEl.innerHTML = "";
  hintEl.textContent = "";

  if(idx === -1){
    updateComfort(0);
    titleEl.textContent = "Period Survival Kit for Meu Amor 🤎";
    subtitleEl.textContent = "I know you’re not feeling your best right now, so I made you a tiny space on the internet that exists only to make you smile.";

    questionEl.textContent = "Do you have your AirPods connected and ready for some music to get cheered up, amor? 🎧";
    hintEl.textContent = "Required equipment: AirPods, cozy position, and willingness to smile a little.";

    const btn = makeButton("Of course", true);
    btn.onclick = () => {
      startMusic();
      idx = -0.5;
      renderLoading();
    };

    choicesEl.appendChild(btn);
    backBtn.disabled = true;
    return;
  }

  const q = QUESTIONS[idx];
  updateComfort(Math.round(((idx + 1) / QUESTIONS.length) * 88));

  titleEl.textContent = "Emergency Babe Recovery System™";
  subtitleEl.textContent = "Deploying warmth, jokes, emotional support, and scientifically questionable boyfriend medicine.";

  questionEl.textContent = q.text;
  hintEl.textContent = q.hint;

  q.options.forEach((option, i) => {
    const btn = makeButton(option, i === 1);
    btn.onclick = next;
    choicesEl.appendChild(btn);
  });

  backBtn.disabled = idx <= 0;
}

function renderLoading(){
  updateComfort(12);
  titleEl.textContent = "Analyzing Babe...";
  subtitleEl.textContent = "Running emergency comfort diagnostics.";

  questionEl.innerHTML = `
    <div class="loadingLine">✔ Cutest girl detected</div>
    <div class="loadingLine">✔ Period being unnecessarily dramatic</div>
    <div class="loadingLine">✔ Warmth required</div>
    <div class="loadingLine">✔ Boyfriend love deployment approved</div>
  `;

  choicesEl.innerHTML = "";
  hintEl.textContent = "Diagnostic complete. Treatment plan ready.";

  const btn = makeButton("Begin treatment plan 🤎", true);
  btn.onclick = () => {
    idx = 0;
    render();
  };

  choicesEl.appendChild(btn);
}

function next(){
  if(idx < QUESTIONS.length - 1){
    idx++;
    render();
  } else {
    showFinal();
  }
}

function back(){
  if(idx > 0){
    idx--;
    render();
  }
}

function restart(){
  idx = -1;
  updateComfort(0);
  render();
}

function showFinal(){
  updateComfort(100);

  titleEl.textContent = "Maximum Babe Protection Activated 🤎";
  subtitleEl.textContent = "Final treatment: love, rest, warmth, and me bothering you forever.";

  const photoHTML = photos
    .map(p => `<img src="images/${p}" alt="A sweet memory">`)
    .join("");

  stageEl.innerHTML = `
    <div class="question">Official prescription for today: rest, warmth, snacks, music, and remembering how loved you are.</div>

    <div class="photoGrid">
      ${photoHTML}
    </div>

    <div class="finalMessage">${escapeHtml(finalMessage)}</div>
  `;
}

function escapeHtml(str){
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

emergencyBtn.onclick = () => {
  const msg = emergencyMessages[Math.floor(Math.random() * emergencyMessages.length)];
  alert(msg);
};

backBtn.onclick = back;
restartBtn.onclick = restart;

render();
