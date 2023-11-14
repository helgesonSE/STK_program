let showArray = getData();
const submitShowButton = document.getElementById("submitShow")
const innerWindows = document.getElementsByClassName("innerWindow");
const sideButtons = document.getElementsByClassName("menuButton");
const homeButton = document.getElementById("homeButton");
const searchText = document.getElementById("searchShowInput");
const addShowInput = {
    title: document.getElementById("showName"),
    genre: document.getElementById("showGenre"),
    rating: document.getElementById("showRating"),
    description: document.getElementById("showDescription")
};

onLoad();

function onLoad() {
    for (const show of showArray) {
        createElement(show);
    }
    eventSetup();
    setInnerView("home");    
}

function eventSetup(){
    submitShowButton.addEventListener("click", addShow);
    searchText.addEventListener("input", displayMatchingShows);
    homeButton.addEventListener("click", function(){
        setInnerView("home");
    });
    for (const button of sideButtons) {
        button.addEventListener("click", function(){
            setInnerView(button.id.slice(0, -6));
        })
    }
}

function setInnerView (button) {
    for (const window of innerWindows) {
        window.style.display = "none"
    }
    if (window.id = "listShow"){
        for (const entry of showArray){
            entry.elemItem.style.display = "block";
        }
    }
    document.getElementById(button).style.display = "block";
}

function addShow (){
    showArray.push({
        title:addShowInput.title.value, 
        genre:addShowInput.genre.value,
        rating:addShowInput.rating.value, 
        description:addShowInput.description.value,
        elemItem:''});
    createElement(showArray.lastIndexOf);
    saveData();
}
    
function saveData () {
    let savedShows = showArray ? showArray : []; //om det finns data sedan innan, konvertera från JSON till objekt, annars skapa en tom array.
    localStorage.setItem('savedData', JSON.stringify(savedShows));//gör om data till sträng, spara i local
}

function getData () {
    let savedShows = localStorage.getItem('savedData');
    savedShows = JSON.parse(savedShows);
    return savedShows ? savedShows : [];
}

function displayMatchingShows () {
    document.getElementById("listShow").style.display = "block";
    for (const entry of showArray) {
        let title = entry.title.toUpperCase();
        let res = title.search(searchText.value.toUpperCase());
        entry.elemItem.style.display = res >= 0 ? "block" : "none";
    }
}

function createElement (entry) {
    var templateDiv = document.getElementById("listTemplate");
    var newShowElement = templateDiv.cloneNode(true);
    newShowElement.querySelector("#title").textContent = entry.title;
    newShowElement.querySelector("#genre").textContent = entry.genre;
    newShowElement.querySelector("#rating").textContent = entry.rating;
    newShowElement.querySelector("#description").textContent = entry.description;
    document.getElementById("listShow").appendChild(newShowElement);
    newShowElement.querySelector("#deleteButton").addEventListener("click", function(){
        deleteShow(entry);
    });
    entry.elemItem = newShowElement;
}

function deleteShow(entry) {
    const index = showArray.indexOf(entry);
  
    if (index !== -1) {
      showArray.splice(index, 1);
      entry.elemItem.remove();
      saveData();
    }
  }