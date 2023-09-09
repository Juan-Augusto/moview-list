import axios from "axios";
const MOVIE_API_URL =
  "https://37olnsbymh.execute-api.us-east-1.amazonaws.com/prod";

export const getCognitoToken = async (code: string) => {
  try {
    let { data } = await axios.post(`${MOVIE_API_URL}/code`, { code });
    data = JSON.parse(data.body);
    const { jwt } = data;
    const { email } = data.body;
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("email", email);
    window.location.href = "/home";
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMoviesFromUser = async () => {
  const userEmail = localStorage.getItem("email");
  const queryParams = {
    email: userEmail,
  };
  try {
    const { data } = await axios.get(`${MOVIE_API_URL}/lists`, {
      params: queryParams,
    });
    if (data?.data?.allLists) {
      localStorage.setItem("noList", "false");
      localStorage.setItem("previousList", data.data.allLists);
      if (
        localStorage.getItem("previousList") === localStorage.getItem("myList")
      ) {
        localStorage.setItem("myList", data.data.allLists);
      }
    } else {
      localStorage.setItem("noList", "true");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createUserList = async (setHasList: any) => {
  const email = localStorage.getItem("email");
  const list = localStorage.getItem("myList");

  try {
    const { data } = await axios.post(`${MOVIE_API_URL}/first-list`, {
      email: email,
      list: list,
    });
    localStorage.setItem("noList", "false");
    setHasList(true);
    return data;
  } catch (error) {
    console.log(error);
    setHasList(false);
  }
};

export const deleteUserList = async (setHasList: any) => {
  const email = localStorage.getItem("email");
  try {
    const { data } = await axios.delete(`${MOVIE_API_URL}/lists`, {
      params: { email },
    });
    localStorage.setItem("noList", "true");
    setHasList(false);
    return data;
  } catch (error) {
    console.log(error);
    localStorage.setItem("noList", "false");
    setHasList(true);
  }
};

export const updateMovieList = async (setNoChanges: any) => {
  const updatedList = localStorage.getItem("myList");
  const email = localStorage.getItem("email");
  const queryParams = {
    email: email,
  };

  try {
    const { data } = await axios.put(
      `${MOVIE_API_URL}/lists`,
      {
        lists: updatedList,
      },
      { params: queryParams }
    );
    setNoChanges(true);
    return data;
  } catch (error) {
    console.log(error);
    setNoChanges(false);
  }
};
