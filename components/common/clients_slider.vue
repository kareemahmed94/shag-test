<template>
  <div class="clients ml-auto mr-auto">
    <h2>أكبر شركات مصر تستخدم شغلني</h2>
    <VueSlickCarousel v-bind="clientsOptions" ref="slick" v-if="clients_status == 0">
      <div v-for="x in sample_slider" :key="'s'+x">
        <img src="~/assets/img/slider-loader.png" width="200" />
      </div>
    </VueSlickCarousel>
    <VueSlickCarousel v-bind="clientsOptions" ref="slick" v-else>
      <div v-for="our_client in our_clients" :key="'c'+our_client.id">
        <div>
          <div class="clients-slider-content ml-auto mr-auto">
            <nuxt-link :to="'/employer/'+our_client.slug">
              <img :src="storage_url + our_client.logo" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>
<script>
export default {
  name: "clients_slider",

  props: {
    special_jobs: {},
    special_jobs_loaded: 0,
  },
  data() {
    return {
      clientsOptions: {
        arrows: false,
        dots: false,
        centerPadding: "200px",
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 6,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        slidesToScroll: 1,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      sample_slider: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      storage_url: process.env.StorageUrl,
      our_clients: {},
      clients_status: 0,
    };
  },
  mounted() {
    this.getOurClients();
  },
  methods: {
    getOurClients() {
      this.$axios.get("/employer/our_clients").then((response) => {
        this.our_clients = response.data.data;
        this.clients_status = 1;
      });
    },
  },
};
</script>
