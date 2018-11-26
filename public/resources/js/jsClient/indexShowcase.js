(function(){

})();

if($(window).width() < 1024){ $('#fullpage').removeAttr('id'); }


var myFullpage = new fullpage('#fullpage', {
  anchors: ['FirstSection', 'SeccondSection', 'ThirdSection', 'FourthSection'],
  css3: true
});