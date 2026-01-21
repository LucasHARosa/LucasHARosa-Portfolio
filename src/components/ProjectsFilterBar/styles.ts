import styled from "styled-components";

export const FilterBar = styled.div`
  position: sticky;
  top: 4rem;
  display: none;
  flex-direction: row;
  gap: 0.5rem;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  z-index: 10;

  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

interface FilterButtonProps {
  isActive?: boolean;
}

export const FilterButton = styled.button<FilterButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.5rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: ${({ isActive }) => (isActive ? "500" : "400")};
  transition: all 0.15s ease;
  cursor: pointer;
  color: ${({ theme, isActive }) =>
    isActive ? theme["Blue-100"] : theme["Gray-400"]};
  border: none;
  border-radius: 2rem;
  background: ${({ isActive }) =>
    isActive ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme["Blue-100"]};
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const FilterCount = styled.span`
  font-size: 0.6875rem;
  font-weight: 500;
  color: ${({ theme }) => theme["Gray-500"]};
`;
