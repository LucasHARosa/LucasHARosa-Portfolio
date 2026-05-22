"use client";

import { motion } from "framer-motion";
import { AppleLogo, CaretDown, GithubLogo, GooglePlayLogo, Link } from "phosphor-react";
import { useState } from "react";
import { ProjetosProps } from "../../data/data";

import {
  ActionButton,
  ActionsContainer,
  Container,
  ContentSection,
  Description,
  Header,
  ImageSection,
  Tag,
  TagReal,
  TagsContainer,
} from "./styles";

interface Props {
  projeto: ProjetosProps;
}

export function ProjectCardHorizontal({ projeto }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Container>
        <ImageSection>
          <img
            src={projeto.imagem || "/placeholder.svg"}
            loading="lazy"
            alt={projeto.titulo}
          />
        </ImageSection>
        <ContentSection>
          <Header>{projeto.titulo}</Header>
          <Description
            style={
              expanded
                ? { overflow: "visible", display: "block", WebkitLineClamp: "unset" }
                : undefined
            }
          >
            {projeto.descricao}
          </Description>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.3)",
              cursor: "pointer",
              padding: "0.125rem 0 0",
              display: "flex",
              alignItems: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            <CaretDown
              size={14}
              style={{
                transition: "transform 0.25s ease",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          <TagsContainer>
            {projeto.tags.map((tag) => {
              if (tag === "Projeto Real") {
                return <TagReal key={tag}>{tag}</TagReal>;
              } else {
                return <Tag key={tag}>{tag}</Tag>;
              }
            })}
          </TagsContainer>

          <ActionsContainer>
            {projeto.LinkGoogle && (
              <a href={projeto.LinkGoogle} target="_blank" rel="noreferrer">
                <ActionButton>
                  <GooglePlayLogo size={14} />
                  Google Play
                </ActionButton>
              </a>
            )}
            {projeto.LinkApple && (
              <a href={projeto.LinkApple} target="_blank" rel="noreferrer">
                <ActionButton>
                  <AppleLogo size={14} weight="fill" />
                  Apple Store
                </ActionButton>
              </a>
            )}
            {projeto.LinkGit && (
              <a href={projeto.LinkGit} target="_blank" rel="noreferrer">
                <ActionButton>
                  <GithubLogo size={14} />
                  Github
                </ActionButton>
              </a>
            )}
            {projeto.Link && (
              <a href={projeto.Link} target="_blank" rel="noreferrer">
                <ActionButton>
                  <Link size={14} />
                  Link
                </ActionButton>
              </a>
            )}
          </ActionsContainer>
        </ContentSection>
      </Container>
    </motion.div>
  );
}
