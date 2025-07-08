let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  let sliderContainer = document.querySelector(".slider-container");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";

  // Add or remove blur-active class based on current slide
  if (slides[slideIndex-1].classList.contains("faisal") || slides[slideIndex-1].classList.contains("master")) {
    sliderContainer.classList.add("blur-active");
  } else {
    sliderContainer.classList.remove("blur-active");
  }

  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

// Next/previous controls
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

prev.addEventListener('click', () => {
  slideIndex--;
  if (slideIndex < 1) slideIndex = document.getElementsByClassName("slide").length;
  showCurrentSlide();
});

next.addEventListener('click', () => {
  slideIndex++;
  if (slideIndex > document.getElementsByClassName("slide").length) slideIndex = 1;
  showCurrentSlide();
});

function showCurrentSlide() {
  let slides = document.getElementsByClassName("slide");
  let sliderContainer = document.querySelector(".slider-container");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";

  // Add or remove blur-active class based on current slide
  if (slides[slideIndex-1].classList.contains("faisal") || slides[slideIndex-1].classList.contains("master")) {
    sliderContainer.classList.add("blur-active");
  } else {
    sliderContainer.classList.remove("blur-active");
  }
}
