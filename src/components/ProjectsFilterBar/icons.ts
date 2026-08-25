import {
  Code,
  Cpu,
  DeviceMobile,
  Globe,
  GraduationCap,
  GridFour,
  HardDrives,
} from "phosphor-react";
import type { IconProps } from "phosphor-react";
import type { ComponentType } from "react";
import type { CategoriaIcone } from "../../data/data";

/** Ícone de cada categoria de projeto, compartilhado pela sidebar e pelas barras de filtro. */
export const categoriaIcones: Record<
  CategoriaIcone,
  ComponentType<IconProps>
> = {
  grid: GridFour,
  server: HardDrives,
  globe: Globe,
  code: Code,
  mobile: DeviceMobile,
  cpu: Cpu,
  cap: GraduationCap,
};
