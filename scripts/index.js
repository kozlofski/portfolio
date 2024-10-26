import data from "./portfolio_data.js";
import errors from "./errors.js";
import Message from "./utilities.js";

let currentPage = "home";
let mobileMenuOpened = false;

const render = function () {
  renderHeader();
  renderMain(currentPage);
};

const renderHeader = function () {
  renderLogo();
  renderMenu();
  renderHeaderDescription(currentPage);
};

const renderLogo = function () {
  const logo = document.querySelector(".header-logo");
  logo.innerText = data.header.logo;
};

const renderMenu = function () {
  const menuDiv = document.querySelector(".header-menu");
  const menuList = document.createElement("ul");
  menuDiv.appendChild(menuList);
  const links = data.links;
  for (const link of links) {
    const item = document.createElement("li");
    item.innerText = link;
    menuList.appendChild(item);
  }
};

const renderHeaderDescription = function (currentPage) {
  const h1 = document.querySelector("h1");
  const p = document.querySelector(".h1-description");

  const h1Content = data.header.description[currentPage].h1;
  const pContent = data.header.description[currentPage].p;

  h1.innerText = h1Content;
  p.innerText = pContent;
};

render();
