import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import { PROJECTS, CONTACT, REFERENCE } from "@/lib/content";

/* Vsa besedila te strani so v lib/content.ts → REFERENCE */

export const metadata: Metadata = {
  title: REFERENCE.metaTitle,
  description: REFERENCE.metaDescription,
};

export default function Reference() {
  return (
    <>
      <PageHero
        index={REFERENCE.index}
        eyebrow={REFERENCE.eyebrow}
        title={REFERENCE.title}
        intro={REFERENCE.intro}
      />

      <section className="wrap py-20 md:py-28">
        <ProjectsGrid projects={PROJECTS} />
      </section>

      {/* note for real photos — remove once photos are added */}
      <section className="wrap pb-8">
        <p className="tick opacity-60">
          {/* Fotografije dodate tako, da datoteke naložite v mapo /public in v lib/content.ts vsakemu projektu dodate polje src. */}
        </p>
      </section>

      <section className="wrap pb-24 md:pb-32">
        <div
          className="rounded-[4px] px-8 py-14 md:px-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          style={{ background: "var(--ink)" }}
        >
          <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] max-w-xl" style={{ color: "var(--paper-raised)" }}>
            {REFERENCE.ctaTitle}
          </h2>
          <a
            href={`mailto:${CONTACT.email}`}
            className="btn shrink-0"
            style={{ background: "var(--blue-bright)", color: "var(--ink)" }}
          >
            {CONTACT.email} <span className="arw">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
