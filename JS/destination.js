window.addEventListener("resize",()=>{
    start();
    if (planetNumber == 0) {        
        state = ["active","noActive","noActive","noActive"]
    } else if (planetNumber == 1){        
        state = ["noActive","active","noActive","noActive"]
    } else if (planetNumber == 2){        
        state = ["noActive","noActive","active","noActive"]
    } else if(planetNumber == 3){        
        state = ["noActive","noActive","noActive","active"]
    } else{
        alert("erro")
    }
})

addEventListener("load",()=>{
    start();
    state = ["active","noActive","noActive","noActive"]
})
    
var planetNumber = 0;
var state = ["","","",""]

function start() {
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        showDestination(data,planetNumber,state);
        selectDestinations();        
    })
    .catch(error => {
        console.error('Erro ao ler o arquivo JSON:', error);
    });
}

function showDestination(data,planetNumber,state) {
    const divInsert = document.getElementById("destination");
    var resolution = window.outerWidth;
    var device = "";

    if (resolution <=425) {
        device = data.destinations[planetNumber].images.mobile;
    } else if (resolution == 768) {
        device = data.destinations[planetNumber].images.tablet;
    } else if (resolution >=1440) {
        device = data.destinations[planetNumber].images.desktop;
    } else{
    }
    divInsert.innerHTML = `
    <div class="destination__png">
        <h1><span>01</span>Pick your destination</h1>
        <img src="${device}" alt="Destination image" srcset="">
    </div>
    <div class="select__planet" id="select__planet-id">
        <label class="disabled ${state[0]}" for="moon"><input type="checkbox" name="moon" id="checkbox moon">moon</label>
        <label class="disabled ${state[1]}" for="mars"><input type="checkbox" name="mars" id="checkbox mars">mars</label>
        <label class="disabled ${state[2]}" for="europa"><input type="checkbox" name="europa" id="checkbox europa">europa</label>
        <label class="disabled ${state[3]}" for="titan"><input type="checkbox" name="titan" id="checkbox titan">titan</label>
    </div>
    <div class="destination__description" id="destination__description-id">
        <h1>${data.destinations[planetNumber].name}</h1>
        <p>${data.destinations[planetNumber].description}
        </p>
    </div>
    <div class="destination__info" id="destination__info-id">
        <div>    
            <h2>Avg. Distance</h2>
            <h1>${data.destinations[planetNumber].distance}</h1>
        </div>
        <div>
            <h2>Est. Travel Time</h2>
            <h1>${data.destinations[planetNumber].travel}</h1>
        </div>
    </div>`

    if (resolution == 1440) {
        setTimeout(() => {
            applyGrid();
        }, 1);
    } else{
        const divDestination = document.querySelector('.destination');
        divDestination.style.display = '';
    }
}

function selectDestinations() {
    const allLi = document.querySelectorAll("label");

    allLi.forEach(li => {    
        li.addEventListener("click", function alt(Event) { 
            if (Event.target.textContent == "moon") {
                planetNumber = 0;
                state = ["active","noActive","noActive","noActive"]
            } else if (Event.target.textContent == "mars"){
                planetNumber = 1;
                state = ["noActive","active","noActive","noActive"]
            } else if (Event.target.textContent == "europa"){
                planetNumber = 2;
                state = ["noActive","noActive","active","noActive"]
            } else if(Event.target.textContent == "titan"){
                planetNumber = 3
                state = ["noActive","noActive","noActive","active"]
            } else{
                alert("erro")
            }
            start(planetNumber,state)
    }) 
})  
}

function applyGrid() {
    const divDestination = document.querySelector('.destination');
    const divImg = document.querySelector('.destination__png');
    const divSelect = document.querySelector('.select__planet');
    const divDescription = document.querySelector(".destination__description");
    const divInfo = document.querySelector(".destination__info");

    divDestination.style.display = 'grid';
    divDestination.style.gridTemplateColumns = '1fr 1fr';
    divDestination.style.gridTemplateRows = '208px 348px 89px';
    divDestination.style.gridTemplateAreas = '"destination select""destination description""destination info"';
    divImg.style.gridArea = 'destination';
    divSelect.style.gridArea = 'select';
    divDescription.style.gridArea = 'description';
    divInfo.style.gridArea = 'info';
}