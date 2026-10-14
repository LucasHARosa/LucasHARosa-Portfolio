import { ArrowUpRight, Copy } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { copyEmail, EMAIL } from "@/lib/email";
import { cn } from "@/lib/utils";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  /** Honeypot: invisível para pessoas; bots que preenchem são descartados pelo Web3Forms. */
  botcheck: boolean;
}

// Chave pública do Web3Forms: só permite enviar mensagens para o e-mail cadastrado.
const WEB3FORMS_KEY = "8ca5386f-09a7-4df1-b887-715e8c6eed27";

const rowClass =
  "group flex min-h-16 w-full items-center gap-4 border-b border-line text-left transition-colors hover:text-ink";

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-2 text-[0.875rem] text-ink">
      <span aria-hidden="true" className="size-1.5 bg-signal" />
      {children}
    </p>
  );
}

const inputClass =
  "w-full border-b border-line-strong bg-transparent py-3 text-ink placeholder:text-dim/70 transition-colors focus:border-signal focus:outline-none";

export function Contact() {
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  async function onSubmit(data: ContactFormData) {
    if (isSending) return;

    setIsSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfólio: nova mensagem de ${data.name}`,
          from_name: "Portfólio lucasrosa.dev.br",
          name: data.name,
          email: data.email,
          replyto: data.email,
          message: data.message,
          botcheck: data.botcheck,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.message ?? `HTTP ${response.status}`);
      }
      toast.success("Mensagem enviada com sucesso!");
      reset();
    } catch (error) {
      console.error("Falha ao enviar pelo Web3Forms:", error);
      toast.error(`Erro ao enviar a mensagem. Se preferir, fale comigo em ${EMAIL}.`);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Section
      id="Contato"
      title="Entre em contato"
      description="Se você deseja discutir um projeto, fazer uma parceria ou apenas bater um papo, estou sempre aberto a novas oportunidades. Não hesite em entrar em contato!"
    >
      <div className="grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="font-mono text-label text-dim">Vamos conversar!</p>
          <ul className="mt-4 border-t border-line text-dim">
            <li>
              <a href="https://wa.me/5561992836376" target="_blank" rel="noreferrer" className={rowClass}>
                <FaWhatsapp className="size-5 shrink-0" aria-hidden="true" />
                <span className="flex-1 font-mono text-lead text-ink">WhatsApp</span>
                <ArrowUpRight className="size-4 transition-colors group-hover:text-signal" aria-hidden="true" />
              </a>
            </li>
            <li>
              <button type="button" onClick={copyEmail} className={rowClass}>
                <MdOutlineEmail className="size-5 shrink-0" aria-hidden="true" />
                <span className="flex-1">
                  <span className="block font-mono text-lead text-ink">Copiar E-mail</span>
                  <span className="block text-[0.875rem]">{EMAIL}</span>
                </span>
                <Copy className="size-4 transition-colors group-hover:text-signal" aria-hidden="true" />
              </button>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/lucas-henrique-alves-rosa/"
                target="_blank"
                rel="noreferrer"
                className={rowClass}
              >
                <FaLinkedinIn className="size-5 shrink-0" aria-hidden="true" />
                <span className="flex-1 font-mono text-lead text-ink">LinkedIn</span>
                <ArrowUpRight className="size-4 transition-colors group-hover:text-signal" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-8 md:col-span-7 lg:col-span-6 lg:col-start-7"
        >
          <div>
            <label htmlFor="contato-nome" className="font-mono text-label text-dim">
              Nome
            </label>
            <input
              id="contato-nome"
              type="text"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "erro-nome" : undefined}
              className={inputClass}
              {...register("name", { required: true })}
            />
            {errors.name && <FieldError id="erro-nome">Nome é obrigatório</FieldError>}
          </div>

          <div>
            <label htmlFor="contato-email" className="font-mono text-label text-dim">
              Email
            </label>
            <input
              id="contato-email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "erro-email" : undefined}
              className={inputClass}
              {...register("email", { required: true })}
            />
            {errors.email && <FieldError id="erro-email">Email é obrigatório</FieldError>}
          </div>

          <div>
            <label htmlFor="contato-mensagem" className="font-mono text-label text-dim">
              Sua mensagem
            </label>
            <textarea
              id="contato-mensagem"
              rows={5}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "erro-mensagem" : undefined}
              className={cn(inputClass, "resize-y")}
              {...register("message", { required: true })}
            />
            {errors.message && <FieldError id="erro-mensagem">Mensagem é obrigatória</FieldError>}
          </div>

          <input
            type="checkbox"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
            {...register("botcheck")}
          />

          <Button type="submit" variant="signal" disabled={isSending} className="self-start">
            {isSending ? "Enviando..." : "Enviar mensagem"}
          </Button>
        </form>
      </div>
    </Section>
  );
}
