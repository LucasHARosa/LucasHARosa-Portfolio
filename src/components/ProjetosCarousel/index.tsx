"use client";

import {
  motion,
  MotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  AppleLogo,
  ArrowRight,
  CaretLeft,
  CaretRight,
  GithubLogo,
  GooglePlayLogo,
} from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";

import { ProjetosProps } from "../../data/data";
import {
  AutoScrollIndicator,
  ButtonsContainer,
  CarouselContainer,
  CarouselImage,
  CarouselImageContainer,
  CarouselItemWrapper,
  CarouselTag,
  ContentContainer,
  IconButton,
  ImageOverlay,
  MobileNavButton,
  MobileNavRow,
  NavigationButton,
  PaginationContainer,
  PaginationDot,
  PrimaryButton,
  ProjectDescription,
  ProjectTitle,
  ScrollContainer,
  SecondaryButton,
  TagsContainer,
  VerMaisButton,
} from "./styles";

interface ProjectCarouselProps {
  projects: ProjetosProps[];
}

const CARD_WIDTH_DESKTOP = 800;
const GAP = 20;

interface CarouselItemProps {
  project: ProjetosProps;
  index: number;
  scrollX: MotionValue<number>;
  cardWidth: number;
  onClick: () => void;
  isMobile: boolean;
  isExpanded: boolean;
  onExpandToggle: () => void;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  project,
  index,
  scrollX,
  cardWidth,
  onClick,
  isMobile,
  isExpanded,
  onExpandToggle,
}) => {
  const itemWidth = cardWidth + GAP;
  const position = index * itemWidth;
  const [isCentered, setIsCentered] = useState(index === 1);

  // Input range para transições baseadas no scroll
  const inputRange = [position - itemWidth, position, position + itemWidth];

  // Escala suave baseada no scroll
  const scale = useTransform(scrollX, inputRange, [0.85, 1.2, 0.85]);

  // Grayscale e blur apenas para itens não centrais
  const grayscale = useTransform(scrollX, inputRange, [0.7, 0, 0.7]);
  const blur = useTransform(scrollX, inputRange, [1.5, 0, 1.5]);

  // Z-index para garantir que o item central fique por cima
  const zIndex = useTransform(scrollX, inputRange, [1, 20, 1]);

  const filter = useMotionTemplate`grayscale(${grayscale}) blur(${blur}px)`;

  // Content visibility
  const contentInputRange = [
    position - itemWidth * 0.5,
    position,
    position + itemWidth * 0.5,
  ];
  const contentOpacity = useTransform(scrollX, contentInputRange, [0, 1, 0]);
  const contentY = useTransform(scrollX, inputRange, [15, 0, 15]);

  const contentPointerEvents = useTransform(scrollX, (value) => {
    const diff = Math.abs(value - position);
    // No mobile, sempre permitir eventos de toque para não bloquear o swipe
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return "auto";
    return diff < itemWidth * 0.4 ? "auto" : "none";
  });

  // Detecta se o card está centralizado
  useEffect(() => {
    const unsubscribe = scrollX.on("change", (value) => {
      const diff = Math.abs(value - position);
      setIsCentered(diff < itemWidth * 0.4);
    });
    return unsubscribe;
  }, [scrollX, position, itemWidth]);

  return (
    <CarouselItemWrapper cardWidth={cardWidth} gap={GAP}>
      {/* Image Container */}
      <motion.div
        onClick={onClick}
        initial={{ opacity: index === 1 ? 1 : 0.5 }}
        animate={{
          opacity: isCentered ? 1 : 0.5,
        }}
        style={{
          scale,
          filter,
          width: "100%",
          zIndex,
          position: "relative",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <CarouselImageContainer>
          <CarouselImage
            src={project.imagem}
            alt={project.titulo}
            loading="lazy"
          />
          <ImageOverlay />
        </CarouselImageContainer>
      </motion.div>

      {/* Content Container */}
      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY,
          pointerEvents: contentPointerEvents as any,
          width: "100%",
          touchAction: "pan-x",
        }}
      >
        <ContentContainer>
          <TagsContainer>
            {project.tags.slice(0, 3).map((tag, idx) => (
              <CarouselTag key={idx}>{tag}</CarouselTag>
            ))}
          </TagsContainer>

          <ProjectTitle>{project.titulo}</ProjectTitle>

          <ProjectDescription $expanded={isExpanded}>
            {project.descricao}
          </ProjectDescription>

          {isMobile && !isExpanded && (
            <VerMaisButton onClick={onExpandToggle}>Ver mais</VerMaisButton>
          )}

          <ButtonsContainer>
            {project.Link && (
              <PrimaryButton
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visitar Site <ArrowRight size={18} weight="bold" />
              </PrimaryButton>
            )}
            {project.LinkGitFront && (
              <SecondaryButton
                href={project.LinkGitFront}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubLogo size={18} /> Frontend
              </SecondaryButton>
            )}
            {project.LinkGitBack && (
              <SecondaryButton
                href={project.LinkGitBack}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubLogo size={18} /> Backend
              </SecondaryButton>
            )}
            {project.LinkGit && !project.LinkGitFront && !project.LinkGitBack && (
              <SecondaryButton
                href={project.LinkGit}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubLogo size={18} /> Código
              </SecondaryButton>
            )}
            {project.LinkGoogle && (
              <IconButton
                href={project.LinkGoogle}
                target="_blank"
                rel="noopener noreferrer"
                className="google-play"
                title="Google Play"
              >
                <GooglePlayLogo size={20} weight="fill" />
              </IconButton>
            )}
            {project.LinkApple && (
              <IconButton
                href={project.LinkApple}
                target="_blank"
                rel="noopener noreferrer"
                className="app-store"
                title="App Store"
              >
                <AppleLogo size={20} weight="fill" />
              </IconButton>
            )}
          </ButtonsContainer>
        </ContentContainer>
      </motion.div>
    </CarouselItemWrapper>
  );
};

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollX } = useScroll({ container: containerRef });

  const [cardWidth, setCardWidth] = useState(CARD_WIDTH_DESKTOP);
  const [padding, setPadding] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1); // Começa no segundo item
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      const width = mobile
        ? window.innerWidth * 0.85
        : Math.min(window.innerWidth * 0.7, CARD_WIDTH_DESKTOP);
      setCardWidth(width);
      const containerW = containerRef.current?.offsetWidth || window.innerWidth;
      setPadding((containerW - width) / 2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detecta visibilidade do carrossel
  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Inicializa no segundo card
  useEffect(() => {
    if (containerRef.current && cardWidth > 0 && padding > 0) {
      const timer = setTimeout(() => {
        scrollToIndex(1, false); // Sem animação no início
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [cardWidth, padding]);

  // Auto-scroll
  useEffect(() => {
    if (!isAutoScrolling || !isVisible) return; // Só roda quando visível

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % projects.length;
        scrollToIndex(next);
        return next;
      });
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoScrolling, isVisible, projects.length]);

  const scrollToIndex = (index: number, smooth: boolean = true) => {
    if (containerRef.current) {
      const itemWidth = cardWidth + GAP;
      containerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    const nextIndex = (currentIndex + 1) % projects.length;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    setIsAutoScrolling(false);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(prevIndex);
    scrollToIndex(prevIndex);
  };

  const handleDotClick = (index: number) => {
    setIsAutoScrolling(false);
    setCurrentIndex(index);
    scrollToIndex(index);
  };

  // Detecta scroll manual
  const handleScroll = () => {
    if (containerRef.current) {
      const itemWidth = cardWidth + GAP;
      const scrollLeft = containerRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        setIsAutoScrolling(false);
      }
    }
  };

  // Para auto-scroll ao tocar/arrastar
  const handleTouchStart = () => {
    setIsAutoScrolling(false);
  };

  const handleMouseDown = () => {
    setIsAutoScrolling(false);
  };

  return (
    <CarouselContainer ref={carouselRef}>
      {/* Navigation Buttons - Visible on Desktop/Hover */}
      <NavigationButton
        direction="left"
        onClick={handlePrev}
        aria-label="Projeto Anterior"
      >
        <CaretLeft size={28} weight="bold" />
      </NavigationButton>

      <NavigationButton
        direction="right"
        onClick={handleNext}
        aria-label="Próximo Projeto"
      >
        <CaretRight size={28} weight="bold" />
      </NavigationButton>

      {/* Main Container */}
      <ScrollContainer
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        paddingLeft={padding}
        paddingRight={padding}
      >
        {projects.map((project, index) => (
          <CarouselItem
            key={project.id}
            project={project}
            index={index}
            scrollX={scrollX}
            cardWidth={cardWidth}
            isMobile={isMobile}
            isExpanded={expandedDescriptions.has(index)}
            onExpandToggle={() =>
              setExpandedDescriptions((prev) => {
                const next = new Set(prev);
                next.has(index) ? next.delete(index) : next.add(index);
                return next;
              })
            }
            onClick={() => {
              setIsAutoScrolling(false);
              scrollToIndex(index);
              setCurrentIndex(index);
            }}
          />
        ))}
      </ScrollContainer>

      {/* Pagination Dots — desktop */}
      <PaginationContainer>
        {projects.map((_, i) => (
          <PaginationDot
            key={i}
            isActive={i === currentIndex}
            onClick={() => handleDotClick(i)}
            aria-label={`Ir para projeto ${i + 1}`}
          />
        ))}
      </PaginationContainer>

      {/* Mobile nav: setas + dots em linha */}
      <MobileNavRow>
        <MobileNavButton onClick={handlePrev} aria-label="Projeto Anterior">
          <CaretLeft size={16} weight="bold" />
        </MobileNavButton>
        {projects.map((_, i) => (
          <PaginationDot
            key={i}
            isActive={i === currentIndex}
            onClick={() => handleDotClick(i)}
            aria-label={`Ir para projeto ${i + 1}`}
          />
        ))}
        <MobileNavButton onClick={handleNext} aria-label="Próximo Projeto">
          <CaretRight size={16} weight="bold" />
        </MobileNavButton>
      </MobileNavRow>

      {/* Auto-scroll indicator */}
      {isAutoScrolling && (
        <AutoScrollIndicator>
          Rolagem automática ativa • Toque para pausar
        </AutoScrollIndicator>
      )}
    </CarouselContainer>
  );
};

export default ProjectCarousel;
