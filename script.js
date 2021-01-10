
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];

let ready = false;
let imagesReady = 0;
let totalImages = 0;


// unsplash api
const count = 10;
const apiKey = 'DoHvc0Z7B0YFRgGrwI_wWkKtwqaB25DRHz4DWF4zoPY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images loaded 
function imageLoaded(){
    console.log('image loaded')
    imagesReady++;
    if (imagesReady === totalImages){
        ready = true;
        loader.hidden = true;

    }
}


// Helper function DRY method- do not repeat yourself
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// create elements for links and photos to add to DOM;
function displayPhotos(){
    imagesReady = 0;
    totalImages = photosArray.length;
    // run function for each object in photos array;
    photosArray.forEach((pic) => {
        // create <a> to link unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: pic.links.html,
            target: '_blank'
        })
        // item.setAttribute('href', pic.links.html);
        // item.setAttribute('target', '_blank');
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: pic.urls.regular,
            alt: pic.alt_description,
            title: pic.alt_description
        })
        // img.setAttribute('src', pic.urls.regular);
        // img.setAttribute('alt', pic.alt_description);
        // img.setAttribute('title', pic.alt_description);
        // put <img> inside <a>, then put both inside imageContainer elem.

        // Event listener , check if finished loading 
        img.addEventListener('load', imageLoaded); 
        item.appendChild(img);
        imageContainer.appendChild(item);
        });
}

// get photos
async function getPhotos(){
    try{
        const response = await fetch (apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error){
        console.log(error);
    }
}

// check to see if the scroll has reached near the bottom
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight- 1000 && ready){
        ready = false;
        getPhotos();
        console.log('loadMore')
    }
})

// on load
getPhotos();
