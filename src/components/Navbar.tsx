"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks } from "@/lib/data";
import { Logo } from "./ui";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <header className="pointer-events-none sticky top-0 z-50">
      <motion.nav
        className="pointer-events-auto flex h-[68px] items-center border-b px-5"
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(245,246,248,0.85)" : "rgba(245,246,248,0)",
          borderColor: scrolled ? "rgba(15,17,21,0.1)" : "rgba(15,17,21,0)",
        }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <a href="#top" aria-label="DataMeld home" className="shrink-0">
          <Logo />
        </a>

        <ul className="hidden items-center md:flex" onPointerLeave={() => setHovered(null)}>
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              {hovered === link.href && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-x-4 -bottom-[3px] h-px bg-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <a
                href={link.href}
                onPointerEnter={() => setHovered(link.href)}
                className={`relative block px-4 py-2 text-[14px] tracking-[-0.01em] transition-colors ${hovered === link.href ? "text-foreground" : "text-muted"}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden h-10 items-center gap-2 rounded-md bg-foreground px-4 text-[14px] font-medium text-surface transition-colors hover:bg-[#2a2f38] md:flex"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-mint" />
            <span className="relative h-2 w-2 rounded-full bg-mint" />
          </span>
          Start a project
        </a>

        <button
          className="relative h-10 w-10 rounded-md bg-surface ring-1 ring-line md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <motion.span
            className="absolute left-3 right-3 h-px bg-foreground"
            animate={open ? { top: "50%", rotate: 45 } : { top: "40%", rotate: 0 }}
          />
          <motion.span
            className="absolute left-3 right-3 h-px bg-foreground"
            animate={open ? { top: "50%", rotate: -45 } : { top: "60%", rotate: 0 }}
          />
        </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="pointer-events-auto mx-3 mt-2 overflow-hidden rounded-lg border border-line bg-surface shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)] md:hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col p-3">
              {navLinks.map((link, i) => (
                <motion.li key={link.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a href={link.href} onClick={() => setOpen(false)} className="block rounded-md px-4 py-3 text-xl tracking-[-0.02em] active:bg-panel">
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="p-1 pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center rounded-md bg-foreground text-[15px] text-surface"
                >
                  Start a project
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
