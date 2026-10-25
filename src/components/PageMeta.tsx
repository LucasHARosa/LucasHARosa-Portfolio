import { Helmet } from "react-helmet-async";
import routes from "@/data/routes.json";

const SITE = "https://lucasrosa.dev.br";

export type RoutePath = keyof typeof routes;

type PageMetaProps =
  | { path: RoutePath; title?: never; description?: never }
  | { path: string; title: string; description: string };

/**
 * Título, descrição e canonical da página. Rotas fixas leem de routes.json —
 * o mesmo arquivo que scripts/route-meta.mjs usa para gerar o HTML de cada rota.
 */
export function PageMeta(props: PageMetaProps) {
  const { path } = props;
  const { title, description } = props.title ? props : routes[path as RoutePath];
  const url = SITE + path;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}
