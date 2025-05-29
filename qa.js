const qa = {
    "What is your name?": "I am Shendet Avdyli, a student focused on Cybersecurity and Web Development.",
    "What do you do?": "I am a Computing and Information Technologies student with a strong focus on Cybersecurity and Web Development & Design.",
    "Tell me about your projects": "I work on a range of projects, including a Cybersecurity Awareness Hub and a Tech Job Platform.",
    "How can I contact you?": "You can reach me at shendet.avdyli@gmail.com.",
    "What is your background?": "I am skilled in Cybersecurity, Web Development, and Design, with a passion for building secure systems."
};

function getAnswer(userInput) {
    userInput = userInput.trim().toLowerCase();
    const answer = qa[userInput];
    return answer || "Sorry, I didn't quite catch that. Could you ask something else?";
}
