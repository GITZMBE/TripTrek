import React, { ComponentPropsWithoutRef } from 'react';

interface YouTubeIframeProps extends ComponentPropsWithoutRef<"iframe"> {
  url: string;
};

export const YouTubePlayer = ({ url, ...props }: YouTubeIframeProps) => {
  const extractVideoId = (url: string): string => {
    const urlParams = new URLSearchParams((new URL(url)).search);
    return urlParams.get('v') || '';
  };

  const videoId = extractVideoId(url);

  const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=${videoId}`;

  return (
    // <iframe
    //   {...props}
    //   id="youtube-player"
    //   width={props.width}
    //   height={props.height}
    //   className={props.className}
    //   src={iframeSrc}
    //   frameBorder="0"
    //   allow="autoplay; encrypted-media"
    //   allowFullScreen
    // />
    <iframe 
      width="800" 
      height="450" 
      src={iframeSrc}
      allow="autoplay" 
      referrerPolicy="strict-origin-when-cross-origin" 
      allowFullScreen
    >
    </iframe>
  );
};

export default YouTubePlayer;
