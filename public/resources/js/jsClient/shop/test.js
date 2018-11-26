$(document).ready(function(){
    stripe();
    hiddenInfo();
});

    // ORDER PRODUCT INFO ============================
    function hiddenInfo(){
        var taxRate         = 0.05;
        var shipping        = 15.00;
        var subtotal        = parseInt(totalCart())
        var tax             = subtotal * taxRate
        var totalCost       = tax + subtotal + shipping
        var prepareTotal    = totalCost.toFixed(2);
        var prepareStripe   = prepareTotal.replace(".", "")
        var cartArray       = listCart();
        var idArray         = []
        for(i in cartArray){
          idArray.push(cartArray[i].id)
        }
    
        var output = `<input type="hidden" id="price" name="TotalPrice" value="${prepareStripe}"> <input type="hidden" id="idArray" name="idArray" value="${idArray}">`;
    
        $('#hiddenInfo').html(output);
    };
    
    // function validateStripe (){
    
    //     $('checkoutButton').click(function(){
    
    
        // var firstname     = $('#name').val();
        // var lastname      = $('#lastname').val();
        // var mail          = $('#mailVal').val();
        // var adress        = $('#adress').val();
        // var city          = $('#city').val();
        // var zip           = $('#zip').val();
        // var country       = $('#country').val();
        // var phone         = $('#phone').val();
    
    //     if(firstname != "" && lastname != "" && mail != "" && adress != "" && city != "" && zip != "" && country != "" && phone != ""){
    //       stripe()
    //     }else{
    //       $('#validate').html('<p style="color:red;">Fill out all fields marked with *</p>')
    //     }
    //   })
    
    // }
    
    // STRIPE WINDOW ====================================
    function stripe () {

    
    
        // let test = [firstname, lastname, mail, adress, city, zip, country, phone]
    
        // console.log(test)
    
    
        var taxRate         = 0.05;
        var shipping        = 15.00;
        var subtotal        = parseInt(totalCart())
        var tax             = subtotal * taxRate
        var totalCost       = tax + subtotal + shipping
        var prepareTotal    = totalCost.toFixed(2);
        var prepareStripe   = prepareTotal.replace(".", "")
        let getEmail        = $('#mailVal').val();
    
        var handler = StripeCheckout.configure({
            key: 'pk_test_NxYJpFjcgUs7WUvo1vVxYKEv',
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: 'eur',
            email: getEmail,
            token: function(token) {
              // You can access the token ID with `token.id`.
              // Get the token ID to your server-side code for use.
              $("#stripeToken").val(token.id);
              $("#stripeEmail").val(token.email);
              $("#form").submit();
                clearCart();
                saveCart();
                displayCart();
            }
          });
        
          document.getElementById('checkoutButton').addEventListener('click', function(e) {

            var firstname     = $('#name').val();
            var lastname      = $('#lastname').val();
            var mail          = $('#mailVal').val();
            var adress        = $('#adress').val();
            var city          = $('#city').val();
            var zip           = $('#zip').val();
            var country       = $('#country').val();
            var phone         = $('#phone').val();
      
            if(firstname != "" && lastname != "" && mail != "" && adress != "" && city != "" && zip != "" && country != "" && phone != ""){
              
                $('#validate').html('')
           
                // Open Checkout with further options:
                handler.open({
                name: 'Perfect-Shoes',
                description: 'Thank you for shopping at us',
                currency : 'eur',
                amount: prepareStripe
                });
    
          }else{
              console.log('læst')
            $('#validate').html('<p style="color:red;">Fill out all fields marked with *</p>')
          }
    
    
    
            e.preventDefault();
          });
          
          // Close Checkout on page navigation:
          window.addEventListener('popstate', function() {
            handler.close();
          });
        }
    //   hiddenInfo();
    //   stripe();
    