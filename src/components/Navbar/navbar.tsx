import React, { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { SearchBar } from "../Inputs/searchBar";
import { TitleText } from "../Text/headingTitle";
import { EyeIcon } from "../../icons/eye";
import { MainTitle } from "./components/mainTitle";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  createUserList,
  deleteUserList,
  updateMovieList,
} from "../../services/moview-api";
export const MainNavbar = (props: any) => {
  const { noChanges, setNoChanges, handleListChange } = props;
  const [openNav, setOpenNav] = useState(false);
  const [hasList, setHasList] = useState(
    localStorage.getItem("noList") || false
  );

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-0 mt-0 flex flex-col gap-5 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <SearchBar handleListChange={handleListChange} />
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={`/user`}>Lista do usuário</Link>
      </Typography>
      <Button
        type="primary"
        disabled={noChanges}
        className="bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={() => {
          if (localStorage.getItem("noList") === "true") {
            createUserList((value: any) => setHasList(value));
          } else {
            updateMovieList((value: any) => setNoChanges(value));
          }
          console.log("noChanges", noChanges);
        }}
      >
        {localStorage.getItem("noList") === "true" || !hasList
          ? "Criar Lista com os filmes selecionados"
          : "Salvar alterações"}
      </Button>
      {localStorage.getItem("noList") === "true" || !hasList ? null : (
        <Button
          danger
          onClick={() => {
            deleteUserList((value: any) => setHasList(value));
          }}
        >
          Deletar lista
        </Button>
      )}
    </ul>
  );

  return (
    <Navbar className="bg-black py-2 px-4 lg:px-8 lg:py-4 border-transparent">
      <div className="flex items-center justify-between">
        <Link to="/home">
          <MainTitle />
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </MobileNav>
    </Navbar>
  );
};
