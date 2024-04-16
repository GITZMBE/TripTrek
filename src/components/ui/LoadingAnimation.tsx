import React, { ComponentPropsWithoutRef } from "react";

interface LoadingAnimationProps extends ComponentPropsWithoutRef<"iframe"> {}

export const LoadingAnimation = ({ width, height, className }: LoadingAnimationProps) => {
  return (
    <iframe
      src='https://lottie.host/embed/f5d62494-ae89-4630-bb03-eadfc30f614a/1LvVjlu5hq.json'
      width={width}
      height={height}
      className={className}
    ></iframe>
  );
};

export default LoadingAnimation;
