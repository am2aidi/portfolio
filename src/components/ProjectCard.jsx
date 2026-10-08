import React, { useState } from 'react'

export default function ProjectCard({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Parse tags string into list
  const tagsList = project.tags 
    ? project.tags.split(',').map(tag => tag.trim()) 
    : []
  const isGitHub = project.link && project.link.toLowerCase().includes('github.com');
  const projectInitials = project.title 
    ? project.title.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase() 
    : 'PROJ';

  return (
    <article className="glass-card">
      {project.image ? (
        <div className="card-img-wrapper no-print">
          <img src={project.image} alt={project.title} className="card-image" />
        </div>
      ) : (
        <div className="no-print" style={{
          height: '160px',
          background: isGitHub 
            ? 'linear-gradient(135deg, #09090b, #18181b)' 
            : 'linear-gradient(135deg, #080d1a, #111e3d)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--glass-border)',
          position: 'relative',
          overflow: 'hidden',
          padding: '1rem',
          textAlign: 'center'
        }}>
          {/* Subtle glow background */}
          <div style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: isGitHub ? '#ffffff' : 'var(--accent-primary)',
            filter: 'blur(35px)',
            opacity: 0.12,
            zIndex: 0
          }}></div>

          {isGitHub ? (
            <>
              {/* GitHub SVG Icon */}
              <svg 
                style={{ height: '36px', width: '36px', fill: '#ffffff', marginBottom: '0.5rem', zIndex: 1 }} 
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.285c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span style={{
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '1px',
                zIndex: 1,
                textTransform: 'uppercase'
              }}>
                GitHub Repository
              </span>
            </>
          ) : (
            <>
              {/* Initials badge fallback */}
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border-hover)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-secondary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 800,
                marginBottom: '0.5rem',
                zIndex: 1,
                boxShadow: 'var(--accent-glow) 0px 0px 10px'
              }}>
                {projectInitials}
              </div>
              <span style={{
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '1.5px',
                zIndex: 1,
                textTransform: 'uppercase'
              }}>
                {project.title}
              </span>
            </>
          )}
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
          
          <div className="no-print" style={{ display: 'flex', gap: '0.75rem', marginLeft: 'auto', alignItems: 'center' }}>
            <button 
              className="btn-link" 
              onClick={() => setIsModalOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Read More
            </button>
            {project.link && (
              <a 
                className="btn-link" 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
              >
                Open
                <svg viewBox="0 0 24 24"><path d="M5 3c-1.093 0-2 .907-2 2v14c0 1.093.907 2 2 2h14c1.093 0 2-.907 2-2v-7h-2v7H5V5h7V3H5zm9 0v2h3.586l-9.293 9.293 1.414 1.414L19 6.414V10h2V3h-7z"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Read More Detail Modal */}
      {isModalOpen && (
        <div className="modal-overlay no-print" style={{ zIndex: 110 }}>
          <div className="modal-content" style={{ maxWidth: '600px', textAlign: 'left', padding: '2rem', gap: '1.25rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-primary)', fontWeight: 800, margin: 0 }}>
              {project.title}
            </h3>
            
            {project.image && (
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', margin: '0.5rem 0', maxHeight: '250px' }}>
                <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            
            <div>
              <h4 style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem', fontWeight: 700 }}>
                Project Overview
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.6', margin: 0 }}>
                {project.description}
              </p>
            </div>

            {tagsList.length > 0 && (
              <div>
                <h4 style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem', fontWeight: 700 }}>
                  Tech Stack & Tags
                </h4>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {tagsList.map((tag, idx) => (
                    <span key={idx} className="card-tag" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>
                Close
              </button>
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  Visit App 🚀
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
