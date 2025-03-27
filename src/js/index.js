const menuButton = document.querySelector("#menu-btn");
const menu = document.querySelector("#menu");

// Ensure the menu is hidden by default
menu.classList.add("menu-hide");

menuButton.addEventListener("click", (e) => {
  e.preventDefault();
  menu.classList.toggle("menu-hide");
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
    menu.classList.add("menu-hide");
  }
});

const handleSearch = () => {
  const search = document.querySelector("#search-input");

  const searchValue = search.value.toLowerCase();
  if (!searchValue) return;

  window.location.href = `/search.html?q=${searchValue}`;
};

// Sidebar Genre Interaction
function initGenreInteraction() {
  const genres = document.querySelectorAll(".sidebar-genre");

  genres.forEach((genre) => {
    genre.addEventListener("click", () => {
      // Toggle active state
      genre.classList.toggle("genre-active");

      // Optional: You could add filtering logic here
      console.log(`Selected genre: ${genre.textContent}`);
    });
  });
}

// Featured and Popular Sections Carousel Interaction
function initCarouselInteraction() {
  const featuredContent = document.querySelector(".featured-content");
  const popularContent = document.querySelector(".popular-content");

  // Add smooth horizontal scrolling
  function setupSmoothScroll(container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
      isDown = true;
      container.classList.add("active");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      container.classList.remove("active");
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      container.classList.remove("active");
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast multiplier
      container.scrollLeft = scrollLeft - walk;
    });
  }

  // Add hover effects to cards
  function addCardHoverEffects(cardsContainer) {
    const cards = cardsContainer.querySelectorAll(".card, .featured-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
        card.style.zIndex = "10";
        card.style.transition = "transform 0.2s ease";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
        card.style.zIndex = "1";
      });
    });
  }

  // Apply interactions
  if (featuredContent) {
    setupSmoothScroll(featuredContent);
    addCardHoverEffects(featuredContent);
  }

  if (popularContent) {
    setupSmoothScroll(popularContent);
    addCardHoverEffects(popularContent);
  }
}

// Hero Section Trailer Modal
function initTrailerModal() {
  const trailerButtons = document.querySelectorAll(
    '.button--primary[href="#"]'
  );

  trailerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Create modal
      const modal = document.createElement("div");
      modal.classList.add("trailer-modal");
      modal.innerHTML = `
              <div class="trailer-content">
                  <button class="modal-close">&times;</button>
                  <iframe 
                      width="560" 
                      height="315" 
                      src="https://youtu.be/LV-nazLVmgo?si=d8TaSAATmrLwTr87" 
                      title="Trailer" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen
                  ></iframe>
              </div>
          `;

      // Append modal to body
      document.body.appendChild(modal);

      // Close modal functionality
      const closeButton = modal.querySelector(".modal-close");
      closeButton.addEventListener("click", () => {
        document.body.removeChild(modal);
      });

      // Close modal when clicking outside
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
    });
  });
}

// Initialize all interactions when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initGenreInteraction();
  initCarouselInteraction();
  initTrailerModal();
});

// Add some extra CSS for the modal and interactions
const styles = document.createElement("style");
styles.textContent = `
  .sidebar-genre.genre-active {
      background-color: var(--color-red);
      border-color: var(--color-red);
  }

  .trailer-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
  }

  .trailer-content {
      position: relative;
      background-color: #000;
      padding: 20px;
      border-radius: 10px;
      max-width: 80%;
      max-height: 80%;
  }

  .modal-close {
      position: absolute;
      top: 10px;
      right: 10px;
      background: var(--color-red);
      color: white;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
  }
`;
document.head.appendChild(styles);

function initFeaturedCarousel() {
  const featuredContent = document.querySelector(".featured-content");

  // Check if there are enough cards to create a carousel
  if (!featuredContent || featuredContent.children.length <= 1) return;

  // Clone first few cards to create seamless scrolling
  const cards = Array.from(featuredContent.children);
  const cardWidth = cards[0].offsetWidth;
  const gap = parseInt(window.getComputedStyle(featuredContent).gap);

  // Add clone cards to create infinite scroll effect
  cards.forEach((card) => {
    const clonedCard = card.cloneNode(true);
    featuredContent.appendChild(clonedCard);
  });

  let currentScroll = 0;
  let totalWidth = (cardWidth + gap) * cards.length;
  let autoScrollInterval;

  function autoScroll() {
    // Increment scroll position
    currentScroll += cardWidth + gap;

    // If we've scrolled past the original set of cards, reset to start
    if (currentScroll >= totalWidth) {
      currentScroll = 0;
      featuredContent.scrollLeft = currentScroll;
    }

    // Smooth scroll
    featuredContent.scrollTo({
      left: currentScroll,
      behavior: "smooth",
    });
  }

  // Start automatic scrolling
  function startAutoScroll() {
    // Clear any existing interval
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
    // Start new interval
    autoScrollInterval = setInterval(autoScroll, 6000);
  }

  // Stop auto scrolling
  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
  }

  // Start auto scrolling initially
  startAutoScroll();

  // Stop scrolling when mouse enters
  featuredContent.addEventListener("mouseenter", () => {
    stopAutoScroll();
  });

  // Resume scrolling when mouse leaves
  featuredContent.addEventListener("mouseleave", () => {
    startAutoScroll();
  });

  // Add some additional styling
  const styles = document.createElement("style");
  styles.textContent = `
      .featured-content {
          scroll-behavior: smooth;
      }
  `;
  document.head.appendChild(styles);
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", initFeaturedCarousel);

document.addEventListener("DOMContentLoaded", () => {
  const popularContent = document.querySelector(".popular-content");
  const cards = document.querySelectorAll(".card");

  // Add click effect to cards
  cards.forEach((card) => {
    const watchTrailerBtn = card.querySelector(".button--primary");
    const learnMoreBtn = card.querySelector(".button--ghost");

    watchTrailerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      // Implement trailer modal logic
      console.log("Watch Trailer clicked");
    });

    learnMoreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      // Implement learn more logic
      console.log("Learn More clicked");
    });

    card.addEventListener("click", () => {
      // Optional: Navigate to movie detail page
      console.log("Card clicked");
    });
  });

  // Smooth horizontal scrolling
  let isDown = false;
  let startX;
  let scrollLeft;

  popularContent.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - popularContent.offsetLeft;
    scrollLeft = popularContent.scrollLeft;
  });

  popularContent.addEventListener("mouseleave", () => {
    isDown = false;
  });

  popularContent.addEventListener("mouseup", () => {
    isDown = false;
  });

  popularContent.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - popularContent.offsetLeft;
    const walk = (x - startX) * 2;
    popularContent.scrollLeft = scrollLeft - walk;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".popular-carousel");
  const items = document.querySelectorAll(".popular-item");
  const prevBtn = document.querySelector(".popular-nav-btn-prev");
  const nextBtn = document.querySelector(".popular-nav-btn-next");

  let currentIndex = 0;
  const itemWidth = items[0].offsetWidth + 20; // width + gap
  let autoScrollInterval;

  function scrollToItem(index, smooth = true) {
    carousel.style.transition = smooth ? "transform 0.5s ease-in-out" : "none";

    // If we've reached the end, smoothly reset to the beginning
    if (index >= items.length) {
      // First, jump to the first item without animation
      carousel.style.transition = "none";
      carousel.style.transform = `translateX(0px)`;

      // Then, after a brief delay, enable smooth transition and set index
      setTimeout(() => {
        carousel.style.transition = "transform 0.5s ease-in-out";
        currentIndex = 0;
        carousel.style.transform = `translateX(0px)`;
      }, 50);
    } else {
      // Normal scrolling
      carousel.style.transform = `translateX(-${index * itemWidth}px)`;
    }
  }

  function nextItem() {
    currentIndex++;
    scrollToItem(currentIndex);
  }

  function prevItem() {
    currentIndex--;
    if (currentIndex < 0) {
      // When going backwards from the first item, jump to the last item
      currentIndex = items.length - 1;
      scrollToItem(currentIndex, false);
    } else {
      scrollToItem(currentIndex);
    }
  }

  function startAutoScroll() {
    stopAutoScroll(); // Clear any existing interval
    autoScrollInterval = setInterval(nextItem, 6000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Next button click
  nextBtn.addEventListener("click", () => {
    stopAutoScroll();
    nextItem();
    startAutoScroll();
  });

  // Previous button click
  prevBtn.addEventListener("click", () => {
    stopAutoScroll();
    prevItem();
    startAutoScroll();
  });

  // Pause on hover
  carousel.addEventListener("mouseenter", stopAutoScroll);
  carousel.addEventListener("mouseleave", startAutoScroll);

  // Item click event
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      console.log(`Clicked item: ${index}`);
      // Optional: Pause auto-scroll and navigate to item details
      stopAutoScroll();
      currentIndex = index;
      scrollToItem(currentIndex);
      // Restart auto-scroll after a delay
      setTimeout(startAutoScroll, 3000);
    });
  });

  // Start auto-scrolling
  startAutoScroll();
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".popular-carousel");
  const items = document.querySelectorAll(".popular-item");
  const prevBtn = document.querySelector(".popular-nav-btn-prev");
  const nextBtn = document.querySelector(".popular-nav-btn-next");

  let currentIndex = 0;
  const itemWidth = items[0].offsetWidth + 20; // width + gap
  const totalCarouselWidth = itemWidth * items.length;
  let autoScrollInterval;

  // Adjust carousel container to exact content width
  carousel.style.width = `${totalCarouselWidth}px`;

  function scrollToItem(index, smooth = true) {
    carousel.style.transition = smooth ? "transform 0.5s ease-in-out" : "none";

    // Implement infinite scroll without extra space
    if (index >= items.length) {
      currentIndex = 0;
      carousel.style.transform = `translateX(0px)`;
    } else if (index < 0) {
      currentIndex = items.length - 1;
      carousel.style.transform = `translateX(-${
        (items.length - 1) * itemWidth
      }px)`;
    } else {
      carousel.style.transform = `translateX(-${index * itemWidth}px)`;
    }
  }

  function nextItem() {
    currentIndex++;
    scrollToItem(currentIndex);
  }

  function prevItem() {
    currentIndex--;
    scrollToItem(currentIndex);
  }

  function startAutoScroll() {
    stopAutoScroll();
    autoScrollInterval = setInterval(nextItem, 6000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Next button click
  nextBtn.addEventListener("click", () => {
    stopAutoScroll();
    nextItem();
    startAutoScroll();
  });

  // Previous button click
  prevBtn.addEventListener("click", () => {
    stopAutoScroll();
    prevItem();
    startAutoScroll();
  });

  // Pause on hover
  carousel.addEventListener("mouseenter", stopAutoScroll);
  carousel.addEventListener("mouseleave", startAutoScroll);

  // Item click event
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      stopAutoScroll();
      currentIndex = index;
      scrollToItem(currentIndex);
      setTimeout(startAutoScroll, 3000);
    });
  });

  // Start auto-scrolling
  startAutoScroll();
});
