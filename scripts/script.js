let showArray = getData();
let searchArray = [];
const submitShowButton = document.getElementById("submitShow")
submitShowButton.addEventListener("click", addShow);
const addShowInput = {
    title: document.getElementById("showName"),
    genre: document.getElementById("showGenre"),
    rating: document.getElementById("showRating"),
    description: document.getElementById("showDescription")
};
const innerWindows = document.getElementsByClassName("innerWindow");
const mainButtons = document.getElementsByClassName("menuButton");
for (const button of mainButtons) {
    button.addEventListener("click", function(){
        setView(button.id.slice(0, -6));
    })
}

function setView (button) {
    for (const window of innerWindows) {
        window.style.display = "none"
    }
    document.getElementById(button).style.display = "block";
}

function addShow (){
    showArray.push({
        title:addShowInput.title.value, 
        genre:addShowInput.genre.value,
        rating:addShowInput.rating.value, 
        description:addShowInput.description.value});
        saveData();
    }
    
function saveData () {
    console.log(showArray);
    let savedShows = getData();
    savedShows = showArray ? showArray : []; //om det finns data sedan innan, konvertera från JSON till objekt, annars skapa en tom array.
    console.log(savedShows);
    localStorage.setItem('savedData', JSON.stringify(savedShows));//gör om data till sträng, spara i local
}

function getData () {
    let savedShows = localStorage.getItem('savedData');
    savedShows = JSON.parse(savedShows);
    console.log(savedShows);
    return savedShows ? savedShows : [];
}







showArray.push({title:"Låtsatstitel", genre:"Humor", rating:"Barnförbjuden", 
    description:"Handlar om folk som äter frukost"});
showArray.push({title:"Låtsatstitel2", genre:"Drama", rating:"Barntillåten", 
    description:"Handlar om folk som äter middag"});

var templateDiv = document.getElementById("template");

var newShowElement = templateDiv.cloneNode(true);

newShowElement.querySelector("h2").textContent = showArray[0].title;
newShowElement.querySelector("genre").textContent = showArray[0].genre;
newShowElement.querySelector("rating").textContent = showArray[0].rating;
newShowElement.querySelector("p").textContent = showArray[0].description;

document.getElementById("listShow").appendChild(newShowElement);

var newShowElement = templateDiv.cloneNode(true);

newShowElement.querySelector("h2").textContent = showArray[1].title;
newShowElement.querySelector("genre").textContent = showArray[1].genre;
newShowElement.querySelector("rating").textContent = showArray[1].rating;
newShowElement.querySelector("p").textContent = showArray[1].description;

document.getElementById("listShow").appendChild(newShowElement);