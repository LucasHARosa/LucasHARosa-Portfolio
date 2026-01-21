import styled from "styled-components";

export const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 4rem;
  width: 240px;
  height: calc(100vh - 4rem);
  padding: 2.5rem 1.5rem;
  overflow-y: auto;
  z-index: 5;

  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SidebarTitle = styled.h2`
  color: ${({ theme }) => theme["Gray-400"]};
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.25rem;
  padding-left: 0.75rem;
`;

export const FilterList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

interface FilterButtonProps {
  isActive?: boolean;
}

export const FilterButton = styled.button<FilterButtonProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  border: none;
  background: ${({ isActive }) =>
    isActive ? "rgba(255, 255, 255, 0.08)" : "transparent"};
  color: ${({ theme, isActive }) =>
    isActive ? theme["Blue-100"] : theme["Gray-400"]};
  font-size: 0.875rem;
  font-weight: ${({ isActive }) => (isActive ? "500" : "400")};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: ${({ theme }) => theme["Blue-100"]};
  }
`;

export const FilterContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  svg {
    opacity: 0.7;
  }
`;

export const FilterCount = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme["Gray-500"]};
  min-width: 1.25rem;
  text-align: right;
`;
