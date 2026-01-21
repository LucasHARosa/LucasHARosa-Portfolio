import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  background: ${({ theme }) => theme["background"]};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ContentWrapper = styled.div`
  margin-left: 280px;
  padding: 6rem 2rem;
  flex: 1;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 4rem 5vw;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 3rem 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin: 2rem 0;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 2rem;
  text-align: center;
  color: ${({ theme }) => theme["Gray-400"]};

  svg {
    color: ${({ theme }) => theme["Gray-600"]};
  }

  h3 {
    color: ${({ theme }) => theme["Blue-100"]};
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }
`;
