import React, { useEffect, useState } from "react";
import { MainNavbar } from "../components/Navbar/navbar";
import { getAllMoviesFromUser } from "../services/tmdb";
import { MovieMiniature } from "../components/movieMiniature";
import { TitleText } from "../components/Text/headingTitle";

export const UserAccount = () => {
  const [loading, setLoading] = useState(false);
  const [moviesSelectedByUser, setMoviesSelectedByUser] = useState([] as any[]);
  const handleGetMoviesSelectedByUser = async () => {
    setLoading(true);
    let allIdFromUser = localStorage.getItem("myList");
    allIdFromUser = JSON.parse(allIdFromUser || "[]");
    try {
      let allMoviesFromUserList = await getAllMoviesFromUser(allIdFromUser);
      setMoviesSelectedByUser(
        allMoviesFromUserList.filter((item: any) => item)
      );
      console.log(allMoviesFromUserList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMoviesSelectedByUser();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#111",
      }}
    >
      <MainNavbar />
      <div className="h-screen p-2">
        <div className="border-white border-2 p-2 flex flex-col justify-center items-center border-solid">
          <TitleText title="Minha Lista" />
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full border-2 border-white"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center">
              {moviesSelectedByUser.map((item: any) => (
                <MovieMiniature
                  className="m-2"
                  key={item.id}
                  movieId={item.id}
                  imageSrc={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
