import React, { ComponentPropsWithoutRef } from "react";

interface LoadingAnimationProps extends ComponentPropsWithoutRef<"iframe"> {}

export const LoadingAnimation = ({ ...props }: LoadingAnimationProps) => {
  return (
    <iframe
      {...props}
      src='https://lottie.host/embed/f5d62494-ae89-4630-bb03-eadfc30f614a/1LvVjlu5hq.json'
    ></iframe>
  );
};

export default LoadingAnimation;
