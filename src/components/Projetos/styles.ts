import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.75rem;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme["Gray-800"]},
    ${({ theme }) => theme["Blue-300-opacity"]}
  );
  border: 1px solid ${({ theme }) => theme["Gray-800"]};

  width: 320px;
  min-height: 480px;
  height: auto;
  overflow: visible;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme["shadow-md"]};

  &:hover {
    box-shadow: ${({ theme }) => theme["shadow-xl"]};

    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    width: 280px;
    min-height: 420px;
    height: auto;
  }

  h1 {
    color: ${({ theme }) => theme["Gray-100"]};
    font-size: 1.25rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 1.125rem;
    }
  }

  p {
    font-size: 0.875rem;
    font-weight: 300;
    color: ${({ theme }) => theme["Gray-400"]};
    margin-top: 0.5rem;
    line-height: 1.5;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    @media (max-width: 768px) {
      font-size: 0.75rem;
      -webkit-line-clamp: 3;
    }
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 0.75rem 0.75rem 0 0;

    @media (max-width: 768px) {
      height: 160px;
    }
  }
`;

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  flex: 1;

  @media (max-width: 768px) {
    padding: 0.875rem 1rem 1rem;
  }
`;

export const ContainerTags = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.375rem;
    margin-bottom: 0.75rem;
  }
`;

export const Tag = styled.div`
  width: fit-content;
  font-size: 0.75rem;
  padding: 2px 10px;
  border-radius: 0.3rem;
  background-color: ${({ theme }) => theme["white"]};
  color: ${({ theme }) => theme["Gray-900"]};
  box-shadow: ${({ theme }) => theme["shadow-sm"]};
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    gap: 0.25rem;
  }
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 50% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const TagReal = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme["Blue-700"]},
    ${({ theme }) => theme["Purple-500"]}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  animation: ${gradientAnimation} 3s ease-in-out infinite;

  font-weight: 400;
  font-size: 0.75rem;

  background-size: 300% 300%;
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: 768px) {
    gap: 0.375rem;
  }

  a {
    flex: 1;
    min-width: calc(50% - 0.25rem);

    @media (max-width: 768px) {
      min-width: calc(50% - 0.1875rem);
    }
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${({ theme }) => theme["white"]};
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme["Gray-600"]};
    box-shadow: ${({ theme }) => theme["shadow-sm"]};
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme["Gray-500"]};
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      font-size: 0.75rem;
      padding: 0.375rem 0.5rem;
      gap: 0.25rem;
    }

    svg {
      @media (max-width: 768px) {
        width: 0.875rem;
        height: 0.875rem;
      }
    }

    div {
      color: ${({ theme }) => theme["white"]};
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 768px) {
        height: 16px;
      }
    }
  }
`;
