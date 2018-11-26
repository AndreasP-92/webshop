// (function(){
// 	console.log(localStorage.test)

//     var cartCount = 0,
// 	 buy = $('.btn'),
// 	 span = $('.number'),
// 	 cart = $('.cart'),
// 	 quickview = $('.quickviewContainer'),
// 	 quickViewBtn = $('.quickview'),
// 	 close = $('.quickviewContainer .close'),
// 	 minicart = [],
// 	 totalPrice = [],
// 	 miniCartPrice;

// buy.on('click', addToCart);
// quickViewBtn.on('click', quickView);
// cart.on('click', showMiniCart);
// close.on('click', function(){
// 	quickview.removeClass('active');
// });
// function quickView() {
// 	var description = $(this).parent().find('.description').text(),
// 		 header = $(this).parent().find('.header').text(),
// 		 price = $(this).find('.price'),
// 		 quickViewHeader = $('.quickviewContainer .headline'),
// 		 quickViewDescription = $('.quickviewContainer .description');
// 	clearTimeout(timeQuick);
// 		if(quickview.hasClass('active')){
// 			quickview.removeClass('active');
// 			var timeQuick = setTimeout(function(){
// 				quickview.addClass('active');
// 			}, 300);
// 		} else{
// 			quickview.addClass('active');
// 		}
	
// 	quickViewHeader.text(header);
// 	quickViewDescription.text(description);
// }

// function showMiniCart() {
// 	$('.mini').toggleClass('visible');
// }
// // addToCart();

// // add item




// })();