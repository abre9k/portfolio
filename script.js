
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