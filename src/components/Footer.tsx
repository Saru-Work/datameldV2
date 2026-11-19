import { footerLinks } from "@/lib/data";
import { Wordmark } from "./ui";

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

const headings = ["Services", "Company"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-12 px-5 pt-20 pb-12 md:flex-row xl:px-0">
        <div className="max-w-[300px]">
          <Wordmark className="text-[22px]" />
          <p className="mt-4 text-[14px] leading-[1.6] text-muted">
            A four-person studio building web and mobile apps for startups and enterprises.
          </p>
          <a href="mailto:saruatwork@gmail.com" className="mt-4 inline-block text-[15px] text-foreground underline decoration-line-strong underline-offset-4 hover:decoration-foreground">
            saruatwork@gmail.com
          </a>
          <address className="mt-3 text-[14px] leading-[1.6] text-muted not-italic">Jaffna Town, Jaffna, Sri Lanka</address>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-10">
          {footerLinks.map((col, i) => (
            <div key={i}>
              <h2 className="mb-4 text-[12px] font-normal tracking-widest text-subtle uppercase">{headings[i]}</h2>
              <ul className="space-y-3">
                {col.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="group flex items-center gap-1 text-[15px] tracking-[-0.01em] transition-colors hover:text-muted">
                      {l.label}
                      <span aria-hidden className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none relative mx-auto max-w-6xl select-none px-5 xl:px-0">
        <p className="text-center text-[clamp(4.5rem,19vw,16rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-foreground/[0.06]">
          DataMeld
        </p>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col justify-between gap-2 border-t border-line px-5 py-6 text-[13px] text-subtle sm:flex-row xl:px-0">
        <span>
          © <CopyrightYear /> DataMeld. All rights reserved.
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-mint" /> All systems operational
        </span>
      </div>
    </footer>
  );
}
