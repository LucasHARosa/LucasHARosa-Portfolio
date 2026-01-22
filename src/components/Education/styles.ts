import styled from "styled-components";

export const EducationSection = styled.section`
  padding: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const EducationContainer = styled.div`
  margin: 0 auto;
  padding: 6rem 1rem 4rem;
`;

export const EducationTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme["Gray-300"]};
  text-align: center;
  margin-bottom: 3rem;
`;

export const TimelineContainer = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: scroll;
  scroll-behavior: auto;
  padding: 1rem 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
  white-space: nowrap;
  margin-top: 2rem;
  will-change: scroll-position;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;

    > * {
      scroll-snap-align: center;
    }
  }
`;

export const NavigationButton = styled.button`
  background: ${({ theme }) => theme["Gray-300"]};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme["Gray-300"]};
  }

  &:disabled {
    background: ${({ theme }) => theme["Gray-300"]};
    cursor: not-allowed;
  }
`;
