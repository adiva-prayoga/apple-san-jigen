import { rightImg, watchImg } from "../utils";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HighlightTitle = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });

    gsap.to(".link", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
    });
  }, []);

  return (
    <div className="mb-12 w-full md:flex items-end justify-between">
      <h1 id="title" className="section-heading">
        Get the highlights.
      </h1>

      <div className="flex flex-wrap items-end gap-5">
        <p className="link">
          Watch the film
          <img
            src={watchImg}
            alt="watch"
            className="ml-2"
            width={20}
            height={20}
          />
        </p>
        <p className="link">
          Watch the event
          <img
            src={rightImg}
            alt="right"
            className="ml-2 w-100 h-100"
            width={7}
            height={11}
          />
        </p>
      </div>
    </div>
  );
};

export default HighlightTitle;
