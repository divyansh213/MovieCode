import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
import video from "../assets/production_id_4842504 (2160p).mp4";

export default function ({ index, movieData, isLiked = false }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      
    } else navigate("/login");
  });
  

  return (
    <Container
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <img
      src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
      alt="card"
      onClick={() => navigate("/player")}
    />

    {isHovered && (
      <div className="hover">
        <div className="image-video-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
            alt="card"
            onClick={() => navigate("/player")}
          />
          <video
            src={video}
            autoPlay={true}
            loop
            muted
            onClick={() => navigate("/player")}
          />
        </div>
        <div className="info-container flex column">
          <h3 className="name" onClick={() => navigate("/player")}>
            {movieData.name}
          </h3>
          <div className="icons flex j-between">
            <div className="controls flex">
              <IoPlayCircleSharp
                title="Play"
                onClick={() => navigate("/player")}
              />
              <RiThumbUpFill title="Like" />
              <RiThumbDownFill title="Dislike" />
              
            </div>
            <div className="info">
              <BiChevronDown title="More Info" />
            </div>
          </div>
          <div className="genres flex">
            <ul className="flex">
              {movieData.genres.map((genre) => (
                <li  key={genre}>{genre}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )}
  </Container>
);
}
const Container = styled.div`
  max-width: 245px;
  width: 245px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 9;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -15vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 1) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.6rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;