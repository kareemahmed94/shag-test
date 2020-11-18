<!--eslint-disable-->
<template>
  <div>
    <v-col md="10" cols="10" class="container">
      <v-row class="mb-10" style="background-color: rgba(14, 65, 104, 0.25)">
        <v-col md="10" cols="12" class="ml-auto mr-auto text-center pt-8 pb-8">
          <img
            alt="Shaghalni Logo"
            class="logo-nav"
            width="100"
            src="~/assets/logo-blue.png"
          />
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col md="12" cols="12" class="ml-auto mr-auto text-center pt-8 pb-8">
          <!-- Case payment success -->
          <v-row>
            <v-col md="12">
              <img
                alt="Shaghalni Logo"
                class="logo-nav"
                width="100"
                src="~/assets/img/icons/payment-failed.svg"
              />
            </v-col>
          </v-row>
          <!-- Case payment faild -->
          <div>
            <v-row>
              <v-col class="job-details-title text-center" md="12">
                <span class="details-title d-inline" style="font-size: 40px">عملية الدفع فشلت</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="job-details-title text-center" md="12">
                <span class="details-title d-inline" style="font-size: 22px">{{ fail_title }}</span>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="job-details-title text-center"
                style="font-size: 20px"
                md="12">{{ fail_message }}</v-col>
            </v-row>
          </div>

          <v-divider></v-divider>
          <v-row>
            <v-col class="job-details-title text-right" md="12" cols="12">
              <span class="job-title"
              >إذا كانت لديك أية استفسارات، يرجى التواصل معنا عبر بريدنا
                الإلكتروني</span
              >
              <span class="details-title d-inline">
                info@shaghalni.com
                <!-- <v-icon color="#16476d">{{ icons.mdiAt }}</v-icon> -->
              </span>
            </v-col>

          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="text-center ml-auto mr-auto" md="4">
              <v-btn
                class="ml-auto mr-auto job-submit"
                @click="$router.push('/payment')"
              >العودة للدفع</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>
<script>
  import { mdiPhone, mdiAt } from "@mdi/js";

  export default {
    name: "PaymentStatus",
    layout: "default",
    components: {},
    head() {
      return {};
    },
    data() {
      return {
        icons: { mdiPhone, mdiAt },
        fail_title: process.browser ? localStorage.getItem("fail_title") : null,
        fail_message: process.browser ? localStorage.getItem("fail_message") : null,
        overlay: true,
      };
    },
    mounted() {

    },
    watch: {
    },
    methods: {},
  };
</script>

<style>
</style>
