
const backToTopButton = document.getElementById("backToTop");
const tiles = document.querySelectorAll(".tile");


// ------------------- Tiles Fade-in -------------------
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

tiles.forEach(tile => observer.observe(tile));

// ------------------- Slideshow -------------------
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// ------------------- Back-to-Top -------------------
function toggleBackToTop() {
  if (window.scrollY > 150) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
}

window.addEventListener("scroll", toggleBackToTop);
toggleBackToTop(); // Direkt beim Laden prüfen

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Hamburger Menü Variablen
const menuToggle = document.getElementById("menu-toggle");
const menuList = document.getElementById("menu-list");

// Hamburger Menü Toggle
menuToggle.addEventListener("click", () => {
  menuList.classList.toggle("hidden");
});

// Klick außerhalb schließt das Hamburger Menü
document.addEventListener("click", (event) => {
  if (!menuList.classList.contains("hidden")) {
    if (!menuList.contains(event.target) && !menuToggle.contains(event.target)) {
      menuList.classList.add("hidden");
    }
  }
});




const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// --- Social Media Bilder ---
const socialImages = document.querySelectorAll(".social-media .project-img");
let socialIndex = 0;

socialImages.forEach((img, index) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    socialIndex = index;
    lightboxImg.src = img.src;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
    lightbox.dataset.type = "social";
  });
});

// --- Fotografie Carousel Bilder ---
const carouselImages = document.querySelectorAll(".fotografie .carousel-img");
let carouselIndex = 0;

carouselImages.forEach((img, index) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    carouselIndex = index;
    lightboxImg.src = img.src;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
    lightbox.dataset.type = "carousel";
  });
});

// --- Lightbox schließen beim Klick ausserhalb des Bildes ---
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
    lightbox.dataset.type = "";
  }
});

// --- Tastatursteuerung ---
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;

  if (e.key === "Escape") {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
    lightbox.dataset.type = "";
  }

  if (lightbox.dataset.type === "carousel") {
    if (e.key === "ArrowRight") {
      carouselIndex = (carouselIndex + 1) % carouselImages.length;
      lightboxImg.src = carouselImages[carouselIndex].src;
    }
    if (e.key === "ArrowLeft") {
      carouselIndex = (carouselIndex - 1 + carouselImages.length) % carouselImages.length;
      lightboxImg.src = carouselImages[carouselIndex].src;
    }
  }

  if (lightbox.dataset.type === "social") {
    if (e.key === "ArrowRight") {
      socialIndex = (socialIndex + 1) % socialImages.length;
      lightboxImg.src = socialImages[socialIndex].src;
    }
    if (e.key === "ArrowLeft") {
      socialIndex = (socialIndex - 1 + socialImages.length) % socialImages.length;
      lightboxImg.src = socialImages[socialIndex].src;
    }
  }
});

