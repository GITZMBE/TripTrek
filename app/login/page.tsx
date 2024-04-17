import { LoginForm } from '@/src/components/forms'
import { Container } from '@/src/components/layout';
import React from 'react'

const LoginPage = () => {
  return (
    <Container center>
      <h1 className="text-light text-5xl font-semibold"><span className="text-accent">Log</span>in</h1>
      <LoginForm />
    </Container>
  )
}

export default LoginPage;