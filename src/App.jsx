import React, { useEffect, useState, useRef } from 'react'
import ProjectCard from './components/ProjectCard'
import AdminPanel from './components/AdminPanel'
import IntroScreen from './components/IntroScreen'

const STORAGE_KEY = 'portfolio-data'

const defaultData = {
  profile: {
    name: 'Kwizera Zaidi',
    title: 'Full Stack Developer & Information Systems Specialist',
    headline: 'Information Systems Student & Certified Full Stack Developer',
    bio: 'I am Kwizera Zaidi, a dedicated Full Stack Developer pursuing a degree in Information Systems at the University of Rwanda (expected graduation 2027). I hold an Advanced Level (A2) certificate in Mathematics, Economics, and Computer Science (MCE) from G.S. APAPEC Murambi. I specialize in software engineering, database-driven web applications (Python, Flask, React, MySQL, JavaScript), and quantitative systems design.',
    email: 'zaidikwizera@gmail.com',
    phone: '0785283267',
    address: 'Kigali, Rwanda',
    dob: 'October 2, 2002',
    pob: 'Rukomo',
    gender: 'Male',
    nationality: 'Rwandan',
    maritalStatus: 'Single',
    location: 'Kigali, Rwanda',
    availability: 'Open to Full Stack & Software Engineering Roles',
    education: 'University of Rwanda (Information Systems) & A2 MCE Certificate',
    experienceNotes: 'Full-stack web application development, Python/Flask API design, and database engineering.',
    image: '/profile.jpeg',
    cv: '',
    experienceYears: '2+'
  },
  skills: [
    { name: 'Computer Science & Software Development', level: '88' },
    { name: 'React.js & Frontend Architectures', level: '85' },
    { name: 'Python & Flask Framework', level: '85' },
    { name: 'Data Entry & Spreadsheet Management', level: '92' },
    { name: 'Microsoft Office & Google Workspace', level: '90' },
    { name: 'PC Maintenance & Troubleshooting', level: '85' },
    { name: 'Touch Typing & Rapid Data Processing', level: '88' },
    { name: 'Internet Research & Technical Sourcing', level: '86' },
    { name: 'Photography & Digital Media Production', level: '88' },
    { name: 'Adobe Lightroom & Photo Color Grading', level: '85' },
    { name: 'NumPy & Pandas (Data Analysis)', level: '80' },
    { name: 'Python Simulation & Math Modeling', level: '82' },
    { name: 'Machine Learning Modeling', level: '75' },
    { name: 'MySQL & Database Design', level: '82' },
    { name: 'Java Programming', level: '78' },
    { name: 'AI Workflows & Prompt Fine-Tuning', level: '85' },
    { name: 'Programming Fundamentals', level: '90' },
    { name: 'HTML5 & CSS3 (Vanilla / Modern)', level: '92' },
    { name: 'Git & Version Control', level: '85' },
    { name: 'Node.js & Express API Development', level: '80' },
    { name: 'TypeScript Programming', level: '75' },
    { name: 'Tailwind CSS Integration', level: '82' },
    { name: 'Docker Containerization', level: '70' },
    { name: 'Vercel Deployment', level: '88' },
    { name: 'PostgreSQL Database Management', level: '78' }
  ],
  projects: [
    {
      title: 'Hura App',
      description: 'Hura App is a localized, real-time dispatch and request platform designed to connect service seekers with local service providers and drivers. It features dynamic location tracking, real-time message exchange elements, a responsive mobile-first UI built with React/Vite, custom CSS animations, and instant provider match notifications.',
      link: 'https://huraapp.vercel.app/',
      image: '/huranow.png',
      tags: 'React, Vite, CSS, APIs, Leaflet Maps'
    },
    {
      title: 'Streamfy Media Aggregator',
      description: 'Streamfy is a modern media playback and playlist aggregation platform. It consolidates audio/video content channels, providing users with responsive list navigation, custom playlist organization, aggregate filter controls, and a custom media player interface styled with premium dark slate cards and glassmorphic overlay indicators.',
      link: 'https://streamfyappmsm.vercel.app/',
      image: '/streamfy.png',
      tags: 'React, Media Player, CSS Grid, LocalStorage'
    },
    {
      title: 'Simulation & Rate Exchange App',
      description: 'An interactive developer utility combining real-time currency conversion rate tracking with a systems queue simulation modeling system. Features a visual web canvas simulator showing queuing delays and server loads, currency exchange rate calculator integrations, historical charts, and performance benchmarking under different workload conditions.',
      link: 'https://simulation-sample.vercel.app/',
      image: '/rate exchange.png',
      tags: 'JavaScript, Simulation, APIs, Web Canvas, ChartJS'
    },
    {
      title: 'AmaliTech Idempotency Gateway',
      description: 'An API gateway utility demonstration that secures critical endpoints against duplicate transactions and non-idempotent actions. Implements cache check layers, secure request token headers, retry handling logic, and node execution status feedback to ensure safety in transactional operations.',
      link: 'https://amalitech-idempotency-gateway.vercel.app/',
      image: '/amalitech.png',
      tags: 'Vercel, API Gateway, Node.js, Security, Redis Cache'
    },
    {
      title: 'NutriMe Nutrition Platform',
      description: 'A personalized nutrition and meal planning web application featuring macro-nutrient calculation metrics, customized dietary goal trackers, calorie allocation summaries, and Leaflet OpenStreetMap integrations to locate fresh ingredient vendors and healthy meal providers.',
      link: 'https://nutri-me-neon.vercel.app/',
      image: '',
      tags: 'React, Leaflet Maps, FontAwesome, Nutrition APIs, CSS3'
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
      title: 'Professional Photographer & Visual Media Creator',
      link: 'https://instagram.com/am2aidi',
      image: '',
      description: 'Captured commercial portraits, event photography, and visual media campaigns. Managed RAW photo processing, Adobe Lightroom color grading, and client gallery delivery.',
      tags: 'Photography, Digital Media, Color Grading'
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
  hobbies: ['photography & digital media', 'traveling', 'reading', 'blogging', 'movies and music', 'reading quran', 'sports'],
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

function IdBadge({ profile, social }) {
  const [isHot, setIsHot] = useState(false)
  const [swingClass, setSwingClass] = useState('swing')
  const cardRef = useRef(null)

  const triggerSwing = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setSwingClass('')
    requestAnimationFrame(() => {
      setSwingClass('swing')
    })
  }

  const handlePointerMove = (e) => {
    if (e.pointerType === 'touch') return
    const card = cardRef.current
    if (!card) return
    const r = card.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    card.style.transition = 'transform 0.1s'
    card.style.transform = `rotateX(${-y * 14}deg) rotateY(${x * 14}deg) translateY(-6px)`
    card.style.setProperty('--gx', `${(x + 0.5) * 100}%`)
    card.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
    setIsHot(true)
  }

  const handlePointerLeave = (e) => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.6s cubic-bezier(0.2, 1.4, 0.4, 1)'
    card.style.transform = ''
    setIsHot(false)
    if (e.pointerType !== 'touch') {
      triggerSwing()
    }
  }

  const handlePointerDown = (e) => {
    if (e.pointerType === 'touch') {
      triggerSwing()
    }
  }

  return (
    <div className={`id-badge ${swingClass} no-print`} id="badge">
      <div className="id-strap"></div>
      <div 
        className={`id-card ${isHot ? 'hot' : ''}`} 
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
      >
        <div className="id-glare"></div>
        <div 
          className="id-ph" 
          style={{ backgroundImage: `url(${profile.image || '/profile.jpeg'})` }}
          role="img" 
          aria-label={profile.name}
        ></div>
        <h3>{profile.name}</h3>
        <div className="id-role">{profile.title}</div>
        <a className="id-row" href={`mailto:${profile.email}`}>{profile.email}</a>
        <a className="id-row" href={`tel:${(profile.phone || '').replace(/[^+\d]/g, '')}`}>{profile.phone}</a>
        <div className="id-soc">
          {social?.github && (
            <a href={social.github} target="_blank" rel="noreferrer" title="GitHub">
              <svg viewBox="0 0 24 24"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.26.8-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.19.7.8.58A12 12 0 0 0 12 .3z"/></svg>
            </a>
          )}
          {social?.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
            </a>
          )}
          {social?.instagram && (
            <a href={social.instagram} target="_blank" rel="noreferrer" title="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z"/></svg>
            </a>
          )}
          {social?.x && (
            <a href={social.x} target="_blank" rel="noreferrer" title="X">
              <svg viewBox="0 0 24 24"><path d="M18.2 2.25h3.3l-7.2 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z"/></svg>
            </a>
          )}
        </div>
        <div className="id-handle">@am2aidi</div>
      </div>
    </div>
  )
}

export default function App() {
  const [data, setData] = useState(defaultData)
  const [showAdmin, setShowAdmin] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [activeTab, setActiveTab] = useState('all')
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [showPasscodeModal, setShowPasscodeModal] = useState(false)
  const [passcodeInput, setPasscodeInput] = useState('')
  const [passcodeError, setPasscodeError] = useState('')
  const [showIntro, setShowIntro] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return !(params.get('admin') === 'true' || params.get('nointro') === 'true')
  })

  // Mouse parallax for full-page ambient background
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bg = document.getElementById('pbg')
    if (!bg) return
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * -18
      const y = (e.clientY / window.innerHeight - 0.5) * -10
      bg.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  // Load from LocalStorage and check URL query parameters
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        
        // Merge projects to preserve default image paths if they are empty in local storage
        const mergedProjects = (defaultData.projects || []).map(defProj => {
          const localProj = (parsed.projects || []).find(p => p.title === defProj.title)
          if (localProj) {
            return { ...defProj, ...localProj, image: localProj.image || defProj.image }
          }
          return defProj
        })

        // Also add any projects that are in local storage but not in defaultData
        const extraProjects = (parsed.projects || []).filter(
          p => !(defaultData.projects || []).some(defP => defP.title === p.title)
        )

        // Merge works to preserve default image paths
        const mergedWorks = (defaultData.works || []).map(defWork => {
          const localWork = (parsed.works || []).find(w => w.title === defWork.title)
          if (localWork) {
            return { ...defWork, ...localWork, image: localWork.image || defWork.image }
          }
          return defWork
        })

        const extraWorks = (parsed.works || []).filter(
          w => !(defaultData.works || []).some(defW => defW.title === w.title)
        )

        const loadedProfile = { ...defaultData.profile, ...(parsed.profile || {}) }
        if (loadedProfile.bio && loadedProfile.bio.includes('Professional Photographer currently pursuing')) {
          loadedProfile.bio = defaultData.profile.bio
          loadedProfile.title = defaultData.profile.title
          loadedProfile.headline = defaultData.profile.headline
        }

        // Merge skills to add new default skills into local storage
        const currentSkills = parsed.skills || []
        const mergedSkills = [...currentSkills]
        defaultData.skills.forEach(defSkill => {
          if (!mergedSkills.some(s => s.name === defSkill.name)) {
            mergedSkills.push(defSkill)
          }
        })

        setData({
          ...defaultData,
          ...parsed,
          profile: loadedProfile,
          skills: mergedSkills,
          social: { ...defaultData.social, ...(parsed.social || {}) },
          projects: [...mergedProjects, ...extraProjects],
          works: [...mergedWorks, ...extraWorks]
        })
      } catch (e) {
        console.warn('Failed to parse local portfolio data', e)
      }
    }
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)

    // Secret entry 1: check URL query parameters (e.g. yoursite.com/?admin=true or ?edit=true)
    const params = new URLSearchParams(window.location.search)
    if (params.get('admin') === 'true' || params.get('edit') === 'true') {
      setPasscodeInput('')
      setPasscodeError('')
      setShowPasscodeModal(true)
    }
  }, [])

  // Secret entry 1: keyboard shortcut Ctrl + Alt + E
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'e') {
        e.preventDefault()
        handleAdminAccessClick()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showAdmin])

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
      setPasscodeInput('')
      setPasscodeError('')
      setShowPasscodeModal(true)
    }
  }

  function verifyPasscode(e) {
    e.preventDefault()
    if (passcodeInput.toLowerCase() === 'zaidigram2023' || passcodeInput.toLowerCase() === 'zaidi' || passcodeInput.toLowerCase() === 'admin') {
      setShowPasscodeModal(false)
      setShowAdmin(true)
    } else {
      setPasscodeError('Incorrect passcode.')
    }
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    const name = e.target.elements['contact-name'].value
    const email = e.target.elements['contact-email'].value
    const subject = e.target.elements['contact-subject'].value
    const message = e.target.elements['contact-message'].value

    const mailBody = `Hi ${data.profile.name},\n\nMy name is ${name} (${email}).\n\n${message}`
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${data.profile.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`

    alert(`Directing you to Gmail compose tab to send message to ${data.profile.email}...`)
    window.open(gmailUrl, '_blank')
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

  const handleIntroFinish = (targetSection) => {
    setShowIntro(false)
    if (targetSection === 'contact') {
      setTimeout(() => {
        const el = document.getElementById('contact')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }

  return (
    <div className="app">
      {/* Fixed Ambient Background Layer */}
      <div className="page-bg no-print" id="pbg" aria-hidden="true"></div>

      {/* Cinematic Kinetic Intro Overlay */}
      {showIntro && <IntroScreen onFinish={handleIntroFinish} />}

      {/* Interactive Main Website */}
      <div className="app-website-root">
        {/* Navigation Header */}
        <nav className="navbar no-print">
          <div className="navbar-inner container">
            {/* Secret entry 2: Double click on logo directly triggers admin passcode verification */}
            <a href="#" className="logo" onDoubleClick={handleAdminAccessClick} title="Double-click to verify admin">
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
            </div>
          </div>
        </nav>

        {/* Admin Panel Render */}
        {showAdmin && (
          <div className="admin-section-container container no-print">
            <AdminPanel data={data} onChange={handleUpdate} onClose={() => setShowAdmin(false)} />
          </div>
        )}

        {/* Hero Section Poster & VisionOS Glass Style */}
        <header className="hero" id="home">
          <div className="hero-bg-watermark no-print">PORTFOLIO</div>
          <div className="hero-inner container">
            <div className="hero-content">
              <span className="badge no-print">{data.profile.headline}</span>
              <span className="hero-greeting no-print">Hello, I'm</span>
              <h1 className="hero-title">
                <span>{data.profile.name}</span>
              </h1>
              <p className="hero-subtitle">{data.profile.title}</p>
              <p className="hero-bio">{data.profile.bio}</p>
              
              <div className="hero-buttons no-print">
                <a href="#contact" className="btn btn-primary">Hire Me 💼</a>
                <a href="#projects" className="btn btn-secondary">View Work</a>
                <button className="btn btn-secondary" onClick={() => window.print()}>
                  Export PDF CV 📥
                </button>
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
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
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

          {/* Hero Visual: Interactive 3D ID Badge Card */}
          <div className="hero-visual">
            <IdBadge profile={data.profile} social={data.social} />
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
                    <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
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

        {/* Work Process Section (From Poster Reference Layout) */}
        <section className="section no-print" id="process">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'stretch' }}>
            <div>
              <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                <span className="section-tag">Engineering Workflow</span>
                <h2 className="section-title">Work Process</h2>
              </div>
              <div className="process-grid">
                <div className="process-step">
                  <span className="process-num">01</span>
                  <span className="process-title">DISCOVER</span>
                  <p className="process-desc">Understanding client goals, user audience, and system requirements.</p>
                </div>
                <div className="process-step">
                  <span className="process-num">02</span>
                  <span className="process-title">RESEARCH & SCHEMA</span>
                  <p className="process-desc">Planning database models, API specs, and clean component contracts.</p>
                </div>
                <div className="process-step">
                  <span className="process-num">03</span>
                  <span className="process-title">DEVELOP</span>
                  <p className="process-desc">Building fast, robust web applications using Python, Flask & React.</p>
                </div>
                <div className="process-step">
                  <span className="process-num">04</span>
                  <span className="process-title">DELIVER</span>
                  <p className="process-desc">Rigorous testing, optimization, and seamless cloud deployment.</p>
                </div>
              </div>
            </div>

            <div className="quote-card">
              <div className="quote-mark">“</div>
              <p className="quote-text">
                Good code and design is not just how it looks — it communicates, connects, and delivers real-world results.
              </p>
              <div className="quote-author">
                — {data.profile.name}
              </div>
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

            <form className="contact-form" onSubmit={handleContactSubmit}>
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
      {/* Secret entry 3: Double click on footer directly triggers admin passcode verification */}
      <footer className="footer no-print" onDoubleClick={handleAdminAccessClick} title="Double-click to verify admin">
        <div className="container">
          <div className="footer-logo">{data.profile.name}</div>
          <p style={{ marginBottom: '1rem' }}>Full Stack Developer • Information Systems Graduate</p>
          <p>© {new Date().getFullYear()} {data.profile.name}. All rights reserved.</p>
        </div>
      </footer>

      {/* Passcode Modal Overlay */}
      {showPasscodeModal && (
        <div className="modal-overlay no-print">
          <form className="modal-content" onSubmit={verifyPasscode}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)', fontWeight: 800 }}>
              Unlock Editor
            </h3>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <input
                className="form-control"
                type="password"
                placeholder="Enter passcode"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                autoFocus
              />
              {passcodeError && (
                <span style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '6px', fontWeight: 600, display: 'block', textAlign: 'center' }}>
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
    </div>
    {/* End app-website-root */}

    {/* Dedicated Executive PDF CV View (Renders ONLY when saving/printing to PDF) */}
    <div className="pdf-cv-container print-only">
      <header className="pdf-header">
        <div>
          <h1 className="pdf-name">{data.profile.name}</h1>
          <p className="pdf-title">{data.profile.title}</p>
        </div>
        <div className="pdf-header-meta">
          <div><strong>Email:</strong> {data.profile.email}</div>
          <div><strong>Phone:</strong> {data.profile.phone}</div>
          <div><strong>Location:</strong> {data.profile.location}</div>
          <div><strong>Date:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
        </div>
      </header>

      <section className="pdf-section">
        <h2 className="pdf-heading">EXECUTIVE SUMMARY</h2>
        <p className="pdf-text">{data.profile.bio}</p>
      </section>

      <section className="pdf-section">
        <h2 className="pdf-heading">EDUCATION & ACADEMIC QUALIFICATIONS</h2>
        <div className="pdf-grid-2">
          {(data.educationList || []).map((edu, idx) => (
            <div key={idx} className="pdf-item">
              <div className="pdf-item-header">
                <strong>{edu.level}</strong> — <span>{edu.institution}</span>
              </div>
              <div className="pdf-item-sub">{edu.date}</div>
              <p className="pdf-item-desc">{edu.details}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pdf-section">
        <h2 className="pdf-heading">TECHNICAL SKILLS & PROFICIENCIES</h2>
        <div className="pdf-skills-list">
          {(data.skills || []).slice(0, 12).map((s, idx) => (
            <span key={idx} className="pdf-skill-badge">{s.name} ({s.level}%)</span>
          ))}
        </div>
      </section>

      <section className="pdf-section">
        <h2 className="pdf-heading">FEATURED PROJECTS (SHORT SUMMARY)</h2>
        <div className="pdf-projects-list">
          {(data.projects || []).slice(0, 4).map((proj, idx) => (
            <div key={idx} className="pdf-project-item">
              <div className="pdf-project-title">
                <strong>{idx + 1}. {proj.title}</strong> — <span className="pdf-link">{proj.link}</span>
              </div>
              <p className="pdf-project-desc">{proj.description}</p>
              <div className="pdf-tags">Stack: {proj.tags}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="pdf-section">
        <h2 className="pdf-heading">PROFESSIONAL EXPERIENCE</h2>
        <div className="pdf-projects-list">
          {(data.works || []).map((w, idx) => (
            <div key={idx} className="pdf-project-item">
              <strong>{w.title}</strong>: {w.description}
            </div>
          ))}
        </div>
      </section>
    </div>
    </div>
  )
}
