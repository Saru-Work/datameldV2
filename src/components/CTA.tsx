"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { tones, type Tone } from "@/lib/data";
import { FadeIn } from "./ui";

const shapes = [
  { tone: tones.blue, className: "top-[12%] right-[7%] h-20 w-20 rounded-[2px]", r: "-12deg", depth: -40 },
  { tone: tones.peach, className: "top-[30%] right-[18%] h-10 w-10 rounded-[2px]", r: "0deg", depth: 30 },
  { tone: tones.mint, className: "top-[36%] right-[4%] h-12 w-12 rounded-[2px]", r: "0deg", depth: 40 },
  { tone: tones.violet, className: "top-[9%] right-[24%] h-6 w-6 rounded-[2px]", r: "14deg", depth: -30 },
];

const kinds: { label: string; tone: Tone }[] = [
  { label: "Web app", tone: "blue" },
  { label: "Mobile app", tone: "mint" },
  { label: "Not sure yet", tone: "butter" },
];
const budgets = ["< LKR 250k", "LKR 250k–750k", "LKR 750k–2M", "LKR 2M+"];

function Shape({ s, progress, i }: { s: (typeof shapes)[number]; progress: ReturnType<typeof useScroll>["scrollYProgress"]; i: number }) {
  const y = useTransform(progress, [0, 1], [s.depth, -s.depth]);
  return (
    <motion.span aria-hidden className={`absolute hidden lg:block ${s.className}`} style={{ y }}>
      <span
        className="animate-bob block h-full w-full rounded-[inherit]"
        style={{
          border: "1px solid rgba(255,255,255,0.22)",
          ["--r" as string]: s.r,
          animationDelay: `${-i * 0.8}s`,
        }}
      />
    </motion.span>
  );
}

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [kind, setKind] = useState<string[]>(["Web app"]);
  const [budget, setBudget] = useState(budgets[1]);

  const subject = `New project: ${kind.join(" + ") || "TBD"} (${budget})`;
  const href = `mailto:saruatwork@gmail.com?subject=${encodeURIComponent(subject)}`;

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden bg-foreground text-surface">
      <div aria-hidden className="iso-grid absolute inset-0 opacity-30 invert [mask-image:linear-gradient(90deg,transparent,#000)]" />
      {shapes.map((s, i) => (
        <Shape key={i} s={s} progress={scrollYProgress} i={i} />
      ))}

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32 xl:px-0">
        <FadeIn>
          <p className="font-mono text-[12px] tracking-[0.14em] text-white/50 uppercase">
            <span className="text-white">06</span>&nbsp;&nbsp;/&nbsp;&nbsp;Start a project
          </p>
          <h2 className="mt-8 max-w-[820px] text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1.02] font-medium tracking-[-0.045em]">
            Let&apos;s build something you&apos;re <span className="accent text-white/45">proud of.</span>
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <FadeIn delay={0.1} className="lg:col-span-7">
            <p className="text-[15px] text-white/60">What are you building?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {kinds.map((k) => {
                const on = kind.includes(k.label);
                return (
                  <motion.button
                    key={k.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setKind((ks) => (on ? ks.filter((x) => x !== k.label) : [...ks, k.label]))}
                    className="flex h-11 items-center gap-2 rounded-md px-4 text-[15px] ring-1 transition-colors"
                    style={{ background: on ? "#fff" : "transparent", color: on ? "#0f1115" : "rgba(255,255,255,0.8)", ["--tw-ring-color" as string]: on ? "#fff" : "rgba(255,255,255,0.2)" }}
                  >
                    <motion.span animate={{ rotate: on ? 45 : 0 }} className="text-[17px] leading-none">
                      +
                    </motion.span>
                    {k.label}
                  </motion.button>
                );
              })}
            </div>
            <p className="mt-8 text-[15px] text-white/60">Rough budget</p>
            <div className="mt-3 inline-flex flex-wrap rounded-md bg-white/10 p-1">
              {budgets.map((b) => (
                <button key={b} onClick={() => setBudget(b)} className="relative h-10 rounded px-4 text-[14px]">
                  {budget === b && (
                    <motion.span layoutId="budget-pill" className="absolute inset-0 rounded bg-white" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className={`relative ${budget === b ? "text-foreground" : "text-white/60"}`}>{b}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="self-end lg:col-span-5">
            <div className="border-t border-white/15 pt-5">
              <p className="font-mono text-[11px] tracking-[0.14em] text-white/45 uppercase">Your brief</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={subject}
                  className="mt-2 text-[18px] tracking-[-0.02em]"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {subject}
                </motion.p>
              </AnimatePresence>
              <a
                href={href}
                className="group mt-6 flex h-14 items-center justify-between rounded-md bg-surface px-6 text-[16px] font-medium text-foreground transition-colors hover:bg-panel"
              >
                Send to saruatwork@gmail.com
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <p className="mt-3 text-[13px] text-white/50">We reply within one business day with next steps and a rough plan.</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
