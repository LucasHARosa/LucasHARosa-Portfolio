import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
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

  const descricao =
    "Software Engineer Full-Stack com experiência em Back-end, Front-end e Mobile: Java, Spring Boot, Node.js, NestJS, Python, FastAPI, Go, React, Next.js e React Native.";

  return (
    <>
      <Helmet>
        <title>Lucas Henrique Alves Rosa | Software Engineer Full-Stack</title>
        <meta name="description" content={descricao} />
        <link rel="canonical" href="https://lucasrosa.dev.br/" />
        <meta
          property="og:title"
          content="Lucas Henrique Alves Rosa | Software Engineer Full-Stack"
        />
        <meta property="og:description" content={descricao} />
        <meta property="og:url" content="https://lucasrosa.dev.br/" />
      </Helmet>

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
