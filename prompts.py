PROMPTS = {
    "qa": [
        "Answer the user's question clearly and concisely using simple and easy-to-understand language.",

        "Explain the user's question in detail using simple language. Include a relevant example when it helps understanding.",

        "Provide an accurate and well-structured answer to the user's question. Explain the important points clearly for a beginner."
    ],

    "summarize": [
        "Summarize the user's text clearly and concisely. Include only the most important information.",

        "Identify the key points in the user's text and present them as a short, easy-to-understand summary.",

        "Provide a clear overview of the user's text while preserving the main ideas and important details."
    ],

    "recommend": [
        "Provide practical and relevant recommendations based on the user's request and requirements.",

        "Suggest suitable options for the user and briefly explain why each recommendation may be useful.",

        "Analyze the user's request and provide well-structured recommendations that best match their needs."
    ],

    "creative": [
        "Generate original and engaging creative content based on the user's request.",

        "Create imaginative content based on the user's topic, using an interesting and appropriate writing style.",

        "Develop detailed and original creative content while following the user's requested topic, tone, and format."
    ]
}


def get_prompt(mode, variation=0):
    if mode not in PROMPTS:
        mode = "qa"

    prompts = PROMPTS[mode]

    return prompts[variation % len(prompts)]