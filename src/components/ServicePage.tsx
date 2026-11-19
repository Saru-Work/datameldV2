import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { Button, FadeIn } from "@/components/ui";
import { steps } from "@/lib/data";
import { servicePages, type ServicePage } from "@/lib/services";
import { site } from "@/lib/site";

const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — web and mobile app development studio in Sri Lanka` };

export function serviceMetadata(s: ServicePage): Metadata {
  const path = `/services/${s.slug}`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: `${s.metaTitle} | ${site.name}`,
      description: s.metaDescription,
      locale: site.locale,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: `${s.metaTitle} | ${site.name}`, description: s.metaDescription, images: [ogImage] },
  };
}

function ServiceJsonLd({ s }: { s: ServicePage }) {
  const url = `${site.url}/services/${s.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: s.name,
        serviceType: s.name,
        description: s.metaDescription,
        url,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: "Worldwide",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/#services` },
          { "@type": "ListItem", position: 3, name: s.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[12px] tracking-[0.14em] text-subtle uppercase">{children}</p>;
}

export default function ServicePageView({ s }: { s: ServicePage }) {
  const other = servicePages.find((p) => p.slug !== s.slug)!;

  return (
    <>
      <ServiceJsonLd s={s} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative mx-auto max-w-6xl px-5 pt-10 pb-24 sm:pt-16 xl:px-0">
          <nav aria-label="Breadcrumb" className="text-[13px] text-subtle">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-foreground">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/#services" className="hover:text-foreground">Services</Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-foreground">{s.shortName}</li>
            </ol>
          </nav>
          <div className="mt-12 max-w-[880px]">
            <Label>{s.eyebrow}</Label>
            <h1 className="mt-6 text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] font-medium tracking-[-0.045em]">
              {s.h1} <span className="block text-subtle">{s.h1Accent}</span>
            </h1>
            <p className="mt-8 max-w-[640px] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.55] text-muted">{s.intro}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="#contact">Book a discovery call</Button>
              <Button href="/#work" variant="ghost">
                See our work
              </Button>
            </div>
          </div>
        </section>

        {/* What we build */}
        <section className="mx-auto max-w-6xl px-5 pb-24 xl:px-0">
          <div className="grid gap-5 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Label>What we build</Label>
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium tracking-[-0.04em]">
                {s.shortName} we design and build
              </h2>
              <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {s.builds.map((b, i) => (
                  <FadeIn key={b.title} delay={i * 0.05}>
                    <h3 className="text-[20px] tracking-[-0.02em]">{b.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-muted">{b.description}</p>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="mx-auto max-w-6xl px-5 pb-24 xl:px-0">
          <div className="grid gap-5 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Label>Technology</Label>
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium tracking-[-0.04em]">Our {s.shortName.toLowerCase()} stack</h2>
              <p className="mt-5 max-w-[560px] text-[16px] leading-[1.6] text-muted">{s.stackNote}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {s.stack.map((t) => (
                  <li key={t} className="rounded-full bg-surface px-4 py-1.5 text-[14px] ring-1 ring-line">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mx-auto max-w-6xl px-5 pb-24 xl:px-0">
          <div className="grid gap-5 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Label>Process</Label>
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium tracking-[-0.04em]">From idea to launch in four steps</h2>
              <ol className="mt-12 grid gap-8 sm:grid-cols-2">
                {steps.map((st, i) => (
                  <li key={st.title}>
                    <p className="font-mono text-[12px] text-subtle">
                      {String(i + 1).padStart(2, "0")} · {st.when}
                    </p>
                    <h3 className="mt-2 text-[20px] tracking-[-0.02em]">{st.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-muted">{st.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Why DataMeld */}
        <section className="mx-auto max-w-6xl px-5 pb-24 xl:px-0">
          <div className="grid gap-5 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Label>Why DataMeld</Label>
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium tracking-[-0.04em]">Why work with us</h2>
              <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {s.reasons.map((r) => (
                  <div key={r.title}>
                    <h3 className="text-[20px] tracking-[-0.02em]">{r.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-muted">{r.description}</p>
                  </div>
                ))}
              </div>
              {s.project && (
                <p className="mt-12 max-w-[640px] text-[16px] leading-[1.6] text-muted">
                  Recent work: {s.project.summary}{" "}
                  <a href={s.project.url} target="_blank" rel="noopener" className="text-foreground underline decoration-line-strong underline-offset-4 hover:decoration-foreground">
                    Visit {s.project.client}
                  </a>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-5 pb-24 xl:px-0">
          <div className="grid gap-5 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Label>FAQ</Label>
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium tracking-[-0.04em]">Frequently asked questions</h2>
              <div className="mt-10 border-t border-line">
                {s.faqs.map((f) => (
                  <details key={f.q} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                      <h3 className="font-normal">{f.q}</h3>
                      <span aria-hidden className="text-[20px] text-subtle transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-[680px] pb-6 text-[15px] leading-[1.65] text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
              <p className="mt-12 text-[15px] text-muted">
                Also see:{" "}
                <Link href={`/services/${other.slug}`} className="text-foreground underline decoration-line-strong underline-offset-4 hover:decoration-foreground">
                  {other.name}
                </Link>
              </p>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
