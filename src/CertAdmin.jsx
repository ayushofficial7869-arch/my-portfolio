import { useState, useEffect } from "react"
import { supabase } from "./supabase"
import { Trash2, Plus, Upload } from "lucide-react"

const PASS = "ayush@admin"

export default function CertAdmin() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState("")
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ title: "", issuer: "", issue_date: "", credential_url: "", description: "" })
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [msg, setMsg] = useState("")

  useEffect(() => { if (auth) fetchCerts() }, [auth])

  const fetchCerts = async () => {
    const { data } = await supabase.from("certificates").select("*").order("issue_date", { ascending: false })
    setCerts(data || [])
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!form.title || !form.issuer) { setMsg("Title aur Issuer zaroori hai!"); return }
    setUploading(true)
    let image_url = ""

    if (imageFile) {
      const ext = imageFile.name.split(".").pop()
      const fileName = `cert_${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage.from("certificates").upload(fileName, imageFile)
      if (upErr) { setMsg("Image upload failed: " + upErr.message); setUploading(false); return }
      const { data: urlData } = supabase.storage.from("certificates").getPublicUrl(fileName)
      image_url = urlData.publicUrl
    }

    const { error } = await supabase.from("certificates").insert([{ ...form, image_url }])
    if (error) { setMsg("Error: " + error.message) }
    else {
      setMsg("Certificate add ho gaya!")
      setForm({ title: "", issuer: "", issue_date: "", credential_url: "", description: "" })
      setImageFile(null)
      setPreview(null)
      fetchCerts()
    }
    setUploading(false)
    setTimeout(() => setMsg(""), 3000)
  }

  const handleDelete = async (id, image_url) => {
    if (!window.confirm("Delete karna hai?")) return
    if (image_url) {
      const fileName = image_url.split("/").pop()
      await supabase.storage.from("certificates").remove([fileName])
    }
    await supabase.from("certificates").delete().eq("id", id)
    fetchCerts()
  }

  if (!auth) return (
    <div className="min-h-screen bg-[#080608] flex items-center justify-center">
      <div className="p-8 rounded-2xl border border-[#c9a84c]/20 bg-white/[0.02] w-80">
        <h2 className="text-[#c9a84c] font-black text-2xl mb-6 text-center">Certificate Admin</h2>
        <input type="password" placeholder="Password" value={pass}
          onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === "Enter" && pass === PASS && setAuth(true)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white mb-4 outline-none" />
        <button onClick={() => pass === PASS ? setAuth(true) : alert("Wrong password")}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8b0000] to-[#c9a84c] text-white font-bold">
          Login
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#080608] text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[#c9a84c] font-black text-2xl mb-8">Certificate Manager</h1>

        {/* Add Form */}
        <div className="p-6 rounded-2xl border border-[#c9a84c]/20 bg-white/[0.02] mb-8 space-y-4">
          <h2 className="text-white font-bold text-lg mb-2">New Certificate Add Karo</h2>

          <div>
            <label className="text-[#c9a84c] text-xs uppercase tracking-wider mb-1 block">Title *</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              placeholder="e.g. AWS Cloud Practitioner"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none text-sm" />
          </div>

          <div>
            <label className="text-[#c9a84c] text-xs uppercase tracking-wider mb-1 block">Issuer *</label>
            <input value={form.issuer} onChange={e => setForm({...form, issuer: e.target.value})}
              placeholder="e.g. Amazon Web Services"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none text-sm" />
          </div>

          <div>
            <label className="text-[#c9a84c] text-xs uppercase tracking-wider mb-1 block">Issue Date</label>
            <input type="date" value={form.issue_date} onChange={e => setForm({...form, issue_date: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none text-sm" />
          </div>

          <div>
            <label className="text-[#c9a84c] text-xs uppercase tracking-wider mb-1 block">Credential URL</label>
            <input value={form.credential_url} onChange={e => setForm({...form, credential_url: e.target.value})}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none text-sm" />
          </div>

          <div>
            <label className="text-[#c9a84c] text-xs uppercase tracking-wider mb-1 block">Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
              rows={2} placeholder="Certificate ke baare mein..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none text-sm resize-none" />
          </div>

          <div>
            <label className="text-[#c9a84c] text-xs uppercase tracking-wider mb-2 block">Certificate Image / PDF</label>
            <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-dashed border-white/20 cursor-pointer hover:border-[#c9a84c]/40 transition-colors">
              <Upload size={18} className="text-[#c9a84c]" />
              <span className="text-white/50 text-sm">{imageFile ? imageFile.name : "File choose karo (JPG, PNG, PDF)"}</span>
              <input type="file" accept="image/*,.pdf" onChange={handleFile} className="hidden" />
            </label>
            {preview && (
              <img src={preview} alt="preview" className="mt-3 w-full max-h-48 object-contain rounded-xl border border-white/10" />
            )}
          </div>

          {msg && <p className="text-[#c9a84c] text-sm font-medium">{msg}</p>}

          <button onClick={handleSubmit} disabled={uploading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8b0000] to-[#c9a84c] text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50">
            <Plus size={18} />
            {uploading ? "Upload ho raha hai..." : "Certificate Add Karo"}
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          <h2 className="text-white font-bold text-lg">Existing Certificates</h2>
          {certs.length === 0 && <p className="text-white/30 text-sm">Koi certificate nahi abhi</p>}
          {certs.map(cert => (
            <div key={cert.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10">
              {cert.image_url && (
                <img src={cert.image_url} alt={cert.title} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{cert.title}</p>
                <p className="text-[#c9a84c] text-xs">{cert.issuer}</p>
              </div>
              <button onClick={() => handleDelete(cert.id, cert.image_url)}
                className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}