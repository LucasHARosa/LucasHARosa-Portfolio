import styled from "styled-components";

export const Space3DContainer = styled.div`
  z-index: 1;
  width: 40rem;
  max-width: 60%;
  height: 40rem;
  position: relative;

  align-self: center;
  justify-self: center;

  @media (max-width: 768px) {
    display: none;
  }

  span {
    position: absolute;
    top: 10%;
    left: 40%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme["Gray-400"]};
    p {
      font-size: 0.65rem;
      font-weight: 500;
      text-align: center;
      justify-self: center;
      align-self: center;
    }
  }
`;

export const IntroContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 85vh;
  padding: 0rem 10vw 0rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: auto;
    padding: 3rem 6vw 3.5rem;
  }

  @keyframes floatAnimation {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }

  img {
    animation: floatAnimation 6s ease-in-out infinite;
    z-index: 1;
    width: 28rem;
    max-width: 40%;

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 600px;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: clamp(2rem, 5.5vw, 3.5rem);
    line-height: 1.1;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme["Gray-300"]},
      ${({ theme }) => theme["Gray-500"]}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    margin-bottom: 0;
  }
`;

export const RoleTitle = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: clamp(1.25rem, 2.6vw, 1.75rem);
  line-height: 1.3;
  color: ${({ theme }) => theme["Blue-200"]};
  letter-spacing: 0.01em;

  /* Fica colado no nome: os dois formam um bloco só. */
  margin-top: -0.75rem;
`;

export const TypeWriterText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 1.25rem;
  color: ${({ theme }) => theme["Gray-400"]};

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const IntroSummary = styled.p`
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.7;
  color: ${({ theme }) => theme["Gray-400"]};
  max-width: 34rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  align-self: flex-start;

  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme["Gray-400"]};
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme["Blue-200"]};
  }

  @media (max-width: 768px) {
    align-self: center;
  }
`;

export const IntroButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
  }
`;

export const ScrollIndicator = styled.div`
  display: none;

  @keyframes scrollBounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(8px);
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    color: ${({ theme }) => theme["Gray-500"]};
    font-size: 0.7rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-top: 2.5rem;
    animation: scrollBounce 1.6s ease-in-out infinite;
    user-select: none;
  }
`;
