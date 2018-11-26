// Get all stars with class of star and turn it into an array
(function(){
  star();
})();
function star (){
  const stars = Array.from(document.querySelectorAll('.star'));
  console.log(stars);

  // Loop through all the classes
  stars.forEach(star => {
    // Get star rating within the data attribute value
    const dataRating = star.dataset.rating;
    console.log(dataRating);
    // total number of stars
    const starTotal = 5;

    // Turn the value into a percentage.
    const starPercentage = (dataRating / starTotal) * 100;
    console.log(starPercentage);
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    // Add the percentage value to the class
    star.style.width = starPercentageRounded;
    console.log(starPercentageRounded);
  })

}
