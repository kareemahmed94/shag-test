<template>
  <div>
    <v-form ref="ExtraForm" v-model="valid">
      <div class="form-work">
        <h2>إمكانية التنقل</h2>
        <v-row class="d-flex justify-content-center">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="4" cols="12">
                <label class="label-form" style="width: 100%">الدولة:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="countries"
                  v-model="moving_country"
                  label="الدولة"
                  outlined
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-content-center">
          <v-col md="6" cols="12">
            <v-row>
              <v-col md="4" cols="12">
                <label class="label-form" style="width: 100%">الانتقال لمحافظات أخرى:</label>
              </v-col>
              <v-col md="8" cols="12">
                <div class="radio-input">
                  <label class="radio-inline">
                    <input type="radio" value="1" v-model="internationalTravel" />
                    نعم
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="2" v-model="internationalTravel" checked />
                    لا
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="3" v-model="internationalTravel" />
                    في حالة توفير سكن
                  </label>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row
          class="d-flex justify-content-center"
          v-if="internationalTravel == 1 || internationalTravel == 3"
        >
          <v-col md="6" cols="12">
            <v-row>
              <v-col md="8" cols="12" class="ml-0 mr-auto">
                <v-select
                  dense
                  multiple
                  :items="cities"
                  v-model="moving_city"
                  label="المحافظة"
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <h2>معلومات اضافية</h2>
        <v-row class="d-flex justify-content-center">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="4" cols="12">
                <label class="label-form" style="width: 100%">حالة البحث عن العمل:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="job_seeker_statuses"
                  v-model="job_seeker_status"
                  label="حالة العمل"
                  outlined
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </v-col>

              <v-row>
                <v-col md="6" sm="12" cols="12" class="text-right">
                  <label class="radio-inline">
                    <input type="checkbox" name="find_me" value="1" v-model="find_me" />
                    دع الشركات تجدني على شغلني (موصى به)
                  </label>
                </v-col>
                <v-col md="6" cols="12" class="text-right">
                  <label class="radio-inline">
                    <input type="checkbox" name="public_profile" value="1" v-model="public_profile" />
                    اجعل ملفي الشخصي عامًا (موصى به)
                  </label>
                </v-col>
              </v-row>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-content-center">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="4" cols="12">
                <label class="label-form" style="width: 100%">الحالة الاجتماعية:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="martialStatuses"
                  v-model="martialStatus"
                  label="الحالة الإجتماعية"
                  outlined
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-content-center">
          <v-col md="6" cols="12">
            <v-row class="d-flex">
              <v-col md="4" cols="12">
                <label class="label-form" style="width: 100%">هل تقبل العمل فى ورديات :</label>
              </v-col>
              <v-col md="8" cols="12">
                <div class="radio-input">
                  <label class="radio-inline">
                    <input type="radio" value="1" v-model="acceptWorkInShifts" />
                    نعم
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="0" v-model="acceptWorkInShifts" checked />
                    لا
                  </label>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-content-center" v-if="acceptWorkInShifts == 1">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="4" cols="12"></v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  multiple
                  :items="shift_types"
                  v-model="shift_type"
                  label="الورديات"
                  outlined
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-row class="d-flex justify-content-center">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-center">
              <v-col md="8" cols="12">
                <label class="label-form" style="width: 100%">هل لديك حالة صحية تعوق عن بعض الأعمال؟</label>
              </v-col>
              <v-col md="4" cols="12" class="radio-input">
                <label class="radio-inline">
                  <input
                    type="radio"
                    name="od"
                    @change="open_disablilities(0)"
                    v-model="is_disability"
                    value="1"
                  />
                  نعم
                </label>
                <label class="radio-inline">
                  <input
                    type="radio"
                    name="od"
                    @change="open_disablilities(1)"
                    v-model="is_disability"
                    value="0"
                    checked
                  />
                  لا
                </label>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-content-center" v-if="disability_status === 0">
          <v-col md="6" cols="12">
            <v-row class="d-flex">
              <v-col md="8" cols="12">
                <label
                  class="label-form"
                  style="width: 100%"
                >اختر واحدة على الاقل لكي نتمكن من ترشيح أكثر الوظائف المناسبة</label>
              </v-col>
              <v-col md="4" cols="12">
                <div class="radio-input" v-for="dis in disabilities" :key="dis.id+dis.name_ar">
                  <label class="radio-inline" style="text-align: center">
                    <input
                      type="radio"
                      name="disabilities"
                      v-model="disability"
                      :value="dis.id"
                      :disabled="disability_status==1"
                    />
                    {{dis.name_ar }}
                  </label>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </div>
</template>
<script>
/* eslint-disable */

export default {
  components: {},
  props: {
    validateForm: Boolean,
  },
  data() {
    return {
      valid: false,
      value: [],
      countries: [],
      martialStatuses: [],
      shift_types: [],
      job_seeker_statuses: [],
      cities: [],
      disabilities: [],
      citiesData: [],
      required_gender: "",
      loading: false,
      is_disability: 0,
      disability: "",
      find_me: true,
      public_profile: true,
      moving_country: 0,
      shift_type: [],
      martialStatus: 0,
      moving_city: [],
      job_seeker_status: 0,
      internationalTravel: "",
      localTravel: "",
      acceptWorkInShifts: "",
      disability_status: 1,
    };
  },
  watch: {
    validateForm() {
      if (this.$refs.ExtraForm.validate()) {
        this.$emit("ExtraValidated", true);
      } else {
        this.$emit("ExtraValidated", false);
      }
    },
  },
  mounted() {
    this.getCountries();
    this.getMartialStatuses();
    this.getShiftTypes();
    this.getJobSeekerStatuses();
    this.getCities();
    this.getDisabilities();
  },
  methods: {
    getResource(resourceName, type) {
      this.$axios
        .get("/resource/" + resourceName, { params: { type: type } })
        .then((response) => {
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
    getMartialStatuses(resourceName, type) {
      this.$axios
        .get("/resource/martialStatus", { params: { type: type } })
        .then((response) => {
          this.martialStatuses = response.data;
        });
    },
    getShiftTypes(resourceName, type) {
      this.$axios
        .get("/resource/shiftType", { params: { type: type } })
        .then((response) => {
          this.shift_types = response.data;
        });
    },
    getJobSeekerStatuses(resourceName, type) {
      this.$axios
        .get("/resource/jobSeekerStatus", { params: { type: type } })
        .then((response) => {
          this.job_seeker_statuses = response.data;
        });
    },
    getCities(resourceName, type) {
      this.$axios
        .get("/resource/city", { params: { type: type } })
        .then((response) => {
          this.cities = response.data;
        });
    },
    getDisabilities(resourceName, type) {
      this.$axios
        .get("/resource/disability", { params: { type: type } })
        .then((response) => {
          this.disabilities = response.data;
        });
    },
    getNationalities(resourceName, type) {
      this.$axios
        .get("/resource/nationality", { params: { type: type } })
        .then((response) => {
          this.nationalities = response.data;
        });
    },
    open_disablilities(state) {
      this.disability_status = state;
      if (state == 1) {
        this.disability = "";
      }
    },
  },
};
</script>
<style scoped>
.v-spinner {
  display: block;
  background-color: transparent !important;
  padding: 0 !important;
  position: inherit !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  left: 0;
  top: 0;
  opacity: 1;
  overflow: auto;
  height: 50px;
}
</style>
