import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { portfolioData } from "./data"
import {
  Home, User, Briefcase, Code, Award, Mail,
  Phone, Linkedin, MapPin, ChevronRight,
  GraduationCap, Wrench, Star, Newspaper
} from "lucide-react"

const sections = ["home", "about", "skills", "experience", "projects", "achievements", "contact"]

const navIcons = {
  home: Home, about: User, skills: Wrench,
  experience: Briefcase, projects: Code,
  achievements: Award, contact: Mail
}

export default function App() {
  const [active, setActive] = useState("home")
  const d = portfolioData

  return (
    <div className="min-h-screen bg-[#080608] text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080608]/90 backdrop-blur-lg border-b border-[#c9a84c]/10">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <span className="text-lg font-black tracking-wider bg-gradient-to-r from-[#c9a84c] to-[#f0d080] bg-clip-text text-transparent">
            AG
          </span>
          <div className="flex gap-1 overflow-x-auto">
            {sections.map((s) => {
              const Icon = navIcons[s]
              return (
                <button
                  key={s}
                  onClick={() => setActive(s)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize ${
                    active === s
                      ? "bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/30"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
                >
                  <Icon size={13} />
                  <span className="hidden sm:inline">{s}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      <main className="pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {active === "home" && <HomeSection d={d} navigate={setActive} />}
            {active === "about" && <AboutSection d={d} />}
            {active === "skills" && <SkillsSection d={d} />}
            {active === "experience" && <ExperienceSection d={d} />}
            {active === "projects" && <ProjectsSection d={d} />}
            {active === "achievements" && <AchievementsSection d={d} />}
            {active === "contact" && <ContactSection d={d} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

/* ─── HOME ─── */
function HomeSection({ d, navigate }) {
  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#8b0000]/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#c9a84c]/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#8b0000]/8 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-2 border-[#c9a84c]/60 shadow-2xl shadow-[#8b0000]/30"
        >
          <img src="/profile.jpg.jpg" alt="Ayush Gupta" className="w-full h-full object-cover object-top" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="inline-block px-3 py-1 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 text-[#c9a84c] text-xs tracking-widest uppercase mb-4"
        >
          Computer Science Engineer
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-7xl font-black mb-4 bg-gradient-to-r from-[#f0d080] via-white to-[#c9a84c] bg-clip-text text-transparent"
        >
          {d.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto"
        >
          {d.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-white/30 text-sm mb-10"
        >
          <MapPin size={14} />
          <span>{d.location}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {[
            { key: "about", label: "Know Me", primary: true },
            { key: "projects", label: "My Work", primary: false },
            { key: "contact", label: "Contact Me", primary: false }
          ].map(({ key, label, primary }) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm hover:scale-105 transition-all shadow-lg capitalize ${
                primary
                  ? "bg-gradient-to-r from-[#8b0000] to-[#c9a84c] text-white shadow-[#8b0000]/30"
                  : "border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c]/10"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── ABOUT ─── */
function AboutSection({ d }) {
  return (
    <section className="min-h-[calc(100vh-64px)] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="About Me" subtitle="Who I am" />
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <GlassCard>
            <User size={28} className="text-[#c9a84c] mb-4" />
            <h3 className="text-xl font-bold mb-3 text-white">Profile</h3>
            <p className="text-white/60 leading-relaxed text-sm">{d.about}</p>
          </GlassCard>
          <GlassCard>
            <GraduationCap size={28} className="text-[#c9a84c] mb-4" />
            <h3 className="text-xl font-bold mb-4 text-white">Education</h3>
            <div className="space-y-4">
              {d.education.map((e, i) => (
                <div key={i} className="border-l-2 border-[#c9a84c]/40 pl-4">
                  <p className="text-white font-semibold text-sm">{e.degree}</p>
                  <p className="text-white/50 text-xs mt-1">{e.school}</p>
                  <p className="text-[#c9a84c] text-xs mt-1">{e.year}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}

/* ─── SKILLS ─── */
function SkillsSection({ d }) {
  const categories = [
    { label: "Technical", items: d.skills.technical },
    { label: "Creative", items: d.skills.creative },
    { label: "Soft Skills", items: d.skills.soft }
  ]
  return (
    <section className="min-h-[calc(100vh-64px)] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Skills" subtitle="What I bring to the table" />
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {categories.map((cat, i) => (
            <motion.div key={cat.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <GlassCard>
                <h3 className="text-lg font-bold mb-4 text-[#c9a84c]">{cat.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-[#c9a84c]/5 border border-[#c9a84c]/20 text-white/70 text-xs font-medium hover:bg-[#c9a84c]/10 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── EXPERIENCE ─── */
function ExperienceSection({ d }) {
  return (
    <section className="min-h-[calc(100vh-64px)] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Experience" subtitle="Where I've worked & trained" />
        <div className="mt-10 space-y-6">
          {d.experience.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}>
              <GlassCard>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8b0000]/30 border border-[#8b0000]/40 flex items-center justify-center flex-shrink-0">
                    <Briefcase size={18} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{exp.role}</h3>
                    <p className="text-[#c9a84c] text-sm mt-1">{exp.company}</p>
                    <p className="text-white/40 text-xs mt-1">{exp.location}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-[#8b0000]/20 text-[#e07070] text-xs border border-[#8b0000]/30">{exp.type}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <GlassCard>
              <h3 className="text-white font-bold mb-1">On-The-Job Training 2024-25</h3>
              <p className="text-[#c9a84c] text-sm mb-3">{d.training.period}</p>
              <div className="flex flex-wrap gap-2">
                {d.training.places.map((p) => (
                  <span key={p} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs">{p}</span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── PROJECTS ─── */
function ProjectsSection({ d }) {
  return (
    <section className="min-h-[calc(100vh-64px)] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Projects" subtitle="Things I've built" />
        <div className="mt-10 space-y-6">
          {d.projects.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
              <GlassCard highlight>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b0000] to-[#c9a84c] flex items-center justify-center flex-shrink-0">
                    <Code size={18} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mt-1">{p.title}</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2 py-1 rounded-md bg-[#c9a84c]/10 text-[#c9a84c] text-xs border border-[#c9a84c]/20">{t}</span>
                  ))}
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-[#8b0000]/10 border border-[#8b0000]/30">
                  <Newspaper size={14} className="text-[#e07070] mt-0.5 flex-shrink-0" />
                  <p className="text-[#e07070]/80 text-xs">{p.highlight}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── ACHIEVEMENTS ─── */
function AchievementsSection({ d }) {
  return (
    <section className="min-h-[calc(100vh-64px)] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Achievements" subtitle="Milestones & recognitions" />
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {d.achievements.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
              <GlassCard>
                <div className="flex items-start gap-3">
                  <Star size={16} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                  <p className="text-white/80 text-sm leading-relaxed">{a}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-white/30 text-xs uppercase tracking-widest mb-4">Certifications</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {d.certifications.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                <GlassCard>
                  <Award size={20} className="text-[#c9a84c] mb-2" />
                  <p className="text-white font-semibold text-sm">{c.title}</p>
                  <p className="text-white/40 text-xs mt-1">{c.issuer}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ─── */
function ContactSection({ d }) {
  const contacts = [
    { icon: Mail, label: "Email", value: d.email, href: `https://mail.google.com/mail/?view=cm&to=${d.email}` },
    { icon: Phone, label: "Call", value: d.phone, href: `tel:${d.phone}` },
    { icon: Linkedin, label: "LinkedIn", value: "ayush-gupta-7421aar", href: d.linkedin },
    { icon: MapPin, label: "Location", value: d.location, href: null }
  ]
  return (
    <section className="min-h-[calc(100vh-64px)] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Contact" subtitle="Let's connect" />
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {contacts.map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              {c.href ? (
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer">
                  <ContactCard c={c} />
                </a>
              ) : (
                <ContactCard c={c} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactCard({ c }) {
  const Icon = c.icon
  return (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-[#c9a84c]/15 hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/5 transition-all group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#8b0000]/20 border border-[#8b0000]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon size={20} className="text-[#c9a84c]" />
        </div>
        <div>
          <p className="text-white/30 text-xs uppercase tracking-wider">{c.label}</p>
          <p className="text-white font-semibold text-sm mt-0.5">{c.value}</p>
        </div>
        {c.href && <ChevronRight size={16} className="text-white/20 ml-auto group-hover:text-[#c9a84c] transition-colors" />}
      </div>
    </div>
  )
}

/* ─── REUSABLE ─── */
function SectionTitle({ title, subtitle }) {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-[#c9a84c]/50 text-xs uppercase tracking-widest mb-2">{subtitle}</p>
      <h2 className="text-4xl font-black bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{title}</h2>
      <div className="w-12 h-1 bg-gradient-to-r from-[#8b0000] to-[#c9a84c] rounded-full mt-3" />
    </motion.div>
  )
}

function GlassCard({ children, highlight = false }) {
  return (
    <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.01] ${
      highlight
        ? "bg-gradient-to-br from-[#8b0000]/5 to-[#c9a84c]/5 border-[#c9a84c]/20 hover:border-[#c9a84c]/40"
        : "bg-white/[0.02] border-white/8 hover:border-[#c9a84c]/20"
    }`}>
      {children}
    </div>
  )
}