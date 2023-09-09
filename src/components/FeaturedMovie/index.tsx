import React, { useEffect, useState } from "react";
import "./style.css";
import { getGenres } from "../../services/tmdb";
import { AddToList } from "../Buttons/addToList";
export const FeaturedMovie = (prop: any) => {
  const { item } = prop;
  const [genres, setGenres] = useState([] as any[]);
  const handleGetGenres = async () => {
    let currentGenres = [] as any[];
    let allGenres = await getGenres();
    allGenres = allGenres.genres;
    item.genre_ids.forEach((id: number) => {
      let genre = allGenres?.find((item: any) => item.id === id);
      if (genre) currentGenres.push(genre?.name);
    });
    setGenres(currentGenres);
  };

  let firstDate = item.first_air_date
    ? new Date(item.first_air_date)
    : new Date(item.release_date);
  let description = item.overview;
  if (description.length > 200) {
    description = description.substring(0, 200) + "...";
  }

  useEffect(() => {
    handleGetGenres();
  }, [item]);

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{item.title || item.name}</div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} pontos</div>
            <div className="featured--year">
              {isNaN(firstDate.getFullYear()) ? "" : firstDate.getFullYear()}
            </div>
          </div>
          <div className="featured--description">{description}</div>
          <div className="featured--buttons">
            <AddToList currentItemId={item.id} />
          </div>
          <div className="featured--genres">
            <strong>Gêneros: </strong>
            {genres.join(" , ")}
          </div>
        </div>
      </div>
    </section>
  );
};
