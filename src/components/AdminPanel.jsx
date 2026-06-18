import React, { useState } from 'react'

export default function AdminPanel({ data, onChange, onClose }) {
  const [project, setProject] = useState({ title: '', description: '', link: '', image: '', tags: '' })
  const [work, setWork] = useState({ title: '', description: '', link: '', image: '', tags: '' })
  const [certificate, setCertificate] = useState({ title: '', issuer: '', date: '', image: '', link: '' })
  const [eventItem, setEventItem] = useState({ title: '', date: '', description: '' })
  const [skill, setSkill] = useState({ name: '', level: '80' })
  const [hobbyInput, setHobbyInput] = useState('')
  const [language, setLanguage] = useState({ name: '', level: 'Fluent' })
  const [edu, setEdu] = useState({ level: '', institution: '', date: '', details: '' })
  const [refItem, setRefItem] = useState({ name: '', phone: '', email: '' })

  function toBase64(file) {
    return new Promise((res, rej) => {
      const reader = new FileReader()
      reader.onload = () => res(reader.result)
      reader.onerror = rej
      reader.readAsDataURL(file)
    })
  }

  async function handleProfileImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await toBase64(file)
    updateProfile('image', dataUrl)
  }

  async function handleCVUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await toBase64(file)
    updateProfile('cv', dataUrl)
  }

  async function handleProjectImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await toBase64(file)
    setProject((p) => ({ ...p, image: dataUrl }))
  }

  async function handleWorkImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await toBase64(file)
    setWork((w) => ({ ...w, image: dataUrl }))
  }

  async function handleCertificateImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await toBase64(file)
    setCertificate((c) => ({ ...c, image: dataUrl }))
  }

  function updateProfile(key, value) {
    const updated = {
      ...data,
      profile: { ...(data.profile || {}), [key]: value }
    }
    onChange(updated)
  }

  function updateSocial(key, value) {
    const updated = {
      ...data,
      social: { ...(data.social || {}), [key]: value }
    }
    onChange(updated)
  }

  // Add handlers
  function addProject() {
    if (!project.title) return alert('Project title required')
    const updated = { ...data, projects: [...(data.projects || []), project] }
    onChange(updated)
    setProject({ title: '', description: '', link: '', image: '', tags: '' })
  }

  // Add Education
  function addEducation() {
    if (!edu.level || !edu.institution) return alert('Level and Institution are required')
    const updated = { ...data, educationList: [...(data.educationList || []), edu] }
    onChange(updated)
    setEdu({ level: '', institution: '', date: '', details: '' })
  }

  // Add Reference
  function addReference() {
    if (!refItem.name) return alert('Reference name required')
    const updated = { ...data, references: [...(data.references || []), refItem] }
    onChange(updated)
    setRefItem({ name: '', phone: '', email: '' })
  }

  function addWork() {
    if (!work.title) return alert('Work title required')
    const updated = { ...data, works: [...(data.works || []), work] }
    onChange(updated)
    setWork({ title: '', description: '', link: '', image: '', tags: '' })
  }

  function addCertificate() {
    if (!certificate.title) return alert('Certificate title required')
    const updated = { ...data, certificates: [...(data.certificates || []), certificate] }
    onChange(updated)
    setCertificate({ title: '', issuer: '', date: '', image: '', link: '' })
  }

  function addEvent() {
    if (!eventItem.title) return alert('Event title required')
    const updated = { ...data, events: [...(data.events || []), eventItem] }
    onChange(updated)
    setEventItem({ title: '', date: '', description: '' })
  }

  function addSkill() {
    if (!skill.name) return alert('Skill name required')
    const updated = { ...data, skills: [...(data.skills || []), skill] }
    onChange(updated)
    setSkill({ name: '', level: '80' })
  }

  function addHobby() {
    if (!hobbyInput.trim()) return alert('Hobby cannot be empty')
    const updated = { ...data, hobbies: [...(data.hobbies || []), hobbyInput.trim().toLowerCase()] }
    onChange(updated)
    setHobbyInput('')
  }

  function addLanguage() {
    if (!language.name) return alert('Language name required')
    const updated = { ...data, languages: [...(data.languages || []), language] }
    onChange(updated)
    setLanguage({ name: '', level: 'Fluent' })
  }

  // Remove handlers
  function removeItem(key, index) {
    const list = [...(data[key] || [])]
    list.splice(index, 1)
    onChange({ ...data, [key]: list })
  }

  function clearAll() {
    if (!confirm('Clear all custom portfolio data? This will restore a blank template.')) return
    onChange({
      profile: { name: '', title: '', headline: '', bio: '', email: '', phone: '', address: '', dob: '', pob: '', gender: '', nationality: '', maritalStatus: '', location: '', availability: '', education: '', experienceNotes: '', image: '', cv: '', experienceYears: '' },
      projects: [],
      works: [],
      educationList: [],
      references: [],
      certificates: [],
      events: [],
      skills: [],
      hobbies: [],
      languages: [],
      social: { github: '', linkedin: '', instagram: '', x: '' }
    })
  }

  function restoreDefaults() {
    if (!confirm('Are you sure you want to restore default data for Kwizera Zaidi? Your unsaved local changes will be lost.')) return
    localStorage.removeItem('portfolio-data')
    window.location.reload()
  }

  // Import / Export
  function exportJSON() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-data.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function importJSON(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result)
        onChange(json)
        alert('Data imported successfully!')
      } catch (err) {
        alert('Invalid JSON file. Please check format.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>Admin Portfolio Editor</h2>
          <p className="muted" style={{ fontSize: '0.85rem' }}>Changes are instantly saved to LocalStorage for preview.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={restoreDefaults}>
            Reset Defaults
          </button>
          <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }} onClick={onClose}>
            Finish Editing
          </button>
        </div>
      </div>

      <div className="admin-grid">
        
        {/* Profile Details */}
        <section className="admin-card">
          <h3 className="admin-card-title">Personal Details</h3>
          <div className="form-group"><input className="form-control" placeholder="Full Name" value={data.profile?.name || ''} onChange={(e) => updateProfile('name', e.target.value)} /></div>
          <div className="form-group"><input className="form-control" placeholder="Job Title (e.g. Full Stack Developer)" value={data.profile?.title || ''} onChange={(e) => updateProfile('title', e.target.value)} /></div>
          <div className="form-group"><input className="form-control" placeholder="Headline / Short Intro" value={data.profile?.headline || ''} onChange={(e) => updateProfile('headline', e.target.value)} /></div>
          <div className="form-group"><input className="form-control" placeholder="Years of Experience (e.g. 2+)" value={data.profile?.experienceYears || ''} onChange={(e) => updateProfile('experienceYears', e.target.value)} /></div>
          
          <div className="form-group"><input className="form-control" placeholder="Email Address" value={data.profile?.email || ''} onChange={(e) => updateProfile('email', e.target.value)} /></div>
          <div className="form-group"><input className="form-control" placeholder="Phone Number" value={data.profile?.phone || ''} onChange={(e) => updateProfile('phone', e.target.value)} /></div>
          <div className="form-group"><input className="form-control" placeholder="Physical Address" value={data.profile?.address || ''} onChange={(e) => updateProfile('address', e.target.value)} /></div>
          <div className="form-group"><input className="form-control" placeholder="Date of Birth" value={data.profile?.dob || ''} onChange={(e) => updateProfile('dob', e.target.value)} /></div>
          <div className="form-group"><input className="form-control" placeholder="Place of Birth" value={data.profile?.pob || ''} onChange={(e) => updateProfile('pob', e.target.value)} /></div>
          <div className="form-group"><input className="form-control" placeholder="Gender" value={data.profile?.gender || ''} onChange={(e) => updateProfile('gender', e.target.value)} /></div>
          <div className="form-group"><input className="form-control" placeholder="Nationality" value={data.profile?.nationality || ''} onChange={(e) => updateProfile('nationality', e.target.value)} /></div>
          <div className="form-group"><input className="form-control" placeholder="Marital Status" value={data.profile?.maritalStatus || ''} onChange={(e) => updateProfile('maritalStatus', e.target.value)} /></div>
          
          <div className="form-group"><textarea className="form-control" style={{ minHeight: '80px' }} placeholder="Detailed Biography Summary" value={data.profile?.bio || ''} onChange={(e) => updateProfile('bio', e.target.value)} /></div>
          <div className="form-group"><input className="form-control" placeholder="Availability Status (e.g. Open to Work)" value={data.profile?.availability || ''} onChange={(e) => updateProfile('availability', e.target.value)} /></div>
          <div className="form-group"><input className="form-control" placeholder="Primary Education Summary" value={data.profile?.education || ''} onChange={(e) => updateProfile('education', e.target.value)} /></div>
          <div className="form-group"><textarea className="form-control" style={{ minHeight: '50px' }} placeholder="Experience Focus / Core Interests" value={data.profile?.experienceNotes || ''} onChange={(e) => updateProfile('experienceNotes', e.target.value)} /></div>
          
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Upload Profile Image (replaces public picture)</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleProfileImage} />
          </div>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Upload CV (PDF file)</label>
            <input type="file" className="form-control" accept="application/pdf" onChange={handleCVUpload} />
          </div>
        </section>

        {/* Social Links */}
        <section className="admin-card">
          <h3 className="admin-card-title">Social Accounts</h3>
          <div className="form-group">
            <input className="form-control" placeholder="GitHub Profile Link" value={data.social?.github || ''} onChange={(e) => updateSocial('github', e.target.value)} />
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="LinkedIn Profile Link" value={data.social?.linkedin || ''} onChange={(e) => updateSocial('linkedin', e.target.value)} />
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="X / Twitter Link" value={data.social?.x || ''} onChange={(e) => updateSocial('x', e.target.value)} />
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Instagram Link" value={data.social?.instagram || ''} onChange={(e) => updateSocial('instagram', e.target.value)} />
          </div>
        </section>

        {/* Education History List */}
        <section className="admin-card">
          <h3 className="admin-card-title">Academic History</h3>
          <div className="form-group"><input className="form-control" placeholder="Degree/Level (e.g. A2)" value={edu.level} onChange={(e) => setEdu({...edu, level: e.target.value})} /></div>
          <div className="form-group"><input className="form-control" placeholder="School/Institution" value={edu.institution} onChange={(e) => setEdu({...edu, institution: e.target.value})} /></div>
          <div className="form-group"><input className="form-control" placeholder="Date (e.g. Jan 2019 – Aug 2022)" value={edu.date} onChange={(e) => setEdu({...edu, date: e.target.value})} /></div>
          <div className="form-group"><textarea className="form-control" placeholder="Programs, achievements, or skills acquired" value={edu.details} onChange={(e) => setEdu({...edu, details: e.target.value})} /></div>
          <button className="btn btn-primary" onClick={addEducation}>Add Education</button>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto', marginTop: '0.5rem' }}>
            {data.educationList && data.educationList.map((ed, idx) => (
              <div key={idx} className="admin-list-item">
                <span>{ed.level} - {ed.institution.substring(0, 15)}...</span>
                <button className="admin-delete-btn" onClick={() => removeItem('educationList', idx)}>Delete</button>
              </div>
            ))}
          </div>
        </section>

        {/* References List */}
        <section className="admin-card">
          <h3 className="admin-card-title">Manage References</h3>
          <div className="form-group"><input className="form-control" placeholder="Reference Name" value={refItem.name} onChange={(e) => setRefItem({...refItem, name: e.target.value})} /></div>
          <div className="form-group"><input className="form-control" placeholder="Phone Number" value={refItem.phone} onChange={(e) => setRefItem({...refItem, phone: e.target.value})} /></div>
          <div className="form-group"><input className="form-control" placeholder="Email Address" value={refItem.email} onChange={(e) => setRefItem({...refItem, email: e.target.value})} /></div>
          <button className="btn btn-primary" onClick={addReference}>Add Reference</button>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '150px', overflowY: 'auto', marginTop: '0.5rem' }}>
            {data.references && data.references.map((r, idx) => (
              <div key={idx} className="admin-list-item">
                <span>{r.name}</span>
                <button className="admin-delete-btn" onClick={() => removeItem('references', idx)}>Delete</button>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Proficiency */}
        <section className="admin-card">
          <h3 className="admin-card-title">Manage Skills</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input className="form-control" placeholder="Skill Name" value={skill.name} onChange={(e) => setSkill({ ...skill, name: e.target.value })} />
            <input className="form-control" type="number" min="0" max="100" style={{ width: '80px' }} placeholder="%" value={skill.level} onChange={(e) => setSkill({ ...skill, level: e.target.value })} />
            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={addSkill}>Add</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto', marginTop: '0.5rem' }}>
            {data.skills && data.skills.map((s, idx) => (
              <div key={idx} className="admin-list-item">
                <span>{s.name} ({s.level}%)</span>
                <button className="admin-delete-btn" onClick={() => removeItem('skills', idx)}>Delete</button>
              </div>
            ))}
          </div>
        </section>

        {/* Hobbies & Languages */}
        <section className="admin-card">
          <h3 className="admin-card-title">Hobbies & Languages</h3>
          
          <div style={{ borderBottom: '1px dashed var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Add Hobby</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input className="form-control" placeholder="e.g. coding" value={hobbyInput} onChange={(e) => setHobbyInput(e.target.value)} />
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={addHobby}>Add</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
              {data.hobbies && data.hobbies.map((h, idx) => (
                <div key={idx} style={{ background: 'var(--bg-tertiary)', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span>{h}</span>
                  <span style={{ cursor: 'pointer', color: '#ef4444', fontWeight: 'bold' }} onClick={() => removeItem('hobbies', idx)}>×</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Add Language</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input className="form-control" placeholder="Language" value={language.name} onChange={(e) => setLanguage({ ...language, name: e.target.value })} />
              <input className="form-control" placeholder="Level" value={language.level} onChange={(e) => setLanguage({ ...language, level: e.target.value })} />
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={addLanguage}>Add</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem', maxHeight: '120px', overflowY: 'auto' }}>
              {data.languages && data.languages.map((l, idx) => (
                <div key={idx} className="admin-list-item">
                  <span>{l.name} - {l.level}</span>
                  <button className="admin-delete-btn" onClick={() => removeItem('languages', idx)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add Project Card */}
        <section className="admin-card">
          <h3 className="admin-card-title">Add Project Item</h3>
          <div className="form-group"><input className="form-control" placeholder="Project Title" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} /></div>
          <div className="form-group"><input className="form-control" placeholder="Project Link / GitHub URL" value={project.link} onChange={(e) => setProject({ ...project, link: e.target.value })} /></div>
          <div className="form-group"><input className="form-control" placeholder="Tags / Tech Stack (e.g. React, Flask)" value={project.tags} onChange={(e) => setProject({ ...project, tags: e.target.value })} /></div>
          <div className="form-group"><textarea className="form-control" style={{ minHeight: '60px' }} placeholder="Short Description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} /></div>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Project Screenshot Image</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleProjectImage} />
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={addProject}>Add Project</button>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '120px', overflowY: 'auto', marginTop: '0.5rem' }}>
            {data.projects && data.projects.map((p, idx) => (
              <div key={idx} className="admin-list-item">
                <span>{p.title}</span>
                <button className="admin-delete-btn" onClick={() => removeItem('projects', idx)}>Delete</button>
              </div>
            ))}
          </div>
        </section>

        {/* Add Work Card */}
        <section className="admin-card">
          <h3 className="admin-card-title">Add Work / Experience Item</h3>
          <div className="form-group"><input className="form-control" placeholder="Job/Work Title" value={work.title} onChange={(e) => setWork({ ...work, title: e.target.value })} /></div>
          <div className="form-group"><input className="form-control" placeholder="Work Link" value={work.link} onChange={(e) => setWork({ ...work, link: e.target.value })} /></div>
          <div className="form-group"><input className="form-control" placeholder="Tags" value={work.tags} onChange={(e) => setWork({ ...work, tags: e.target.value })} /></div>
          <div className="form-group"><textarea className="form-control" style={{ minHeight: '60px' }} placeholder="Work Description" value={work.description} onChange={(e) => setWork({ ...work, description: e.target.value })} /></div>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Experience Cover Image</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleWorkImage} />
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={addWork}>Add Work</button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '120px', overflowY: 'auto', marginTop: '0.5rem' }}>
            {data.works && data.works.map((w, idx) => (
              <div key={idx} className="admin-list-item">
                <span>{w.title}</span>
                <button className="admin-delete-btn" onClick={() => removeItem('works', idx)}>Delete</button>
              </div>
            ))}
          </div>
        </section>

        {/* JSON Sync Card */}
        <section className="admin-card" style={{ gridColumn: 'span 2' }}>
          <h3 className="admin-card-title">Deploy & Data Sync</h3>
          <p className="muted" style={{ fontSize: '0.9rem' }}>
            Since there is <strong>no database</strong>, any modifications you make here are saved to your current browser's <code>localStorage</code>.
            To make these changes permanent and visible to everyone when deployed, click the button below to download the updated JSON data, and commit it to your repository.
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={exportJSON}>
              Download Data Config (JSON)
            </button>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
              <span className="muted" style={{ fontSize: '0.85rem' }}>Import Config:</span>
              <input type="file" accept="application/json" onChange={importJSON} style={{ width: '200px' }} />
            </div>
            <button className="btn btn-secondary" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={clearAll}>
              Clear All Data
            </button>
          </div>
        </section>

      </div>
    </div>
  )
}
