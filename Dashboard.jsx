import React, { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"

export default function Dashboard({ session }) {
  const [sessions, setSessions] = useState([])
  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState("")
  const [rating, setRating] = useState("")

  useEffect(() => {
    fetchSessions()
  }, [])

  async function fetchSessions() {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("created_by", session.user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching sessions:", error)
    } else {
      setSessions(data)
    }
  }

  async function createSession() {
    if (!title) return alert("اكتب عنوان الجلسة")

    const { error } = await supabase.from("sessions").insert([
      {
        title,
        notes,
        rating,
        created_by: session.user.id,
        group_id: null
      },
    ])

    if (error) {
      alert("فشل إنشاء الجلسة")
    } else {
      alert("تم إنشاء الجلسة ✅")
      setTitle("")
      setNotes("")
      setRating("")
      fetchSessions()
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h2>📌 جلسة جديدة</h2>
      <input
        type="text"
        placeholder="عنوان الجلسة"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", margin: "5px 0", padding: "8px" }}
      />
      <textarea
        placeholder="ملاحظات"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ width: "100%", height: "100px", margin: "5px 0", padding: "8px" }}
      />
      <input
        type="text"
        placeholder="تقييم الجلسة"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <button onClick={createSession}>💾 حفظ الجلسة</button>

      <h2 style={{ marginTop: 40 }}>📚 الجلسات السابقة</h2>
      {sessions.length === 0 && <p>لا توجد جلسات بعد</p>}
      {sessions.map((s) => (
        <div key={s.id} style={{ background: "#fff", margin: "1rem 0", padding: "1rem", borderRadius: 8 }}>
          <h3>{s.title}</h3>
          <p><strong>ملاحظات:</strong> {s.notes || "—"}</p>
          <p><strong>التقييم:</strong> {s.rating || "—"}</p>
          <p style={{ fontSize: "0.8rem", color: "#888" }}>{new Date(s.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}