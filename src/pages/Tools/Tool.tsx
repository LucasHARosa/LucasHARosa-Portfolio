import { Share2, Star } from "lucide-react";
import { Suspense, lazy, useEffect, type ComponentType, type LazyExoticComponent } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageMeta } from "@/components/PageMeta";
import { ToolCard } from "@/components/tools/ToolCard";
import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Marker } from "@/components/ui/Marker";
import { Section } from "@/components/ui/Section";
import { buscarFerramenta } from "@/data/ferramentas";
import { useFavoriteTools } from "@/hooks/useFavoriteTools";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

// Cada ferramenta é um chunk próprio: abrir o JWT não baixa o gerador de QR Code
const componentes: Record<string, LazyExoticComponent<ComponentType>> = {
  uuid: lazy(() => import("@/components/tools/UuidGenerator")),
  hash: lazy(() => import("@/components/tools/HashGenerator")),
  json: lazy(() => import("@/components/tools/JsonFormatter")),
  ip: lazy(() => import("@/components/tools/IpViewer")),
  jwt: lazy(() => import("@/components/tools/JwtDecoder")),
  senha: lazy(() => import("@/components/tools/PasswordGenerator")),
  qrcode: lazy(() => import("@/components/tools/QrCodeGenerator")),
  paleta: lazy(() => import("@/components/tools/ColorPalette")),
  cores: lazy(() => import("@/components/tools/ColorConverter")),
};

async function share(title: string) {
  const url = window.location.href;
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return;
    } catch (error) {
      // Cancelado pelo usuário: não faz nada
      if ((error as DOMException).name === "AbortError") return;
    }
  }
  copyText(url, "Link copiado!");
}

export function Tool() {
  const { slug } = useParams();
  const ferramenta = buscarFerramenta(slug);
  const { isFavorite, toggle } = useFavoriteTools();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!ferramenta) return <Navigate to="/ferramentas" replace />;

  const Componente = componentes[ferramenta.slug];
  const Icon = ferramenta.icone;
  const favorite = isFavorite(ferramenta.slug);
  // Mesmo título que scripts/route-meta.mjs
  const title = `${ferramenta.nome} | Lucas Rosa`;
  const relacionadas = ferramenta.relacionadas
    .map(buscarFerramenta)
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <>
      <PageMeta path={`/ferramentas/${ferramenta.slug}`} title={title} description={ferramenta.descricao} />

      <Frame>
        <Header />
        <main>
          <header className="px-4 pt-12 pb-10 sm:px-8 md:pt-16 md:pb-12 lg:px-12">
            <nav aria-label="Trilha" className="font-mono text-label text-dim">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="hover:text-ink">
                    Início
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/ferramentas" className="hover:text-ink">
                    Ferramentas
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink">
                  {ferramenta.nome}
                </li>
              </ol>
            </nav>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
              <div className="flex min-w-0 items-start gap-4">
                <span className="hidden size-14 shrink-0 place-items-center rounded-xs border border-line text-ink sm:grid">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h1 className="font-mono text-h2 tracking-tight">{ferramenta.nome}</h1>
                  <p className="mt-3 max-w-read text-dim">{ferramenta.descricao}</p>
                  {!ferramenta.externa && (
                    <Marker className="mt-4 text-dim">Processado no navegador · nada é enviado</Marker>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={() => toggle(ferramenta.slug)} aria-pressed={favorite}>
                  <Star aria-hidden="true" className={cn(favorite && "fill-signal text-signal")} />
                  {favorite ? "Favorita" : "Favoritar"}
                </Button>
                <Button size="sm" onClick={() => share(title)}>
                  <Share2 aria-hidden="true" /> Compartilhar
                </Button>
              </div>
            </div>
          </header>

          <div className="border-t border-line px-4 pt-8 pb-16 sm:px-8 md:pb-24 lg:px-12">
            <Suspense
              fallback={
                <p role="status" className="font-mono text-label text-dim">
                  Carregando ferramenta…
                </p>
              }
            >
              <Componente key={ferramenta.slug} />
            </Suspense>
          </div>

          <Section
            title="Ferramentas relacionadas"
            aside={
              <Button to="/ferramentas" variant="ghost" className="self-start underline decoration-line-strong underline-offset-4">
                Ver todas as ferramentas
              </Button>
            }
            flush
          >
            <ul className="grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {relacionadas.map((f) => (
                <li key={f.slug} className="bg-bg">
                  <ToolCard ferramenta={f} favorite={isFavorite(f.slug)} />
                </li>
              ))}
            </ul>
          </Section>
        </main>
        <Footer />
      </Frame>
    </>
  );
}
