export interface AppData {
  id: string;
  name: string;
  icon: string;
  component: string;
  width?: string;
  height?: string;
}

export const apps: AppData[] = [
  {
    id: "aboutme",
    name: "About.exe",
    icon: "/about-D9v9xcI9.png",
    component: "AboutMe",
    width: "600px",
    height: "500px",
  },
  {
    id: "projects",
    name: "Projects.exe",
    icon: "/projects-C6UE3Nyt.png",
    component: "Projects",
    width: "700px",
    height: "600px",
  },
  {
    id: "education",
    name: "Education.exe",
    icon: "/study-_QY7xA8N.png",
    component: "Education",
    width: "600px",
    height: "500px",
  },
  {
    id: "skills",
    name: "Skills.exe",
    icon: "/skills-D7sIXfwV.png",
    component: "Skills",
    width: "650px",
    height: "550px",
  },
  {
    id: "artstudio",
    name: "ArtStudio.exe",
    icon: "/art-FQBZtpgU.png",
    component: "ArtStudio",
    width: "700px",
    height: "600px",
  },
  {
    id: "games",
    name: "Game.exe",
    icon: "/games-BNRAYpI8.png",
    component: "Games",
    width: "500px",
    height: "500px",
  },
  {
    id: "contactme",
    name: "LetsConnect.exe",
    icon: "/mail-7mUuGuLs.png",
    component: "ContactMe",
    width: "500px",
    height: "600px",
  },
  {
    id: "minimarket",
    name: "MiniMarket.exe",
    icon: "/clock-BA8_tesK.png",
    component: "MiniMarket",
    width: "450px",
    height: "400px",
  },
];
