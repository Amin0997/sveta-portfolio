import './App.css'
import { useState } from 'react'

function App() {
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
    <div className="flex h-screen w-full px-[318px] flex-col
      font-montserrat font-semibold">
      <header className='w-full'>
        <nav className="flex justify-between items-center mt-8 text-[32px]">
          <a href="##">
            <h1 className=''>Света Магаяева</h1>
          </a>
          <ul className='flex gap-x-[58px]'>
            <li><a href="#">Работы</a></li>
            <li><a href="#">Контакты</a></li>
          </ul>
        </nav>

        <h2 className='w-7xl text-[64px] my-60 whitespace-pre-line'>
          {`Я графический дизайнер, специализирующийся 
          на фирменном стиле, упаковке 
          и дизайне социальных сетей.`}
        </h2>

        <div className="w-7xl h-96 bg-red-100 mb-52"></div>
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
            The flex
          </li>
          <li 
            className='hover:text-[#ED582E] relative'
            onMouseEnter={(e) => handleMouseEnter('little mind', e)}
            onMouseLeave={handleMouseLeave}
          >
            little mind
          </li>
          <li 
            className='hover:text-[#7D002D] relative'
            onMouseEnter={(e) => handleMouseEnter('Meraki', e)}
            onMouseLeave={handleMouseLeave}
          >
            Meraki
          </li>
          <li 
            className='hover:text-[#76992E] relative'
            onMouseEnter={(e) => handleMouseEnter('Karachaevsk', e)}
            onMouseLeave={handleMouseLeave}
          >
            Karachaevsk
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

      <footer className='mt-52 flex-row flex items-center text-[32px] pb-[150px]'>
        <p>links</p>
        <div className='w-20 h-[3px] bg-black rounded-full mx-8'/>
        <ul className='flex flex-row items-center justify-between w-full'>
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

export default App
