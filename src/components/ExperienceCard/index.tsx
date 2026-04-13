"use client";

import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  CardContainer,
  Company,
  ContentWrapper,
  Description,
  ExpandButton,
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
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const collapsed = isMobile && !isExpanded;

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
        <Description $collapsed={collapsed}>{description}</Description>
        <ExpandButton onClick={() => setIsExpanded((v) => !v)}>
          {isExpanded ? "Ver menos" : "Ver mais"}
        </ExpandButton>
        <TagsContainer $collapsed={collapsed}>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
      </ContentWrapper>
    </CardContainer>
  );
}
