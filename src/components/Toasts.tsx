import { ToastContainer } from "react-toastify";
import { useTheme } from "@/hooks/useTheme";

/** Avisos (copiar, enviar mensagem) no mesmo tema do site. */
export function Toasts() {
  const { theme } = useTheme();
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      theme={theme}
    />
  );
}
