export default function PageHero({
  eyebrow,
  title,
  intro,
  index,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  index: string;
}) {
  return (
    <section className="blueprint relative overflow-hidden border-b" style={{ borderColor: "var(--hair)" }}>
      <div className="wrap relative z-10 pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="tick">{index}</span>
          <span className="h-px w-10" style={{ background: "var(--blue)" }} />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h1 className="reveal font-display font-extrabold text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.98] max-w-4xl">
          {title}
        </h1>
        {intro && (
          <p
            className="reveal mt-7 max-w-2xl text-[1.12rem]"
            style={{ color: "var(--ink-2)", transitionDelay: "0.08s" }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
