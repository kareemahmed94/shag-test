<template>
  <div id="personal">
    <div class="clients ml-auto mr-auto">
      <h2 class="text-right mb-4">أكبر شركات مصر تستخدم شغلني</h2>
      <!-- <VueSlickCarousel v-bind="clientsOptions" ref="slick" v-if="clients_status == 0">
        <div v-for="x in sample_slider" :key="'s'+x">
          <img src="~/assets/img/slider-loader.png" width="200"/>
        </div>
      </VueSlickCarousel>
      <VueSlickCarousel class="ml-auto mr-auto" v-bind="clientsOptions" ref="slick" v-else>
        <div v-for="our_client in our_clients" :key="'c'+our_client.id">
          <div class="clients-slider-content ml-auto mr-auto">
            <img :src="storage_url+our_client.logo"/>
          </div>
        </div>
      </VueSlickCarousel>-->
      <v-divider></v-divider>
    </div>
    <v-form ref="contactForm" v-model="valid">
      <div class="form-register">
        <v-row class="form-input">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="first-name" class="label-form">الإسم الأول:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  dense
                  v-model="first_name"
                  outlined
                  :rules="[(v) => !!v || 'الإسم الأول مطلوب']"
                  label="الإسم الأول"
                  required
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="last-name" class="label-form">إسم العائلة:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  v-model="last_name"
                  dense
                  outlined
                  :rules="[(v) => !!v || 'إسم العائلة مطلوب']"
                  label="إسم العائلة"
                  required
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="form-input">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="job-title" class="label-form">الوظيفة:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  dense
                  v-model="job_title"
                  outlined
                  :rules="[(v) => !!v || 'المسمى الوظيفي مطلوب']"
                  label="المسمى الوظيفي"
                  required
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-input">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label
                  for="email"
                  class="label-form"
                  style="width: 100% !important"
                  >البريد الإلكتروني:</label
                >
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  dense
                  v-model="email"
                  outlined
                  type="email"
                  :rules="[(v) => !!v || 'البريد الإلكتروني مطلوب']"
                  label="البريد الإلكتروني"
                  required
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-input">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="phone" class="label-form">رقم الموبايل:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  :append-outer-icon="icons.mdiPlus"
                  @click:append-outer="other_phone_numbers.push('')"
                  dense
                  v-model="phone_number"
                  outlined
                  :rules="[
                    (v) => !!v || 'رقم الموبايل مطلوب',
                    (v) => !isNaN(v) || 'يجب أن يكون أرقام',
                  ]"
                  label="رقم الموبايل"
                  required
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row
          class="form-input"
          v-if="other_phone_numbers && other_phone_numbers.length > 0"
        >
          <v-col
            md="6"
            cols="12"
            class="d-flex"
            v-for="(phone, index) in other_phone_numbers"
            :key="'bc' + index"
          >
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="phone" class="label-form">الرقم الإضافي:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  :append-outer-icon="icons.mdiClose"
                  @click:append-outer="$delete(other_phone_numbers, index)"
                  :rules="[
                    (v) => !!v || 'رقم الموبايل مطلوب',
                    (v) => !isNaN(v) || 'يجب أن يكون أرقام',
                  ]"
                  dense
                  v-model="other_phone_numbers[index]"
                  outlined
                  label="رقم الموبايل"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-input">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="password" class="label-form">كلمة المرور:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  dense
                  v-model="password"
                  outlined
                  :rules="[
                    (v) => !!v || 'كلمة السر مطلوبة',
                    (v) => v.length >= 8 || 'أقل عدد لكلمة السر هو 8 أحرف',
                  ]"
                  label="كلمة السر"
                  required
                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_password ? 'text' : 'password'"
                  name="input-10-1"
                  @click:append="show_password = !show_password"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </div>
    </v-form>
  </div>
</template>
<script>
import $ from "jquery";
import { mdiPlus, mdiClose } from "@mdi/js";

export default {
  name: "Personal",

  props: {
    validateForm: Boolean,
    user: {},
  },
  data() {
    return {
      icons: {
        mdiPlus,
        mdiClose,
      },
      show_password: false,
      menu: false,
      sample_slider: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      valid: false,
      clientsOptions: {
        arrows: false,
        centerPadding: "200px",
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 5,
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
      clients_status: 0,
      verify_message: "",
      loading: false,
      v_loading: false,
      storage_url: process.env.StorageUrl,
      our_clients: {},
      other_phone_numbers: [],
      change_phone_num: 0,
      block_resend: 0,
      code: "",
      first_name: "",
      last_name: "",
      email: "",
      job_title: "",
      gender: "",
      phone_number: "",
      password: "",
      message: "",
      status: "",
      avatar: null,
      birth_date: "1990-01-01",
    };
  },
  watch: {
    validateForm() {
      if (this.$refs.contactForm.validate()) {
        this.$emit("ContactValidated", true);
      } else {
        this.$emit("ContactValidated", false);
      }
    },
    user() {
      this.first_name = this.user.name.split(" ")[0]
        ? this.user.name.split(" ")[0]
        : "";
      this.last_name = this.user.name.split(" ")[1]
        ? this.user.name.split(" ")[1]
        : "";
      this.email = this.user.email;
      this.phone_number = this.user.phone_number;
    },
  },
  mounted() {
    this.getOurClients();
    $("body").css("overflow", "auto");
  },
  methods: {
    getOurClients() {
      this.$axios.get("/employer/our_clients").then((response) => {
        this.our_clients = response.data.data;
        this.clients_status = 1;
      });
    },
    add_phone() {
      this.other_phone_numbers.push("");
    },
  },
};
</script>
<style scoped>
.label-form {
  width: 135px !important;
}

.v-spinner {
  display: block;
  background-color: transparent !important;
  padding: 0 !important;
  position: inherit !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  top: 15px;
  opacity: 1;
  overflow: auto;
  height: 50px;
}

.clients {
  padding-bottom: 50px;
  margin-left: 65px;
  margin-right: 65px;
}

.clients hr {
  margin-top: 0 !important;
}
</style>
