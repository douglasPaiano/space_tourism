window.addEventListener("resize",()=>{    
    
    startSequence();

    if (techNumber == 0) {
        setTimeout(() => {
            document.getElementById("tech__1").checked = true;
        }, 50);        
    } else if(techNumber == 1) {
        setTimeout(() => {
            document.getElementById("tech__2").checked = true;
        }, 50);    
    }else if(techNumber == 2 ) {
        setTimeout(() => {
            document.getElementById("tech__3").checked = true;
        }, 50);    
    }else{
        
    }    
})
addEventListener("load",()=>{
    startSequence();
    setTimeout(() => {
        document.getElementById("tech__1").checked = true;
    }, 500);
})

function startSequence() {
    start();
}
var techNumber = 0;


function start() {

    fetch('./data.json')
    .then(response => response.json())
    .then(data => {     
               
        showTech(data,techNumber);
        selectTech();        
    })
    .catch(error => {
        console.error('Erro ao ler o arquivo JSON:', error);
    });
}

function showTech(data,techNumber) {
    const tech = document.getElementById("technology")
    const resolution = window.outerWidth;
    var device = "";

    if (resolution <=425) {
        device = data.technology[techNumber].images.mobile
    } else if (resolution == 768) {
        device = data.technology[techNumber].images.tablet
    } else if (resolution == 1440){
        device = data.technology[techNumber].images.desktop
    }

    if (resolution != 1440) {
        tech.innerHTML = `
        <div class="tech__presentation">            
            <h1><span>03</span>Space launch 101</h1> 
            <img src="${device}" alt="Technology image">            
        </div>
        <div class="select__tech">
            <input type="checkbox" id="tech__1" name="1">
            <label for="tech__1">1</label>
            <input type="checkbox" id="tech__2" name="2">
            <label for="tech__2">2</label>
            <input type="checkbox" id="tech__3" name="3">
            <label for="tech__3">3</label>
        </div>
        <div class="tech__description">
            <h2>The terminology...</h2>
            <h1>${data.technology[techNumber].name}</h1>
            <p>${data.technology[techNumber].description}</p>
        </div>
    `
    const divTech = document.querySelector('.technology');
    divTech.style.display = '';

    } else if (resolution == 1440){
        tech.innerHTML = `
        <div class="tech__presentation">   
                <h1><span>03</span>Space launch 101</h1>            
        </div>
        <div class="img">
                <img src="${device}" alt="Technology image">
            </div> 
        <div class="select__tech">
            <input type="checkbox" id="tech__1" name="1">
            <label for="tech__1">1</label>
            <input type="checkbox" id="tech__2" name="2">
            <label for="tech__2">2</label>
            <input type="checkbox" id="tech__3" name="3">
            <label for="tech__3">3</label>
        </div>
        <div class="tech__description">
            <h2>The terminology...</h2>
            <h1>${data.technology[techNumber].name}</h1>
            <p>${data.technology[techNumber].description}</p>
        </div>
    `
    setTimeout(() => {
        applyGrid();
    }, 50);
    }
}

function selectTech() {
    const allBtn = document.querySelectorAll("input");

    allBtn.forEach(btn =>{
        btn.addEventListener("click",(Event)=>{
            if (Event.target.name == "1") {
                techNumber = 0
                setTimeout(() => {
                    document.getElementById("tech__1").checked = true;
                }, 10);        
            } else if(Event.target.name == "2") {
                techNumber = 1
                setTimeout(() => {
                    document.getElementById("tech__2").checked = true;
                }, 10);    
            }else if(Event.target.name == "3") {
                techNumber = 2
                setTimeout(() => {
                    document.getElementById("tech__3").checked = true;
                }, 10);    
            }else{
                
            }
            start();
        })
    })
}

function applyGrid() {
    const divTech = document.querySelector('.technology');
    const divPresentation = document.querySelector('.tech__presentation');
    const divSelect = document.querySelector('.select__tech');
    const divDescription = document.querySelector(".tech__description")
    const divImg = document.querySelector(".img")

    divTech.style.display = 'grid';
    divTech.style.gridTemplateColumns = '245px 550px 645px';
    divTech.style.gridTemplateRows = '110px 654px';
    divTech.style.gridTemplateAreas = '"presentation presentation img""select description img"';
    divPresentation.style.gridArea = 'presentation';
    divSelect.style.gridArea = 'select';
    divDescription.style.gridArea = 'description';
    divImg.style.gridArea = 'img';
}