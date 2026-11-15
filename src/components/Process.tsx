"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { steps, tones } from "@/lib/data";
import { BuildCard, DesignCard, DiscoverCard, LaunchCard } from "./mockups";
import { FadeIn, Icon, SectionHeading } from "./ui";

const cards = [DiscoverCard, DesignCard, BuildCard, LaunchCard];
const ease = [0.25, 0.1, 0.25, 1] as const;

function StepText({ index }: { index: number }) {
  const s = steps[index];
  const t = tones[s.tone];
  return (
    <div>
      <span className="font-mono text-[12px] tracking-[0.14em] uppercase" style={{ color: t.strong }}>
        {s.when}
      </span>
      <h3 className="mt-3 text-[clamp(2.2rem,3.6vw,3.2rem)] leading-[0.98] tracking-[-0.045em]">
        {s.title}
        <br />
        <span className="accent text-black/40">{s.accent}</span>
      </h3>
      <p className="mt-5 max-w-[360px] text-[15.5px] leading-[1.6] text-muted">{s.description}</p>
      <ul className="mt-6 space-y-2 border-t border-line pt-5">
        {s.outputs.map((o) => (
          <li key={o} className="flex items-center gap-2.5 text-[14px]">
            <span className="grid h-4 w-4 place-items-center rounded-full text-white" style={{ background: t.strong }}>
              <Icon name="check" className="h-2.5 w-2.5" />
            </span>
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepVisual({ index }: { index: number }) {
  const t = tones[steps[index].tone];
  const Card = cards[index];
  return (
    <div className="relative flex aspect-[4/3.4] items-center justify-center overflow-hidden rounded-xl p-6" style={{ background: t.soft }}>
      <div aria-hidden className="dots absolute inset-0 opacity-70" />
      <span
        aria-hidden
        className="absolute -right-4 -bottom-10 text-[220px] leading-none tracking-[-0.06em] text-white/70 select-none"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <motion.div
        className="relative flex w-full justify-center"
        initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease }}
      >
        <Card />
      </motion.div>
    </div>
  );
}

function RailSegment({ index, progress, on }: { index: number; progress: MotionValue<number>; on: boolean }) {
  const s = steps[index];
  const scaleX = useTransform(progress, [index / steps.length, (index + 1) / steps.length], [0, 1]);
  return (
    <div>
      <div className="h-[3px] overflow-hidden rounded-full bg-black/[0.07]">
        <motion.div className="h-full origin-left rounded-full" style={{ background: tones[s.tone].strong, scaleX }} />
      </div>
      <p className="mt-2 text-[13px] transition-colors" style={{ color: on ? "#0f1115" : "rgba(15,17,21,0.35)" }}>
        <span className="font-mono">0{index + 1}</span>&nbsp;&nbsp;{s.title}
      </p>
    </div>
  );
}

/** Desktop: vertical scroll drives a horizontal track of phases. */
function HorizontalSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const x = useTransform(smooth, (p) => -p * distance);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999 + 0.15))));

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-16 pr-[10vw] pl-5 xl:pl-[calc((100vw-72rem)/2)]"
        >
          {steps.map((s, i) => (
            <div key={s.title} className="grid w-[860px] grid-cols-[1fr_1.15fr] items-center gap-12 border-l border-line pl-10 first:border-l-0 first:pl-0">
              <StepText index={i} />
              <StepVisual index={i} />
            </div>
          ))}
        </motion.div>

        {/* progress rail */}
        <div className="mx-auto mt-14 grid w-full max-w-6xl grid-cols-4 gap-3 px-5 xl:px-0">
          {steps.map((s, i) => (
            <RailSegment key={s.title} index={i} progress={scrollYProgress} on={i === active} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StackedSteps() {
  return (
    <div className="mx-auto mt-14 max-w-6xl space-y-16 px-5 lg:hidden">
      {steps.map((s, i) => (
        <FadeIn key={s.title} className="space-y-8">
          <StepVisual index={i} />
          <StepText index={i} />
        </FadeIn>
      ))}
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="pb-24">
      <div className="mx-auto max-w-6xl px-5 xl:px-0">
        <SectionHeading
          index="02"
          eyebrow="Process"
          title="From idea to production,"
          accent="without the drama."
          color={tones.blue}
          aside="Four phases, one team the whole way through. You always know what's shipping next and why."
        />
      </div>
      <HorizontalSteps />
      <StackedSteps />
    </section>
  );
}
