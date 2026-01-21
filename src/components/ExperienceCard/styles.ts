import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme["Gray-850"]};
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  cursor: default;

  &:hover {
    background: ${({ theme }) => theme["Gray-800"]};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
  }
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  background: ${({ theme }) => theme["Gray-800"]};
  border-radius: 0.625rem;
  color: ${({ theme }) => theme["Blue-400"]};

  ${CardContainer}:hover & {
    background: ${({ theme }) => theme["Gray-750"]};
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1rem;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme["Gray-100"]};
  line-height: 1.4;
`;

export const Company = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme["Blue-400"]};
`;

export const Description = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme["Gray-400"]};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

export const Tag = styled.span`
  font-size: 0.6875rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme["Gray-800"]};
  color: ${({ theme }) => theme["Gray-300"]};
  transition: all 0.2s ease;

  ${CardContainer}:hover & {
    background: ${({ theme }) => theme["Gray-750"]};
  }
`;
