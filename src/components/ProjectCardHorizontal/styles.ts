import styled from "styled-components";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: transparent;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const ImageSection = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme["Gray-800"]};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  ${Container}:hover & img {
    transform: scale(1.03);
  }
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0.25rem;
  gap: 0.75rem;
`;

export const Header = styled.h3`
  color: ${({ theme }) => theme["Blue-100"]};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme["Gray-400"]};
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.25rem;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  background: rgba(255, 255, 255, 0.06);
  color: ${({ theme }) => theme["Gray-300"]};
  font-size: 0.6875rem;
  font-weight: 500;
  white-space: nowrap;
`;

export const TagReal = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme["Blue-500"]},
    ${({ theme }) => theme["Purple-500"]}
  );
  color: white;
  font-size: 0.6875rem;
  font-weight: 600;
  white-space: nowrap;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;

  a {
    text-decoration: none;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 0.375rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: ${({ theme }) => theme["Gray-300"]};
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    color: ${({ theme }) => theme["Blue-100"]};
  }
`;
