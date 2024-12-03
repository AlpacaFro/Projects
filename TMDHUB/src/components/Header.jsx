import React from 'react'
import { Link } from 'react-router-dom'

//tailwind consts
const headerStyle = 'fixed  top-0  w-full  bg-gray-900 h-12 text-white flex items-center  md:px-4 shadow-md z-50 justify-between'
const navContainers = 'flex flex-row gap-2 '
const buttons = 'block rounded-2xl text-2xl mr-4 p-1 max-h-10 font-semibold  hover:tracking-widest transition-all text-xl'

const Header = () => {
  return (
    <div className={headerStyle} >
      <Link to='/'  className='flex flex-row '>
      <img src="/popcorn.svg  "  className='max-w-10 '  />
      <p className='text-l md:text-3xl  hover:tracking-widest transition-all  '>TMD<span className='text-yellow-500' >B</span>-HU<span className='text-yellow-500' >B</span></p>
      </Link>
      <Link className={navContainers}>
        <label htmlFor="search" className='text-3xl '>🔎</label>
        <input type="text" name="search" id="search" placeholder='Movie name...' className='rounded-2xl bg-blue-950 p-2 w-80   '  />
        </Link>
      <div className={`${navContainers} `}> 
        <Link to='/favorites' className={`text-fuchsia-400 ${buttons}`}>FAVORITES</Link>
        <Link to='/about' className={`text-yellow-500 ${buttons}`}>ABOUT</Link>
      </div>
    </div>
  )
}

export default Header
