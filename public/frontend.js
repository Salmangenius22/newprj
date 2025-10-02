// --- Kalkulator Botol ---
function calculateValue() {
  const bottlePrice = 500; // Rp per botol
  const bottles = document.getElementById("bottleInput").value;
  const total = bottles * bottlePrice;

  if (bottles > 0) {
    document.getElementById(
      "resultText"
    ).innerText = `${bottles} botol = Rp ${total.toLocaleString("id-ID")}`;
  } else {
    document.getElementById("resultText").innerText =
      "Masukkan jumlah botol dengan benar!";
  }
}

// --- Chatbot ---
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatContainer = document.getElementById("chatContainer");
const chatToggleBtn = document.getElementById("chatToggleBtn");
const closeChat = document.getElementById("closeChat");

function appendMessage(text, cls) {
  const d = document.createElement("div");
  d.className = "message " + cls;
  d.innerText = text;
  chatBox.appendChild(d);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  appendMessage(msg, "user");
  userInput.value = "";

  const loading = document.createElement("div");
  loading.className = "message bot";
  loading.innerText = "EcoBot sedang mengetik...";
  chatBox.appendChild(loading);

  try {
    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });
    const data = await resp.json();
    loading.remove();
    appendMessage(data.reply, "bot");
  } catch (err) {
    console.error(err);
    loading.remove();
    appendMessage("Terjadi kesalahan koneksi.", "bot");
  }
}

// Event
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Toggle Chat
chatToggleBtn.addEventListener("click", () => {
  chatContainer.classList.toggle("hidden");
});
closeChat.addEventListener("click", () => {
  chatContainer.classList.add("hidden");
});
