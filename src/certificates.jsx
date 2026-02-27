import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "./supabase"
import { Award, X, ZoomIn, ExternalLink, Calendar } from "lucide-react"

export default function Certificates() {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchCerts()
  }, [])

  const fetchCerts = async () => {
    const { data } = await supabase.from("certificates").select("*").order("issue_date", { ascending: false })
    setCerts(data || [])
    setLoading(false)
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <section className="min-h-[calc(100vh-64px)] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[#c9a84c]/50 text-xs uppercase tracking-widest mb-2">Licenses & Certifications</p>
          <h2 className="text-4xl font-black bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Certificates</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#8b0000] to-[#c9a84c] rounded-full mt-3 mb-10" />
        </motion.div>

        {certs.length === 0 ? (
          <div className="text-center text-white/30 py-20">
            <Award size={48} className="mx-auto mb-4 opacity-30" />
            <p>No certificates added yet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {certs.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelected(cert)}
                className="p-5 rounded-2xl bg-white/[0.02] border border-[#c9a84c]/15 hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/5 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  {cert.image_url ? (
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-[#c9a84c]/20">
                      <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-[#8b0000]/20 border border-[#8b0000]/30 flex items-center justify-center flex-shrink-0">
                      <Award size={24} className="text-[#c9a84c]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-sm leading-tight">{cert.title}</h3>
                    <p className="text-[#c9a84c] text-xs mt-1">{cert.issuer}</p>
                    {cert.issue_date && (
                      <div className="flex items-center gap-1 mt-2 text-white/30 text-xs">
                        <Calendar size={10} />
                        <span>{new Date(cert.issue_date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                      </div>
                    )}
                  </div>
                  <ZoomIn size={16} className="text-white/20 group-hover:text-[#c9a84c] transition-colors flex-shrink-0 mt-1" />
                </div>
                {cert.description && (
                  <p className="text-white/40 text-xs mt-3 leading-relaxed line-clamp-2">{cert.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#0f0a08] border border-[#c9a84c]/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {selected.image_url && (
                <div className="w-full aspect-video overflow-hidden rounded-t-2xl">
                  <img src={selected.image_url} alt={selected.title} className="w-full h-full object-contain bg-white/5" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-white font-black text-xl mb-1">{selected.title}</h3>
                <p className="text-[#c9a84c] font-semibold mb-3">{selected.issuer}</p>
                {selected.issue_date && (
                  <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
                    <Calendar size={14} />
                    <span>Issued: {new Date(selected.issue_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                )}
                {selected.description && (
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{selected.description}</p>
                )}
                <div className="flex gap-3">
                  {selected.credential_url && (
                    <a href={selected.credential_url} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8b0000] to-[#c9a84c] text-white text-sm font-bold">
                      <ExternalLink size={14} />
                      View Credential
                    </a>
                  )}
                  <button onClick={() => setSelected(null)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/50 text-sm hover:border-white/30 transition-colors">
                    <X size={14} />
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}