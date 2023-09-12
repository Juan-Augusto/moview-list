import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE = process.env.REACT_APP_API_BASE;

const tmdbGetRequest = async (endpoint: string) => {
  const formattedRequest = `${API_BASE}${endpoint}`;
  try {
    const response = await axios.get(formattedRequest);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getHomeMovies = async () => {
  return [
    {
      slug: "trending",
      title: "Talvez você goste",
      items: await tmdbGetRequest(
        `/trending/all/week?languange=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "toprated",
      title: "Em alta",
      items: await tmdbGetRequest(
        `/movie/top_rated?language=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "action",
      title: "Ação",
      items: await tmdbGetRequest(
        `/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "comedy",
      title: "Comédia",
      items: await tmdbGetRequest(
        `/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "romance",
      title: "Romance",
      items: await tmdbGetRequest(
        `/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "horror",
      title: "Terror",
      items: await tmdbGetRequest(
        `/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`
      ),
    },
    {
      slug: "documentary",
      title: "Documentários",
      items: await tmdbGetRequest(
        `/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`
      ),
    },
  ];
};

export const getGenres = async () => {
  return await tmdbGetRequest(
    `/genre/movie/list?language=pt-BR&api_key=${API_KEY}`
  );
};

export const getMovieById = async (id: any) => {
  return tmdbGetRequest(
    `/movie/${id}?language=pt-BR&external_source=imdb_id&api_key=${API_KEY}`
  );
};

export const getRelatedMovies = async (id: any) => {
  return tmdbGetRequest(
    `/movie/${id}/similar?language=pt-BR&api_key=${API_KEY}`
  );
};

export const getAllMoviesFromUser = async (allIds: any) => {
  const movies = [];
  for (let i = 0; i < allIds.length; i++) {
    const movie = await getMovieById(allIds[i]);
    movies.push(movie);
  }
  return movies;
};

export const searchMovie = async (query: string, page: number) => {
  return tmdbGetRequest(
    `/search/movie?language=pt-BR&query=${query}&api_key=${API_KEY}&page=${page}`
  );
};
