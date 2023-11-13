let showArray = getData();
let searchArray = [];
const submitShowButton = document.getElementById("submitShow")
const innerWindows = document.getElementsByClassName("innerWindow");
const mainButtons = document.getElementsByClassName("menuButton");
const searchShowInput = document.getElementById("searchShowInput");
const addShowInput = {
    title: document.getElementById("showName"),
    genre: document.getElementById("showGenre"),
    rating: document.getElementById("showRating"),
    description: document.getElementById("showDescription")
};
submitShowButton.addEventListener("click", addShow);
searchShowInput.addEventListener("keydown", searchShow);
for (const button of mainButtons) {
    button.addEventListener("click", function(){
        setView(button.id.slice(0, -6));
    })
}
//setView("splash");

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

function searchShow() {
    document.getElementById("listShow").style.display = "block";
    for (const entry of showArray) {
        let res = entry.title.search(searchShowInput.value);
        if (res < 0) {
            continue;
        }
        searchArray.push(entry);
    }
    console.log(searchArray);
    updateSearch();
}

function updateSearch () {
    var templateDiv = document.getElementById("template");
    console.log(searchArray);
    // De här måste rensas bort mellan varje sökning. För "tungt"? 
    for (const entry of searchArray) {
        var newShowElement = templateDiv.cloneNode(true);
        newShowElement.querySelector("h2").textContent = entry.title;
        newShowElement.querySelector("genre").textContent = entry.genre;
        newShowElement.querySelector("rating").textContent = entry.rating;
        newShowElement.querySelector("p").textContent = entry.description;
        document.getElementById("listShow").appendChild(newShowElement);
}
}
