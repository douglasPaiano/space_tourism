var state = ["noActive","noActive","noActive","noActive"]

addEventListener("load",()=>{
    selectState();  

    const menuBtn = document.getElementById("menu__btn");
        
    menuBtn.addEventListener("click",()=>{
        if (menuBtn != null) {
            openMenu();
        } else {
        }
        
    })      
})

function openMenu() {
    const elementosMenu = document.getElementById("menu") 
    
    elementosMenu.style.left = "33vw";
}

setTimeout(() => {
    const fecharMenu = document.getElementById("close__menu").addEventListener("click", function () {
        const elementosMenu = document.getElementById("menu") 
        
        elementosMenu.style.left = "600px"
        })
}, 1000);




function showMenu(state) {
    const menu = document.getElementById("home")
    
    menu.innerHTML = `
    <div class="header">
      <a class="logo" id="logo__id" href="./index.html"></a>
      <button class="menu__btn" id="menu__btn"></button>
    </div>
    <div class="menu__on" id="menu">
      <button class="close__menu" id="close__menu"></button>
      <h4></h4>
      <h1 id="menu__option" class="disabledMenu ${state[0]}"><span>00</span> <a href="./index.html">Home</a></h1>
      <h1 id="menu__option" class="disabledMenu ${state[1]}"><span>01</span> <a href="./destination.html">Destination</a></h1>
      <h1 id="menu__option" class="disabledMenu ${state[2]}"><span>02</span> <a href="./crew.html">Crew</a></h1>
      <h1 id="menu__option" class="disabledMenu ${state[3]}"><span>03</span> <a href="./technology.html">Technology</a></h1>     
    </div>
    `
}

function selectState() {
    var filename = window.location.pathname.split('/').pop();
    if (filename == "index.html") {
        state = ["active","noActive","noActive","noActive"]
    } else if (filename == "destination.html") {
        state = ["noActive","active","noActive","noActive"]
    } else if (filename == "crew.html") {
        state = ["noActive","noActive","active","noActive"]
    } else if (filename == "technology.html") {
        state = ["noActive","noActive","noActive","active"]
    }
    showMenu(state) 
}