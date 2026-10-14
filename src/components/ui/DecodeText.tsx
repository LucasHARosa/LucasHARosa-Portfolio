import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#*+=";

function scramble(target: string, revealed: number) {
  let out = "";
  for (let i = 0; i < target.length; i++) {
    const ch = target[i];
    if (i < revealed || ch === " ") out += ch;
    else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }
  return out;
}

interface DecodeTextProps {
  text: string;
  /** Atraso antes de começar, em ms. */
  delay?: number;
  /** Duração total da revelação, em ms. */
  duration?: number;
  className?: string;
}

/**
 * Texto que "decodifica" caractere a caractere até chegar ao valor final.
 * Leitores de tela recebem só o texto final; com movimento reduzido, nada anima.
 */
export function DecodeText({ text, delay = 0, duration = 900, className }: DecodeTextProps) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? text : "");
  const frame = useRef<number>();

  useEffect(() => {
    if (reduce) {
      setShown(text);
      return;
    }

    let start: number | null = null;
    const timeout = window.setTimeout(() => {
      const tick = (now: number) => {
        if (start === null) start = now;
        const progress = Math.min((now - start) / duration, 1);
        const revealed = Math.floor(progress * text.length);
        setShown(progress >= 1 ? text : scramble(text, revealed));
        if (progress < 1) frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [text, delay, duration, reduce]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {shown}
        {/* reserva a largura final para o layout não pular */}
        <span className="invisible">{text.slice(shown.length)}</span>
      </span>
    </span>
  );
}
