<template>
  <v-row class="login-banner ml-auto mr-auto pa-3">
    <v-col md="12" cols="10" class="ml-auto mr-auto">
      <v-row>
        <v-col md="12" cols="12">
          <nuxt-link to="/">
            <img src="~/assets/logo.png" />
          </nuxt-link>
        </v-col>
      </v-row>

      <v-row class="ml-auto mr-auto" style="color: white">
        <!-- <v-row class="text-center"> -->
        <v-col md="12" cols="12" class="text-center">
          <span style="font-size: 14px">سوف نساعدك في تعيين الموظفين المناسبين لك</span>
        </v-col>
        <!-- </v-row> -->
        <!-- <v-row class="text-center"> -->
        <v-col md="12" cols="12" class="text-center">
          <span style="font-size: 24px">في اسرع وقت</span>
        </v-col>
        <!-- </v-row> -->
        <v-row class="text-center">
          <form class="form-signin ml-auto mr-auto" @submit.prevent="login">
            <v-row class="input-group-holder">
              <v-col md="3" cols="12">
                <label for="inputUsername">البريد الإلكتروني</label>
              </v-col>
              <v-col md="9" cols="12">
                <v-text-field
                  v-model="form.username"
                  type="email"
                  solo
                  background-color="#d3dbdf"
                  label="البريد الإلكتروني"
                  required
                  name="input-10-1"
                />
              </v-col>
            </v-row>
            <v-row class="input-group-holder">
              <v-col md="3" cols="12">
                <label for="inputPassword">كلمة المرور</label>
              </v-col>
              <v-col md="9" cols="12">
                <v-text-field
                  v-model="form.password"
                  type="password"
                  solo
                  background-color="#d3dbdf"
                  label="كلمة المرور"
                  required
                  name="input-10-1"
                />
              </v-col>
            </v-row>
            <v-row class="row">
              <v-col md="12" cols="12" class="d-flex align-items-center justify-content-center">
                <v-checkbox
                  dark
                  class="remember-me-holder"
                  label="أبق تسجيل دخولي"
                  value="remember-me"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col
                md="12"
                cols="12"
                class="d-flex pt-6 align-items-center justify-content-center"
              >
                <a
                  style="color: #f3922a"
                  href="#"
                  class="forget-password"
                  @click="get_forget_password()"
                >هل نسيت كلمة المرور؟</a>
              </v-col>
            </v-row>
            <!-- <div class="row">
              <div class="col-lg-offset-right-4 col-lg-8">
                <div class="row">
                  <div class="remember-me-holder col-md-auto col-12">
                    <input type="checkbox" value="remember-me" class="float-right login-checkbox" />
                  </div>
                  <div class=" col-md-auto col-12">
                    <label for="" class="float-right"></label>
                  </div>
                </div>
              </div>
            </div>-->
            <v-row class="text-center">
              <v-col md="6" cols="12" class="text-center ml-auto mr-auto">
                <v-btn class="ml-auto mr-auto job-submit" dark type="submit">تسجيل الدخول</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" cols="4">
                <v-divider></v-divider>
              </v-col>
              <v-col md="4" cols="4">مستخدم جديد</v-col>
              <v-col md="4" cols="4">
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="12" cols="12">
                <v-btn
                  class="job-submit d-flex flex-column justify-center align-center"
                  @click="register_employer()"
                  color="success"
                >اشترك الان</v-btn>
              </v-col>
            </v-row>
            <!-- <div style="margin-bottom: 20px">
              <h6 class="mt-5 mb-3 text-center">
                مستخدم جديد؟
                <span class="subscribe-now-text" @click="register_employer()">اشترك الآن</span>
                ودعونا نتواصل
              </h6>
            </div>-->
          </form>
        </v-row>
        <v-snackbar v-model="message" :color="error_type">{{ error_message }}</v-snackbar>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import $ from "jquery";

export default {
  name: "LoginBanner",

  props: {
    validateForm: Boolean,
  },
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
  watch: {
    validateForm() {
      if (this.$refs.basicInfoForm.validate()) {
        this.$emit("BasicInfoValidated", true);
      } else {
        this.$emit("BasicInfoValidated", false);
      }
    },
  },
  methods: {
    async login() {
      const { username, password } = this.form;
      const type = this.worker == 1 ? "job_seeker" : "employer";
      try {
        let response;
        let vm = this;
        response = await this.$auth
          .loginWith("employer", { data: { username, password } })
          .then(() => {
            this.message = true;
            this.error_type = "success";
            this.error_message = "تم التسجيل بنجاح";
            this.$router.push("/employer/dashboard");
          })
          .catch((e) => {
            this.message = true;
            this.error_type = "error";
            this.error_message = "خطأ في البريد أو كلمة المرور";
          });
      } catch (err) {
        console.log(err);
      }
    },
    show_message(response) {
      console.log(response);
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
