import React, { useState } from "react"
import { supabase } from "./supabaseClient"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert("❌ فشل تسجيل الدخول")
  }

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20, background: "#fff", borderRadius: 12 }}>
      <h2>تسجيل دخول المعالج</h2>
      <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>دخول</button>
    </div>
  )
}