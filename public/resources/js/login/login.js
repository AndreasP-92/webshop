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
        console.log('button læst')

        const registerForm      = document.querySelector('#registerForm');
        const getUser           = document.querySelector('#login__username');
        const validUserDiv      = document.querySelector('#userValid');
        const success           = document.querySelector('.rigistrationSuccess');
        const form              = document.querySelector('.card-container');
        const validPasswordDiv  = document.querySelector('#passwordValid');

        
        
        // console.log('username =',getUser.value)
        const url = '/register/find/'+getUser.value;

        console.log('login læst')

        console.log(url)

        fetch (url)
            .then(function(response){
                console.log(response)
                console.log('resonse')
                return response.json();
            }).then(function(result){
                console.log(result)
                if(result[0].user_username == 1){
                    console.log('accepteret')
                    console.log(registerForm)
                    document.getElementById('userValid').innerHTML = "";


                    success.classList.toggle("showSuccess")
                    form.classList.toggle('hide')
                    
                    setTimeout(function(){ 
                        registerForm.submit()
                    }, 1000);
                } if(result[0].username == 0) {
                    getUser.select()

                    document.getElementById('userValid').innerHTML = "Wrong User Name";                    

                }
                //  if(getPassword01 != getPassword02){
                //     getPassword01.select()

                //     document.getElementById('passwordValid').innerHTML = "Password has to be Identical";                                        
                // }
            })
        });
    // document.querySelector()
}