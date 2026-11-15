"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { tones, type Tone } from "@/lib/data";
import { MobileAppScreen, WebPlatformScreen } from "./mockups";
import { ScaledCanvas } from "./Workspace";
import { FadeIn, SectionHeading } from "./ui";

const services: { title: string; description: string; tags: string[]; tone: Tone; Screen: () => React.ReactNode }[] = [
  {
    title: "Web apps",
    description: "Customer portals, SaaS products and internal tools, from first prototype to production on the cloud.",
    tags: ["React", "Next.js", "Python", "AWS", "Hostinger"],
    tone: "blue",
    Screen: WebPlatformScreen,
  },
  {
    title: "Mobile apps",
    description: "iOS and Android apps from a single Flutter codebase, shipped to both app stores.",
    tags: ["Flutter", "iOS", "Android"],
    tone: "mint",
    Screen: MobileAppScreen,
  },
];

function Preview({ index }: { index: number }) {
  const s = services[index];
  const t = tones[s.tone];
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl p-3 sm:p-4"
      animate={{ backgroundColor: t.soft }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-hidden rounded-lg bg-white">
        <ScaledCanvas width={680} height={400}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
            >
              <s.Screen />
            </motion.div>
          </AnimatePresence>
        </ScaledCanvas>
      </div>
      <div className="mt-3 flex items-center justify-between px-1 text-[12px]">
        <span style={{ color: t.strong }}>{s.title}</span>
        <span className="font-mono text-black/40">{String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 pb-32 xl:px-0">
      <SectionHeading
        index="01"
        eyebrow="Services"
        title="Two things we do,"
        accent="really well."
        color={tones.peach}
        aside="We stay deliberately focused: web and mobile applications, for startups and enterprises alike."
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <ul className="lg:col-span-6">
          {services.map((s, i) => {
            const t = tones[s.tone];
            const on = active === i;
            return (
              <motion.li
                key={s.title}
                className="border-b border-line first:border-t"
                onPointerEnter={() => setActive(i)}
                onViewportEnter={() => window.matchMedia("(min-width: 1024px)").matches && setActive(i)}
                viewport={{ margin: "-48% 0px -48% 0px" }}
              >
                <button onClick={() => setActive(i)} className="group flex w-full items-baseline gap-5 py-6 text-left sm:gap-8">
                  <span className="w-6 shrink-0 font-mono text-[12px] transition-colors" style={{ color: on ? t.strong : "rgba(15,17,21,0.35)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span
                      className="block text-[clamp(1.9rem,3.6vw,3rem)] leading-[1] tracking-[-0.045em] transition-[color,transform] duration-300"
                      style={{ color: on ? "#0f1115" : "rgba(15,17,21,0.32)", transform: on ? "translateX(6px)" : "none" }}
                    >
                      {s.title}
                    </span>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.span
                          className="block overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <span className="block max-w-[440px] pt-3 pl-1.5 text-[15px] leading-[1.55] text-muted">{s.description}</span>
                          <span className="flex flex-wrap gap-1.5 pt-4 pl-1.5">
                            {s.tags.map((tag) => (
                              <span key={tag} className="rounded-full px-2.5 py-0.5 text-[12px]" style={{ background: t.soft, color: t.strong }}>
                                {tag}
                              </span>
                            ))}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <motion.span
                    className="grid h-9 w-9 shrink-0 place-items-center self-center rounded-full text-[15px]"
                    animate={{ backgroundColor: on ? t.strong : "rgba(15,17,21,0.05)", color: on ? "#fff" : "rgba(15,17,21,0.4)", rotate: on ? 0 : -45 }}
                  >
                    →
                  </motion.span>
                </button>
                {/* inline preview on small screens */}
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      className="overflow-hidden lg:hidden"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                    >
                      <div className="pb-6">
                        <Preview index={i} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>

        <div className="hidden lg:col-span-6 lg:block">
          <FadeIn className="sticky top-28">
            <Preview index={active} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
