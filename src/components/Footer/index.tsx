import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Logo } from "@/components/ui/Logo";
import { copyEmail, EMAIL } from "@/lib/email";

const NAV = [
  { label: "Início", to: "/#Home" },
  { label: "Sobre", to: "/#SobreMim" },
  { label: "Projetos", to: "/projetos" },
  { label: "Contato", to: "/#Contato" },
];

const linkClass = "text-dim transition-colors hover:text-ink";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="grid gap-10 px-4 py-14 sm:px-8 md:grid-cols-12 md:gap-8 lg:px-12">
        <div className="md:col-span-6">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="font-medium">Lucas Rosa</span>
          </div>
          <p className="mt-4 max-w-md text-[0.9375rem] text-dim">
            Transformando ideias em experiências digitais excepcionais com precisão e criatividade.
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <p className="font-mono text-label text-dim">Navegação</p>
          <ul className="mt-4 space-y-2 text-[0.9375rem]">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="font-mono text-label text-dim">Redes</p>
          <ul className="mt-4 space-y-2 text-[0.9375rem]">
            <li>
              <a href="https://github.com/LucasHARosa" target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <FaGithub aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/lucas-henrique-alves-rosa/" target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <FaLinkedinIn aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <button type="button" onClick={copyEmail} className={`${linkClass} inline-flex items-center gap-2 text-left`}>
                <MdOutlineEmail aria-hidden="true" /> {EMAIL}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-4 py-5 font-mono text-label text-dim sm:px-8 lg:px-12">
        © {currentYear} Lucas Rosa. Todos os direitos reservados.
      </div>
    </footer>
  );
}
