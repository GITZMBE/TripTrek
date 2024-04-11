import { SignupForm } from "@/src/components/forms";
import React from "react";

const SignupPage = () => {
  return (
    <main className='w-full min-h-screen flex flex-col justify-center items-center gap-8 bg-primary'>
      <h1 className="text-5xl font-semibold"><span className="text-accent">Sign</span>up</h1>
      <SignupForm />
    </main>
  );
};

export default SignupPage;
