import foto from "@/assets/profile.jpg";
import { Section } from "@/components/ui/Section";
import { listaExperiencias } from "@/data/data";

const PARAGRAPHS = [
  "Prazer! Sou Engenheiro Mecatrônico pela UnB e Software Engineer Full-Stack. Trabalho nas três camadas de um produto: back-end com Java/Spring Boot, Node.js/NestJS, Python/FastAPI e Go; web com React, Next.js e TypeScript; e mobile com React Native e Expo.",
  "Atuei em produtos de fintech, energia, logística, esportes, educação e sistemas industriais, com responsabilidade sobre arquitetura, APIs REST, regras de negócio, modelagem de dados, performance e segurança. No caminho, também trabalhei com mensageria (RabbitMQ), cache e pub/sub com Redis, containers com Docker e Kubernetes, CI/CD, WebSockets, SSE, OCR e automações com IA e N8N.",
  "Tenho base em sistemas embarcados e IoT, que é de onde vem meu interesse por performance e por entender o sistema de ponta a ponta. Me candidato tanto a vagas de Software Engineer e Full-Stack quanto a posições específicas de Back-end, Java, React ou React Native.",
];

const FACTS = [
  { key: "Formação", value: "Engenharia Mecatrônica, UnB" },
  { key: "Atuação", value: "Back-end, Web e Mobile" },
  {
    key: "Setores",
    value: "Fintech, energia, logística, esportes, educação e indústria",
  },
  {
    key: "Trajetória",
    value: `${listaExperiencias.length} experiências profissionais`,
  },
];

export function About() {
  return (
    <Section
      id="SobreMim"
      title="Sobre mim"
      description="Software Engineer • Full-Stack • Back-end, Web e Mobile"
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <figure className="md:col-span-5">
          <div className="crop-marks relative border border-line">
            <img
              src={foto}
              alt="Foto de Lucas Rosa"
              width={800}
              height={800}
              loading="lazy"
              className="block aspect-square w-full object-cover"
            />
            {/* Chamada sobre a foto (aponta o lenço do bolso), no estilo de anotação técnica */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <line
                x1="66.5"
                y1="66.5"
                x2="88"
                y2="50"
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="1 3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span
              aria-hidden="true"
              className="absolute size-[5px] -translate-1/2 rounded-full bg-white"
              style={{ left: "66.5%", top: "66.5%" }}
            />
            <span
              aria-hidden="true"
              className="absolute right-[3%] bottom-1/2 bg-black px-1.5 py-1 font-mono text-[11px] leading-tight whitespace-nowrap text-white"
            >
              Eng. Mecatrônico
              <br />
              <span className="text-white/60">UnB</span>
            </span>
          </div>
        </figure>

        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <h3 className="text-h3 font-medium tracking-tight">
            Lucas Henrique Alves Rosa
          </h3>
          <div className="mt-6 max-w-read space-y-5 text-dim">
            {PARAGRAPHS.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <dl className="mt-16 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((fact) => (
          <div
            key={fact.key}
            className="border-r border-b border-line p-4 sm:p-5"
          >
            <dt className="font-mono text-label text-dim">{fact.key}</dt>
            <dd className="mt-2 text-[0.9375rem] leading-snug">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
