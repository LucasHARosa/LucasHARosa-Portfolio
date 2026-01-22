import styled from "styled-components";

export const ExperienceSection = styled.section`
  padding: 0;
`;

export const ExperienceContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 5rem 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: 3rem;
`;

export const SectionLabel = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme["Gray-500"]};
  margin-bottom: 0.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme["Gray-100"]};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SectionDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme["Gray-400"]};
  max-width: 500px;
`;

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LoadMoreButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme["Gray-300"]};
    background: transparent;
    border: 1px solid ${({ theme }) => theme["Gray-700"]};
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme["Gray-800"]};
      border-color: ${({ theme }) => theme["Gray-600"]};
      color: ${({ theme }) => theme["Gray-100"]};
    }

    svg {
      transition: transform 0.2s ease;
    }

    &:hover svg {
      transform: translateY(2px);
    }
  }
`;

export const ExperienceCardWrapper = styled.div``;
