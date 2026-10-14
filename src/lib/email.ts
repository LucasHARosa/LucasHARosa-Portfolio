import { toast } from "react-toastify";

export const EMAIL = "lucashrosa99@gmail.com";

/** Copia o e-mail; sem clipboard (http, permissões), mostra o endereço. */
export async function copyEmail() {
  try {
    // clipboard.writeText só existe em contexto seguro (https/localhost)
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard indisponível");
    await navigator.clipboard.writeText(EMAIL);
    toast("E-mail copiado!");
  } catch {
    toast.info(`Meu e-mail: ${EMAIL}`, { autoClose: 6000 });
  }
}
