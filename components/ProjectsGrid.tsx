"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LazyMotion, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import PhotoFrame from "@/components/PhotoFrame";
import { UI, type Project } from "@/lib/content";

/* Besedila so v lib/content.ts → UI */

/**
 * Motion se naloži šele po hidraciji (in ne blokira prvega izrisa) — celoten
 * paket je ~40 KB. Filtriranje se zgodi šele ob kliku, takrat je že tu.
 * `domMax` je potreben zaradi animacij postavitve (layout / popLayout).
 */
const loadFeatures = () => import("motion/react").then((mod) => mod.domMax);

/** Ista krivulja kot --ease v globals.css. */
const EASE = [0.22, 1, 0.36, 1] as const;
/** Krivulja za odhod — hitrejši zaključek kot prihod. */
const EASE_IN = [0.7, 0, 0.84, 0] as const;

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => [UI.filterAll, ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [active, setActive] = useState(UI.filterAll);
  const reduce = useReducedMotion();

  const filtered =
    active === UI.filterAll
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <LazyMotion features={loadFeatures} strict>
      {/* filter chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((c) => {
          const on = c === active;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className="chip font-mono text-[0.78rem] tracking-wide px-4 py-2 rounded-[2px]"
              style={{
                background: on ? "var(--ink)" : "transparent",
                color: on ? "var(--paper-raised)" : "var(--ink-2)",
                border: `1px solid ${on ? "var(--ink)" : "var(--hair)"}`,
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* grid — "popLayout" vzame odhajajočo kartico iz postavitve, zato se
         preostale gladko premaknejo na nova mesta namesto da bi poskočile. */}
      <m.div
        layout={!reduce}
        transition={{ layout: { type: "spring", duration: 0.5, bounce: 0.15 } }}
        className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((p, i) => (
            <m.article
              /* Ključ mora biti obstojen — z indeksom bi se kartice ob
                 filtriranju na novo priklopile namesto animirale. */
              key={p.title}
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduce
                  ? { opacity: 0, transition: { duration: 0.12 } }
                  : {
                      opacity: 0,
                      scale: 0.97,
                      transition: { duration: 0.15, ease: EASE_IN },
                    }
              }
              transition={{
                duration: reduce ? 0.15 : 0.22,
                ease: EASE,
                /* Zamik po vrsti, a največ do šeste kartice — sicer bi
                   zadnje čakale predolgo. */
                delay: reduce ? 0 : Math.min(i, 5) * 0.04,
                layout: { type: "spring", duration: 0.5, bounce: 0.15 },
              }}
              className="group"
            >
              <PhotoFrame
                src={p.src}
                alt={p.title}
                label={p.category}
                index={String(i + 1).padStart(2, "0")}
                className="mb-5 transition-transform duration-200 group-hover:-translate-y-1"
              />
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-[1.35rem] font-semibold leading-tight">{p.title}</h2>
                <span className="tick shrink-0">{p.year}</span>
              </div>
              <p className="tick mt-1.5" style={{ color: "var(--blue-deep)" }}>
                {p.category} · {p.location}
              </p>
              <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                {p.scope}
              </p>
            </m.article>
          ))}
        </AnimatePresence>
      </m.div>

      <AnimatePresence>
        {filtered.length === 0 && (
          <m.p
            className="tick py-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            {UI.noProjects}
          </m.p>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
