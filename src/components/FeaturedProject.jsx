import { useCallback, useEffect, useState } from 'react'
import asset from '../lib/asset'

function Lightbox({ shot, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-accent/40 hover:text-accent"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      <img
        src={asset(shot.src)}
        alt={shot.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] w-auto max-w-full rounded-lg border border-white/10 object-contain shadow-2xl"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-4 flex max-w-3xl items-center gap-4 text-center"
      >
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous image"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-accent/40 hover:text-accent"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <p className="text-sm leading-6 text-slate-400">{shot.caption}</p>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next image"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-accent/40 hover:text-accent"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function FeaturedProject({ project }) {
  const [openIndex, setOpenIndex] = useState(null)

  const gallery = project?.gallery ?? []
  const close = useCallback(() => setOpenIndex(null), [])
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length)),
    [gallery.length]
  )
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % gallery.length)),
    [gallery.length]
  )

  if (!project) return null

  return (
    <article>
      <div className="reveal rounded-2xl border border-white/10 bg-ink-800/40 p-7 sm:p-10">
        <header className="border-b border-white/10 pb-7">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {project.org}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {project.role} · {project.period}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            {project.summary}
          </p>
        </header>

        <div className="grid gap-10 pt-8 lg:grid-cols-[1.55fr,1fr]">
          <div className="space-y-5 text-[15px] leading-7 text-slate-400">
            {project.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <aside className="space-y-7">
            {project.highlights?.length > 0 && (
              <div>
                <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                  What I owned
                </h4>
                <ul className="space-y-3">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-6 text-slate-400">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 flex-none rounded-full bg-accent/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                Built with
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {gallery.length > 0 && (
          <div className="mt-10 border-t border-white/10 pt-8">
            <h4 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
              Screens I built
            </h4>
            <div className="grid gap-5 sm:grid-cols-2">
              {gallery.map((shot, i) => (
                <figure key={shot.src} className="group">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    aria-label={`Enlarge: ${shot.caption}`}
                    className="block w-full overflow-hidden rounded-lg border border-white/10 bg-white/5 transition duration-300 hover:border-accent/40"
                  >
                    <img
                      src={asset(shot.src)}
                      alt={shot.alt}
                      loading="lazy"
                      className={`aspect-[16/10] w-full transition duration-500 group-hover:scale-[1.02] ${
                        shot.fit === 'contain'
                          ? 'object-contain p-4'
                          : 'object-cover object-top'
                      }`}
                    />
                  </button>
                  <figcaption className="mt-3 text-sm leading-6 text-slate-500">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            {project.galleryNote && (
              <p className="mt-5 text-xs text-slate-600">{project.galleryNote}</p>
            )}
          </div>
        )}
      </div>

      {openIndex !== null && (
        <Lightbox
          shot={gallery[openIndex]}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </article>
  )
}
