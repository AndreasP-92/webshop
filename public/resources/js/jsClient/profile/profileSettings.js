document.addEventListener("DOMContentLoaded", function(event) {
    button();
});

function button (){
    document.getElementById('submitButton').addEventListener('click',function(event){
        event.preventDefault();

        const form              = document.querySelector('#passForm');
        const getPass1          = document.querySelector('#pass1');
        const getPass2          = document.querySelector('#pass2');
        const validPasswordDiv  = document.querySelector('#passwordValid');

        if(getPass1.value == getPass2.value){
            form.submit()
            validPasswordDiv.innerHTML = ""
        }else{
            validPasswordDiv.innerHTML = "Password not Identical"
        }

     
    });
}