"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { capabilities, tones } from "@/lib/data";
import { CountUp, FadeIn, Icon, SectionHeading } from "./ui";
import { ChatWidget, CompareWidget, OwnershipWidget, SecurityWidget, SprintWidget, TeamWidget, TerminalWidget } from "./widgets";

const statement: [string, string?][] = [
  ["We're a team of"],
  ["four people who build.", tones.blue.strong],
  ["No account managers in between, just the people writing your code. We started"],
  ["a year ago", tones.peach.strong],
  ["and we work"],
  ["directly with you.", tones.mint.strong],
];

const words = statement.flatMap(([text, color]) => text.split(" ").map((w) => ({ w, color })));

function Word({ word, color, progress, range }: { word: string; color?: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={color ? "font-medium" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  return (
    <p ref={ref} className="text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.14] tracking-[-0.035em]">
      {words.map(({ w, color }, i) => (
        <Word key={i} word={w} color={color} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

const numbers = [
  { to: 120, suffix: "+", label: "teams served since 2017", tone: tones.blue },
  { to: 99.98, suffix: "%", label: "average platform uptime", tone: tones.mint, decimals: 2 },
  { to: 6, suffix: " wks", label: "median time to first release", tone: tones.peach },
  { to: 4.9, suffix: "/5", label: "average client rating", tone: tones.violet, decimals: 1 },
];

const widgets: Record<string, React.ReactNode> = {
  user: <TeamWidget />,
  calendar: <SprintWidget />,
  key: <OwnershipWidget />,
  lock: <SecurityWidget />,
};

export default function WhyUs() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-5 py-24 xl:px-0">
      <SectionHeading index="04" eyebrow="Why DataMeld" title="Startup speed," accent="enterprise rigour." color={tones.violet} />

      <div className="mt-16 grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-9 lg:col-start-4">
          <Statement />
        </div>
      </div>

      {/* numbers + comparison */}
      <div className="mt-24 grid gap-14 lg:grid-cols-12 lg:gap-8">
        <FadeIn className="lg:col-span-5">
          <p className="font-mono text-[12px] tracking-[0.14em] text-subtle uppercase">Typical agency vs. us</p>
          <div className="mt-6">
            <CompareWidget />
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 lg:col-span-6 lg:col-start-7">
          {numbers.map((n, i) => (
            <FadeIn
              key={n.label}
              delay={i * 0.06}
              className={`border-t border-line py-6 ${i % 2 === 0 ? "pr-6" : "border-l pl-6"}`}
            >
              <p className="text-[clamp(2.4rem,4.6vw,3.8rem)] leading-none tracking-[-0.055em]" style={{ color: n.tone.strong }}>
                <CountUp to={n.to} decimals={n.decimals ?? 0} />
                <span className="text-[0.5em] tracking-[-0.03em]">{n.suffix}</span>
              </p>
              <p className="mt-3 text-[13.5px] text-muted">{n.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* terminal + chat, offset */}
      <div className="mt-24 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <FadeIn className="lg:col-span-7">
          <div className="h-[300px]">
            <TerminalWidget />
          </div>
          <p className="mt-4 max-w-[420px] text-[15px] leading-[1.55] text-muted">
            <span className="text-foreground">Releases, not status reports.</span> Automated tests and canary deploys on
            every merge.
          </p>
        </FadeIn>
        <FadeIn delay={0.1} className="lg:col-span-5 lg:mt-24">
          <div className="h-[300px] rounded-xl bg-panel p-4">
            <ChatWidget />
          </div>
          <p className="mt-4 max-w-[380px] text-[15px] leading-[1.55] text-muted">
            <span className="text-foreground">A direct line to your engineers.</span> A shared Slack channel with the
            people writing your code.
          </p>
        </FadeIn>
      </div>

      {/* principles */}
      <div className="mt-24 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c, i) => {
          const t = tones[c.tone];
          return (
            <FadeIn
              key={c.title}
              delay={i * 0.06}
              className="border-b border-line py-8 sm:odd:pr-6 sm:even:border-l sm:even:pl-6 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="rounded-xl p-3" style={{ background: t.soft }}>
                {widgets[c.icon]}
              </div>
              <h4 className="mt-5 flex items-center gap-2 text-[16px] tracking-[-0.02em]">
                <span style={{ color: t.strong }}>
                  <Icon name={c.icon} className="h-4 w-4" />
                </span>
                {c.title}
              </h4>
              <p className="mt-1.5 text-[14px] leading-[1.5] text-muted">{c.description}</p>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
