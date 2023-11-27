// Grab elements from the DOM and assign them to variables for use later.
const imageContainer = document.getElementById('image-container'); // Container for images
const loader = document.getElementById('loader'); // Loader element (usually a spinner)

// Initialize state variables.
let ready = false; // Flag to track if we are ready to load more images
let imagesLoaded = 0; // Counter for loaded images
let totalImages = 0; // Total number of images we're attempting to load
let photosArray = []; // Array to hold the photos from the API

// Unsplash API configuration.
const count = 30; // Number of photos to load per request
const apiKey = 'api-key'; // Your API key for Unsplash API; replace with your own key
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; // API URL with parameters

// Function to be called when an image has finished loading.
function imageLoaded() {
    imagesLoaded++; // Increment the number of images loaded
    // Check if all images have finished loading
    if (imagesLoaded === totalImages) {
        ready = true; // Set ready flag to true, allowing more images to be requested
        loader.hidden = true; // Hide the loader element as loading is complete
    }
}

// Helper function to set attributes on DOM elements.
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]); // Set each attribute on the element
    }
}

// Function to create elements for links & photos, add to DOM.
function displayPhotos() {
    imagesLoaded = 0; // Reset image loaded counter
    totalImages = photosArray.length; // Update total images with the length of the photosArray
    
    // Loop over each photo object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to full photo on Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html, 
            target: '_blank',
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    }); 
}

// Async function to get photos from Unsplash API.
async function getPhotos() {
    try {
        // Await the fetch request to the API URL and store the response.
        const response = await fetch(apiUrl);
        // Parse the response into JSON and assign to photosArray
        photosArray = await response.json();
        // Call function to display photos on the page
        displayPhotos();
    } catch (error){
        // Catch and log any errors
        // TODO: handle the error more gracefully in production code
    }
}

// Event listener for scrolling to bottom of page, to load more photos.
window.addEventListener('scroll', () => {
    // Check if the page is scrolled near the bottom and if we're ready to load more photos
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; // Reset ready flag
        getPhotos(); // Call function to get more photos
    }
});

// On load, get initial photos.
getPhotos(); // Initial call to getPhotos function

