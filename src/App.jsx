import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Project from "./pages/Project.jsx";
import ScrollToTop from "./helpers/ScrollTotTop.jsx";

import Header from "./components/Header.jsx";
import { projectData } from "../data/project.js";

function Home() {
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [isClosingAboutMe, setIsClosingAboutMe] = useState(false);
  const [isClosingContacts, setIsClosingContacts] = useState(false);

  const [isAnimatingAboutMe, setIsAnimatingAboutMe] = useState(false);
  const [isAnimatingContacts, setIsAnimatingContacts] = useState(false);

  const contactsRef = useRef(null);
  const aboutRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (showAboutMe) {
      requestAnimationFrame(() => setIsAnimatingAboutMe(true));
    } else {
      setIsAnimatingAboutMe(false);
    }
  }, [showAboutMe]);

  useEffect(() => {
    if (showContacts) {
      requestAnimationFrame(() => setIsAnimatingContacts(true));
    } else {
      setIsAnimatingContacts(false);
    }
  }, [showContacts]);

  const closeModal = (type) => {
    if (type === "about") {
      setIsClosingAboutMe(true);
      setTimeout(() => {
        setShowAboutMe(false);
        setIsClosingAboutMe(false);
      }, 300);
    }

    if (type === "contacts") {
      setIsClosingContacts(true);
      setTimeout(() => {
        setShowContacts(false);
        setIsClosingContacts(false);
      }, 300);
    }
  };

  const toggleModal = (type) => {
    const isAbout = type === "about";

    const isOpen = isAbout ? showAboutMe : showContacts;
    const otherOpen = isAbout ? showContacts : showAboutMe;

    const openCurrent = () => {
      if (isAbout) setShowAboutMe(true);
      else setShowContacts(true);
    };

    const closeOther = () => {
      if (isAbout) {
        setIsClosingContacts(true);
        setTimeout(() => {
          setShowContacts(false);
          setIsClosingContacts(false);
        }, 300);
      } else {
        setIsClosingAboutMe(true);
        setTimeout(() => {
          setShowAboutMe(false);
          setIsClosingAboutMe(false);
        }, 300);
      }
    };

    if (isOpen) {
      closeModal(type);
    } else {
      if (otherOpen) {
        closeOther();
        setTimeout(openCurrent, 350);
      } else {
        openCurrent();
      }
    }
  };

  const useClickOutside = (ref, isOpen, onClose) => {
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, ref, onClose]);
  };

  useClickOutside(contactsRef, showContacts, () => closeModal("contacts"));
  useClickOutside(aboutRef, showAboutMe, () => closeModal("about"));

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-hidden font-regular relative">
      <div className="w-[1440px] px-[6%]">
        <Header projectData={projectData} />

        <main className="pt-[340px]">
          <ul className="w-fit text-[32px] leading-8 font-normal flex flex-col gap-y-4">
            <li>
              <button
                className={`cursor-pointer transition-colors duration-200 hover:text-[#FF0000E5]/90 ${
                  showAboutMe ? "text-[#FF0000E5]" : ""
                }`}
                onClick={() => toggleModal("about")}
              >
                About Me
              </button>
            </li>
            <li>
              <button
                className={`cursor-pointer transition-colors duration-200 hover:text-[#FF0000E5]/90 ${
                  showContacts ? "text-[#FF0000E5]" : ""
                }`}
                onClick={() => toggleModal("contacts")}
              >
                Contacts
              </button>
            </li>
          </ul>

          <p className="font-normal text-[40px] leading-12 mt-[188px]">
            I am a graphic designer specializing on brand identity,
            <br /> packaging, and social media design.
          </p>
        </main>

        {/* Модальное окно About Me */}
        {(showAboutMe || isClosingAboutMe) && (
          <>
            {/* Модальное окно с анимацией справа */}
            <div
              className={`fixed flex flex-col top-6 right-[20%] z-60 bg-white pl-7 pr-11 py-5 border transition-transform duration-300 ease-out ${
                isClosingAboutMe
                  ? "translate-x-full"
                  : isAnimatingAboutMe
                    ? "translate-x-0"
                    : "translate-x-full"
              }`}
              style={{
                width: "595px",
                height: "842px",
                maxWidth: "90vw",
                maxHeight: "90vh",
                overflow: "auto",
              }}
              ref={aboutRef}
            >
              <div className="*:text-base *:font-normal w-fit flex flex-col *:leading-5">
                <p>Sveta Magayaeva</p>
                <p className="text-[#999999E5]">Graphic Designer</p>
                <p className="text-[#999999E5] flex">20/06/2001</p>
              </div>

              <p className="text-[14px] font-normal leading-4 mt-9 ml-4">
                Я графический дизайнер с сильным интересом к визуальному
                <br />
                искусству и стремлением создавать уникальные
                <br />и запоминающиеся дизайны. Cтремлюсь изучать новые тренды
                <br />и техники в дизайне, чтобы постоянно совершенствоваться
                <br />и предлагать клиентам лучшее. Быстро обучаюсь и открыта
                новому
                <br /> опыту, что помогает мне развиваться как специалисту.
              </p>

              <div className="text-base font-normal mt-7">
                <p className="custom-underline leading-4 uppercase mb-2">
                  Образование
                </p>
                <ul className="thin-disc ml-4">
                  <li>
                    BANG BANG EDUCATION профессиональная переподготовка
                    специальность "Графический дизайн". 2024 по н.в.
                  </li>
                  <li>Курс Design Wonderland Графический дизайнер 2024 г.</li>
                  <li>
                    Курс Design Wonderland Стратегия и дизайн социальных сетей
                    2025 г.
                  </li>
                  <li>Курс Design Wonderland Нейросети 2025 г.</li>
                </ul>
              </div>

              <div className="text-base font-normal mt-5">
                <p className="custom-underline leading-4 uppercase mb-2">
                  Навыки
                </p>
                <ul className="thin-disc ml-4">
                  <li>After Effects</li>
                  <li>Photoshop</li>
                  <li>InDesign</li>
                  <li>Figma</li>
                  <li>Ilustrator</li>
                  <li>Modern graphical AIs</li>
                </ul>
              </div>

              <div className="flex w-full font-normal self-end justify-between mt-auto">
                <div className="flex-col">
                  <p>+7 938 029 28 17</p>
                  <p>S.magayaeva@mail.ru</p>
                </div>
                <button
                  onClick={() => closeModal("about")}
                  className="absolute bottom-8 right-[6%] text-[20px] cursor-pointer font-normal hover:underline transition-colors duration-200"
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
            ref={contactsRef}
            className={`absolute bottom-10 w-[1076px] h-[366px] bg-white z-40 border transition-all duration-300 ease-out ${
              isClosingContacts
                ? "translate-y-full"
                : isAnimatingContacts
                  ? "translate-y-0"
                  : "translate-y-full"
            }`}
            style={{
              height: "360px",
            }}
          >
            <div className="flex w-full h-full pt-16 px-[6%] relative">
              {/* LINKS */}
              <div className="flex text-2xl font-normal">
                <span>links</span>
                <span className="inline-block w-[80px] h-px bg-black align-middle mx-4 mt-4.5" />
                <ul className="flex flex-col">
                  <li>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:text-[#1769FF]"
                    >
                      behance
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:text-[#0088CC]"
                    >
                      telegram
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="transition-all duration-300 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] bg-[length:0%_100%] bg-no-repeat bg-clip-text text-black hover:bg-[length:100%_100%] hover:text-transparent"
                    >
                      instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:s.magayaeva@mail.ru"
                      className="transition-colors duration-200 hover:text-[#EA4335]/80"
                    >
                      e-mail
                    </a>
                  </li>
                </ul>
              </div>

              {/* ACTION */}
              <div className="flex ml-[66px] text-[24px] font-normal leading-none relative">
                <p className="text-2xl">
                  action
                  <span className="inline-block w-[150px] h-px bg-black align-middle mx-6" />
                  big goals can be achieved
                  <br />
                  by taking small steps. Let's take that step together and watch
                  it
                  <br />
                  grow into something great.
                </p>
              </div>

              {/* CLOSE */}
              <button
                onClick={() => closeModal("contacts")}
                className="absolute cursor-pointer bottom-8 right-[6%] text-[20px] font-normal hover:underline transition-colors duration-200"
              >
                close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
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
  );
}
