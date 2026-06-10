import React, { useState } from 'react'

export default function AdminPanel({ data, onChange }) {
  const [project, setProject] = useState({ title: '', description: '', link: '', image: '' })
  const [certificate, setCertificate] = useState({ title: '', issuer: '', link: '', image: '' })
  const [eventItem, setEventItem] = useState({ title: '', date: '', description: '' })
+
+  function toBase64(file) {
+    return new Promise((res, rej) => {
+      const reader = new FileReader()
+      reader.onload = () => res(reader.result)
+      reader.onerror = rej
+      reader.readAsDataURL(file)
+    })
+  }
+
+  async function handleProjectImage(e) {
+    const f = e.target.files[0]
+    if (f) {
+      const b = await toBase64(f)
+      setProject(p => ({ ...p, image: b }))
+    }
+  }
+
+  async function handleCertificateImage(e) {
+    const f = e.target.files[0]
+    if (f) {
+      const b = await toBase64(f)
+      setCertificate(p => ({ ...p, image: b }))
+    }
+  }
+
+  function addProject(e) {
+    e.preventDefault()
+    const next = { ...data, projects: [ ...(data.projects||[]), project ] }
+    onChange(next)
+    setProject({ title: '', description: '', link: '', image: '' })
+  }
+
+  function addCertificate(e) {
+    e.preventDefault()
+    const next = { ...data, certificates: [ ...(data.certificates||[]), certificate ] }
+    onChange(next)
+    setCertificate({ title: '', issuer: '', link: '', image: '' })
+  }
+
+  function addEvent(e) {
+    e.preventDefault()
+    const next = { ...data, events: [ ...(data.events||[]), eventItem ] }
+    onChange(next)
+    setEventItem({ title: '', date: '', description: '' })
+  }
+
+  function clearAll() {
+    if (!confirm('Clear all saved portfolio data?')) return
+    onChange({ profile: data.profile, projects: [], certificates: [], events: [] })
+  }
+
+  function updateProfile(e) {
+    e.preventDefault()
+    const form = e.target
+    const name = form.name.value
+    const title = form.title.value
+    const email = form.email.value
+    onChange({ profile: { name, title, email }, projects: data.projects, certificates: data.certificates, events: data.events })
+    alert('Profile updated')
+  }
+
   return (
-    <div style={{padding:12,background:'#071021'}}>
-      <h3>Admin (local)</h3>
-      <form onSubmit={(e)=>{e.preventDefault(); alert('not wired')}}>
-        <label>Project title</label>
-        <input value={project.title} onChange={(e)=>setProject(p=>({...p,title:e.target.value}))} />
-        <label>Desc</label>
-        <input value={project.description} onChange={(e)=>setProject(p=>({...p,description:e.target.value}))} />
-        <button type="submit">Add</button>
-      </form>
-    </div>
+    <div className="admin-panel">
+      <h3>Editor (saved to browser)</h3>
+
+      <form className="admin-section" onSubmit={updateProfile}>
+        <h4>Profile</h4>
+        <input name="name" placeholder="Name" defaultValue={data.profile.name} />
+        <input name="title" placeholder="Title" defaultValue={data.profile.title} />
+        <input name="email" placeholder="Email" defaultValue={data.profile.email} />
+        <div style={{display:'flex',gap:8}}>
+          <button className="button" type="submit">Save Profile</button>
+          <button type="button" className="ghost" onClick={clearAll}>Clear All</button>
+        </div>
+      </form>
+
+      <form className="admin-section" onSubmit={addProject}>
+        <h4>Add Project</h4>
+        <input placeholder="Title" value={project.title} onChange={(e)=>setProject(p=>({...p,title:e.target.value}))} required />
+        <input placeholder="Link (https://...)" value={project.link} onChange={(e)=>setProject(p=>({...p,link:e.target.value}))} />
+        <textarea placeholder="Short description" value={project.description} onChange={(e)=>setProject(p=>({...p,description:e.target.value}))} />
+        <input type="file" accept="image/*" onChange={handleProjectImage} />
+        <div style={{display:'flex',gap:8}}>
+          <button className="button" type="submit">Add Project</button>
+        </div>
+      </form>
+
+      <form className="admin-section" onSubmit={addCertificate}>
+        <h4>Add Certificate</h4>
+        <input placeholder="Title" value={certificate.title} onChange={(e)=>setCertificate(p=>({...p,title:e.target.value}))} required />
+        <input placeholder="Issuer" value={certificate.issuer} onChange={(e)=>setCertificate(p=>({...p,issuer:e.target.value}))} />
+        <input placeholder="Link" value={certificate.link} onChange={(e)=>setCertificate(p=>({...p,link:e.target.value}))} />
+        <input type="file" accept="image/*" onChange={handleCertificateImage} />
+        <div style={{display:'flex',gap:8}}>
+          <button className="button" type="submit">Add Certificate</button>
+        </div>
+      </form>
+
+      <form className="admin-section" onSubmit={addEvent}>
+        <h4>Add Event</h4>
+        <input placeholder="Title" value={eventItem.title} onChange={(e)=>setEventItem(p=>({...p,title:e.target.value}))} required />
+        <input placeholder="Date (YYYY-MM-DD)" value={eventItem.date} onChange={(e)=>setEventItem(p=>({...p,date:e.target.value}))} />
+        <textarea placeholder="Description" value={eventItem.description} onChange={(e)=>setEventItem(p=>({...p,description:e.target.value}))} />
+        <div style={{display:'flex',gap:8}}>
+          <button className="button" type="submit">Add Event</button>
+        </div>
+      </form>
+    </div>
   )
 }
