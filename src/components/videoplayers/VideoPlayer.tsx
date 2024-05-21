import React, { ComponentPropsWithoutRef } from 'react';
import { Filter } from '../ui';

interface IProps extends ComponentPropsWithoutRef<"video"> {
  src: string;
  type?: string;
}

export const VideoPlayer = ({ src, type, ...props }: IProps) => {
  return (
    <video { ...props }>
      <source src={src} type={ type || "video/mp4" } />
    </video>
  )
}

export default VideoPlayer;