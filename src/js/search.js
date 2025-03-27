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

document.addEventListener("DOMContentLoaded", function () {
  // Show more movies
  const moreMatchesButton = document.getElementById("more-matches-button");
  const moreMovies = document.getElementById("more-movies");
  let isMoreMoviesVisible = false;

  moreMatchesButton.addEventListener("click", function (e) {
    e.preventDefault();
    isMoreMoviesVisible = !isMoreMoviesVisible;
    if (isMoreMoviesVisible) {
      moreMovies.style.display = "block";
      this.textContent = "Tampilkan lebih sedikit ";
    } else {
      moreMovies.style.display = "none";
      this.textContent = "Tampilkan lebih banyak ";
    }
  });

  // Show more people
  const morePeopleButton = document.getElementById("more-people-button");
  const morePeople = document.getElementById("more-people");
  let isMorePeopleVisible = false;

  morePeopleButton.addEventListener("click", function (e) {
    e.preventDefault();
    isMorePeopleVisible = !isMorePeopleVisible;
    if (isMorePeopleVisible) {
      morePeople.style.display = "block";
      this.textContent = "Tampilkan lebih sedikit ";
    } else {
      morePeople.style.display = "none";
      this.textContent = "Tampilkan lebih banyak";
    }
  });

  // Filter tags
  const filterTags = document.querySelectorAll(".filter-tag");
  filterTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      // In a real application, this would filter results
      console.log("Filter by:", this.textContent);
    });
  });
});
