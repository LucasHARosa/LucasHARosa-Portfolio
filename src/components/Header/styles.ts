import { motion } from "framer-motion";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  padding: 1.5rem 0;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255 255 255 / 20%);
  backdrop-filter: blur(8px);
  flex-direction: row;
  padding: 0.5rem;
  border-radius: 2rem;
  @media (max-width: 768px) {
    padding: 0.5rem 0rem;
    border-radius: 0.5rem;
    width: 100vw;
    width: 100%;
  }
`;

export const HeaderButton = styled(motion.button)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    width: 90vw;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme["Gray-300"]};
    background-color: transparent;
    border: none;
    cursor: pointer;
    height: 30px;
    z-index: 10;
    padding: 1rem;
    img {
      width: 3rem;
      margin-top: 0.5rem;
    }
  }
`;

export const HeaderNav = styled.nav`
  @media (max-width: 768px) {
    display: none;
  }

  ul {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.1rem;
    list-style: none;
  }

  a {
    display: flex;
    align-items: center;
    flex-direction: row;
    color: ${({ theme }) => theme["Gray-200"]};
    font-size: 0.875rem;
    font-weight: 400;
    transition: all 0.3s ease-in-out;
    padding: 0.5rem 1rem;
    border-radius: 16rem;
    &:hover {
      color: ${({ theme }) => theme["Gray-300"]};
    }
  }

  li.active a {
    background-color: ${({ theme }) => theme["Gray-100"]};
    color: ${({ theme }) => theme["Gray-900"]};
    font-weight: 400;
  }

`;

export const HeaderNavMobile = styled(motion.nav)`
  @media (min-width: 768px) {
    display: none;
  }

  position: absolute;
  top: 100%;
  right: 1rem;
  width: 12rem;
  border-radius: 0.5rem;
  z-index: 100;
  overflow: hidden;

  ul {
    padding: 0.75rem;
    background-color: ${({ theme }) => theme["Blue-Gray-700"]};
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    list-style: none;
    margin: 0;
  }
`;

export const NavLi = styled(motion.li)`
  list-style: none;
  margin: 0;
  width: 100%;

  a {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    color: ${({ theme }) => theme["Gray-200"]};
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme["Blue-200"]};
      background-color: ${({ theme }) => theme["Blue-Gray-600"]};
    }
  }

  &.active a {
    color: ${({ theme }) => theme["white"]};
    font-weight: 600;
  }
`;
