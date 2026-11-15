"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useSpring } from "motion/react";
import { LOGO_VIEWBOX, logoParts } from "@/lib/logo";

const ease = [0.25, 0.1, 0.25, 1] as const;

/** Counts from 0 to `to` the first time it scrolls into view. */
export function CountUp({ to, decimals = 0, duration = 1.4 }: { to: number; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration, ease: "easeOut", onUpdate: setValue });
    return () => controls.stop();
  }, [inView, to, duration]);

  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-foreground"
      style={{ scaleX }}
    />
  );
}

/** Gentle fade-up used for most content as it enters the viewport. */
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-foreground text-surface hover:bg-[#2a2f38]"
      : "bg-surface text-foreground ring-1 ring-line-strong hover:ring-foreground";
  return (
    <a
      href={href}
      className={`group/btn inline-flex h-12 items-center justify-center gap-3 rounded-md pr-4 pl-5 text-[15px] font-medium tracking-[-0.01em] transition-all duration-300 ${styles} ${className}`}
    >
      {children}
      <span
        className="grid h-4 w-4 place-items-center overflow-hidden"
        aria-hidden
      >
        <span className="relative block h-3.5 w-3.5">
          <svg viewBox="0 0 16 16" className="absolute inset-0 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
          <svg viewBox="0 0 16 16" className="absolute inset-0 h-3.5 w-3.5 -translate-x-5 transition-transform duration-300 group-hover/btn:translate-x-0" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </span>
    </a>
  );
}

/** Editorial section header: indexed label in the margin, headline across the remaining columns. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  aside,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent: string;
  /** Kept for call-site compatibility; headings are monochrome. */
  color?: { soft: string; strong: string };
  aside?: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
      <FadeIn className="lg:col-span-3">
        <p className="font-mono text-[12px] tracking-[0.14em] text-subtle uppercase">
          <span className="text-foreground">{index}</span>&nbsp;&nbsp;/&nbsp;&nbsp;{eyebrow}
        </p>
      </FadeIn>
      <FadeIn className="lg:col-span-9" delay={0.05}>
        <h2 className="max-w-[860px] text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.04] font-medium tracking-[-0.04em]">
          {title} <span className="accent text-subtle">{accent}</span>
        </h2>
        {aside && <div className="mt-6 max-w-[480px] text-[16px] leading-[1.6] text-muted">{aside}</div>}
      </FadeIn>
    </div>
  );
}

/** The DataMeld cube mark, traced from the brand logo. */
export function LogoMark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} fill="currentColor" fillRule="evenodd" aria-hidden>
      <path d={logoParts.shell} />
      <path d={logoParts.pillar} />
      <path d={logoParts.wall} />
    </svg>
  );
}

export function Wordmark({ className = "text-[19px]" }: { className?: string }) {
  return <span className={`font-semibold tracking-[-0.035em] ${className}`}>DataMeld</span>;
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-7 w-auto" />
      <Wordmark />
    </span>
  );
}

const icons: Record<string, React.ReactNode> = {
  user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" />,
  calendar: <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" />,
  key: <path d="M14 10a4 4 0 1 0-3.5 4L9 15.5V18H6.5v2H4v-2.5l6-6M15.5 8.5h.01" />,
  lock: <path d="M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3" />,
  chart: <path d="M4 4v16h16M8 15l3-4 3 2 5-6" />,
  layers: <path d="m12 4 8 4-8 4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4" />,
  code: <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />,
  bolt: <path d="M13 3 5 14h6l-1 7 8-11h-6z" />,
  check: <path d="m5 12 4.5 4.5L19 7" />,
};

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {icons[name]}
    </svg>
  );
}
