import requests
from prompts import get_prompt

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3.2"

prompt_variation = 0


def get_chatbot_response(message, mode="qa"):
    global prompt_variation

    # Select one of the 3 prompt variations
    instruction = get_prompt(mode, prompt_variation)

    # Rotate prompts: 1 → 2 → 3 → 1
    prompt_variation = (prompt_variation + 1) % 3

    full_prompt = f"""
You are NovaMind, a helpful AI assistant.

Instruction:
{instruction}

User input:
{message}

Give only the final helpful response.
"""

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL,
                "prompt": full_prompt,
                "stream": False
            },
            timeout=120
        )

        response.raise_for_status()

        result = response.json()

        return result.get(
            "response",
            "Sorry, I could not generate a response."
        ).strip()

    except requests.exceptions.ConnectionError:
        return (
            "I could not connect to the local AI model. "
            "Please make sure Ollama is running."
        )

    except Exception as error:
        return f"Sorry, an error occurred: {str(error)}"