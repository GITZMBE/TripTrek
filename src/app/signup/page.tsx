import { SignupForm } from "@/src/components/forms";
import { Container } from "@/src/components/layout";
import { UnauthenticatedRoute } from "@/src/utils";
import React from "react";

const SignupPage = () => {
  return (
    <UnauthenticatedRoute>
      <Container center>
        <h1 className="text-light text-5xl font-semibold"><span className="text-accent">Sign</span>up</h1>
        <SignupForm />
      </Container>
    </UnauthenticatedRoute>
  );
};

export default SignupPage;
