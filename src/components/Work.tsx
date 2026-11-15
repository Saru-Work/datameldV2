"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { caseStudies, tones } from "@/lib/data";
import { CountUp, FadeIn, SectionHeading } from "./ui";

/** Animates the numeric part of a stat like "−27%", "$900M" or "4.8". */
function StatValue({ value }: { value: string }) {
  const m = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!m) return <>{value}</>;
  const [, prefix, num, suffix] = m;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return (
    <>
      {prefix}
      <CountUp to={parseFloat(num)} decimals={decimals} />
      {suffix}
    </>
  );
}

export default function Work() {
  const [open, setOpen] = useState(0);

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 xl:px-0">
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title="Work we're"
        accent="proud of."
        color={tones.mint}
        aside="A selection of the products we have designed and built."
      />

      <FadeIn delay={0.1} className="mt-16">
        <div className="hidden grid-cols-12 gap-8 pb-3 font-mono text-[11px] tracking-[0.14em] text-subtle uppercase md:grid">
          <span className="col-span-1">No.</span>
          <span className="col-span-4">Client</span>
          <span className="col-span-3">Sector</span>
          <span className="col-span-3">Summary</span>
        </div>
        <ul>
          {caseStudies.map((study, i) => {
            const t = tones[study.tone];
            const on = open === i;
            return (
              <li
                key={study.client}
                className="border-t border-line last:border-b"
              >
                <button
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 py-6 text-left md:grid-cols-12 md:gap-8"
                >
                  <span className="font-mono text-[12px] text-subtle md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[clamp(1.6rem,3vw,2.4rem)] leading-none tracking-[-0.045em] transition-transform duration-300 group-hover:translate-x-1.5 md:col-span-4">
                    {study.client}
                  </span>
                  <motion.span
                    className="grid h-9 w-9 place-items-center rounded-md text-[18px] md:order-last md:col-span-1 md:justify-self-end"
                    animate={{
                      backgroundColor: on ? t.strong : "rgba(15,17,21,0.05)",
                      color: on ? "#fff" : "#0f1115",
                    }}
                  >
                    <motion.span animate={{ rotate: on ? 45 : 0 }}>
                      +
                    </motion.span>
                  </motion.span>
                  <span className="col-span-2 col-start-2 flex items-center gap-2 text-[14px] text-muted md:col-span-3 md:col-start-auto">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: t.strong }}
                    />
                    {study.category}
                  </span>
                  <span
                    className="hidden text-[20px] tracking-[-0.03em] md:col-span-3 md:block"
                    style={{ color: t.strong }}
                  >
                    {study.stats[0] ? (
                      <>
                        {study.stats[0].value}{" "}
                        <span className="text-[13px] tracking-normal text-muted">
                          {study.stats[0].label}
                        </span>
                      </>
                    ) : (
                      <span className="text-[15px] tracking-[-0.01em]">{study.headline}</span>
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.45,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      <div
                        className="relative mb-6 grid gap-8 overflow-hidden rounded-xl p-6 sm:p-10 md:grid-cols-12"
                        style={{ background: t.soft }}
                      >
                        <div className="relative md:col-span-5">
                          <p className="text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02] tracking-[-0.045em]">
                            {study.headline}
                          </p>
                          <p className="mt-4 max-w-[340px] text-[15px] leading-[1.55] text-muted">
                            {study.summary}
                          </p>
                          {study.url && (
                            <a
                              href={study.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-6 inline-flex items-center gap-1 text-[15px] underline decoration-black/20 underline-offset-4 hover:decoration-black"
                              style={{ color: t.strong }}
                            >
                              Visit {study.url.replace(/^https?:\/\//, "")} ↗
                            </a>
                          )}
                        </div>
                        {study.stats.length > 0 && (
                        <dl className="relative grid grid-cols-2 gap-x-8 gap-y-6 md:col-span-7">
                          {study.stats.map((s, k) => (
                            <motion.div
                              key={s.label}
                              className="border-t border-black/10 pt-3"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 + k * 0.07 }}
                            >
                              <dt
                                className="text-[clamp(2rem,3.6vw,3rem)] leading-none tracking-[-0.05em]"
                                style={{
                                  color: k === 0 ? t.strong : undefined,
                                }}
                              >
                                <StatValue value={s.value} />
                              </dt>
                              <dd className="mt-2 text-[13px] text-muted">
                                {s.label}
                              </dd>
                            </motion.div>
                          ))}
                        </dl>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </FadeIn>
    </section>
  );
}
