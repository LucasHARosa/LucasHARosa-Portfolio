import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 6rem 10vw;

  @media (max-width: 768px) {
    padding: 4rem 5vw;
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: 3rem;
  width: 100%;
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

export const ContainerAbout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6rem;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

export const Interact = styled.div`
  display: flex;
  color: ${({ theme }) => theme["Gray-400"]};
  margin: 2rem 0;
  z-index: 1;
  p {
    font-size: 0.65rem;
    font-weight: 500;
    text-align: center;
    justify-self: center;
    align-self: center;
  }
`;

export const ContainerAboutText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  p {
    font-style: normal;
    font-weight: 300;
    font-size: 1rem;
    color: ${({ theme }) => theme["Gray-300"]};
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
`;

export const ContainerAboutImage = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme["Gray-200-opacity"]};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme["shadow-md"]};

  img {
    width: 25vw;
    max-width: 400px;
    border-radius: 0.25rem;

    @media (max-width: 768px) {
      width: 70vw;
      max-width: 300px;
    }
  }

  &:hover {
    box-shadow: ${({ theme }) => theme["shadow-xl"]};
    transform: translateY(-5px);
  }
`;

export const LegendImage = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  justify-content: flex-start;
  padding: 0.5rem 0;
`;
