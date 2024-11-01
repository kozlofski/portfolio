import data from "./portfolio_data.js";
import errors from "./errors.js";
import fa from "./font_awesome.js";
import Message from "./utilities.js";

let currentPage = "projects";
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

const renderLogo = function (logoContainer) {
  const logo = document.querySelector(logoContainer);
  const commonPart = document.createElement("span");
  commonPart.classList.add("logo-common");
  commonPart.innerText = data.header.logo.common;

  const desktopPart = document.createElement("span");
  desktopPart.classList.add("logo-desktop");
  if (logoContainer === ".header-logo") {
    desktopPart.classList.add("logo-desktop-header");
  }

  desktopPart.innerText = data.header.logo.desktop;

  logo.append(commonPart, desktopPart);
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
    item.innerText = link.toUpperCase();
    menuList.appendChild(item);
    item.addEventListener("click", function (e) {
      currentPage = link;
      toggleMobileMenu();
      renderOnPageChange();
      // render();
    });
    if (link === currentPage) {
      item.classList.add("selected-link");
    }
  }
};

const renderHeaderDescription = function (currentPage) {
  const h1Element = document.querySelector("h1");
  const pElement = document.querySelector(".h1-description");

  const h1Content = data.header.description[currentPage].h1.toUpperCase();
  const pContent = data.header.description[currentPage].p.toUpperCase();

  h1Element.innerText = h1Content;
  pElement.innerText = pContent;
};

// === MAIN ===

const renderMain = function (currentPage) {
  const mainContainer = document.querySelector(".main-container");
  mainContainer.innerHTML = "";

  switch (currentPage) {
    case "home":
      renderHome(mainContainer);
      break;
    case "projects":
      renderProjects(mainContainer);
      break;
    case "about":
      renderAbout(mainContainer);
      break;
    case "contact":
      renderContact(mainContainer);
      break;
    case "messages":
      renderMessages(mainContainer);
      break;
  }
};

const updateSubpageClasses = function (container) {
  const containerClasses = data.links.map((page) => `container-${page}`);
  container.classList.remove(...containerClasses);
  console.log(currentPage);
  container.classList.add(`container-${currentPage}`);
};

// --- HOME ---

const renderHome = function (mainContainer) {
  updateSubpageClasses(mainContainer);

  renderMainPhoto(mainContainer);
  renderAboutMe(mainContainer);
  renderSkills(mainContainer);
  renderProjectsCarousel(mainContainer);
  renderProjectButtons(mainContainer);
};

// @TODO move this fn up to common functions
const appendElement = function (htmlEl, container, innerText, elClass) {
  const newElement = document.createElement(htmlEl);
  if (innerText) newElement.innerText = innerText;
  if (elClass) newElement.classList.add(elClass);
  container.appendChild(newElement);
  return newElement;
};

const renderMainPhoto = function (container) {
  const photoDiv = document.createElement("div");
  const imgUrl = data.main.home.aboutMe.photoUrl;
  photoDiv.style.backgroundImage = `url(${imgUrl})`;
  photoDiv.classList.add("main-photo");
  container.appendChild(photoDiv);
};

const renderAboutMe = function (container) {
  const aboutMeDiv = appendElement("div", container, "", "about-me");
  appendElement("h2", aboutMeDiv, data.main.home.aboutMe.h2);
  appendElement("p", aboutMeDiv, data.main.home.aboutMe.p);
};

const renderSkills = function (container) {
  const skillsDiv = appendElement("div", container, "", "skills");
  appendElement("h2", skillsDiv, data.main.home.skills.h2);
  renderSKillList(skillsDiv);
};

const renderSKillList = function (skillsDiv) {
  const skillList = appendElement("ul", skillsDiv, "", "skill-list");
  const skillsData = data.main.home.skills.skillList;
  skillsData.forEach((skill) => renderSkill(skill, skillList));
};

const renderSkill = function (skill, skillList) {
  const skillListItem = appendElement("li", skillList);
  renderIcon(skill, skillListItem);
  renderSkillDescription(skill, skillListItem);
};

const renderIcon = function (skill, skillListItem) {
  const icon = appendElement("img", skillListItem);
  const iconUrl = `./svg/${skill.tech.toLowerCase()}.svg`;
  icon.src = iconUrl;
};

const renderSkillDescription = function (skill, skillListItem) {
  const skillDescriptionDiv = appendElement(
    "div",
    skillListItem,
    "",
    "skill-description"
  );

  appendElement("h3", skillDescriptionDiv, skill.tech);

  const years = skill.exp;
  renderYearsIndicator(years, skillDescriptionDiv);

  appendElement("p", skillDescriptionDiv, `${years} years`);
};

const renderYearsIndicator = function (years, container) {
  const indicatorElement = appendElement("div", container, "", "indicator");

  for (let i = 1; i <= 5; i++) {
    const dot = document.createElement("div");
    dot.classList.add("indicator-dot");
    if (i <= years) dot.classList.add("indicator-dot-filled");
    indicatorElement.appendChild(dot);
  }
};

const renderProjectsCarousel = function (container) {
  let projectsContainer = null;
  const oldProjectsContainer = document.querySelector(".projects-carousel");

  if (oldProjectsContainer === null) {
    projectsContainer = appendElement("ul", container, "", "projects-carousel");
  } else {
    projectsContainer = oldProjectsContainer;
    projectsContainer.innerHTML = "";
  }

  const projectsList = data.main.projects;
  const projectsListShifted = projectsList
    .slice(currentProject)
    .concat(projectsList.slice(0, currentProject))
    .slice(0, 3);

  projectsListShifted.forEach((project) =>
    renderProjectCard(project, projectsContainer)
  );
};

const renderProjectCard = function (project, container) {
  const projectCard = appendElement("li", container, "", "project-card");
  appendElement("div", projectCard, "", "card-blur");
  appendElement("h3", projectCard, project.name);
  const techList = appendElement("ul", projectCard, "", "tech-list");
  const techs = project.techs;

  techs.forEach((tech) => {
    appendElement("li", techList, tech);
  });
};

const renderProjectButtons = function (container) {
  const buttonsContainer = appendElement(
    "div",
    container,
    "",
    "project-btns-container"
  );

  renderProjectSwitcherButton(
    fa.leftArrow,
    "prev-proj-btn",
    (e) => {
      switchProject("previous", container.parentNode);
    },
    buttonsContainer
  );
  renderProjectSwitcherButton(
    fa.rightArrow,
    "next-proj-btn",
    (e) => {
      switchProject("next", container.parentNode);
    },
    buttonsContainer
  );
};

const switchProject = function (direction, container) {
  if (direction === "next") {
    currentProject++;
    if (currentProject > totalProjects - 1) currentProject = 0;
    renderProjectsCarousel(container.parentNode);
  } else {
    currentProject--;
    if (currentProject < 0) currentProject = totalProjects;
    renderProjectsCarousel(container.parentNode);
  }
};

const renderProjectSwitcherButton = function (
  content,
  className,
  fun,
  container
) {
  const newButton = appendElement("button", container, "", className);
  newButton.innerHTML = content;
  newButton.classList.add("switch-proj-btn");
  newButton.addEventListener("click", fun);
};

// --- PROJECTS ---

const renderModal = function () {
  const body = document.querySelector("body");
  appendElement("div", body, "", "blur-for-modal");
  renderAddProjectForm(body);
};

const renderProjects = function (mainContainer) {
  updateSubpageClasses(mainContainer);

  const addProjectButton = appendElement(
    "button",
    mainContainer,
    "",
    "add-project-btn"
  );
  addProjectButton.innerHTML = `${fa.plus} Add project`;
  addProjectButton.addEventListener("click", renderModal);

  const projectsContainer = appendElement(
    "div",
    mainContainer,
    "",
    "projects-container"
  );

  const projectsList = data.main.projects;
  projectsList.forEach((project) =>
    renderProjectCard(project, projectsContainer)
  );
};

const renderAddProjectForm = function (container) {
  const formContainer = appendElement(
    "div",
    container,
    "",
    "add-project-container"
  );
  const newForm = appendElement("form ", formContainer, "", "add-project-form");
};

// --- ABOUT ---

const renderAbout = function (mainContainer) {
  updateSubpageClasses(mainContainer);

  renderMainPhoto(mainContainer);

  renderArticle("background", mainContainer);
  renderArticle("hobbies", mainContainer);

  const contactMeButton = appendElement(
    "button",
    mainContainer,
    "Contact me",
    "contact-me-button"
  );
  contactMeButton.addEventListener("click", (e) => {
    currentPage = "contact";
    renderOnPageChange();
  });
};

const renderArticle = function (topic, container) {
  const newArticle = appendElement(
    "article",
    container,
    "",
    `my-${topic}-article`
  );

  appendElement("h2", newArticle, data.main.aboutMe[topic].h2);
  appendElement("p", newArticle, data.main.aboutMe[topic].p);
};

// --- CONTACT ---

const renderContact = function (mainContainer) {
  updateSubpageClasses(mainContainer);

  const contactForm = appendElement("form", mainContainer, "", "contact-form");
  contactForm.name = "contact-form";

  const inputDataSource = data.main.contact;
  renderInput(inputDataSource, "name", contactForm);
  renderInput(inputDataSource, "email", contactForm);
  renderInput(inputDataSource, "message", contactForm);

  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Send message";
  submitButton.classList.add("send-message-button");
  contactForm.appendChild(submitButton);

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });
};

const renderInput = function (inputDataSource, type, container) {
  const newInputData = inputDataSource[type];

  const newInputContainer = appendElement(
    "div",
    container,
    "",
    "input-container"
  );
  newInputContainer.classList.add(`${type}-input-container`);

  const labelForNewInput = appendElement(
    "label",
    newInputContainer,
    newInputData.label,
    `${type}-input-label`
  );
  labelForNewInput.for = type;

  const newInputElement = appendElement(
    "input",
    newInputContainer,
    "",
    `${type}-input`
  );
  newInputElement.type = "text";
  newInputElement.name = type;
  newInputElement.placeholder = newInputData.placeholder;

  const divForValidationErrors = appendElement(
    "p",
    newInputContainer,
    "",
    "validation-error"
  );
  divForValidationErrors.classList.add(`${type}-validation-error`);
};

// --- MESSAGES ---

const renderMessages = function (mainContainer) {
  updateSubpageClasses(mainContainer);

  const messagesData = data.main.messages;
  messagesData.forEach((message) => renderMessage(message, mainContainer));
};

const renderMessage = function (message, container) {
  const messageContent = `Name: ${message.name}
  Email: ${message.email}
  Message: ${message.message}`;

  appendElement("div", container, messageContent, "message-container");
};

// === FOOTER ===

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
  const copyrightMark = fa.copyright;
  copyright.innerHTML = `${copyrightMark}${data.footer.year}`;
};

render();
