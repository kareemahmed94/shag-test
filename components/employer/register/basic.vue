<template>
  <div>
    <v-form ref="basicForm" v-model="valid">
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
                  v-model="company_name_en"
                  label="اسم الشركة إنجليزي"
                  :rules="[(v) => !!v || 'اسم الشركة إنجليزي مطلوب',]"
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
                <label for="name_ar" class="label-form">اسم الشركة:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  dense
                  v-model="company_name_ar"
                  label="اسم الشركة عربي"
                  :rules="[(v) => !!v || 'اسم الشركة عربي مطلوب',]"
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
                <label for="country" class="label-form">الدولة (مقر الشركة):</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="countries"
                  v-model="country"
                  :rules="[(v) => !!v || 'الدولة مطلوبة',]"
                  label="الدولة"
                  outlined
                  item-value="id"
                  item-text="name_ar"
                  @change="countryUpdateSelect()"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="city" class="label-form">المحافظة:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="cities"
                  v-model="city"
                  :rules="[(v) => !!v || 'المحافظة مطلوبة',]"
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
                  v-model="area"
                  label="المنطقة"
                  outlined
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="category" class="label-form">مجال العمل:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-row v-for="(bc,index) in businessCategoryData" :key="'bc'+index">
                  <v-col cols="12">
                    <v-select
                      dense
                      :append-outer-icon="index === 0 ? icons.mdiPlus : icons.mdiClose"
                      @click:append-outer="index === 0 ? add_buss_cat() : $delete(businessCategoryData, index)"
                      :items="business_categories"
                      v-model="businessCategoryData[index]"
                      label="مجال العمل"
                      outlined
                      item-value="id"
                      item-text="name_ar"
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
                <label for="company_size" class="label-form">حجم الشركة :</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="company_sizes"
                  v-model="company_size"
                  label="حجم الشركة"
                  outlined
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label
                  for="website"
                  class="label-form"
                  style="width: 100% !important"
                >الموقع الإلكتروني:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field dense v-model="website" label="الموقع الإلكتروني" outlined></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="job_details" class="label-form">عن الشركة:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-textarea
                  dense
                  outlined
                  name="input-7-4"
                  label="عن الشركة"
                  v-model="about"
                  :rules="[(v) => !!v || 'عن الشركة مطلوب',]"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="logo" class="label-form">اللوجو :</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-file-input
                  dense
                  outlined
                  accept="image/png, image/jpeg, image/bmp"
                  :rules="[(v) => !!v || 'الصورة الشخصية مطلوبة',
              (v) => !v || v.size < 1000000 || 'حجم الصورة يجب أن يكون أقل من 1 ميجا!',]"
                  v-model="logo"
                  append-icon="mdi-camera"
                  prepend-icon
                  label="اللوجو"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="logo" class="label-form">أوراق التفعيل :</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-card class max-width="500">
                  <v-card-text>
                    <v-row class="form-group">
                      <v-col md="12" cols="12">
                        <v-file-input
                          dense
                          outlined
                          v-model="commercial_record"
                          :rules="[files => !files || !files.some(file => file.size > 2e6) || 'الملف يجب أن يكون أقل من 2 ميجا']"
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
                          :rules="[files => !files || !files.some(file => file.size > 2e6) || 'الملف يجب أن يكون أقل من 2 ميجا']"
                          label="البطاقة الضريبية"
                          multiple
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
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
import { mdiPlus, mdiClose } from "@mdi/js";

export default {
  name: "Basic",

  props: {
    validateForm: Boolean,
  },
  data() {
    return {
      icons: {
        mdiPlus,
        mdiClose,
      },
      countries: [],
      cities: [],
      areas: [],
      business_categories: [],
      company_sizes: [],
      nationalities: [],
      citiesData: [],
      commercial_record: [],
      tax_card: [],
      logo_loading: false,
      loading: false,
      valid: false,
      areasData: [],
      logo_status: "ready",
      message: "",
      status: "",
      avatar: null,
      business_categoriesData: [],
      company_name_en: "",
      company_name_ar: "",
      country: '',
      city: '',
      area: '',
      logo: null,
      logo_base64: "",
      tax_card_base64: [],
      commercial_record_base64: [],
      about: "",
      company_size: "",
      businessCategoryData: ["0"],
      business_category: "",
      education_lvl: "",
      nationality: "",
      website: "",
    };
  },
  watch: {
    validateForm() {
      if (this.$refs.basicForm.validate()) {
        this.$emit("BasicValidated", true);
      } else {
        this.$emit("BasicValidated", false);
      }
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
  mounted() {
    this.getCountries();
    this.getBusinessCategories();
    this.getCompanySizes();
  },
  methods: {
    get_logo() {
      this.logo_status = 'uploading'
      this.logo_loading = true
      const file = this.logo;
      const reader = new FileReader();
      let vm = this;
      reader.addEventListener(
        "load",
        function () {
          vm.logo_base64 = reader.result;
          vm.logo_loading = true
          vm.logo_status = 'ready'
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    get_tax_card() {
      const files = this.tax_card;
      this.tax_card_base64 = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        let vm = this;
        reader.addEventListener(
          "load",
          function () {
            vm.tax_card_base64.push(reader.result);
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
      this.commercial_record_base64 = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        let vm = this;
        reader.addEventListener(
          "load",
          function () {
            vm.commercial_record_base64.push(reader.result);
          },
          false
        );
        if (files[i]) {
          reader.readAsDataURL(files[i]);
        }
      }
    },
    getCountries(resourceName, type) {
      this.$axios
        .get("/resource/country", { params: { type: type } })
        .then((response) => {
          this.countries = response.data;
        });
    },
    getBusinessCategories(resourceName, type) {
      this.$axios
        .get("/resource/businessCategory", { params: { type: type } })
        .then((response) => {
          this.business_categories = response.data;
        });
    },
    getCompanySizes(resourceName, type) {
      this.$axios
        .get("/resource/companySize", { params: { type: type } })
        .then((response) => {
          this.company_sizes = response.data;
        });
    },
    add_buss_cat() {
      this.businessCategoryData.push("");
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
