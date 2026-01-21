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
    justify-content: center;
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
  gap: 1rem;
  max-width: 600px;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 3.5rem;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme["Blue-500"]},
      ${({ theme }) => theme["Blue-400"]}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
`;

export const TypeWriterText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 1.5rem;
  color: ${({ theme }) => theme["Gray-400"]};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const IntroButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;
