import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  text-align: center;
  gap: 0.75rem;
  @media (max-width: 768px) {
    width: 90%;
    gap: 0.5rem;
  }
`;

export const SubTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme["Gray-500"]};
  margin-bottom: 0.5rem;
`;

export const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme["Gray-400"]};
  font-weight: 300;
`;
