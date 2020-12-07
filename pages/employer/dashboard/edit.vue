<template>
  <div>
    <div class="container register-section">
      <v-card>
        <div class="clients ml-4 mr-4" style="background-image: none">
          <h2 class="text-center mr-4">تعديل بيانات الحساب</h2>
        </div>
        <v-form ref="SPEForm" class="form-register" v-if="employer">
          <v-row>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
            <v-col md="2" class="text-center"> معلومات التواصل</v-col>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
          </v-row>

          <div class="form-register">
            <v-row class="form-group">
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="first-name" class="label-form"
                    >الإسم الأول:</label
                    >
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-text-field
                      dense
                      v-model="employer.first_name"
                      outlined
                      label="الإسم الأول"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="last-name" class="label-form"
                    >إسم العائلة:</label
                    >
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-text-field
                      v-model="employer.last_name"
                      dense
                      outlined
                      label="إسم العائلة"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="form-group">
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="job-title" class="label-form">الوظيفة:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-text-field
                      dense
                      v-model="employer.job_title"
                      outlined
                      label="المسمى الوظيفي"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="password" class="label-form"
                    >كلمة المرور:</label
                    >
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-text-field
                      dense
                      v-model="employer.password"
                      outlined
                      :rules="[
                        (v) =>
                          v.length === 0 ||
                          v.length >= 8 ||
                          'أقل عدد لكلمة السر هو 8 أحرف',
                      ]"
                      label="كلمة السر"
                      :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show_password ? 'text' : 'password'"
                      name="input-10-1"
                      @click:append="show_password = !show_password"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>

          <v-row>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
            <v-col md="2" class="text-center"> معلومات عن الشركة</v-col>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
          </v-row>

          <div class="form-register">
            <v-row class="form-group">
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="name_en" class="label-form">اسم الشركة:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-text-field
                      dense
                      v-model="employer.name_en"
                      label="اسم الشركة إنجليزي"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="name_ar" class="label-form">اسم الشركة:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-text-field
                      dense
                      v-model="employer.name_ar"
                      label="اسم الشركة عربي"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="form-group">
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="country" class="label-form"
                    >الدولة (مقر الشركة):</label
                    >
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      :items="countries"
                      v-model="employer.country_id"
                      :rules="[(v) => !!v || 'الدولة مطلوبة']"
                      label="الدولة"
                      outlined
                      item-value="id"
                      item-text="name_ar"
                      @change="countryUpdateSelect()"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="city" class="label-form">المحافظة:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      :items="cities"
                      v-model="employer.city_id"
                      label="المحافظة"
                      outlined
                      required
                      item-value="id"
                      item-text="name_ar"
                      @change="cityUpdateSelect()"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="form-group">
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="area" class="label-form">النطاق:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      :items="areas"
                      v-model="employer.area_id"
                      label="المنطقة"
                      outlined
                      item-value="id"
                      item-text="name_ar"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="category" class="label-form">مجال العمل:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-row v-for="(bc, index) in employer.businessCategoryData" :key="'bc' + index">
                      <v-col cols="12">
                        <v-select dense :append-outer-icon="index === 0 ? icons.mdiPlus : icons.mdiClose"
                                  @click:append-outer="index === 0 ? add_buss_cat() : $delete(employer.business_category, index)"
                                  :items="business_categories"
                                  v-model="employer.business_category[index]"
                                  label="مجال العمل" outlined
                                  item-value="id" item-text="name_ar"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="form-group">
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="company_size" class="label-form"
                    >حجم الشركة :</label
                    >
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      :items="company_sizes"
                      v-model="employer.company_size_id"
                      label="حجم الشركة"
                      outlined
                      item-value="id"
                      item-text="name_ar"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label
                      for="website"
                      class="label-form"
                      style="width: 100% !important"
                    >الموقع الإلكتروني:</label
                    >
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-text-field
                      dense
                      v-model="employer.website"
                      label="الموقع الإلكتروني"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="form-group">
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="job_details" class="label-form"
                    >عن الشركة:</label
                    >
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-textarea
                      dense
                      outlined
                      name="input-7-4"
                      label="عن الشركة"
                      v-model="employer.about"
                      :rules="[(v) => !!v || 'عن الشركة مطلوب']"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="logo" class="label-form">اللوجو :</label>
                  </v-col>
                  <v-col md="8" cols="12" v-if="user.employer">
                    <v-file-input
                      dense
                      outlined
                      accept="image/png, image/jpeg, image/bmp"
                      :rules="[
                        (v) => !!v || 'الصورة الشخصية مطلوبة',
                        (v) =>
                          !v ||
                          v.size < 1000000 ||
                          'حجم الصورة يجب أن يكون أقل من 1 ميجا!',
                      ]"
                      v-model="logo"
                      append-icon="mdi-camera"
                      prepend-icon
                      label="اللوجو"
                    ></v-file-input>
                    <v-img
                      class="white--text align-end"
                      width="150px"
                      :src="storage_url + user.employer.logo"
                      v-if="user.employer.logo"
                    >
                    </v-img>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row id="emp_papers" ref="empPapers" class="form-group">
              <v-col md="12" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="logo" class="label-form">أوراق التفعيل :</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-card class max-width="500" v-if="user">
                      <v-card-text
                        class="text--primary text-center"
                        v-if="user.employer && user.employer.is_verified">
                        <h2 style="color: #12406a">تم تفعيل الحساب</h2>
                      </v-card-text>
                      <v-card-text class="text--primary text-center" v-else>
                        <div v-if="user.employer">
                          <div
                            v-if="
                            user.employer.tax_card &&
                            user.employer.commercial_record
                          "
                          >
                            <h5 style="color: #12406a">
                              الأوراق تحت المراجعة سنقوم بالتواصل معكم قريبا
                            </h5>
                            <div v-for="card in user.employer.tax_card">
                              <a :href="storage_url + card">{{
                                card.split("tax_cards/")[1]
                                }}</a>
                            </div>
                            <div
                              v-for="record in user.employer.commercial_record"
                            >
                              <a :href="storage_url + record">{{
                                record.split("commercial_records/")[1]
                                }}</a>
                            </div>
                          </div>
                          <h2
                            style="color: #12406a"
                            v-if="
                            !user.employer.tax_card ||
                            !user.employer.commercial_record
                          "
                          >
                            أدخل أوراق الشركة ليتم تفعيل الحساب
                          </h2>
                          <v-row class="form-group">
                            <v-col md="12" cols="12">
                              <v-file-input
                                dense
                                outlined
                                v-model="commercial_record"
                                :rules="[
                                (files) =>
                                  !files ||
                                  !files.some((file) => file.size > 2e6) ||
                                  'الملف يجب أن يكون أقل من 2 ميجا',
                              ]"
                                append-icon="mdi-file"
                                prepend-icon
                                label="السجل التجاري"
                                multiple
                              ></v-file-input>
                            </v-col>
                          </v-row>
                          <v-row class="form-group">
                            <v-col md="12" cols="12">
                              <v-file-input
                                dense
                                outlined
                                append-icon="mdi-file"
                                prepend-icon
                                v-model="tax_card"
                                :rules="[
                                (files) =>
                                  !files ||
                                  !files.some((file) => file.size > 2e6) ||
                                  'الملف يجب أن يكون أقل من 2 ميجا',
                              ]"
                                label="البطاقة الضريبية"
                                multiple
                              ></v-file-input>
                            </v-col>
                          </v-row>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>

          <v-divider></v-divider>

          <v-row class="form-group">
            <v-col md="12" class="text-center">
              <v-btn
                class="job-submit col-md-2"
                color="orange"
                rounded
                light
                style="color: white"
                :loading="btn_loader"
                @click="update()"
              >تعديل
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="message" :color="error_type">
      {{ error_message }}
    </v-snackbar>
  </div>
</template>
<script>
  import $ from "jquery";
  import {mdiArrowLeft, mdiArrowRight, mdiClose, mdiPlus} from "@mdi/js";
  import Mobile from "@/components/common/mobile-input";

  export default {
    name: "SpeRegistration",
    components: {
      Mobile,
    },
    head() {
      return {
        titleTemplate: "%s - تعديل الحساب",
      };
    },
    data() {
      return {
        icons: {
          mdiArrowLeft,
          mdiArrowRight,
          mdiPlus,
          mdiClose,
        },
        storage_url: process.env.StorageUrl,
        employer: {
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
          name_en: "",
          name_ar: "",
          country_id: "",
          city_id: "",
          area_id: "",
          logo: null,
          tax_card: null,
          commercial_record: null,
          other_phone_numbers: [],
          about: "",
          company_size_id: "",
          businessCategoryData: ["0"],
          business_category: [],
          education_lvl: "",
          nationality: "",
          website: "",
        },
        logo: null,
        tax_card: null,
        commercial_record: null,
        countries: [],
        cities: [],
        areas: [],
        business_categories: [],
        company_sizes: [],
        nationalities: [],
        menu: false,
        query: this.$route.query,
        mockup_dialog: false,
        date: false,
        overlay: false,
        btn_loader: false,
        show_password: false,
        message: false,
        error_message: false,
        same_as_phone_number: false,
        error_type: "success",
        // Employer Data
        user: this.$auth.user ? this.$auth.user : {},
        user_data: {},
        v_loading: false,
      };
    },
    watch: {
      query() {
      },
      logo() {
        this.get_logo();
      },
      tax_card() {
        this.get_tax_card();
      },
      commercial_record() {
        this.get_commercial_record();
      },
    },
    computed: {},
    mounted() {
      this.check_query();
    },
    methods: {
      check_query() {
        if (this.user && this.user.employer) {
          if (
            !this.user.employer.tax_card &&
            !this.user.employer.commercial_record
          ) {
            if (this.query.verify && this.query.verify == 1) {
              this.message = true;
              this.error_type = "error";
              this.error_message =
                "أرسل أوراق الشركة لكي تستطيع الحصول على خدمات شغلني";
              this.$refs.empPapers.scrollIntoView();
            }
          }
        }
      },
      employer_data() {
        let user = this.$auth.user;
        let emp = user ? this.$auth.user.employer : null;
        if (emp) {
          this.employer.first_name = user.name.split(" ")[0]
            ? user.name.split(" ")[0]
            : "";
          this.employer.last_name = user.name.split(" ")[1]
            ? user.name.split(" ")[1]
            : "";
          this.employer.name_ar = emp.name_ar;
          this.employer.name_en = emp.name_en;
          this.employer.about = emp.about;
          this.employer.area_id = emp.area_id;
          this.employer.country_id = emp.country_id;
          this.employer.city_id = emp.city_id;
          if (emp.city_id) {
            this.getAreas(emp.city_id)
          }
          this.employer.website = emp.website;
          this.employer.company_size_id = emp.company_size_id;
          if (emp.business_categories) {
            for (let x = 0; x < emp.business_categories.length; x++) {
              this.employer.business_category.push(emp.business_categories[x].id);
            }
          }
        }
      },
      add_phone() {
        this.other_phone_numbers.push("");
      },
      update() {
        this.btn_loader = true;
        this.$axios.post("/employer/update", this.employer).then((response) => {
          this.btn_loader = false;
          this.message = true;
          this.error_type = "success";
          this.error_message = "تم بنجاح";
          this.$auth.fetchUser()
          this.$router.push("/employer/dashboard");
        });
      },
      get_logo() {
        const file = this.logo;
        const reader = new FileReader();
        let vm = this;
        reader.addEventListener(
          "load",
          function () {
            vm.employer.logo = reader.result;
          },
          false
        );
        if (file) {
          reader.readAsDataURL(file);
        }
      },
      get_tax_card() {
        const files = this.tax_card;
        this.employer.tax_card = [];
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          let vm = this;
          reader.addEventListener(
            "load",
            function () {
              vm.employer.tax_card.push(reader.result);
            },
            false
          );
          if (files[i]) {
            reader.readAsDataURL(files[i]);
          }
        }
      },
      get_commercial_record() {
        const files = this.commercial_record;
        this.employer.commercial_record = [];
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          let vm = this;
          reader.addEventListener(
            "load",
            function () {
              vm.employer.commercial_record.push(reader.result);
            },
            false
          );
          if (files[i]) {
            reader.readAsDataURL(files[i]);
          }
        }
      },
      getCountries() {
        this.$axios.get("/resource/country").then((response) => {
          this.countries = response.data;
        });
      },
      getCities() {
        this.$axios.get("/resource/city").then((response) => {
          this.cities = response.data;
        });
      },
      getAreas(city_id) {
        this.$axios.get("/resource/area?city_id="+city_id).then((response) => {
          this.areas = response.data;
        });
      },
      getBusinessCategories(resourceName, type) {
        this.$axios
          .get("/resource/businessCategory", {params: {type: type}})
          .then((response) => {
            this.business_categories = response.data;
          });
      },
      getCompanySizes(resourceName, type) {
        this.$axios
          .get("/resource/companySize", {params: {type: type}})
          .then((response) => {
            this.company_sizes = response.data;
          });
      },
      add_buss_cat() {
        this.employer.businessCategoryData.push("");
      },
      /**
       * Handle relation between areas dropdowns
       *
       *@param {object} dropdown
       */
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
      /**
       * Handle relation between areas dropdowns
       *
       * @param {object} dropdown
       */
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
    created() {
      this.employer_data();
      this.getCountries();
      this.getCities();
      this.getBusinessCategories();
      this.getCompanySizes();
    },
  };
</script>


<style scoped>
  .v-stepper__header {
    box-shadow: none !important;
  }

  .v-card {
    overflow-x: hidden;
  }

  .form-register {
    text-align: right;
    margin-bottom: 50px;
  }

  .clients {
    background-image: url("~assets/bg-mail-1.jpg");
    background-size: 100% 100%;
  }

  .label-form {
    width: auto !important;
  }

  input {
    font-size: 20px;
    width: auto;
    line-height: normal;
    padding: 8px;
  }
</style>
