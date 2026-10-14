import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

// Mesma ordem das seções na página
const NAV = [
  { name: "Início", section: "Home" },
  { name: "Sobre mim", section: "SobreMim" },
  { name: "Projetos", section: "Projetos", route: "/projetos" },
  { name: "Habilidades", section: "Skills" },
  { name: "Experiência", section: "Experiencia" },
  { name: "Artigos", section: "Artigos", route: "/blog" },
  { name: "Educação", section: "Educacao" },
  { name: "Contato", section: "Contato" },
];

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    if (!enabled) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // "ProjetosRating" pertence ao item "Projetos" do menu
            setActive(entry.target.id === "ProjetosRating" ? "Projetos" : entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "claro" : "escuro";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Mudar para o tema ${next}`}
      title={`Tema ${next}`}
      className="grid size-9 place-items-center rounded-xs border border-line text-dim transition-colors hover:border-ink hover:text-ink"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const active = useActiveSection(isHome);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const hrefFor = (section: string) => (isHome ? `#${section}` : `/#${section}`);
  const isActive = (item: (typeof NAV)[number]) =>
    item.route
      ? location.pathname === item.route || (isHome && active === item.section)
      : isHome && active === item.section;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  const renderLink = (
    item: (typeof NAV)[number],
    className: string,
    ref?: React.Ref<HTMLAnchorElement>,
  ) => {
    const current = isActive(item);
    const content = (
      <>
        <span
          aria-hidden="true"
          className={cn("size-1.5 shrink-0 bg-signal transition-opacity", current ? "opacity-100" : "opacity-0")}
        />
        {item.name}
      </>
    );
    const props = {
      className: cn(className, current ? "text-ink" : "text-dim hover:text-ink"),
      "aria-current": current ? ("page" as const) : undefined,
      onClick: () => setOpen(false),
    };
    return item.route ? (
      <Link to={item.route} ref={ref} {...props}>
        {content}
      </Link>
    ) : (
      <a href={hrefFor(item.section)} ref={ref} {...props}>
        {content}
      </a>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        <Link
          to="/"
          className="flex items-center gap-3 text-ink"
          aria-label="Lucas Rosa, página inicial"
        >
          <Logo />
          <span className="hidden text-[0.9375rem] font-medium whitespace-nowrap sm:inline">Lucas Rosa</span>
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-5 xl:gap-6">
            {NAV.map((item) => (
              <li key={item.section}>
                {renderLink(item, "flex items-center gap-2 whitespace-nowrap text-[0.875rem] transition-colors")}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href={hrefFor("Contato")} variant="signal" size="sm" className="hidden sm:inline-flex">
            Falar comigo
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid size-9 place-items-center rounded-xs border border-line text-ink xl:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg xl:hidden"
          >
            <ul className="mx-3 border-x border-line sm:mx-6">
              {NAV.map((item, i) => (
                <li key={item.section} className="border-b border-line">
                  {renderLink(
                    item,
                    "flex min-h-14 items-center gap-3 px-4 font-mono text-[1.375rem] sm:px-8",
                    i === 0 ? firstLinkRef : undefined,
                  )}
                </li>
              ))}
              <li className="p-4 sm:px-8">
                <Button href={hrefFor("Contato")} variant="signal" className="w-full" onClick={() => setOpen(false)}>
                  Falar comigo
                </Button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
