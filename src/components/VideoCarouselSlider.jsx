const VideoCarouselSlider = ({
  sliderRef,
  videoRef,
  list,
  i,
  setVideo,
  handleLoadedMetadata,
  handleProcess,
}) => {
  return (
    <div
      ref={(el) => (sliderRef.current[i] = el)}
      id="slider"
      className="sm:pr-20 pr-10 opacity-25"
    >
      <div className="video-carousel_container">
        <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
          <video
            id="video"
            playsInline={true}
            preload="auto"
            muted
            className={`${list.id === 2 && "translate-x-44"} pointer-events-none`}
            ref={(el) => (videoRef.current[i] = el)}
            onEnded={() =>
              i !== 3
                ? handleProcess("video-end", i)
                : handleProcess("video-last")
            }
            onPlay={() => {
              setVideo((prevVideo) => ({
                ...prevVideo,
                isPlaying: true,
              }));
            }}
            onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
          >
            <source src={list.video} type="video/mp4" />
          </video>
        </div>

        <div className="absolute top-12 left-[5%] z-10">
          {list.textLists.map((text) => (
            <p key={text} className="md:text-2xl text-xl font-medium">
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoCarouselSlider;
