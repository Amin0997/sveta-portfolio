import { useState, useEffect } from 'react';
import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Project from './pages/Project.jsx'
import ScrollToTop from './helpers/ScrollTotTop.jsx'

import theFlexPreview from './pages/works/TheFlex/preview.jpg'
import littleMindsPreview from './pages/works/LittleMinds/preview.jpg'
import merakiPreview from './pages/works/Meraki/preview.jpg'
import karachaevskPreview from './pages/works/Karachaevsk/preview.jpg'

function Home() {
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [isClosingAboutMe, setIsClosingAboutMe] = useState(false);
  const [isClosingContacts, setIsClosingContacts] = useState(false);
  
  const [isAnimatingAboutMe, setIsAnimatingAboutMe] = useState(false);
  const [isAnimatingContacts, setIsAnimatingContacts] = useState(false);
  
  const projectData = {
    'The flex': {
      preview: theFlexPreview,
      link: '/works/the-flex',
      color: '#0F7FA6'
    },
    'little minds': {
      preview: littleMindsPreview,
      link: '/works/little-minds',
      color: '#ED582E'
    },
    'Meraki': {
      preview: merakiPreview,
      link: '/works/meraki',
      color: '#7D002D'
    },
    'Karachaevsk': {
      preview: karachaevskPreview,
      link: '/works/karachaevsk',
      color: '#76992E'
    }
  }

  // Анимация для About Me
  useEffect(() => {
    if (showAboutMe) {
      requestAnimationFrame(() => {
        setIsAnimatingAboutMe(true);
      });
    } else {
      setIsAnimatingAboutMe(false);
    }
  }, [showAboutMe]);

  // Анимация для Contacts
  useEffect(() => {
    if (showContacts) {
      requestAnimationFrame(() => {
        setIsAnimatingContacts(true);
      });
    } else {
      setIsAnimatingContacts(false);
    }
  }, [showContacts]);

  const handleToggleAboutMe = () => {
    if (showAboutMe) {
      // Закрываем About Me
      setIsClosingAboutMe(true);
      setTimeout(() => {
        setShowAboutMe(false);
        setIsClosingAboutMe(false);
      }, 300);
    } else {
      // Открываем About Me
      if (showContacts) {
        // Закрываем Contacts если он открыт
        setIsClosingContacts(true);
        setTimeout(() => {
          setShowContacts(false);
          setIsClosingContacts(false);
          // Открываем About Me после закрытия Contacts
          setTimeout(() => {
            setShowAboutMe(true);
          }, 50);
        }, 300);
      } else {
        setShowAboutMe(true);
      }
      setIsClosingAboutMe(false);
    }
  }

  const handleToggleContacts = () => {
    if (showContacts) {
      // Закрываем Contacts
      setIsClosingContacts(true);
      setTimeout(() => {
        setShowContacts(false);
        setIsClosingContacts(false);
      }, 300);
    } else {
      // Открываем Contacts
      if (showAboutMe) {
        // Закрываем About Me если он открыт
        setIsClosingAboutMe(true);
        setTimeout(() => {
          setShowAboutMe(false);
          setIsClosingAboutMe(false);
          // Открываем Contacts после закрытия About Me
          setTimeout(() => {
            setShowContacts(true);
          }, 50);
        }, 300);
      } else {
        setShowContacts(true);
      }
      setIsClosingContacts(false);
    }
  }

  const handleCloseAboutMe = () => {
    setIsClosingAboutMe(true);
    setTimeout(() => {
      setShowAboutMe(false);
      setIsClosingAboutMe(false);
    }, 300);
  }

  const handleCloseContacts = () => {
    setIsClosingContacts(true);
    setTimeout(() => {
      setShowContacts(false);
      setIsClosingContacts(false);
    }, 300);
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden font-Baskervville font-regular relative">
      <div className='w-[1440px] px-[6%]'>
      <header className='w-full pt-8 flex items-start justify-between'>
        <nav className="flex justify-between items-center text-[32px] leading-8 sticky top-0 bg-white z-10">
          <Link to="/">
            <h1 className='font-bold'>Sveta Magayaeva</h1>
            <h2 className='text-[#999999E5] font-normal'>Graphic designer</h2>
          </Link>
        </nav>
        <ul className='flex font-normal text-[32px] flex-col mr-[38%] leading-8 gap-y-4'>
          {Object.entries(projectData).map(([name, data]) => (
            <li key={name}>
              <Link 
                to={data.link}
                className={`hover:underline hover:${data.color}`}

                onMouseEnter={(e) => {
                  e.currentTarget.style.color = data.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '';
                }}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      <main className="relative mt-24">
        <ul className='w-fit text-[32px] leading-8 font-normal flex flex-col gap-y-4'>
          <li>
            <button 
              className='cursor-pointer hover:text-[#FF0000E5]/90 transition-colors duration-200'
              onClick={handleToggleAboutMe}
            >
              About me
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer hover:text-[#FF0000E5]/90 transition-colors duration-200"
              onClick={handleToggleContacts}
            >
              Contacts
            </button>
          </li>
        </ul>

        <p className='font-normal text-[40px] leading-12 mt-[188px]'>
          I am a graphic designer specializing on brand identity, 
          <br /> packaging, and social media design.
        </p>

      </main>

      {/* Модальное окно About Me */}
      {(showAboutMe || isClosingAboutMe) && (
        <>
          {/* Затемнение фона */}
          <div 
            className={`fixed inset-0 bg-black/20 z-30 transition-opacity duration-300 ${
              isClosingAboutMe ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={handleCloseAboutMe}
          />
          
          {/* Модальное окно с анимацией справа */}
          <div 
            className={`fixed flex flex-col top-6 right-[17.7%] z-40 bg-white pl-7 pr-11 py-5 border transition-transform duration-300 ease-out ${
              isClosingAboutMe ? 'translate-x-full' : 
              isAnimatingAboutMe ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
              width: '595px',
              height: '842px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
          >
            <div className='*:text-base *:font-normal w-fit flex flex-col gap-y-2 *:leading-4'>
              <p>Sveta Magayaeva</p>
              <p className='text-[#999999E5]'>Graphic designer</p>
              <p className='text-[#999999E5] flex'>20/06/2001 <span className='ml-auto'>24</span></p>
            </div>

            <p className='text-base font-normal leading-4.5 mt-11'>
              Graphic designer с сильным интересом к визуальному искусству 
              <br/>и стремлением создавать уникальные и запоминающиеся дизайны. 
              <br/>Я стремлюсь изучать новые тренды и техники в дизайне,
              <br/>чтобы постоянно совершенствоваться и предлагать клиентам лучшее.
              <br/>Быстро обучаюсь и открыта новому опыту, что помогает 
              <br/>мне развиваться как специалисту.
            </p>

            <div className='text-base font-normal mt-8'>
              <p className=' underline uppercase mb-2'>Образование</p>
              <ul className=' list-disc ml-7'>
                <li>Bang Bang Education профессиональная переподготовка специальность "Графический дизайн". 2024 по н.в.</li>
                <li>Курс Design Wonderland Графический дизайнер 2024 г.</li>
                <li>Курс Design Wonderland Стратегия и дизайн социальных сетей 2025 г.</li>
                <li>Курс Design Wonderland Нейросети 2025 г.</li>
              </ul>
            </div>

            <div className='text-base font-normal mt-8'>
              <p className=' underline uppercase mb-2'>Навыки</p>
              <ul className=' list-disc ml-7'>
                <li>Ilustrator</li>
                <li>InDesign</li>
                <li>Photoshop</li>
                <li>Midjorney</li>
                <li>Figma</li>
                <li>After Effects</li>
              </ul>
            </div>

            <div className='flex w-full font-normal self-end justify-between mt-auto'>
              <div className='flex-col'>
                <p>+7 938 029 28 17</p>
                <p>S.magayaeva@mail.ru</p>
              </div>
              <button
                onClick={handleCloseAboutMe}
                className="absolute bottom-8 right-[6%] text-[20px] font-normal hover:underline transition-colors duration-200"
              >
                close
              </button>
            </div>
          </div>
        </>
      )}

      {/* Модальное окно Contacts */}
      {(showContacts || isClosingContacts) && (
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white z-40 border-t transition-all duration-300 ease-out ${
            isClosingContacts ? 'translate-y-full' : 
            isAnimatingContacts ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ 
            height: '360px'
          }}
        >
          <div className="flex w-full h-full pt-16 px-[6%] relative">

            {/* LINKS */}
            <div className="flex text-[20px] leading-6 font-normal">
              <span>links</span>
              <div className='w-20 border h-0.5 mt-3 mx-5'/>
              <ul className="flex flex-col gap-y-2">
                <li>
                  <a href="#" className="hover:underline transition-colors duration-200 text-[#1769FF] hover:text-[#1769FF]/80">
                    behance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline transition-colors duration-200 text-[#0088CC] hover:text-[#0088CC]/80">
                    telegram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline transition-colors duration-200 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] bg-clip-text text-transparent">
                    instagram
                  </a>
                </li>
                <li>
                  <a href="mailto:s.magayaeva@mail.ru" className="hover:underline transition-colors duration-200 text-[#EA4335] hover:text-[#EA4335]/80">
                    e-mail
                  </a>
                </li>
              </ul>
            </div>

            {/* ACTION */}
            <div className="flex gap-x-10 ml-[160px] text-[20px] leading-6 font-normal max-w-[485px] relative">
              <p className='text-2xl leading-8'>
                <span className='mr-43'>action</span>
                <div className='w-32 absolute border h-0.5 top-4 left-20'/>
                big goals can be achieved 
                <br/>by taking small steps. Let's take that step together
                <br/>and watch it grow into something great.
              </p>
            </div>

            {/* CLOSE */}
            <button
              onClick={handleCloseContacts}
              className="absolute bottom-8 right-[6%] text-[20px] font-normal hover:underline transition-colors duration-200"
            >
              close
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works/:slug" element={<Project />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}