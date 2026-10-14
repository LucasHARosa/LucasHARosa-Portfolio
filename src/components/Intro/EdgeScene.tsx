import { useEffect, useRef } from "react";
import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { useTheme } from "@/hooks/useTheme";

/*
 * O hero: uma estação de trabalho desenhada como vista técnica isométrica.
 * Cada peça é uma primitiva com arestas sólidas; as arestas encobertas são
 * desenhadas tracejadas (teste de profundidade invertido sobre uma pré-passada
 * que só escreve profundidade). Monitor = Web, torre = Back-end, celular = Mobile.
 */

interface Callout {
  id: string;
  label: string;
  detail: string;
  anchor: THREE.Vector3;
  /** Deslocamento em px do ponto onde a linha termina, a partir da âncora. */
  offset: [number, number];
  /** Lado em que o texto fica em relação ao fim da linha. */
  side: "left" | "right";
}

const CALLOUTS: Callout[] = [
  {
    id: "web",
    label: "Web",
    detail: "React, Next.js, TypeScript",
    anchor: new THREE.Vector3(-2.45, 3.7, -1.11),
    offset: [-48, -36],
    side: "left",
  },
  {
    id: "backend",
    label: "Back-end",
    detail: "Java, Node.js\nPython, Go",
    anchor: new THREE.Vector3(3.97, 3.3, -2.2),
    offset: [-10, -84],
    side: "left",
  },
  {
    id: "mobile",
    label: "Mobile",
    detail: "React Native, Expo",
    anchor: new THREE.Vector3(-3.5, 0.08, 2.0),
    offset: [0, 96],
    side: "right",
  },
];

const DRAW_MS = 1900;

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

interface Part {
  lines: LineSegments2[];
}

function buildWorkstation(solid: LineMaterial, hidden: LineMaterial, depth: THREE.Material) {
  const root = new THREE.Group();
  const lines: LineSegments2[] = [];

  function box(
    size: [number, number, number],
    pos: [number, number, number],
    rotY = 0,
    parent: THREE.Object3D = root,
  ): Part {
    const geo = new THREE.BoxGeometry(...size);
    const holder = new THREE.Group();
    holder.position.set(...pos);
    holder.rotation.y = rotY;

    const mesh = new THREE.Mesh(geo, depth);
    mesh.renderOrder = 0;
    holder.add(mesh);

    const edges = new THREE.EdgesGeometry(geo);
    const front = new LineSegments2(new LineSegmentsGeometry().fromEdgesGeometry(edges), solid);
    front.renderOrder = 1;
    const back = new LineSegments2(new LineSegmentsGeometry().fromEdgesGeometry(edges), hidden);
    back.computeLineDistances();
    back.renderOrder = 2;
    holder.add(front, back);
    parent.add(holder);

    const part = { lines: [front, back] };
    lines.push(...part.lines);
    return part;
  }

  /** Segmentos soltos (sem volume): detalhes de superfície. */
  function strokes(points: number[], material = solid, parent: THREE.Object3D = root) {
    const geo = new LineSegmentsGeometry().setPositions(points);
    const seg = new LineSegments2(geo, material);
    seg.renderOrder = 1;
    parent.add(seg);
    lines.push(seg);
    return seg;
  }

  // Mesa
  box([9.6, 0.22, 4.8], [0, -0.11, 0]);

  // Monitor: painel, tela, pescoço e base
  const SCREEN_Z = -1.2 + 0.09;
  box([4.3, 2.7, 0.18], [-0.3, 2.35, -1.2]);
  box([0.38, 1.05, 0.2], [-0.3, 0.6, -1.36]);
  box([1.7, 0.09, 0.95], [-0.3, 0.045, -1.28]);

  // Tela: moldura interna e linhas de código
  const sx0 = -0.3 - 1.98;
  const sx1 = -0.3 + 1.98;
  const sy0 = 2.35 - 1.18;
  const sy1 = 2.35 + 1.18;
  const z = SCREEN_Z + 0.004;
  strokes([
    sx0, sy0, z, sx1, sy0, z,
    sx1, sy0, z, sx1, sy1, z,
    sx1, sy1, z, sx0, sy1, z,
    sx0, sy1, z, sx0, sy0, z,
  ]);

  const code: number[] = [];
  const rows: [number, number][] = [
    [0, 1.4], [0.25, 2.1], [0.25, 1.6], [0.5, 1.2], [0.5, 2.3],
    [0.25, 0.8], [0, 0.5], [0, 1.9], [0.25, 1.3],
  ];
  rows.forEach(([indent, len], i) => {
    const y = sy1 - 0.28 - i * 0.22;
    const x = sx0 + 0.24 + indent;
    code.push(x, y, z, x + len, y, z);
  });
  strokes(code);

  // Cursor — o único toque de cor do desenho
  const cursorY = sy1 - 0.28 - rows.length * 0.22;
  const cursor = new THREE.Mesh(
    new THREE.PlaneGeometry(0.11, 0.17),
    new THREE.MeshBasicMaterial({ color: 0xff4f00 }),
  );
  cursor.position.set(sx0 + 0.3, cursorY, z + 0.002);
  cursor.renderOrder = 3;
  root.add(cursor);

  // Teclado: corpo + teclas
  box([3.3, 0.12, 1.15], [-0.3, 0.06, 0.95]);
  const keyW = 0.2;
  const pitch = 0.255;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 12; c++) {
      box([keyW, 0.05, 0.18], [-0.3 - 1.4 + c * pitch, 0.145, 0.62 + r * 0.24]);
    }
  }
  box([1.6, 0.05, 0.18], [-0.3, 0.145, 0.62 + 3 * 0.24]);

  // Mouse
  box([0.36, 0.13, 0.58], [1.9, 0.065, 1.0]);

  // Torre (Back-end): gabinete, baias e botão
  box([1.35, 3.3, 3.1], [3.3, 1.65, -0.65]);
  const tz = -0.65 + 1.55 + 0.004;
  const tx0 = 3.3 - 0.45;
  const tx1 = 3.3 + 0.45;
  const bays: number[] = [];
  [2.95, 2.65].forEach((y) => {
    bays.push(tx0, y, tz, tx1, y, tz, tx1, y, tz, tx1, y - 0.18, tz);
    bays.push(tx1, y - 0.18, tz, tx0, y - 0.18, tz, tx0, y - 0.18, tz, tx0, y, tz);
  });
  // grelha de ventilação
  for (let i = 0; i < 6; i++) {
    const y = 0.5 + i * 0.12;
    bays.push(tx0, y, tz, tx1, y, tz);
  }
  strokes(bays);
  // botão de energia: círculo
  const ring: number[] = [];
  for (let i = 0; i < 24; i++) {
    const a0 = (i / 24) * Math.PI * 2;
    const a1 = ((i + 1) / 24) * Math.PI * 2;
    ring.push(
      3.3 + Math.cos(a0) * 0.12, 2.15 + Math.sin(a0) * 0.12, tz,
      3.3 + Math.cos(a1) * 0.12, 2.15 + Math.sin(a1) * 0.12, tz,
    );
  }
  strokes(ring);

  // Celular (Mobile) deitado na mesa
  const phone = new THREE.Group();
  phone.position.set(-3.4, 0, 1.15);
  phone.rotation.y = 0.35;
  root.add(phone);
  box([0.8, 0.08, 1.55], [0, 0.04, 0], 0, phone);
  const py = 0.081;
  strokes(
    [
      -0.32, py, -0.66, 0.32, py, -0.66,
      0.32, py, -0.66, 0.32, py, 0.62,
      0.32, py, 0.62, -0.32, py, 0.62,
      -0.32, py, 0.62, -0.32, py, -0.66,
    ],
    solid,
    phone,
  );

  return { root, lines, cursor };
}

export default function EdgeScene() {
  const { theme } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const apiRef = useRef<{ setColors: () => void } | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);

    const solid = new LineMaterial({ color: 0xffffff, linewidth: 1.25, worldUnits: false });
    const hidden = new LineMaterial({
      color: 0xffffff,
      linewidth: 1,
      worldUnits: false,
      dashed: true,
      dashSize: 0.07,
      gapSize: 0.07,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    });
    hidden.depthFunc = THREE.GreaterDepth;
    const depth = new THREE.MeshBasicMaterial({
      colorWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    const { root, lines, cursor } = buildWorkstation(solid, hidden, depth);
    scene.add(root);

    // Enquadramento isométrico
    const bounds = new THREE.Box3().setFromObject(root);
    const center = bounds.getCenter(new THREE.Vector3());
    const radius = bounds.getBoundingSphere(new THREE.Sphere()).radius;
    const view = new THREE.Vector3(1, 0.82, 1).normalize();
    camera.position.copy(center).addScaledVector(view, 30);
    camera.lookAt(center);

    const setColors = () => {
      const ink = new THREE.Color(cssVar("--ink") || "#ededE8");
      const signal = new THREE.Color(cssVar("--signal") || "#ff4f00");
      solid.color.copy(ink);
      hidden.color.copy(ink);
      (cursor.material as THREE.MeshBasicMaterial).color.copy(signal);
    };
    setColors();

    let width = 0;
    let height = 0;
    const resize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      const aspect = width / height;
      const half = radius * 0.97;
      camera.left = -half * Math.max(aspect, 1);
      camera.right = half * Math.max(aspect, 1);
      camera.top = half / Math.min(aspect, 1);
      camera.bottom = -half / Math.min(aspect, 1);
      camera.updateProjectionMatrix();
      solid.resolution.set(width, height);
      hidden.resolution.set(width, height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Desenho progressivo: cada peça entra em sequência
    const counts = lines.map((l) => (l.geometry as LineSegmentsGeometry).attributes.instanceStart.count);
    const setProgress = (p: number) => {
      const n = lines.length;
      lines.forEach((line, i) => {
        const local = THREE.MathUtils.clamp((p - (i / n) * 0.55) / 0.45, 0, 1);
        (line.geometry as LineSegmentsGeometry).instanceCount = Math.floor(local * counts[i]);
      });
      cursor.visible = p >= 1;
    };

    // Chamadas: projeta as âncoras para a tela a cada quadro
    const projected = new THREE.Vector3();
    const updateCallouts = () => {
      const svg = svgRef.current;
      if (!svg) return;
      CALLOUTS.forEach((c, i) => {
        projected.copy(c.anchor).applyMatrix4(root.matrixWorld).project(camera);
        const x = (projected.x * 0.5 + 0.5) * width;
        const y = (-projected.y * 0.5 + 0.5) * height;
        const label = labelRefs.current[i];
        const lw = label?.offsetWidth ?? 0;
        const lh = label?.offsetHeight ?? 0;
        // fim da linha, mantido dentro do quadro com espaço para o texto
        const ex = THREE.MathUtils.clamp(
          x + c.offset[0],
          c.side === "left" ? lw + 14 : 8,
          c.side === "left" ? width - 8 : width - lw - 14,
        );
        const ey = THREE.MathUtils.clamp(y + c.offset[1], 8, height - lh - 8);
        const lx = c.side === "left" ? ex - lw - 6 : ex + 6;
        const ly = ey - 6;
        const lineEl = svg.querySelector<SVGLineElement>(`[data-line="${c.id}"]`);
        const dotEl = svg.querySelector<SVGCircleElement>(`[data-dot="${c.id}"]`);
        lineEl?.setAttribute("x1", String(x));
        lineEl?.setAttribute("y1", String(y));
        lineEl?.setAttribute("x2", String(ex));
        lineEl?.setAttribute("y2", String(ey));
        dotEl?.setAttribute("cx", String(x));
        dotEl?.setAttribute("cy", String(y));
        if (label) label.style.transform = `translate(${lx}px, ${ly}px)`;
      });
    };

    // Paralaxe sutil com o ponteiro (só desktop)
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    if (finePointer && !reduce) window.addEventListener("pointermove", onPointer);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    let raf = 0;
    let start: number | null = null;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (start === null) start = now;
      const p = reduce ? 1 : Math.min((now - start) / DRAW_MS, 1);
      setProgress(p);

      root.rotation.y += (target.x * 0.1 - root.rotation.y) * 0.05;
      root.rotation.x += (target.y * 0.035 - root.rotation.x) * 0.05;
      if (p >= 1 && !reduce) cursor.visible = Math.floor(now / 530) % 2 === 0;

      root.updateMatrixWorld();
      updateCallouts();
      renderer.render(scene, camera);
    };

    if (reduce) {
      setProgress(1);
      root.updateMatrixWorld();
      renderer.render(scene, camera);
      updateCallouts();
      // ainda redesenha em resize / troca de tema
      const redraw = () => {
        renderer.render(scene, camera);
        updateCallouts();
      };
      ro.disconnect();
      const ro2 = new ResizeObserver(() => {
        resize();
        redraw();
      });
      ro2.observe(mount);
      apiRef.current = {
        setColors: () => {
          setColors();
          redraw();
        },
      };
      return () => {
        ro2.disconnect();
        io.disconnect();
        renderer.dispose();
        mount.removeChild(renderer.domElement);
      };
    }

    raf = requestAnimationFrame(loop);
    apiRef.current = { setColors };

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      root.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof LineSegments2) obj.geometry.dispose();
      });
      solid.dispose();
      hidden.dispose();
      depth.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    apiRef.current?.setColors();
  }, [theme]);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="absolute inset-0" />
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-ink max-lg:hidden"
        style={{ animation: "fade-in 0.6s 1.9s both" }}
      >
        {CALLOUTS.map((c) => (
          <g key={c.id}>
            <line data-line={c.id} stroke="currentColor" strokeWidth="1" strokeDasharray="1 3" />
            <circle data-dot={c.id} r="2.5" fill="currentColor" />
          </g>
        ))}
      </svg>
      <ul
        className="pointer-events-none absolute inset-0 max-lg:hidden"
        style={{ animation: "fade-in 0.6s 1.9s both" }}
      >
        {CALLOUTS.map((c, i) => (
          <li key={c.id} className="contents">
            <div
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className={`absolute top-0 left-0 font-mono text-[11px] leading-tight whitespace-nowrap ${c.side === "left" ? "text-right" : ""}`}
            >
              <span className="block text-ink">{c.label}</span>
              <span className="block whitespace-pre-line text-dim">{c.detail}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
