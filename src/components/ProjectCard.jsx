import React from 'react'

export default function ProjectCard({ project }) {
  return (
    <article className="card">
      {project.image && <div style={{height:140,overflow:'hidden',borderRadius:6,marginBottom:8}}><img src={project.image} alt={project.title} style={{width:'100%',objectFit:'cover'}}/></div>}
      <h3>{project.title}</h3>
      <p className="muted">{project.description}</p>
      {project.link && <a className="button" href={project.link} target="_blank" rel="noreferrer">View</a>}
    </article>
  )
}
