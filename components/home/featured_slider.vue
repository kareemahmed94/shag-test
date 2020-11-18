<template>
  <div class="special-jobs-slider">
    <div class="special-jobs-slider">
      <div class="">
        <VueSlickCarousel v-bind="specialOptions" ref="slick" v-if="!special_jobs_loaded">
          <div v-for="x in sample_slider" :key="'s'+x">
            <img src="~/assets/img/slider-loader.png" width="200">
          </div>
        </VueSlickCarousel>
        <VueSlickCarousel v-bind="specialOptions" ref="slick" v-else>
          <div v-for="(special_job , index) in special_jobs" :key="'sp'+index+'-'+special_job.id">
            <div class="reviews-slider">
              <div class="slider-content-jobs">
                <nuxt-link :to="'/employer/'+special_job.employer.slug" v-if="special_job.employer">
                  <img width="200" :src="special_job.employer.logo ? storage_url+special_job.employer.logo : thumb_logo">
                </nuxt-link>

                <nuxt-link to="#" v-else>
                  <img width="200" :src="thumb_logo">
                </nuxt-link>

                <hr>
                <h4 @click="$router.push('/jobs/'+special_job.slug)">{{ special_job.title }}</h4>
                <div class="job-items" v-if="special_job.experience_level">
                  <img src="~/assets/img/icons/cer..svg">
                  {{ special_job.experience_level.name_ar }}
                </div>
                <div class="job-items" v-if="special_job.job_type">
                  <img src="~/assets/img/icons/clock.svg">
                  {{ special_job.job_type.name_ar }}
                </div>
                <div class="job-items" v-if="special_job.addresses && special_job.addresses[0]">
                  <img src="~/assets/img/icons/loc.svg">
                  {{ special_job.addresses[0].area ? special_job.addresses[0].area.name_ar+'،' : '' }}
                  {{ special_job.addresses[0].city ? special_job.addresses[0].city.name_ar : '' }}
                </div>
              </div>
            </div>

          </div>
        </VueSlickCarousel>

      </div>
    </div>
  </div>


</template>
<script>
  export default {
    name: 'featured_slider',

    props: {
      special_jobs: {},
      special_jobs_loaded: 0,
    },
    data() {
      return {
        specialOptions: {
          'centerMode': this.$device ? this.$device.isDesktop ? true : false : false,
          'arrows': false,
          'centerPadding': '150',
          'focusOnSelect': true,
          'infinite': true,
          'slidesToShow': 4,
          'autoplay': true,
          'autoplaySpeed': 4000,
          'speed': 1000,
          'slidesToScroll': 1,
          'touchThreshold': 5,
          'responsive': [
            {
              'breakpoint': 1050,
              'settings': {
                'centerPadding': '100px',
                'slidesToShow': 4,
                'slidesToScroll': 1,
                'infinite': true,
              }
            },
            {
              'breakpoint': 850,
              'settings': {
                'centerPadding': '100px',
                'slidesToShow': 3,
                'slidesToScroll': 1,
                'infinite': true,
              }
            },
            {
              'breakpoint': 600,
              'settings': {
                'centerPadding': '100px',
                'slidesToShow': 1,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': true,
              }
            },
            {
              'breakpoint': 480,
              'settings': {
                'centerPadding': '50px',
                'slidesToShow': 1,
                'slidesToScroll': 1,
                'infinite': true,
              }
            }
          ]
        },
        sample_slider: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        storage_url: process.env.StorageUrl,
        thumb_logo: 'https://s3-cdn.shaghalni.com/shaghalni_icon.png',
      }
    },
    mounted() {
    },
    methods: {

    }
  }
</script>
