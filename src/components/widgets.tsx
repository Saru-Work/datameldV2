"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { tones } from "@/lib/data";
import { Icon } from "./ui";

/** Ticks an integer every `ms` while the element is on screen. */
function useTicker(ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [inView, ms]);
  return { ref, tick };
}

/* ------------------------------------------------------------------ */
/* Capability widgets — tiny live UIs inside the services bento        */
/* ------------------------------------------------------------------ */

const touchpoints = [
  { title: "Kick-off call", note: "Scope, goals and timeline", tone: tones.blue },
  { title: "Shared chat", note: "Talk to the people building it", tone: tones.violet },
  { title: "Progress demos", note: "See working software as we go", tone: tones.mint },
  { title: "Launch & handover", note: "Code, docs and access", tone: tones.peach },
];

export function TeamWidget() {
  const { ref, tick } = useTicker(2200);
  const active = tick % touchpoints.length;
  const m = touchpoints[active];
  return (
    <div ref={ref} className="rounded-lg bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-1.5">
        {touchpoints.map((p, i) => (
          <motion.span
            key={p.title}
            className="h-2 flex-1 rounded-full"
            animate={{ backgroundColor: i <= active ? p.tone.strong : "#eceef1" }}
            transition={{ duration: 0.35 }}
          />
        ))}
      </div>
      <div className="relative mt-3 h-9 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={m.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="flex items-center gap-1.5 text-[12.5px]">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              {m.title}
            </p>
            <p className="text-[11px] text-subtle">{m.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SprintWidget() {
  const { ref, tick } = useTicker(260);
  const filled = tick % 18; // 14 days + a short pause on the full sprint
  return (
    <div ref={ref} className="rounded-lg bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="mb-2 flex items-center justify-between text-[11px]">
        <span>Sprint 24</span>
        <span className="text-subtle">Day {Math.min(14, filled + 1)} / 14</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 14 }, (_, i) => {
          const done = i < filled;
          const demo = i === 13;
          return (
            <motion.span
              key={i}
              className="grid aspect-square place-items-center rounded-[6px] text-[8px]"
              animate={{
                backgroundColor: done ? (demo ? tones.peach.strong : tones.mint.strong) : demo ? tones.peach.soft : "#eceef1",
                color: done ? "#fff" : demo ? tones.peach.strong : "rgba(0,0,0,0.3)",
                scale: i === filled - 1 ? [1, 1.25, 1] : 1,
              }}
              transition={{ duration: 0.25 }}
            >
              {demo ? "★" : i + 1}
            </motion.span>
          );
        })}
      </div>
      <p className="mt-2 text-[10.5px] text-subtle">★ Demo day · working software, every time</p>
    </div>
  );
}

export function OwnershipWidget() {
  const { ref, tick } = useTicker(700);
  const phase = tick % 8; // 0 off, 1 on, 2-4 items tick in, 5-7 hold
  const on = phase >= 1;
  const items = ["Repository", "Documentation", "Cloud keys"];
  return (
    <div ref={ref} className="rounded-lg bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <span className="text-[12px]">Transfer ownership</span>
        <motion.span
          className="flex h-5 w-9 items-center rounded-full p-0.5"
          animate={{ backgroundColor: on ? tones.butter.strong : "#e0e3e8" }}
        >
          <motion.span className="h-4 w-4 rounded-full bg-white shadow" animate={{ x: on ? 16 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
        </motion.span>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {items.map((it, i) => {
          const done = phase >= 2 + i;
          return (
            <li key={it} className="flex items-center gap-2 text-[11.5px]">
              <motion.span
                className="grid h-4 w-4 place-items-center rounded-full text-white"
                animate={{ backgroundColor: done ? tones.mint.strong : "#e9ebee", scale: done ? [1.3, 1] : 1 }}
              >
                {done && <Icon name="check" className="h-2.5 w-2.5" />}
              </motion.span>
              <span className={done ? "" : "text-subtle"}>{it}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SecurityWidget() {
  const { ref, tick } = useTicker(600);
  const phase = tick % 9;
  const checks = ["Dependencies", "Secrets", "Access policies", "Pen test"];
  const passed = Math.min(checks.length, phase);
  return (
    <div ref={ref} className="relative overflow-hidden rounded-lg bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <motion.div
        aria-hidden
        className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-rose/15 to-transparent"
        animate={{ y: [-30, 120] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <ul className="relative space-y-1.5">
        {checks.map((c, i) => (
          <li key={c} className="flex items-center justify-between text-[11.5px]">
            <span className={i < passed ? "" : "text-subtle"}>{c}</span>
            <motion.span
              className="rounded-full px-1.5 text-[9.5px]"
              animate={{
                backgroundColor: i < passed ? tones.mint.soft : "#eceef1",
                color: i < passed ? tones.mint.strong : "rgba(0,0,0,0.35)",
              }}
            >
              {i < passed ? "passed" : i === passed ? "scanning…" : "queued"}
            </motion.span>
          </li>
        ))}
      </ul>
      <p className="relative mt-2 border-t border-line pt-2 text-[10.5px] text-subtle">
        <span className="text-mint">0</span> critical vulnerabilities
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* "Why us" widgets                                                    */
/* ------------------------------------------------------------------ */

const logLines = [
  ["$", "git push origin main", "text-white"],
  ["→", "Running 1,284 tests", "text-white/60"],
  ["✓", "All tests passed in 38s", "text-[#5ee0a0]"],
  ["→", "Building image  web@a1f9c2e", "text-white/60"],
  ["→", "Canary 5% → 50% → 100%", "text-white/60"],
  ["✓", "Deployed to production", "text-[#5ee0a0]"],
  ["◎", "p95 latency 112ms · errors 0.00%", "text-[#aab3c2]"],
] as const;

export function TerminalWidget() {
  const { ref, tick } = useTicker(650);
  const shown = tick % (logLines.length + 4);
  return (
    <div ref={ref} className="h-full rounded-lg bg-[#14171c] p-4 font-mono text-[12px] leading-[1.9] shadow-[0_24px_50px_-24px_rgba(15,17,21,0.6)]">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5f]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffc23d]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#2ccb6a]" />
        <span className="ml-2 text-[10.5px] text-white/35">deploy — main</span>
      </div>
      {logLines.slice(0, Math.min(shown, logLines.length)).map(([sym, text, cls]) => (
        <motion.div key={text} className={`flex gap-2 ${cls}`} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>
          <span className="w-3 shrink-0 text-white/40">{sym}</span>
          <span className="truncate">{text}</span>
        </motion.div>
      ))}
      <span className="animate-blink ml-5 inline-block h-3.5 w-2 translate-y-0.5 bg-white/70" />
    </div>
  );
}

const chat = [
  { from: "client", text: "Can the new pricing page go live today?" },
  { from: "team", text: "It's in staging now. Preview link 👇" },
  { from: "team", text: "staging.acme.com/pricing" },
  { from: "client", text: "Looks great. Ship it 🚀" },
  { from: "team", text: "Live. Conversion tracking is on ✅" },
];

export function ChatWidget() {
  const { ref, tick } = useTicker(1300);
  const n = tick % (chat.length + 3);
  const visible = chat.slice(0, Math.min(n, chat.length));
  const typing = n < chat.length;
  return (
    <div ref={ref} className="flex h-full flex-col justify-end gap-2 overflow-hidden">
      <AnimatePresence initial={false}>
        {visible.map((m) => (
          <motion.div
            key={m.text}
            layout
            className={`max-w-[85%] rounded-lg px-3 py-2 text-[12.5px] ${m.from === "team" ? "self-end rounded-br-[4px] bg-blue text-white" : "self-start rounded-bl-[4px] bg-white"}`}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            {m.text}
          </motion.div>
        ))}
      </AnimatePresence>
      {typing && (
        <motion.div layout className={`flex gap-1 rounded-lg px-3 py-2.5 ${chat[n]?.from === "team" ? "self-end bg-blue/15" : "self-start bg-white"}`}>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-black/35"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function UptimeWidget() {
  const { ref, tick } = useTicker(900);
  const bars = 48;
  return (
    <div ref={ref}>
      <div className="flex h-10 items-end gap-[3px]">
        {Array.from({ length: bars }, (_, i) => {
          const blip = (i * 7 + tick) % 53 === 0;
          const isNow = i === bars - 1;
          return (
            <motion.span
              key={i}
              className="flex-1 rounded-[2px]"
              animate={{
                height: blip ? "60%" : "100%",
                backgroundColor: blip ? tones.butter.strong : tones.mint.strong,
                opacity: isNow ? [1, 0.4, 1] : 0.85,
              }}
              transition={isNow ? { opacity: { duration: 1.2, repeat: Infinity } } : { duration: 0.4 }}
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10.5px] text-subtle">
        <span>48 days ago</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" /> now
        </span>
      </div>
    </div>
  );
}

const compare = [
  { label: "Speed to first release", agency: 40, us: 92, unit: ["12 weeks", "6 weeks"] },
  { label: "Senior engineers on team", agency: 30, us: 100, unit: ["30%", "100%"] },
  { label: "Releases per month", agency: 20, us: 90, unit: ["1", "8+"] },
];

export function CompareWidget() {
  const { ref, tick } = useTicker(3200);
  const [manual, setManual] = useState<boolean | null>(null);
  const us = manual ?? tick % 2 === 0;
  return (
    <div ref={ref}>
      <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-black/5">
        {["Typical agency", "DataMeld"].map((label, i) => {
          const active = us === (i === 1);
          return (
            <button key={label} onClick={() => setManual(i === 1)} className="relative rounded-full px-4 py-1.5 text-[13px]">
              {active && (
                <motion.span
                  layoutId="compare-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: i === 1 ? tones.violet.strong : "#0f1115" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative ${active ? "text-white" : "text-muted"}`}>{label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-6 space-y-5">
        {compare.map((c) => (
          <div key={c.label}>
            <div className="mb-1.5 flex justify-between text-[13px]">
              <span className="text-muted">{c.label}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={String(us)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  style={{ color: us ? tones.violet.strong : undefined }}
                >
                  {c.unit[us ? 1 : 0]}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white">
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${us ? c.us : c.agency}%`, backgroundColor: us ? tones.violet.strong : "#b4b9c1" }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
