import './App.css'
import Header from './components/Header'
import ProjectCard from './components/ProjectCard'
import { PROJECTS, SKILLS, PERSONAL_INFO } from './constants/data'

function App() {
  return (
    <div className="app">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero__headline">{PERSONAL_INFO.name}</h1>
        <p className="hero__subtitle">{PERSONAL_INFO.title}</p>
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hero__cta"
        >
          View GitHub
        </a>
      </section>

      <main className="container">
        {/* Projects Grid */}
        <section className="projects">
          <h2 className="section-title">Built Projects</h2>
          <div className="projects__grid">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills">
          <h2 className="section-title">Skills</h2>
          <ul className="skills__list">
            {SKILLS.map((skill) => (
              <li key={skill} className="skills__item">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>{PERSONAL_INFO.tagline}</p>
      </footer>
    </div>
  )
}

export default App
