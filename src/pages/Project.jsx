import { Link, useParams } from 'react-router-dom';
import Carousel from './works/Carousel';

// Импортируем все изображения
const allCarouselImages = import.meta.glob('/src/pages/works/*/carousel/*.{png,jpg,jpeg,svg}', { eager: true });
const allCoverImages = import.meta.glob('/src/pages/works/*/cover.png', { eager: true });

// Мета-инфо + маппинг slug → имя папки
const projectMeta = {
  'the-flex': { title: 'The flex', color: '#0F7FA6', folder: 'TheFlex' },
  'little-minds': { title: 'little minds', color: '#ED582E', folder: 'LittleMinds' },
  'meraki': { title: 'Meraki', color: '#7D002D', folder: 'Meraki' },
  'karachaevsk': { title: 'Karachaevsk', color: '#76992E', folder: 'Karachaevsk' },
};

export default function Project() {
  const { slug } = useParams();
  const meta = projectMeta[slug] || { title: slug, color: '#D1D1D1', folder: slug };

  const folderName = meta.folder;

  // Находим cover.png
  const coverImageKey = Object.keys(allCoverImages).find(path =>
    path.includes(`/works/${folderName}/`)
  );
  const coverImage = coverImageKey ? allCoverImages[coverImageKey].default : null;

  // Находим изображения для карусели
  const carouselImages = Object.keys(allCarouselImages)
    .filter(path => path.includes(`/works/${folderName}/`))
    .map(path => ({
      src: allCarouselImages[path].default,
      alt: `Carousel image for ${meta.title}`,
    }));

  return (
    <div className="flex min-h-screen w-full flex-col px-[6%] font-montserrat font-semibold">
      {/* Header */}
      <header className="w-full">
        <nav className="flex justify-between items-center mt-8 text-[32px]">
          <Link to="/">
            <h1>Света Магаяева</h1>
          </Link>
          <ul className="flex gap-x-[58px] font-normal text-[24px]">
            <li><a href="#">Мои работы</a></li>
            <li><a href="#">Контакты</a></li>
          </ul>
        </nav>
      </header>

      {/* Main */}
      <main className="mt-16 justify-center flex flex-col items-center">
        <h2 className="text-[90px] mb-12 self-start " style={{ color: meta.color }}>
          {meta.title.toUpperCase()}
        </h2>

        {/* Сначала КАРУСЕЛЬ */}
        {carouselImages.length > 0 && (
          <div className="w-[1296px] h-[730px]">
            <Carousel images={carouselImages} />
          </div>
        )}

        {/* Потом COVER */}
        {coverImage && (
          <div className="flex justify-center my-16">
            <img
              src={coverImage}
              alt={`${meta.title} cover`}
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Назад */}
        <div className="mt-10">
          <Link to="/" className="text-[20px] underline">
            ← Назад ко всем проектам
          </Link>
        </div>
      </main>
    </div>
  );
}
