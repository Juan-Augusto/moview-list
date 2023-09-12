import { MainNavbar } from "../components/Navbar/navbar";
import { MovieMiniature } from "../components/movieMiniature";
import { TitleText } from "../components/Text/headingTitle";
import { Footer } from "../components/Footer/Footer";
import { useState, useEffect } from "react";
import { searchMovie } from "../services/tmdb";
import { useLocation, useParams } from "react-router-dom";

export const SearchResults = () => {
  const [noChanges, setNoChanges] = useState(
    localStorage.getItem("hasNoChange") === "true" ? true : false
  );
  const [loading, setLoading] = useState(false);
  const [moviesSearch, setMoviesSearch] = useState([] as any[]);
  const [pageRequest, setPageRequest] = useState(1);
  const [showMoreDisplay, setShowMoreDisplay] = useState("block");
  const { search } = useParams();
  const handleGetSearch = async () => {
    try {
      const data = await searchMovie(search as any, pageRequest);
      if (data.results.length < 20) setShowMoreDisplay("none");
      else setShowMoreDisplay("block");
      setMoviesSearch(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetNextPage = async () => {
    try {
      const data = await searchMovie(search as any, pageRequest + 1);
      if (data.results.length < 20) setShowMoreDisplay("none");
      else setShowMoreDisplay("block");
      setMoviesSearch([...moviesSearch, ...data.results]);
      setPageRequest(pageRequest + 1);
      setShowMoreDisplay("none");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetSearch();
  }, [search]);

  return (
    <div
      style={{
        backgroundColor: "#111",
      }}
    >
      <MainNavbar
        noChanges={noChanges}
        setNoChanges={(value: boolean) => setNoChanges(value)}
      />
      <div
        className="p-2"
        style={{
          height: moviesSearch.length <= 30 ? "100vh" : "auto",
        }}
      >
        <div className="border-white border-2 p-2 flex flex-col border-solid items-center">
          <TitleText title={`Resultados para "${search}"`} />
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full border-2 border-white"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center">
              {moviesSearch.map((item: any) => (
                <MovieMiniature
                  className="m-2"
                  key={item.id}
                  movieId={item.id}
                  imageSrc={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  setNoChanges={(value: boolean) => setNoChanges(value)}
                />
              ))}
            </div>
          )}
          <button
            onClick={handleGetNextPage}
            style={{
              display: showMoreDisplay,
            }}
            className="bg-white w-15 p-2 rounded-md shadow-md hover:bg-gray-200 transition duration-300 ease-in-out font-semibold"
          >
            Ver mais
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
