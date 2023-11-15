/* Vi börjar med att ta fram de variabler och element som behövs.*/
let showArray = getData();  //showArray är var datan ligger medan vi arbetar med den. getData hämtar från local storage.
const innerWindows = document.getElementsByClassName("innerWindow");    //Alla olika fönster i innerContent.
const navButtons = document.getElementsByClassName("navButton");        //Navigationsknappar.
const searchText = document.getElementById("searchShowInput");          //Testrutan för sökningar.
const noResult = document.getElementById("noResultDisplay");            //Indikerar om sökningen fick fram något eller ej.
const inputForm = document.getElementById("addShowForm");               //Formulär för inmatning. Ger tillgång till input däri.

onLoad();   

function onLoad() { //Bäddar sidan som vi vill ha den.
    for (const show of showArray) { //Skapar alla element från vår lista.
        createElement(show);
    }
    eventSetup();                   //Tilldelar eventlisteners.
    setInnerView("home");           //gömmar alla innerfönster utom home.
}

function eventSetup(){  //Skapar listeners.
    searchText.addEventListener("input", displayMatchingShows); //Vid tangenttryck.
    inputForm.submit.addEventListener("click", addShow);        //Submit. Eftersom det är en knapp reagerar den på enter-slag. 
    for (const button of navButtons) {                  //Navigationsknapparna. De ska lyssna både efter click och enter-slag.
        button.addEventListener("click", function(){
            this.blur();
            setInnerView(button.id.slice(0, -6));       //Drar bort "button" från knappens namn, blir då samma som elementets namn.
        })
        button.addEventListener("keypress", function (event) {
            this.blur();    //Tar bort focus från knappen.
            if (event.key === "Enter") {                //Lyssnar efter enter-slag.
                setInnerView(button.id.slice(0, -6));
            }
        });
    }
}

function setInnerView (button) {        //Justerar synlighet på innerWindows-elementen och deras children.
    for (const window of innerWindows) {
        window.style.display = button == window.id ? "block" : "none"; //Fönstret vi kallat på görs synligt, andra döljs.
    }
    if (button === "listShow"){         //På programlistan vill vi ha alla tillhörande element (med programmen) synliga.
        for (const entry of showArray){
            entry.elemItem.style.display = "block";
        }
    }
}

function addShow (){    //Skapar ett nytt objekt utifrån input som gavs i våran form.
    let title = inputForm.showName.value;   
    if (title.trim() != "") {   //Titel är obligatorisk. Är det tomt skapas inget objekt.
        showArray.push({        //Lägger till objektet till vår array av program.
            title:inputForm.showName.value,
            genre:inputForm.genre.value,
            rating:inputForm.rating.value,
            description:inputForm.description.value,
            elemItem:''});                      //Får sedan en referens till html-elementet som hör till. För att enkelt kunna ta bort elementet.
        createElement(showArray.lastIndexOf);   //Tillhörande html-element skapas.
        saveData();                             //Datan sparas.
    }
}
    
function saveData () {  //Sparar programmen från showArray till local storage.
    let savedShows = showArray ? showArray : [];    //Kollar att showArray faktiskt finns, annars skapar vi en ny.
    localStorage.setItem('savedData', JSON.stringify(savedShows));  //Innehållet görs om till den sträng som sedan går in i local storage.
}

function getData () {   //Hämtar data från local storage. Returneras in i showArray. 
    let savedShows = localStorage.getItem('savedData');
    savedShows = JSON.parse(savedShows);
    return savedShows ? savedShows : [];    //Fanns inget i local storage returnerar vi en ny, tom array.
}

function displayMatchingShows () {  //Sökfunktionen. Den körs varje tangentslag. Matchande html-dokument synliggörs via display. 
    let foundShow = false;  //Håller reda på om sökningen hittat något.
    for (const entry of showArray) {
        let title = entry.title.toUpperCase();  //likställer gemener och versaler i sökningen.
        let result = title.search(searchText.value.toUpperCase());
        if (result >= 0) {                              //Ej matchande termer ger -1 som värde.
            entry.elemItem.style.display = "block";     
            foundShow = true;                           //Uppdaterar boolen.
        }
        else{
            entry.elemItem.style.display = "none";
        }
    }
    if (foundShow) {
        document.getElementById("listShow").style.display = "block";    //För att visa resultatet kopplar vi på fönstret som visar programmen.
        noResult.textContent = "";
    }
    else {
        noResult.textContent = "No matching title found";   //Informerar användaren om att inget hittats.
    }
}

function createElement (entry) {    //Skapar ett nytt html-dokumnet utifrån en template.
    var templateDiv = document.getElementById("listTemplate");  //Vår template.
    var newShowElement = templateDiv.cloneNode(true);           //Skapar kopia, den fylls med värden från den aktuella objektet.
    newShowElement.querySelector("#title").textContent = entry.title;
    newShowElement.querySelector("#genre").textContent = entry.genre;
    newShowElement.querySelector("#rating").textContent = entry.rating;
    newShowElement.querySelector("#description").textContent = entry.description;
    document.getElementById("listShow").appendChild(newShowElement);
    newShowElement.querySelector("#deleteButton").addEventListener("click", function(){ //Gör så att knappen kallar på just sitt objekt (entry).
        deleteShow(entry);
    });
    entry.elemItem = newShowElement; //En referens till elementet läggs till det motsvarande objektet.
}

function deleteShow(entry) {    //Tar bort objektet från showArray och även dess tillhörande html-dokument.
    const index = showArray.indexOf(entry); //Hittar index på objektet i showArray. -1 ges vid ingen match.
    if (index !== -1) {             //Kollar att en match kunde finnas.
        entry.elemItem.remove();    //Tar bort elementet via referensen som fanns i objektet.
        showArray.splice(index, 1); //Tar bort indexet med innehåll från showArray.
        saveData();                 //Spara den modifierade showArray till local storage.
    }
  }