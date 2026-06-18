import React, { useEffect, useState } from 'react'
import ProjectCard from './components/ProjectCard'
import AdminPanel from './components/AdminPanel'

const STORAGE_KEY = 'portfolio-data'

const defaultData = {
  profile: {
    name: 'Kwizera Zaidi',
    title: 'Full Stack Developer',
    headline: 'Information Systems Graduate & AI Integration Specialist',
    bio: 'I am Kwizera Zaidi, a motivated and hardworking Full Stack Developer currently pursuing my degree in Information Systems at the University of Rwanda (expected graduation 2027). I possess a strong foundation in Computer Science, Mathematics, and Economics, and specialize in web database applications using Python, Flask, React, and MySQL. I actively integrate AI technologies to write cleaner, faster code, and I have trained prompt models to optimize my engineering workflows. I am also dedicated to education, having mentored university peers and tutored primary/secondary students.',
    email: 'zaidikwizera@gmail.com',
    phone: '0785283267',
    address: 'Kigali, Rwanda',
    dob: 'October 2, 2002',
    pob: 'Rukomo',
    gender: 'Male',
    nationality: 'Rwandan',
    maritalStatus: 'Single',
    location: 'Kigali, Rwanda',
    availability: 'Open to Work',
    education: 'University of Rwanda (Information Systems, Class of 2027)',
    experienceNotes: 'AI-assisted full-stack development, Python/Flask API design, and tutoring programming fundamentals.',
    image: '/profile.jpeg',
    cv: '',
    experienceYears: '2+'
  },
  skills: [
    { name: 'Computer Science & Software Development', level: '88' },
    { name: 'React.js & Frontend Architectures', level: '85' },
    { name: 'Python & Flask Framework', level: '85' },
    { name: 'NumPy & Pandas (Data Analysis)', level: '80' },
    { name: 'Python Simulation & Math Modeling', level: '82' },
    { name: 'Machine Learning Modeling', level: '75' },
    { name: 'MySQL & Database Design', level: '82' },
    { name: 'Java Programming', level: '78' },
    { name: 'AI Workflows & Prompt Fine-Tuning', level: '85' },
    { name: 'Programming Fundamentals', level: '90' },
    { name: 'HTML5 & CSS3 (Vanilla / Modern)', level: '92' },
    { name: 'Git & Version Control', level: '85' }
  ],
  projects: [
    {
      title: 'Hura App',
      description: 'A platform designed for quick localized services and ride tracking. It integrates React frontend components with real-time feedback elements.',
      link: 'https://huraapp.vercel.app/',
      image: '',
      tags: 'React, Vite, CSS, APIs'
    },
    {
      title: 'Streamfy Media Aggregator',
      description: 'A modern media streaming platform showing playlist tracks and smooth playback features, custom aggregate filters, and slick audio/video views.',
      link: 'https://streamfyappmsm.vercel.app/',
      image: '',
      tags: 'React, Media Player, CSS Grid'
    },
    {
      title: 'Simulation Queue Sample',
      description: 'An interactive queue and system modeling sample web app designed to simulate server loads, network data routing, and performance metrics.',
      link: 'https://simulation-sample.vercel.app/',
      image: '',
      tags: 'JavaScript, Simulation, Web Canvas'
    },
    {
      title: 'AmaliTech Idempotency Gateway',
      description: 'A gateway utility demonstration protecting critical endpoints from duplicate API requests, facilitating safe retries for payment or transactional actions.',
      link: 'https://amalitech-idempotency-gateway.vercel.app/',
      image: '',
      tags: 'Vercel, API Gateway, Node.js, Security'
    }
  ],
  works: [
    {
      title: 'AI Workflow Integration Specialist',
      link: 'https://github.com/am2aidi/portfolio',
      image: '',
      description: 'Built productivity workflows incorporating AI models. Actively experimented with prompt fine-tuning to accelerate coding, generate tests, and optimize database queries.',
      tags: 'AI, LLMs, Automation'
    },
    {
      title: 'Programming Instructor & Mentor',
      link: 'https://github.com/am2aidi/portfolio',
      image: '',
      description: 'Taught coding basics (HTML/CSS, Python, logic flows) to peers and junior students in the Department of ICT, Faculty of Information Systems.',
      tags: 'University of Rwanda, Mentorship'
    },
    {
      title: 'Primary & Secondary School Tutor',
      link: '#',
      image: '',
      description: 'Tutored primary and secondary school pupils in mathematics, foundational science, and basic computer literacy to strengthen academic performance.',
      tags: 'Education, Tutoring'
    },
    {
      title: 'Waiter at Nakka',
      link: '#',
      image: '',
      description: 'Acquired professional communications skills, teamwork capabilities, customer service, and structured problem solving in a fast-paced team environment.',
      tags: 'Oct 2022 – May 2023, Customer Service'
    }
  ],
  educationList: [
    {
      level: 'University of Rwanda',
      institution: 'Department of ICT, Faculty of Information Systems',
      date: 'Jun 2023 – 2027 (Expected Graduation)',
      details: 'Currently studying Information Systems. Gaining advanced training in web databases, quantitative math, systems analysis, and coding frameworks.'
    },
    {
      level: 'A2 (Advanced Level)',
      institution: 'G.S. APAPEC MURAMBI',
      date: 'Jan 2019 – Aug 2022',
      details: 'Program: MCE (Mathematics, Economics, and Computer Science). Acquired strong foundations in programming fundamentals, quantitative systems, and basic software development.'
    },
    {
      level: 'O Level (Ordinary Level)',
      institution: 'GS KABUGA CATHOLIC',
      date: 'Jan 2016 – Nov 2018',
      details: 'Studied general sciences, fundamentals of math, and introductory computing concepts.'
    }
  ],
  hobbies: ['traveling', 'reading', 'blogging', 'movies and music', 'reading quran', 'sports'],
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'Kinyarwanda', level: 'Native' },
    { name: 'Luganda', level: 'Conversational' }
  ],
  social: {
    github: 'https://github.com/am2aidi/portfolio',
    linkedin: 'https://linkedin.com/in/kwizera-zaidi',
    instagram: 'https://instagram.com/am2aidi',
    x: 'https://x.com/am2aidi',
    whatsapp: 'https://wa.me/250785283267',
    hura: 'https://huraapp.vercel.app/'
  }
}

export default function App() {
  const [data, setData] = useState(defaultData)
  const [showAdmin, setShowAdmin] = useState(false)
  const [showPasscodeModal, setShowPasscodeModal] = useState(false)
  const [passcodeInput, setPasscodeInput] = useState('')
  const [passcodeError, setPasscodeError] = useState('')
  const [theme, setTheme] = useState('dark')
  const [activeTab, setActiveTab] = useState('all')
  const [showAllSkills, setShowAllSkills] = useState(false)

  // Load from LocalStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setData({
          ...defaultData,
          ...parsed,
          profile: { ...defaultData.profile, ...(parsed.profile || {}) },
          social: { ...defaultData.social, ...(parsed.social || {}) }
        })
      } catch (e) {
        console.warn('Failed to parse local portfolio data', e)
      }
    }
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function handleUpdate(partial) {
    setData(prev => ({ ...prev, ...partial }))
  }

  function handleAdminAccessClick() {
    if (showAdmin) {
      setShowAdmin(false)
    } else {
      setShowPasscodeModal(true)
      setPasscodeInput('')
      setPasscodeError('')
    }
  }

  function verifyPasscode(e) {
    e.preventDefault()
    const cleaned = passcodeInput.trim().toLowerCase()
    if (cleaned === 'zaidi' || cleaned === 'admin') {
      setShowPasscodeModal(false)
      setShowAdmin(true)
    } else {
      setPasscodeError('Invalid passcode. Try "zaidi" or "admin"')
    }
  }

  const filteredItems = (() => {
    const projList = (data.projects || []).map(p => ({ ...p, type: 'project' }))
    const workList = (data.works || []).map(w => ({ ...w, type: 'work' }))
    
    if (activeTab === 'projects') return projList
    if (activeTab === 'works') return workList
    return [...projList, ...workList]
  })()

  // Sliced skills list
  const visibleSkills = showAllSkills ? (data.skills || []) : (data.skills || []).slice(0, 6)

  return (
    <div className="app">
      {/* Navigation Header */}
      <nav className="navbar no-print">
        <div className="navbar-inner container">
          <a href="#" className="logo">
            {data.profile.name.split(' ')[0]}.
          </a>
          <div className="nav-links">
            <a href="#about" className="nav-item">About</a>
            <a href="#skills" className="nav-item">Skills</a>
            <a href="#projects" className="nav-item">Portfolio</a>
            <a href="#contact" className="nav-item">Contact</a>
          </div>
          <div className="nav-actions">
            {/* Theme Toggle Switch */}
            <label className="theme-switch" title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
              <input 
                type="checkbox" 
                checked={theme === 'light'} 
                onChange={() => setTheme(t => t === 'light' ? 'dark' : 'light')} 
              />
              <span className="slider">
                <span className="slider-icon">🌙</span>
                <span className="slider-icon">☀️</span>
              </span>
            </label>

            {/* Hire Me Header CTA */}
            <a href="#contact" className="btn btn-primary no-print" style={{ padding: '0.4rem 1.1rem', fontSize: '0.85rem' }}>
              Hire Me 💼
            </a>

            {/* Admin button */}
            <button className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleAdminAccessClick}>
              {showAdmin ? 'Close Editor' : 'Admin'}
            </button>
          </div>
        </div>
      </nav>

      {/* Admin Panel Render */}
      {showAdmin && (
        <div className="admin-section-container container no-print">
          <AdminPanel data={data} onChange={handleUpdate} onClose={() => setShowAdmin(false)} />
        </div>
      )}

      {/* Hero Section */}
      <header className="hero" id="home">
        <div className="hero-inner container">
          <div className="hero-content">
            <span className="badge no-print">{data.profile.headline}</span>
            <h1 className="hero-title">
              Hi, I'm <span>{data.profile.name}</span>
            </h1>
            <p className="hero-subtitle">{data.profile.title}</p>
            <p className="hero-bio">{data.profile.bio}</p>
            
            <div className="hero-buttons no-print">
              <a href="#contact" className="btn btn-primary">Hire Me 💼</a>
              <a href="#projects" className="btn btn-secondary">View My Work</a>
              {data.profile.cv ? (
                <a href={data.profile.cv} download={`${data.profile.name.replace(' ', '_')}_CV.pdf`} className="btn btn-secondary">
                  Download CV 📥
                </a>
              ) : (
                <button className="btn btn-secondary" onClick={() => window.print()}>
                  Print Resume 📄
                </button>
              )}
            </div>

            {/* Social Icons */}
            <div className="social-links no-print">
              {data.social.github && (
                <a className="social-icon" href={data.social.github} target="_blank" rel="noreferrer" title="GitHub">
                  <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
              )}
              {data.social.linkedin && (
                <a className="social-icon" href={data.social.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
                  <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              )}
              {data.social.x && (
                <a className="social-icon" href={data.social.x} target="_blank" rel="noreferrer" title="X / Twitter">
                  <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              )}
              {data.social.instagram && (
                <a className="social-icon" href={data.social.instagram} target="_blank" rel="noreferrer" title="Instagram">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {data.social.whatsapp && (
                <a className="social-icon" href={data.social.whatsapp} target="_blank" rel="noreferrer" title="WhatsApp">
                  <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>💬</span>
                </a>
              )}
              {data.social.hura && (
                <a className="social-icon" href={data.social.hura} target="_blank" rel="noreferrer" title="Hura Profile">
                  <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>⚡</span>
                </a>
              )}
            </div>
          </div>

          {/* Hero Visual Avatar */}
          <div className="hero-visual">
            <div className="avatar-wrapper">
              <div className="avatar-bg-glow no-print"></div>
              <div className="avatar-frame">
                {data.profile.image ? (
                  <img src={data.profile.image} alt={data.profile.name} className="avatar-image" />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #1e1b4b, #311042)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '16px',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '3rem',
                    fontWeight: 800
                  }}>
                    {data.profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              <div className="experience-badge no-print">
                <div className="experience-number">{data.profile.experienceYears}</div>
                <div className="experience-text">Years Exp.</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="content">
        
        {/* About Section */}
        <section className="section" id="about">
          <div className="about-grid container">
            <div className="about-text-block">
              <div className="section-header" style={{ marginBottom: '2rem' }}>
                <span className="section-tag no-print">Biography</span>
                <h2 className="section-title">About Me</h2>
              </div>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {data.profile.bio}
              </p>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginTop: '1.5rem', color: 'var(--accent-secondary)' }}>
                Hobbies & Interests
              </h3>
              <div className="badge-container">
                {data.hobbies && data.hobbies.map((hobby, i) => (
                  <span key={i} className="hobby-badge">
                    ✨ {hobby}
                  </span>
                ))}
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginTop: '1.5rem', color: 'var(--accent-primary)' }}>
                Languages Spoken
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
                {data.languages && data.languages.map((lang, i) => (
                  <div key={i} className="language-item">
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-level">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-details">
              <div className="info-card">
                <span className="info-label">Full Name</span>
                <span className="info-value">{data.profile.name}</span>
              </div>
              <div className="info-card">
                <span className="info-label">Email</span>
                <span className="info-value" style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>{data.profile.email}</span>
              </div>
              <div className="info-card">
                <span className="info-label">Phone</span>
                <span className="info-value">{data.profile.phone}</span>
              </div>
              <div className="info-card">
                <span className="info-label">Gender / Status</span>
                <span className="info-value" style={{ fontSize: '0.95rem' }}>{data.profile.gender} • {data.profile.maritalStatus}</span>
              </div>
              <div className="info-card">
                <span className="info-label">Date of Birth</span>
                <span className="info-value" style={{ fontSize: '0.95rem' }}>{data.profile.dob}</span>
              </div>
              <div className="info-card">
                <span className="info-label">Birth Place / Nation</span>
                <span className="info-value" style={{ fontSize: '0.95rem' }}>{data.profile.pob} • {data.profile.nationality}</span>
              </div>
              <div className="info-card" style={{ gridColumn: 'span 2' }}>
                <span className="info-label">Primary Education Focus</span>
                <span className="info-value" style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  {data.profile.education}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Education History Section */}
        {data.educationList && data.educationList.length > 0 && (
          <section className="section" id="education">
            <div className="container">
              <div className="section-header">
                <span className="section-tag no-print">Academic background</span>
                <h2 className="section-title">Education History</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {data.educationList.map((edu, i) => (
                  <div key={i} className="glass-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <h3 className="card-title" style={{ margin: 0 }}>{edu.level}</h3>
                      <span className="lang-level" style={{ padding: '0.3rem 0.6rem' }}>{edu.date}</span>
                    </div>
                    <h4 style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.75rem' }}>
                      {edu.institution}
                    </h4>
                    <p className="card-description" style={{ fontSize: '0.95rem' }}>{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        <section className="section" id="skills">
          <div className="container">
            <div className="section-header">
              <span className="section-tag no-print">Proficiency</span>
              <h2 className="section-title">Skills & Technologies</h2>
            </div>

            <div className="skills-grid">
              {visibleSkills && visibleSkills.map((skill, i) => (
                <div key={i} className="skill-card">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-outer">
                    <div className="skill-bar-inner" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {data.skills && data.skills.length > 6 && (
              <div style={{ textAlign: 'center', marginTop: '2.5rem' }} className="no-print">
                <button className="btn btn-secondary" onClick={() => setShowAllSkills(s => !s)}>
                  {showAllSkills ? 'Show Less ↑' : 'Show All Skills ↓'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Projects / Works Section */}
        <section className="section" id="projects">
          <div className="container">
            <div className="section-header">
              <span className="section-tag no-print">My Work</span>
              <h2 className="section-title">Featured Portfolio</h2>
            </div>

            <div className="projects-tabs no-print">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Items
              </button>
              <button 
                className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </button>
              <button 
                className={`tab-btn ${activeTab === 'works' ? 'active' : ''}`}
                onClick={() => setActiveTab('works')}
              >
                Professional Experience
              </button>
            </div>

            <div className="grid-layout">
              {filteredItems.length === 0 ? (
                <p className="muted" style={{ gridColumn: 'span 3', textAlign: 'center', padding: '2rem' }}>
                  No items found in this category. Open the Admin Editor to add some!
                </p>
              ) : (
                filteredItems.map((item, i) => (
                  <ProjectCard key={i} project={item} />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section no-print" id="contact">
          <div className="contact-grid container">
            <div className="contact-info">
              <div className="section-header" style={{ marginBottom: '2rem' }}>
                <span className="section-tag">Let's Connect</span>
                <h2 className="section-title">Contact Me</h2>
              </div>
              <p className="muted" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
                Have an exciting project, job opening, or want to discuss full-stack web development and AI integrations? Get in touch directly!
              </p>

              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-item-body">
                  <span className="contact-item-title">Email Me</span>
                  <a href={`mailto:${data.profile.email}`} className="contact-item-value">{data.profile.email}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-item-body">
                  <span className="contact-item-title">Call Me</span>
                  <a href={`tel:${data.profile.phone}`} className="contact-item-value">{data.profile.phone}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-item-body">
                  <span className="contact-item-title">Location</span>
                  <span className="contact-item-value">{data.profile.location}</span>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={(e) => {
              e.preventDefault();
              alert(`Thanks for reaching out! Directing you to your email client to message ${data.profile.email}...`);
              window.location.href = `mailto:${data.profile.email}?subject=Portfolio Inquiry&body=Hi ${data.profile.name},%0A%0A`;
            }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Name</label>
                  <input className="form-control" type="text" id="contact-name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email</label>
                  <input className="form-control" type="email" id="contact-email" placeholder="Your Email" required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input className="form-control" type="text" id="contact-subject" placeholder="What is this about?" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea className="form-control" id="contact-message" placeholder="Write your message here..." required></textarea>
              </div>

              <button className="btn btn-primary" type="submit" style={{ alignSelf: 'flex-start' }}>Send Message</button>
            </form>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">{data.profile.name}</div>
          <p style={{ marginBottom: '1rem' }}>Full Stack Developer • Information Systems Graduate</p>
          <p>© {new Date().getFullYear()} {data.profile.name}. All rights reserved.</p>
        </div>
      </footer>

      {/* Passcode Modal Overlay */}
      {showPasscodeModal && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={verifyPasscode}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)', fontWeight: 800 }}>
              Unlock Editor
            </h3>
            <p className="muted" style={{ fontSize: '0.9rem' }}>
              Enter the admin passcode to modify the portfolio.
            </p>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <input
                className="form-control"
                type="password"
                placeholder="Passcode (e.g. zaidi)"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                autoFocus
              />
              {passcodeError && (
                <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>
                  {passcodeError}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowPasscodeModal(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Verify
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CSS Print Rules */}
      <style>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
          .hero {
            padding: 2rem 0 !important;
          }
          .hero-inner {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            text-align: left !important;
          }
          .avatar-wrapper {
            width: 150px !important;
            height: 150px !important;
          }
          .avatar-image {
            border-radius: 50% !important;
          }
          .section {
            padding: 1.5rem 0 !important;
            page-break-inside: avoid;
          }
          .glass-card, .info-card, .language-item, .skill-card {
            background: #ffffff !important;
            border: 1px solid #cccccc !important;
            box-shadow: none !important;
            color: #000000 !important;
          }
          .skill-bar-outer {
            border: 1px solid #000000 !important;
            background: #eeeeee !important;
          }
          .skill-bar-inner {
            background: #000000 !important;
          }
          a {
            color: #000000 !important;
            text-decoration: underline !important;
          }
        }
      `}</style>
    </div>
  )
}
