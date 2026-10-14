import { useMemo } from "react";
import { cn } from "@/lib/utils";

/*
 * Desenho isométrico em traço. Eixos: x para a direita-frente, y para a
 * esquerda-frente, z para cima. Quanto maior x + y, mais perto do observador.
 * Arestas visíveis são sólidas; as ocultas, tracejadas — como numa vista técnica.
 *
 * Cada tecnologia é uma cena paramétrica no tempo t ∈ [0, 1). A cena é
 * amostrada em quadros e animada por morph do atributo `d` (SMIL), por isso
 * toda cena precisa produzir o mesmo número de traços em qualquer t.
 */

type P3 = [number, number, number];
type P2 = [number, number];
interface Stroke {
  d: string;
  hidden: boolean;
  alpha: number;
  accent: boolean;
}

const C = Math.cos(Math.PI / 6);
const S = 0.5;
const ELLIPSE_RX = Math.SQRT2 * C;
const ELLIPSE_RY = Math.SQRT2 * S;
const TAU = Math.PI * 2;

const r3 = (n: number) => Math.round(n * 1000) / 1000;

function iso([x, y, z]: P3): P2 {
  return [r3((x - y) * C), r3((x + y) * S - z)];
}

class Drawing {
  strokes: Stroke[] = [];
  points: P2[] = [];
  private a = 1;
  private acc = false;

  /** Opacidade dos próximos traços (0 some). */
  alpha(a: number) {
    this.a = Math.max(0, Math.min(1, a));
    return this;
  }

  /** Marca os próximos traços como "ator" (cor de sinal quando ativo). */
  accent(on: boolean) {
    this.acc = on;
    return this;
  }

  private push(d: string, hidden: boolean) {
    this.strokes.push({ d, hidden, alpha: this.a, accent: this.acc });
  }

  private track(...pts: P2[]) {
    this.points.push(...pts);
  }

  line(a: P3, b: P3, hidden = false) {
    const [ax, ay] = iso(a);
    const [bx, by] = iso(b);
    this.track([ax, ay], [bx, by]);
    this.push(`M${ax} ${ay}L${bx} ${by}`, hidden);
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

  /** Cubo de aresta s com a base centrada em (x, y, z). */
  cube([x, y, z]: P3, s: number) {
    this.box([x - s / 2, y - s / 2, z], [s, s, s]);
  }

  /** Elipse de um círculo horizontal; metade de trás opcionalmente oculta. */
  private ellipse(center: P3, r: number, backHidden: boolean) {
    const [cx, cy] = iso(center);
    const rx = r3(r * ELLIPSE_RX);
    const ry = r3(r * ELLIPSE_RY);
    this.track([cx - rx, cy - ry], [cx + rx, cy + ry]);
    const left = `M${r3(cx - rx)} ${cy}`;
    // sweep 0 passa por baixo (frente); sweep 1 passa por cima (fundo)
    this.push(`${left}A${rx} ${ry} 0 0 0 ${r3(cx + rx)} ${cy}`, false);
    this.push(`${left}A${rx} ${ry} 0 0 1 ${r3(cx + rx)} ${cy}`, backHidden);
  }

  ring(center: P3, r: number) {
    this.ellipse(center, r, true);
  }

  cylinder([x, y]: [number, number], r: number, z0: number, z1: number) {
    this.ellipse([x, y, z1], r, false);
    this.ellipse([x, y, z0], r, true);
    const [cx, top] = iso([x, y, z1]);
    const [, bottom] = iso([x, y, z0]);
    const rx = r3(r * ELLIPSE_RX);
    this.push(`M${r3(cx - rx)} ${top}L${r3(cx - rx)} ${bottom}`, false);
    this.push(`M${r3(cx + rx)} ${top}L${r3(cx + rx)} ${bottom}`, false);
  }

  /** Contorno de esfera + equador (fundo do equador oculto). */
  sphere(center: P3, r: number) {
    this.circle(center, r * ELLIPSE_RX);
    this.ellipse(center, r, true);
  }

  /** Círculo de contorno no plano da tela (raio em unidades de tela). */
  circle(center: P3, R: number) {
    const [cx, cy] = iso(center);
    const rr = r3(R);
    this.track([cx - rr, cy - rr], [cx + rr, cy + rr]);
    this.push(
      `M${r3(cx - rr)} ${cy}A${rr} ${rr} 0 1 0 ${r3(cx + rr)} ${cy}A${rr} ${rr} 0 1 0 ${r3(cx - rr)} ${cy}`,
      false,
    );
  }

  /** Polilinha 3D sólida (estrutura fixa: mesmo número de pontos sempre). */
  poly(points: P3[], hidden = false) {
    const pts = points.map(iso);
    this.track(...pts);
    this.push(pts.map(([px, py], i) => `${i ? "L" : "M"}${px} ${py}`).join(""), hidden);
  }

  /**
   * Curva 3D estática. Trechos atrás do plano de profundidade `pivot`
   * (x + y < pivot) ficam tracejados. Não usar em partes animadas.
   */
  curve(points: P3[], pivot: number) {
    let run: P2[] = [];
    let runHidden = false;
    const flush = () => {
      if (run.length > 1) {
        this.push(run.map(([px, py], i) => `${i ? "L" : "M"}${px} ${py}`).join(""), runHidden);
      }
    };
    points.forEach((p, i) => {
      const hidden = p[0] + p[1] < pivot;
      const p2 = iso(p);
      this.track(p2);
      if (i === 0) {
        runHidden = hidden;
        run = [p2];
        return;
      }
      run.push(p2);
      if (hidden !== runHidden) {
        flush();
        run = [p2];
        runHidden = hidden;
      }
    });
    flush();
  }
}

// ---------------------------------------------------------------- utilidades
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
/** Progresso de t no intervalo [a, b]. */
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const ease = (x: number) => x * x * (3 - 2 * x);
/** Aparece em [a, a+f] e some em [b, b+f]. */
const window01 = (t: number, a: number, b: number, f = 0.06) => seg(t, a, a + f) * (1 - seg(t, b, b + f));
const arc = (n: number, fn: (u: number) => P3) =>
  Array.from({ length: n + 1 }, (_, i) => fn((i / n) * TAU));

interface Scene {
  /** Duração de um ciclo, em segundos. */
  dur: number;
  /** Momento do ciclo mostrado quando parado. */
  rest: number;
  draw: (g: Drawing, t: number) => void;
}

/** Cenas: cada uma descreve o que a tecnologia faz. */
const scenes: Record<string, Scene> = {
  // Event loop: requisições circulando pelo servidor sem bloqueá-lo
  nodejs: {
    dur: 4.5,
    rest: 0.08,
    draw(g, t) {
      [0, 0.62, 1.24].forEach((z) => g.box([-0.95, -0.95, z], [1.9, 1.9, 0.36]));
      g.ring([0, 0, 0.8], 1.95);
      g.accent(true);
      for (let k = 0; k < 3; k++) {
        const a = TAU * (t + k / 3);
        g.cube([1.95 * Math.cos(a), 1.95 * Math.sin(a), 0.64], 0.32);
      }
      g.accent(false);
    },
  },

  // SSR: o servidor renderiza a página e entrega ao navegador
  nextjs: {
    dur: 4.2,
    rest: 0.36,
    draw(g, t) {
      g.box([-2.3, -0.7, 0], [1.1, 1.4, 2]);
      [0.45, 0.85, 1.25].forEach((z) => g.line([-2.15, 0.7, z], [-1.35, 0.7, z]));

      g.box([1.2, -1.0, 0.2], [0.14, 2.0, 2.0]);
      g.line([1.34, 1.0, 1.9], [1.34, -1.0, 1.9]);
      g.alpha(window01(t, 0.55, 0.86, 0.1));
      [1.4, 1.0, 1.2, 0.7].forEach((len, i) => {
        const z = 1.6 - i * 0.25;
        g.line([1.34, 0.8, z], [1.34, 0.8 - len, z]);
      });

      const x = -1.05 + ease(seg(t, 0.05, 0.55)) * 2.1;
      g.alpha(seg(t, 0, 0.06) * (1 - seg(t, 0.55, 0.62))).accent(true);
      g.box([x, -0.55, 0.55], [0.05, 1.1, 1.3]);
      [1.6, 1.4, 1.2].forEach((z) => g.line([x + 0.05, 0.4, z], [x + 0.05, -0.2, z]));
      g.alpha(1).accent(false);
    },
  },

  // App rodando: a lista rola dentro da tela do aparelho
  "react-native": {
    dur: 5,
    rest: 0,
    draw(g, t) {
      const F = 0.12;
      g.box([-0.9, -F, 0], [1.8, 0.24, 3.2]);
      g.poly([
        [-0.72, F, 0.35],
        [0.72, F, 0.35],
        [0.72, F, 2.85],
        [-0.72, F, 2.85],
        [-0.72, F, 0.35],
      ]);
      g.line([-0.2, F, 3.02], [0.2, F, 3.02]);

      const zmin = 0.42;
      const zmax = 2.78;
      const H = 0.74;
      const N = 4;
      const card = 0.55;
      g.accent(true);
      for (let k = 0; k < N; k++) {
        const bottom = zmin - card + ((k + t) % N) * H;
        let z0 = Math.max(bottom, zmin);
        let z1 = Math.min(bottom + card, zmax);
        const visible = z1 > z0;
        if (!visible) z0 = z1 = Math.min(Math.max(bottom, zmin), zmax);
        g.alpha(visible ? 1 : 0);
        g.poly([
          [-0.58, F, z0],
          [0.58, F, z0],
          [0.58, F, z1],
          [-0.58, F, z1],
          [-0.58, F, z0],
        ]);
        const zm = bottom + card / 2;
        g.alpha(zm > z0 && zm < z1 ? 1 : 0);
        const zl = Math.min(Math.max(zm, zmin), zmax);
        g.line([-0.42, F, zl], [0.18, F, zl]);
      }
      g.alpha(1).accent(false);
    },
  },

  // Injeção de dependência: um provider desce e é encaixado no módulo
  nestjs: {
    dur: 4,
    rest: 0.6,
    draw(g, t) {
      g.box([-1.5, -1.5, 0], [3, 3, 1.3], { allHidden: true });
      g.box([-1.2, -1.2, 0], [0.8, 0.8, 0.8]);
      g.box([0.4, -1.2, 0], [0.8, 0.8, 0.8]);

      const z = 2.6 * (1 - ease(seg(t, 0.08, 0.45)));
      g.alpha(window01(t, 0, 0.86, 0.08)).accent(true);
      g.box([-0.4, 0.4, z], [0.8, 0.8, 0.8]);
      g.accent(false).alpha(window01(t, 0.45, 0.86, 0.08));
      g.line([0, 0.8, 0.8], [-0.8, -0.8, 0.8]);
      g.line([0, 0.8, 0.8], [0.8, -0.8, 0.8]);
      g.alpha(1);
    },
  },

  // Café: vapor subindo da xícara
  java: {
    dur: 3.6,
    rest: 0.2,
    draw(g, t) {
      g.ring([0, 0, 0], 1.7);
      g.cylinder([0, 0], 1, 0.15, 1.75);
      // alça no lado direito da tela (direção +x, -y)
      g.poly(
        Array.from({ length: 13 }, (_, i) => {
          const u = -Math.PI / 2 + (i / 12) * Math.PI;
          const r = 1 + 0.5 * Math.cos(u);
          return [r * Math.SQRT1_2, -r * Math.SQRT1_2, 0.95 + 0.48 * Math.sin(u)] as P3;
        }),
      );
      g.accent(true);
      for (let k = 0; k < 3; k++) {
        const phase = (t + k / 3) % 1;
        g.alpha(Math.sin(Math.PI * phase) * 0.95);
        const base = (k - 1) * 0.42;
        g.poly(
          Array.from({ length: 12 }, (_, i) => {
            const s = i / 11;
            const d = base + 0.16 * Math.sin(TAU * (s * 1.1 - phase));
            return [d * 0.5, -d * 0.5, 2.0 + phase * 0.9 + s * 0.9] as P3;
          }),
        );
      }
      g.alpha(1).accent(false);
    },
  },

  // Dados: barras de um gráfico mudando de valor
  python: {
    dur: 4,
    rest: 0.3,
    draw(g, t) {
      g.box([-1.8, -0.7, 0], [3.6, 1.4, 0.14]);
      const tops: P3[] = [];
      for (let i = 0; i < 5; i++) {
        const x = -1.62 + i * 0.68;
        const h = 0.45 + 1.3 * (0.5 + 0.5 * Math.sin(TAU * (t - i * 0.16)));
        g.box([x, -0.35, 0.14], [0.48, 0.7, h]);
        tops.push([x + 0.24, 0, 0.14 + h + 0.4]);
      }
      g.accent(true);
      g.poly(tops);
      g.accent(false);
    },
  },

  // API assíncrona: requisições entram e respostas saem pelas duas vias
  fastapi: {
    dur: 2.8,
    rest: 0.1,
    draw(g, t) {
      g.cylinder([0, 0], 0.55, 0, 2.1);
      g.line([-2.6, 0.6, 0.95], [2.6, 0.6, 0.95], true);
      g.line([-2.6, -0.6, 0.95], [2.6, -0.6, 0.95], true);
      g.accent(true);
      for (let lane = 0; lane < 2; lane++) {
        const y = lane === 0 ? 0.6 : -0.6;
        const dir = lane === 0 ? 1 : -1;
        for (let k = 0; k < 3; k++) {
          const u = (2 * t + k / 3 + lane * 0.17) % 1;
          const x = dir * (-2.4 + 4.8 * u);
          g.alpha(clamp01((x + 2.4) / 0.6) * clamp01((2.4 - x) / 0.6));
          g.cube([x, y, 0.82], 0.26);
        }
      }
      g.alpha(1).accent(false);
    },
  },

  // Goroutines: tarefas em canais paralelos, em velocidades diferentes
  go: {
    dur: 3.6,
    rest: 0.15,
    draw(g, t) {
      const lanes = [-1.0, 0, 1.0];
      lanes.forEach((y) => g.box([-2.2, y - 0.3, 0], [4.4, 0.6, 0.08]));
      g.accent(true);
      lanes.forEach((y, j) => {
        const u = ((j + 1) * t + j * 0.3) % 1;
        const x = -2.0 + 4.0 * u;
        g.alpha(clamp01((x + 2.0) / 0.4) * clamp01((2.0 - x) / 0.4));
        g.cube([x, y, 0.08], 0.38);
      });
      g.alpha(1).accent(false);
    },
  },

  // Componentes: elétrons em órbita ao redor do núcleo
  react: {
    dur: 4,
    rest: 0.12,
    draw(g, t) {
      g.sphere([0, 0, 0], 0.42);
      g.ring([0, 0, 0], 1.7);
      g.curve(arc(48, (u) => [1.7 * Math.cos(u), 0, 1.7 * Math.sin(u)]), 0);
      g.curve(arc(48, (u) => [0, 1.7 * Math.cos(u), 1.7 * Math.sin(u)]), 0);
      const a = TAU * t;
      g.accent(true);
      g.circle([1.7 * Math.cos(a), 1.7 * Math.sin(a), 0], 0.13);
      g.circle([1.7 * Math.cos(a + 2.1), 0, 1.7 * Math.sin(a + 2.1)], 0.13);
      g.circle([0, 1.7 * Math.cos(-a + 4.2), 1.7 * Math.sin(-a + 4.2)], 0.13);
      g.accent(false);
    },
  },

  // Tipagem: a peça só encaixa no molde certo — e a checagem passa
  typescript: {
    dur: 4,
    rest: 0.62,
    draw(g, t) {
      g.box([-1.6, -1.6, 0], [3.2, 3.2, 0.3]);
      g.poly([
        [-0.5, -0.5, 0.3],
        [0.5, -0.5, 0.3],
        [0.5, 0.5, 0.3],
        [-0.5, 0.5, 0.3],
        [-0.5, -0.5, 0.3],
      ]);
      const z = 0.3 + 2.2 * (1 - ease(seg(t, 0.05, 0.45)));
      g.alpha(window01(t, 0, 0.85, 0.06)).accent(true);
      g.box([-0.5, -0.5, z], [1, 1, 1]);
      g.alpha(window01(t, 0.5, 0.85, 0.06));
      const o: P3 = [1.25, -1.25, 1.7];
      g.poly(
        (
          [
            [0, 0.3],
            [0.25, 0.05],
            [0.75, 0.6],
          ] as [number, number][]
        ).map(([u, v]) => [o[0] + u * 0.5, o[1] - u * 0.5, o[2] + v] as P3),
      );
      g.alpha(1).accent(false);
    },
  },

  // Versionamento: commits surgem na ordem, com branch e merge
  github: {
    dur: 5.5,
    rest: 0.8,
    draw(g, t) {
      g.line([-2.2, 0, 0], [2.3, 0, 0]);
      g.poly([
        [-1.1, 0, 0],
        [-0.6, -1.1, 0],
        [0.7, -1.1, 0],
        [1.2, 0, 0],
      ]);
      const commits: [number, number, number][] = [
        [-1.9, 0, 0.0],
        [-1.1, 0, 0.1],
        [-0.45, -1.1, 0.22],
        [0.1, 0, 0.34],
        [0.55, -1.1, 0.46],
        [1.2, 0, 0.6],
        [1.95, 0, 0.72],
      ];
      g.accent(true);
      commits.forEach(([x, y, at]) => {
        g.alpha(window01(t, at, 0.9, 0.06));
        g.cube([x, y, 0], 0.34);
      });
      g.alpha(1).accent(false);
    },
  },

  // Embarcados: sinais percorrendo as trilhas a partir do chip
  code: {
    dur: 2.8,
    rest: 0.3,
    draw(g, t) {
      g.box([-1.8, -1.8, 0], [3.6, 3.6, 0.16]);
      g.box([-0.7, -0.7, 0.16], [1.4, 1.4, 0.34]);
      const offsets = [-0.45, -0.15, 0.15, 0.45];
      offsets.forEach((o) => {
        g.line([o, 0.7, 0.16], [o, 1.6, 0.16]);
        g.line([0.7, o, 0.16], [1.6, o, 0.16]);
        g.line([o, -0.7, 0.16], [o, -1.15, 0.16], true);
        g.line([-0.7, o, 0.16], [-1.15, o, 0.16], true);
      });
      g.accent(true);
      offsets.forEach((o, i) => {
        [0, 1].forEach((side) => {
          const u = (t + i * 0.23 + side * 0.11) % 1;
          const p = 0.75 + u * 0.8;
          g.alpha(Math.sin(Math.PI * u));
          g.cube(side === 0 ? [o, p, 0.16] : [p, o, 0.16], 0.12);
        });
      });
      g.alpha(1).accent(false);
    },
  },
};

const FRAMES = 36;
const DISPLAY = 180;

function build(name: string) {
  const scene = scenes[name] ?? scenes.nodejs;
  const frames = Array.from({ length: FRAMES }, (_, i) => {
    const g = new Drawing();
    scene.draw(g, (scene.rest + i / FRAMES) % 1);
    return g;
  });

  // Enquadramento pela união de todos os quadros: nada sai da área ao animar
  const xs = frames.flatMap((f) => f.points.map((p) => p[0]));
  const ys = frames.flatMap((f) => f.points.map((p) => p[1]));
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const w = Math.max(...xs) - minX;
  const h = Math.max(...ys) - minY;
  const side = Math.max(w, h) * 1.12;
  const ox = r3(minX - (side - w) / 2);
  const oy = r3(minY - (side - h) / 2);

  const count = frames[0].strokes.length;
  const animatable = frames.every((f) => f.strokes.length === count);

  const strokes = frames[0].strokes.map((s, j) => {
    if (!animatable) return { ...s, dValues: null, aValues: null };
    const ds = frames.map((f) => f.strokes[j].d);
    const as = frames.map((f) => f.strokes[j].alpha);
    const dMoves = ds.some((d) => d !== ds[0]);
    const aMoves = as.some((a) => a !== as[0]);
    return {
      ...s,
      dValues: dMoves ? [...ds, ds[0]].join(";") : null,
      aValues: aMoves ? [...as, as[0]].map(r3).join(";") : null,
    };
  });

  return {
    strokes,
    dur: `${scene.dur}s`,
    viewBox: `${ox} ${oy} ${r3(side)} ${r3(side)}`,
    unit: side / DISPLAY,
  };
}

interface IsoGlyphProps {
  name: string;
  /** Quando ativo, o traço se redesenha e a cena anima. */
  active?: boolean;
  /** Desliga a animação contínua (movimento reduzido). */
  still?: boolean;
  className?: string;
}

export function IsoGlyph({ name, active, still, className }: IsoGlyphProps) {
  const { strokes, viewBox, unit, dur } = useMemo(() => build(name), [name]);
  const animate = !!active && !still;
  const sw = unit * 1.1;

  return (
    // key remonta o SVG: a linha do tempo SMIL e o desenho recomeçam a cada ativação
    <svg
      key={animate ? "on" : "off"}
      viewBox={viewBox}
      aria-hidden="true"
      className={cn(
        "aspect-square w-full max-w-45",
        active && "iso-active",
        animate && "iso-drawing",
        className,
      )}
    >
      {strokes.map((s, i) => (
        <path
          key={i}
          d={s.d}
          opacity={s.alpha === 1 ? undefined : s.alpha}
          pathLength={s.hidden ? undefined : 1}
          className={cn(s.hidden ? "iso-hidden" : "iso-solid", s.accent && "iso-accent")}
          style={
            s.hidden ? { strokeDasharray: `${unit * 3} ${unit * 3}`, strokeWidth: sw } : { strokeWidth: sw }
          }
        >
          {animate && s.dValues && (
            <animate attributeName="d" values={s.dValues} dur={dur} repeatCount="indefinite" />
          )}
          {animate && s.aValues && (
            <animate attributeName="opacity" values={s.aValues} dur={dur} repeatCount="indefinite" />
          )}
        </path>
      ))}
    </svg>
  );
}
