/* eslint-disable @next/next/no-img-element */
"use client";
import ReactPlayer from 'react-player/lazy';
import LoadingPlayer from "./loading";

interface VimeoPlayerProps {
  url: string;
  thumbnail: string;
}

const VimeoPlayer = (params: VimeoPlayerProps) => {
  return (
    <div className="bg-gray-700 relative pt-[56.25%]">
      <ReactPlayer
        className="absolute top-0 left-0"
        url={params.url}
        controls
        playsinline={false} // Enables inline playback on mobile
        width="100%"
        height="100%"
        light={params.thumbnail || "/logo.png"}
        fallback={<LoadingPlayer />}
        style={{ objectFit: "contain" }}
        config={{
          vimeo: {
            playerOptions: {
              playsinline: false, // Enables inline playback on iOS Safari
              autopause: false,  // Prevents auto-pause
            },
          },
        }}
        playIcon={
          <div className="flex items-center justify-center p-6 bg-slate-50 rounded-full bg-opacity-40 shadow-md hover:shadow-lg cursor-pointer">
           <img src="/jouer.png" alt="" className='w-10 h-10' />
          </div>
        }
      />
    </div>
  );
};

export default VimeoPlayer;
