"use client";

import { motion } from "motion/react";
import { tones } from "@/lib/data";
import { CountUp } from "./ui";

const ease = [0.25, 0.1, 0.25, 1] as const;

/* ------------------------------------------------------------------ */
/* Hero showcase screens — one per tab                                */
/* ------------------------------------------------------------------ */

export function WebPlatformScreen() {
  const bars = [38, 52, 44, 66, 58, 80, 72, 94];
  return (
    <div className="flex h-full flex-col bg-[#f6f7f9] p-7">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[22px] tracking-[-0.03em]">Q3 Platform Overview</div>
          <div className="mt-1 text-[11px] text-subtle">Customer portal · production metrics</div>
        </div>
        <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[10px] text-mint">● Live</span>
      </div>
      <div className="mt-auto grid grid-cols-4 items-end gap-3">
        <Card className="h-[200px] bg-blue text-white">
          <div className="flex items-start gap-1.5">
            <span className="text-[28px] tracking-[-0.04em]">
              $<CountUp to={1.2} decimals={1} />M
            </span>
            <span className="mt-1.5 rounded-sm bg-white/20 px-1 text-[8px]">↗ 12%</span>
          </div>
          <div className="mt-auto flex h-14 items-end gap-1">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-[2px] bg-white/70"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease }}
              />
            ))}
          </div>
          <p className="mt-2 text-[9px] leading-snug text-white/80">Annual recurring revenue via new billing</p>
        </Card>
        <Card className="h-[180px] bg-white">
          <span className="w-fit rounded-sm bg-butter-soft px-1 text-[8px] text-butter">New</span>
          <p className="mt-2 text-[9px] leading-snug text-muted">Average onboarding time reduced from 45 days</p>
          <span className="mt-auto text-[28px] tracking-[-0.04em]">
            <CountUp to={28} /> days
          </span>
        </Card>
        <Card className="h-[180px] bg-violet-soft">
          <span className="text-[26px] leading-none tracking-[-0.04em] text-violet">Series B</span>
          <svg viewBox="0 0 100 40" className="mt-auto w-full" aria-hidden>
            <motion.path
              d="M0 34 L15 30 L30 31 L45 22 L60 24 L75 12 L100 6"
              fill="none"
              stroke={tones.violet.strong}
              strokeWidth="1.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease }}
            />
          </svg>
          <p className="mt-2 text-[9px] leading-snug text-muted">Funding secured after the platform launch</p>
        </Card>
        <Card className="h-[200px] bg-mint-soft">
          <span className="text-[28px] tracking-[-0.04em] text-mint">
            <CountUp to={99.9} decimals={1} />%
          </span>
          <Ring value={0.999} color={tones.mint.strong} />
          <p className="mt-auto text-[9px] leading-snug text-muted">Uptime held during peak traffic hours</p>
        </Card>
      </div>
    </div>
  );
}

export function MobileAppScreen() {
  const doctors = [
    { name: "Dr. Hale · Cardiology", color: tones.mint.strong },
    { name: "Dr. Ruiz · General", color: tones.blue.strong },
    { name: "Dr. Okoye · Dermatology", color: tones.peach.strong },
  ];
  return (
    <div className="flex h-full items-center justify-center gap-6 bg-[#f6f7f9] p-6">
      <Phone className="animate-bob">
        <div className="text-[9px] text-subtle">Good morning</div>
        <div className="text-[15px] tracking-[-0.03em]">Your care team</div>
        <div className="mt-3 space-y-2">
          {doctors.map((d, i) => (
            <motion.div
              key={d.name}
              className="flex items-center gap-2 rounded-md bg-[#f1f2f4] p-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
            >
              <span className="h-5 w-5 rounded-full" style={{ background: d.color }} />
              <span className="text-[8.5px]">{d.name}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-auto rounded-md bg-mint py-2 text-center text-[9px] text-white">Start a visit</div>
      </Phone>
      <Phone className="animate-bob translate-y-6 [animation-delay:-2.5s]">
        <div className="text-[9px] text-subtle">Today, 2:30 PM</div>
        <div className="text-[15px] tracking-[-0.03em]">Visit confirmed</div>
        <div className="mt-3 rounded-md bg-mint-soft p-3">
          <div className="text-[22px] tracking-[-0.04em] text-mint">00:30</div>
          <div className="text-[8px] text-muted">seconds until your clinician joins</div>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="aspect-square rounded-sm"
              style={{ background: i === 9 ? tones.mint.strong : i === 4 ? tones.butter.soft : "#eceef1" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.025 }}
            />
          ))}
        </div>
        <div className="mt-auto h-1 w-10 self-center rounded-full bg-[#d0d0d0]" />
      </Phone>
    </div>
  );
}

export function DataPipelineScreen() {
  const sources = [
    { name: "Postgres", color: tones.blue.strong },
    { name: "Stripe", color: tones.violet.strong },
    { name: "Salesforce", color: tones.mint.strong },
    { name: "Segment", color: tones.butter.strong },
  ];
  return (
    <div className="relative h-full bg-[#f6f7f9] p-7">
      <div className="text-[22px] tracking-[-0.03em]">Unified data pipeline</div>
      <div className="mt-1 text-[11px] text-subtle">14 sources · refreshed every 5 minutes</div>
      <svg viewBox="0 0 600 260" className="absolute inset-x-7 bottom-6 h-[260px] w-[calc(100%-56px)]" aria-hidden>
        {sources.map((s, i) => {
          const d = `M150 ${40 + i * 60} C 220 ${40 + i * 60}, 220 130, 270 130`;
          return (
            <g key={s.name}>
              <path d={d} fill="none" stroke={s.color} strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="4 4" className="animate-dash" />
              <circle r="3.5" fill={s.color}>
                <animateMotion dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          );
        })}
        <path d="M370 130 L430 130" stroke={tones.peach.strong} strokeWidth="1.2" strokeDasharray="4 4" className="animate-dash" />
        <circle r="3.5" fill={tones.peach.strong}>
          <animateMotion dur="1.2s" repeatCount="indefinite" path="M370 130 L430 130" />
        </circle>
        <path d="M530 130 C 545 130, 545 70, 560 70" fill="none" stroke="#c9c9c9" strokeDasharray="4 4" className="animate-dash" />
        <path d="M530 130 C 545 130, 545 190, 560 190" fill="none" stroke="#c9c9c9" strokeDasharray="4 4" className="animate-dash" />
        {sources.map((s, i) => (
          <g key={s.name}>
            <rect x="20" y={24 + i * 60} width="130" height="32" rx="6" fill="#fff" stroke="#dfe2e6" />
            <circle cx="38" cy={40 + i * 60} r="5" fill={s.color} />
            <text x="52" y={44 + i * 60} fontSize="11" fill="#050505">{s.name}</text>
          </g>
        ))}
        <rect x="270" y="105" width="100" height="50" rx="6" fill={tones.peach.strong} />
        <text x="320" y="134" fontSize="11" fill="#fff" textAnchor="middle">Transform</text>
        <rect x="430" y="105" width="100" height="50" rx="6" fill="#fff" stroke="#dfe2e6" />
        <text x="480" y="134" fontSize="11" fill="#050505" textAnchor="middle">Warehouse</text>
        <rect x="560" y="56" width="30" height="28" rx="6" fill={tones.blue.soft} />
        <rect x="560" y="176" width="30" height="28" rx="6" fill={tones.mint.soft} />
      </svg>
    </div>
  );
}

export function AIAssistantScreen() {
  const answer =
    "Your refund was approved on Oct 14 and should reach your card within 3–5 business days. I've emailed you the receipt.";
  return (
    <div className="flex h-full flex-col bg-[#f6f7f9] p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[22px] tracking-[-0.03em]">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-violet text-[13px] text-white">✦</span>
          Support assistant
        </div>
        <span className="rounded-full bg-violet-soft px-2 py-0.5 text-[9px] text-violet">68% auto-resolved</span>
      </div>
      <div className="mt-auto space-y-3">
        <motion.div
          className="ml-auto w-fit max-w-[60%] rounded-lg rounded-br-sm bg-violet px-3 py-2 text-[11px] text-white"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Where is my refund for order #48213?
        </motion.div>
        <div className="max-w-[75%] rounded-lg rounded-bl-sm bg-white px-3 py-2.5 text-[11px] leading-relaxed shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          <motion.span
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.025, delayChildren: 0.4 } } }}
          >
            {answer.split(" ").map((w, i) => (
              <motion.span key={i} variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                {w}{" "}
              </motion.span>
            ))}
          </motion.span>
          <div className="mt-2 flex gap-1.5">
            <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[8.5px] text-mint">Order #48213</span>
            <span className="rounded-full bg-blue-soft px-2 py-0.5 text-[8.5px] text-blue">Refund policy</span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet/20 bg-white px-3 py-2 text-[11px] text-subtle">
          Ask anything<span className="animate-blink h-3 w-px bg-violet" />
          <span className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-violet text-[10px] text-white">↑</span>
        </div>
      </div>
    </div>
  );
}

export function CloudScreen() {
  const services = [
    ["api-gateway", "Healthy", "12ms"],
    ["billing-service", "Healthy", "31ms"],
    ["search-indexer", "Deploying", "—"],
    ["notifications", "Healthy", "18ms"],
  ];
  return (
    <div className="flex h-full flex-col bg-[#f6f7f9] p-7">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[22px] tracking-[-0.03em]">Production · eu-west-1</div>
          <div className="mt-1 text-[11px] text-subtle">Last deploy 42 seconds ago · zero downtime</div>
        </div>
        <span className="rounded-full bg-butter-soft px-2 py-0.5 text-[10px] text-butter">v2.14.0</span>
      </div>
      <div className="mt-auto overflow-hidden rounded-md border border-[#e3e5e9] bg-white">
        {services.map(([name, status, latency], i) => (
          <motion.div
            key={name}
            className={`flex items-center gap-3 px-4 py-2.5 text-[11px] ${i ? "border-t border-line" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <span className={`h-2 w-2 rounded-full ${status === "Healthy" ? "bg-mint" : "animate-pulse bg-butter"}`} />
            <span className="font-mono">{name}</span>
            <span className={`ml-auto ${status === "Healthy" ? "text-mint" : "text-butter"}`}>{status}</span>
            <span className="w-10 text-right font-mono text-subtle">{latency}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex h-9 items-end gap-[3px]">
        {Array.from({ length: 48 }).map((_, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-[1px]"
            style={{ background: i > 40 ? tones.butter.strong : "#cfd3d9" }}
            initial={{ height: 0 }}
            animate={{ height: `${30 + ((i * 37) % 70)}%` }}
            transition={{ delay: i * 0.012, duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Process step cards — shown in the pinned "how we work" section     */
/* ------------------------------------------------------------------ */

export function DiscoverCard() {
  return (
    <FloatingCard>
      <p className="text-[13px] leading-snug">
        Rebuild our booking flow so patients can see a clinician in under a minute
        <span className="animate-blink ml-px inline-block h-3.5 w-px translate-y-0.5 bg-blue" />
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          ["research_notes.pdf", "PDF", tones.rose],
          ["funnel_q3.csv", "CSV", tones.mint],
        ].map(([f, t, tone]) => (
          <div key={f as string} className="flex items-center gap-2 rounded-md bg-[#f1f2f4] p-2">
            <span
              className="grid h-7 w-7 place-items-center rounded-sm text-[8px] font-medium"
              style={{ background: (tone as typeof tones.rose).soft, color: (tone as typeof tones.rose).strong }}
            >
              {t as string}
            </span>
            <span className="truncate text-[11px]">{f as string}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[11px] text-subtle">
        <span>3 stakeholders · 12 interviews</span>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-blue text-white">→</span>
      </div>
    </FloatingCard>
  );
}

export function DesignCard() {
  return (
    <FloatingCard>
      <div className="mb-3 flex items-center justify-between text-[11px] text-subtle">
        <span>Booking · v3 prototype</span>
        <span className="rounded-full bg-violet-soft px-2 text-violet">Figma</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <motion.div className="col-span-2 h-20 rounded-md bg-violet-soft" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ originX: 0 }} transition={{ duration: 0.5 }} />
        <motion.div className="h-20 rounded-md border border-dashed border-violet/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
        <motion.div className="h-10 rounded-md bg-butter-soft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
        <motion.div className="col-span-2 h-10 rounded-md bg-blue-soft" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ originX: 0 }} transition={{ duration: 0.5, delay: 0.25 }} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Button", "Input", "Calendar", "Card", "Toast"].map((c, i) => (
          <motion.span
            key={c}
            className="rounded-full border border-violet/25 px-2 py-0.5 text-[10px] text-violet"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.06 }}
          >
            {c}
          </motion.span>
        ))}
      </div>
    </FloatingCard>
  );
}

export function BuildCard() {
  const checks = ["Unit & integration tests", "Type check & lint", "Preview deployed", "Security scan"];
  return (
    <FloatingCard>
      <div className="flex items-center justify-between">
        <div className="text-[13px]">feat: one-tap booking flow</div>
        <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[10px] text-mint">Passing</span>
      </div>
      <div className="mt-0.5 text-[11px] text-subtle">#482 · ready to merge</div>
      <ul className="mt-4 space-y-2">
        {checks.map((c, i) => (
          <motion.li
            key={c}
            className="flex items-center gap-2 text-[11px]"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.15 }}
          >
            <motion.span
              className="grid h-4 w-4 place-items-center rounded-full bg-mint text-[8px] text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25 + i * 0.15, type: "spring", stiffness: 400, damping: 15 }}
            >
              ✓
            </motion.span>
            {c}
          </motion.li>
        ))}
      </ul>
      <div className="mt-4 flex -space-x-1.5">
        {[tones.blue.strong, tones.peach.strong, tones.violet.strong].map((c) => (
          <span key={c} className="h-5 w-5 rounded-full border-2 border-white" style={{ background: c }} />
        ))}
      </div>
    </FloatingCard>
  );
}

export function LaunchCard() {
  return (
    <FloatingCard>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] text-subtle">Rollout</div>
          <div className="text-[26px] tracking-[-0.04em]">
            v2.0 · <span className="text-peach"><CountUp to={100} />%</span>
          </div>
        </div>
        <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[10px] text-mint">99.99% uptime</span>
      </div>
      <svg viewBox="0 0 240 70" className="mt-3 w-full" aria-hidden>
        <defs>
          <linearGradient id="launch-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={tones.peach.strong} stopOpacity="0.25" />
            <stop offset="100%" stopColor={tones.peach.strong} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 60 C30 58 50 50 70 46 S110 40 130 30 S180 18 240 8 V70 H0Z"
          fill="url(#launch-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />
        <motion.path
          d="M0 60 C30 58 50 50 70 46 S110 40 130 30 S180 18 240 8"
          fill="none"
          stroke={tones.peach.strong}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-subtle">
        <span>Week 1</span>
        <span>Week 6</span>
      </div>
    </FloatingCard>
  );
}

/* ------------------------------------------------------------------ */
/* Capability visuals                                                 */
/* ------------------------------------------------------------------ */

function Connector({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <span className="relative h-6 w-px overflow-hidden bg-black/10">
      <motion.span
        className="absolute left-0 h-2 w-px"
        style={{ background: color }}
        animate={{ top: ["-30%", "110%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay }}
      />
    </span>
  );
}

export function ArchitectureVisual() {
  const box = "rounded-md border bg-white px-3 py-2 text-[11px] text-center";
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2">
        {[
          ["Web", tones.blue],
          ["iOS", tones.mint],
          ["Android", tones.butter],
        ].map(([c, t]) => (
          <span key={c as string} className={box} style={{ borderColor: (t as typeof tones.blue).soft, color: (t as typeof tones.blue).strong }}>
            {c as string}
          </span>
        ))}
      </div>
      <Connector color={tones.blue.strong} />
      <span className="rounded-md bg-blue px-5 py-2 text-[11px] text-white shadow-[0_6px_20px_rgba(59,91,253,0.3)]">API gateway</span>
      <Connector color={tones.blue.strong} delay={0.5} />
      <div className="grid grid-cols-3 gap-2">
        {["Auth", "Billing", "Search"].map((c) => (
          <span key={c} className={`${box} border-line`}>{c}</span>
        ))}
      </div>
      <Connector color={tones.violet.strong} delay={0.9} />
      <div className="flex gap-2">
        <span className={`${box} border-violet-soft bg-violet-soft text-violet`}>Postgres</span>
        <span className={`${box} border-peach-soft bg-peach-soft text-peach`}>Event queue</span>
      </div>
    </div>
  );
}

export function CodeVisual() {
  const lines: [string, "add" | "del" | ""][] = [
    ["export async function createBooking(input) {", ""],
    ["  const slot = await findSlot(input)", "del"],
    ["  const slot = await findSlot(input, { lock: true })", "add"],
    ["  if (!slot) throw new SlotUnavailable()", ""],
    ["  return db.booking.create({ data: slot })", ""],
    ["}", ""],
  ];
  return (
    <div className="w-full max-w-[380px] overflow-hidden rounded-md border border-line bg-white font-mono text-[8.5px] sm:text-[10.5px]">
      <div className="flex items-center justify-between border-b border-line px-3 py-2 text-[10px] text-subtle">
        booking/create.ts
        <span className="font-sans text-mint">+1 −1</span>
      </div>
      <div className="py-2">
        {lines.map(([l, t], i) => (
          <motion.div
            key={i}
            className={`flex gap-3 px-3 py-0.5 ${t === "add" ? "bg-mint-soft text-[#0b6b46]" : ""} ${t === "del" ? "bg-rose-soft text-rose line-through" : ""}`}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <span className="w-3 text-right opacity-50">{i + 1}</span>
            <span className="whitespace-pre">
              {l.split(/(async|await|function|const|return|throw|new|if)/).map((part, k) =>
                ["async", "await", "function", "const", "return", "throw", "new", "if"].includes(part) ? (
                  <span key={k} className={t ? "" : "text-violet"}>{part}</span>
                ) : (
                  part
                ),
              )}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="m-2 flex gap-2 rounded-sm bg-blue-soft p-2 font-sans text-[10.5px]"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-blue text-[8px] text-white">AO</span>
        <span>Locking the slot prevents double bookings under load. Approved.</span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-col rounded-[6px] p-3 ${className}`}>{children}</div>;
}

function Ring({ value, color }: { value: number; color: string }) {
  return (
    <svg viewBox="0 0 36 36" className="mt-3 h-12 w-12 -rotate-90" aria-hidden>
      <circle cx="18" cy="18" r="15" fill="none" stroke="white" strokeWidth="4" />
      <motion.circle
        cx="18"
        cy="18"
        r="15"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: value }}
        transition={{ duration: 1.2, delay: 0.3, ease }}
      />
    </svg>
  );
}

function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex h-[300px] w-[160px] flex-col rounded-xl border border-line-strong bg-white p-3 pt-6 shadow-[0_12px_30px_rgba(18,162,106,0.12)] ${className}`}>
      {children}
    </div>
  );
}

function FloatingCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[300px] rounded-lg bg-white p-4 shadow-[0_14px_40px_rgba(0,0,0,0.1)]">{children}</div>
  );
}
