import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, getMovies } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";

export const Movies=()=> {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.movieCode.movies);
  const genres = useSelector((state) => state.movieCode.genres);
  const genresLoaded = useSelector((state) => state.movieCode.genresLoaded);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  
  useEffect(() => {
    if (genresLoaded) {
      dispatch(getMovies({ genres, type: "movie" }));
    }
  }, []);



  const [user, setUser] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  window.onscroll = () => {
  setIsScrolled(window.scrollY !== 0 ? true : false);
  console.log(window.scrollY +""+isScrolled);
  return () => (window.onscroll = null);
};

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
      <label>Select genre: </label>
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
     
    label{
    font-weight: bolder;
    display: block;
    }
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
