import { Variants, motion } from "framer-motion";
import { List, X } from "phosphor-react";
import { useEffect, useState } from "react";
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
  const [theme, setTheme] = useState("among");
  const [activeSection, setActiveSection] = useState("Home");

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

  const dataHeader = [
    {
      id: 1,
      name: "Início",
      link: "#Home",
      section: "Home",
    },
    {
      id: 2,
      name: "Sobre mim",
      link: "#SobreMim",
      section: "SobreMim",
    },
    {
      id: 3,
      name: "Projetos",
      link: "#Projetos",
      section: "Projetos",
    },
    {
      id: 4,
      name: "Habilidades",
      link: "#Skills",
      section: "Skills",
    },
    {
      id: 5,
      name: "Experiência",
      link: "#Experiencia",
      section: "Experiencia",
    },
    {
      id: 6,
      name: "Educação",
      link: "#Educacao",
      section: "Educacao",
    },

    {
      id: 7,
      name: "Contato",
      link: "#Contato",
      section: "Contato",
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
                  className={activeSection === item.section ? "active" : ""}
                >
                  <ButtonAnimationHover
                    text={item.name}
                    link={item.link}
                    active={activeSection === item.section}
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
                  className={activeSection === item.section ? "active" : ""}
                >
                  <ButtonAnimationHover
                    text={item.name}
                    link={item.link}
                    mobile={true}
                    active={activeSection === item.section}
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
