document.getElementById('send-message').addEventListener('click', async () => {
    const inputElem = document.getElementById('input-message');
    const message = inputElem.value;
    inputElem.value = '';

    const responseArea = document.getElementById('response-area');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        if (response.ok) {
            const data = await response.json();
            // Assuming data has { message: 'response message', tokens: 10 }
            const messageElem = document.createElement('div');
            messageElem.textContent = `Mistral: ${data.message} (Tokens: ${data.tokens})`;
            responseArea.prepend(messageElem); // Show the newest message at the top
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
