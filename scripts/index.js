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
  const h1Element = document.querySelector("h1");
  const pElement = document.querySelector(".h1-description");

  const h1Content = data.header.description[currentPage].h1;
  const pContent = data.header.description[currentPage].p;

  h1Element.innerText = h1Content;
  pElement.innerText = pContent;
};

const renderMain = function (currentPage) {
  switch (currentPage) {
    case "home":
      renderHome();
      break;
    case "projects":
      renderProjects();
      break;
    case "about":
      renderAbout();
      break;
    case "contact":
      renderContact();
      break;
    case "messages":
      renderMessages();
      break;
  }
};

const renderHome = function () {
  const mainContainer = document.querySelector(".main-container");
  renderMainPhoto(mainContainer);
  renderAboutMe(mainContainer);
  renderSkills(mainContainer);
};

const renderMainPhoto = function (container) {
  const photoDiv = document.createElement("div");
  const imgUrl = data.main.home.aboutMe.photoUrl;
  photoDiv.style.backgroundImage = `url(${imgUrl})`;
  photoDiv.classList.add("main-photo");
  container.appendChild(photoDiv);
};

const renderAboutMe = function (container) {
  const aboutMeDiv = document.createElement("div");
  aboutMeDiv.classList.add("about-me");
  container.appendChild(aboutMeDiv);

  const h2Element = document.createElement("h2");
  h2Element.innerText = data.main.home.aboutMe.h2;
  aboutMeDiv.appendChild(h2Element);

  const pElement = document.createElement("p");
  pElement.innerText = data.main.home.aboutMe.p;
  aboutMeDiv.appendChild(pElement);
};

const renderSkills = function (container) {
  const skillsDiv = document.createElement("div");
  skillsDiv.classList.add("skills");
  container.appendChild(skillsDiv);

  const h2Element = document.createElement("h2");
  h2Element.innerText = data.main.home.skills.h2;
  skillsDiv.appendChild(h2Element);

  renderSKillList(skillsDiv);
};

const renderSKillList = function (skillsDiv) {
  const skillList = document.createElement("ul");
  skillList.classList.add("skill-list");
  skillsDiv.appendChild(skillList);

  const skillsData = data.main.home.skills.skillList;

  skillsData.forEach((skill) => renderSkill(skill, skillList));
};

const renderSkill = function (skill, skillList) {
  const skillListItem = document.createElement("li");
  renderIcon(skill, skillListItem);
  renderSkillDescription(skill, skillListItem);

  skillList.appendChild(skillListItem);
};

const renderIcon = function (skill, skillListItem) {
  const icon = document.createElement("img");
  const iconUrl = `./svg/${skill.tech.toLowerCase()}.svg`;
  icon.src = iconUrl;
  skillListItem.appendChild(icon);
};

const renderSkillDescription = function (skill, skillListItem) {
  const skillDescriptionDiv = document.createElement("div");
  skillDescriptionDiv.classList.add("skill-description");
  const h3Element = document.createElement("h3");
  h3Element.innerText = skill.tech;
  skillDescriptionDiv.appendChild(h3Element);

  renderYearsIndicator(skill, skillDescriptionDiv);

  skillListItem.appendChild(skillDescriptionDiv);
};

const renderYearsIndicator = function (skill, container) {
  const indicatorElement = document.createElement("div");
  indicatorElement.classList.add("indicator");
  const years = skill.exp;

  for (let i = 1; i <= 5; i++) {
    const dot = document.createElement("div");
    dot.classList.add("indicator-dot");
    if (i <= years) dot.classList.add("indicator-dot-fill");
    indicatorElement.appendChild(dot);
  }

  container.appendChild(indicatorElement);
};

const renderProjects = function () {};
const renderAbout = function () {};
const renderContact = function () {};
const renderMessages = function () {};

render();
