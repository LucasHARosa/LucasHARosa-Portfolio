import { Link2 } from "lucide-react";
import { FaApple, FaGithub, FaGooglePlay } from "react-icons/fa";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ProjetosProps } from "@/data/data";

interface LinkItem {
  label: string;
  href: string;
  icon: IconType | LucideIcon;
}

/** Links existentes de um projeto, na ordem: lojas, repositórios, demo. */
function projectLinks(projeto: ProjetosProps): LinkItem[] {
  const links: LinkItem[] = [];
  if (projeto.LinkGoogle) links.push({ label: "Google Play", href: projeto.LinkGoogle, icon: FaGooglePlay });
  if (projeto.LinkApple) links.push({ label: "Apple Store", href: projeto.LinkApple, icon: FaApple });
  if (projeto.LinkGitFront) links.push({ label: "Frontend", href: projeto.LinkGitFront, icon: FaGithub });
  if (projeto.LinkGitBack) links.push({ label: "Backend", href: projeto.LinkGitBack, icon: FaGithub });
  if (projeto.LinkGit && !projeto.LinkGitFront && !projeto.LinkGitBack)
    links.push({ label: "Github", href: projeto.LinkGit, icon: FaGithub });
  if (projeto.Link) links.push({ label: "Link", href: projeto.Link, icon: Link2 });
  return links;
}

export function ProjectLinks({ projeto, size = "md" }: { projeto: ProjetosProps; size?: "md" | "sm" }) {
  const links = projectLinks(projeto);
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map(({ label, href, icon: Icon }) => (
        <Button
          key={href + label}
          href={href}
          size={size}
          aria-label={`${label} de ${projeto.titulo} (abre em nova aba)`}
        >
          <Icon aria-hidden="true" />
          {label}
        </Button>
      ))}
    </div>
  );
}
