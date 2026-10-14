import { useMemo } from "react";
import { cn } from "@/lib/utils";

/*
 * Desenho isométrico em traço. Eixos: x para a direita-frente, y para a
 * esquerda-frente, z para cima. Quanto maior x + y, mais perto do observador.
 * Arestas visíveis são sólidas; as ocultas, tracejadas — como numa vista técnica.
 */

type P3 = [number, number, number];
type P2 = [number, number];
interface Stroke {
  d: string;
  hidden: boolean;
}

const C = Math.cos(Math.PI / 6);
const S = 0.5;
const ELLIPSE_RX = Math.SQRT2 * C;
const ELLIPSE_RY = Math.SQRT2 * S;

function iso([x, y, z]: P3): P2 {
  return [(x - y) * C, (x + y) * S - z];
}

class Drawing {
  strokes: Stroke[] = [];
  points: P2[] = [];

  private track(...pts: P2[]) {
    this.points.push(...pts);
  }

  line(a: P3, b: P3, hidden = false) {
    const [ax, ay] = iso(a);
    const [bx, by] = iso(b);
    this.track([ax, ay], [bx, by]);
    this.strokes.push({ d: `M${ax} ${ay}L${bx} ${by}`, hidden });
  }

  /** Paralelepípedo a partir do canto mínimo. */
  box([x, y, z]: P3, [w, d, h]: P3, opts: { allHidden?: boolean } = {}) {
    const v = (i: number, j: number, k: number): P3 => [x + i * w, y + j * d, z + k * h];
    const edges: [P3, P3][] = [
      [v(0, 0, 0), v(1, 0, 0)],
      [v(0, 0, 0), v(0, 1, 0)],
      [v(0, 0, 0), v(0, 0, 1)],
      [v(1, 0, 0), v(1, 1, 0)],
      [v(1, 0, 0), v(1, 0, 1)],
      [v(0, 1, 0), v(1, 1, 0)],
      [v(0, 1, 0), v(0, 1, 1)],
      [v(1, 1, 0), v(1, 1, 1)],
      [v(0, 0, 1), v(1, 0, 1)],
      [v(0, 0, 1), v(0, 1, 1)],
      [v(1, 0, 1), v(1, 1, 1)],
      [v(0, 1, 1), v(1, 1, 1)],
    ];
    // As três arestas que tocam o canto de trás-de-baixo ficam ocultas.
    edges.forEach(([a, b], i) => this.line(a, b, opts.allHidden || i < 3));
  }

  /** Elipse de um círculo horizontal; metade de trás opcionalmente oculta. */
  private ellipse(center: P3, r: number, backHidden: boolean) {
    const [cx, cy] = iso(center);
    const rx = r * ELLIPSE_RX;
    const ry = r * ELLIPSE_RY;
    this.track([cx - rx, cy - ry], [cx + rx, cy + ry]);
    const left = `M${cx - rx} ${cy}`;
    // sweep 0 passa por baixo (frente); sweep 1 passa por cima (fundo)
    this.strokes.push({ d: `${left}A${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`, hidden: false });
    this.strokes.push({ d: `${left}A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`, hidden: backHidden });
  }

  ring(center: P3, r: number) {
    this.ellipse(center, r, true);
  }

  cylinder([x, y]: [number, number], r: number, z0: number, z1: number) {
    this.ellipse([x, y, z1], r, false);
    this.ellipse([x, y, z0], r, true);
    const [cx, top] = iso([x, y, z1]);
    const [, bottom] = iso([x, y, z0]);
    const rx = r * ELLIPSE_RX;
    this.strokes.push({ d: `M${cx - rx} ${top}L${cx - rx} ${bottom}`, hidden: false });
    this.strokes.push({ d: `M${cx + rx} ${top}L${cx + rx} ${bottom}`, hidden: false });
  }

  /** Contorno de esfera + equador (fundo do equador oculto). */
  sphere(center: P3, r: number) {
    const [cx, cy] = iso(center);
    const R = r * ELLIPSE_RX;
    this.track([cx - R, cy - R], [cx + R, cy + R]);
    this.strokes.push({
      d: `M${cx - R} ${cy}A${R} ${R} 0 1 0 ${cx + R} ${cy}A${R} ${R} 0 1 0 ${cx - R} ${cy}`,
      hidden: false,
    });
    this.ellipse(center, r, true);
  }

  /** Círculo de contorno puro, no plano da tela. */
  circle(center: P3, R: number) {
    const [cx, cy] = iso(center);
    this.track([cx - R, cy - R], [cx + R, cy + R]);
    this.strokes.push({
      d: `M${cx - R} ${cy}A${R} ${R} 0 1 0 ${cx + R} ${cy}A${R} ${R} 0 1 0 ${cx - R} ${cy}`,
      hidden: false,
    });
  }

  /**
   * Curva 3D qualquer. Trechos atrás do plano de profundidade `pivot`
   * (x + y < pivot) ficam tracejados.
   */
  curve(points: P3[], pivot: number | null = null) {
    let run: P2[] = [];
    let runHidden = false;
    const flush = () => {
      if (run.length > 1) {
        this.strokes.push({
          d: run.map(([px, py], i) => `${i ? "L" : "M"}${px} ${py}`).join(""),
          hidden: runHidden,
        });
      }
    };
    points.forEach((p, i) => {
      const hidden = pivot !== null && p[0] + p[1] < pivot;
      const p2 = iso(p);
      this.track(p2);
      if (i === 0) {
        runHidden = hidden;
        run = [p2];
        return;
      }
      if (hidden !== runHidden) {
        run.push(p2);
        flush();
        run = [p2];
        runHidden = hidden;
      } else {
        run.push(p2);
      }
    });
    flush();
  }
}

const TAU = Math.PI * 2;
const arc = (n: number, fn: (t: number) => P3) =>
  Array.from({ length: n + 1 }, (_, i) => fn((i / n) * TAU));

/** Composição de cada skill. As formas aludem ao papel da tecnologia. */
const glyphs: Record<string, (g: Drawing) => void> = {
  // xícara sobre o pires
  java(g) {
    g.ring([0, 0, 0], 1.7);
    g.cylinder([0, 0], 1, 0.15, 1.75);
    // alça no lado direito da tela (direção +x, -y)
    g.curve(
      Array.from({ length: 13 }, (_, i) => {
        const t = -Math.PI / 2 + (i / 12) * Math.PI;
        const r = 1 + 0.5 * Math.cos(t);
        return [r * Math.SQRT1_2, -r * Math.SQRT1_2, 0.95 + 0.48 * Math.sin(t)] as P3;
      }),
    );
  },
  // camadas de serviço empilhadas
  nodejs(g) {
    [0, 0.65, 1.3].forEach((z) => g.box([-1.1, -1.1, z], [2.2, 2.2, 0.38]));
  },
  // módulo dentro de módulo
  nestjs(g) {
    g.box([-1.25, -1.25, 0], [2.5, 2.5, 2.5], { allHidden: true });
    g.box([-0.55, -0.55, 0], [1.1, 1.1, 1.1]);
  },
  // dois blocos que se encaixam
  python(g) {
    g.box([-1.4, -0.3, 0], [1.3, 1.3, 1.3]);
    g.box([-0.1, -1.0, 0.7], [1.3, 1.3, 1.3]);
  },
  // eixo atravessando a placa
  fastapi(g) {
    g.box([-1.5, -1.5, 0.9], [3, 3, 0.36]);
    g.cylinder([0, 0], 0.48, 0, 2.6);
  },
  // processos em paralelo
  go(g) {
    g.box([-1.35, -0.3, 0], [0.6, 0.6, 1.5]);
    g.box([-0.3, -0.3, 0], [0.6, 0.6, 2.4]);
    g.box([0.75, -0.3, 0], [0.6, 0.6, 1.9]);
    g.line([-1.8, 0.5, 0], [1.8, 0.5, 0]);
  },
  // núcleo e órbitas
  react(g) {
    g.sphere([0, 0, 0], 0.45);
    g.ring([0, 0, 0], 1.7);
    g.curve(arc(48, (t) => [1.7 * Math.cos(t), 0, 1.7 * Math.sin(t)]), 0);
    g.curve(arc(48, (t) => [0, 1.7 * Math.cos(t), 1.7 * Math.sin(t)]), 0);
  },
  // estrutura com a camada de cima
  nextjs(g) {
    g.box([-1, -1, 0], [2, 2, 2]);
    g.sphere([0, 0, 2.7], 0.62);
  },
  // tipos envolvendo o código
  typescript(g) {
    g.circle([0, 0, 1], 2.35);
    g.box([-0.95, -0.95, 0.05], [1.9, 1.9, 1.9], { allHidden: true });
    g.line([0, 0, 1], [0.95, 0.95, 1.95], true);
  },
  // aparelho em pé
  "react-native"(g) {
    g.box([-0.85, -0.12, 0], [1.7, 0.24, 3]);
    g.curve([
      [-0.68, 0.12, 0.35],
      [0.68, 0.12, 0.35],
      [0.68, 0.12, 2.65],
      [-0.68, 0.12, 2.65],
      [-0.68, 0.12, 0.35],
    ]);
    g.line([-0.15, 0.12, 0.18], [0.15, 0.12, 0.18]);
  },
  // ramos que se unem
  github(g) {
    g.box([-1.4, -1.4, 0], [2.8, 2.8, 0.5]);
    g.box([-1.4, -1.4, 1.15], [2.8, 2.8, 0.5]);
    g.box([-0.55, -0.55, 0.5], [1.1, 1.1, 0.65], { allHidden: true });
  },
  // chip sobre a placa
  code(g) {
    g.box([-1.7, -1.7, 0], [3.4, 3.4, 0.16]);
    g.box([-0.7, -0.7, 0.16], [1.4, 1.4, 0.34]);
    [-0.45, -0.15, 0.15, 0.45].forEach((o) => {
      g.line([o, 0.7, 0.16], [o, 1.15, 0.16]);
      g.line([0.7, o, 0.16], [1.15, o, 0.16]);
      g.line([o, -0.7, 0.16], [o, -1.15, 0.16], true);
      g.line([-0.7, o, 0.16], [-1.15, o, 0.16], true);
    });
  },
};

const DISPLAY = 180;

interface IsoGlyphProps {
  name: string;
  /** Quando ativo, o traço se redesenha. */
  active?: boolean;
  className?: string;
}

export function IsoGlyph({ name, active, className }: IsoGlyphProps) {
  const { strokes, viewBox, unit } = useMemo(() => {
    const g = new Drawing();
    (glyphs[name] ?? glyphs.nodejs)(g);
    const xs = g.points.map((p) => p[0]);
    const ys = g.points.map((p) => p[1]);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const w = Math.max(...xs) - minX;
    const h = Math.max(...ys) - minY;
    const side = Math.max(w, h) * 1.15;
    const ox = minX - (side - w) / 2;
    const oy = minY - (side - h) / 2;
    return {
      strokes: g.strokes,
      viewBox: `${ox} ${oy} ${side} ${side}`,
      unit: side / DISPLAY,
    };
  }, [name]);

  return (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      className={cn("aspect-square w-full max-w-[180px]", className)}
    >
      {/* key força o reinício da animação a cada ativação */}
      <g
        key={active ? "on" : "off"}
        className={active ? "iso-drawing" : undefined}
        style={{ strokeWidth: unit * 1.1 }}
      >
        {strokes.map((s, i) => (
          <path
            key={i}
            d={s.d}
            pathLength={s.hidden ? undefined : 1}
            className={s.hidden ? "iso-hidden" : "iso-solid"}
            style={
              s.hidden
                ? { strokeDasharray: `${unit * 3} ${unit * 3}`, strokeWidth: unit * 1.1 }
                : { strokeWidth: unit * 1.1 }
            }
          />
        ))}
      </g>
    </svg>
  );
}
