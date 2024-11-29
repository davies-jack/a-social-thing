'use server'

import { post } from '@/utils/api'
import { redirect } from 'next/navigation'

export async function handleLogin(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')
  
  if (!email || !password) return
  
  try {
    await post("/api/auth", {
      body: JSON.stringify({
        email,
        password,
      }),
    });
    redirect('/dashboard')
  } catch (error) {
    // Handle error
    console.error(error)
    return { error: 'Login failed' }
  }
}
