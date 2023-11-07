// Image load check
function imageLoaded() {
    imagesLoaded++;
    // console.log(imagesLoaded);
    console.log('true');
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

//Helper function to Set Attributes on Dom Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Global variable
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Create elements for links and photos, Add it to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    //run function for each object in photosArray
    photosArray.forEach((photo) => {
    //create <a> to link to Unsplash
    const item = document.createElement('a');
    
    setAttributes(item, {
        href: photo.links.html, 
        target: '_blank',

    });

    //Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });
    //Event Listener to check when each photo has finished loading
    img.addEventListener('load', imageLoaded);
    //Put <img> inside <a>, then put both inside the image container 
    item.appendChild(img);
    imageContainer.appendChild(item);
    }); 
}
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
 
// Unsplash Api
const count = 30;
const apiKey = 'your-api-key';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash Api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(data);
    } catch (error){
        //catch error here
    }
}
// check to see if scrolling near bottom of page, Load More photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
     {
        ready = false; 
        getPhotos();
        console.log('scrolled!');
    }
});
//on load
getPhotos();

