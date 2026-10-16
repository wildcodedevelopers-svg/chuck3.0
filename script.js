const chat = document.getElementById("chat");

function addMessage(sender, text) {
  chat.innerHTML += `<p class="${sender}"><b>${sender}:</b> ${text}</p>`;
  chat.scrollTop = chat.scrollHeight;
}

function chuckReply(msg) {
  let reply = "";
  const input = msg.toLowerCase();

  // Decision-making rules
  if (input.includes("turn on light")) {
    reply = "Yes Boss, I’ve turned on the light 💡 (simulated)";
  } else if (input.includes("turn off light")) {
    reply = "Yes Boss, the light is now off 🌑 (simulated)";
  } else if (input.includes("play music")) {
    reply = "Yes Boss, playing your favorite track 🎵 (simulated)";
  } else if (input.includes("weather")) {
    reply = "Boss, imagine a sunny day ☀️ with clear skies.";
  } else if (input.includes("joke")) {
    reply = "Boss, here’s one: Robots don’t panic, they’ve got nerves of steel 🤖";
  } else {
    reply = "Yes Boss, I received: " + msg;
  }

  addMessage("chuck", reply);
  speak(reply);
}

function sendMessage() {
  const msg = document.getElementById("message").value;
  if (!msg) return;
  addMessage("user", msg);
  chuckReply(msg);
  document.getElementById("message").value = "";
}

// Hands-free continuous listening
function startVoice() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const msg = event.results[event.results.length - 1][0].transcript;
    addMessage("user", msg);
    chuckReply(msg);
  };

  recognition.start();
}

// Voice output with deep male voice
function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);

  const voices = synth.getVoices();
  const preferredVoice = voices.find(v =>
    v.name.toLowerCase().includes("male") ||
    v.name.toLowerCase().includes("baritone") ||
    v.lang === "en-US"
  );

  if (preferredVoice) {
    utter.voice = preferredVoice;
  }

  synth.speak(utter);
}
