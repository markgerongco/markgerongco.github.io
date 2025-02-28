

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();


// portfolio animation

document.addEventListener("DOMContentLoaded", function () {
  const filters = document.querySelectorAll(".portfolio-filters li");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filters.forEach(filter => {
    filter.addEventListener("click", function () {
      filters.forEach(f => f.classList.remove("filter-active"));
      this.classList.add("filter-active");

      let filterValue = this.getAttribute("data-filter");

      portfolioItems.forEach(item => {
        if (filterValue === "*" || item.classList.contains(filterValue.substring(1))) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Lightbox Initialization
  const lightbox = GLightbox({
    selector: '.glightbox'
  });

  // Swiper Initialization
  new Swiper('.portfolio-details-slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const projects = {
    project1: {
      title: "Project 1",
      category: "Web Application",
      client: "ASU Company",
      date: "01 March, 2020",
      url: "https://www.example.com",
      description: "This is a web application designed to manage agricultural workflows.",
      images: [
        "assets/img/portfolio/agrovine-1.jpg",
        "assets/img/portfolio/agrovine-2.png",
        "assets/img/portfolio/agrovine-3.png"
      ]
    },
    project2: {
      title: "Project 2",
      category: "E-commerce Application",
      client: "Dealio Inc.",
      date: "15 June, 2021",
      url: "https://www.dealio.com",
      description: "An e-commerce platform designed for seamless online transactions.",
      images: [
        "assets/img/portfolio/dealio-1.jpg",
        "assets/img/portfolio/dealio-2.jpg",
        "assets/img/portfolio/dealio3.jpg"
      ]
    },
    project3: {
      title: "Project 3",
      category: "Plant Scanner Application",
      client: "FyTech Solutions",
      date: "10 February, 2022",
      url: "https://www.fytech.com",
      description: "A plant scanner app using AI to detect plant diseases.",
      images: [
        "assets/img/portfolio/fytech-1.png",
        "assets/img/portfolio/fytech-2.png"
      ]
    }
  };

  document.querySelectorAll(".details-link").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const projectKey = this.dataset.project;
      const project = projects[projectKey];

      if (project) {
        document.getElementById("project-title").textContent = project.title;
        document.getElementById("project-category").textContent = project.category;
        document.getElementById("project-client").textContent = project.client;
        document.getElementById("project-date").textContent = project.date;
        document.getElementById("project-url").setAttribute("href", project.url);
        document.getElementById("project-url").textContent = project.url;
        document.getElementById("project-description").textContent = project.description;

        const imageContainer = document.getElementById("project-images");
        imageContainer.innerHTML = "";
        project.images.forEach(src => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide";
          slide.innerHTML = `<img src="${src}" class="img-fluid">`;
          imageContainer.appendChild(slide);
        });

        document.getElementById("portfolio-details").classList.remove("d-none");

        // Initialize Swiper
        new Swiper(".portfolio-details-slider", {
          loop: true,
          pagination: { el: ".swiper-pagination", clickable: true }
        });
      }
    });
  });

  document.getElementById("close-details").addEventListener("click", function () {
    document.getElementById("portfolio-details").classList.add("d-none");
  });
});

// portfolio
document.addEventListener("DOMContentLoaded", function() {
  const detailsSection = document.getElementById("portfolio-details");
  const detailsLinks = document.querySelectorAll(".details-link");

  detailsLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();

      // Update details dynamically
      document.getElementById("project-title").innerText = this.dataset.title;
      document.getElementById("project-category").innerText = this.dataset.category;
      document.getElementById("project-client").innerText = this.dataset.client;
      document.getElementById("project-date").innerText = this.dataset.date;
      document.getElementById("project-description").innerText = this.dataset.description;
      document.getElementById("project-url").innerText = this.dataset.url;
      document.getElementById("project-url").href = this.dataset.url;

      // Update images in Swiper slider
      const images = this.dataset.images.split(",");
      const sliderWrapper = document.querySelector("#portfolio-details-slider .swiper-wrapper");
      sliderWrapper.innerHTML = ""; // Clear previous slides

      images.forEach(img => {
        let slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.innerHTML = `<img src="${img.trim()}" alt="Project Image" class="img-fluid">`;
        sliderWrapper.appendChild(slide);
      });

      // Show details section
      detailsSection.classList.remove("hidden");

      // Reinitialize Swiper (if needed)
      if (window.swiperInstance) {
        window.swiperInstance.destroy();
      }
      window.swiperInstance = new Swiper("#portfolio-details-slider", {
        slidesPerView: 1,
        pagination: { el: ".swiper-pagination", clickable: true }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const projectData = JSON.parse(localStorage.getItem("selectedProject"));

  if (projectData) {
      document.getElementById("project-title").textContent = projectData.title;
      document.getElementById("project-category").textContent = projectData.category;
      document.getElementById("project-description").textContent = projectData.description;

      // Populate images in the slider
      const sliderWrapper = document.querySelector(".swiper-wrapper");
      sliderWrapper.innerHTML = ""; // Clear previous images
      projectData.images.forEach(imgSrc => {
          const slide = document.createElement("div");
          slide.classList.add("swiper-slide");
          slide.innerHTML = `<img src="${imgSrc}" class="img-fluid" alt="">`;
          sliderWrapper.appendChild(slide);
      });

      // Initialize Swiper slider (if used)
      if (typeof Swiper !== "undefined") {
          new Swiper("#portfolio-details-slider", {
              pagination: { el: ".swiper-pagination", clickable: true },
              loop: true,
              autoplay: { delay: 3000 },
          });
      }
  } else {
      document.getElementById("project-description").textContent = "No project details found.";
  }
});