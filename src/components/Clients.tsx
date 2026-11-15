import { clients } from "@/lib/data";
import { FadeIn } from "./ui";

export default function Clients() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 xl:px-0">
      <FadeIn>
        <div className="grid items-center gap-6 border-y border-line py-7 lg:grid-cols-12">
          <p className="text-[14px] leading-[1.45] text-muted lg:col-span-3">
            Trusted by <span className="text-foreground">startups and growing businesses</span>, including:
          </p>
          <div className="flex flex-wrap items-center gap-x-14 gap-y-4 lg:col-span-9">
            {clients.map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[21px] font-semibold tracking-[-0.04em] text-black/35 transition-colors duration-300 hover:text-foreground"
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
