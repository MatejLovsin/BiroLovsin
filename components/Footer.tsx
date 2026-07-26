import Link from "next/link";
import Image from "next/image";
import { CONTACT, NAV, FOOTER, UI } from "@/lib/content";

/* Besedila so v lib/content.ts → FOOTER, NAV in CONTACT */

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t" style={{ borderColor: "var(--hair)", background: "var(--paper-deep)" }}>
      <div className="wrap py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            <Image
              src="/logo.svg"
              alt={`${UI.logoAlt} — ${CONTACT.tagline}`}
              width={579}
              height={179}
              className="h-auto w-[230px] mb-6"
            />
            <p className="max-w-xs text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
              {FOOTER.blurb}
            </p>
          </div>

          {/* nav */}
          <div>
            <p className="eyebrow mb-5">{FOOTER.navHeading}</p>
            <ul className="flex flex-col gap-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="ulink">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <p className="eyebrow mb-5">{FOOTER.contactHeading}</p>
            <address className="not-italic flex flex-col gap-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
              <span>{CONTACT.company}</span>
              <span>{CONTACT.street}<br />{CONTACT.city}</span>
              <a href={`mailto:${CONTACT.email}`} className="ulink">{CONTACT.email}</a>
              <a href={`tel:${CONTACT.phone.replace(/\s|\(|\)/g, "")}`} className="ulink">
                {CONTACT.phone}
              </a>
            </address>
          </div>
        </div>

        <div
          className="mt-14 pt-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between tick"
          style={{ borderTop: "1px solid var(--hair)" }}
        >
          <span>© {year} {CONTACT.company} — {FOOTER.rights}</span>
          <span>{FOOTER.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
