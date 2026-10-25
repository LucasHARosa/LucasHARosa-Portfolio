import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { IsoGlyph } from "@/components/ui/IsoGlyph";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tag } from "@/components/ui/Tag";
import { dadosEInfra, listaSkills, ondeUsei, type SkillProps } from "@/data/data";

/** Ordem das camadas na página. */
const CAMADAS = ["Back-end", "Web", "Web e Back-end", "Mobile", "Workflow", "Embarcados"];

const grupos = CAMADAS.map((camada) => ({
  camada,
  skills: listaSkills.filter((s) => s.camada === camada),
})).filter((g) => g.skills.length > 0);

function SkillRow({ skill }: { skill: SkillProps }) {
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  const { empresas, projetos } = ondeUsei(skill.id);

  return (
    <li
      className="grid gap-6 border-b border-line px-4 py-10 sm:px-8 md:grid-cols-12 md:gap-8 lg:px-12"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div className="grid place-items-center text-ink md:col-span-3 md:place-items-start">
        <IsoGlyph name={skill.id} active={hovered} still={!!reduce} className="max-w-32 md:max-w-37.5" />
      </div>

      <div className="md:col-span-9">
        <h3 className="text-[2rem] leading-[0.95] font-semibold tracking-[-0.02em] uppercase">{skill.titulo}</h3>
        <p className="mt-4 max-w-read text-[0.9375rem] leading-relaxed text-dim">{skill.description}</p>

        <dl className="mt-8 grid gap-x-8 gap-y-5 text-[0.9375rem] sm:grid-cols-[8rem_1fr]">
          <dt className="font-mono text-label text-dim sm:pt-1">Ferramentas</dt>
          <dd className="flex flex-wrap gap-1.5">
            {skill.tecnologiasAxiliares.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </dd>

          {empresas.length > 0 && (
            <>
              <dt className="font-mono text-label text-dim sm:pt-0.5">Experiências</dt>
              <dd>{empresas.join(", ")}</dd>
            </>
          )}

          {projetos.length > 0 && (
            <>
              <dt className="font-mono text-label text-dim sm:pt-0.5">Projetos</dt>
              <dd>{projetos.join(", ")}</dd>
            </>
          )}
        </dl>
      </div>
    </li>
  );
}

export function Skills() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageMeta path="/habilidades" />

      <Frame>
        <Header />
        <main>
          <PageHeader
            eyebrow="Stack completa"
            title="Habilidades e Tecnologias"
            aside={
              <>
                <p>
                  Cada tecnologia com que trabalho, agrupada por camada, e onde usei — nas empresas e nos projetos do
                  portfólio.
                </p>
                <Button to="/projetos" variant="ghost" className="underline decoration-line-strong underline-offset-4">
                  Ver os projetos
                </Button>
              </>
            }
          />

          {grupos.map(({ camada, skills }) => (
            <section key={camada} aria-labelledby={`camada-${camada}`} className="border-t border-line">
              <h2
                id={`camada-${camada}`}
                className="sticky top-14 z-20 flex items-center justify-between border-b border-line bg-bg px-4 py-4 font-mono text-label sm:px-8 lg:px-12"
              >
                <span className="text-ink">{camada.toUpperCase()}</span>
                <span className="text-dim">[{String(skills.length).padStart(2, "0")}]</span>
              </h2>
              <ul>
                {skills.map((skill) => (
                  <SkillRow key={skill.id} skill={skill} />
                ))}
              </ul>
            </section>
          ))}

          <section aria-labelledby="dados-infra" className="border-t border-line">
            <h2
              id="dados-infra"
              className="border-b border-line px-4 py-4 font-mono text-label text-ink sm:px-8 lg:px-12"
            >
              DADOS E INFRAESTRUTURA
            </h2>
            <div className="grid gap-px bg-line md:grid-cols-2">
              {dadosEInfra.map((bloco) => (
                <div key={bloco.titulo} className="bg-bg px-4 py-10 sm:px-8 lg:px-12">
                  <h3 className="font-mono text-h3">{bloco.titulo}</h3>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {bloco.itens.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="h-16 border-t border-line md:h-24" />
        </main>
        <Footer />
      </Frame>
    </>
  );
}
