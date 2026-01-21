import { IconType } from "react-icons";
import {
  CardContainer,
  Description,
  Header,
  IconContainer,
  Subtitle,
  Tag,
  TagsContainer,
  Title,
  TitleContainer,
} from "./styles";

interface EducationCardProps {
  icon: IconType;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export function EducationCard({
  icon: Icon,
  title,
  subtitle,
  description,
  tags,
}: EducationCardProps) {
  return (
    <CardContainer>
      <Header>
        <IconContainer>
          <Icon size={24} color="#60a5fa" />
        </IconContainer>
        <TitleContainer>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TitleContainer>
      </Header>
      <Description>{description}</Description>
      <TagsContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagsContainer>
    </CardContainer>
  );
}
