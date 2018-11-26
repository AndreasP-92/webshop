document.addEventListener("DOMContentLoaded", function(event) {
    button();

    
});

function button (){
    document.getElementById('submitButton').addEventListener('click',function(event){
        event.preventDefault();

        const registerForm      = document.querySelector('#registerForm');
        const getUser           = document.querySelector('#login__username');
        const validUserDiv      = document.querySelector('#userValid');
        const getPassword01     = document.querySelector('#password01');
        const getPassword02     = document.querySelector('#password02');
        const validPasswordDiv  = document.querySelector('#passwordValid');
        const success           = document.querySelector('.rigistrationSuccess');
        const form              = document.querySelector('.card-container');
        

        const url = '/register/find/'+getUser.value;

        fetch (url)
            .then(function(response){
                return response.json();
            }).then(function(result){
                console.log(result)
// IF SUCCESS ====================================
                if(result[0].username == 0 && getPassword01.value == getPassword02.value){
                    document.getElementById('passwordValid').innerHTML = "";                                        
                    document.getElementById('userValid').innerHTML = "";
                    success.classList.toggle("showSuccess")
                    form.classList.toggle('hide')
                    
                    setTimeout(function(){ 
                        registerForm.submit()
                    }, 2000);
                                        

// VALIDATING USER ==============================
                } if(result[0].username == 1) {
                    getUser.select()

                    document.getElementById('userValid').innerHTML = "User Already Exist"

                    if(getPassword01.value == getPassword02.value){
                        document.getElementById('passwordValid').innerHTML = "";                       
                    };

// VALIDATING PASSWORD ==============================
                } if(getPassword01.value != getPassword02.value){
                    document.getElementById('passwordValid').innerHTML = "Password has to be Identical";

                    if(result[0].username == 0){
                        document.getElementById('userValid').innerHTML = "";  
                    }           
                }
            })
        });
}