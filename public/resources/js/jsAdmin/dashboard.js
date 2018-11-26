document.addEventListener("DOMContentLoaded", function(event) {
    $(function(){
        $(".btn-bars").click(function(){
            $(".navbar").toggleClass("hideNav","slow");
        });
        $(".avator").click(function(){
            $(".navbar-right").toggleClass("hidden","slow");
        });
    });
});

