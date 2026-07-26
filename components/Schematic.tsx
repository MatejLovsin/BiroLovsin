/**
 * Schematic — an animated electrical floor-plan / single-line drawing.
 * Serves as the hero visual: a stylised building plan with a distribution
 * board feeding lights, sockets and a motor, with animated "current" runs.
 * Pure SVG + CSS, no external assets.
 * Napisi na shemi so v lib/content.ts → UI.planRooms / planPlot / planPanel.
 */
import { UI } from "@/lib/content";

export default function Schematic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 560"
      className={className}
      role="img"
      aria-label="Shematski tloris električnih inštalacij"
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
        `}</style>
      </defs>

      {/* faint construction grid */}
      <g opacity="0.5">
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`v${i}`} className="thin" x1={40 + i * 40} y1="40" x2={40 + i * 40} y2="520" />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`h${i}`} className="thin" x1="40" y1={40 + i * 40} x2="600" y2={40 + i * 40} />
        ))}
      </g>

      {/* building shell */}
      <rect className="wall" x="60" y="80" width="500" height="400" rx="2" />
      {/* interior walls */}
      <line className="wall" x1="300" y1="80" x2="300" y2="300" />
      <line className="wall" x1="300" y1="300" x2="560" y2="300" />
      <line className="wall" x1="180" y1="300" x2="180" y2="480" />
      {/* door gaps drawn by overlaying paper strokes */}
      <line x1="300" y1="150" x2="300" y2="185" stroke="var(--paper)" strokeWidth="4" />
      <line x1="410" y1="300" x2="450" y2="300" stroke="var(--paper)" strokeWidth="4" />

      {/* dimension line */}
      <g>
        <line className="ln" x1="60" y1="60" x2="560" y2="60" />
        <line className="ln" x1="60" y1="54" x2="60" y2="66" />
        <line className="ln" x1="560" y1="54" x2="560" y2="66" />
        <text className="lbl" x="300" y="52" textAnchor="middle">{UI.planPlot}</text>
      </g>

      {/* ---- distribution board (DB) ---- */}
      <g transform="translate(78,360)">
        <rect className="sym fillp" x="0" y="0" width="34" height="46" rx="2" />
        <line className="sym" x1="0" y1="12" x2="34" y2="12" />
        <line className="sym" x1="8" y1="20" x2="8" y2="40" />
        <line className="sym" x1="17" y1="20" x2="17" y2="40" />
        <line className="sym" x1="26" y1="20" x2="26" y2="40" />
        <text className="lbl" x="17" y="60" textAnchor="middle">{UI.planPanel}</text>
      </g>

      {/* ---- feeders (animated current) ---- */}
      {/* DB -> living room lights */}
      <path className="feed" d="M112 372 H150 V150 H250" />
      {/* DB -> bedroom */}
      <path className="feed" d="M112 383 H140 V430 H150" />
      {/* DB -> kitchen sockets */}
      <path className="feed2" d="M112 395 H340 V180 H430" />
      {/* DB -> utility motor */}
      <path className="feed" d="M112 406 H360 V360 H430" />

      {/* ---- ceiling light symbol (circle + cross) ---- */}
      <g transform="translate(250,150)">
        <circle className="sym fillp" r="12" />
        <line className="sym" x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" />
        <line className="sym" x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" />
        <circle className="node" cx="0" cy="0" r="3" />
      </g>
      <g transform="translate(150,430)">
        <circle className="sym fillp" r="12" />
        <line className="sym" x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" />
        <line className="sym" x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" />
        <circle className="node b" cx="0" cy="0" r="3" />
      </g>

      {/* ---- socket symbol (semicircle) ---- */}
      <g transform="translate(430,180)">
        <path className="sym fillp" d="M-14 0 A14 14 0 0 1 14 0 Z" />
        <line className="sym" x1="0" y1="0" x2="0" y2="12" />
        <circle className="node c" cx="0" cy="-3" r="3" />
      </g>

      {/* ---- motor symbol (M in circle) ---- */}
      <g transform="translate(446,360)">
        <circle className="sym fillp" r="16" />
        <text x="0" y="5" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontSize="15" fontWeight="700" fill="var(--blue-ink)">M</text>
      </g>

      {/* ---- switch symbol ---- */}
      <g transform="translate(300,220)">
        <circle className="sym fillp" r="5" />
        <line className="sym" x1="0" y1="0" x2="10" y2="-9" />
      </g>

      {/* room labels */}
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

      {/* registration corner marks */}
      {[
        [40, 40], [600, 40], [40, 520], [600, 520],
      ].map(([x, y], i) => (
        <g key={i} stroke="var(--blue-deep)" strokeWidth="1.2">
          <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
          <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
        </g>
      ))}
    </svg>
  );
}
