import emailjs from "@emailjs/browser";
import { ArrowRight, Envelope, WhatsappLogo } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLinkedin } from "react-icons/fa";
import { toast } from "react-toastify";
import { Title } from "../Title";
import {
  ButtonContainer,
  ContainerContact,
  Content,
  FormContainer,
  SectionContainer,
} from "./styles";

const EMAIL = "lucashrosa99@gmail.com";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

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
      await emailjs.send(
        "service_z6rfo82",
        "template_yw0g23o",
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        "Ph0oPbifsyxX3HebY",
      );
      toast.success("📧 Mensagem enviada com sucesso!");
      reset();
    } catch {
      toast.error(
        `Erro ao enviar a mensagem. Se preferir, fale comigo em ${EMAIL}.`,
      );
    } finally {
      setIsSending(false);
    }
  }

  async function handleCopy() {
    try {
      // clipboard.writeText só existe em contexto seguro (https/localhost)
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        throw new Error("Clipboard indisponível");
      }

      toast("📧 Email copiado!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch {
      toast.info(`Meu e-mail: ${EMAIL}`, {
        position: "top-right",
        autoClose: 6000,
        theme: "dark",
      });
    }
  }

  return (
    <SectionContainer id="Contato">
      <Title
        title="Entre em contato"
        subTitle="Vamos conversar!"
        description="Se você deseja discutir um projeto, fazer uma parceria ou apenas bater um papo, estou sempre aberto a novas oportunidades. Não hesite em entrar em contato!"
      />

      <Content>
        <ContainerContact>
          <div>
            <a href="https://wa.me/5561992836376" target="_blank" rel="noreferrer">
              <WhatsappLogo size={20} />
              <span>WhatsApp</span>
            </a>
          </div>
          <div>
            <button type="button" onClick={handleCopy}>
              <Envelope size={20} />
              <span>Copiar E-mail</span>
            </button>
          </div>

          <div>
            <a
              href="https://www.linkedin.com/in/lucas-henrique-alves-rosa/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </ContainerContact>

        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Nome"
            {...register("name", { required: true })}
          />
          {errors.name && <span>Nome é obrigatório</span>}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Email é obrigatório</span>}

          <textarea
            placeholder="Sua mensagem"
            {...register("message", { required: true })}
          />
          {errors.message && <span>Mensagem é obrigatória</span>}

          <ButtonContainer type="submit" disabled={isSending}>
            {isSending ? "Enviando..." : "Enviar"}
            <ArrowRight size={20} />
          </ButtonContainer>
        </FormContainer>
      </Content>
    </SectionContainer>
  );
}
