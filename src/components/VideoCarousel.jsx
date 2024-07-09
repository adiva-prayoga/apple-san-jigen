import { useRef, useState, useEffect } from "react";
import { hightlightsSlides } from "../constant";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import VideoCarouselSlider from "./VideoCarouselSlider";
import VideoCarouselControl from "./VideoCarouselControl";
import VideoCarouselProgress from "./VideoCarouselProgress";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const sliderRef = useRef([]);
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      scale: 0.75,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to(sliderRef.current[videoId], {
      opacity: 1,
      scale: 1,
      duration: 2,
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3 && videoRef.current[videoId]) {
      const videoElement = videoRef.current[videoId];
      if (!isPlaying) {
        videoElement.pause();
      } else if (startPlay) {
        videoElement.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetadata = (i, e) => setLoadedData((pre) => [...pre, e]);

  useEffect(() => {
    // Check if the video span element exists
    if (!videoSpanRef.current[videoId]) return;

    let currentProgress = 0;

    // Get references to the necessary DOM elements
    let span = videoSpanRef.current[videoId];
    let videoDiv = videoDivRef.current[videoId];
    let videoElement = videoRef.current[videoId];

    // Create the animation
    let anim = gsap.to(span, {
      onUpdate: () => {
        // Update the progress based on the animation's progress
        const progress = Math.ceil(anim.progress() * 100);

        if (progress > currentProgress) {
          currentProgress = progress;

          // Update the width of the video div
          gsap.to(videoDiv, {
            width: window.innerWidth < 1200 ? "10vw" : "4vw",
          });

          // Update the width and background color of the span
          gsap.to(span, {
            width: `${currentProgress}%`,
            backgroundColor: "white",
          });
        }
      },
      onComplete: () => {
        // Animation complete
        if (isPlaying) {
          // Update the width of the video div
          gsap.to(videoDiv, {
            width: "12px",
          });

          // Update the background color of the span
          gsap.to(span, {
            backgroundColor: "#afafaf",
          });
        }
      },
    });

    // Restart the animation if it's the first video
    if (videoId === 0) {
      anim.restart();
    }

    // Function to update the progress of the animation
    const animUpdate = () => {
      anim.progress(
        videoElement.currentTime / hightlightsSlides[videoId].videoDuration
      );
    };

    // Add or remove the ticker based on the isPlaying state
    if (isPlaying) {
      gsap.ticker.add(animUpdate);
    } else {
      gsap.ticker.remove(animUpdate);
    }

    // Clean up function to remove the ticker and kill the animation when the component unmounts
    return () => {
      gsap.ticker.remove(animUpdate);
      anim.kill();
    };
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    const updateVideoState = (update) =>
      setVideo((pre) => ({ ...pre, ...update }));

    switch (type) {
      case "video-end":
        updateVideoState({ isEnd: true, videoId: i + 1 });
        break;
      case "video-last":
        updateVideoState({ isLastVideo: true });
        break;
      case "video-reset":
        updateVideoState({ isLastVideo: false, videoId: 0 });
        break;
      case "play":
      case "pause":
        updateVideoState({ isPlaying: !isPlaying });
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <VideoCarouselSlider
            sliderRef={sliderRef}
            videoRef={videoRef}
            list={list}
            i={i}
            key={list.id}
            setVideo={setVideo}
            handleLoadedMetadata={handleLoadedMetadata}
            handleProcess={handleProcess}
          />
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <VideoCarouselProgress
          videoRef={videoRef}
          videoDivRef={videoDivRef}
          videoSpanRef={videoSpanRef}
        />
        <VideoCarouselControl
          isLastVideo={isLastVideo}
          isPlaying={isPlaying}
          handleProcess={handleProcess}
        />
      </div>
    </>
  );
};

export default VideoCarousel;
