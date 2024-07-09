import HighlightTitle from "./HighlightTitle";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
    >
      <div className="screen-max-width">
        <HighlightTitle />
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
