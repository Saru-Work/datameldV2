"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { tones, type Tone } from "@/lib/data";

/* Fixed design geometry — everything is positioned absolutely so the cursor and
   cards can share one coordinate system, and the whole canvas is scaled to fit. */
const W = 1040;
const H = 600;
const COLS = [214, 490, 766];
const COL_W = 258;
const COL_TOP = 140;
const CARD_TOP = COL_TOP + 40;
const CARD_H = 78;
const CARD_GAP = 10;
const COL_NAMES = ["To do", "In progress", "Shipped"];
const COL_TONES: Tone[] = ["violet", "blue", "mint"];

type Card = { key: string; title: string; tag: string; tone: Tone; who: string; col: number };

const seed: Omit<Card, "key">[] = [
  { title: "Apple Pay at checkout", tag: "Payments", tone: "mint", who: "AO", col: 0 },
  { title: "Address autocomplete", tag: "UX", tone: "violet", who: "DR", col: 0 },
  { title: "Fraud score webhook", tag: "Backend", tone: "rose", who: "PN", col: 0 },
  { title: "One-tap reorder", tag: "Mobile", tone: "blue", who: "MT", col: 1 },
  { title: "Cart recovery emails", tag: "Growth", tone: "butter", who: "JL", col: 1 },
  { title: "Guest checkout", tag: "UX", tone: "peach", who: "AO", col: 2 },
];

const ease = [0.45, 0, 0.2, 1] as const;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function cardPos(cards: Card[], key: string) {
  const card = cards.find((c) => c.key === key)!;
  const index = cards.filter((c) => c.col === card.col).findIndex((c) => c.key === key);
  return { x: COLS[card.col], y: CARD_TOP + index * (CARD_H + CARD_GAP) };
}

/** Renders children at a fixed design size and scales them to fit the available width. */
export function ScaledCanvas({ width, height, children }: { width: number; height: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: height * scale }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

function Cursor({ x, y, pressed, name, color }: { x: number; y: number; pressed?: boolean; name: string; color: string }) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0 left-0 z-30"
      animate={{ x, y }}
      transition={{ duration: 0.7, ease }}
    >
      <motion.svg viewBox="0 0 20 20" className="h-5 w-5 drop-shadow" animate={{ scale: pressed ? 0.82 : 1 }}>
        <path d="M2 2l6.5 16 2.3-6.7L17.5 9z" fill={color} stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      </motion.svg>
      <span className="ml-4 -mt-1 block w-max rounded-full px-2 py-0.5 text-[11px] text-white" style={{ background: color }}>
        {name}
      </span>
    </motion.div>
  );
}

function BoardCard({ card, x, y, dragging }: { card: Card; x: number; y: number; dragging: boolean }) {
  const t = tones[card.tone];
  const shipped = card.col === 2;
  return (
    <motion.div
      className="absolute top-0 left-0 flex flex-col justify-between rounded-lg border border-black/[0.06] bg-white p-3"
      style={{ width: COL_W - 16, height: CARD_H, zIndex: dragging ? 20 : 1 }}
      initial={{ opacity: 0, x: x + 8, y, scale: 0.9 }}
      animate={{
        opacity: 1,
        x: x + 8,
        y,
        scale: dragging ? 1.05 : 1,
        rotate: dragging ? 2.5 : 0,
        boxShadow: dragging ? "0 18px 30px -12px rgba(15,17,21,0.35)" : "0 1px 2px rgba(15,17,21,0.06)",
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: t.soft, color: t.strong }}>
          {card.tag}
        </span>
        <AnimatePresence>
          {shipped && (
            <motion.span
              className="grid h-5 w-5 place-items-center rounded-full bg-mint text-white"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.5 }}
            >
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <p className={`text-[13.5px] tracking-[-0.01em] ${shipped ? "text-black/45 line-through decoration-black/20" : ""}`}>{card.title}</p>
      <div className="flex items-center gap-2">
        <span className="grid h-5 w-5 place-items-center rounded-full text-[8px] text-white" style={{ background: t.strong }}>
          {card.who}
        </span>
        {card.col === 1 ? (
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-blue-soft">
            <motion.span
              className="block h-full rounded-full bg-blue"
              animate={{ width: ["20%", "85%", "20%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        ) : (
          <span className="text-[10px] text-black/40">{shipped ? "Live in production" : "3 pts"}</span>
        )}
      </div>
    </motion.div>
  );
}

function Sparkline() {
  const [pts, setPts] = useState(() => Array.from({ length: 16 }, (_, i) => 18 + Math.sin(i / 2) * 6 + (i % 3) * 2));
  useEffect(() => {
    const id = setInterval(() => setPts((p) => [...p.slice(1), Math.max(6, Math.min(30, p[p.length - 1] + (Math.random() - 0.4) * 9))]), 1100);
    return () => clearInterval(id);
  }, []);
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"}${i * 8} ${36 - v}`).join(" ");
  const last = pts[pts.length - 1];
  return (
    <div className="flex items-center gap-3 rounded-lg border border-black/[0.06] bg-white px-3 py-2">
      <div>
        <p className="text-[10px] text-black/45">Checkout conversion</p>
        <p className="text-[18px] tracking-[-0.03em]">
          {(3 + last / 20).toFixed(2)}%
          <span className="ml-1.5 text-[10px] text-mint">▲ live</span>
        </p>
      </div>
      <svg viewBox="0 0 120 36" className="h-9 w-[120px]" fill="none">
        <motion.path d={d} animate={{ d }} stroke={tones.mint.strong} strokeWidth="2" strokeLinecap="round" transition={{ duration: 0.8 }} />
        <motion.circle r="3" fill={tones.mint.strong} animate={{ cx: 120, cy: 36 - last }} transition={{ duration: 0.8 }} />
      </svg>
    </div>
  );
}

export default function Workspace() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [cards, setCards] = useState<Card[]>(() => seed.map((c, i) => ({ ...c, key: `c${i}` })));
  const [cursor, setCursor] = useState({ x: 640, y: 420, pressed: false });
  const [dragging, setDragging] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [shippedCount, setShippedCount] = useState(14);
  const cardsRef = useRef(cards);
  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  useEffect(() => {
    if (!inView) return;
    let alive = true;
    let phase = 0;
    let gen = seed.length;

    (async () => {
      await wait(900);
      while (alive) {
        const list = cardsRef.current;
        const from = phase % 2 === 0 ? 1 : 0;
        const moving = list.find((c) => c.col === from);
        phase++;
        if (!moving) {
          await wait(600);
          continue;
        }

        // 1. glide to the card and grab it
        const start = cardPos(list, moving.key);
        setCursor({ x: start.x + 150, y: start.y + 40, pressed: false });
        await wait(800);
        if (!alive) return;
        setCursor((c) => ({ ...c, pressed: true }));
        setDragging(moving.key);
        await wait(250);

        // 2. drop it at the top of the next column — card and cursor travel together
        const next = [{ ...moving, col: from + 1 }, ...list.filter((c) => c.key !== moving.key)];
        setCards(next);
        const end = cardPos(next, moving.key);
        setCursor({ x: end.x + 150, y: end.y + 40, pressed: true });
        await wait(750);
        if (!alive) return;
        setCursor((c) => ({ ...c, pressed: false }));
        setDragging(null);

        if (from === 1) {
          setToast(moving.title);
          setShippedCount((n) => (n >= 20 ? 12 : n + 1));
          // keep the board looping: the oldest shipped card returns to the backlog
          const shipped = next.filter((c) => c.col === 2);
          if (shipped.length > 3) {
            const oldest = shipped[shipped.length - 1];
            await wait(500);
            setCards((cs) => [...cs.filter((c) => c.key !== oldest.key), { ...oldest, key: `c${gen++}`, col: 0 }]);
          }
        }
        await wait(1400);
        setToast(null);
        await wait(300);
      }
    })();

    return () => {
      alive = false;
    };
  }, [inView]);

  return (
    <div ref={ref}>
      <ScaledCanvas width={W} height={H}>
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#ffffff] text-foreground">
          {/* window chrome */}
          <div className="absolute inset-x-0 top-0 flex h-11 items-center justify-between border-b border-black/[0.06] bg-white px-4">
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff6b5f]" />
              <span className="h-3 w-3 rounded-full bg-[#ffc23d]" />
              <span className="h-3 w-3 rounded-full bg-[#2ccb6a]" />
            </span>
            <span className="flex items-center gap-2 rounded-full bg-panel px-4 py-1 text-[11px] text-black/50">
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2M3.5 7h9v6.5h-9z" />
              </svg>
              app.datameld.dev/sprint-24
            </span>
            <span className="flex items-center gap-2 text-[11px] text-black/50">
              <span className="flex -space-x-1.5">
                {(["blue", "rose", "mint"] as Tone[]).map((t) => (
                  <span key={t} className="h-5 w-5 rounded-full border-2 border-white" style={{ background: tones[t].strong }} />
                ))}
              </span>
              3 online
            </span>
          </div>

          {/* sidebar */}
          <div className="absolute top-11 bottom-0 left-0 w-[190px] border-r border-black/[0.06] bg-[#f3f4f6] p-3">
            {[
              ["Overview", false],
              ["Sprint board", true],
              ["Releases", false],
              ["Analytics", false],
              ["Settings", false],
            ].map(([label, on]) => (
              <div
                key={label as string}
                className={`mb-1 flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[12.5px] ${on ? "bg-white text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.06)]" : "text-black/50"}`}
              >
                <span className={`h-2 w-2 rounded-[3px] ${on ? "bg-blue" : "bg-black/15"}`} />
                {label as string}
              </div>
            ))}
            <div className="absolute inset-x-3 bottom-3 rounded-lg bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
              <p className="text-[10px] text-black/45">Sprint progress</p>
              <div className="mt-2 flex items-center gap-3">
                <svg viewBox="0 0 36 36" className="h-11 w-11 -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke={tones.blue.soft} strokeWidth="4" />
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke={tones.blue.strong}
                    strokeWidth="4"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray="1 1"
                    animate={{ strokeDashoffset: 1 - shippedCount / 20 }}
                    transition={{ duration: 0.8 }}
                  />
                </svg>
                <div>
                  <p className="text-[18px] leading-none tracking-[-0.03em]">
                    <motion.span key={shippedCount} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block">
                      {shippedCount}
                    </motion.span>
                    <span className="text-black/35">/20</span>
                  </p>
                  <p className="mt-1 text-[10px] text-black/45">tasks shipped</p>
                </div>
              </div>
            </div>
          </div>

          {/* header */}
          <div className="absolute top-[64px] right-4 left-[214px] flex items-start justify-between">
            <div>
              <p className="text-[22px] tracking-[-0.03em]">
                Sprint 24 <span className="accent text-black/45">· Checkout</span>
              </p>
              <p className="mt-0.5 text-[11.5px] text-black/45">6 days left · Release train departs Friday 14:00</p>
            </div>
            <Sparkline />
          </div>

          {/* columns */}
          {COLS.map((x, i) => {
            const t = tones[COL_TONES[i]];
            const count = cards.filter((c) => c.col === i).length;
            return (
              <div
                key={i}
                className="absolute bottom-4 rounded-lg bg-[#eef0f2]"
                style={{ left: x, top: COL_TOP, width: COL_W }}
              >
                <div className="flex h-10 items-center gap-2 px-3 text-[12px]">
                  <span className="h-2 w-2 rounded-full" style={{ background: t.strong }} />
                  {COL_NAMES[i]}
                  <motion.span
                    key={count}
                    className="rounded-full px-1.5 text-[10px]"
                    style={{ background: t.soft, color: t.strong }}
                    initial={{ scale: 1.4 }}
                    animate={{ scale: 1 }}
                  >
                    {count}
                  </motion.span>
                </div>
              </div>
            );
          })}

          {/* cards */}
          <AnimatePresence>
            {cards.map((card) => {
              const p = cardPos(cards, card.key);
              return <BoardCard key={card.key} card={card} x={p.x} y={p.y} dragging={dragging === card.key} />;
            })}
          </AnimatePresence>

          {/* a teammate wandering around the board */}
          <motion.div
            className="pointer-events-none absolute top-0 left-0 z-30"
            animate={{ x: [300, 560, 820, 520, 300], y: [470, 330, 420, 520, 470] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5 drop-shadow">
              <path d="M2 2l6.5 16 2.3-6.7L17.5 9z" fill={tones.rose.strong} stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            <span className="ml-4 -mt-1 block w-max rounded-full bg-rose px-2 py-0.5 text-[11px] text-white">Mei</span>
          </motion.div>

          <Cursor x={cursor.x} y={cursor.y} pressed={cursor.pressed} name="Daniel" color={tones.blue.strong} />

          {/* deploy toast */}
          <AnimatePresence>
            {toast && (
              <motion.div
                key={toast}
                className="absolute right-6 bottom-6 z-40 flex items-center gap-3 rounded-lg bg-foreground py-2.5 pr-4 pl-2.5 text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)]"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-mint">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[12px]">Deployed to production</span>
                  <span className="block text-[10.5px] text-white/55">{toast} · 42s · 0 errors</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScaledCanvas>
    </div>
  );
}
