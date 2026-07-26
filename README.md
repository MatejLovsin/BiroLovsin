# biroLovšin — spletna stran

Spletna stran za **Biro Lovšin d.o.o.** (elektro inženiring, projektiranje in
svetovanje, Vodice). Zgrajeno z Next.js 16 (App Router), pripravljeno za Vercel.

## Zagon (razvoj)

```bash
npm install
npm run dev       # http://localhost:3000
```

## Produkcijski build

```bash
npm run build
npm run start
```

## Struktura strani

| Pot           | Datoteka                 | Vsebina                                            |
| ------------- | ------------------------ | -------------------------------------------------- |
| `/`           | `app/page.tsx`           | Domača stran (hero, storitve, potek dela, reference)|
| `/reference`  | `app/reference/page.tsx` | Reference z filtrom po kategoriji                   |

## Kje kaj urejam

- **VSA BESEDILA** → `lib/content.ts`. Res vsa — velik naslov na vrhu strani,
  naslovi razdelkov, gumbi, napisi na shemi, SEO opis. Nobenega besedila ni
  treba iskati po drugih datotekah. Datoteka ima na vrhu kazalo:

  | Razdelek    | Kaj ureja                                              |
  | ----------- | ------------------------------------------------------ |
  | `CONTACT`   | podjetje, naslov, e-pošta, telefon (glava, noga, gumbi) |
  | `SEO`       | naslov zavihka, opis v Googlu, predogled ob deljenju    |
  | `NAV`       | meni v glavi in v nogi                                  |
  | `HOME`      | celotna domača stran — vključno z velikim naslovom      |
  | `REFERENCE` | stran `/reference`                                      |
  | `FOOTER`    | noga na vsaki strani                                    |
  | `UI`        | drobna besedila (filtri, napisi na shemi, oznake)       |
  | `SERVICES`  | kartice storitev                                        |
  | `PHASES`    | faze v razdelku Potek dela                              |
  | `PROJECTS`  | projekti/reference                                      |
  | `STATS`     | številke v temnem pasu                                  |

  Veliki naslov na vrhu je razdeljen na tri dele (`HOME.hero.titleLead`,
  `titleAccent`, `titleRest`), ker je sredinska beseda obarvana modro.
- **Barve, tipografija, slog** → `app/globals.css` (barve so na vrhu, izpeljane
  iz logotipa: steel blue `#619cbc`, graphite `#615e5e`).
- **Logotip** → `public/logo-mark.png` (glava) in `public/logo.png` (noga).
- **Favicon** → `app/icon.svg`.

## Dodajanje fotografij projektov

Placeholderji so trenutno shematski (blueprint). Ko imate prave fotografije:

1. Naložite datoteke v `public/projekti/` (npr. `public/projekti/vila.jpg`).
2. V `lib/content.ts` vsakemu projektu dodajte polje `src`, npr.:
   ```ts
   { title: "Enodružinska vila", src: "/projekti/vila.jpg", ... }
   ```

Enako velja za druge slike prek komponente `components/PhotoFrame.tsx`.

## Kontakt

Stran nima kontaktnega obrazca ne podstrani Kontakt. Vsi klici k akciji so
`mailto:` povezave na `CONTACT.email`, kontaktni podatki pa so v nogi na vsaki
strani. Vse to se bere iz `CONTACT` v `lib/content.ts` — spremeniš na enem mestu.

## TODO pred objavo

- [ ] Nadomesti telefonsko številko v `lib/content.ts` (`CONTACT.phone`).
- [ ] Preveri/uskladi statistike v `lib/content.ts` (`STATS` — trenutno okvirne).
- [ ] Dodaj prave fotografije projektov.
- [ ] Potrdi domeno (`metadataBase` v `app/layout.tsx` je `birolovsin.si`).

## Objava na Vercel

Najlažje prek Git: potisni repozitorij na GitHub in ga poveži z Vercel
(zazna Next.js samodejno). Ali z Vercel CLI:

```bash
npm i -g vercel
vercel          # predogled
vercel --prod   # produkcija
```
