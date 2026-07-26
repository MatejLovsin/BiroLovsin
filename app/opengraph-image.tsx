import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CONTACT, HOME, SEO } from "@/lib/content";

/* Slika, ki se pokaže ob deljenju povezave (Facebook, WhatsApp, LinkedIn).
   Besedila so v lib/content.ts → SEO in HOME.hero. */

export const alt = SEO.shareTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f2eee7";
const INK = "#1b1a18";
const INK_3 = "#7b766f";
const BLUE = "#619cbc";
const BLUE_DEEP = "#3d789c";

export default async function Image() {
  const [display, sans, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/BricolageGrotesque-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/InstrumentSans-Medium.ttf")),
    readFile(join(process.cwd(), "public/logo-mark.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "72px 80px",
          fontFamily: "Instrument Sans",
        }}
      >
        {/* zgornja vrstica */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 3, background: BLUE }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: BLUE_DEEP,
            }}
          >
            {HOME.hero.eyebrow}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 22, letterSpacing: 5, color: INK_3 }}>
            {HOME.hero.location.toUpperCase()}
          </div>
        </div>

        {/* logotip + poved */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={470} height={79} alt="" />
          <div
            style={{
              display: "flex",
              fontFamily: "Bricolage Grotesque",
              fontSize: 46,
              lineHeight: 1.25,
              letterSpacing: -0.5,
              color: INK,
              maxWidth: 940,
            }}
          >
            {SEO.shareDescription}
          </div>
        </div>

        {/* spodnja vrstica */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid rgba(27, 26, 24, 0.12)`,
            paddingTop: 26,
            fontSize: 24,
            color: INK_3,
          }}
        >
          <div style={{ display: "flex" }}>{CONTACT.email}</div>
          <div style={{ display: "flex" }}>
            {CONTACT.street} · {CONTACT.city}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage Grotesque", data: display, style: "normal", weight: 600 },
        { name: "Instrument Sans", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}
