import React, { FC, useRef, useEffect } from "react";
import videojs from 'video.js';
import '../../../node_modules/video.js/dist/video-js.css';
import { JsOptions } from "../../types/VideoJSOptions";
import Player from '../../../node_modules/video.js/dist/types/player';


type Props = {
  options: JsOptions,
  onReady: (player: Player) => void,
};

export const VideoJS: FC<Props> = ({ options, onReady }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

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

  // Dispose the Video.js player when the functional component unmounts
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
