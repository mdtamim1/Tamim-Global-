"use client";

// ============================================================
// Tamim Global — Custom Cursor
// Context-aware cursor: default → hover → link → drag
// Hidden on touch devices via CSS (pointer: fine media query)
// ============================================================

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type CursorState = "default" | "hover" | "link" | "drag" | "hidden";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring following
  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    // Context detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        setState("link");
      } else if (target.closest("[data-cursor='drag']")) {
        setState("drag");
      } else if (target.closest("[data-cursor='hover']")) {
        setState("hover");
      } else {
        setState("default");
      }
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className={cn(
          "fixed top-0 left-0 z-[9999] pointer-events-none",
          "rounded-full border border-violet-500/60",
          "hidden md:block", // only on desktop
          !isVisible && "opacity-0"
        )}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width:
            state === "link" ? 48 :
            state === "hover" ? 56 :
            state === "drag" ? 64 : 36,
          height:
            state === "link" ? 48 :
            state === "hover" ? 56 :
            state === "drag" ? 64 : 36,
          backgroundColor:
            state === "link" ? "rgba(124, 58, 237, 0.15)" :
            state === "hover" ? "rgba(124, 58, 237, 0.1)" :
            "transparent",
          borderColor:
            state === "link" ? "rgba(124, 58, 237, 0.8)" :
            "rgba(124, 58, 237, 0.6)",
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-1.5 h-1.5 rounded-full bg-violet-400 hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}

