import { toast } from "react-toastify";
import { copyText } from "@/lib/clipboard";

export const EMAIL = "lucashrosa99@gmail.com";

/** Copia o e-mail; sem clipboard (http, permissões), mostra o endereço. */
export async function copyEmail() {
  if (!(await copyText(EMAIL, "E-mail copiado!"))) {
    toast.info(`Meu e-mail: ${EMAIL}`, { autoClose: 6000 });
  }
}
