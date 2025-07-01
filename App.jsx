import React, { useEffect, useState } from "react"
import Login from "./Login.jsx"
import Dashboard from "./Dashboard.jsx"
import { supabase } from "./supabaseClient"

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener?.subscription.unsubscribe()
  }, [])

  return session ? <Dashboard session={session} /> : <Login />
}