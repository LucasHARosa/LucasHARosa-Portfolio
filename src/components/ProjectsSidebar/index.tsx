"use client";

import { contarProjetos, projetoCategorias } from "../../data/data";
import { categoriaIcones } from "../ProjectsFilterBar/icons";

import {
  FilterButton,
  FilterContent,
  FilterCount,
  FilterList,
  SidebarContainer,
  SidebarTitle,
} from "./styles";

interface Props {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ProjectsSidebar({ activeFilter, onFilterChange }: Props) {
  return (
    <SidebarContainer>
      <SidebarTitle>Categorias</SidebarTitle>
      <FilterList>
        {projetoCategorias.map(({ label, value, icon }) => {
          const Icon = categoriaIcones[icon];
          const isActive = activeFilter === value;

          return (
            <FilterButton
              key={value}
              isActive={isActive}
              onClick={() => onFilterChange(value)}
            >
              <FilterContent>
                <Icon size={18} weight={isActive ? "fill" : "regular"} />
                {label}
              </FilterContent>
              <FilterCount>{contarProjetos(value)}</FilterCount>
            </FilterButton>
          );
        })}
      </FilterList>
    </SidebarContainer>
  );
}
