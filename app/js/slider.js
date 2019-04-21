(function (){
  var resultSection = document.querySelector('.result');
  var feedbackSection = document.querySelector('.feedback')

  function setupSlider(section) {

    var slideIndex = 1;

    if (section.querySelector('.arrow-button')) {
      section.querySelector('.to-left-button').addEventListener('click', function() {
        showSlides(slideIndex -= 1);
      });

      section.querySelector('.to-right-button').addEventListener('click', function() {
        showSlides(slideIndex += 1);
      });
    }

    section.querySelector('.toggles__button--1').addEventListener('click', function() {
      showSlides(slideIndex = 1);
    });

    section.querySelector('.toggles__button--2').addEventListener('click', function() {
      showSlides(slideIndex = 2);
    });

    section.querySelector('.toggles__button--3').addEventListener('click', function() {
      showSlides(slideIndex = 3);
    });

    function showSlides(n) {

      var slides = section.querySelectorAll('.slide');
      var dots = section.querySelectorAll('.toggles__button');

      if (n > slides.length) {
        slideIndex = 1;
      } else if (n < 1) {
        slideIndex = slides.length;
      } 

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }

      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace('toggles__button--active', '');
      }

      slides[slideIndex - 1].style.display = 'block';
      dots[slideIndex - 1].className += ' toggles__button--active';
    };

    showSlides(1);

  };

  setupSlider(resultSection);
  setupSlider(feedbackSection);
})();
