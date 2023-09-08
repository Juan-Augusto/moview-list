import React, { useState } from "react";
import { ViewMore } from "../../icons/viewMore";
import { ButtonsCard } from "./components/buttonsCard";

interface MovieMiniatureProps {
  imageSrc: string;
  key: number;
  movieId: number;
  className?: string;
}

export const MovieMiniature = ({
  className = "",
  imageSrc,
  key,
  movieId,
}: MovieMiniatureProps) => {
  const [posterButtonsView, setPosterButtonsView] = useState(false);

  const handlePosterButtonsView = () => {
    setPosterButtonsView(!posterButtonsView);
  };
  return (
    <div className={`flip ${className}`} onClick={handlePosterButtonsView}>
      <div className={posterButtonsView ? "flip-content" : "flip"}>
        <div className="flip-front">
          <img src={imageSrc} />
        </div>
        <div className="flip-back">
          <ButtonsCard movieId={movieId} />
        </div>
      </div>
    </div>
  );
};
