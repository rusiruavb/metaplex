import React, { FC, useEffect } from 'react'
import CN from 'classnames'
import ReactTooltip from 'react-tooltip'
import Swiper, { Navigation, Autoplay, Mousewheel, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

export interface SlideProps {
  Component?: any
  [x: string]: any
  id?: number | string
}

export interface BlockCarouselProps {
  [x: string]: any
  id?: string
  nextButton?: any
  prevButton?: any
  slides?: SlideProps[]
  options?: {
    [x: string]: any
  }
}

const SampleComponent = ({ children }: any) => {
  return (
    <div className='flex h-[400px] w-full items-center justify-center bg-[#C2D0DE] text-[40px] font-[600] uppercase text-white'>
      {children}
    </div>
  )
}

export const BlockCarousel: FC<BlockCarouselProps> = ({
  className,
  id,
  nextButton,
  options,
  prevButton,
  slides,
  loop,
  pagination,
  ...restProps
}: BlockCarouselProps) => {
  const BlockCarouselClasses = CN(`block-carousel w-full flex flex-col overflow-hidden`, className)

  const {
    autoPlay,
    centeredSlides,
    slideClass,
    slidePrevClass,
    slidesPerView,
    spaceBetween,
    updateOnWindowResize,
    wrapperClass,
    resizeObserver,
    ...restOptions
  } = options || {}

  useEffect(() => {
    Swiper.use([Navigation, Autoplay, Mousewheel, Pagination])

    const swiper = new Swiper(`#${id}` || '.block-carousel', {
      autoplay:
        typeof autoPlay === 'boolean'
          ? autoPlay
          : {
              delay: autoPlay?.delay || 3000,
              disableOnInteraction: autoPlay?.disableOnInteraction || false,
              pauseOnMouseEnter: autoPlay?.pauseOnMouseEnter || false,
              reverseDirection: autoPlay?.reverseDirection || false,
              stopOnLastSlide: autoPlay?.stopOnLastSlide || false,
              waitForTransition: autoPlay?.waitForTransition || true,
            },
      centeredSlides: centeredSlides || false,
      direction: 'horizontal',
      slideClass: slideClass || 'block-carousel__item',
      slidePrevClass: slidePrevClass || 'block-carousel__item__prev',
      slidesPerView: slidesPerView || 2,
      spaceBetween: spaceBetween || 40,
      updateOnWindowResize: updateOnWindowResize || true,
      wrapperClass: wrapperClass || 'block-carousel__wrapper',
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      resizeObserver: resizeObserver || true,
      mousewheel: { forceToAxis: true },
      loop: loop || false,
      ...restOptions,
    })

    swiper.on('slideChange', function () {
      // This is top rebuild tooltip on every slide change (Else tooltip won't work after slide change)
      ReactTooltip.rebuild()
    })
  }, [])

  const sampleSlides = [
    { id: 0, Component: () => <SampleComponent>Slide one</SampleComponent> },
    { id: 1, Component: () => <SampleComponent>Slide two</SampleComponent> },
    { id: 2, Component: () => <SampleComponent>Slide three</SampleComponent> },
  ]

  return (
    <div id={id} className={BlockCarouselClasses} {...restProps}>
      <ul className='block-carousel__wrapper m-0 flex list-none p-0'>
        {(slides || sampleSlides).map(
          ({ id, Component, ...restProps }: SlideProps, index: number) => (
            <li
              key={id || index}
              className='block-carousel__item flex flex-shrink-0 flex-col'
              {...restProps}>
              <Component />
            </li>
          )
        )}
      </ul>

      <div className='swiper-pagination'></div>
    </div>
  )
}

export default BlockCarousel
