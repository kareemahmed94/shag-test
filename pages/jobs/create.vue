<template>
  <div>
    <div class="container register-section">
      <div class="clients">
        <h2 class="text-center">انشر بيانات وظيفتك !</h2>
      </div>
      <br />
      <v-stepper
        v-model="current_step"
        :vertical="vertical"
        :alt-labels="altLabels"
        editable
      >
        <template>
          <v-stepper-header class="mt-8">
            <v-row
              class="pl-4 pr-4 mb-6 mt-5 d-flex align-items-center justify-content-center"
            >
              <v-col md="3" cols="12">
                <v-btn
                  x-large
                  block
                  :class="current_step >= 1 ? 'active' : 'not-active'"
                >
                  بيانات الوظيفة
                  <span v-if="$vuetify.breakpoint.mdAndUp">></span>
                </v-btn>
              </v-col>

              <v-col md="3" cols="12">
                <v-btn
                  x-large
                  block
                  :class="current_step >= 2 ? 'active' : 'not-active'"
                >
                  متطلبات الوظيفة
                  <span v-if="$vuetify.breakpoint.mdAndUp">></span>
                </v-btn>
              </v-col>

              <v-col md="3" cols="12">
                <v-btn
                  x-large
                  block
                  :class="current_step >= 3 ? 'active' : 'not-active'"
                >
                  الراتب
                  <span v-if="$vuetify.breakpoint.mdAndUp">></span>
                </v-btn>
              </v-col>

              <v-col md="3" cols="12">
                <v-btn
                  x-large
                  block
                  :class="current_step >= 4 ? 'active' : 'not-active'"
                >
                  متطلبات أخرى
                  <span v-if="$vuetify.breakpoint.mdAndUp">></span>
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content :key="`1-content`" :step="1">
              <basic-info
                ref="biForm"
                :validateForm="validateBI"
                @BasicInfoValidated="validateBasicInfo"
              />
              <div
                class="text-center"
                style="margin-top: 50px; margin-bottom: 50px"
              >
                <v-btn
                  color="orange"
                  rounded
                  light
                  large
                  shaped
                  x-large
                  :loading="basic_info_loader"
                  dark
                  @click="validateBIForm"
                  >الإستمرار</v-btn
                >
              </div>
            </v-stepper-content>

            <v-stepper-content :key="`2-content`" :step="2">
              <v-btn
                class="ma-2 text-right"
                color="primary"
                @click="current_step--"
                dark
              >
                <v-icon dark>{{ icons.mdiArrowRight }}</v-icon>
              </v-btn>
              <basic-req
                ref="brForm"
                :validateForm="validateBR"
                @BasicReqValidated="validateBasicReq"
              />
              <div
                class="text-center"
                style="margin-top: 50px; margin-bottom: 50px"
              >
                <v-btn
                  color="orange"
                  rounded
                  light
                  large
                  shaped
                  x-large
                  :loading="basic_req_loader"
                  style="color: white"
                  @click="validateBRForm"
                  >الإستمرار</v-btn
                >
              </div>
            </v-stepper-content>

            <v-stepper-content :key="`3-content`" :step="3">
              <v-btn
                class="ma-2 text-right"
                color="primary"
                @click="current_step--"
                dark
              >
                <v-icon dark>{{ icons.mdiArrowRight }}</v-icon>
              </v-btn>
              <salary
                ref="sForm"
                :validateForm="validateS"
                @SalaryValidated="validateSalary"
              />
              <div
                class="text-center"
                style="margin-top: 50px; margin-bottom: 50px"
              >
                <v-btn
                  color="orange"
                  rounded
                  light
                  large
                  shaped
                  x-large
                  :loading="salary_loader"
                  style="color: white"
                  @click="validateSalaryForm"
                  v-if="change_phone_num === 0"
                  >الإستمرار</v-btn
                >
              </div>
            </v-stepper-content>

            <v-stepper-content :key="`4-content`" :step="4">
              <v-btn
                class="ma-2 text-right"
                color="primary"
                @click="current_step--"
                dark
              >
                <v-icon dark>{{ icons.mdiArrowRight }}</v-icon>
              </v-btn>
              <extra
                ref="eForm"
                :validateForm="validateE"
                @ExtraValidated="validateExtra"
              />
              <div
                class="text-center"
                style="margin-top: 50px; margin-bottom: 50px"
              >
                <v-btn
                  color="orange"
                  rounded
                  light
                  large
                  shaped
                  x-large
                  :loading="extra_loader"
                  style="color: white"
                  @click="validateExtraForm"
                  v-if="change_phone_num === 0"
                  >إنشاء</v-btn
                >
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </template>
      </v-stepper>
    </div>
    <v-snackbar v-model="message" :color="error_type">{{
      error_message
    }}</v-snackbar>

    <v-row justify="center">
      <v-dialog v-model="post_dialog" persistent max-width="290">
        <v-card class="verify_dialog">
          <v-card-title class="headline">لا يمكنك الإستمرار</v-card-title>
          <v-card-text class="body">{{ post_dialog_message }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="$router.push('/')">
              العودة للرئيسية
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import basicInfo from "~/components/job/create/basic-info";
import basicReq from "~/components/job/create/basic-requirements";
import extra from "~/components/job/create/extra";
import salary from "~/components/job/create/salary";
import VueSlickCarousel from "vue-slick-carousel";
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";
import $ from "jquery";

export default {
  name: "CreateJob",
  middleware: "verified-employer",
  auth: true,
  head() {
    return {
      titleTemplate: "%s - إنشاء وظيفة",
    };
  },
  components: {
    basicInfo,
    basicReq,
    extra,
    salary,
    VueSlickCarousel,
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiArrowRight,
      },
      current_step: 1,
      steps: 4,
      user_id: null,
      change_phone_num: 0,
      verify_modal: false,
      message: false,
      error_message: false,
      error_type: "success",
      verify_message: "",
      vertical: false,
      basic_req_loader: false,
      basic_info_loader: false,
      extra_loader: false,
      salary_loader: false,
      v_loading: false,
      altLabels: false,
      editable: false,
      block_resend: 0,
      validateS: false,
      validateE: false,
      validateBI: false,
      validateBR: false,
      post_status: false,
      post_dialog: false,
      post_dialog_message: "",
    };
  },
  watch: {
    steps(val) {
      if (this.current_step > val) {
        this.current_step = val;
      }
    },
  },
  computed: {
    years() {
      const year = new Date().getFullYear() - 16;
      return Array.from(
        { length: year - 1940 },
        (value, index) => 1940 + index
      );
    },
  },
  mounted() {
    this.can_post_job();
  },
  methods: {
    can_post_job() {
      this.$axios
        .post("/employer/jobs/check_posting_availability")
        .then((response) => {
          if (response.data.error_code == 200) {
            this.post_status = true;
          } else {
            this.post_status = false;
            this.post_dialog = true;
            this.post_dialog_message = response.data.msg;
            setTimeout(function () {
              window.location.replace("/");
            }, 10000);
          }
        });
    },
    validateBIForm() {
      this.validateBI = !this.validateBI;
    },
    validateBRForm() {
      this.validateBR = !this.validateBR;
    },
    validateSalaryForm() {
      this.validateS = !this.validateS;
    },
    validateExtraForm() {
      this.validateE = !this.validateE;
    },
    validateBasicInfo(status) {
      let data = this.$refs.biForm._data;
      if (status == false) {
        this.message = true;
        this.error_type = "error";
        this.error_message = "أكمل الحقول من فضلك";
        return;
      } else {
        let BIData = {
          job_name: data.job_name,
          addresses: data.addresses,
          category: data.category,
          employees_number: data.employees_number,
          shift_type: data.shift_type,
          job_details: data.job_details,
        };
        this.$store.commit("job/create/BasicInfo", BIData);
        this.current_step++;
      }
    },
    validateBasicReq(status) {
      let data = this.$refs.brForm._data;
      if (status == false) {
        this.message = true;
        this.error_type = "error";
        this.error_message = "أكمل الحقول من فضلك";
        return;
      } else {
        let BasicReqData = {
          min_exp: data.experience[0],
          max_exp: data.experience[1],
          min_age: data.age[0],
          max_age: data.age[1],
          require_car: data.require_car,
          require_bike: data.require_bike,
          require_heavy: data.require_heavy,
          education_lvl: data.education_lvl,
          experience_lvl: data.experience_lvl,
          job_type: data.job_type,
        };
        this.$store.commit("job/create/BasicRequirements", BasicReqData);
        this.current_step++;
      }
    },
    validateSalary(status) {
      let data = this.$refs.sForm._data;
      if (status == false) {
        this.message = true;
        this.error_type = "error";
        this.error_message = "أكمل الحقول من فضلك";
        return;
      } else {
        let SalaryData = {
          min_salary: data.min_salary,
          max_salary: data.max_salary,
          currency: data.currency,
          salary_period: data.salary_period,
          show_salary: data.show_salary,
          min_commission: data.min_commission,
          max_commission: data.max_commission,
        };
        this.$store.commit("job/create/Salary", SalaryData);
        this.current_step++;
      }
    },
    validateExtra(status) {
      let data = this.$refs.eForm._data;
      if (status == false) {
        this.message = true;
        this.error_type = "error";
        this.error_message = "أكمل الحقول من فضلك";
        return;
      } else {
        let ExtraData = {
          required_gender: data.required_gender,
          disability: data.disability,
          is_disability: data.is_disability,
          optional_requirements_labels: data.optional_requirements_labels,
          optional_requirements_values: data.optional_requirements_values,
          job_benefits_labels: data.job_benefits_labels,
          job_benefits_values: data.job_benefits_values,
        };
        this.$store.commit("job/create/Extra", ExtraData);
        this.store_data();
      }
    },
    onInput(val) {
      this.steps = parseInt(val);
    },
    nextStep(n) {
      if (n === this.steps) {
        this.current_step = 1;
      } else {
        this.current_step = n + 1;
      }
    },
    backStep(n) {
      if (n === 1) {
        this.current_step = 1;
      } else {
        this.current_step = n - 1;
      }
    },
    store_data() {
      this.extra_loader = true;
      let data = this.$store.state.job.create.JobData;
      this.$axios.post("/job/jobs", data).then((response) => {
        this.extra_loader = false;
        if (response.data.error_code == 200) {
          this.$router.push("/employer/dashboard");
          this.message = true;
          this.error_type = "success";
          this.error_message = "تم الإضافة بنجاح";
        } else if (response.data.error_code == 500) {
          this.message = true;
          this.error_type = "error";
          this.error_message = "أكمل الحقول من فضلك";
        } else {
          this.message = true;
          this.error_type = "error";
          this.error_message = "حدثت مشكلة برجاء المحاولة مرة أخرى";
        }
      });
    },
  },
};
</script>

<style scoped>
.v-stepper__header {
  box-shadow: none !important;
}
.v-stepper__header {
  height: auto;
}
.v-card {
  overflow-x: hidden;
}
.active {
  border-radius: 15px;
  background-color: #0e4168;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
}

.not-active {
  border-radius: 15px;
  background-color: #f2f4f5;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #85a1b7;
  box-shadow: none !important;
}
</style>
