const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const TwitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


// Get Quote from API
async function getQuote() {
    const proxyUrl = 'https://proxy.cors.sh/';
    const apiUrl = "https://api.api-ninjas.com/v1/quotes?category=happiness";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
            
        //if author is blank add unknown
            if (data.quoteAuthor === '') {
                authorText.innerText = 'Unknown';
            } else {
                    authorText.innerText = data.quoteAuthor;  
                }
        //reduce font size for long quotes
            if (data.quoteText.length > 120) {
                quoteText.classList.add('long-quote');
            } else {
                quoteText.classList.remove('long-quote');
                }
            quoteText.innerText = data.quoteText;
        
        } catch (error) {
        getQuote(); 
        
    }
}

//twitter function
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', getQuote); 
TwitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote()