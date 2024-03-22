import React from 'react'
import Card from './Card'
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRef, useState } from 'react';

export default function ({data,title}) {
    const listRef = useRef();
    const [sliderPosition, setSliderPosition] = useState(0);
    const [showControls, setShowControls] = useState(false);


    const handleDirection = (direction) => {
        const cardWidth = 230; // Assuming each card has a width of 230px
        const moveDistance = cardWidth + 25; // Total distance to move including padding/margin
        let distance = 0;
      
        if (direction === "left" && sliderPosition > 0) {
          distance = (sliderPosition - 1) * moveDistance;
          listRef.current.style.transform = `translateX(-${distance}px)`;
          setSliderPosition(sliderPosition - 1);
        }
      
        if (direction === "right" && sliderPosition < 4) {
          distance = (sliderPosition + 1) * moveDistance;
          listRef.current.style.transform = `translateX(-${distance}px)`;
          setSliderPosition(sliderPosition + 1);
        }
      };
  return (
    <Container
      className="flex column"
      showControls={showControls}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="slider flex" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
        
  )
}

const Container = styled.div`
  
  position: relative;
  padding:0;
  margin:10px;
  
  
  .wrapper {
    .slider {
      width: max-content;
      gap: 10px;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 120%;
      top: 0;
      bottom: 0;
      width: 40px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
      svg:hover {font-size: 2.5rem;}
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;
