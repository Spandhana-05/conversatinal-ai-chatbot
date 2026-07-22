let currentMode = "qa";

function changeMode(mode, button) {
    currentMode = mode;

    document.querySelectorAll(".mode").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    const modeMessages = {
        qa: "💡 Q&A mode selected. Ask me a question!",
        summarize: "📄 Summarize mode selected. Paste the text you want me to summarize.",
        recommend: "🔖 Recommendation mode selected. Ask me for a recommendation.",
        creative: "✨ Creative mode selected. Ask me for a story or creative idea."
    };

    addBotMessage(modeMessages[mode], false);
}


async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if (message === "") return;

    addUserMessage(message);
    input.value = "";

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                mode: currentMode
            })
        });

        const data = await response.json();

        addBotMessage(data.response, true);

    } catch (error) {
        addBotMessage(
            "Sorry, something went wrong. Please try again.",
            false
        );
    }
}


function addUserMessage(message) {
    const chatContainer = document.getElementById("chatContainer");

    const messageDiv = document.createElement("div");
    messageDiv.className = "message user-message";

    messageDiv.innerHTML = `
        <div class="bubble"></div>
    `;

    messageDiv.querySelector(".bubble").textContent = message;

    chatContainer.appendChild(messageDiv);
    scrollToBottom();
}


function addBotMessage(message, showFeedback = false) {
    const chatContainer = document.getElementById("chatContainer");

    const messageDiv = document.createElement("div");
    messageDiv.className = "message bot-message";

    messageDiv.innerHTML = `
        <div class="avatar">✦</div>

        <div>
            <div class="bubble"></div>

            ${showFeedback ? `
                <div class="feedback-box">
                    <span>Was this response helpful?</span>

                    <button onclick="sendFeedback('Yes', this)">
                        👍 Yes
                    </button>

                    <button onclick="sendFeedback('No', this)">
                        👎 No
                    </button>
                </div>
            ` : ""}
        </div>
    `;

    messageDiv.querySelector(".bubble").textContent = message;

    chatContainer.appendChild(messageDiv);
    scrollToBottom();
}


async function sendFeedback(value, button) {
    const feedbackBox = button.parentElement;

    try {
        const response = await fetch("/feedback", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                feedback: value
            })
        });

        await response.json();

        feedbackBox.innerHTML =
            `<span class="feedback-success">
                ✓ Thank you for your feedback!
             </span>`;

    } catch (error) {
        feedbackBox.innerHTML =
            `<span>Unable to save feedback.</span>`;
    }
}


function newChat() {
    const chatContainer = document.getElementById("chatContainer");

    chatContainer.innerHTML = `
        <div class="message bot-message">

            <div class="avatar">✦</div>

            <div class="bubble">
                <strong>Hello! I'm NovaMind AI 👋</strong>

                <p>
                    This is a new conversation.
                    Select a mode and ask me anything!
                </p>
            </div>

        </div>
    `;

    currentMode = "qa";

    document.querySelectorAll(".mode")
        .forEach(btn => btn.classList.remove("active"));

    document.querySelector(".mode")
        .classList.add("active");
}


function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}


function scrollToBottom() {
    const chatContainer = document.getElementById("chatContainer");

    chatContainer.scrollTop = chatContainer.scrollHeight;
}