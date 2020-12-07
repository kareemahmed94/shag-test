<template>
  <div class="home-page">
    <div class="home-slider" ref="homeSlider">
      <VueSlickCarousel v-bind="slickOptions" ref="slick" v-if="home_status == 1">
        <div v-for="x in sample_slider" :key="'s'+x">
          <img src="~/assets/img/slider-loader.png?webp" width="200" />
        </div>
      </VueSlickCarousel>
      <VueSlickCarousel v-bind="slickOptions" ref="slick" v-else>
        <div v-for="home_job in home_jobs" :key="'home'+home_job.id">
          <v-row class="home-slider">
            <v-col md="7" class="slider-content">
              <div class="slider-title">الوظيفة</div>
              <div class="employer-title">{{ home_job.short_title }}</div>
              <div class="slider-title">شركة</div>
              <div
                class="employer-title"
                @click="$router.push('/employer/'+home_job.employer.slug)"
              >{{ home_job.employer.short_name }}</div>
              <div class="job-desc">{{ home_job.short_desc }}</div>
              <div class="job-banner-btn">
                <v-btn
                  dark
                  class="submit"
                  small
                  rounded
                  @click="$router.push('/jobs/'+home_job.slug)"
                >شغلني</v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>
<script>
export default {
  name: "home_slider",

  props: {
    home_jobs: {},
    home_status: 0,
  },
  data() {
    return {
      slickOptions: {
        centerMode: this.$device
          ? this.$device.isDesktop
            ? true
            : false
          : false,
        arrows: false,
        centerPadding: "200px",
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        slidesToScroll: 1,
        touchThreshold: 1,
        ssr: true,
        responsive: [
          {
            breakpoint: 1050,
            settings: {
              centerPadding: "100px",
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 850,
            settings: {
              centerMode: false,
              centerPadding: "100px",
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              centerMode: false,
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
              centerMode: false,
              centerPadding: "50px",
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            },
          },
        ],
      },
      sample_slider: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  mounted() {},
  methods: {},
};
</script>
