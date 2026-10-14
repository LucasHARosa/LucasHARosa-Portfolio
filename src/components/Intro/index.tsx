import { ArrowDown, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Suspense, lazy, useEffect, useState } from "react";
import foto from "@/assets/profile.jpg";
import { Button } from "@/components/ui/Button";
import { DecodeText } from "@/components/ui/DecodeText";
import { Marker } from "@/components/ui/Marker";
import { Tag } from "@/components/ui/Tag";

const EdgeScene = lazy(() => import("./EdgeScene"));

const STACKS = [
  "Java · Spring Boot",
  "Node.js · NestJS",
  "Python · FastAPI · Django",
  "Go",
  "React · Next.js",
  "React Native · Expo",
];

function CyclingStack() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % STACKS.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span aria-live="off">
      <DecodeText key={index} text={STACKS[index]} duration={500} delay={index === 0 ? 1200 : 0} />
    </span>
  );
}

export function Intro() {
  return (
    <section id="Home" aria-label="Apresentação" className="relative overflow-hidden">
      {/* Guias verticais do topo da prancha */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 grid h-20 grid-cols-4 md:h-28 md:grid-cols-6"
      >
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className={i === 0 ? "" : "border-l border-line max-md:[&:nth-child(n+5)]:hidden"} />
        ))}
      </div>

      <div className="grid items-center gap-y-6 px-4 pt-28 pb-12 sm:px-8 md:pt-36 lg:min-h-[calc(100dvh-3.5rem)] lg:grid-cols-12 lg:gap-x-8 lg:px-12 lg:pt-28 lg:pb-16">
        <div className="lg:col-span-6">
          <p className="mb-3 font-mono text-label text-dim">Hello!</p>
          <h1 className="font-mono text-display tracking-tight">
            <DecodeText text="Lucas Rosa" delay={350} duration={1000} />
          </h1>
          <Marker className="mt-6">Software Engineer | Full-Stack</Marker>

          {/* Linha de metadados em duas células */}
          <div className="mt-8 flex flex-wrap items-stretch gap-y-4">
            <div className="flex items-center gap-3 pr-6">
              <img
                src={foto}
                alt=""
                width={40}
                height={40}
                className="size-10 border border-line object-cover grayscale"
              />
              <div className="leading-snug">
                <p className="text-[0.9375rem] text-ink">Lucas Henrique Alves Rosa</p>
                <p className="text-[0.875rem] text-dim">Eng. Mecatrônico, UnB</p>
              </div>
            </div>
            <div className="min-w-[16rem] border-line leading-snug sm:border-l sm:pl-6 lg:border-l-0 lg:pl-0 xl:border-l xl:pl-6">
              <p className="font-mono text-[0.9375rem] text-ink">
                <CyclingStack />
              </p>
              <p className="text-[0.875rem] text-dim">Stacks com que trabalho</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/projetos" variant="signal">
              Projetos
            </Button>
            <Button href="#Contato">Contato</Button>
            <Button href="https://github.com/LucasHARosa" aria-label="GitHub (abre em nova aba)">
              <FaGithub /> Github
            </Button>
            <Button
              href="https://www.linkedin.com/in/lucas-henrique-alves-rosa/"
              aria-label="LinkedIn (abre em nova aba)"
            >
              <FaLinkedinIn /> Linkedin
            </Button>
          </div>

          <a
            href="https://bbs.lucasrosa.dev.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1 text-[0.9375rem] text-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            Portfolio BBS
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="lg:col-span-6">
          <div className="h-[300px] sm:h-[400px] lg:h-[540px]">
            <Suspense fallback={null}>
              <EdgeScene />
            </Suspense>
          </div>
          <div className="mt-2 flex gap-2 lg:hidden">
            <Tag>Web</Tag>
            <Tag>Back-end</Tag>
            <Tag>Mobile</Tag>
          </div>
        </div>
      </div>

      <a
        href="#SobreMim"
        className="mx-4 mb-8 inline-flex items-center gap-2 font-mono text-label text-dim transition-colors hover:text-ink sm:mx-8 lg:mx-12"
      >
        <ArrowDown className="size-4" aria-hidden="true" />
        Role para ver mais
      </a>
    </section>
  );
}
