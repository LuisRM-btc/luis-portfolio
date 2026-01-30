export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <h3 className="card__title">{project.title}</h3>
      <p className="card__description">{project.description}</p>
      <div className="card__tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="card__actions">
        <a
          href={project.liveHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          Live Demo
        </a>
        <a
          href={project.codeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--secondary"
        >
          Code
        </a>
      </div>
    </article>
  )
}
