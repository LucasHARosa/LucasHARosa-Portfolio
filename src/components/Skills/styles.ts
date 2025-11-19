import { motion } from "framer-motion";
import styled from "styled-components";

export const ContainerSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  padding: 6rem 10vw;
  gap: 3rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 5vw;
    gap: 2rem;
    align-items: center;
  }
`;

export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme["Blue-100"]};

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

export const ContainerTechs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4rem;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 768px) {
    gap: 2rem;
    flex-direction: column;
    align-items: center;
  }
`;

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme["Blue-400"]};
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 180px;
    height: 180px;
    opacity: 0.8;

    @media (max-width: 1000px) {
      width: 160px;
      height: 160px;
    }

    @media (max-width: 768px) {
      width: 100px;
      height: 100px;
    }
  }
`;

export const Techs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.75rem;
  gap: 1rem;
  width: 50%;
  height: auto;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme["Gray-800"]},
    ${({ theme }) => theme["Blue-300-opacity"]}
  );
  box-shadow: ${({ theme }) => theme["shadow-lg"]};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme["shadow-xl"]};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
    gap: 2rem;
  }
`;

export const TechsLogo = styled(motion.div)`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: transform, opacity;

  @media (max-width: 1000px) {
    height: 160px;
  }

  @media (max-width: 768px) {
    height: 100px;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  overflow-x: auto;
  padding: 0.5rem;

  /* Hide scrollbar but allow scrolling */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

interface ButtonProps {
  active: boolean;
}

export const ButtonSkill = styled.button<ButtonProps>`
  border: none;
  cursor: pointer;
  background: none;
  transition: all 0.2s ease-in-out;
  color: ${({ theme, active }) =>
    active ? theme["Blue-400"] : theme["Gray-400"]};
  padding: 0.5rem;
  border-radius: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme["Blue-200"]};
    background-color: ${({ theme }) => theme["Blue-Gray-600"]};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TechsDescription = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  padding: 1rem;
  min-height: 400px;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    width: 100%;
    min-height: 350px;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme["Gray-100"]};

    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  }

  div {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme["Gray-300"]};
  }
`;

export const Text = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  color: ${({ theme }) => theme["Gray-400"]};
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const BarProgress = styled.div`
  width: 300px;
  border-radius: 0.5rem;
  height: 0.5rem;
  background: ${({ theme }) => theme["Blue-Gray-700"]};
  overflow: hidden;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

export const Space = styled.div`
  width: 100%;
  height: 1.5rem;
`;

export const Progress = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center
    gap: 0.5rem;
  }
`;

export const TextProgress = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme["Gray-300"]};
`;
