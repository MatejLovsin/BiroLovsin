import Link from "next/link";
import Schematic from "@/components/Schematic";
import PhotoFrame from "@/components/PhotoFrame";
import { SERVICES, PHASES, PROJECTS, STATS, CONTACT, HOME } from "@/lib/content";

/* Vsa besedila te strani so v lib/content.ts → HOME */

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="blueprint relative overflow-hidden">
        <div className="wrap relative z-10 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 items-center">
            {/* copy */}
            <div>
              <div className="reveal flex items-center gap-3 mb-7">
                <span className="eyebrow">{HOME.hero.eyebrow}</span>
                <span className="h-px w-10" style={{ background: "var(--blue)" }} />
                <span className="tick">{HOME.hero.location}</span>
              </div>

              <h1 className="reveal font-display font-extrabold tracking-tight text-[clamp(2.7rem,6.4vw,5rem)] leading-[0.98]">
                {HOME.hero.titleLead}{" "}
                <span style={{ color: "var(--blue-ink)" }}>{HOME.hero.titleAccent}</span>
                <br />
                {HOME.hero.titleRest}
              </h1>

              <p
                className="reveal mt-7 max-w-xl text-[1.12rem]"
                style={{ color: "var(--ink-2)", transitionDelay: "0.08s" }}
              >
                {HOME.hero.intro}
              </p>

              <div
                className="reveal mt-9 flex flex-wrap items-center gap-4"
                style={{ transitionDelay: "0.16s" }}
              >
                <a href={`mailto:${CONTACT.email}`} className="btn btn-primary">
                  {CONTACT.email} <span className="arw">→</span>
                </a>
                <a href="#potek" className="btn btn-ghost">
                  {HOME.hero.secondaryCta}
                </a>
              </div>

              {/* mini spec line */}
              <div
                className="reveal mt-12 flex flex-wrap gap-x-8 gap-y-3 pt-6 border-t"
                style={{ borderColor: "var(--hair)", transitionDelay: "0.22s" }}
              >
                {HOME.hero.specs.map((t) => (
                  <span key={t} className="tick" style={{ color: "var(--ink-2)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* schematic */}
            <div className="reveal relative" style={{ transitionDelay: "0.1s" }}>
              <div
                className="relative rounded-[4px] p-4 md:p-6"
                style={{
                  background: "var(--paper-raised)",
                  border: "1px solid var(--hair)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="tick">{HOME.hero.planTopLeft}</span>
                  <span className="tick">{HOME.hero.planTopRight}</span>
                </div>
                <Schematic className="w-full h-auto" />
                <div
                  className="flex items-center justify-between mt-3 pt-3"
                  style={{ borderTop: "1px solid var(--hair)" }}
                >
                  <span className="tick">{HOME.hero.planBottomLeft}</span>
                  <span className="tick">{HOME.hero.planBottomRight}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section style={{ background: "var(--ink)" }}>
        <div className="wrap">
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className="reveal py-10 md:py-12 px-5 text-center"
                style={{
                  borderLeft:
                    i % 2 === 0
                      ? "none"
                      : "1px solid rgba(255,255,255,0.08)",
                  transitionDelay: `${i * 0.06}s`,
                }}
              >
                <div
                  className="font-display font-bold text-[clamp(2.2rem,5vw,3.4rem)] leading-none"
                  style={{ color: "var(--blue-bright)" }}
                >
                  {s.value}
                </div>
                <div className="tick mt-3" style={{ color: "rgba(250,248,243,0.6)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="wrap py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow">{HOME.services.eyebrow}</span>
            <h2 className="reveal mt-4 font-display font-bold text-[clamp(2rem,4.4vw,3.2rem)] max-w-2xl">
              {HOME.services.title}
            </h2>
          </div>
          <p className="reveal max-w-sm text-[1.02rem]" style={{ color: "var(--ink-2)" }}>
            {HOME.services.intro}
          </p>
        </div>

        <div
          className="grid gap-px sm:grid-cols-2 lg:grid-cols-3"
          style={{ background: "var(--hair)" }}
        >
          {SERVICES.map((s, i) => (
            <article
              key={s.code}
              className="reveal group relative p-8 transition-colors duration-300"
              style={{
                background: "var(--paper)",
                transitionDelay: `${(i % 3) * 0.06}s`,
              }}
            >
              <div className="flex items-baseline justify-between mb-5">
                <span className="tick" style={{ color: "var(--blue-deep)" }}>{s.code}</span>
                <span
                  className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--blue-deep)" }}
                >
                  ↗
                </span>
              </div>
              <h3 className="font-display text-[1.5rem] font-semibold mb-3">{s.title}</h3>
              <p className="text-[0.98rem] mb-6" style={{ color: "var(--ink-2)" }}>
                {s.desc}
              </p>
              <ul className="flex flex-col gap-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-[0.9rem]"
                    style={{ color: "var(--ink-2)" }}
                  >
                    <span
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: "var(--blue)" }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
              <span
                className="absolute left-0 bottom-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "var(--blue)" }}
              />
            </article>
          ))}
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section id="potek" className="scroll-mt-[74px]" style={{ background: "var(--paper-deep)" }}>
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="eyebrow">{HOME.process.eyebrow}</span>
              <h2 className="reveal mt-4 font-display font-bold text-[clamp(2rem,4.4vw,3.2rem)]">
                {HOME.process.title}
              </h2>
              <p className="reveal mt-6 text-[1.05rem]" style={{ color: "var(--ink-2)" }}>
                {HOME.process.intro}
              </p>
            </div>

            <ol className="flex flex-col">
              {PHASES.slice(0, 4).map((p, i) => (
                <li
                  key={p.idx}
                  className="reveal group grid grid-cols-[auto_1fr] gap-6 py-6"
                  style={{
                    borderTop: "1px solid var(--hair)",
                    transitionDelay: `${i * 0.06}s`,
                  }}
                >
                  <span
                    className="font-display font-bold text-[2rem] leading-none tabular-nums"
                    style={{ color: "var(--blue)" }}
                  >
                    {p.idx}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="font-display text-[1.25rem] font-semibold">{p.title}</h3>
                      <span className="tick" style={{ color: "var(--blue-deep)" }}>{p.code}</span>
                    </div>
                    <p className="text-[0.96rem]" style={{ color: "var(--ink-2)" }}>{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ PROJECTS TEASER ============ */}
      <section className="wrap py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">{HOME.projects.eyebrow}</span>
            <h2 className="reveal mt-4 font-display font-bold text-[clamp(2rem,4.4vw,3.2rem)]">
              {HOME.projects.title}
            </h2>
          </div>
          <Link href="/reference" className="ulink font-mono text-sm" style={{ color: "var(--blue-ink)" }}>
            {HOME.projects.linkLabel}
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.slice(0, 3).map((p, i) => (
            <Link
              href="/reference"
              key={p.title}
              className="reveal group block"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <PhotoFrame
                src={p.src}
                alt={p.title}
                label={p.category}
                index={String(i + 1).padStart(2, "0")}
                className="mb-4 transition-transform duration-500 group-hover:-translate-y-1"
              />
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-[1.2rem] font-semibold">{p.title}</h3>
                <span className="tick">{p.year}</span>
              </div>
              <p className="tick mt-1" style={{ color: "var(--blue-deep)" }}>{p.scope}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="wrap pb-24 md:pb-32">
        <div
          className="blueprint relative overflow-hidden rounded-[4px] px-8 py-16 md:px-16 md:py-24 text-center"
          style={{ border: "1px solid var(--line-strong)" }}
        >
          <div className="relative z-10">
            <span className="eyebrow">{HOME.cta.eyebrow}</span>
            <h2 className="reveal mt-5 font-display font-extrabold text-[clamp(2.1rem,5vw,3.6rem)] max-w-3xl mx-auto leading-[1.02]">
              {HOME.cta.title}
            </h2>
            <p className="reveal mt-6 max-w-xl mx-auto text-[1.05rem]" style={{ color: "var(--ink-2)" }}>
              {HOME.cta.intro}
            </p>
            <div className="reveal mt-9 flex flex-wrap justify-center gap-4">
              <a href={`mailto:${CONTACT.email}`} className="btn btn-primary">
                {CONTACT.email} <span className="arw">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
