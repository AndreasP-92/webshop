

// SEND CART INFO TO SERVER
function sendToServer(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(cart),
		cache	:	'no-cache',
		cors	:	'no-cors'
        
        
    };

    let request = new Request('/test', init);


    fetch(request)
}

// SOHW / HIDE CART ========================
function cartActive(){
    let getCart = document.querySelector('.dropdownCart');
    
    if (getCart.style.display == 'none'){
        getCart.style.display = 'inline'
    } else{
        getCart.style.display = 'none'        
    }
}

// CHOOSE QUANTITY ============================

$(document).ready(function(){
    // var quantity = 1;

    $('.quantity-right-plus').click(function(e){
        e.preventDefault();
        var quantity = parseInt($('#quantity').val());
        $('#quantity').val(quantity + 1);
    });

    $('.quantity-left-minus').click(function(e){
        e.preventDefault();
        var quantity = parseInt($('#quantity').val());
        if(quantity > 1){
            $('#quantity').val(quantity - 1);
        }
    });

});

// ADD ITEM TO CART ========================
$('.add-to-cart').click(function(event){
    event.preventDefault();
    var name    = $(this).attr('data-name');
    var price   = Number($(this).attr('data-price'));
    var count   = $('.count-to-cart').val();
    var colour  = $('.colour-to-cart option:selected').text();
    var id      = $(this).attr('data-id');
    var img     = $(this).attr('data-img');
    var text    = $(this).attr('data-text');
    if(colour == 'Select'){
            $('.afterColour').html(`<p style="color:red;">Choose A colour</p>`)
    } else{
        $('.afterColour').html(``)
        $(".addToCart").toggleClass('show');
        $(".addToCart").removeClass('hide');
    
            setTimeout(() => {
                $(".addToCart").toggleClass('hide');
                $(".addToCart").removeClass('show');
            }, 2000);
        addItemToCart (name, price, price, count, colour, id, img, text) 
        displayCart()
    }



});

// CLEAR CART =============================
$('#clear-cart').click(function(event){
    clearCart();
    saveCart();
    displayCart();
});

// DISPLAY CART =============================
function displayCart(){
    var cartArray       = listCart();
    var totalCartList   = totalCart();
    var output      = ""

    for(i in cartArray){
        output += `<li class="productBox">
        <img src="/resources/media/shop/${cartArray[i].img}" alt="${cartArray[i].name}"/>
        <p class="productInfo">${cartArray[i].name}</p>
        <p class="productInfo">color: ${cartArray[i].colour}</p> <br>
        <p class="productInfo">${cartArray[i].count} x 
        ${cartArray[i].price} Total 
        ${cartArray[i].total}</p>
        <button type="button" class="plus-item" data-name="${cartArray[i].name}" data-colour="${cartArray[i].colour}" data-price="${cartArray[i].price}" data-id="${cartArray[i].id}" data-total="${cartArray[i].total}" data-count="${cartArray[i].count}">+</button>
        <button class="subtract-item" data-name="${cartArray[i].name}" data-name="${cartArray[i].price}">-</button>
        <button class="delete-item" data-name='${cartArray[i].name}'>del</button>
        <span class="productLastElm"></span>
        </li>`;
    }
// SHOW CART
    $('#show-cart').html(output);
    $('#total-cart').html(totalCart())
};

// DISPLAY BASKET INFO =========================
function checkout(){
    var taxRate     = 0.05;
    var shipping    = 15.00;
    var subtotal    = parseFloat(totalCart())
    var tax         = subtotal * taxRate
    var totalCost   = tax + subtotal + shipping

    cart        = listCart();
    output      = ""
    for(i in cart){
        output +=`
        <div class="product">
        <div class="product-image">
          <img src="/resources/media/shop/${cart[i].img}">
        </div>
<!-- ITEM DETAILS ----------- -->
        <div class="product-details">
          <div class="product-title">${cart[i].name}</div>
          <p class="product-description"> ${cart[i].text}</p>
        </div>
          <div class="product-price">${cart[i].price}</div>
<!-- ITEM QUANTITY ----------- -->
        <div class="product-quantity">
            <p>${cart[i].count}</p>
            <button class="subtract-item" data-name="${cart[i].name}" data-name="${cart[i].price}">-</button>
            <button class="plus-item" data-name="${cart[i].name}" data-colour="${cart[i].colour}" data-price="${cart[i].price}" data-id="${cart[i].id}" data-total="${cart[i].total}" data-count="${cart[i].count}">+</button>
          <!-- <input type="number" value="${cart[i].count}" min="1"> -->
        </div>
        <div class="product-removal">
          <!-- <button class="remove-product"> -->
<!-- REMOVE ITEM ----------- -->
          <button class="delete-item" data-name="${cart[i].name}">
            Remove
          </button>
        </div>
        <div class="product-line-price">${cart[i].total}</div>
        </div>`;
    }
    totalCostOutput = `<input type="hidden" id="price" name="custId" value="${totalCost}">${totalCost.toFixed(2)}`
// DISPLAY PRODUCT
    $('.prepareProduct').html(output);
// TOTAL CART COST
    $('#cart-subtotal').html(totalCart())
// TOTAL TAX
    $('#cart-tax').html(tax.toFixed(2))
// SHIPPING COST
    $('#cart-shipping').html(shipping);
// TOTAL COST AFTER TAX
    $('#cart-total').html(totalCostOutput);
}



// REMOVE ITEM =================================
$('#show-cart').on('click','.delete-item',function(event){
    var name = $(this).attr('data-name');
    var pricce = $(this).attr('data-price');
    removeItemFromCartAll(name);
    displayCart();

});

// MINUS ONE ITEM ================================ 
$('#show-cart').on('click','.subtract-item',function(event){
    var name = $(this).attr('data-name');
    var price = $(this).attr('data-price');
    removeFromCart(name, price);
    displayCart();

});

// ADD ONE ITEM ================================ 
$('#show-cart').on('click','.plus-item',function(event){
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
});


// ******************************************************************* SHOPPING CART FUNCTIONS **************************************************************


var cart = [];

// CREATING CART ARRAY
class Item{
    constructor (name, price, total, count, colour, id, img, text){
        this.name 	= name
        this.price 	= price
        this.total  = total
        this.count	= count
        this.colour	= colour
        this.img    = img
        this.id	    = id
        this.text   = text
    }
}

// ADD FULL ITEM TO CART ====================
function addItemToCart (name, price, total, count, colour, id, image, text) {
    for(i in cart){
        if(cart[i].name === name && cart[i].colour === colour){
            if(count == 1){
                cart[i].count ++
                cart[i].total = cart[i].count * cart[i].price

            }else if(count > 1){
                cart[i].count = count;
                cart[i].total = cart[i].count * cart[i].price
            }
            saveCart()
            return;
        }
    }

    var item = new Item(name, price, total, count, colour, id, image, text);
    cart.push(item);
    saveCart()
}

// REMOVE ITEM FROM CART ==================
function removeFromCart(name, price){
	for(i in cart){
		if(cart[i].name === name){
            cart[i].count --;
            cart[i].total = cart[i] - price
            if(cart[i].count === 0){
                cart.splice(i, 1) // splice takes 3 arguments
            }
            
            break;
        }
    }
    saveCart()
}

// REMOVE ONE FULL ITEM FROM CART =============
function removeItemFromCartAll (name) {
    for (i in cart){
        if(cart[i].name === name){
            cart.splice(i, 1)
            break;
        }
    }
    saveCart ()
}

// CLEAR CEART ==============
function clearCart (){
    cart = [];

    sendToServer();

}

// COUNT CART ===============
function countCart (){
    var totalCount = 0;
    for(i in cart){
        totalCount += cart[i].count;
    }
    return totalCount;
}

// TOTAL COST ================
function totalCart () {
    var totalCost = 0;
    for(i in cart){
        totalCost += cart[i].price * cart[i].count;
    }
    return totalCost.toFixed(2);// 2 decimal numbers
}


function listCart(){
    var cartCopy = [];
    for(i in cart){
        var item        = cart[i];
        var itemCopy    = {};
        for(p in item){
            itemCopy[p] = item[p];
        }
        cartCopy.push(itemCopy)
        itemCopy.total = (item.price * item.count).toFixed(2);
    }
    return cartCopy;
}

// SAVE CART ==================
function saveCart (){
    localStorage.setItem('shoppingCart', JSON.stringify(cart))
}

// LOADING CART =================
function loadCart (){
    cart = JSON.parse(localStorage.getItem('shoppingCart'))
    sendToServer();
}


loadCart();
displayCart();
checkout()

