import { Variants, motion } from "framer-motion";
import { List, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ButtonAnimationHover } from "../ButtonAnimationHover";
import { ParticleLight } from "../Particles/particleLight";
import { ParticleAmong } from "../Particles/particlesAmong";
import { ParticleSnow } from "../Particles/particleSnow";
import { ParticleStar } from "../Particles/particleStar";
import {
  HeaderButton,
  HeaderContainer,
  HeaderContent,
  HeaderNav,
  HeaderNavMobile,
  NavLi,
} from "./styles";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export function Header() {
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState("stars");
  const [activeSection, setActiveSection] = useState("Home");
  const location = useLocation();

  function handleTheme() {
    if (theme === "stars") {
      setTheme("snow");
    } else if (theme === "snow") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("among");
    } else if (theme === "among") {
      setTheme("stars");
    }
  }

  const isProjectsPage = location.pathname === "/projetos";

  const dataHeader = [
    {
      id: 1,
      name: "Início",
      link: isProjectsPage ? "/" : "#Home",
      section: "Home",
      isRoute: isProjectsPage,
    },
    {
      id: 2,
      name: "Sobre mim",
      link: isProjectsPage ? "/#SobreMim" : "#SobreMim",
      section: "SobreMim",
      isRoute: isProjectsPage,
    },
    {
      id: 3,
      name: isProjectsPage ? "Voltar ao Início" : "Ver Projetos",
      link: isProjectsPage ? "/" : "/projetos",
      section: "Projetos",
      isRoute: true,
    },
    {
      id: 4,
      name: "Habilidades",
      link: isProjectsPage ? "/#Skills" : "#Skills",
      section: "Skills",
      isRoute: isProjectsPage,
    },

    {
      id: 6,
      name: "Educação",
      link: isProjectsPage ? "/#Educacao" : "#Educacao",
      section: "Educacao",
      isRoute: isProjectsPage,
    },
    {
      id: 7,
      name: "Contato",
      link: isProjectsPage ? "/#Contato" : "#Contato",
      section: "Contato",
      isRoute: isProjectsPage,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "Home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
          currentSection = section.id || "Home";
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <HeaderNav>
            <ul>
              {dataHeader.map((item) => (
                <li
                  key={item.id}
                  className={
                    item.isRoute
                      ? location.pathname === item.link
                        ? "active"
                        : ""
                      : activeSection === item.section
                        ? "active"
                        : ""
                  }
                >
                  <ButtonAnimationHover
                    text={item.name}
                    link={item.link}
                    active={
                      item.isRoute
                        ? location.pathname === item.link
                        : activeSection === item.section
                    }
                    isRoute={item.isRoute}
                  />
                </li>
              ))}
              <li>
                <ButtonAnimationHover
                  handleTheme={handleTheme}
                  text="Mudar fundo"
                  icon
                />
              </li>
            </ul>
          </HeaderNav>

          <HeaderButton onClick={() => setMenu(!menu)}>
            <a href="#Home">
              <img src="/lr.svg" alt="" />
            </a>

            {menu ? <X size={24} /> : <List size={24} />}
          </HeaderButton>

          <HeaderNavMobile initial={false} animate={menu ? "open" : "closed"}>
            <motion.ul
              variants={{
                open: {
                  clipPath: "inset(0% 0% 0% 0% round 10px)",
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.5,
                    delayChildren: 0.3,
                    staggerChildren: 0.05,
                  },
                },
                closed: {
                  clipPath: "inset(10% 20% 90% 80% round 10px)",
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.3,
                  },
                },
              }}
              style={{ pointerEvents: menu ? "auto" : "none" }}
            >
              {dataHeader.map((item) => (
                <NavLi
                  key={item.id}
                  variants={itemVariants}
                  className={
                    item.isRoute
                      ? location.pathname === item.link
                        ? "active"
                        : ""
                      : activeSection === item.section
                        ? "active"
                        : ""
                  }
                >
                  <ButtonAnimationHover
                    text={item.name}
                    link={item.link}
                    mobile={true}
                    active={
                      item.isRoute
                        ? location.pathname === item.link
                        : activeSection === item.section
                    }
                    isRoute={item.isRoute}
                  />
                </NavLi>
              ))}
              <NavLi variants={itemVariants}>
                <ButtonAnimationHover
                  handleTheme={handleTheme}
                  text="Mudar fundo"
                />
              </NavLi>
            </motion.ul>
          </HeaderNavMobile>
        </HeaderContent>
      </HeaderContainer>
      {theme === "stars" && <ParticleStar />}
      {theme === "snow" && <ParticleSnow />}
      {theme === "light" && <ParticleLight />}
      {theme === "among" && <ParticleAmong />}
    </>
  );
}
