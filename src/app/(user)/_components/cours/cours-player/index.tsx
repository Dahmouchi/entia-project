/* eslint-disable @next/next/no-img-element */
"use client";
import ReactPlayer from "react-player/lazy";
import LoadingPlayer from "./loading";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

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
              dnt: true,
              byline: false,
              title: false,
              portrait: false,
              playsinline: false, // Enables inline playback on iOS Safari
              autopause: false, // Prevents auto-pause
            },
          },
        }}
        playIcon={
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 rounded-full cursor-pointer bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
          >
            <Play className="w-8 h-8 text-white ml-1" />
          </motion.button>
        }
      />
    </div>
  );
};

export default VimeoPlayer;
