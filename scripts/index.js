import data from "./portfolio_data.js";
import errors from "./errors.js";
import Message from "./utilities.js";

let currentPage = "home";
let mobileMenuOpened = false;
let totalProjects = data.main.projects.length;
let currentProject = 0;

const render = function () {
  renderHeader();
  renderMain(currentPage);
  renderFooter();
};

const renderOnPageChange = function () {
  renderMenu();
  renderHeaderDescription(currentPage);
  renderMain(currentPage);
  // renderFooterMenu() desktop
};

// === HEADER ===

const renderHeader = function () {
  renderLogo(".header-logo");
  burger();
  renderMenu();
  renderHeaderDescription(currentPage);
};

const renderLogo = function (container) {
  const logo = document.querySelector(container);
  logo.innerText = data.header.logo;
};

const burger = function () {
  const burger = document.querySelector(".fa-bars");
  burger.addEventListener("click", (e) => {
    toggleMobileMenu();
  });
};

const toggleMobileMenu = function () {
  const burger = document.querySelector(".fa-bars");
  const menuDiv = document.querySelector(".header-menu");
  if (mobileMenuOpened) {
    mobileMenuOpened = false;
    menuDiv.style.display = "none";
    burger.classList.remove("menu-opened");
  } else {
    mobileMenuOpened = true;
    menuDiv.style.display = "block";
    burger.classList.add("menu-opened");
  }
  console.log(mobileMenuOpened);
};

const renderMenu = function () {
  const menuDiv = document.querySelector(".header-menu");
  menuDiv.style.display = "none";
  menuDiv.innerHTML = "";
  const menuList = document.createElement("ul");
  menuDiv.appendChild(menuList);
  const links = data.links;
  for (const link of links) {
    const item = document.createElement("li");
    item.innerText = link;
    menuList.appendChild(item);
    item.addEventListener("click", function (e) {
      currentPage = link;
      console.log("switching to", currentPage);
      toggleMobileMenu();
      renderOnPageChange();
      // render();
    });
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

// === MAIN ===

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

// --- HOME ---

const renderHome = function () {
  const mainContainer = document.querySelector(".main-container");
  mainContainer.innerHTML = "";
  renderMainPhoto(mainContainer);
  renderAboutMe(mainContainer);
  renderSkills(mainContainer);
  renderProjectsCarousel(mainContainer);
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

  const years = skill.exp;
  renderYearsIndicator(years, skillDescriptionDiv);

  const yearsCaption = document.createElement("p");
  yearsCaption.innerText = `${years} years`;
  skillDescriptionDiv.appendChild(yearsCaption);

  skillListItem.appendChild(skillDescriptionDiv);
};

const renderYearsIndicator = function (years, container) {
  const indicatorElement = document.createElement("div");
  indicatorElement.classList.add("indicator");

  for (let i = 1; i <= 5; i++) {
    const dot = document.createElement("div");
    dot.classList.add("indicator-dot");
    if (i <= years) dot.classList.add("indicator-dot-filled");
    indicatorElement.appendChild(dot);
  }

  container.appendChild(indicatorElement);
};

const renderProjectsCarousel = function (container) {
  let projectsContainer = null;
  const oldProjectsContainer = document.querySelector(".projects-container");

  if (oldProjectsContainer === null) {
    projectsContainer = document.createElement("ul");
    container.appendChild(projectsContainer);
    projectsContainer.classList.add("projects-carousel");
  } else {
    projectsContainer = oldProjectsContainer;
    projectsContainer.innerHTML = "";
  }

  const projectsList = data.main.projects;
  const projectsListShifted = projectsList
    .slice(currentProject)
    .concat(projectsList.slice(0, currentProject));

  projectsListShifted.forEach((project) =>
    renderProjectCard(project, projectsContainer)
  );

  renderProjectButtons(projectsContainer);
};

const renderProjectCard = function (project, container) {
  const projectCard = document.createElement("li");
  projectCard.classList.add("project-card");

  const projectH3 = document.createElement("h3");
  projectH3.innerText = project.name;
  projectCard.appendChild(projectH3);

  const techList = document.createElement("ul");
  projectCard.appendChild(techList);

  const techs = project.techs;
  techs.forEach((tech) => {
    const item = document.createElement("li");
    item.innerText = tech;
    techList.appendChild(item);
  });

  container.appendChild(projectCard);
};

const renderProjectButtons = function (container) {
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("project-btns-container");
  container.appendChild(buttonsContainer);

  renderProjectSwitcherButton(
    '<i class="fa-solid fa-arrow-left"></i>',
    "prev-proj-btn",
    (e) => {
      currentProject--;
      if (currentProject < 0) currentProject = totalProjects;
      renderProjectsCarousel(container.parentNode); // @TODO this should render only projects
    },
    buttonsContainer
  );
  renderProjectSwitcherButton(
    '<i class="fa-solid fa-arrow-right"></i>',
    "next-proj-btn",
    (e) => {
      currentProject++;
      if (currentProject > totalProjects - 1) currentProject = 0;
      renderProjectsCarousel(container.parentNode); // @TODO this should render only projects
    },
    buttonsContainer
  );
};

const renderProjectSwitcherButton = function (
  content,
  className,
  fun,
  container
) {
  const newButton = document.createElement("button");
  newButton.classList.add(className);
  newButton.classList.add("switch-proj-btn");
  newButton.innerHTML = content;
  newButton.addEventListener("click", fun);
  container.appendChild(newButton);
};

// --- PROJECTS ---

const renderProjects = function () {
  const mainContainer = document.querySelector(".main-container");
  mainContainer.innerHTML = "";
};
const renderAbout = function () {};
const renderContact = function () {};
const renderMessages = function () {};

const renderFooter = function () {
  if (window.innerWidth >= 768) {
    // @TODO render links in desktop
  }
  const footerEmail = document.querySelector(".email");
  footerEmail.innerText = data.footer.email;
  const footerPhone = document.querySelector(".phone");
  footerPhone.innerText = data.footer.tel;
  renderLogo(".footer-logo");
  const copyright = document.querySelector(".copyright");
  const copyrightMark = '<i class="fa-regular fa-copyright"></i>';
  copyright.innerHTML = `${copyrightMark}${data.footer.year}`;
};

render();
