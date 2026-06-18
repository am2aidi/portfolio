import React from 'react'

export default function ProjectCard({ project }) {
  // Parse tags string into list
  const tagsList = project.tags 
    ? project.tags.split(',').map(tag => tag.trim()) 
    : []

  return (
    <article className="glass-card">
      {project.image ? (
        <div className="card-img-wrapper">
          <img src={project.image} alt={project.title} className="card-image" />
        </div>
      ) : (
        <div style={{
          height: '140px',
          background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--glass-border)',
          color: 'var(--text-muted)',
          fontSize: '0.85rem'
        }}>
          💡 Showcase Image Placeholder
        </div>
      )}

      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
        
        <div className="card-footer">
          {tagsList.length > 0 && (
            <div className="card-tags">
              {tagsList.map((tag, idx) => (
                <span key={idx} className="card-tag">{tag}</span>
              ))}
            </div>
          )}
          
          {project.link && (
            <a 
              className="btn-link" 
              href={project.link} 
              target="_blank" 
              rel="noreferrer" 
              style={{ marginLeft: 'auto' }}
            >
              Open
              <svg viewBox="0 0 24 24"><path d="M5 3c-1.093 0-2 .907-2 2v14c0 1.093.907 2 2 2h14c1.093 0 2-.907 2-2v-7h-2v7H5V5h7V3H5zm9 0v2h3.586l-9.293 9.293 1.414 1.414L19 6.414V10h2V3h-7z"/></svg>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
