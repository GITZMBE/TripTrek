import { LoginForm } from '@/src/components/forms'
import React from 'react'

const LoginPage = () => {
  return (
    <main className='w-full min-h-screen flex flex-col justify-center items-center gap-8 pt-20 bg-primary'>
      <h1 className="text-5xl font-semibold"><span className="text-accent">Log</span>in</h1>
      <LoginForm />
    </main>
  )
}

export default LoginPage;