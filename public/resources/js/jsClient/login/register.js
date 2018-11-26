document.addEventListener("DOMContentLoaded", function(event) {
    button();

    
});

function button (){
    document.getElementById('submitButton').addEventListener('click',function(event){
        event.preventDefault();

        const registerForm      = document.querySelector('#registerForm');
        const getUser           = document.querySelector('#login__username');
        const getEmail          = document.querySelector('#email');
        const getName           = document.querySelector('#name');
        const getLastname       = document.querySelector('#lastname');
        const getImg            = document.querySelector('#file');
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
// IF SUCCESS ====================================
                if(result[0].user_username == 0 && getPassword01.value == getPassword02.value && getEmail.value != "" && getName.value != "" && getLastname.value != ""){
                    document.getElementById('passwordValid').innerHTML = "";                                        
                    document.getElementById('userValid').innerHTML = "";
                    success.classList.toggle("showSuccess")
                    form.classList.toggle('hide')
                    
                    setTimeout(function(){ 
                        registerForm.submit()
                    }, 2000);

// VALIDATING USER ==============================
                } if(result[0].user_username == 1) {
                    getUser.select()

                    document.getElementById('userValid').innerHTML = "User already exists"

                    if(getPassword01.value == getPassword02.value){
                        document.getElementById('passwordValid').innerHTML = "";                       
                    };

// VALIDATING PASSWORD ==============================
                } if(getPassword01.value != getPassword02.value){
                    document.getElementById('passwordValid').innerHTML = "Password are not the same";

                    if(result[0].user_username == 0){
                        document.getElementById('userValid').innerHTML = "";  
                    }   
// VALIDATING EMAIL ==============================
                } if(getEmail.value == ""){
                    document.getElementById('email_valid').innerHTML = "Inser Email";

                    if(getEmail.value != ""){
                        document.getElementById('email_valid').innerHTML = "";  
                    } 
// VALIDATING NAME ==============================
                } if(getName.value == ""){
                    document.getElementById('name_valid').innerHTML = "Insert Name";

                    if(getName.value != ""){
                        document.getElementById('name_valid').innerHTML = "";  
                    } 
                } if(getLastname.value == ""){
                    document.getElementById('lastname_valid').innerHTML = "Insert Lastname";

                    if(getLastname.value != ""){
                        document.getElementById('lastname_valid').innerHTML = "";  
                    } 
                }
                
            })
        });
}