import React, { useEffect, useState } from 'react'
import ProjectCard from './components/ProjectCard'
import AdminPanel from './components/AdminPanel'

const STORAGE_KEY = 'portfolio-data'

const defaultData = {
  profile: { name: 'Your Name', title: 'Frontend developer • React • JavaScript', email: 'you@example.com' },
  projects: [],
  certificates: [],
  events: [],
  social: { linkedin: '', instagram: '', x: '', other: '' },
  works: []
}

export default function App() {
  const [data, setData] = useState(defaultData)
  const [showAdmin, setShowAdmin] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        setData(JSON.parse(raw))
      } catch (e) {
        console.warn('Failed to parse local portfolio data', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  function handleUpdate(partial) {
    setData(prev => ({ ...prev, ...partial }))
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-inner">
          <div>
            <h1>{data.profile.name}</h1>
            <p className="muted">{data.profile.title}</p>
          </div>

          <div className="hero-actions">
            <button className="ghost" onClick={() => setShowAdmin(s => !s)}>{showAdmin ? 'Close Editor' : 'Open Editor'}</button>
            <a className="ghost" href={`mailto:${data.profile.email}`}>Contact</a>
          </div>
        </div>
      </header>

      {showAdmin && <AdminPanel data={data} onChange={handleUpdate} />}

      <main className="content">
        <section>
          <h2>Connect</h2>
          <p className="muted">Follow me:</p>
          <div className="social">
            {data.social.linkedin && <a href={data.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {data.social.instagram && <a href={data.social.instagram} target="_blank" rel="noreferrer">Instagram</a>}
            {data.social.x && <a href={data.social.x} target="_blank" rel="noreferrer">X</a>}
            {data.social.other && <a href={data.social.other} target="_blank" rel="noreferrer">More</a>}
          </div>
        </section>

        <section>
          <h2>Works</h2>
          <div className="projects">
            {data.works.length === 0 && <p className="muted">No works yet — add them in the editor.</p>}
            {data.works.map((w, i) => (
              <div className="card" key={i}>
                {w.image && <div style={{height:120,overflow:'hidden',borderRadius:6,marginBottom:8}}><img src={w.image} alt={w.title} style={{width:'100%',objectFit:'cover'}}/></div>}
                <h3>{w.title}</h3>
                {w.link && <p><a className="button" href={w.link} target="_blank" rel="noreferrer">Open</a></p>}
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2>Projects</h2>
          <div className="projects">
            {data.projects.length === 0 && <p className="muted">No projects yet — open the editor to add one.</p>}
            {data.projects.map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
          </div>
        </section>

        <section>
          <h2>Certificates</h2>
          <div className="projects">
            {data.certificates.length === 0 && <p className="muted">No certificates yet.</p>}
            {data.certificates.map((c, i) => (
              <div className="card" key={i}>
                <h3>{c.title}</h3>
                <p className="muted">{c.issuer}</p>
                {c.image && <img src={c.image} alt={c.title} style={{maxWidth:'100%',borderRadius:6,marginTop:8}} />}
                {c.link && <p><a className="button" href={c.link} target="_blank">View</a></p>}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Events</h2>
          <div className="projects">
            {data.events.length === 0 && <p className="muted">No events yet.</p>}
            {data.events.map((e, i) => (
              <div className="card" key={i}>
                <h3>{e.title} <span className="muted" style={{fontSize:'0.9rem'}}>- {e.date}</span></h3>
                <p className="muted">{e.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">© {new Date().getFullYear()} {data.profile.name}</footer>
    </div>
  )
}
