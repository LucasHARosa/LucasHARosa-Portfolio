"use client";

import {
  Code,
  Cpu,
  DeviceMobile,
  Globe,
  GridFour,
  HardDrives,
} from "phosphor-react";
import { listaProjetos } from "../../data/data";

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
  const categories = [
    {
      label: "Todos",
      value: "todos",
      icon: (
        <GridFour
          size={18}
          weight={activeFilter === "todos" ? "fill" : "regular"}
        />
      ),
      count: listaProjetos.length,
    },
    {
      label: "Principais",
      value: "principais",
      icon: (
        <Globe
          size={18}
          weight={activeFilter === "principais" ? "fill" : "regular"}
        />
      ),
      count: listaProjetos.filter((p) => p.tipo.includes("principais")).length,
    },
    {
      label: "Mobile",
      value: "mobile",
      icon: (
        <DeviceMobile
          size={18}
          weight={activeFilter === "mobile" ? "fill" : "regular"}
        />
      ),
      count: listaProjetos.filter((p) => p.tipo.includes("mobile")).length,
    },
    {
      label: "Frontend",
      value: "frontend",
      icon: (
        <Code
          size={18}
          weight={activeFilter === "frontend" ? "fill" : "regular"}
        />
      ),
      count: listaProjetos.filter((p) => p.tipo.includes("frontend")).length,
    },
    {
      label: "Backend",
      value: "backend",
      icon: (
        <HardDrives
          size={18}
          weight={activeFilter === "backend" ? "fill" : "regular"}
        />
      ),
      count: listaProjetos.filter((p) => p.tipo.includes("backend")).length,
    },
    {
      label: "IA",
      value: "ia",
      icon: (
        <Cpu size={18} weight={activeFilter === "ia" ? "fill" : "regular"} />
      ),
      count: listaProjetos.filter((p) => p.tipo.includes("ia")).length,
    },
  ];

  return (
    <SidebarContainer>
      <SidebarTitle>Categorias</SidebarTitle>
      <FilterList>
        {categories.map(({ label, value, icon, count }) => (
          <FilterButton
            key={value}
            isActive={activeFilter === value}
            onClick={() => onFilterChange(value)}
          >
            <FilterContent>
              {icon}
              {label}
            </FilterContent>
            <FilterCount>{count}</FilterCount>
          </FilterButton>
        ))}
      </FilterList>
    </SidebarContainer>
  );
}
