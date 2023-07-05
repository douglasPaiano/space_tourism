window.addEventListener("resize", () =>{        
    startSequence();
    if (crewNumber == 0) {
        setTimeout(() => {
            document.getElementById("select__btn1").checked = true;
        }, 100);  
    } else if(crewNumber == 1){
        setTimeout(() => {
            document.getElementById("select__btn2").checked = true;
        }, 100);  
    } else if(crewNumber == 2){
        setTimeout(() => {
            document.getElementById("select__btn3").checked = true;
        }, 100);  
    } else if(crewNumber == 3){
        setTimeout(() => {
            document.getElementById("select__btn4").checked = true;
        }, 100);  
    }
});

addEventListener("load",()=>{
    startSequence();
    setTimeout(() => {
        document.getElementById("select__btn1").checked = true;
    }, 500);
})

function startSequence() {
    start();    
    selectCrew();
}
var crewNumber = 0;

function showCrew(data,crewNumber) {
    const crew = document.getElementById("crew");
    const resolution = window.outerWidth;
    var device = "";

    if (resolution <=425) {
        device = data.crew[crewNumber].images.mobile
    } else if (resolution == 768) {
        device = data.crew[crewNumber].images.tablet
    } else if (resolution == 1440){
        device = data.crew[crewNumber].images.desktop
    }
    
    if (resolution <= 425) {
        crew.innerHTML = `
    <div class="crew__presentation">
        <h1><span>02</span>Meet your crew</h1>
        <img src="${device}" alt="Crew image" srcset="">
    </div>
    <div class="select__crew"> 
        <input type="checkbox" id="select__btn1" name="douglas"></input>
        <label for="select__btn1"></label>
        <input type="checkbox" id="select__btn2" name="mark"></input>
        <label for="select__btn2"></label> 
        <input type="checkbox" id="select__btn3" name="victor"></input>
        <label for="select__btn3"></label> 
        <input type="checkbox" id="select__btn4" name="anousheh"></input>
        <label for="select__btn4"></input></label>    
    </div>
    <div class="crew__description">
        <h2>${data.crew[crewNumber].role}</h2>
        <h1>${data.crew[crewNumber].name}</h1>
        <p>${data.crew[crewNumber].bio}</p>
    </div>`
    const divCrew = document.querySelector('.crew');
    divCrew.style.display = '';
    } else if(resolution >= 376) {
        crew.innerHTML = `
    <div class="crew__presentation">
        <h1><span>02</span>Meet your crew</h1>        
    </div>
    <div class="crew__description">
        <h2>${data.crew[crewNumber].role}</h2>
        <h1>${data.crew[crewNumber].name}</h1>
        <p>${data.crew[crewNumber].bio}</p>
    </div>
    <div class="select__crew"> 
        <input type="checkbox" id="select__btn1" name="douglas"></input>
        <label for="select__btn1"></label>
        <input type="checkbox" id="select__btn2" name="mark"></input>
        <label for="select__btn2"></label> 
        <input type="checkbox" id="select__btn3" name="victor"></input>
        <label for="select__btn3"></label> 
        <input type="checkbox" id="select__btn4" name="anousheh"></input>
        <label for="select__btn4"></input></label>    
    </div>
    <div class="crew__presentation-img">
        <img src="${device}" alt="Crew image" srcset="">
    </div>`

    const divCrew = document.querySelector('.crew');
    divCrew.style.display = '';
    } 

    if (resolution == 1440) {        
        applyGrid();
    }
}

function selectCrew() {
    const allBtn = document.querySelectorAll("input")    

allBtn.forEach(btn =>{
    btn.addEventListener("click",(Event)=>{ 
        if (Event.target.name == "douglas") {
            crewNumber = 0;
            setTimeout(() => {
                document.getElementById("select__btn1").checked = true;
            }, 10);            
        }else if (Event.target.name == "mark") {
            crewNumber = 1;
            setTimeout(() => {
                document.getElementById("select__btn2").checked = true;
            }, 10); 
        }else if (Event.target.name == "victor") {
            crewNumber = 2;
            setTimeout(() => {
                document.getElementById("select__btn3").checked = true;
            }, 10); 
        }else if (Event.target.name == "anousheh") {
            crewNumber = 3;
            setTimeout(() => {
                document.getElementById("select__btn4").checked = true;
            }, 10); 
        }else{

        }
        start()
    })
})
}

function start() {

    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        showCrew(data,crewNumber);
        selectCrew(); 
    })
    .catch(error => {
        console.error('Erro ao ler o arquivo JSON:', error);
    });
}

function applyGrid() {
    const divCrew = document.querySelector('.crew');
    const divPresentation = document.querySelector('.crew__presentation');
    const divSelect = document.querySelector('.select__crew');
    const divDescription = document.querySelector(".crew__description")
    const divImg = document.querySelector(".crew__presentation-img")

    divCrew.style.display = 'grid';
    divCrew.style.gridTemplateColumns = '1fr 1fr';
    divCrew.style.gridTemplateRows = '110px 425px 229px';
    divCrew.style.gridTemplateAreas = '"presentation img""description img""select img"';
    divPresentation.style.gridArea = 'presentation';
    divSelect.style.gridArea = 'select  ';
    divDescription.style.gridArea = 'description';
    divImg.style.gridArea = 'img';
}