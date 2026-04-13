import styled from "styled-components";

// Container principal do carrossel
export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;

  &:hover button {
    opacity: 1;
  }
`;

// Botões de navegação
interface NavigationButtonProps {
  direction?: "left" | "right";
}

export const NavigationButton = styled.button<NavigationButtonProps>`
  position: absolute;
  ${({ direction }) => (direction === "left" ? "left: 1rem;" : "right: 1rem;")}
  top: 33.333%;
  transform: translateY(-50%);
  z-index: 30;
  padding: 0.5rem;
  border-radius: 30%;
  background-color: ${({ theme }) => theme["white"]};
  border: none;
  color: ${({ theme }) => theme["Gray-900"]};
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    background-color 0.2s ease;
  backdrop-filter: blur(4px);
  box-shadow: ${({ theme }) => theme["shadow-xl"]};
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: opacity, transform;
  touch-action: manipulation;

  &:hover {
    background-color: ${({ theme }) => theme["Gray-300"]};
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(1.05);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// Container do scroll horizontal
export const ScrollContainer = styled.div<{
  paddingLeft: number;
  paddingRight: number;
}>`
  display: flex;
  overflow-x: auto;
  overflow-y: visible;
  scroll-snap-type: x mandatory;
  padding-bottom: 3rem;
  padding-top: 2.5rem;
  padding-left: ${({ paddingLeft }) => paddingLeft}px;
  padding-right: ${({ paddingRight }) => paddingRight}px;
  cursor: grab;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;

  /* Espaço extra para permitir escala sem cortar */
  margin: 0 -1rem;
  padding-left: calc(${({ paddingLeft }) => paddingLeft}px + 1rem);
  padding-right: calc(${({ paddingRight }) => paddingRight}px + 1rem);

  &:active {
    cursor: grabbing;
  }

  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding-top: 1.5rem;
    padding-bottom: 2rem;
    cursor: default;
  }
`;

// Wrapper do item do carrossel
export const CarouselItemWrapper = styled.div<{
  cardWidth: number;
  gap: number;
}>`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-align: center;
  position: relative;
  width: ${({ cardWidth }) => cardWidth}px;
  margin-right: ${({ gap }) => gap}px;

  /* Garantir que o item tenha espaço para a escala */
  padding: 1rem 0;

  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
`;

// Container da imagem com bordas e sombras
export const CarouselImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme["shadow-xl"]};
  background-color: ${({ theme }) => theme["Gray-900"]};
  border: none;
  transition: opacity 0.2s ease;
  cursor: pointer;
  will-change: opacity;

  &:hover {
    border-color: none;
    opacity: 0.9;
  }
`;

// Imagem do projeto
export const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Overlay com gradiente sobre a imagem
export const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme["Gray-900"]}99,
    transparent,
    transparent
  );
  pointer-events: none;
`;

// Container do conteúdo (texto e botões)
export const ContentContainer = styled.div`
  margin-top: 5rem;
  text-align: center;
  max-width: 52rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding: 0 0.5rem;
  }
`;

// Container das tags
export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

// Tag individual
export const CarouselTag = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.06);
  color: ${({ theme }) => theme["Gray-300"]};
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  backdrop-filter: blur(4px);
  box-shadow: ${({ theme }) => theme["shadow-lg"]};
  opacity: 0.9;
`;

// Título do projeto
export const ProjectTitle = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
  margin-bottom: 1rem;
  line-height: 1.1;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.875rem;
  }
`;

// Descrição do projeto
export const ProjectDescription = styled.p`
  color: ${({ theme }) => theme["Gray-300"]};
  font-size: 1.125rem;
  margin-bottom: 2rem;
  line-height: 1.75;
  max-width: 42rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Container dos botões de ação
export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

// Botão primário (visitar site)
export const PrimaryButton = styled.a`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme["Gray-900"]};
  background-color: ${({ theme }) => theme["white"]};
  border: none;
  box-shadow: ${({ theme }) => theme["shadow-sm"]};
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
  will-change: transform;

  &:hover {
    background-color: ${({ theme }) => theme["Gray-300"]};
    box-shadow: ${({ theme }) => theme["shadow-md"]};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.375rem 1rem;
    gap: 0.25rem;
  }
`;

// Botão secundário (GitHub, etc)
export const SecondaryButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme["Gray-900"]};
  color: ${({ theme }) => theme.white};
  border: 2px solid ${({ theme }) => theme["Gray-700"]};
  border-radius: 9999px;
  font-weight: 700;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
  box-shadow: ${({ theme }) => theme["shadow-lg"]};
  text-decoration: none;
  cursor: pointer;
  will-change: transform;

  &:hover {
    background-color: ${({ theme }) => theme["Gray-800"]};
    border-color: ${({ theme }) => theme["Gray-600"]};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1.02);
  }
`;

// Botão circular para ícones (Google Play, App Store)
export const IconButton = styled.a`
  padding: 1rem;
  background-color: ${({ theme }) => theme["Gray-800"]};
  color: ${({ theme }) => theme.white};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme["Gray-700"]};
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
  box-shadow: ${({ theme }) => theme["shadow-lg"]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  will-change: transform;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.05);
  }

  &.google-play:hover {
    background-color: ${({ theme }) => theme["Green-600"]};
    border-color: ${({ theme }) => theme["Green-600"]};
  }

  &.app-store:hover {
    background-color: ${({ theme }) => theme["Gray-200"]};
    color: ${({ theme }) => theme["Gray-900"]};
    border-color: ${({ theme }) => theme["Gray-300"]};
  }
`;

// Container da paginação (dots)
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  z-index: 25;
  
  padding: 0.5rem;

  @media (max-width: 768px) {
    margin-top: 0rem;
    padding: 0rem;
`;

// Dot de paginação
interface PaginationDotProps {
  isActive?: boolean;
}

export const PaginationDot = styled.button<PaginationDotProps>`
  border-radius: 9999px;
  transition:
    width 0.3s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
  border: none;
  padding: 0;
  width: ${({ isActive }) => (isActive ? "3rem" : "0.75rem")};
  height: 0.75rem;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme["Blue-400"] : theme["Gray-700"]};
  box-shadow: ${({ isActive }) =>
    isActive ? "0 0 15px rgba(96, 165, 250, 0.8)" : "none"};
  will-change: width;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: ${({ theme, isActive }) =>
      isActive ? theme["Blue-400"] : theme["Gray-600"]};
  }

  @media (max-width: 768px) {
    min-width: ${({ isActive }) => (isActive ? "2rem" : "1.5rem")};
    min-height: 1.5rem;
  }
`;

// Indicador de auto-scroll
export const AutoScrollIndicator = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: ${({ theme }) => theme["Gray-500"]};
  font-size: 0.875rem;
  position: relative;
  z-index: 15;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-top: 0.5rem;
  }
`;
