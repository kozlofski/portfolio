import data from "./portfolio_data.js";
import errors from "./errors.js";
import Message from "./utilities.js";

const render = function () {
  renderHeader();
};

const renderHeader = function () {
  renderLogo();
  renderMenu();
};

const renderLogo = function () {
  const logo = document.querySelector(".header-logo");
  logo.innerText = data.header.logo;
};

const renderMenu = function () {
  const menuDiv = document.querySelector(".header-mobile-menu");
  const menuList = document.createElement("ul");
  menuDiv.appendChild(menuList);
  const links = data.links;
  for (const link of links) {
    const item = document.createElement("li");
    item.innerText = link;
    menuList.appendChild(item);
  }
};

render();
