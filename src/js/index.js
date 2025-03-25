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
