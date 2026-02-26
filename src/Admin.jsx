import { useState } from "react"
import { portfolioData } from "./data"

const PASS = "ayush@admin"

export default function Admin() {
    const [auth, setAuth] = useState(false)
    const [pass, setPass] = useState("")
    const [d, setD] = useState(JSON.parse(JSON.stringify(portfolioData)))
    const [copied, setCopied] = useState(false)
    const [tab, setTab] = useState("basic")

    if (!auth) return (
        <div className="min-h-screen bg-[#080608] flex items-center justify-center">
            <div className="p-8 rounded-2xl border border-[#c9a84c]/20 bg-white/[0.02] w-80">
                <h2 className="text-[#c9a84c] font-black text-2xl mb-6 text-center">Admin Panel</h2>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && pass === PASS && setAuth(true)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white mb-4 outline-none"
                />
                <button
                    onClick={() => pass === PASS ? setAuth(true) : alert("Wrong password")}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8b0000] to-[#c9a84c] text-white font-bold"
                >
                    Login
                </button>
            </div>
        </div>
    )

    const generateCode = () => {
        const code = `export const portfolioData = ${JSON.stringify(d, null, 2)}`
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    const tabs = ["basic", "skills", "education", "experience", "projects", "achievements"]

    return (
        <div className="min-h-screen bg-[#080608] text-white p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-[#c9a84c] font-black text-2xl">Admin Panel</h1>
                    <button
                        onClick={generateCode}
                        className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#8b0000] to-[#c9a84c] text-white font-bold text-sm"
                    >
                        {copied ? "✓ Copied! Now paste in data.js" : "Generate & Copy Code"}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    {tabs.map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all ${tab === t ? "bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30" : "text-white/40 hover:text-white/70 bg-white/5"}`}>
                            {t}
                        </button>
                    ))}
                </div>

                {/* BASIC */}
                {tab === "basic" && (
                    <div className="space-y-4">
                        {["name", "tagline", "location", "email", "phone", "linkedin", "about"].map(field => (
                            <div key={field}>
                                <label className="text-[#c9a84c] text-xs uppercase tracking-wider mb-1 block">{field}</label>
                                {field === "tagline" || field === "about" ? (
                                    <textarea
                                        rows={3}
                                        value={d[field]}
                                        onChange={e => setD({ ...d, [field]: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none resize-none text-sm"
                                    />
                                ) : (
                                    <input
                                        value={d[field]}
                                        onChange={e => setD({ ...d, [field]: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none text-sm"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* SKILLS */}
                {tab === "skills" && (
                    <div className="space-y-6">
                        {["technical", "creative", "soft"].map(cat => (
                            <div key={cat}>
                                <label className="text-[#c9a84c] text-xs uppercase tracking-wider mb-2 block">{cat} Skills (comma separated)</label>
                                <textarea
                                    rows={3}
                                    value={d.skills[cat].join(", ")}
                                    onChange={e => setD({ ...d, skills: { ...d.skills, [cat]: e.target.value.split(",").map(s => s.trim()).filter(Boolean) } })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none resize-none text-sm"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* EDUCATION */}
                {tab === "education" && (
                    <div className="space-y-6">
                        {d.education.map((edu, i) => (
                            <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
                                <p className="text-[#c9a84c] text-xs uppercase">Education {i + 1}</p>
                                {["school", "degree", "year"].map(f => (
                                    <div key={f}>
                                        <label className="text-white/40 text-xs mb-1 block capitalize">{f}</label>
                                        <input value={edu[f]} onChange={e => {
                                            const updated = [...d.education]
                                            updated[i] = { ...updated[i], [f]: e.target.value }
                                            setD({ ...d, education: updated })
                                        }} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none text-sm" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                {/* EXPERIENCE */}
                {tab === "experience" && (
                    <div className="space-y-6">
                        {d.experience.map((exp, i) => (
                            <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
                                <p className="text-[#c9a84c] text-xs uppercase">Experience {i + 1}</p>
                                {["role", "company", "location", "type"].map(f => (
                                    <div key={f}>
                                        <label className="text-white/40 text-xs mb-1 block capitalize">{f}</label>
                                        <input value={exp[f]} onChange={e => {
                                            const updated = [...d.experience]
                                            updated[i] = { ...updated[i], [f]: e.target.value }
                                            setD({ ...d, experience: updated })
                                        }} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none text-sm" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                {/* PROJECTS */}
                {tab === "projects" && (
                    <div className="space-y-6">
                        {d.projects.map((proj, i) => (
                            <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
                                <p className="text-[#c9a84c] text-xs uppercase">Project {i + 1}</p>
                                <div>
                                    <label className="text-white/40 text-xs mb-1 block">Title</label>
                                    <input value={proj.title} onChange={e => {
                                        const updated = [...d.projects]
                                        updated[i] = { ...updated[i], title: e.target.value }
                                        setD({ ...d, projects: updated })
                                    }} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="text-white/40 text-xs mb-1 block">Description</label>
                                    <textarea rows={3} value={proj.description} onChange={e => {
                                        const updated = [...d.projects]
                                        updated[i] = { ...updated[i], description: e.target.value }
                                        setD({ ...d, projects: updated })
                                    }} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none resize-none text-sm" />
                                </div>
                                <div>
                                    <label className="text-white/40 text-xs mb-1 block">Technologies (comma separated)</label>
                                    <input value={proj.tech.join(", ")} onChange={e => {
                                        const updated = [...d.projects]
                                        updated[i] = { ...updated[i], tech: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }
                                        setD({ ...d, projects: updated })
                                    }} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="text-white/40 text-xs mb-1 block">Highlight</label>
                                    <input value={proj.highlight} onChange={e => {
                                        const updated = [...d.projects]
                                        updated[i] = { ...updated[i], highlight: e.target.value }
                                        setD({ ...d, projects: updated })
                                    }} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none text-sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ACHIEVEMENTS */}
                {tab === "achievements" && (
                    <div className="space-y-4">
                        <label className="text-[#c9a84c] text-xs uppercase tracking-wider mb-2 block">Achievements (ek line = ek achievement)</label>
                        <textarea
                            rows={10}
                            value={d.achievements.join("\n")}
                            onChange={e => setD({ ...d, achievements: e.target.value.split("\n").filter(Boolean) })}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none resize-none text-sm"
                        />
                    </div>
                )}

                <div className="mt-8 p-4 rounded-xl bg-[#c9a84c]/5 border border-[#c9a84c]/20">
                    <p className="text-[#c9a84c] text-sm font-bold mb-1">Kaise use karna hai:</p>
                    <p className="text-white/50 text-xs leading-relaxed">1. Jo bhi edit karna ho karो • 2. "Generate & Copy Code" button dabao • 3. VS Code mein <span className="text-white">src/data.js</span> kholo, saara content delete karo, paste karo • 4. Save karo • 5. Terminal mein <span className="text-white">git add . → git commit -m "update" → git push</span> karo • Live ho jayega!</p>
                </div>
            </div>
        </div>
    )
}