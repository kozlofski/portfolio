import data from "./portfolio_data.js";
import errors from "./errors.js";
import fa from "./font_awesome.js";
import Message from "./utilities.js";

let currentPage = "home";
let mobileMenuOpened = false;
let totalProjects = data.main.projects.length;
let firstProjectInCarousel = 0;

// === PAGE RENDERING ===

const initialRender = function () {
  renderHeader();
  renderMain(currentPage);
  renderFooter();
};

const renderOnPageChange = function () {
  renderHeaderDescription(currentPage);
  renderMenu(".header-menu");
  renderMain(currentPage);
  renderMenu(".footer-menu");
};

// === COMMON FUNCTIONS ===

const renderLogo = function (logoContainer) {
  const logo = document.querySelector(logoContainer);
  appendElement("span", logo, data.header.logo.common, "logo-common");
  const desktopPart = appendElement(
    "span",
    logo,
    data.header.logo.desktop,
    "logo-desktop"
  );

  if (logoContainer === ".header-logo")
    desktopPart.classList.add("logo-desktop-header");
};

const updateSubpageClasses = function (container) {
  const containerClasses = data.links.map((page) => `container-${page}`);
  container.classList.remove(...containerClasses);
  container.classList.add(`container-${currentPage}`);
};

const appendElement = function (htmlEl, container, innerText, elClass) {
  const newElement = document.createElement(htmlEl);
  if (innerText) newElement.innerText = innerText;
  if (elClass) newElement.classList.add(elClass);
  container.appendChild(newElement);
  return newElement;
};

const renderProjectCard = function (project, container) {
  const projectCard = appendElement("li", container, "", "project-card");
  const blur = appendElement("div", projectCard, "", "card-darkening");
  appendElement("h3", projectCard, project.name);
  const techList = appendElement("ul", projectCard, "", "tech-list");
  const techs = project.techs;

  techs.forEach((tech) => {
    appendElement("li", techList, tech);
  });

  if (currentPage === "projects") renderDeleteButton(blur);
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
  newInputElement.classList.add("input");
  newInputElement.name = type;
  newInputElement.placeholder = newInputData.placeholder;

  const divForValidationErrors = appendElement(
    "p",
    newInputContainer,
    "",
    "validation-error"
  );
  divForValidationErrors.classList.add(`${type}-validation-error`);
  return newInputElement;
};

const renderError = function (inputName, errorName) {
  const errorDiv = document.querySelector(`.${inputName}-validation-error`);
  errorDiv.innerText = errorName;
  renderRedBorderOnError(inputName, errorName.length);
};

const renderRedBorderOnError = function (inputName, errorLength) {
  const errorInput = document.querySelector(`.${inputName}-input`);
  if (errorLength > 0) {
    errorInput.classList.add(`input-error`);
  } else {
    errorInput.classList.remove(`input-error`);
  }
};

// === HEADER ===

const renderHeader = function () {
  renderLogo(".header-logo");
  renderBurger();
  renderMenu(".header-menu");
  renderHeaderDescription(currentPage);
};

const renderBurger = function () {
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
    menuDiv.classList.add("mobile-menu-closed");
    burger.classList.remove("menu-opened");
  } else {
    mobileMenuOpened = true;
    menuDiv.classList.remove("mobile-menu-closed");
    burger.classList.add("menu-opened");
  }
};

const renderMenu = function (container) {
  const menuDiv = document.querySelector(container);
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
      renderOnPageChange();
    });
    if (link === currentPage) {
      item.classList.add("selected-link");
    }
  }

  return menuDiv;
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
  updateSubpageClasses(mainContainer);

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

// --- HOME ---

const renderHome = function (mainContainer) {
  const meAndSkills = appendElement("div", mainContainer, "", "me-and-skills");
  renderMainPhoto(meAndSkills);
  renderAboutMe(meAndSkills);
  renderSkills(meAndSkills);
  renderProjectsCarousel(mainContainer);
  if (totalProjects > 3) renderProjectButtons(mainContainer);
};

const renderMainPhoto = function (container) {
  const photoDiv = appendElement("div", container, "", "main-photo");
  const imgUrl = data.main.home.aboutMe.photoUrl;
  photoDiv.style.backgroundImage = `url(${imgUrl})`;
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
    const dot = appendElement("div", indicatorElement, "", "indicator-dot");
    if (i <= years) dot.classList.add("indicator-dot-filled");
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
    .slice(firstProjectInCarousel)
    .concat(projectsList.slice(0, firstProjectInCarousel))
    .slice(0, 3);

  projectsListShifted.forEach((project) =>
    renderProjectCard(project, projectsContainer)
  );
};

const renderDeleteButton = function (darkFilterDiv) {
  const deleteButton = appendElement(
    "button",
    darkFilterDiv,
    "",
    "delete-project-button"
  );
  deleteButton.innerHTML = fa.trashbin;

  deleteButton.addEventListener("click", (e) => {
    const projectToDelete =
      darkFilterDiv.parentNode.querySelector("h3").innerText;

    data.main.projects = data.main.projects.filter((proj) => {
      return proj.name !== projectToDelete;
    });
    totalProjects--;
    renderOnPageChange();
  });
};

const renderProjectButtons = function (container) {
  const buttonsContainer = appendElement(
    "div",
    container,
    "",
    "project-btns-container"
  );

  renderProjectSwitcherButton("previous", buttonsContainer);
  renderProjectSwitcherButton("next", buttonsContainer);
};

const switchProject = function (direction, container) {
  if (direction === "next") {
    firstProjectInCarousel++;
    if (firstProjectInCarousel > totalProjects - 1) firstProjectInCarousel = 0;
    renderProjectsCarousel(container.parentNode);
  } else {
    firstProjectInCarousel--;
    if (firstProjectInCarousel < 0) firstProjectInCarousel = totalProjects;
    renderProjectsCarousel(container.parentNode);
  }
};

const renderProjectSwitcherButton = function (direction, container) {
  const newButton = appendElement("button", container);
  if (direction === "previous") {
    newButton.innerHTML = fa.leftArrow;
  } else {
    newButton.innerHTML = fa.rightArrow;
  }
  newButton.classList.add("switch-proj-btn");
  newButton.addEventListener("click", (e) => {
    switchProject(direction, container.parentNode);
  });
};

// --- PROJECTS ---

const renderModal = function () {
  const body = document.querySelector("body");
  appendElement("div", body, "", "blur-for-modal");
  renderAddProjectForm(body);
  body.style.overflow = "hidden";
};

const deleteModal = function () {
  const blur = document.querySelector(".blur-for-modal");
  const form = document.querySelector(".modal");
  blur.remove();
  form.remove();
  const body = document.querySelector("body");
  body.style.overflow = "visible";
};

const renderProjects = function (mainContainer) {
  const addProjectButton = appendElement(
    "button",
    mainContainer,
    "",
    "add-project-btn"
  );
  addProjectButton.innerHTML = `${fa.plus} Add project`;
  addProjectButton.addEventListener("click", renderModal);

  const projectsContainer = appendElement(
    "ul",
    mainContainer,
    "",
    "projects-list"
  );

  const projectsList = data.main.projects;
  projectsList.forEach((project) =>
    renderProjectCard(project, projectsContainer)
  );

  if (totalProjects === 0)
    appendElement("h2", mainContainer, "There are no projects to display");
};

const addProject = function (projectForm) {
  const newProjectName = projectForm.elements[0].value;
  const newProjectTechs = projectForm.elements[1].value;

  const projectTechsList = newProjectTechs.split(",");
  data.main.projects.push({
    name: newProjectName,
    techs: projectTechsList,
  });
  totalProjects++;
  deleteModal();
  renderOnPageChange();
};

const renderAddProjectForm = function (container) {
  const formContainer = appendElement("div", container, "", "modal");
  const projectForm = appendElement("form", formContainer, "", "project-form");
  projectForm.name = "project-form";

  const inputDataSource = data.main.modal;
  const titleInput = renderInput(inputDataSource, "projectTitle", projectForm);
  const techsInput = renderInput(inputDataSource, "technologies", projectForm);

  const addProjectButton = appendElement(
    "input",
    projectForm,
    "",
    "confirm-project-button"
  );
  addProjectButton.type = "submit";
  addProjectButton.value = "Add project";

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateNewProject(projectForm)) {
      addProject(projectForm);
    } else {
      titleInput.addEventListener("input", (e) =>
        validateNewProject(projectForm)
      );
      techsInput.addEventListener("input", (e) =>
        validateNewProject(projectForm)
      );
    }
  });

  const cancelButton = appendElement(
    "button",
    formContainer,
    "",
    "cancel-button"
  );
  cancelButton.innerHTML = `${fa.xmark}`;
  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    deleteModal();
  });
};

const validateNewProject = function (projectForm) {
  const newProjectName = projectForm.elements[0].value;
  const techList = projectForm.elements[1].value;
  let nameError = "";
  let techsError = "";

  if (newProjectName.length < 3) nameError = errors.titleTooShort;
  else if (newProjectName.length > 30) nameError = errors.titleTooLong;
  if (techList.length === 0) techsError = errors.technologiesEmpty;

  renderError("projectTitle", nameError);
  renderError("technologies", techsError);

  return nameError.length === 0 && techsError.length === 0;
};

// --- ABOUT ---

const renderAbout = function (mainContainer) {
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
  appendElement("h2", mainContainer, data.main.contact.h2, "");

  const contactForm = appendElement("form", mainContainer, "", "contact-form");
  contactForm.name = "contact-form";

  const inputDataSource = data.main.contact;
  const nameInput = renderInput(inputDataSource, "name", contactForm);
  const emailInput = renderInput(inputDataSource, "email", contactForm);
  const messageInput = renderInput(inputDataSource, "message", contactForm);

  const submitButton = appendElement(
    "input",
    contactForm,
    "",
    "send-message-button"
  );

  submitButton.type = "submit";
  submitButton.value = "Send message";

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateNewMessage(contactForm)) {
      addMessage(contactForm);
      contactForm.reset();
    } else {
      nameInput.addEventListener("input", (e) =>
        validateNewMessage(contactForm)
      );
      emailInput.addEventListener("input", (e) =>
        validateNewMessage(contactForm)
      );
      messageInput.addEventListener("input", (e) =>
        validateNewMessage(contactForm)
      );
    }
  });
};

const validateNewMessage = function (contactForm) {
  const name = contactForm.elements[0].value;
  const email = contactForm.elements[1].value;
  const message = contactForm.elements[2].value;

  let nameError = "";
  let emailError = "";
  let messageError = "";

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (name.length < 3) nameError = errors.nameTooShort;
  else if (name.length > 20) nameError = errors.nameTooLong;

  if (!email.match(emailRegex)) emailError = errors.emailNotValid;

  if (message.length === 0) messageError = errors.messageEmpty;
  else if (message.length > 100) messageError = errors.messageTooLong;

  renderError("name", nameError);
  renderError("email", emailError);
  renderError("message", messageError);

  return (
    nameError.length === 0 &&
    emailError.length === 0 &&
    messageError.length === 0
  );
};

const addMessage = function (contactForm) {
  const name = contactForm.elements[0].value;
  const email = contactForm.elements[1].value;
  const message = contactForm.elements[2].value;

  data.main.messages.push(new Message(name, email, message));
};

// --- MESSAGES ---

const renderMessages = function (mainContainer) {
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
  renderMenu(".footer-menu");
  const footerEmail = document.querySelector(".email");
  footerEmail.innerText = data.footer.email;
  const footerPhone = document.querySelector(".phone");
  footerPhone.innerText = data.footer.tel;
  renderLogo(".footer-logo");
  const copyright = document.querySelector(".copyright");
  const copyrightMark = fa.copyright;
  copyright.innerHTML = `${copyrightMark}${data.footer.year}`;
};

initialRender();
