$(document).ready(function(){

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

// STRIPE WINDOW ====================================
function stripe () {
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
        // Open Checkout with further options:
        handler.open({
          name: 'Perfect-Shoes',
          description: 'Thank you for shopping at us',
          currency : 'eur',
          amount: prepareStripe
        });
        e.preventDefault();
      });
      
      // Close Checkout on page navigation:
      window.addEventListener('popstate', function() {
        handler.close();
      });
    }
  hiddenInfo();
  stripe();

});