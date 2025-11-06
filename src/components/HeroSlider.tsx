import { useEffect } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const slides = [
  {
    id: 1,
    title: 'Bienvenido al Sistema SRQD',
    description: 'Registra tus reclamos, quejas y denuncias de manera fácil y segura',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=500&fit=crop',
    color: 'from-blue-600/80 to-blue-900/80'
  },
  {
    id: 2,
    title: 'Seguimiento en Tiempo Real',
    description: 'Consulta el estado de tus casos desde cualquier dispositivo',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=500&fit=crop',
    color: 'from-green-600/80 to-green-900/80'
  },
  {
    id: 3,
    title: 'Atención Personalizada',
    description: 'Nuestro equipo está comprometido con resolver tus inquietudes',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=500&fit=crop',
    color: 'from-purple-600/80 to-purple-900/80'
  },
  {
    id: 4,
    title: 'Transparencia y Eficiencia',
    description: 'Comprometidos con la mejora continua de nuestros servicios',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop',
    color: 'from-orange-600/80 to-orange-900/80'
  },
]

export function HeroSlider() {
  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false })

  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[autoplay]}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />

                {/* Overlay Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-3xl text-white">
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                        {slide.title}
                      </h2>
                      <p className="text-lg md:text-xl lg:text-2xl mb-8 drop-shadow-lg">
                        {slide.description}
                      </p>
                      <button className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl">
                        Comenzar ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
        <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
      </Carousel>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            className="h-2 w-2 rounded-full bg-white/50 hover:bg-white transition-all"
          />
        ))}
      </div>
    </div>
  )
}
