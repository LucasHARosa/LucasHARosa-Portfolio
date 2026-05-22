import { ChatCircle, Heart, PaperPlaneTilt } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import foto from "../../assets/foto.png";
import {
  Container,
  ContainerAbout,
  ContainerAboutImage,
  ContainerAboutText,
  Interact,
  LegendImage,
  SectionDescription,
  SectionHeader,
  SectionLabel,
  SectionTitle,
} from "./styles";

import { animated, to, useSpring, useTrail } from "@react-spring/web";
import { PiArrowBendRightDown } from "react-icons/pi";
import { useGesture } from "react-use-gesture";

export function About() {
  const domTarget = useRef<HTMLDivElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const [textVisible, setTextVisible] = useState(false);

  const calcX = (y: number) => {
    if (!domTarget.current) return;
    const cardRect = domTarget.current.getBoundingClientRect();
    const centery = (cardRect.top + cardRect.bottom) / 2;
    return -(y - centery) / 85;
  };

  const calcY = (x: number) => {
    if (!domTarget.current) return;
    const cardRect = domTarget.current.getBoundingClientRect();
    const centerx = (cardRect.left + cardRect.right) / 2;
    return (x - centerx) / 85;
  };

  const [{ x, y, rotateX, rotateY, rotateZ, scale, zoom }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      x: 0,
      y: 0,
      scale: 1,
      zoom: 0,
      config: { mass: 10, tension: 500, friction: 40 },
    }),
  );

  useGesture(
    {
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py),
          rotateY: calcY(px),
          scale: 1.05,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { domTarget, eventOptions: { passive: false } },
  );

  const trail = useTrail(3, {
    from: { opacity: 0, y: 50 },
    to: textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 200,
  });

  useEffect(() => {
    // Create an Intersection Observer to detect when the text section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTextVisible(true);
          }
        });
      },
      { threshold: 0.2 }, // Trigger when 20% of the element is visible
    );

    if (textSectionRef.current) {
      observer.observe(textSectionRef.current);
    }

    return () => {
      if (textSectionRef.current) {
        observer.unobserve(textSectionRef.current);
      }
    };
  }, []);

  return (
    <Container id="SobreMim">
      <SectionHeader>
        <SectionLabel>Sobre mim</SectionLabel>
        <SectionTitle>Lucas Henrique Alves Rosa</SectionTitle>
        <SectionDescription>
          Desenvolvedor Full Stack • Transformando ideias em código
        </SectionDescription>
      </SectionHeader>
      <ContainerAbout>
        <span>
          <Interact>
            <p>Interaja aqui</p>
            <PiArrowBendRightDown size={15} style={{ marginLeft: 2 }} />
          </Interact>
          <animated.div
            ref={domTarget}
            style={{
              x,
              y,
              transform: "perspective(600px)",
              scale: to([scale, zoom], (s, z) => s + z),
              rotateX,
              rotateY,
              rotateZ,
              zIndex: 100,
            }}
          >
            <ContainerAboutImage>
              <img src={foto} alt="" />
              <LegendImage>
                <Heart size={24} weight="fill" color="#e52e4d" />
                <ChatCircle size={24} color="#FFF" />
                <PaperPlaneTilt size={24} color="#FFF" />
              </LegendImage>
            </ContainerAboutImage>
          </animated.div>
        </span>
        <ContainerAboutText ref={textSectionRef}>
          <div>
            {trail.map((style, index) => (
              <animated.p key={index} style={style}>
                {index === 0 &&
                  "Prazer! Sou Engenheiro Mecatrônico pela UnB e Desenvolvedor Full Stack com foco em back-end. Tenho experiência sólida na construção de APIs REST escaláveis, integrações com serviços externos, automações de processos e arquitetura de sistemas utilizando Node.js, NestJS, FastAPI, Python e Java — além de aplicações web com React e Next.js e mobile com React Native."}
                {index === 1 &&
                  "Ao longo da minha trajetória, atuei em projetos reais de fintech, energia, logística, esportes e sistemas industriais — sempre com responsabilidade sobre regras de negócio, modelagem de banco de dados, performance e segurança. Tenho experiência também com automações com IA, N8N, OCR, WebSockets e SSE, e base técnica em sistemas embarcados e IoT."}
                {index === 2 &&
                  "Se você busca um desenvolvedor que vá além do código e pense em arquitetura, escalabilidade e resultado para o negócio, estou disponível. Prefiro desafios voltados a back-end, integrações e APIs — mas estou pronto para entregar soluções completas de ponta a ponta."}
              </animated.p>
            ))}
          </div>
        </ContainerAboutText>
      </ContainerAbout>
    </Container>
  );
}
