
async function callChatGPT(prompt) {
    const url = `https://api.openai.com/v1/chat/completions`;
    const headers = {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json",
    };

    const body = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "user",
                "content": prompt,
            }
        ]
    };

    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });

    const { choices: [{ message: { content } }] } = await response.json();

    return content
}

export { callChatGPT }