import Section from './Section'
import FeaturedProject from './FeaturedProject'
import { featuredProjects, projects } from '../data/content'
import { ExternalIcon, GitHubIcon } from './Icons'
import asset from '../lib/asset'

function ProjectCard({ project }) {
  return (
    <article className="reveal card card-hover group flex flex-col overflow-hidden">
      {project.image ? (
        <img
          src={asset(project.image)}
          alt=""
          className="h-44 w-full object-cover opacity-90 transition group-hover:opacity-100"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-32 items-center justify-center border-b border-white/5"
          style={{
            background:
              'linear-gradient(135deg, rgba(45,212,191,0.10), rgba(56,189,248,0.06) 55%, transparent)',
          }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-600">
            {project.title}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-3 text-[15px] leading-7 text-slate-400">{project.blurb}</p>

        {project.impact && (
          <p className="mt-3 text-sm text-slate-500">
            <span className="font-medium text-slate-400">Impact: </span>
            {project.impact}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>

        {(project.live || project.repo) && (
          <div className="mt-6 flex items-center gap-5 border-t border-white/5 pt-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition hover:text-accent"
              >
                Live site <ExternalIcon />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition hover:text-accent"
              >
                <GitHubIcon className="h-4 w-4" /> Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <Section id="projects" eyebrow="04 / Projects" title="Selected work">
      <p className="reveal -mt-6 mb-10 max-w-2xl text-[15px] leading-7 text-slate-400">
        A closer look at the product work I&apos;ve shipped. Select any screen to view
        it full size.
      </p>

      <div className="space-y-8">
        {featuredProjects.map((project) => (
          <FeaturedProject key={project.title} project={project} />
        ))}
      </div>

      {(featured.length > 0 || rest.length > 0) && (
        <h3 className="reveal mb-6 mt-16 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          More projects
        </h3>
      )}

      {featured.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div
          className={`grid gap-6 md:grid-cols-2 ${featured.length > 0 ? 'mt-6' : ''} ${
            rest.length > 2 ? 'lg:grid-cols-3' : ''
          }`}
        >
          {rest.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      )}
    </Section>
  )
}
