<!--eslint-disable-->
<template>
  <div>
    <iframe id="frame" :src="iframe_url" v-if="iframe_status" style="width:100%;height:700px;"></iframe>
  </div>
</template>
<script>
  import login_banner from '~/components/employer/login-banner.vue'
  import home_slider from '~/components/home/home_slider.vue'
  import featured_slider from '~/components/home/featured_slider.vue'
  import clients_slider from '~/components/common/clients_slider.vue'
  import testimonials from '~/components/home/testimonials.vue'

  export default {
    name: 'EmployerLogin',
    layout: 'default',
    components: {
      login_banner,
      home_slider,
      featured_slider,
      clients_slider,
      testimonials,
    },
    head() {
      return {
        titleTemplate: '%s - الدفع',
      }
    },
    data() {
      return {
        iframe_status : false,
        iframe_url : '',
      }
    },
    mounted() {
      if(process.browser){
        this.iframe_url = localStorage.getItem("iframe_url")
        this.iframe_status = true
      }
    },
    watch: {},

    methods: {
    }
  }
</script>

<style>
  @media only screen and (min-width: 1050px) {
    .home-slider .slick-slider .slick-slide {
      opacity: 0.5;
      margin-top: 20px;
    }

    .home-slider .slick-slider .slick-center {
      opacity: 1 !important;
      margin-top: 0 !important;
      /*margin-left: 4% !important;*/
    }

    .slick-slide * {
      outline: none !important;
    }
  }

</style>
