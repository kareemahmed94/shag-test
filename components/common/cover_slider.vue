<template>
  <div class="slider-cover">
    <VueSlickCarousel v-bind="settings" ref="slick">
      <div class="img-wrapper" v-for="image in images" :key="image">
        <img :src="storage_url+image+'?webp'" />
      </div>
    </VueSlickCarousel>
  </div>
</template>
<script>
export default {
  name: "cover_slider",
  data() {
    return {
      storage_url: process.env.StorageUrl,
      images: ['3wRNPVXAbJQacWm7pQf89MIA2aUmnA4Tstfh4TS5.jpeg','J5lw0PkJSQMIzW8c1eouPnrwpJMwQuIrmVP8NDzV.jpeg','10UYnDoZAK2yOvs6IXe9Q11z1rS47qq2fqc2KAqC.jpeg','8JcIkBhyZuSdvx8xYA4q7pVdsR0Lhi2xfcdIy3JW.jpeg','2ofkQxbobp7o2V1a5v68hIQPRaAHPYZgGEkbJoCQ.jpeg','Muf9M6oECU9zzxNz70Tnh25kB3liUfHNuiQpPVvC.jpeg','dnrTJfX32jkFAz2LY2F1RHTfUyd0R1ARx4COIBx1.jpeg','YHFHANEJN5prgEdl8mI2Wy2LheaDbDnBNjQtJ2G2.jpeg'],
      settings: {
        centerMode: true,
        arrows: false,
        centerPadding: "100",
        focusOnSelect: true,
        infinite: true,
        initialSlide: 2,
        slidesToShow: 3,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        slidesToScroll: 1,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 1050,
            settings: {
              centerPadding: "100px",
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 850,
            settings: {
              centerPadding: "100px",
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              centerPadding: "100px",
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerPadding: "50px",
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            },
          },
        ],
      },
    };
  },
};
</script>
<style>
.slider-cover .slick-slide img[data-v-e4caeaf8] {
  display: block;
  height: -webkit-fill-available;
  width: -webkit-fill-available;
  padding: 3%;
}
.slider-cover {
  height: 100%;
}
.img-wrapper {
  height: 400px;
  width: 400px;
}
.img-wrapper img {
  height: 100%;
  width: 100%;
}
</style>
