import {
  Container,
  Description,
  MainTitle,
  SubTitle,
  TitleContainer,
} from "./styles";

interface TitleProps {
  title: string;
  subTitle: string;
  description: string | React.ReactNode;
}

export function Title({ title, subTitle, description }: TitleProps) {
  return (
    <TitleContainer>
      <Container>
        <SubTitle>{subTitle}</SubTitle>
        <MainTitle>{title}</MainTitle>
        <Description>{description}</Description>
      </Container>
    </TitleContainer>
  );
}
