import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Project from './pages/Project.jsx'

function Home() {
  const projectData = {
    'The flex': {
      preview: '/src/pages/works/TheFlex/preview.jpg',
      link: '/works/the-flex',
      color: '#0F7FA6'
    },
    'little minds': {
      preview: '/src/pages/works/LittleMinds/preview.jpg',
      link: '/works/little-minds',
      color: '#ED582E'
    },
    'Meraki': {
      preview: '/src/pages/works/Meraki/preview.jpg',
      link: '/works/meraki',
      color: '#7D002D'
    },
    'Karachaevsk': {
      preview: '/src/pages/works/Karachaevsk/preview.jpg',
      link: '/works/karachaevsk',
      color: '#76992E'
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col px-[6%] overflow-x-hidden font-montserrat font-semibold">
      <header className='w-full pt-8'>
        <nav className="flex justify-between items-center text-[32px] sticky top-0 bg-white z-10">
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
          *:transition-all *:ease-in-out'>
          {Object.entries(projectData).map(([name, data]) => (
            <li 
              key={name}
              className={`relative group py-4 duration-0 hover:text-[${data.color}]`}
            >
              <Link 
                to={data.link}
                className="block w-full transition-all duration-300 ease-in-out hover:scale-105 border-b-3 border-black"
              >
                {name}
              </Link>

              {/* Preview для каждого элемента */}
              <Link
                to={data.link}
                className="absolute right-0 top-1/4 transform -translate-y-1/2 w-[310px] h-[170px] rounded-lg overflow-hidden shadow-lg 
                transition-all duration-100 ease-in-out opacity-0 invisible scale-95
                group-hover:opacity-100 group-hover:visible group-hover:scale-100 hover:scale-105 z-20"
              >
                <img
                  src={data.preview}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </Link>
            </li>
          ))}
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
      <Route path="/works/:slug" element={<Project />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}