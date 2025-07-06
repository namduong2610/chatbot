const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const chatPopup = document.getElementById("chat-popup");
const chatToggleBtn = document.getElementById("chat-toggle-btn");

const apiKey = "AIzaSyBuYh6S93A-7TOHqMUIqk6UyM8dp09sTvM";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;


chatToggleBtn.onclick = function() {
  if (chatPopup.style.display === "none" || chatPopup.style.display === "") {
    chatPopup.style.display = "flex";
    chatToggleBtn.style.display = "none"; 
  } else {
    chatPopup.style.display = "none";
    chatToggleBtn.style.display = "flex"; 
  }
};


chatBox.parentNode.querySelector("#chat-header").addEventListener("click", function() {
  chatPopup.style.display = "none";
  chatToggleBtn.style.display = "flex";
});

sendBtn.onclick = async function () {
  const text = userInput.value;
  if (!text) return;

  addMessage("user", text);
  userInput.value = "";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }]
    })
  });

  const data = await response.json();
  console.log(data);
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, something went wrong.";
  addMessage("bot", reply);
};

function addMessage(sender, message) {
  const msgDiv = document.createElement("div");
  // Thêm class để phân biệt tin nhắn của người dùng và bot
  msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
  msgDiv.textContent = message; // Chỉ hiển thị nội dung tin nhắn
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Press Enter to send message
userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendBtn.click();
  }
});