"use client";
import styles from './SliderBanner.module.css';
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import banner1 from "../../assets/banner/bannner1.webp";
import banner2 from "../../assets/banner/banner2.webp";
import banner3 from "../../assets/banner/banner3.webp";
import Image from 'next/image';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const SliderBanner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main_banner}>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className={styles.swiper_container}
        >
          <SwiperSlide className={styles.swiper}>
            <Image src={banner1} alt="Banner 1" className={styles.slide_img} priority />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper}>
            <Image src={banner2} alt="Banner 2" className={styles.slide_img} priority />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper}>
            <Image src={banner3} alt="Banner 3" className={styles.slide_img} priority />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.right_banner_container}>
        <div className={styles.right_banner}>
          <img src='/banner/right_banner1.webp' alt='Right Banner 1' className={styles.slide_img}></img>
        </div>
        <div className={styles.right_banner}>
          <img src='/banner/right_banner2.webp' alt='Right Banner 2' className={styles.slide_img}></img>
        </div>
      </div>
    </div>
  );
};

export default SliderBanner;