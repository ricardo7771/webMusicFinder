const socket = io("https://musicfinderapi-amwf.onrender.com");

let studentID = "";
let professorID = "";
let user = "";

// Unirse a una sala privada basada en los IDs
function joinRoom() {
  studentID = document.getElementById("studentInput").value;
  professorID = document.getElementById("professorInput").value;
  user = document.getElementById("userInput").value;

  if (studentID && professorID && user) {
    socket.emit("joinRoom", { studentID, professorID });
    document.getElementById("join-section").classList.add("hidden");
    document.getElementById("chat-section").classList.remove("hidden");
  } else {
    alert("Por favor, completa todos los campos.");
  }
}

// Enviar mensaje al chat
function sendMessage() {
  const message = document.getElementById("messageInput").value;
  if (message.trim() !== "") {
    socket.emit("sendMessage", { studentID, professorID, user, message });
    document.getElementById("messageInput").value = "";
  }
}

// Recibir mensajes y mostrarlos en pantalla
socket.on("message", ({ user, message }) => {
  const messageDiv = document.createElement("div");
  messageDiv.className = "mb-2";
  messageDiv.innerHTML = `<strong>${user}:</strong> ${message}`;
  document.getElementById("messages").appendChild(messageDiv);
  scrollToBottom();
});

// Mantener el scroll abajo
function scrollToBottom() {
  const messageContainer = document.getElementById("messages");
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
