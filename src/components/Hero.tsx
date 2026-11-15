"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { heroWords } from "@/lib/data";
import { LOGO_VIEWBOX, logoParts } from "@/lib/logo";
import { Button, CountUp } from "./ui";
import Workspace from "./Workspace";

const ease = [0.25, 0.1, 0.25, 1] as const;

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % heroWords.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.5em] overflow-hidden align-[0.05em] [perspective:400px]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={heroWords[i]}
          className="inline-block leading-[1.5] font-medium whitespace-nowrap text-foreground underline decoration-line-strong decoration-1 underline-offset-[5px]"
          initial={{ y: "110%", rotateX: -60, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          exit={{ y: "-110%", rotateX: 60, opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {heroWords[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** One part of the logo: outline draws first, then the fill comes in, then it slides into place. */
function Part({ d, from, delay }: { d: string; from: { x?: number; y?: number }; delay: number }) {
  return (
    <motion.g initial={{ opacity: 0, ...from }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay, duration: 0.9, ease }}>
      <motion.path
        d={d}
        fill="currentColor"
        fillRule="evenodd"
        stroke="currentColor"
        strokeWidth={0.6}
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{ pathLength: { delay, duration: 1.1, ease }, fillOpacity: { delay: delay + 0.8, duration: 0.6 } }}
      />
    </motion.g>
  );
}

const labels: { n: string; text: string; className: string; line: string; stack?: boolean }[] = [
  { n: "01", text: "Strategy & design", className: "-top-[4%] left-[49%]", line: "w-8" },
  { n: "02", text: "Data & cloud", className: "top-[40%] left-full ml-2", line: "w-5", stack: true },
  { n: "03", text: "Engineering", className: "bottom-[-2%] left-[30%] -translate-x-full flex-row-reverse", line: "w-8" },
];

/** The brand mark, assembled from its three parts, with drawing-style annotations. */
function HeroMark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.3", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  // Scrolling away gently "explodes" the mark, like an assembly drawing.
  const shellY = useTransform(p, [0, 1], [0, -14]);
  const wallX = useTransform(p, [0, 1], [0, 18]);
  const pillarY = useTransform(p, [0, 1], [0, 22]);

  return (
    <div ref={ref} className="relative mx-auto w-[min(56vw,280px)] lg:ml-[8%] lg:w-[min(23vw,300px)]">
      <svg viewBox={LOGO_VIEWBOX} className="relative w-full overflow-visible text-foreground" aria-label="DataMeld logo" role="img">
        <motion.g style={{ y: shellY }}>
          <Part d={logoParts.shell} from={{ y: -16 }} delay={0.2} />
        </motion.g>
        <motion.g style={{ x: wallX }}>
          <Part d={logoParts.wall} from={{ x: 24 }} delay={0.55} />
        </motion.g>
        <motion.g style={{ y: pillarY }}>
          <Part d={logoParts.pillar} from={{ y: 30 }} delay={0.85} />
        </motion.g>
      </svg>

      {labels.map((l, i) => (
        <motion.div
          key={l.n}
          className={`absolute hidden items-center gap-2 font-mono text-[11px] tracking-[0.08em] whitespace-nowrap text-muted uppercase sm:flex ${l.className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 + i * 0.15, duration: 0.6 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          <motion.span
            className={`h-px origin-left bg-line-strong ${l.line}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.7 + i * 0.15, duration: 0.5, ease }}
          />
          <span>
            <span className="text-foreground">{l.n}</span>
            {l.stack ? <br /> : " "}
            {l.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

const facts: { to: number; suffix: string; label: string; decimals?: number }[] = [
  { to: 4, suffix: "", label: "People on the team" },
  { to: 2, suffix: "", label: "Platforms: web & mobile" },
  { to: 1, suffix: " yr", label: "Building products" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const rotateX = useTransform(progress, [0, 1], [22, 0]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8, ease },
  });

  return (
    <section id="top" className="relative -mt-[68px] overflow-hidden pt-[68px]">
      <div
        aria-hidden
        className="iso-grid pointer-events-none absolute inset-y-0 right-0 w-full [mask-image:radial-gradient(ellipse_at_75%_35%,#000_0%,transparent_55%)] lg:w-3/4"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-24 xl:px-0">
        <div className="lg:col-span-7">
          <h1 className="text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] font-medium tracking-[-0.045em]">
            <motion.span className="block" {...rise(0.1)}>
              We engineer software
            </motion.span>
            <motion.span className="block text-subtle" {...rise(0.22)}>
              businesses run on.
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 max-w-[560px] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.5] text-muted"
            {...rise(0.4)}
          >
            DataMeld is a small, focused team that designs and builds <RotatingWord /> for startups and
            enterprises.
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap items-center gap-3" {...rise(0.5)}>
            <Button href="#contact">Book a discovery call</Button>
            <Button href="#work" variant="ghost">
              See our work
            </Button>
          </motion.div>

          <motion.dl className="mt-14 grid max-w-[600px] grid-cols-3 border-t border-line" {...rise(0.65)}>
            {facts.map((f, i) => (
              <div key={f.label} className={`pt-5 ${i > 0 ? "border-l border-line pl-5" : "pr-5"}`}>
                <dt className="text-[clamp(1.5rem,2.4vw,2rem)] leading-none font-medium tracking-[-0.04em]">
                  <CountUp to={f.to} decimals={f.decimals ?? 0} />
                  {f.suffix}
                </dt>
                <dd className="mt-2 text-[12.5px] leading-[1.4] text-subtle">{f.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="lg:col-span-5">
          <HeroMark />
        </div>
      </div>

      {/* Product window with scroll-driven 3D reveal */}
      <div ref={ref} className="relative mx-auto mt-24 max-w-[1120px] px-3 pb-24 [perspective:1800px] sm:px-5">
        <motion.div
          className="rounded-xl bg-surface p-2 shadow-[0_30px_60px_-30px_rgba(15,17,21,0.3)] ring-1 ring-line sm:p-2.5"
          style={{ rotateX, scale, transformOrigin: "50% 0%" }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease }}
        >
          <Workspace />
        </motion.div>
      </div>
    </section>
  );
}
