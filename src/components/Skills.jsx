import Section from './Section'
import { skills } from '../data/content'

export default function Skills() {
  return (
    <Section id="skills" eyebrow="02 / Skills" title="What I work with">
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.group} className="reveal card card-hover p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              {group.group}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
