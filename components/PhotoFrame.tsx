import Image from "next/image";
import { UI } from "@/lib/content";

type Props = {
  /** Drop a file in /public and pass its path (e.g. "/projekti/vila.jpg"). */
  src?: string;
  alt: string;
  label?: string;
  ratio?: string; // e.g. "4 / 3"
  className?: string;
  index?: string;
};

/**
 * PhotoFrame — a technical-drawing style image frame.
 * Shows a real photo when `src` is provided, otherwise a branded
 * blueprint placeholder so layouts read correctly before photos arrive.
 */
export default function PhotoFrame({
  src,
  alt,
  label,
  ratio = "4 / 3",
  className = "",
  index,
}: Props) {
  return (
    <figure
      className={`relative overflow-hidden rounded-[3px] ${className}`}
      style={{
        aspectRatio: ratio,
        background:
          "linear-gradient(135deg, var(--paper-deep), var(--paper-raised))",
        border: "1px solid var(--hair)",
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <>
          {/* blueprint fill */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* diagonal */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="var(--line-strong)" strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="var(--line-strong)" strokeWidth="1" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--blue-deep)" strokeWidth="1.4">
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <circle cx="8.5" cy="10" r="1.6" />
              <path d="M4 17l5-4 4 3 3-2.5 4 3.5" />
            </svg>
            <span className="tick" style={{ color: "var(--blue-deep)" }}>
              {label ?? UI.photoPlaceholder}
            </span>
          </div>
        </>
      )}

      {index && (
        <span
          className="absolute left-3 top-3 tick px-2 py-1 rounded-[2px]"
          style={{ background: "color-mix(in srgb, var(--paper-raised) 80%, transparent)", color: "var(--ink-2)" }}
        >
          {index}
        </span>
      )}
    </figure>
  );
}
