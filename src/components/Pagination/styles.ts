import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
  padding: 2rem 0;

  @media (max-width: 768px) {
    gap: 0.375rem;
    margin-top: 2rem;
    padding: 1.5rem 0;
  }
`;

interface PaginationButtonProps {
  isActive?: boolean;
  disabled?: boolean;
}

export const PaginationButton = styled.button<PaginationButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid
    ${({ theme, isActive }) =>
      isActive ? theme["Blue-500"] : theme["Gray-700"]};
  background: ${({ theme, isActive }) =>
    isActive ? theme["Blue-500"] : "transparent"};
  color: ${({ theme, isActive }) =>
    isActive ? "white" : theme["Blue-100"]};
  font-size: 0.875rem;
  font-weight: ${({ isActive }) => (isActive ? "600" : "400")};
  cursor: ${({ isActive, disabled }) =>
    disabled ? "not-allowed" : isActive ? "default" : "pointer"};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme, isActive, disabled }) =>
      disabled ? "transparent" : isActive ? theme["Blue-500"] : theme["Gray-800"]};
    border-color: ${({ theme, disabled }) =>
      disabled ? theme["Gray-700"] : theme["Blue-500"]};
    transform: ${({ isActive, disabled }) =>
      disabled || isActive ? "none" : "translateY(-2px)"};
  }

  &:active {
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(0)")};
  }

  @media (max-width: 768px) {
    min-width: 2.25rem;
    height: 2.25rem;
    font-size: 0.8125rem;
  }
`;

export const PaginationArrow = styled(PaginationButton)`
  gap: 0.375rem;

  @media (max-width: 768px) {
    min-width: auto;
    padding: 0 0.5rem;

    span {
      display: none;
    }
  }
`;

export const PaginationEllipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme["Gray-400"]};
  font-size: 0.875rem;
  user-select: none;

  @media (max-width: 768px) {
    min-width: 2rem;
    height: 2.25rem;
  }
`;
