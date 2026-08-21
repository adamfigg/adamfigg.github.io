export default function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`border-t border-white/5 ${className}`}>
      <div className="section-shell">
        <header className="reveal mb-12">
          {eyebrow && (
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  )
}
