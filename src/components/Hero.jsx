import { profile, stats } from '../data/content'
import { ArrowIcon, DocumentIcon, GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon } from './Icons'
import asset from '../lib/asset'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60rem 32rem at 15% -10%, rgba(45,212,191,0.14), transparent 60%), radial-gradient(45rem 28rem at 90% 10%, rgba(56,189,248,0.10), transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(60% 55% at 50% 25%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(60% 55% at 50% 25%, black, transparent)',
        }}
      />

      <div className="mx-auto flex min-h-[86vh] max-w-content flex-col justify-center px-6 pb-20 pt-32 sm:px-8">
        <p className="animate-fade-up font-mono text-sm tracking-wide text-accent">
          Hi, my name is
        </p>

        <h1 className="animate-fade-up mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl" style={{ animationDelay: '80ms' }}>
          {profile.name}
        </h1>

        <p className="animate-fade-up mt-3 text-2xl font-semibold tracking-tight text-slate-400 sm:text-4xl" style={{ animationDelay: '160ms' }}>
          {profile.title}
        </p>

        <p className="animate-fade-up mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg" style={{ animationDelay: '240ms' }}>
          {profile.tagline}
        </p>

        <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-x-3 gap-y-4" style={{ animationDelay: '320ms' }}>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-accent-soft"
          >
            View my work
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={asset(profile.resume)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-accent/40 hover:text-accent"
          >
            <DocumentIcon className="h-4 w-4" />
            Download resume
          </a>

          <span aria-hidden="true" className="mx-2 hidden h-8 w-px bg-white/10 sm:block" />

          <div className="flex items-center gap-4 text-slate-500">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email Adam"
              className="transition hover:text-accent"
            >
              <MailIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="transition hover:text-accent"
            >
              <LinkedInIcon />
            </a>
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="transition hover:text-accent"
              >
                <GitHubIcon />
              </a>
            )}
          </div>
        </div>

        <p className="animate-fade-up mt-7 flex items-center gap-2 text-sm text-slate-500" style={{ animationDelay: '400ms' }}>
          <MapPinIcon className="h-4 w-4 text-slate-600" />
          {profile.location}
        </p>

        <dl className="animate-fade-up mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3" style={{ animationDelay: '480ms' }}>
          {stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-accent/30 pl-4">
              <dt className="text-2xl font-semibold text-white sm:text-3xl">{stat.value}</dt>
              <dd className="mt-1">
                <span className="block text-sm text-slate-400">{stat.label}</span>
                {stat.detail && (
                  <span className="mt-1 block text-xs leading-5 text-slate-600">
                    {stat.detail}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
