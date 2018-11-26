(function(){
    burger();
  })();
  

// ************************************************ BURGER MENNU *********************************************************

function burger (){
    var burger = document.querySelector('#burger')
    var nav = document.querySelector('nav')
    burger.addEventListener("click", function(){
        console.log('burger læst')
        nav.classList.toggle("show")
    })
  }