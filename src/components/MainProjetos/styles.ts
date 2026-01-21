import styled from "styled-components";

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 6rem 10vw;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 5vw;
    gap: 1.5rem;
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const ContainerButtonSelect = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;

  /* Hide scrollbar but allow scrolling */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

interface ButtonSelectProps {
  isActive?: boolean;
}

export const ButtonSelect = styled.button<ButtonSelectProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  min-width: 160px;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 400;
  transition: all 0.2s ease-in-out;
  cursor: ${({ isActive }) => (isActive ? "default" : "pointer")};
  color: ${({ theme }) => theme["Blue-100"]};
  border: 1px solid
    ${({ theme, isActive }) =>
      isActive ? theme["Gray-700"] : theme["Gray-800"]};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme["Gray-800"] : "transparent"};
  box-shadow: ${({ theme, isActive }) =>
    isActive ? theme["shadow-md"] : "none"};

  @media (max-width: 768px) {
    min-width: 120px;
    padding: 0.625rem 0.75rem;
    font-size: 0.75rem;
  }

  &:hover {
    background-color: ${({ theme, isActive }) =>
      isActive ? theme["Gray-600"] : theme["Gray-800"]};
    border-color: ${({ theme }) => theme["Gray-800"]};
    transform: ${({ isActive }) => (isActive ? "none" : "translateY(-2px)")};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    color: ${({ theme }) => theme["Blue-100"]};
    font-size: 2.5rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

export const ContainerProjetos = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const ViewAllContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 3rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

export const ViewAllButton = styled.button`
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
  transition: all 0.2s ease-in-out;

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
