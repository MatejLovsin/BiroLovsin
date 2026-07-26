"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONTACT, NAV, UI } from "@/lib/content";

/* Besedila (meni, oznake) so v lib/content.ts → NAV in UI */

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Ob prehodu na drugo stran zapri mobilni meni — brez učinka (useEffect),
     tako da se stanje uskladi že med izrisom. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--paper-raised) 88%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(10px) saturate(1.1)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--hair)" : "transparent"}`,
      }}
    >
      <div className="wrap flex items-center justify-between h-[74px]">
        <Link href="/" aria-label={UI.homeAriaLabel} className="relative z-50 shrink-0">
          <Image
            src="/logo-mark.svg"
            alt={UI.logoAlt}
            width={515}
            height={86}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-[0.94rem] font-medium"
                style={{ color: active ? "var(--blue-ink)" : "var(--ink-2)" }}
              >
                <span className="ulink">{item.label}</span>
                <span
                  className="absolute -left-3 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full transition-opacity"
                  style={{
                    background: "var(--blue)",
                    opacity: active ? 1 : 0,
                  }}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* ozki zasloni: samo ikona ovojnice — isto dejanje, manj prostora */}
          <a
            href={`mailto:${CONTACT.email}`}
            aria-label={`${UI.emailAriaLabel} — ${CONTACT.email}`}
            title={CONTACT.email}
            className="lg:hidden btn btn-primary btn-icon relative z-50 transition-opacity"
            style={{
              opacity: open ? 0 : 1,
              pointerEvents: open ? "none" : "auto",
            }}
            tabIndex={open ? -1 : undefined}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
              <path d="m3.2 6.4 8.8 6.4 8.8-6.4" />
            </svg>
          </a>

          {/* široki zasloni: celoten e-naslov */}
          <a
            href={`mailto:${CONTACT.email}`}
            className="hidden lg:inline-flex btn btn-primary py-3"
          >
            {CONTACT.email}
            <span className="arw">→</span>
          </a>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? UI.menuClose : UI.menuOpen}
            aria-expanded={open}
            className="md:hidden relative z-50 flex flex-col justify-center gap-[5px] w-10 h-10 -mr-2"
          >
            <span
              className="block h-[1.5px] w-6 mx-auto transition-all duration-300 origin-center"
              style={{
                background: "var(--ink)",
                transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-[1.5px] w-6 mx-auto transition-all duration-200"
              style={{ background: "var(--ink)", opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-[1.5px] w-6 mx-auto transition-all duration-300 origin-center"
              style={{
                background: "var(--ink)",
                transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className="md:hidden fixed inset-0 z-40 flex flex-col justify-center px-8 transition-all duration-500"
        style={{
          background: "var(--paper-raised)",
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          clipPath: open
            ? "inset(0 0 0 0)"
            : "inset(0 0 100% 0)",
        }}
      >
        <nav className="flex flex-col gap-1">
          {NAV.map((item, i) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-baseline gap-4 py-3 border-b"
                style={{
                  borderColor: "var(--hair)",
                  transform: open ? "none" : "translateY(16px)",
                  opacity: open ? 1 : 0,
                  transition: `all 0.5s var(--ease) ${0.06 * i + 0.1}s`,
                }}
              >
                <span className="tick">{item.idx}</span>
                <span
                  className="font-display text-4xl font-semibold"
                  style={{ color: active ? "var(--blue-ink)" : "var(--ink)" }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
        <a
          href={`mailto:${CONTACT.email}`}
          className="btn btn-primary self-start mt-10"
        >
          {CONTACT.email}
          <span className="arw">→</span>
        </a>
        <p className="tick mt-6">
          {CONTACT.street} · {CONTACT.city}
        </p>
      </div>
    </header>
  );
}
