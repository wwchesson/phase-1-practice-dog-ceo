let breeds = [];

document.addEventListener('DOMContentLoaded', () => {
    getDogs();
    getBreeds();
    getLetter();
});

function getDogs () {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(res => res.json())
    .then (dogData => {
        dogData.message.forEach(image => renderDogImage(image))
    });
}

function renderDogImage (dogPic) {
    let dogContainer = document.querySelector("#dog-image-container");
    let newImage = document.createElement('img');
    newImage.src = dogPic;
    dogContainer.appendChild(newImage);

}

function getBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(res => res.json())
    .then(breedData => {
        breeds = Object.keys(breedData.message)
        breeds.forEach(breed => loadBreedData(breed))
    });
}


function loadBreedData (breed) {
     let breedId = document.querySelector("#dog-breeds")
     let newBreed = document.createElement('li')
     newBreed.className = "dogName"
     newBreed.innerText = breed;
     newBreed.style.cursor = 'pointer';
     breedId.appendChild(newBreed)
     newBreed.addEventListener('click', newColor)
}

function newColor(event) {
    event.target.style.color = 'red';
} 

function getLetter () {
    const dropDown = document.querySelector("#breed-dropdown")
    let newBreed = document.createElement('li')
    dropDown.addEventListener("change", (event) => {
        let dropLetter = event.target.value
        let getLi = document.querySelectorAll("li.dogName")
    
        let breedFilter = breeds.filter(breed => breed.startsWith(dropLetter))
        getLi.forEach(breed => breed.remove())
        breedFilter.forEach(breed => loadBreedData(breed))
    })
}