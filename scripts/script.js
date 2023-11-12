let showList = [];
let searchList = [];
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

function addShow(){
    showList.push({
        title:addShowInput.title.value, 
        genre:addShowInput.genre.value,
        rating:addShowInput.rating.value, 
        description:addShowInput.description.value});
}







showList.push({title:"Låtsatstitel", genre:"Humor", rating:"Barnförbjuden", 
    description:"Handlar om folk som äter frukost"});
showList.push({title:"Låtsatstitel2", genre:"Drama", rating:"Barntillåten", 
    description:"Handlar om folk som äter middag"});

var templateDiv = document.getElementById("template");

var newShowElement = templateDiv.cloneNode(true);

newShowElement.querySelector("h2").textContent = showList[0].title;
newShowElement.querySelector("genre").textContent = showList[0].genre;
newShowElement.querySelector("rating").textContent = showList[0].rating;
newShowElement.querySelector("p").textContent = showList[0].description;

document.getElementById("listShow").appendChild(newShowElement);

var newShowElement = templateDiv.cloneNode(true);

newShowElement.querySelector("h2").textContent = showList[1].title;
newShowElement.querySelector("genre").textContent = showList[1].genre;
newShowElement.querySelector("rating").textContent = showList[1].rating;
newShowElement.querySelector("p").textContent = showList[1].description;

document.getElementById("listShow").appendChild(newShowElement);