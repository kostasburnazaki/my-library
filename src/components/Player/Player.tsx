import React, { FC, useRef, useEffect } from "react";
import videojs from 'video.js';
import '../../../node_modules/video.js/dist/video-js.css';


type Props = {
  options: {
    muted: boolean,
    crossorigin: boolean,
    autoplay: boolean,
    controls: boolean,
    responsive: boolean,
    fluid: boolean,
    poster: string | boolean,
    sources: {
      src: string,
      type: string,
    }[]
  },
onReady: (player: any) => void,
};

export const VideoJS: FC<Props> = ({ options, onReady }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {

    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);

        const player = playerRef.current = videojs(videoElement, options, () => {
          onReady && onReady(player);
        });
      }

    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef, onReady]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}
