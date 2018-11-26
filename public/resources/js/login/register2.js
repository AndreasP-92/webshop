// document.getElementById('submitButton').addEventListener('click',function(event){
// event.preventDefault();
// });

(function(){
    // window.onbeforeunload = function () { 
    //     return "This will end your session";
    //     }
    // window.stop();
})();

// console.log('læst')

function registerValidate (){
    validDiv    = document.querySelector('#userValid')
    getUser     = document.querySelector('#login__username').value
    
    // console.log(getUser)

    // if(getUser === 'asd'){
    //     var p       = document.createElement('p');

    //     var aText   = document.createTextNode('Username Exist Aldready');
    //         p.appendChild(aText)

    //         validDiv.appendChild(p)

    //     return false
    // };

    const url1 = '/register/getAll/users';

    // const controller = new AbortController();
    // const signal    = controller.signal


    fetch(url1)
        .then(function(response){
            if(response.ok){
                
                return response.json();
            }
        })
        .then(function(data){
            console.log(data)


            for (var i = 0; i < data.length; i++){
                // Looking if there's a user already
                if (data[i].username === getUser){
                    // found it
                    console.log('User found', getUser)
                    console.log(data[i].username);
                    break;
                    // alert('User already exist')

                    // document.write('<!---');

                    // window.stop();
                    // e.preventDefault();
                    // window.top.location.href ="#";
                    // controller.abort();

                    // document.getElementById('submitButton').addEventListener('click',function(event){
                    //     event.preventDefault();
                    // });

                    // var p       = document.createElement('p');
    
                    // var aText   = document.createTextNode('Username Exist Aldready');
                    //     p.appendChild(aText)
    
                    //     validDiv.appendChild(p)
    

                }
            }


            // data.forEach(element => {
                // var name = document.getElementById('login__username').value;
                // var result = _.find(data, {'username': name});
                // if (!result)
                //     window.alert('Nothing found');
                // else
                //     window.alert('Go to ' + result.url);

            // function checkUser (user){
            //     return user == getUser
            // }

            // realtimeUser = data[2].find(checkUser)

            // console.log(realtimeUser)

                // if(data.username === getUser){
                //     document.getElementById('submitButton').addEventListener('click',function(event){
                //         event.preventDefault();
                //             });
                //     var p       = document.createElement('p');
    
                //     var aText   = document.createTextNode('Username Exist Aldready');
                //         p.appendChild(aText)
    
                //         validDiv.appendChild(p)
    
                // };
            // });
        }).catch(err=>{
            console.log(err)
        alert('err')
        // document.getElementById('submitButton').addEventListener('click',function(event){
        //     event.preventDefault();
        // });     
        window.stop();
        
        });


        const controller = new AbortController();
        const signal = controller.signal;

        setTimeout(() => controller.abort(), 5000);

        fetch(url, { signal }).then(response => {
        return response.text();
        }).then(text => {
        console.log(text);
        });
};
