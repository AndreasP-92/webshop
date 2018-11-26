document.addEventListener("DOMContentLoaded", function(event) {
    button();
});

function button (){
    document.getElementById('submitButton').addEventListener('click',function(event){
        event.preventDefault();

        const registerForm      = document.querySelector('#registerForm');
        const getEmail          = document.querySelector('#login__username');
        const validUserDiv      = document.querySelector('#userValid');
        const success           = document.querySelector('.rigistrationSuccess');
        const form              = document.querySelector('.card-container');
        const validPasswordDiv  = document.querySelector('#passwordValid');
        document.getElementById('userValid').innerHTML = "";
 
        const url = '/forgot/find/'+getEmail.value;

        fetch (url)
            .then(function(response){
                return response.json();
            }).then(function(result){
// ON SUCCESS ============
                if(result[0].profile_mail == 1){
                    success.classList.toggle("showSuccess")
                    form.classList.toggle('hide')

                    setTimeout(function(){ 
                        registerForm.submit()
                    }, 1500);
// VALIDATE MAIL ============
                } if(result[0].profile_mail == 0) {
                    document.getElementById('userValid').innerHTML = "E-mail doesn't exists";                    

                }
            })
        });
}