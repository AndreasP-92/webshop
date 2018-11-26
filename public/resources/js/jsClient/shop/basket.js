

$(document).ready(function(){

// REMOVE ITEM OF ONE PRODUCT ================ 
    $(document).on('click','.delete-item',function(event){
        var name = $(this).attr('data-name');

        removeItemFromCartAll(name);
        displayCart();
        checkout()  
    });

// REMOVE ONE ITEM =================
    $(document).on('click','.subtract-item',function(event){
        var name = $(this).attr('data-name');
        var price = $(this).attr('data-price');

        removeFromCart(name, price);
        displayCart();
        checkout()
    });

// ADD ONE ITEM ================================ 
    $(document).on('click','.plus-item',function(event){
        var name    = $(this).attr('data-name');
        var colour  = $(this).attr('data-colour');
        var id      = $(this).attr('data-id');
        var price   = $(this).attr('data-price');
        var count   = $(this).attr('data-count');
        var img     = $(this).attr('data-img');
        var text    = $(this).attr('data-text');
        var totalPrice = price * count

        addItemToCart(name, 0, totalPrice, 1, colour, id, img, text)      
        displayCart();
        checkout()
    });


});
