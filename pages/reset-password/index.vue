<template>
  <div>
    <div class="container register-section">
      <div class="banner"></div>
      <br />
      <v-stepper v-model="current_step" :vertical="vertical" :alt-labels="altLabels" editable>
        <template>
          <v-stepper-header>
            <v-row class="mb-6 mt-5" no-gutters align="center" justify="center">
              <v-col cols="6" sm="6" align="center" justify="center">
                <v-btn
                  large
                  color
                  v-bind:class="{active: current_step >= 1}"
                  @click="current_step = 1"
                >تأكيد الهاتف ></v-btn>
              </v-col>
              <v-col cols="6" sm="6" align="center">
                <v-btn
                  large
                  color
                  v-bind:class="{active: current_step >= 2}"
                  @click="current_step = 2"
                >إعادة تعيين كلمة السر ></v-btn>
              </v-col>
            </v-row>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content :key="`1-content`" :step="1">
              <confirmPhone ref="pForm" :validateForm="validateP" @PhoneValidated="validatePhone" />
              <div class="text-center" style="margin-top: 50px;margin-bottom: 50px">
                <v-btn
                  color="orange"
                  rounded
                  light
                  large
                  shaped
                  x-large
                  :loading="phone_loader"
                  dark
                  @click.prevent="validatePhoneForm"
                >تأكيد</v-btn>
              </div>
            </v-stepper-content>
            <v-stepper-content :key="`2-content`" :step="2">
              <changePassword
                ref="rForm"
                :validateForm="validateR"
                @BasicValidated="validateReset"
              />
              <div class="text-center" style="margin-top: 50px;margin-bottom: 50px">
                <v-btn
                  color="orange"
                  rounded
                  light
                  large
                  shaped
                  x-large
                  :loading="password_loader"
                  style="color: white"
                  @click.prevent="validateResetPasswordForm"
                >إعادة تعيين</v-btn>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </template>
      </v-stepper>
    </div>
    <v-snackbar v-model="message" :color="error_type">{{ error_message }}</v-snackbar>
    <v-dialog v-model="verify_modal" persistent width="600">
      <v-card>
        <div class="logo-holder-modal">
          <img src="~/assets/logo-blue.png" width="200" />
        </div>
        <div class="verify-wrapper">
          <div class="verify-dialog">
            <h3>تم إرسال رسالة إلى رقم الهاتف برجاء التأكيد:</h3>
            <div class="verify-form">
              <input
                type="text"
                ref="first_input"
                maxlength="1"
                size="1"
                min="0"
                max="1"
                pattern="[0-9]{1}"
                @keyup="focus_next"
                onclick="this.setSelectionRange(0, this.value.length)"
              />
              <input
                type="text"
                maxlength="1"
                size="1"
                min="0"
                max="1"
                pattern="[0-9]{1}"
                @keyup="focus_next"
                onclick="this.setSelectionRange(0, this.value.length)"
              />
              <input
                type="text"
                maxlength="1"
                size="1"
                min="0"
                max="1"
                pattern="[0-9]{1}"
                @keyup="focus_next"
                onclick="this.setSelectionRange(0, this.value.length)"
              />
              <input
                type="text"
                maxlength="1"
                size="1"
                min="0"
                max="1"
                pattern="[0-9]{1}"
                @keyup="focus_next"
                onclick="this.setSelectionRange(0, this.value.length)"
              />
              <input
                type="text"
                maxlength="1"
                size="1"
                min="0"
                max="1"
                pattern="[0-9]{1}"
                @keyup="focus_next"
                onclick="this.setSelectionRange(0, this.value.length)"
              />
              <input
                type="text"
                maxlength="1"
                size="1"
                min="0"
                max="1"
                pattern="[0-9]{1}"
                @keyup="focus_next"
                onclick="this.setSelectionRange(0, this.value.length)"
              />
              <v-btn
                color="primary"
                width="400"
                light
                large
                shaped
                :loading="v_loading"
                @click="verify_code"
              >تأكيد</v-btn>
            </div>
            <div class="block_resend" v-if="verify_message">{{ verify_message }}</div>
            <div>
              لم يتم إرسال الرسالة؟
              <br />
              <a href="#" @click="resend_code" v-if="block_resend == 0">إعادة إرسال الكود؟</a>
              <div v-else>
                <a href="#">تم الإرسال</a>
                <div class="block_resend">
                  برجاء الإنتظار
                  <span></span> ثانية
                </div>
              </div>
              <br />
              <a href="#" @click="change_phone">تغيير رقم الهاتف</a>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import confirmPhone from "~/components/reset-password/confirm-phone";
import changePassword from "~/components/reset-password/change-password";
import VueSlickCarousel from "vue-slick-carousel";
import $ from "jquery";
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";

export default {
  name: "Registration",
  components: {
    confirmPhone,
    changePassword,
    VueSlickCarousel,
  },
  head() {
    return {
      titleTemplate: "%s - إعادة تعيين كلمة السر",
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
      change_phone_num: 0,
      verify_modal: false,
      user: {},
      message: false,
      error_message: false,
      error_type: "success",
      verify_message: "",
      vertical: false,
      phone_loader: false,
      password_loader: false,
      extra_loader: false,
      work_loader: false,
      v_loading: false,
      altLabels: false,
      editable: false,
      block_resend: 0,
      validateP: false,
      validateR: false,
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
    $("body").css("overflow", "auto");
  },
  methods: {
    validatePhoneForm() {
      this.validateP = !this.validateP;
    },
    validateResetPasswordForm() {
      this.validateR = !this.validateR;
    },
    validatePhone(status) {
      let data = this.$refs.pForm._data;
      if (status == false) {
        this.message = true;
        this.error_type = "error";
        this.error_message = "أكمل الحقول من فضلك";
        return;
      } else {
        this.confirm_phone(data);
      }
    },
    validateReset(status) {
      let data = this.$refs.rForm._data;
      if (status == false) {
        this.message = true;
        this.error_type = "error";
        this.error_message = "أكمل الحقول من فضلك";
        return;
      } else {
        this.change_password(data);
      }
    },
    confirm_phone(data) {
      this.phone_loader = true;
      this.$axios.post("/password/verify", data).then((response) => {
        this.phone_loader = false;
        if (response.data.error_code == 200) {
          this.user = response.data.data;
          this.message = true;
          this.error_type = "success";
          this.error_message = response.data.msg;
          this.verify_modal = true;
        } else if (response.data.error_code == 500) {
          this.message = true;
          this.error_type = "error";
          this.error_message = response.data.msg;
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
    get_verification_code() {
      let inputs = $(".verify-form input");
      let code = "";
      for (let x = 0; x < inputs.length; x++) {
        code += inputs[x].value;
      }
      return code;
    },
    change_password(data) {
      this.password_loader = true;
      this.$axios
        .post("/password/reset", {
          user_id: this.user.id,
          password: data.password,
        })
        .then((response) => {
          this.password_loader = false;
          if (response.data.error_code == 200) {
            this.verify_modal = true;
            this.message = true;
            this.error_type = "success";
            this.error_message = response.data.msg;
            this.$router.push("/");
          } else if (response.data.error_code == 500) {
            this.message = true;
            this.error_type = "error";
            this.error_message = "حدثت مشكلة برجاء المحاولة مرة أخرى";
          }
        });
    },
    change_phone() {
      this.verify_modal = false;
    },
    focus_next(e) {
      var t = $(e.target);
      t.next("input").focus();
    },
    verify_code() {
      this.v_loading = true;
      let data = this.$refs.pForm._data;
      let verification_code = this.get_verification_code();
      if (verification_code.length == 6) {
        this.$axios
          .post("/verify/code/password", {
            verification_code: verification_code,
            phone_number: data.phone_number,
          })
          .then((response) => {
            this.v_loading = false;
            if (response.data.error_code == 200) {
              let username = data.phone_number;
              this.verify_modal = false;
              this.current_step++;
              this.message = true;
              this.error_type = "success";
              this.error_message = "تم التأكيد بنجاح";
            } else {
              this.verify_message = "خطأ في رقم التأكيد";
            }
          });
      }
    },
    resend_code() {
      let data = this.$refs.pForm._data;
      this.$axios
        .post("/verify/resend", {
          phone_number: data.phone_number,
        })
        .then((response) => {
          let vm = this;
          if (response.data.error_code == 200) {
            if (response.data.smsStatus == "MESSAGE_SENT") {
              vm.block_resend = 1;
              this.message = true;
              this.error_type = "success";
              this.error_message = response.data.msg;
              var count = 60,
                timer = setInterval(function () {
                  $(".block_resend span").html(count--);
                  if (count == 0) {
                    vm.block_resend = 0;
                    clearInterval(timer);
                  }
                }, 1000);
            }
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
</style>
