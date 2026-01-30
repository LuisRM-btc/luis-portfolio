import './App.css'

function App() {
  const projects = [
    {
      title: 'Sats Converter',
      description: 'Real-time PWA with Lightning Network integration.',
      tags: ['React', 'Vite', 'API'],
      liveHref: '#',
      codeHref: '#',
    },
    {
      title: 'Fee Watcher Arcade',
      description: 'Gamified mempool fee visualizer.',
      tags: ['HTML', 'JS', 'CSS'],
      liveHref: '#',
      codeHref: '#',
    },
  ]

  const skills = [
    'React.js',
    'JavaScript',
    'Node.js',
    'Lightning Network',
    'Git/GitHub',
  ]

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero">
        <h1 className="hero__headline">Luis Antonio Rodriguez</h1>
        <p className="hero__subtitle">Bitcoin Developer | Frontend Engineer</p>
        <a
          href="https://github.com/LuisRM-btc"
          target="_blank"
          rel="noopener noreferrer"
          className="hero__cta"
        >
          View GitHub
        </a>
      </header>

      <main className="container">
        {/* Projects Grid */}
        <section className="projects">
          <h2 className="section-title">Built Projects</h2>
          <div className="projects__grid">
            {projects.map((project) => (
              <article key={project.title} className="card">
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
                  <a href={project.liveHref} className="btn btn--primary">
                    Live Demo
                  </a>
                  <a href={project.codeHref} className="btn btn--secondary">
                    Code
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills">
          <h2 className="section-title">Skills</h2>
          <ul className="skills__list">
            {skills.map((skill) => (
              <li key={skill} className="skills__item">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Building in public on Nostr</p>
      </footer>
    </div>
  )
}

export default App
