import { LoginForm } from '@/src/components/forms'
import { Container } from '@/src/components/layout';
import { UnauthenticatedRoute } from '@/src/utils';
import React from 'react'

const LoginPage = () => {
  return (
    <UnauthenticatedRoute>
      <Container center>
        <h1 className="text-light text-5xl font-semibold"><span className="text-accent">Log</span>in</h1>
        <LoginForm />
      </Container>
    </UnauthenticatedRoute>    
  )
}

export default LoginPage;