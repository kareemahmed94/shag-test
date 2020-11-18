<template>
  <div>
    <v-form ref="basicReqForm" v-model="valid">
      <div class="form-post-job">
        <h2>متطلبات الوظيفة الأساسية</h2>
        <v-row class="form-group">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-center text-right">
              <v-col md="3" cols="12">
                <label for="edu_lvl" class="label-form">المؤهل المطلوب</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="education_lvls"
                  v-model="education_lvl"
                  :rules="[(v) => !!v || 'الحد الأدنى للمؤهل مطلوبة']"
                  label="الحد الأدنى للمؤهل"
                  outlined
                  required
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-baseline text-right">
              <v-col md="3" cols="12">
                <label for="job_type" class="label-form">نوع الوظيفة</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="job_types"
                  v-model="job_type"
                  :rules="[(v) => !!v || 'نوع الوظيفة مطلوبة']"
                  label="نوع الوظيفة"
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
          <v-col md="12" cols="12">
            <v-row class="d-flex align-items-center text-right">
              <v-col md="2" cols="12">
                <label for="" class="label-form">المستوى الوظيفي</label>
              </v-col>
              <v-col md="10" cols="12">
                <v-radio-group
                  :column="false"
                  class="d-flex flex-row"
                  v-model="experience_lvl"
                  :rules="[(v) => !!v || 'المستوى الوظيفي مطلوب']"
                  required
                >
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      v-for="experienceLvl in experience_lvls"
                      :key="experienceLvl.id"
                    >
                      <label
                        :for="'st' + experienceLvl.id"
                        class="radio-label"
                        v-bind:class="{
                          active: experience_lvl == experienceLvl.id,
                        }"
                        @click="experience_lvl = experienceLvl.id"
                      >{{ experienceLvl.name_ar }}</label
                      >
                      <v-radio
                        :id="'st' + experienceLvl.id"
                        :value="experienceLvl.id"
                        class="radio-btn"
                      ></v-radio>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-center text-right">
              <v-col md="4" cols="12">
                <label for="" class="label-form">رخصة قيادة سيارة</label>
              </v-col>
              <v-col md="8" cols="12" class="d-flex flex-row">
                <v-col md="4">
                  <label
                    for="rc_f"
                    class="radio-label"
                    v-bind:class="{ active: require_car === '0' }"
                    @click="require_car = '0'"
                  >لا يشترط</label
                  >
                  <input
                    id="rc_f"
                    type="radio"
                    name="require_car"
                    value="0"
                    class="radio-btn"
                    v-model="require_car"
                  />
                </v-col>
                <v-col md="4">
                  <label
                    for="rc_t"
                    class="radio-label"
                    v-bind:class="{ active: require_car === '1' }"
                    @click="require_car = '1'"
                  >يشترط</label
                  >
                  <input
                    id="rc_t"
                    type="radio"
                    name="require_car"
                    value="1"
                    class="radio-btn"
                    v-model="require_car"
                  />
                </v-col>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-center text-right">
              <v-col md="4" cols="12">
                <label for="" class="label-form">رخصة دراجة نارية</label>
              </v-col>
              <v-col md="8" cols="12" class="d-flex flex-row">
                <v-col md="4">
                  <label
                    for="rb_f"
                    class="radio-label"
                    v-bind:class="{ active: require_bike === '0' }"
                    @click="require_bike = '0'"
                  >لا يشترط</label
                  >
                  <input
                    id="rb_f"
                    type="radio"
                    value="0"
                    name="require_bike"
                    class="radio-btn"
                    v-model="require_bike"
                  />
                </v-col>
                <v-col md="4">
                  <label
                    for="rb_t"
                    class="radio-label"
                    v-bind:class="{ active: require_bike === '1' }"
                    @click="require_bike = '1'"
                  >يشترط</label
                  >
                  <input
                    id="rb_t"
                    type="radio"
                    value="1"
                    name="require_bike"
                    class="radio-btn"
                    v-model="require_bike"
                  />
                </v-col>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-center text-right">
              <v-col md="4" cols="12">
                <label for="" class="label-form"> رخصة معدات ثقيلة </label>
              </v-col>
              <v-col md="8" cols="12" class="d-flex flex-row">
                <v-col md="4">
                  <label
                    for="rh_f"
                    class="radio-label"
                    v-bind:class="{ active: require_heavy === '0' }"
                    @click="require_heavy = '0'"
                  >لا يشترط</label
                  >
                  <input
                    id="rh_f"
                    type="radio"
                    value="0"
                    name="require_heavy"
                    class="radio-btn"
                    v-model="require_heavy"
                  />
                </v-col>
                <v-col md="4">
                  <label
                    for="rh_t"
                    class="radio-label"
                    v-bind:class="{ active: require_heavy === '1' }"
                    @click="require_heavy = '1'"
                  >يشترط</label
                  >
                  <input
                    id="rh_t"
                    type="radio"
                    value="1"
                    name="require_heavy"
                    class="radio-btn"
                    v-model="require_heavy"
                  />
                </v-col>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-center text-right">
              <v-col md="3" cols="12">
                <label class="label-form">السن المطلوب</label>
              </v-col>
              <v-col md="8" cols="11" class="ml-auto mr-auto">
                <v-range-slider
                  color="#f3922a"
                  v-model="age"
                  :min="18"
                  :max="60"
                  step="1"
                  height="10"
                  persistent-hint
                  thumb-label="always"
                ></v-range-slider>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-center text-right">
              <v-col md="4" cols="12">
                <label class="label-form"> سنين الخبرة المطلوبة</label>
              </v-col>
              <v-col md="8" cols="11" class="ml-auto mr-auto">
                <v-range-slider
                  color="#f3922a"
                  v-model="experience"
                  persistent-hint
                  :min="0"
                  :max="20"
                  step="1"
                  height="10"
                  thumb-label="always"
                ></v-range-slider>
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
  props: {
    validateForm: Boolean,
    job_post: {}
  },
  data() {
    return {
      education_lvls: [],
      job_types: [],
      experience_lvls: [],
      message: "",
      valid: false,
      status: "",
      experience: [0, 20],
      age: [15, 60],
      min_exp: "",
      max_exp: "",
      min_age: "",
      max_age: "",
      job_type: 0,
      require_car: 0,
      require_bike: 0,
      require_heavy: 0,
      education_lvl: 0,
      experience_lvl: "",
    };
  },
  watch: {
    validateForm() {
      if (this.$refs.basicReqForm.validate()) {
        this.$emit("BasicReqValidated", true);
      } else {
        this.$emit("BasicReqValidated", false);
      }
    },
    job_post() {
      this.experience_lvl = this.job_post.experience_level_id
      this.education_lvl = this.job_post.min_education_level_id
      this.job_type = this.job_post.job_type_id
      this.experience[0] = this.job_post.min_expirence_years
      this.experience[1] = this.job_post.max_expirence_years
      this.age[0] = this.job_post.min_age
      this.age[1] = this.job_post.max_age
      this.require_car = this.job_post.require_car_licence
      this.require_bike = this.job_post.require_bike_licence
      this.require_heavy = this.job_post.require_heavy_machine_licence
    }
  },
  async mounted() {
    this.getEducationLVLS();
    this.getExperienceLVLS();
    this.getJobTypes();
  },
  methods: {
    getEducationLVLS() {
      this.$axios.get("/resource/educationLevel").then((response) => {
        this.education_lvls = response.data;
      });
    },
    getExperienceLVLS() {
      this.$axios.get("/resource/experienceLevel").then((response) => {
        this.experience_lvls = response.data;
      });
    },
    getJobTypes() {
      this.$axios.get("/resource/jobType").then((response) => {
        this.job_types = response.data;
      });
    },
    switchRadio(e) {
      let target_id = e.target.getAttribute("id");
      let target_name = e.target.getAttribute("name");
      for (let x = 0; x < $("input[name=" + target_name + "]").length; x++) {
        let inp_id = $("input[name=" + target_name + "]")[x].getAttribute("id");
        $('label[for="' + inp_id + '"]').removeClass("active");
        $("#" + inp_id).attr("checked", false);
      }
      $('label[for="' + target_id + '"]').addClass("active");
      $("#" + target_id).attr("checked", "checked");
    },
  },
};
</script>
<style>
.error-modal {
  left: -450px !important;
  float: right;
}
.form-group {
  margin-right: 0 !important;
}
.label-form {
  width: auto;
}
</style>
