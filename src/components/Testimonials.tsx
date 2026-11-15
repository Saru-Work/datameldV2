"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials, tones } from "@/lib/data";
import { FadeIn } from "./ui";

const ROTATE_MS = 7000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[active];
  const tone = tones[t.tone];

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % testimonials.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <section id="clients" className="mx-auto max-w-6xl px-5 py-24 xl:px-0">
      <div
        className="grid gap-12 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <FadeIn className="lg:col-span-3">
          <p className="font-mono text-[12px] tracking-[0.14em] text-subtle uppercase">
            <span style={{ color: tones.rose.strong }}>(05)</span>&nbsp;&nbsp;Client words
          </p>
          <ul className="mt-10 space-y-1">
            {testimonials.map((q, i) => {
              const on = i === active;
              const qt = tones[q.tone];
              return (
                <li key={q.name}>
                  <button onClick={() => setActive(i)} className="w-full py-2 text-left">
                    <span className="block text-[15px] transition-colors" style={{ color: on ? "#0f1115" : "rgba(15,17,21,0.4)" }}>
                      {q.role.split(", ")[1]}
                    </span>
                    <span className="mt-2 block h-[2px] overflow-hidden rounded-full bg-black/[0.06]">
                      {on && (
                        <motion.span
                          key={`${active}-${paused}`}
                          className="block h-full rounded-full"
                          style={{ background: qt.strong }}
                          initial={{ width: paused ? "100%" : "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: paused ? 0 : ROTATE_MS / 1000, ease: "linear" }}
                        />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </FadeIn>

        <div className="relative min-h-[420px] lg:col-span-9">
          <motion.span
            aria-hidden
            className="accent absolute -top-10 -left-2 text-[180px] leading-none select-none lg:-left-10"
            animate={{ color: tone.soft }}
            transition={{ duration: 0.5 }}
          >
            &ldquo;
          </motion.span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={active}
              className="relative pt-10"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{ show: { transition: { staggerChildren: 0.025 } } }}
            >
              <blockquote className="text-[clamp(1.8rem,3.6vw,3.1rem)] leading-[1.12] tracking-[-0.035em]">
                {t.quote.split(" ").map((w, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
                      show: { opacity: 1, y: 0, filter: "blur(0px)" },
                      exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {w}&nbsp;
                  </motion.span>
                ))}
              </blockquote>
              <motion.figcaption
                className="mt-10 flex items-center gap-4"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }}
              >
                <span className="grid h-12 w-12 place-items-center rounded-full text-[14px] text-white" style={{ background: tone.strong }}>
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-[16px]">{t.name}</span>
                  <span className="block text-[14px] text-muted">{t.role}</span>
                </span>
              </motion.figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
