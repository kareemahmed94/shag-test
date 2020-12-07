/* eslint-disable */
<template>
  <v-row
    class="login-modal login_container login d-flex flex-row ma-0 pa-0 align-items-around justify-content-center"
  >
    <v-col md="12" cols="12">
      <v-row>
        <v-col
          md="12"
          cols="12"
          class="d-flex justify-content-center align-items-center flex-column"
        >
          <div class="close-login-modal" @click="close_modal">×</div>
          <img
            alt="Shaghalni logo"
            src="~/assets/logo.png?webp"
            class="logo-white ml-auto mr-auto"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col md="12" cols="12">
      <v-row
        class="text-center d-flex align-items-center justify-content-center"
      >
        <v-col md="4" cols="10" class="ml-auto mr-auto">
          <form class="form-signin" @submit.prevent="login">
            <v-row>
              <v-col md="3" cols="12">
                <label for="inputUsername" v-if="worker == 1">رقم الهاتف</label>
                <label for="inputUsername" v-else>البريد الإلكتروني</label>
              </v-col>
              <v-col md="9" cols="12">
                <input
                  type="text"
                  id="inputUsername"
                  class="form-control login-input"
                  v-model="form.username"
                  required
                  autofocus
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col md="3" cols="12">
                <label for="inputPassword">كلمة المرور</label>
              </v-col>
              <v-col md="9" cols="12">
                <input
                  type="password"
                  id="inputPassword"
                  class="form-control login-input"
                  v-model="form.password"
                  required
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col md="6" cols="12" class="ml-auto mr-auto text-center">
                <input
                  type="checkbox"
                  value="remember-me"
                  class="login-checkbox"
                />
                <label for="remember-me">أبق تسجيل دخولي</label>
              </v-col>
            </v-row>


            <v-row>
              <button
                class="btn btn-lg btn-primary btn-block"
                id="login-btn"
                type="submit"
              >
                تسجيل الدخول
              </button>
            </v-row>

            <v-row>
              <v-col md="12" cols="12" class="ml-auto mr-auto text-center text--white">
                <a
                  style="color: #f3922a"
                  href="#"
                  class="forget-password"
                  @click="get_forget_password()"
                  >هل نسيت كلمة المرور؟</a
                >
              </v-col>
            </v-row>
          </form>
          <v-row class="mt-5">
            <v-col md="12" cols="12" class="ml-auto mr-auro text-center">
              <p class="text-center">
                مستخدم جديد؟
                <span
                  class="subscribe-now-text"
                  @click="worker == 0 ? register_employer() : register_worker()"
                >
                  اشترك الآن
                </span>
                ودعونا نتواصل
              </p>
            </v-col>
          </v-row>
          <v-snackbar v-model="message" :color="error_type">
            {{ error_message }}
          </v-snackbar>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import $ from "jquery";

export default {
  name: "Login",
  data() {
    return {
      color: "#0d4168",
      size: "20px",
      error_type: "success",
      error_message: "",
      message: false,
      form: {
        username: "",
        password: "",
      },
    };
  },
  created() {
    const onEscape = (e) => {
      if (e.keyCode === 27) {
        this.close_modal();
      }
    };
    document.addEventListener("keydown", onEscape);
    this.$once("hook:destroyed", () => {
      document.removeEventListener("keydown", onEscape);
    });
  },
  watch: {
    validateForm() {
      if (this.$refs.basicInfoForm.validate()) {
        this.$emit("BasicInfoValidated", true);
      } else {
        this.$emit("BasicInfoValidated", false);
      }
    },
  },
  props: ["worker"],
  methods: {
    async login() {
      const { username, password } = this.form;
      const type = this.worker == 1 ? "job_seeker" : "employer";
      try {
        let response;
        let vm = this;
        if (this.worker == 1) {
          response = await this.$auth
            .loginWith("job_seeker", { data: { username, password } })
            .then(() => {
              this.message = true;
              this.error_type = "success";
              this.error_message = "تم التسجيل بنجاح";
              this.$router.go();
            })
            .catch((e) => {
              this.message = true;
              this.error_type = "error";
              this.error_message = "خطأ في رقم الهاتف أو كلمة المرور";
            });
        } else {
          response = await this.$auth
            .loginWith("employer", { data: { username, password } })
            .then(() => {
              this.message = true;
              this.error_type = "success";
              this.error_message = "تم التسجيل بنجاح";
              this.$router.go();
            })
            .catch((e) => {
              this.message = true;
              this.error_type = "error";
              this.error_message = "خطأ في البريد أو كلمة المرور";
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
    show_message(response) {
      this.message = true;
      this.error_type = response.data.error_code == 200 ? "success" : "error";
      this.error_message = response.data.msg;
    },
    get_forget_password() {
      this.$router.push("/reset-password");
      this.close_modal();
    },
    close_modal() {
      this.$emit("close_modal", true);
      $(".login-modal").fadeOut("fast", function () {});
      $("body").css("overflow", "auto");
    },
    register_worker() {
      this.$router.push("/job-seeker/register");
      this.close_modal();
    },
    register_employer() {
      this.$router.push("/employer/register");
      this.close_modal();
    },
  },
};
</script>
