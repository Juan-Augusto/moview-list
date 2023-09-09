import React, { useEffect, useState } from "react";
import { getHomeMovies } from "../services/tmdb";
import MovieRow from "../components/MovieRow";
import { FeaturedMovie } from "../components/FeaturedMovie";
import { MainNavbar } from "../components/Navbar/navbar";
import { createUserList, getAllMoviesFromUser } from "../services/moview-api";

export const Home = () => {
  const [movies, setMovies] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const getHomePageMovies = async () => {
    setLoading(true);
    const allMovies = await getHomeMovies();
    setMovies(allMovies);
    setLoading(false);
  };

  useEffect(() => {
    getHomePageMovies();
    getAllMoviesFromUser();
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#111",
        }}
      >
        <MainNavbar />
        {loading ? (
          <>Carregando</>
        ) : (
          <>
            <FeaturedMovie
              item={movies[1]?.items?.results[Math.floor(Math.random() * 20)]}
            />
            {movies.map((movie, index) => {
              return (
                <MovieRow items={movie.items} title={movie.title} key={index} />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
