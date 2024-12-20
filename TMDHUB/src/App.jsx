import React,{useState,useEffect} from 'react'
import './App.css'
import Header from './components/Header'
import Trending from './components/Trending'
import { BrowserRouter,Route, Routes,} from 'react-router-dom'
import Favorites from './components/Favorites'
import About from './components/About'
import Movies from './components/Movies'
import Movie from './components/Movie'

function App() {
 
  
  const [count, setCount] = useState(0)



  return (
    <>
    <BrowserRouter >
    <Header /> {/* Keeping Header on all of the sites */}
    <Routes>
      <Route path='/' element={
        <div>
        <Trending />
        <Movies />
        </div>
        } /> {/*Home*/}
      <Route path='/favorites' element={<Favorites />} /> {/*Favorites*/}
      <Route path='/about' element={<About />} /> {/*About*/}
      <Route path='/movie/:id' element={<Movie />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
