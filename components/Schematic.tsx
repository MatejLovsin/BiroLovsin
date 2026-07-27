"use client";

/**
 * Schematic — an animated, probeable electrical floor-plan.
 *
 * Serves as the hero visual: a stylised building plan with a distribution
 * board feeding lights, sockets and a motor.
 *
 * Two behaviours beyond the static drawing:
 *   1. On mount the plan *drafts itself* — walls draw stroke-first, then the
 *      dimension line, board, feeders and symbols. Once done, the existing
 *      "current flow" and node-pulse loops take over.
 *   2. Hovering / tapping / tabbing to a symbol highlights that circuit's
 *      feeder run and prints its details in the title block.
 *
 * Pure SVG + CSS. Napisi so v lib/content.ts → UI.planRooms / planCircuits …
 */

import { useEffect, useRef, useState } from "react";
import { UI } from "@/lib/content";

/** Tokokrogi — vsak simbol je povezan s svojim dovodom (`feeder`). */
const CIRCUITS = [
  { feeder: "M112 372 H150 V150 H250", spark: false },
  { feeder: "M112 383 H140 V430 H150", spark: false },
  { feeder: "M112 395 H340 V180 H430", spark: true },
  { feeder: "M112 406 H360 V360 H430", spark: false },
];

/** Koliko časa traja uvodno izrisovanje, preden shema postane odzivna. */
const INTRO_MS = 1500;

export default function Schematic({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<number | null>(null);
  /**
   * Izrisovanje se sproži šele, ko shema pride na zaslon — sicer bi se na
   * telefonu odvrtelo pod robom okna in bi obiskovalec videl le končno sliko.
   */
  const [started, setStarted] = useState(false);
  /** Dokler traja uvod, elementom vlada animacija; nato jih krmili `active`. */
  const [ready, setReady] = useState(false);
  /** Neskončni zanki (tok, utrip) mirujeta, kadar shema ni na zaslonu. */
  const [visible, setVisible] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setStarted(true);
      },
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    /* Ob zmanjšanem gibanju uvoda ni — shema je odzivna takoj. */
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const t = setTimeout(() => setReady(true), reduced ? 0 : INTRO_MS);
    return () => clearTimeout(t);
  }, [started]);

  const circuit = active === null ? null : UI.planCircuits[active];

  /** Skupne lastnosti odzivnega simbola — miška, dotik in tipkovnica. */
  const probe = (i: number) => ({
    className: "probe",
    role: "button" as const,
    tabIndex: 0,
    "aria-label": `${UI.planCircuits[i].code} — ${UI.planCircuits[i].name}, ${UI.planCircuits[i].spec}`,
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setActive(i);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setActive(null);
    },
    onClick: () => setActive((a) => (a === i ? null : i)),
    onFocus: () => setActive(i),
    onBlur: () => setActive(null),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActive((a) => (a === i ? null : i));
      }
    },
  });

  /** Razred dovoda: poudarjen, zatemnjen ali običajen. */
  const feedClass = (i: number) => {
    if (!ready || active === null) return "";
    return active === i ? "on" : "off";
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 640 560"
      className={`${className} ${started ? "run" : ""} ${visible ? "" : "paused"}`}
      role="img"
      aria-label={UI.planAriaLabel}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          .ln  { stroke: var(--blue-deep); stroke-width: 1.4; }
          .wall{ stroke: var(--ink); stroke-width: 2; }
          .thin{ stroke: var(--line-strong); stroke-width: 1; }
          .feed{ stroke: var(--blue); stroke-width: 1.6; stroke-dasharray: 6 7;
                 animation: flow 9s linear infinite; }
          .feed2{ stroke: var(--spark); stroke-width: 1.6; stroke-dasharray: 4 8;
                 animation: flow 6s linear infinite; }
          .sym { stroke: var(--blue-ink); stroke-width: 1.6; }
          .fillp { fill: var(--paper-raised); }
          .node { fill: var(--blue); animation: pulse-dot 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .node.b { animation-delay: 1.1s; }
          .node.c { animation-delay: 2s; fill: var(--spark); }
          .lbl { font-family: var(--font-mono), monospace; font-size: 11px; fill: var(--ink-3); letter-spacing: .05em; }

          /* ---- uvodno izrisovanje ---- */
          @keyframes sch-draw { to { stroke-dashoffset: 0; } }
          @keyframes sch-fade { to { opacity: 1; } }
          @keyframes sch-grid { to { opacity: .5; } }
          @keyframes sch-pop  { from { opacity: 0; transform: scale(.94); } to { opacity: 1; transform: none; } }

          /* Pred vstopom na zaslon so elementi v izhodiščnem stanju;
             animacije stečejo šele, ko koren dobi razred .run */
          .fade, .gridin, .pop { opacity: 0; }
          .pop { transform-box: fill-box; transform-origin: center; }

          .run .draw { animation: sch-draw .7s var(--ease) forwards; }
          .run .fade { animation: sch-fade .4s ease forwards; }
          .run .gridin { animation: sch-grid .5s ease forwards; }
          .run .pop { animation: sch-pop .3s var(--ease) forwards; }

          /* ---- odzivnost ---- */
          .probe { cursor: pointer; outline: none; }
          .fg { transition: opacity .15s var(--ease); }
          .fg.off { opacity: .28; }
          .fg .feed, .fg .feed2 { transition: stroke .15s var(--ease), stroke-width .15s var(--ease); }
          .fg.on .feed, .fg.on .feed2 { stroke: var(--spark); stroke-width: 2.4; }
          .halo { opacity: 0; transition: opacity .15s var(--ease); }
          .halo.on { opacity: .9; }

          /* Shema miruje, kadar ni na zaslonu — manj porabe in manj motenja. */
          .paused .feed, .paused .feed2, .paused .node { animation-play-state: paused; }

          @media (prefers-reduced-motion: reduce) {
            /* Neskončne zanke ugasnemo; sicer bi ob skrajšanem trajanju
               utripale namesto tekle. */
            .feed, .feed2, .node { animation: none; }
            /* Brez izrisovanja — takoj končno stanje. */
            .draw, .fade, .gridin, .pop,
            .run .draw, .run .fade, .run .gridin, .run .pop {
              animation: none;
              opacity: 1;
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </defs>

      {/* faint construction grid */}
      <g className="gridin">
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`v${i}`} className="thin" x1={40 + i * 40} y1="40" x2={40 + i * 40} y2="520" />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`h${i}`} className="thin" x1="40" y1={40 + i * 40} x2="600" y2={40 + i * 40} />
        ))}
      </g>

      {/* building shell — obod se izriše prvi */}
      <rect
        className="wall draw"
        x="60"
        y="80"
        width="500"
        height="400"
        rx="2"
        style={{ strokeDasharray: 1800, strokeDashoffset: 1800, animationDelay: "0.05s" }}
      />
      {/* interior walls */}
      <line
        className="wall draw"
        x1="300" y1="80" x2="300" y2="300"
        style={{ strokeDasharray: 220, strokeDashoffset: 220, animationDelay: "0.3s" }}
      />
      <line
        className="wall draw"
        x1="300" y1="300" x2="560" y2="300"
        style={{ strokeDasharray: 260, strokeDashoffset: 260, animationDelay: "0.38s" }}
      />
      <line
        className="wall draw"
        x1="180" y1="300" x2="180" y2="480"
        style={{ strokeDasharray: 180, strokeDashoffset: 180, animationDelay: "0.46s" }}
      />
      {/* door gaps drawn by overlaying paper strokes — šele ko stene stojijo */}
      <g className="fade" style={{ animationDelay: "0.72s", animationDuration: "0.01s" }}>
        <line x1="300" y1="150" x2="300" y2="185" stroke="var(--paper)" strokeWidth="4" />
        <line x1="410" y1="300" x2="450" y2="300" stroke="var(--paper)" strokeWidth="4" />
      </g>

      {/* dimension line */}
      <g>
        <line
          className="ln draw"
          x1="60" y1="60" x2="560" y2="60"
          style={{ strokeDasharray: 500, strokeDashoffset: 500, animationDelay: "0.72s", animationDuration: "0.34s" }}
        />
        <g className="fade" style={{ animationDelay: "0.95s" }}>
          <line className="ln" x1="60" y1="54" x2="60" y2="66" />
          <line className="ln" x1="560" y1="54" x2="560" y2="66" />
          <text className="lbl" x="300" y="52" textAnchor="middle">{UI.planPlot}</text>
        </g>
      </g>

      {/* ---- distribution board (DB) ---- */}
      <g transform="translate(78,360)">
        <g className="pop" style={{ animationDelay: "0.86s" }}>
          <rect className="sym fillp" x="0" y="0" width="34" height="46" rx="2" />
          <line className="sym" x1="0" y1="12" x2="34" y2="12" />
          <line className="sym" x1="8" y1="20" x2="8" y2="40" />
          <line className="sym" x1="17" y1="20" x2="17" y2="40" />
          <line className="sym" x1="26" y1="20" x2="26" y2="40" />
          <text className="lbl" x="17" y="60" textAnchor="middle">{UI.planPanel}</text>
        </g>
      </g>

      {/* ---- feeders (animated current) ---- */}
      {CIRCUITS.map((c, i) => (
        <g
          key={i}
          className={`fg fade ${feedClass(i)}`}
          style={{ animationDelay: `${1 + i * 0.06}s` }}
        >
          <path className={c.spark ? "feed2" : "feed"} d={c.feeder} />
        </g>
      ))}

      {/* ---- ceiling light symbols (circle + cross) ---- */}
      <g transform="translate(250,150)" {...probe(0)}>
        <g className="pop" style={{ animationDelay: "1.06s" }}>
          <circle className={`halo ${active === 0 ? "on" : ""}`} r="21" stroke="var(--spark)" strokeWidth="1" strokeDasharray="3 4" />
          <circle className="sym fillp" r="12" />
          <line className="sym" x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" />
          <line className="sym" x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" />
          <circle className="node" cx="0" cy="0" r="3" />
        </g>
        <circle r="26" fill="transparent" />
      </g>
      <g transform="translate(150,430)" {...probe(1)}>
        <g className="pop" style={{ animationDelay: "1.12s" }}>
          <circle className={`halo ${active === 1 ? "on" : ""}`} r="21" stroke="var(--spark)" strokeWidth="1" strokeDasharray="3 4" />
          <circle className="sym fillp" r="12" />
          <line className="sym" x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" />
          <line className="sym" x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" />
          <circle className="node b" cx="0" cy="0" r="3" />
        </g>
        <circle r="26" fill="transparent" />
      </g>

      {/* ---- socket symbol (semicircle) ---- */}
      <g transform="translate(430,180)" {...probe(2)}>
        <g className="pop" style={{ animationDelay: "1.18s" }}>
          <circle className={`halo ${active === 2 ? "on" : ""}`} cy="-2" r="21" stroke="var(--spark)" strokeWidth="1" strokeDasharray="3 4" />
          <path className="sym fillp" d="M-14 0 A14 14 0 0 1 14 0 Z" />
          <line className="sym" x1="0" y1="0" x2="0" y2="12" />
          <circle className="node c" cx="0" cy="-3" r="3" />
        </g>
        <circle cy="-2" r="26" fill="transparent" />
      </g>

      {/* ---- motor symbol (M in circle) ---- */}
      <g transform="translate(446,360)" {...probe(3)}>
        <g className="pop" style={{ animationDelay: "1.24s" }}>
          <circle className={`halo ${active === 3 ? "on" : ""}`} r="25" stroke="var(--spark)" strokeWidth="1" strokeDasharray="3 4" />
          <circle className="sym fillp" r="16" />
          <text x="0" y="5" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontSize="15" fontWeight="700" fill="var(--blue-ink)">M</text>
        </g>
        <circle r="28" fill="transparent" />
      </g>

      {/* ---- switch symbol ---- */}
      <g transform="translate(300,220)">
        <g className="pop" style={{ animationDelay: "1.3s" }}>
          <circle className="sym fillp" r="5" />
          <line className="sym" x1="0" y1="0" x2="10" y2="-9" />
        </g>
      </g>

      {/* room labels */}
      <g className="fade" style={{ animationDelay: "1.3s" }}>
        {[
          { x: 180, y: 130 },
          { x: 430, y: 130 },
          { x: 120, y: 470 },
          { x: 440, y: 420 },
        ].map((pos, i) => (
          <text key={i} className="lbl" x={pos.x} y={pos.y} textAnchor="middle" opacity="0.8">
            {UI.planRooms[i]}
          </text>
        ))}
      </g>

      {/* ---- title block — pove, kateri tokokrog je izbran ---- */}
      <g className="fade" style={{ animationDelay: "1.36s" }}>
        <line x1="60" y1="500" x2="76" y2="500" stroke="var(--blue)" strokeWidth="1.4" />
        {circuit ? (
          <>
            <text className="lbl" x="84" y="504" style={{ fill: "var(--ink-2)" }}>
              {circuit.code} · {circuit.name}
            </text>
            <text className="lbl" x="84" y="520" opacity="0.75">
              {circuit.spec}
            </text>
          </>
        ) : (
          <text className="lbl" x="84" y="504">
            {UI.planHint}
          </text>
        )}
      </g>

      {/* registration corner marks */}
      <g className="fade" style={{ animationDelay: "0.2s" }}>
        {[
          [40, 40], [600, 40], [40, 520], [600, 520],
        ].map(([x, y], i) => (
          <g key={i} stroke="var(--blue-deep)" strokeWidth="1.2">
            <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
            <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
          </g>
        ))}
      </g>
    </svg>
  );
}
