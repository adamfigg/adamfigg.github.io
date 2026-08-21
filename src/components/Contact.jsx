import { profile } from '../data/content'
import { ArrowIcon, DocumentIcon, GitHubIcon, LinkedInIcon } from './Icons'
import asset from '../lib/asset'

export default function Contact() {
  return (
    <section id="contact" className="border-t border-white/5">
      <div className="section-shell text-center">
        <p className="reveal mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          05 / Contact
        </p>
        <h2 className="reveal text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Let&apos;s build something
        </h2>
        <p className="reveal mx-auto mt-5 max-w-xl text-[15px] leading-7 text-slate-400 sm:text-base">
          I&apos;m open to senior full-stack and front-end roles. If you think I&apos;d be a
          good fit for your team, or you just want to talk shop, my inbox is always
          open.
        </p>

        <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-accent-soft"
          >
            {profile.email}
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-accent/40 hover:text-accent"
          >
            <LinkedInIcon className="h-4 w-4" /> LinkedIn
          </a>
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-accent/40 hover:text-accent"
            >
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
          )}
          <a
            href={asset(profile.resume)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-accent/40 hover:text-accent"
          >
            <DocumentIcon className="h-4 w-4" /> Resume
          </a>
        </div>
      </div>
    </section>
  )
}
