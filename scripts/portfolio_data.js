import Message from "./utilities.js";

const data = {
  links: ["home", "projects", "about", "contact", "messages"],
  header: {
    logo: {
      common: "ITP",
      desktop: "ortfolio",
    },
    description: {
      home: {
        h1: "Jan Kowalski",
        p: "web-designer",
      },
      projects: {
        h1: "My Projects",
        p: "made with love",
      },
      about: {
        h1: "About Me",
        p: "it's a-me, Jan!",
      },
      contact: {
        h1: "Contact Me",
        p: "say hello to me",
      },
      messages: {
        h1: "Messages",
        p: "message from the interested person",
      },
    },
  },
  main: {
    home: {
      aboutMe: {
        photoUrl: "./../img/man.jpeg",
        h2: "About me",
        p: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit facilis assumenda asperiores, explicabo culpa quis delectus aliquid distinctio eos ratione sed, omnis ducimus excepturi placeat eaque cupiditate, cum nulla. Quis.",
      },
      skills: {
        h2: "My Skills",
        skillList: [
          {
            tech: "HTML",
            exp: 4,
          },
          {
            tech: "CSS",
            exp: 4,
          },
          {
            tech: "JavaScript",
            exp: 2,
          },
          {
            tech: "Figma",
            exp: 1,
          },
          {
            tech: "Java",
            exp: 3,
          },
          {
            tech: "VSCode",
            exp: 3,
          },
          {
            tech: "Git",
            exp: 4,
          },
          {
            tech: "GitHub",
            exp: 4,
          },
          {
            tech: "CPP",
            exp: 1,
          },
          {
            tech: "Linux",
            exp: 5,
          },
          {
            tech: "Bash",
            exp: 3,
          },
        ],
      },
    },
    projects: [
      {
        name: "Calculator",
        techs: ["HTML"],
      },
      {
        name: "Non-governmental organization",
        techs: ["HTML", "CSS"],
      },
      {
        name: "Dendrofonia",
        techs: ["Java (Processing)", "Pure-Data"],
      },
      {
        name: "Calculator program",
        techs: ["HTML", "CSS", "JavaScript"],
      },
    ],
    modal: {
      projectTitle: {
        label: "Project title:",
        placeholder: "Project title",
      },
      technologies: {
        label: "Technologies",
        placeholder: "html,css,javascript",
      },
    },
    aboutMe: {
      background: {
        h2: "My background",
        p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at dolor sem. Nam aliquet mi eget lacus laoreet, sit amet bibendum enim rhoncus. Etiam ex mi, finibus eget euismod non, lobortis sit amet orci. Aliquam sed mauris nibh. Quisque tempor suscipit sollicitudin. Praesent quis volutpat lorem. Etiam cursus interdum magna vitae dapibus. Morbi nunc dui, luctus vitae enim vitae, pretium sollicitudin diam. Proin tempor nulla odio. Duis sem urna, porttitor at hendrerit eget, molestie non est. Vivamus ullamcorper egestas finibus. Donec iaculis lacus non quam finibus, efficitur blandit leo vestibulum. Vivamus pellentesque consequat pharetra.",
      },
      hobbies: {
        h2: "My hobbies and interests",
        p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at dolor sem. Nam aliquet mi eget lacus laoreet, sit amet bibendum enim rhoncus. Etiam ex mi, finibus eget euismod non, lobortis sit amet orci. Aliquam sed mauris nibh. Quisque tempor suscipit sollicitudin. Praesent quis volutpat lorem. Etiam cursus interdum magna vitae dapibus. Morbi nunc dui, luctus vitae enim vitae, pretium sollicitudin diam. Proin tempor nulla odio. Duis sem urna, porttitor at hendrerit eget, molestie non est. Vivamus ullamcorper egestas finibus. Donec iaculis lacus non quam finibus, efficitur blandit leo vestibulum. Vivamus pellentesque consequat pharetra.",
      },
    },
    contact: {
      h2: "Contact me",
      name: {
        label: "Name",
        placeholder: "Your Name",
      },
      email: {
        label: "Email",
        placeholder: "email@example.com",
      },
      message: {
        label: "Message",
        placeholder: "Hello, my name is...",
      },
    },
    messages: [
      new Message(
        "Karol",
        "karol@email.com",
        "Hello, I've reviewed your impressive portfolio and am interested in discussing a potential collaboration. Please call me at 712-218-123 to talk further."
      ),
      new Message(
        "Ernest",
        "ernest@email.com",
        "Hello, Please call me at 351-152-555 to talk further."
      ),
      new Message(
        "Jan",
        "jan@email.com",
        "Welcome Jan. You created really nice project"
      ),
    ],
  },
  footer: {
    email: "jan_kowalski@gmail.com",
    tel: "+123 456 789",
    logo: "ITPortfolio",
    year: 2024,
  },
};

export default data;
