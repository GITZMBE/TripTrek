import { SignupForm } from "@/src/components/forms";
import { Container } from "@/src/components/layout";
import React from "react";

const SignupPage = () => {
  return (
    <Container center>
      <h1 className="text-light text-5xl font-semibold"><span className="text-accent">Sign</span>up</h1>
      <SignupForm />
    </Container>
  );
};

export default SignupPage;
