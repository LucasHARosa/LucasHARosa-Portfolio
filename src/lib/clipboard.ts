import { toast } from "react-toastify";

/** Copia um texto e avisa com toast. Retorna false sem clipboard (http, permissões). */
export async function copyText(text: string, message = "Copiado!") {
  try {
    // clipboard.writeText só existe em contexto seguro (https/localhost)
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard indisponível");
    await navigator.clipboard.writeText(text);
    toast(message);
    return true;
  } catch {
    return false;
  }
}
