import styled from "styled-components";

interface Props {
  type?: "button" | "submit" | "reset";
}

export const ButtonContainer = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  border: 1px solid
    ${({ theme, type }) => {
      switch (type) {
        case "button":
          return theme["Gray-800"];
        case "submit":
          return theme["white"];
        case "reset":
          return theme["Red-300"];
        default:
          return theme["Gray-700"];
      }
    }};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 400;
  white-space: nowrap;
  color: ${({ theme }) => theme["white"]};

  background-color: ${({ type, theme }) => {
    switch (type) {
      case "button":
        return theme["transparent"];
      case "submit":
        return theme["white"];
      case "reset":
        return theme["Red-300"];
      default:
        return theme["Gray-100"];
    }
  }};
  box-shadow: ${({ theme }) => theme["shadow-sm"]};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme["Gray-800"]};
    box-shadow: ${({ theme }) => theme["shadow-md"]};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
