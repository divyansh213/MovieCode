import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Login} from './pages/Login'
import {Signup} from './pages/Signup'
import {Player} from './pages/Player'
import {TVShows} from './pages/TVShows'
import {MovieCode} from './pages/MovieCode'
import {Movies} from './pages/Movies'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/" element={<MovieCode />} />
      </Routes>
    </BrowserRouter>
  )
  
}
