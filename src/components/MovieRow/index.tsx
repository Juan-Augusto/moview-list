import React, { useState } from "react";
import "./movieRow.css";
import { ArrowRight } from "../../icons/arrows/arrowRight";
import { ArrowLeft } from "../../icons/arrows/arrowLeft";
import { TitleText } from "../Text/headingTitle";
import { MovieMiniature } from "../movieMiniature";

export default ({
  title = "",
  items = { results: [{ poster_path: "", original_title: "", id: 0 }] },
}) => {
  const [scrollX, setScrollX] = useState(0);
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listL = items.results.length * 150;
    if (window.innerWidth - listL > x) {
      x = window.innerWidth - listL - 60;
    }
    setScrollX(x);
  };

  return (
    items.results && (
      <div className="movieRow">
        <TitleText
          title={title}
          fontSize="
      lg:text-2xl
      "
        />
        <div className="movieRow--Left" onClick={handleLeftArrow}>
          <ArrowLeft color="white" />
        </div>
        <div className="movieRow--right" onClick={handleRightArrow}>
          <ArrowRight color="white" />
        </div>
        <div className="movieRow--listarea">
          <div
            className="movieRow--list"
            style={{
              marginLeft: scrollX,
              width: items.results.length * 150,
            }}
          >
            {items.results.length > 0 &&
              items.results.map((item, key) => (
                <div className="movieRow--item">
                  <MovieMiniature
                    key={key}
                    imageSrc={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    movieId={item.id}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};
