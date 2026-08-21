import Section from './Section'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="03 / Experience" title="Where I've worked">
      <ol className="relative space-y-10 border-l border-white/10 pl-8 sm:pl-10">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="reveal relative">
            <span
              aria-hidden="true"
              className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-ink-950 sm:-left-[49px]"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold text-white">
                {job.role}{' '}
                <span className="text-accent">· {job.company}</span>
              </h3>
              <p className="font-mono text-xs tracking-wide text-slate-500">{job.period}</p>
            </div>

            <ul className="mt-4 space-y-2.5">
              {job.highlights.map((point, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-7 text-slate-400">
                  <span aria-hidden="true" className="mt-[11px] h-1 w-1 flex-none rounded-full bg-accent/70" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
