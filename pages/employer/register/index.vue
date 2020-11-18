<template>
  <div>
    <div class="container register-section">
      <div class="clients">
        <h2 class="text-center">هنساعدك تعين الموظفين المناسبين في اسرع وقت</h2>
      </div>
      <div id="recaptcha-container"></div>

      <v-stepper
        v-model="current_step"
        :vertical="vertical"
        :alt-labels="altLabels"
        editable
      >
        <template>
          <v-stepper-header>
            <v-row
              class="pl-4 pr-4 mb-6 mt-5 d-flex align-items-center justify-content-center"
            >
              <v-col md="6" cols="12">
                <v-btn
                  x-large
                  block
                  :class="current_step >= 1 ? 'active' : 'not-active'"
                >
                  بيانات الاتصال وممثل الشركة
                  <span v-if="$vuetify.breakpoint.mdAndUp">></span>
                </v-btn>
              </v-col>
              <v-col md="6" cols="12">
                <v-btn
                  x-large
                  block
                  :class="current_step >= 2 ? 'active' : 'not-active'"
                  >المعلومات الأساسية للشركة</v-btn
                >
              </v-col>
            </v-row>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content :key="`1-content`" :step="1">
              <contact
                ref="cForm"
                :validateForm="validateC"
                :user="user"
                @ContactValidated="validateContact"
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
                  :loading="personal_loader"
                  dark
                  @click="validateContactForm"
                  v-if="update_form"
                  >تعديل</v-btn
                >
                <v-btn
                  color="orange"
                  rounded
                  light
                  large
                  shaped
                  :loading="personal_loader"
                  dark
                  @click="validateContactForm"
                  v-else-if="change_phone_num === 1"
                  >تعديل</v-btn
                >
                <v-btn
                  color="orange"
                  rounded
                  light
                  large
                  shaped
                  x-large
                  :loading="personal_loader"
                  dark
                  @click="validateContactForm"
                  v-else
                  >الإستمرار</v-btn
                >
              </div>
            </v-stepper-content>
            <v-stepper-content :key="`2-content`" :step="2">
              <basic
                ref="bForm"
                :validateForm="validateB"
                @BasicValidated="validateBasic"
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
                  :loading="personal_loader"
                  style="color: white"
                  @click="validateBasicForm"
                  >تسجيل</v-btn
                >
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </template>
      </v-stepper>
    </div>
    <verify_modal :user_id="user_id" :verify_modal="verify_modal" @changeVerifyModal="modal_state" @addStep="current_step++"></verify_modal>
    <v-snackbar v-model="message" :color="error_type">
      {{ error_message }}</v-snackbar>
    <v-row justify="center">
      <v-dialog v-model="phone_modal" persistent max-width="400" :rtl="true">
        <v-card>
          <v-row class="mb-4">
            <v-col md="12" class="logo-holder-modal text-center">
              <img class="mt-6 mb-6" src="~/assets/logo-blue.png" width="200" />
            </v-col>
          </v-row>
          <div class="verify-wrapper">
            <v-card-title :style="`direction: rtl; `"
              >هذا الهاتف مستخدم من قبل!</v-card-title
            >
            <v-card-text
              >إذا كان هذا هاتفك إضغط إستمرار لتأكيد البيانات وسيتم إرسال رسالة
              إلى هاتفك للتأكيد</v-card-text
            >
          </div>

          <v-card-actions>
            <v-btn color="primary" text @click="accept_update">الإستمرار</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="cancel_update">أغلق</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import verify_modal from "~/components/common/verifyModal";
import contact from "~/components/employer/register/contact";
import basic from "~/components/employer/register/basic";
import VueSlickCarousel from "vue-slick-carousel";
import $ from "jquery";
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";

export default {
  name: "Registration",
  components: {
    contact,
    basic,
    VueSlickCarousel,
    verify_modal,
  },
  head() {
    return {
      titleTemplate: "%s - تسجيل الدخول"
    };
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
      user: {},
      user_data: {},
      change_phone_num: 0,
      verify_modal: false,
      phone_modal: false,
      update_form: false,
      message: false,
      error_message: false,
      error_type: "success",
      verify_message: "",
      vertical: false,
      personal_loader: false,
      basic_loader: false,
      extra_loader: false,
      work_loader: false,
      v_loading: false,
      altLabels: false,
      editable: false,
      block_resend: 0,
      validateC: false,
      validateB: false,
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
    this.check_if_complete();
  },
  methods: {
    check_if_complete() {
      if (this.$route.query.type) {
        if (this.$route.query.type == "complete_registration") {
          this.current_step = 2;
          let user = this.$auth.user;
          let ContactData = {
            email: user.email,
            phone_number: user.phone_number,
            password: user.password,
          };
          this.$store.commit(
            "register/employer/EmployerRegistrationContact",
            ContactData
          );
        }
      }
    },
    validateContactForm() {
      // this.phone_modal = true;
      // this.user_data = "هذا الهاتف مستخدم من قبل";

      // this.verify_modal = true;

      this.validateC = !this.validateC;
    },
    validateBasicForm() {
      this.validateB = !this.validateB;
    },
    modal_state(status) {
      this.verify_modal = status
    },
    validateContact(status) {
      let data = this.$refs.cForm._data;
      if (status == false) {
        this.message = true;
        this.error_type = "error";
        this.error_message = "أكمل الحقول من فضلك";
        return;
      } else {
        let ContactData = {
          first_name: data.first_name,
          last_name: data.last_name,
          job_title: data.job_title,
          email: data.email,
          phone_number: data.phone_number,
          other_phone_numbers: data.other_phone_numbers,
          password: data.password,
        };
        this.$store.commit(
          "register/employer/EmployerRegistrationContact",
          ContactData
        );
        if (this.update_form == true) {
          this.update_data_phone(ContactData);
        } else if (this.change_phone_num == 1) {
          this.update_data(ContactData);
        } else {
          this.store_Personal(ContactData);
        }
      }
    },
    validateBasic(status) {
      let data = this.$refs.bForm._data;
      if (status == false) {
        this.message = true;
        this.error_type = "error";
        this.error_message = "أكمل الحقول من فضلك";
        return;
      } else {
        let BasicData = {
          company_name_en: data.company_name_en,
          company_name_ar: data.company_name_ar,
          country: data.country,
          city: data.city,
          area: data.area,
          logo: data.logo_base64,
          business_categories: data.businessCategoryData,
          website: data.website,
          company_size: data.company_size,
          tax_card: data.tax_card_base64,
          commercial_record: data.commercial_record_base64,
          about: data.about,
        };
        this.$store.commit(
          "register/employer/EmployerRegistrationBasic",
          BasicData
        );
        this.register();
      }
    },
    register() {
      this.personal_loader = true;
      let data = this.$store.state.register.employer.EmployerData;
      this.$axios.post("/employer/register", data).then((response) => {
        this.personal_loader = false;
        if (response.data.error_code == 200) {
          let username = data.phone_number;
          let password = data.password;
          this.$auth
            .loginWith("employer", { data: { username, password } })
            .then(() => {
              this.message = true;
              this.error_type = "success";
              this.error_message = "تم التسجيل بنجاح";
              window.location.replace("/employer/dashboard");
            });
        } else if (response.data.error_code == 500) {
          this.message = true;
          this.error_type = "error";
          this.error_message = "حدثت مشكلة برجاء المحاولة مرة أخرى";
        }
      });
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
    getOurClients() {
      this.$axios.get("/employer/our_clients").then((response) => {
        this.our_clients = response.data.data;
      });
    },
    store_Personal(data) {
      this.personal_loader = true;
      this.$axios.post("/employer/register/personal", data).then((response) => {
        this.personal_loader = false;
        if (response.data.error_code == 200) {
          this.user_id = response.data.data;
          this.message = true
          this.error_type = 'success'
          this.error_message = response.data.msg;
          this.verify_modal = true;
        } else if (response.data.error_code == 201) {
          this.phone_modal = true;
          this.user_data = response.data.data;
        } else if (response.data.error_code == 400) {
          this.message = true;
          this.error_type = "error";
          let messages = "";
          for (const [key, value] of Object.entries(response.data.data)) {
            for (const [key, value_validation] of Object.entries(value)) {
              messages += " " + value_validation;
            }
          }
          this.error_message = messages;
        } else {
          this.message = true;
          this.error_type = "error";
          this.error_message = "حدثت مشكلة برجاء المحاولة مرة أخرى";
        }
      });
    },

    accept_update() {
      this.update_form = true;
      this.user = this.user_data;
      this.phone_modal = false;
    },
    cancel_update() {
      this.phone_modal = false;
    },
    update_data_phone(data) {
      this.personal_loader = true;
      this.$axios
        .post("/employer/register/personal/update", {
          user_id: this.user_data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          other_phone_numbers: data.other_phone_numbers,
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          this.personal_loader = false;
          if (response.data.error_code == 200) {
            this.user_id = response.data.data;
            this.message = true
            this.error_type = 'success'
            this.error_message = response.data.msg;
            this.verify_modal = true;
          } else if (response.data.error_code == 400) {
            this.message = true;
            this.error_type = "error";
            let messages = "";
            for (const [key, value] of Object.entries(response.data.data)) {
              for (const [key, value_validation] of Object.entries(value)) {
                messages += " " + value_validation;
              }
            }
            this.error_message = messages;
          } else {
            this.message = true;
            this.error_type = "error";
            this.error_message = "حدثت مشكلة برجاء المحاولة مرة أخرى";
          }
        });
    },
    update_data(data) {
      this.personal_loader = true;
      this.$axios
        .post("/employer/register/personal/update", data)
        .then((response) => {
          this.personal_loader = false;
          if (response.data.error_code == 200) {
            this.user_id = response.data.data;
            this.message = true
            this.error_type = 'success'
            this.error_message = response.data.msg;
            this.verify_modal = true;
          } else if (response.data.error_code == 400) {
            this.message = true;
            this.error_type = "error";
            let messages = "";
            for (const [key, value] of Object.entries(response.data.data)) {
              for (const [key, value_validation] of Object.entries(value)) {
                messages += " " + value_validation;
              }
            }
            this.error_message = messages;
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
input {
  font-size: 20px;
  width: auto;
  line-height: normal;
  padding: 8px;
}
</style>
