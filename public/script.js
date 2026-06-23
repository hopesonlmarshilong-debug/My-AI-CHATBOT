async function sendMessage() {
    const input = document.getElementById("message");
    const message = input.value.trim();

    if (!message) return;

    const chatBox = document.getElementById("response");

    // User message
    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.textContent = message;
    chatBox.appendChild(userDiv);

    input.value = "";

    // AI loading message
    const aiDiv = document.createElement("div");
    aiDiv.className = "ai-message";
    aiDiv.textContent = "Thinking...";
    chatBox.appendChild(aiDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();

        aiDiv.textContent = data.reply;
    } catch (error) {
        aiDiv.textContent = "Error getting response.";
        console.error(error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter to send
document.getElementById("message").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});