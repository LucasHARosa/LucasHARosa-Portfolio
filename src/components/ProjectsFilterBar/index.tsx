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

import { FilterBar, FilterButton, FilterCount } from "./styles";

interface Props {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ProjectsFilterBar({ activeFilter, onFilterChange }: Props) {
  const categories = [
    {
      label: "Todos",
      value: "todos",
      icon: (
        <GridFour
          size={16}
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
          size={16}
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
          size={16}
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
          size={16}
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
          size={16}
          weight={activeFilter === "backend" ? "fill" : "regular"}
        />
      ),
      count: listaProjetos.filter((p) => p.tipo.includes("backend")).length,
    },
    {
      label: "IA",
      value: "ia",
      icon: (
        <Cpu size={16} weight={activeFilter === "ia" ? "fill" : "regular"} />
      ),
      count: listaProjetos.filter((p) => p.tipo.includes("ia")).length,
    },
  ];

  return (
    <FilterBar>
      {categories.map(({ label, value, icon, count }) => (
        <FilterButton
          key={value}
          isActive={activeFilter === value}
          onClick={() => onFilterChange(value)}
        >
          {icon}
          {label}
          <FilterCount>{count}</FilterCount>
        </FilterButton>
      ))}
    </FilterBar>
  );
}
