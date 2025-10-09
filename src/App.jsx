import './App.css'
import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Project from './pages/Project.jsx'
import TheFlex from './pages/works/TheFlex/TheFlex.jsx'
import LittleMind from './pages/works/LittleMind/LittleMind.jsx'
import Meraki from './pages/works/Meraki/Meraki.jsx'
import Karachaevsk from './pages/works/Karachaevsk/Karachaevsk.jsx'

function Home() {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [hoveredElement, setHoveredElement] = useState(null)

  const handleMouseEnter = (item, event) => {
    setHoveredItem(item)
    setHoveredElement(event.currentTarget)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
    setHoveredElement(null)
  }

  return (
    <div className="flex h-screen w-full flex-col px-[6%]
      font-montserrat font-semibold">
      <header className='w-full'>
        <nav className="flex justify-between items-center mt-8 text-[32px]">
          <Link to="/">
            <h1 className=''>Света Магаяева</h1>
          </Link>
          <ul className='flex gap-x-[58px] font-normal text-[24px]'>
            <li><a href="#">Мои работы</a></li>
            <li><a href="#">Контакты</a></li>
          </ul>
        </nav>

        <h2 className='w-7xl text-[50px] mt-[430px] mb-[350px] whitespace-pre-line'>
          {`Я графический дизайнер, 
          специализирующийся на фирменном стиле, 
          упаковке и дизайне социальных сетей.`}
        </h2>
        
        <h2 className='text-[90px] mb-25 text-[#D1D1D1] leading-14 font-semibold'>
          ALL PROJECTS
          <span className='block text-[26px] font-bold'>(THAT I LIKE)</span>
        </h2>
        
      </header>

      <main className="relative">
        <ul className='text-[90px] uppercase cursor-pointer 
        [&>li]:border-b-3 [&>li]:border-black
          *:transition-all *:duration-300 *:ease-in-out *:hover:scale-105 *:hover:opacity-80'>
          <li 
            className='hover:text-[#0F7FA6] relative'
            onMouseEnter={(e) => handleMouseEnter('The flex', e)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/works/the-flex">The flex</Link>
          </li>
          <li 
            className='hover:text-[#ED582E] relative'
            onMouseEnter={(e) => handleMouseEnter('little mind', e)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/works/little-mind">little mind</Link>
          </li>
          <li 
            className='hover:text-[#7D002D] relative'
            onMouseEnter={(e) => handleMouseEnter('Meraki', e)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/works/meraki">Meraki</Link>
          </li>
          <li 
            className='hover:text-[#76992E] relative'
            onMouseEnter={(e) => handleMouseEnter('Karachaevsk', e)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/works/karachaevsk">Karachaevsk</Link>
          </li>
          {/* Всплывающий div */}
          {hoveredItem && hoveredElement && (
            <div
              className="absolute bg-red-100 rounded-lg pointer-events-none"
              style={{
                right: 0,
                top: -50,
                width: '310px',
                height: '170px',
                transform: `translateY(${hoveredElement.offsetTop}px)`
              }}
            >
            </div>
          )}
        </ul>
      </main>

      <footer className='mt-52 flex-row flex items-center text-[32px] pb-[100px]'>
        <ul className='flex flex-row items-center justify-between w-full font-normal'>
          <li>
            <a href="##">behance</a>
          </li>
          <li>
            <a href="##">telegram</a>
          </li>
          <li>
            <a href="##">instagram</a>
          </li>
          <li>
            <a href="##">e-mail</a>
          </li>
        </ul>
      </footer>

    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<Project />} />
      <Route path="/works/the-flex" element={<TheFlex />} />
      <Route path="/works/little-mind" element={<LittleMind />} />
      <Route path="/works/meraki" element={<Meraki />} />
      <Route path="/works/karachaevsk" element={<Karachaevsk />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
