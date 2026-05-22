import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { About } from "../../components/About";

import { Contact } from "../../components/Contact";
import { Education } from "../../components/Education";
import { Experience } from "../../components/Experience";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Intro } from "../../components/Intro";
import { ProjectsRating } from "../../components/ProjectsRating";
import { Skills } from "../../components/Skills";

export function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [location.hash]);

  return (
    <>
      <Header />
      <Intro />
      <About />
      <ProjectsRating />
      <Skills />
      <Experience />
      <Education />
      {/* <MainProjetos /> */}
      <Contact />
      <Footer />
    </>
  );
}
