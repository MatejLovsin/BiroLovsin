"use client";

import { useMemo, useState } from "react";
import PhotoFrame from "@/components/PhotoFrame";
import { UI, type Project } from "@/lib/content";

/* Besedila so v lib/content.ts → UI */

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => [UI.filterAll, ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [active, setActive] = useState(UI.filterAll);

  const filtered =
    active === UI.filterAll
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* filter chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((c) => {
          const on = c === active;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className="font-mono text-[0.78rem] tracking-wide px-4 py-2 rounded-[2px] transition-all duration-300"
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

      {/* grid */}
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <article key={p.title + i} className="group">
            <PhotoFrame
              src={p.src}
              alt={p.title}
              label={p.category}
              index={String(i + 1).padStart(2, "0")}
              className="mb-5 transition-transform duration-500 group-hover:-translate-y-1"
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
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="tick py-16 text-center">{UI.noProjects}</p>
      )}
    </div>
  );
}
