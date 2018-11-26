document.addEventListener("DOMContentLoaded", function(event) {
    button();
    // const success           = document.querySelector('.rigistrationSuccess');
    // const form              = document.querySelector('.card-container');

    // success.classList.toggle("showSuccess")
    // form.classList.toggle('hide')
});

function button (){
    document.getElementById('submitButton').addEventListener('click',function(event){
        event.preventDefault();

        const registerForm      = document.querySelector('#registerForm');
        const getPassword01     = document.querySelector('#password01');
        const getPassword02     = document.querySelector('#password02');
        const success           = document.querySelector('.rigistrationSuccess');
        const form              = document.querySelector('.card-container');

        if(getPassword01.value != getPassword02.value){
            document.getElementById('passwordValid').innerHTML = "<p style='color:red;'>Password are not identical</p>";
        }
// VALIDATE PASSWORD ============
        if(getPassword01.value == getPassword02.value){
            document.getElementById('passwordValid').innerHTML = "";  
            success.classList.toggle("showSuccess")
            form.classList.toggle('hide')
            
            setTimeout(function(){ 
                registerForm.submit()
            }, 1000);
        }

        });
    // document.querySelector()
}