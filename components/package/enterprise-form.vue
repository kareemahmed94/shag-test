<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <div style="background-color: #0e4168">
        <v-toolbar dark color="#ff9800">
          <v-btn icon dark @click="close_form">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div class="landing-employer-text" style="margin-top: 5%!important;">
          <div class="apart">باقات المؤسسات الكبيرة</div>
          <div class="landing-headline">إملأ البيانات الآن وسنتواصل معكم في أقرب وقت</div>
          <div class="landing-social-media"></div>
        </div>
        <div class="landing-employer">
          <v-form
            ref="landingForm"
            class="landing-employer-form"
            v-model="valid"
            style="width: 470px"
          >
            <div class="row">
              <div class="m-1">
                <v-text-field
                  v-model="first_name"
                  block
                  background-color="white"
                  filled
                  rounded
                  :rules="[(v) => !!v || 'الإسم الأول']"
                  label="الإسم الأول"
                  required
                />
              </div>

              <div class="m-1">
                <v-text-field
                  v-model="last_name"
                  background-color="white"
                  filled
                  rounded
                  :rules="[(v) => !!v || 'الإسم الأخير']"
                  label="الإسم الأخير"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="m-1">
                <v-text-field
                  v-model="company_name"
                  background-color="white"
                  filled
                  rounded
                  :rules="[(v) => !!v || 'إسم الشركة']"
                  label="إسم الشركة"
                  required
                />
              </div>

              <div class="m-1">
                <v-text-field
                  v-model="position"
                  background-color="white"
                  filled
                  rounded
                  :rules="[(v) => !!v || 'المسمى الوظيفي مطلوب']"
                  label="المسمى الوظيفي"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="m-1">
                <v-text-field
                  v-model="email"
                  background-color="white"
                  filled
                  rounded
                  type="email"
                  :rules="[(v) => !!v || 'البريد الإلكتروني مطلوب']"
                  label="البريد الإلكتروني"
                  required
                />
              </div>

              <div class="m-1">
                <v-text-field
                  v-model="phone_number"
                  background-color="white"
                  filled
                  rounded
                  type="number"
                  :rules="[(v) => !!v || 'رقم الهاتف مطلوب']"
                  label="رقم الهاتف"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="m-1">
                <v-text-field
                  v-model="jobs_num"
                  background-color="white"
                  filled
                  rounded
                  type="email"
                  :rules="[(v) => !!v || 'عدد الوظائف الخالية مطلوب']"
                  label="عدد الوظائف الخالية"
                  required
                />
              </div>

              <div class="m-1">
                <v-text-field
                  v-model="job_seekers_num"
                  background-color="white"
                  filled
                  rounded
                  type="number"
                  :rules="[(v) => !!v || 'عدد الموظفين المطلوبين مطلوب']"
                  label="عدد الموظفين المطلوبين"
                  required
                />
              </div>
            </div>
            <div>
              <v-select
                :items="business_categories"
                v-model="business_category"
                label="مجال العمل"
                background-color="white"
                filled
                rounded
                item-value="id"
                item-text="name_ar"
                :rules="[(v) => !!v || 'مجال العمل مطلوب']"
                required
              ></v-select>
            </div>
            <div>
              <v-select
                :items="countries"
                v-model="country"
                :rules="[(v) => !!v || 'الدولة مطلوبة',]"
                label="الدولة"
                background-color="white"
                filled
                rounded
                item-value="id"
                item-text="name_ar"
                @change="countryUpdateSelect()"
              ></v-select>
            </div>

            <div class="row">
              <div class="m-1">
                <v-select
                  :items="cities"
                  v-model="city"
                  :rules="[(v) => !!v || 'المحافظة مطلوبة',]"
                  label="المحافظة"
                  background-color="white"
                  filled
                  rounded
                  required
                  item-value="id"
                  item-text="name_ar"
                  @change="cityUpdateSelect()"
                ></v-select>
              </div>

              <div class="m-1">
                <v-select
                  :items="areas"
                  v-model="area"
                  label="المنطقة"
                  background-color="white"
                  filled
                  rounded
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </div>
            </div>
            <div>
              <div></div>
              <div>
                <v-btn
                  color="#ff9800"
                  rounded
                  dark
                  block
                  height="50px"
                  :loading="btn_loader"
                  @click="send_form"
                >
                  إبدأ
                  الآن
                </v-btn>
              </div>
            </div>
          </v-form>
        </div>
        <div class="landing-employer-logo">
          <nuxt-link to="/">
            <img alt="logo" width="250" src="~/assets/logo.png" class="logo-nav" />
          </nuxt-link>
        </div>
      </div>
      <v-snackbar v-model="message" :color="error_type">{{ error_message }}</v-snackbar>
    </v-dialog>
    <v-dialog v-model="success_dialog" width="500">
      <v-card>
        <div class="logo-holder-modal">
          <img src="~/assets/logo-blue.png" width="200" />
        </div>
        <v-card-title class="message-title">تم بنجاح</v-card-title>
        <v-card-text class="message-body">تم الإرسال بنجاح سيتم التواصل معكم في أقرب وقت ممكن</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#0e4168" width="50%" dark rounded block @click="close_form">حسنا</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "enterprise_form",

  props: {
    dialog: false,
  },
  data() {
    return {
      notifications: false,
      btn_loader: false,
      valid: true,
      sound: true,
      widgets: false,
      success_dialog: false,
      email: "",
      jobs_num: "",
      job_seekers_num: "",
      first_name: "",
      last_name: "",
      company_name: "",
      position: "",
      phone_number: "",
      business_category: "",
      message: "",
      error_type: "",
      error_message: "",
      country: 0,
      city: 0,
      area: 0,
      business_categories: [],
      countries: [],
      cities: [],
      areas: [],
    };
  },
  mounted() {
    this.getCountries();

    this.getBusinessCategories();
  },
  methods: {
    send_form() {
      this.btn_loader = true;
      if (this.$refs.landingForm.validate()) {
        let form_data = {
          first_name: this.first_name,
          last_name: this.last_name,
          phone: this.phone_number,
          position: this.position,
          company_name: this.company_name,
          email: this.email,
          country: this.country,
          city: this.city,
          area: this.area,
          business_category: this.business_category,
          jobs_num: this.jobs_num,
          job_seekers_num: this.job_seekers_num,
        };
        this.$axios
          .post("/employer/package_leads", form_data)
          .then((response) => {
            this.success_dialog = true;
            this.btn_loader = false;
          });
      } else {
        this.message = true;
        this.error_type = "error";
        this.error_message = "أكمل كل الحقول من فضلك";
      }
      this.$emit("closeForm");
    },
    close_form() {
      this.success_dialog = false;
      this.$emit("closeForm");
    },
    getBusinessCategories(resourceName, type) {
      this.$axios
        .get("/resource/businessCategory", { params: { type: type } })
        .then((response) => {
          this.business_categories = response.data;
        });
    },
    getCountries(resourceName, type) {
      this.$axios
        .get("/resource/country", { params: { type: type } })
        .then((response) => {
          this.countries = response.data;
        });
    },
    countryUpdateSelect() {
      if (this.country !== 0) {
        this.$axios.get("/resource/city").then((response) => {
          this.cities = response.data.filter(
            (city) => city.country_id == this.country
          );
          this.areas = [];
        });
      }
    },
    cityUpdateSelect() {
      if (this.city !== 0) {
        this.$axios.get("/resource/area").then((response) => {
          this.areas = response.data.filter(
            (area) => area.city_id == this.city
          );
        });
      }
    },
  },
};
</script>
<style scoped>
.m-1 {
  width: 48%;
}

.v-dialog--fullscreen {
  background-color: #0e4168 !important;
}
</style>
