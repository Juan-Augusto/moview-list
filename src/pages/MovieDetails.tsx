import React, { useState, useEffect } from "react";
import { getMovieById, getRelatedMovies } from "../services/tmdb";
import axios from "axios";
import { LoadingCard } from "../components/Card/LoadingCard";
import MovieRow from "../components/MovieRow";
import { useParams } from "react-router-dom";
import { MainNavbar } from "../components/Navbar/navbar";
import { FeaturedMovie } from "../components/FeaturedMovie";
import { AddToList } from "../components/Buttons/addToList";
import { Footer } from "../components/Footer/Footer";

export const MovieDetails = () => {
  const [noChanges, setNoChanges] = useState(
    localStorage.getItem("hasNoChange") === "true" ? true : false
  );
  const [currentMovie, setCurrentMovie] = useState({} as any);
  const [relatedMovies, setRelatedMovies] = useState(
    {} as { results: [{ poster_path: ""; original_title: ""; id: 0 }] }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const movieId = useParams<{ id: string }>().id;

  const getCurrentRelatedMovies = async () => {
    try {
      const movieData = await getRelatedMovies(movieId);
      setRelatedMovies(movieData);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handlePosterImage = async () => {
    try {
      const movieData = await axios.get(
        `https://image.tmdb.org/t/p/w300${currentMovie?.poster_path}`
      );
      setCurrentMovie(movieData);
      setError(false);
    } catch (error) {
      console.log("aqui: ", error);
      setError(true);
    }
  };

  const handlePageLoad = async () => {
    setLoading(true);
    try {
      await handlePosterImage();
      await getCurrentRelatedMovies();
      const movieData = await getMovieById(movieId);
      setCurrentMovie(movieData);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePageLoad();
  }, [movieId]);

  return loading ? (
    <LoadingCard />
  ) : (
    <>
      <div
        className="h-screen overflow-y-auto"
        style={{
          backgroundColor: "#111",
        }}
      >
        <MainNavbar
          noChanges={noChanges}
          setNoChanges={(value: boolean) => setNoChanges(value)}
        />
        <div className="mt-10 flex flex-col justify-center items-center">
          {!currentMovie ? (
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                Erro ao carregar filme
              </h5>
            </div>
          ) : loading ? (
            <LoadingCard />
          ) : (
            <div className="m-5 rounded-lg flex border-2 shadow-md flex-wrap sm:flex-nowrap">
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={`https://image.tmdb.org/t/p/w300${currentMovie.poster_path}`}
                alt=""
              />
              <div className="flex flex-col justify-center items-center p-4 leading-normal text-justify">
                <h5 className="mb-2  text-2xl font-bold tracking-tight text-white dark:text-white">
                  {currentMovie.title}
                </h5>
                <p className="mb-3 font-normal text-gray-200 dark:text-gray-400">
                  {currentMovie.overview}
                </p>
                <AddToList currentItemId={currentMovie.id} />
              </div>
            </div>
          )}
        </div>
        <MovieRow title="Recomendados" items={relatedMovies} />
      </div>
      <Footer />
    </>
  );
};
