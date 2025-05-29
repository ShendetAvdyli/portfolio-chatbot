document.getElementById('send-btn').addEventListener('click', sendMessage);

document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    displayMessage(userInput, 'user');

    try {
        const response = await fetch('https://your-backend-url.onrender.com/chat', {  // <-- UPDATE THIS URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        displayMessage(data.response || "Bot didn't respond", 'bot');
    } catch (error) {
        console.error('Error:', error);
        displayMessage('Oops! Something went wrong. Please try again later.', 'bot');
    }

    document.getElementById('user-input').value = '';
}

function displayMessage(message, sender) {
    const messageContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function openChatbot() {
    document.getElementById('chatbot-popup').style.display = 'block';
}

function closeChatbot() {
    document.getElementById('chatbot-popup').style.display = 'none';
}
