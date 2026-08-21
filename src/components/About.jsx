import Section from './Section'
import { education, profile } from '../data/content'

export default function About() {
  return (
    <Section id="about" eyebrow="01 / About" title="A bit about me">
      <div className="grid gap-12 lg:grid-cols-[1.6fr,1fr]">
        <div className="reveal space-y-5 text-[15px] leading-7 text-slate-400 sm:text-base">
          {profile.summary.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <aside className="reveal space-y-8">
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
              Education
            </h3>
            <ul className="space-y-4">
              {education.map((item) => (
                <li key={item.credential} className="border-l border-white/10 pl-4">
                  <p className="font-medium text-slate-200">{item.credential}</p>
                  <p className="text-sm text-slate-500">
                    {item.institution} · {item.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
              Focus areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Front-End Architecture', 'Product Ownership', 'Technical Leadership', 'FinTech', 'Healthcare', 'Agile'].map(
                (item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </aside>
      </div>
    </Section>
  )
}
