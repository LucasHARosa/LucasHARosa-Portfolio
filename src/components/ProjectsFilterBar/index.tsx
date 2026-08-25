"use client";

import { contarProjetos, projetoCategorias } from "../../data/data";

import { categoriaIcones } from "./icons";
import { FilterBar, FilterButton, FilterCount } from "./styles";

interface Props {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ProjectsFilterBar({ activeFilter, onFilterChange }: Props) {
  return (
    <FilterBar>
      {projetoCategorias.map(({ label, value, icon }) => {
        const Icon = categoriaIcones[icon];
        const isActive = activeFilter === value;

        return (
          <FilterButton
            key={value}
            isActive={isActive}
            onClick={() => onFilterChange(value)}
          >
            <Icon size={16} weight={isActive ? "fill" : "regular"} />
            {label}
            <FilterCount>{contarProjetos(value)}</FilterCount>
          </FilterButton>
        );
      })}
    </FilterBar>
  );
}
