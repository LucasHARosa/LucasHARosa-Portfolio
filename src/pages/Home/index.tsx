import { About } from "../../components/About";

import { Contact } from "../../components/Contact";
import { Education } from "../../components/Education";
import { Experience } from "../../components/Experience";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Intro } from "../../components/Intro";
import { MainProjetos } from "../../components/MainProjetos";
import { ProjectsRating } from "../../components/ProjectsRating";
import { Skills } from "../../components/Skills";

export function Home() {
  return (
    <>
      <Header />
      <Intro />
      <About />
      <ProjectsRating />
      <Skills />
      <Experience />
      <Education />
      <MainProjetos />
      <Contact />
      <Footer />
    </>
  );
}
