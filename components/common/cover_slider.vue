<template>
  <div class="slider-cover">
    <VueSlickCarousel v-bind="settings" ref="slick">
      <div class="img-wrapper">
        <img src="~/assets/img/pics/banner-7.jpg" />
      </div>
      <div class="img-wrapper">
        <img src="~/assets/img/pics/banner-6.jpg" />
      </div>
      <div class="img-wrapper">
        <img src="~/assets/img/pics/banner-5.jpg" />
      </div>
      <div class="img-wrapper">
        <img src="~/assets/img/pics/banner-3.jpg" />
      </div>
      <div class="img-wrapper">
        <img src="~/assets/img/pics/banner-1.jpg" />
      </div>
      <div class="img-wrapper">
        <img src="~/assets/img/pics/banner-2.jpg" />
      </div>
      <div class="img-wrapper">
        <img src="~/assets/img/pics/banner-8.jpg" />
      </div>
    </VueSlickCarousel>
  </div>
</template>
<script>
export default {
  name: "cover_slider",
  data() {
    return {
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
