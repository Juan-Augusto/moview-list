import React, { useState } from "react";
import "./movieRow.css";
import { ArrowRight } from "../../icons/arrows/arrowRight";
import { ArrowLeft } from "../../icons/arrows/arrowLeft";
import { TitleText } from "../Text/headingTitle";

export default ({
  title = "",
  items = { results: [{ poster_path: "", original_title: "" }] },
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
              <div key={key} className="movieRow--item">
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.original_title}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
