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
        const getUser           = document.querySelector('#login__username');
        const validUserDiv      = document.querySelector('#userValid');
        const success           = document.querySelector('.rigistrationSuccess');
        const form              = document.querySelector('.card-container');
        const validPasswordDiv  = document.querySelector('#passwordValid');
        
        const url = '/register/find/'+getUser.value;

        fetch (url)
            .then(function(response){
                return response.json();
            }).then(function(result){
// ACCEPTED =================
                if(result[0].user_username == 1){
                    document.getElementById('userValid').innerHTML = "";

                    success.classList.toggle("showSuccess")
                    form.classList.toggle('hide')
                    
                    setTimeout(function(){ 
                        registerForm.submit()
                    }, 1000);
// VALIDATE USER ===============
                } if(result[0].username == 0) {
                    getUser.select()
                    document.getElementById('userValid').innerHTML = "Wrong User Name";                    

                }
            })
        });
}