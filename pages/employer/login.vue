<!--eslint-disable-->
<template>
  <v-row v-if="is_mobile">
    <v-col md="4" cols="12">
      <login_banner></login_banner>
    </v-col>
    <v-col cols="10" class="ml-auto mr-auto">
      <div class="clients-container">
        <div class="clients-container-body" style="margin-top: 0">
          <div class="header">أكبر شركات مصر تستخدم شغلني</div>
          <v-row>
            <v-col
              cols="6"
              v-for="(client,index) in our_clients"
              :key="index"
              v-if="index<6"
              style="text-align: center"
            >
              <nuxt-link :to="'/employer/'+client.slug">
                <img :src="storage_url+client.logo" width="100" onerror="thumb_logo" />
              </nuxt-link>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-col>
  </v-row>
  <v-row v-else class="d-flex justify-content-around">
    <v-col md="4">
      <div class="clients-container">
        <div class="clients-container-body">
          <v-row class="header">أكبر شركات مصر تستخدم شغلني</v-row>
          <v-row>
            <v-col md="4" v-for="(client,index) in our_clients" v-if="index<6" :key="index">
              <nuxt-link :to="'/employer/'+client.slug">
                <img :src="storage_url+client.logo" width="100" onerror="thumb_logo" />
              </nuxt-link>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-col>
    <v-col md="4">
      <login_banner></login_banner>
    </v-col>
  </v-row>
</template>
<script>
import login_banner from "~/components/employer/login-banner.vue";
import home_slider from "~/components/home/home_slider.vue";
import featured_slider from "~/components/home/featured_slider.vue";
import clients_slider from "~/components/common/clients_slider.vue";
import testimonials from "~/components/home/testimonials.vue";

export default {
  name: "EmployerLogin",
  layout: "default",
  middleware: "guest",
  components: {
    login_banner,
    home_slider,
    featured_slider,
    clients_slider,
    testimonials,
  },
  head() {
    return {
      titleTemplate: "%s - تسجيل الدخول",
    };
  },
  data() {
    return {
      is_mobile: this.$device ? this.$device.isMobile : false,
      our_clients: [],
      slider: {},
      sample_slider: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      rates: [1, 2, 3, 4, 5],
      thumb_logo: "https://s3-cdn.shaghalni.com/shaghalni_icon.png",
      storage_url: process.env.StorageUrl,
      message: "Message ",
      searchJobType: "",
      entries: [],
      searchTitle: "",
      special_jobs_loaded: false,
      isCitiesLoading: false,
      descriptionLimit: 60,
      filterShiftType: [],
    };
  },
  mounted() {
    this.is_loaded = 1;
    this.getOurClients();
  },
  watch: {},

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
