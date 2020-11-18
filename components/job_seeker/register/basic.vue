<template>
  <div>
    <v-form ref="BasicForm" v-model="valid">
      <div class="form-register">
        <v-row class="form-group">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline" style="width: 100%">
              <v-col md="3" cols="12">
                <label class="label-form">الدولة:</label>
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
            <v-row class="d-flex align-items-baseline" style="width: 100%">
              <v-col md="3" cols="12">
                <label class="label-form">المحافظة:</label>
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
            <v-row class="d-flex align-items-baseline" style="width: 100%">
              <v-col md="3" cols="12">
                <label for="area" class="label-form">المنطقة:</label>
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
            <v-row class="d-flex align-items-baseline" style="width: 100%">
              <v-col md="3" cols="12">
                <label for="nationality" class="label-form">الجنسية:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="nationalities"
                  v-model="nationality"
                  :rules="[(v) => !!v || 'الجنسية مطلوبة',]"
                  label="الجنسية"
                  outlined
                  required
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline" style="width: 100%">
              <v-col md="3" cols="12">
                <label for class="label-form" style="width: 100% !important">المستوى التعليمي:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="education_lvls"
                  v-model="education_lvl"
                  :rules="[(v) => !!v || 'المستوى التعليمي مطلوب',]"
                  label="المستوى التعليمي"
                  outlined
                  required
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    validateForm: Boolean,
  },
  data() {
    return {
      countries: [],
      cities: [],
      areas: [],
      education_lvls: [],
      nationalities: [],
      country: '',
      city: '',
      area: '',
      education_lvl: 0,
      nationality: 0,
      valid: false,
    };
  },
  watch: {
    validateForm() {
      if (this.$refs.BasicForm.validate()) {
        this.$emit("BasicValidated", true);
      } else {
        this.$emit("BasicValidated", false);
      }
    },
  },
  mounted() {
    this.getCountries();
    this.getEducation_lvls();
    this.getNationalities();
  },
  methods: {
    getResource(resourceName, type) {
      this.$axios
        .get("/resource/" + resourceName, { params: { type: type } })
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    },
    getCountries(resourceName, type) {
      this.$axios
        .get("/resource/country", { params: { type: type } })
        .then((response) => {
          this.countries = response.data;
        });
    },
    getEducation_lvls(resourceName, type) {
      this.$axios
        .get("/resource/educationLevel", { params: { type: type } })
        .then((response) => {
          this.education_lvls = response.data;
        });
    },
    getNationalities(resourceName, type) {
      this.$axios
        .get("/resource/nationality", { params: { type: type } })
        .then((response) => {
          this.nationalities = response.data;
        });
    },
    change_education(education_id) {
      this.education_lvl = education_id;
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
