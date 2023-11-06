// Grabbing important parts of our webpage so we can use them later. Think of it like setting aside your tools before you start a project.
const loader = document.getElementById('loader');  // This is where our loading spinner lives
const quoteContainer = document.getElementById('quote-container');  // This is the container for the quote and author
const quoteElement = document.getElementById('quote');  // This is where the quote text will go
const authorElement = document.getElementById('author');  // This is where the author's name will go
const twitterButton = document.getElementById('twitter');  // This is our button to tweet the quote
const newQuoteButton = document.getElementById('new-quote');  // This is our button to load a new quote

// This function makes the spinner visible and hides the quote, showing that the webpage is working on getting a new quote.
function showLoadingSpinner() {
    loader.style.display = 'block';  // "block" display means "show it"
    quoteContainer.style.display = 'none';  // "none" display means "hide it"
}

// This function does the opposite of showLoadingSpinner: it hides the spinner and shows the quote, signaling that we're done loading.
function hideLoadingSpinner() {
    loader.style.display = 'none';  // Hide the spinner
    quoteContainer.style.display = 'block';  // Show the quote and author text
}

// This function handles tweeting out the quote when you click the Twitter button.
function tweetQuote() {
    const quote = quoteElement.textContent;  // Get the current quote text
    const author = authorElement.textContent;  // Get the current author name
    const tweetText = `${quote} - ${author}`;  // Create the text we want to tweet
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;  // Make a URL for tweeting
    window.open(tweetUrl, '_blank');  // Open a new window to send the tweet
}

// This is the function that talks to the AI to get a new quote when you press the "new quote" button.
async function getQuotes() {
    showLoadingSpinner();  // First, we show the spinner to say "wait, we're thinking!"
    const openaiApiKey = 'your api key'; // This is a secret key that lets us use the AI service - don't share it!

    // This is the location on the internet where we send our request for a new quote.
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    // This is what we're asking the AI - to give us a new, creative quote.
    const requestData = {
        model: 'gpt-3.5-turbo',  // We're specifying which AI brain to use.
        messages: [{  // We can send a series of messages, but we're just sending one.
            role: 'user',  // We're playing the role of the user.
            content: "Provide a random unknown new age spiritually motivating brief quote. Be creative with the topic technology and spirit with the author unknown or anonymous.  Don't repeat yourself or use the word 'realm'. Be sure to include the author as 'Unknown', 'Anon', 'Anonymous'",
        }],
        max_tokens: 60  // This is how long our quote can be, measured in tokens (kind of like words).
    };

    try {
        // Here's where we actually send our request to the AI service.
        const response = await fetch(endpoint, {
            method: 'POST',  // We're sending data, so we use POST.
            headers: {
                'Content-Type': 'application/json',  // We're sending JSON data.
                'Authorization': `Bearer ${openaiApiKey}`  // We have to include our secret key to get in.
            },
            body: JSON.stringify(requestData)  // Turn our requestData into JSON text to send it.
        });

        // If everything went well, we get a response which includes the AI's message.
        const apiResponse = await response.json();
        const textResponse = apiResponse.choices[0].message.content.trim();  // We clean up the response to just get the text.
        const quoteParts = textResponse.split(' - ');  // We expect the quote and author to be separated by " - "

        // We make sure we got both a quote and an author back from the AI.
        if (quoteParts.length === 2) {
            quoteElement.textContent = quoteParts[0];  // Set the new quote text on our webpage
            authorElement.textContent = quoteParts[1];  // Set the new author name on our webpage
        } else {
            // If something went wrong, we'll see an error message in our web browser's console.
            console.error('Unexpected quote format:', textResponse);
        }
    } catch (error) {
        // If something went wrong with the network or the AI service, we'll see an error message.
        console.error('Error fetching quote:', error);
    } finally {
        // Whether we got a new quote or not, we stop showing the spinner.
        hideLoadingSpinner();
    }
}

// Once the webpage has finished loading all the HTML, we set up our buttons to listen for clicks.
document.addEventListener('DOMContentLoaded', () => {
    twitterButton.addEventListener('click', tweetQuote);  // When the Twitter button is clicked, call tweetQuote.
    newQuoteButton.addEventListener('click', getQuotes);  // When the new quote button is clicked, call getQuotes.
});
