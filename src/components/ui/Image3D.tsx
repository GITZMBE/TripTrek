import React, { ComponentPropsWithoutRef, useState } from 'react';

interface IProps extends ComponentPropsWithoutRef<"img"> {};

const Image3D = ({ ...props }: IProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const rotateX = (y / height - 0.5) * 45;
    const rotateY = (x / width - 0.5) * -45;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <img
      className="w-80 aspect-square object-cover object-center rounded-full shadow-lg shadow-[#111111]"
      alt=""
      onMouseMove={e => handleMouseMove(e)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform .3s',
      }}
      {...props}
    />
  );
};

export default Image3D;
