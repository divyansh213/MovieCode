import React from 'react'
import CardSlider from './CardSlider'
import {styled} from 'styled-components'
export default  function Slider({movies}) {
 
   const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to)
      };
      return (
        <Container>
          <CardSlider data={getMoviesFromRange(0, 10)} title="Trending Now" />
          <CardSlider data={getMoviesFromRange(10, 20)} title="New Releases" />
          <CardSlider data={getMoviesFromRange(20, 30)} title="Blockbuster Movies" />
          <CardSlider data={getMoviesFromRange(30, 40)} title="Action Movies" />
        </Container>
      );
      }
    
    const Container = styled.div``;
  
