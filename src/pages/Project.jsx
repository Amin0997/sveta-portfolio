import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Carousel from "./works/Carousel";
import Header from "../components/Header";
import { projectData } from "../../data/project";

export default function Project() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const projectsArray = Object.entries(projectData);
  const currentIndex = projectsArray.findIndex(([key]) => key === slug);

  const currentProject = projectData[slug];
  const meta = currentProject || {
    title: slug,
    color: "#D1D1D1",
    folder: slug,
  };

  const prevProject = projectsArray[currentIndex - 1];
  const nextProject = projectsArray[currentIndex + 1];

  const prev = prevProject ? prevProject[1] : null;
  const next = nextProject ? nextProject[1] : null;

  const folderName = meta.folder;

  // картинки текущего проекта
  const allCarouselImages = import.meta.glob(
    "/src/pages/works/*/carousel/*.{png,jpg,jpeg,svg}",
    { eager: true },
  );
  const allCoverImages = import.meta.glob("/src/pages/works/*/cover.png", {
    eager: true,
  });

  const coverImageKey = Object.keys(allCoverImages).find((path) =>
    path.includes(`/works/${folderName}/`),
  );
  const coverImage = coverImageKey
    ? allCoverImages[coverImageKey].default
    : null;

  const carouselImages = Object.keys(allCarouselImages)
    .filter((path) => path.includes(`/works/${folderName}/`))
    .map((path) => ({
      src: allCarouselImages[path].default,
      alt: `Carousel image for ${meta.title}`,
    }));

  // =========================
  // Preload следующего проекта
  // =========================
  useEffect(() => {
    if (next) {
      const nextFolder = next.folder;
      const nextImages = Object.keys(allCarouselImages)
        .filter((path) => path.includes(`/works/${nextFolder}/`))
        .map((path) => allCarouselImages[path].default);

      nextImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });

      // preload cover
      const nextCoverKey = Object.keys(allCoverImages).find((path) =>
        path.includes(`/works/${nextFolder}/`),
      );
      if (nextCoverKey) {
        const img = new Image();
        img.src = allCoverImages[nextCoverKey].default;
      }
    }
  }, [next, allCarouselImages, allCoverImages]);

  return (
    <div className="flex min-h-screen w-full flex-col px-[6%] pt-[120px] font-montserrat font-semibold items-center">
      {/* HEADER */}
      <Header
        mode="project"
        activeColor={meta.color}
        prevProject={prev}
        nextProject={next}
      />

      {/* CAROUSEL */}
      {carouselImages.length > 0 && (
        <div className="flex justify-center w-full">
          <div className="w-[1296px] h-[730px]">
            <Carousel images={carouselImages} />
          </div>
        </div>
      )}

      {/* COVER */}
      {coverImage && (
        <div className="flex justify-center my-16">
          <img src={coverImage} alt="" />
        </div>
      )}
    </div>
  );
}