import { motion } from "framer-motion";
import { ImMagicWand } from "react-icons/im";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "./styles";

interface Props {
  handleTheme?: () => void;
  text: string;
  link?: string;
  mobile?: boolean;
  active?: boolean;
  icon?: boolean;
  isRoute?: boolean;
}

export function ButtonAnimationHover({
  handleTheme = () => {},
  text,
  link,
  icon = false,
  active = false,
  isRoute = false,
}: Props) {
  if (isRoute && link) {
    return (
      <motion.div
        whileHover={{ scale: 1.0 }}
        whileTap={{ scale: 0.98 }}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <RouterLink
          to={link}
          className={active ? "active" : ""}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
            textDecoration: "none",
          }}
        >
          {text}
          {icon && <ImMagicWand />}
        </RouterLink>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.0 }}
      whileTap={{ scale: 0.98 }}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <Link
        href={link}
        onClick={handleTheme}
        className={active ? "active" : ""}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {text}
        {icon && <ImMagicWand />}
      </Link>
    </motion.div>
  );
}
