import 
{configureStore,createAsyncThunk,
 createSlice,original
} from '@reduxjs/toolkit'
import axios from "axios"
import {API_KEY, TMDB_BASE_URL} from '../utils/constant'

const initialState={
    movies:[],
    genresLoaded:false,
    genres:[]
};


const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
        });
    });
  };
  

const getRawData = async (api, genres, paging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 40 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(results, moviesArray, genres);
    }
    
    return moviesArray;
  };

export const getGenres=createAsyncThunk("movieCode/genres",async()=>{
    const {data:{genres}}=await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
   
    return genres;
})

export const getMovies=createAsyncThunk("movieCode/movies",async({type},thunkApi)=>{
   const {movieCode:{genres}}=thunkApi.getState();
   const data= getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
   genres,
   true);
   return data;
  
});

export const fetchDataByGenre = createAsyncThunk(
  "movieCode/moviesByGenres",
  async ({ genre, type }, thunkAPI) => {
    const {
      movieCode: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);


const movieCodeslice = createSlice(
    {
        name:"MovieCode",
        initialState,
        extraReducers:(builder)=>{
            builder.addCase(getGenres.fulfilled,(state,action)=>{
                state.genres=action.payload;
                state.genresLoaded=true;
            });
            builder.addCase(getMovies.fulfilled,(state,action)=>{
                state.movies=action.payload;
            });
            builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
              state.movies = action.payload;
            });
        },
    }
);

export const store=configureStore({
    reducer:{
        movieCode: movieCodeslice.reducer,
    }

})
export const { setGenres, setMovies } = movieCodeslice.actions;