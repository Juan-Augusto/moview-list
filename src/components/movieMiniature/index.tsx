import React, { useState } from "react";
import { ViewMore } from "../../icons/viewMore";
import { ButtonsCard } from "./components/buttonsCard";

interface MovieMiniatureProps {
  imageSrc: string;
  key: number;
  movieId: number;
  className?: string;
  handleListChange?: () => void;
}

export const MovieMiniature = ({
  className = "",
  imageSrc,
  key,
  movieId,
  handleListChange = () => {},
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
          <ButtonsCard movieId={movieId} handleListChange={handleListChange} />
        </div>
      </div>
    </div>
  );
};
