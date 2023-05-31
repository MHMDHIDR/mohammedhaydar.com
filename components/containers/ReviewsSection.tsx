'use client'
import { useCallback, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getClientReviews } from '@/fetchers'
import { Review } from '@/components/elements'
import type { Swiper as SwiperType } from 'swiper'

const ReviewsSection = () => {
  const { data } = useQuery(['clientreviews'], getClientReviews)

  const sliderRef = useRef<SwiperType | null>(null)

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.slideNext()
  }, [])

  if (!data) return null

  return (
    <div className='swiper-holder'>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={28}
        slidesPerView={3}
        autoplay={{
          delay: 4000
        }}
        centerInsufficientSlides={true}
        onSwiper={swiper => (sliderRef.current = swiper)}
        breakpoints={{
          320: {
            slidesPerView: 1
          },
          640: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3
          }
        }}
      >
        {data.map(review => (
          <SwiperSlide key={review.id}>
            <div className='slider-item'>
              <Review review={review} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className='swiper-button-prev'
        aria-label='Swipe to Previous'
        onClick={handlePrev}
      ></button>
      <button
        className='swiper-button-next'
        aria-label='Swipe to Next'
        onClick={handleNext}
      ></button>
    </div>
  )
}

export default ReviewsSection
