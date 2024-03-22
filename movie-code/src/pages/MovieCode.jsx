import React, { useEffect, useState } from 'react'
import {styled} from 'styled-components'
import Navbar from '../components/Navbar'
import backgroundImage from "../assets/home.jpg";
import { FaPlay } from 'react-icons/fa';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import MovieLogo from "../assets/homeTitle.webp";
import {useDispatch, useSelector} from 'react-redux'
import { getGenres, getMovies } from '../store';
import Slider from '../components/Slider';

export const MovieCode=()=> {
  

 const [isScrolled,setIsScrolled]=useState(false);
 const navigate=useNavigate();
 window.onscroll = () => {
  setIsScrolled(window.scrollY !== 0 ? true : false);
  console.log(window.scrollY +""+isScrolled);
  return () => (window.onscroll = null);
};

const dispatch=useDispatch();

useEffect(()=>{dispatch(getGenres())},[]);
const genresLoaded= useSelector((state)=>state.movieCode.genresLoaded);

useEffect(()=>{if(genresLoaded) dispatch(getMovies({type:'all'}))}, [genresLoaded])
const movies= useSelector((state)=> state.movieCode.movies);
console.log(movies)

  return (
    <Container>
    <Navbar isScrolled={isScrolled}/>
   <div className="background-image">
 
    <img
          src={backgroundImage}
          alt="background"
        />


   <div className='content'>
<div className='logo'>
<img 
          src={MovieLogo}
          alt="Logo"
        />

<div className='buttons'>
   <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className=" buttons flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
            </div>
</div>
</div>
</div>
<Slider movies={movies}></Slider>
    </Container>
  )
}

const Container=styled.div`
background-color:black;
position: relative;
top:0;
left:0;

.background-image{
  filter: brightness(80%);
    img {
    height: 70vh;
    width: 100vw;
  }
.content{
  position: absolute;
      bottom: 10rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 1rem;
         
        }
        .buttons{
          font-size: 1rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 1rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          :hover {
            opacity: .5;
           
            font-size: 1.2rem;
          }
          &:nth-of-type(2) {
           
            color: black;
           
          }
        

  }
      }
  
 
  

  }
}
`