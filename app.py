from flask import Flask, render_template, request, jsonify
from chatbot import get_chatbot_response
from datetime import datetime

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    message = data.get("message", "")
    mode = data.get("mode", "qa")

    response = get_chatbot_response(message, mode)

    return jsonify({
        "response": response
    })


@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.get_json()

    feedback_value = data.get("feedback", "")

    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open("feedback.txt", "a", encoding="utf-8") as file:
        file.write(
            f"{time} - Feedback: {feedback_value}\n"
        )

    return jsonify({
        "message": "Feedback saved successfully!"
    })


if __name__ == "__main__":
    app.run(debug=True)