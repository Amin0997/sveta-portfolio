import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);

    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl">
      {/* Карусель */}
      <div className="overflow-hidden " ref={emblaRef}>
        <div className="flex">
          {images.map((img, index) => (
            <div className="flex-[0_0_100%]" key={index}>
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover shadow-xl transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Стрелки */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-4 rounded-full shadow-lg backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-4 rounded-full shadow-lg backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Пагинация */}
      {/* <div className="flex justify-center gap-2 mt-4 py-1">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-gray-900 scale-110'
                : 'bg-gray-400 hover:bg-gray-600 scale-90'
            }`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Carousel;
