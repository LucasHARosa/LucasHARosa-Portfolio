"use client";

import type { IconType } from "react-icons";
import {
  CardContainer,
  Company,
  ContentWrapper,
  Description,
  Header,
  IconWrapper,
  Tag,
  TagsContainer,
  Title,
} from "./styles";

interface ExperienceCardProps {
  icon: IconType;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export function ExperienceCard({
  icon: Icon,
  title,
  subtitle,
  description,
  tags,
}: ExperienceCardProps) {
  return (
    <CardContainer>
      <IconWrapper>
        <Icon size={20} />
      </IconWrapper>
      <ContentWrapper>
        <Header>
          <Title>{title}</Title>
          <Company>{subtitle}</Company>
        </Header>
        <Description>{description}</Description>
        <TagsContainer>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
      </ContentWrapper>
    </CardContainer>
  );
}
