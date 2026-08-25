import Typewriter from "typewriter-effect";

import {
  Envelope,
  FolderOpen,
  GithubLogo,
  Globe,
  LinkedinLogo,
} from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { PiArrowBendRightDown, PiArrowDown } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { Tag } from "../Tag";
import { SpaceScene } from "./SpaceScene";
import {
  IntroButtons,
  IntroContainer,
  IntroContent,
  RoleTitle,
  ScrollIndicator,
  SecondaryLink,
  Space3DContainer,
  TypeWriterText,
} from "./styles";

export function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      if (containerRef.current) {
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        setMousePosition({ x, y });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section id="Home">
      <IntroContainer>
        <IntroContent>
          <Tag>Hello!</Tag>
          <h1>Lucas Rosa</h1>
          <RoleTitle>Software Engineer | Full-Stack</RoleTitle>
          <TypeWriterText>
            <Typewriter
              options={{
                strings: [
                  "Java · Spring Boot",
                  "Node.js · NestJS",
                  "Python · FastAPI · Django",
                  "Go",
                  "React · Next.js",
                  "React Native · Expo",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
              }}
            />
          </TypeWriterText>

          <IntroButtons>
            <Link to="/projetos">
              <Button>
                <FolderOpen size={22} />
                Projetos
              </Button>
            </Link>
            <a
              href="https://github.com/LucasHARosa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <GithubLogo size={22} />
                Github
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/lucas-henrique-alves-rosa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <LinkedinLogo size={22} />
                Linkedin
              </Button>
            </a>
            <a href="#Contato">
              <Button>
                <Envelope size={22} />
                Contato
              </Button>
            </a>
          </IntroButtons>
          <SecondaryLink
            href="https://bbs.lucasrosa.dev.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe size={16} />
            Portfolio BBS
          </SecondaryLink>
        </IntroContent>
        <Space3DContainer>
          <span>
            <p>Interaja aqui</p>
            <PiArrowBendRightDown size={15} style={{ marginLeft: 2 }} />
          </span>
          {isMounted && <SpaceScene mousePosition={mousePosition} />}
        </Space3DContainer>

        <ScrollIndicator>
          <PiArrowDown size={18} />
          Role para ver mais
        </ScrollIndicator>
      </IntroContainer>
    </section>
  );
}
