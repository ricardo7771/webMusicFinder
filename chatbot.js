document.addEventListener("DOMContentLoaded", () => {
    const socket = io("http://192.168.1.111:3000"); // Conectar con el backend de Socket.io
    const chatBox = document.getElementById("chat-box");
    const inputMessage = document.getElementById("message");
    const sendButton = document.getElementById("send");
    const chatbotContainer = document.getElementById("chatbot-container");
    const openChatbotButton = document.getElementById("open-chatbot");
    const closeChatbotButton = document.getElementById("close-chatbot");

    // Verificar si el usuario ha iniciado sesión
    const userId = localStorage.getItem('userID');
    if (userId) {
        openChatbotButton.classList.remove("hidden");
    }

    // Mostrar el chatbot cuando el usuario haga clic en el botón flotante
    openChatbotButton.addEventListener("click", () => {
        chatbotContainer.classList.remove("hidden");
        openChatbotButton.classList.add("hidden");
    });

    // Cerrar el chatbot
    closeChatbotButton.addEventListener("click", () => {
        chatbotContainer.classList.add("hidden");
        openChatbotButton.classList.remove("hidden");
    });

    sendButton.addEventListener("click", () => {
        const message = inputMessage.value.trim();
        if (message === "") return;

        appendMessage("Tú", message, "text-green-600");

        // Enviar mensaje al servidor
        socket.emit("message", message);

        // Limpiar input
        inputMessage.value = "";
    });

    // Escuchar la respuesta del chatbot
    socket.on("response", (message) => {
        appendMessage("Bot", message, "text-blue-600");
    });

    function appendMessage(user, text, color) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("p-1", color);
        messageElement.innerHTML = `<strong>${user}:</strong> ${text}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
