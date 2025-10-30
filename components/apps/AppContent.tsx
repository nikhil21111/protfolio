"use client";

import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Education from "./Education";
import Skills from "./Skills";
import ArtStudio from "./ArtStudio";
import Games from "./Games";
import ContactMe from "./ContactMe";
import MiniMarket from "./MiniMarket";
import Music from "./Music";

interface AppContentProps {
  appId: string;
  userName: string;
}

export default function AppContent({ appId, userName }: AppContentProps) {
  const appComponents: Record<string, JSX.Element> = {
    aboutme: <AboutMe userName={userName} />,
    projects: <Projects />,
    education: <Education />,
    skills: <Skills />,
    artstudio: <ArtStudio />,
    games: <Games />,
    contactme: <ContactMe />,
    minimarket: <MiniMarket />,
    music: <Music />,
  };

  return appComponents[appId] || <div className="p-4">App not found</div>;
}
