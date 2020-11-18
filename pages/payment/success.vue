<!--eslint-disable-->
<template>
  <div>
    <v-col md="10" cols="10" class="container">
      <v-row class="mb-10" style="background-color: rgba(14, 65, 104, 0.25)">
        <v-col md="10" cols="12" class="ml-auto mr-auto text-center pt-8 pb-8">
          <img alt="Shaghalni Logo" class="logo-nav" width="100" src="~/assets/logo-blue.png"/>
        </v-col>
      </v-row>

      <v-row class="mb-10">
        <v-col md="12" cols="12" class="ml-auto mr-auto text-center pt-8 pb-8">
          <!-- Case payment success -->
          <div v-if="paid">
            <v-row>
              <v-col md="12">
                <img
                  alt="Shaghalni Logo"
                  class="logo-nav"
                  width="100"
                  src="~/assets/img/icons/payment-done.svg"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="job-details-title text-center" md="12">
                <span class="details-title d-inline" style="font-size: 40px"
                >شكراً لإستخدامك شغلني</span
                >
              </v-col>
            </v-row>

            <v-row>
              <v-col
                class="job-details-title text-center"
                style="font-size: 28px"
                md="12"
              >
                <span class="job-title" style="font-size: 30px"
                >شكراً لتسديدك</span
                >
                <span
                  class="job-details-title d-inline"
                  style="font-size: 30px; font-weight: 400"
                >{{ paid }} ج.م</span
                >
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <div v-if="package">
              <div v-if="package.is_SP == 1">
                <v-col md="6" sm="6" cols="12">
                  <v-row>
                    <v-col class="job-details-title" md="6">
                      <div
                        class="job-requirements d-flex align-items-center justify-content-center primary"
                      >
                        <div style="color: white" class="job-title-desc">
                          {{ package.name_ar }}
                        </div>
                      </div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="job-details-title" md="6" cols="12">
                      <div
                        class="job-requirements pl-4 pr-4"
                        style="
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                  "
                      >
                        <div class="details-title">تعيين عدد من الموظفين</div>
                        <div class="job-title pr-8">
                          {{ package.name_ar }}
                        </div>
                      </div>
                    </v-col>

                    <v-col class="job-details-title" md="6" cols="12">
                      <div
                        class="job-requirements pl-4 pr-4"
                        style="
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                  "
                      >
                        <div class="details-title">
                          عدد إعلانات الوظائف على الموقع
                        </div>
                        <div class="job-title pr-8">إعلان</div>
                        <div class="job-title-desc text-center">
                          <img
                            class="mt-4"
                            src="~/assets/img/icons/tick.svg"
                            width="30"
                          />
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>

              </div>
              <div v-else>
                <v-row>
                  <v-col class="job-details-title" style="font-size: 20px" md="12">استمتع بخطة التوظيف الشهرية</v-col>
                </v-row>
                <v-row>
                  <v-col class="job-details-title" md="3">
                    <div
                      class="job-requirements pl-4 pr-4d-flex align-items-center justify-content-center"
                      style="background-color: #ed5757">
                      <div style="color: white" class="job-title-desc">
                        {{ package.name_ar }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="job-details-title" md="3" cols="12">
                    <div class="job-requirements pl-4 pr-4" style="
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      justify-content: space-evenly;
                    ">
                      <div class="details-title">
                        تجربة توظيف متميزة كاملة مع فريق متخصص للدعم
                      </div>
                    </div>
                  </v-col>

                  <v-col class="job-details-title" md="3" cols="12">
                    <div
                      class="job-requirements pl-4 pr-4"
                      style="
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      justify-content: space-evenly;
                    "
                    >
                      <div class="details-title">
                        عدد إعلانات الوظائف على الموقع
                      </div>
                      <div
                        class="job-title pr-8"
                        v-if="package.job_posts_num > 0"
                      >
                        {{ package.job_posts_num }} إعلان
                      </div>
                      <div class="job-title-desc text-center" v-else>
                        <img class="mt-4" src="~/assets/false.png" width="30" />
                      </div>
                    </div>
                  </v-col>

                  <v-col class="job-details-title" md="3" cols="12">
                    <div
                      class="job-requirements pl-4 pr-4"
                      style="
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      justify-content: space-evenly;
                    "
                    >
                      <div class="details-title">رسائل نصية</div>
                      <div class="job-title-desc pr-8" v-if="package.sms">
                        {{ package.sms_num }} رسالة
                      </div>
                      <div class="job-title-desc text-center" v-else>
                        <img class="mt-4" src="~/assets/false.png" width="30" />
                      </div>
                    </div>
                  </v-col>

                  <v-col class="job-details-title" md="3" cols="12">
                    <div
                      class="job-requirements pl-4 pr-4"
                      style="
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      justify-content: space-evenly;
                    "
                    >
                      <div class="details-title">
                        نشر إعلانات وظائف على وسائل التواصل الإجتماعي
                      </div>
                      <div
                        class="job-title-desc pr-8"
                        v-if="package.social_media_posts"
                      >
                        {{ package.social_media_num }}
                        منشور
                        {{
                        package.social_media_period == "monthly" ? "كل شهر" : ""
                        }}
                        {{
                        package.social_media_period == "weekly"
                        ? "كل إسبوع"
                        : ""
                        }}
                        {{
                        package.social_media_period == "daily" ? "كل يوم" : ""
                        }}
                      </div>
                      <div class="job-title-desc text-center" v-else>
                        <img class="mt-4" src="~/assets/false.png" width="30" />
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="job-details-title" md="3" cols="12">
                    <div
                      class="job-requirements pl-4 pr-4"
                      style="
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      justify-content: space-evenly;
                    "
                    >
                      <div class="details-title">
                        الحصول على خدمات مسئول توظيف
                      </div>
                      <div
                        class="job-title pr-8 text-center"
                        v-if="package.dedicate_recruiter"
                      >
                        <img class="mt-4" src="~/assets/true.png" width="30" />
                      </div>
                      <div class="job-title-desc text-center" v-else>
                        <img class="mt-4" src="~/assets/false.png" width="30" />
                      </div>
                    </div>
                  </v-col>

                  <v-col class="job-details-title" md="3" cols="12">
                    <div
                      class="job-requirements pl-4 pr-4"
                      style="
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      justify-content: space-evenly;
                    "
                    >
                      <div class="details-title">تنظيم يوم مفتوح للتوظيف</div>
                      <div class="job-title pr-8" v-if="package.open_day_number">
                        {{ package.open_day_number }} يوم مفتوح
                      </div>
                      <div class="job-title-desc text-center mt-4" v-else>
                        <img src="~/assets/false.png" width="30" />
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>

            </div>
          </div>

          <v-row>
            <v-col class="job-details-title text-right" md="12" cols="12">
              <span class="job-title"
              >إذا كانت لديك أية استفسارات، يرجى التواصل معنا عبر بريدنا
                الإلكتروني</span
              >
              <span class="details-title d-inline">
                info@shaghalni.com
                <!-- <v-icon color="#16476d">{{ icons.mdiAt }}</v-icon> -->
              </span>
            </v-col>
            <!-- <v-col class="job-details-title text-right" md="4" cols="12">
              <v-icon color="#16476d">{{ icons.mdiAt }}</v-icon>
              <span class="job-title"></span>
            </v-col>-->
          </v-row>
          <v-divider></v-divider>
          <v-row v-if="paid">
            <v-col class="text-center ml-auto mr-auto" md="4">
              <v-btn
                class="ml-auto mr-auto job-submit"
                @click="$router.push('/employer/dashboard')"
              >ابدأ بالتعيين</v-btn
              >
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col class="text-center ml-auto mr-auto" md="4">
              <v-btn
                class="ml-auto mr-auto job-submit"
                @click="$router.push('/payment')"
              >العودة للدفع</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>
<script>
  import { mdiPhone, mdiAt } from "@mdi/js";

  export default {
    name: "PaymentStatus",
    layout: "default",
    components: {},
    head() {
      return {};
    },
    data() {
      return {
        icons: { mdiPhone, mdiAt },
        query: {},
        package: {},
        package_id: process.browser ? localStorage.getItem("package_id") : null,
        paid: process.browser ? localStorage.getItem("paid") : null,
      };
    },
    mounted() {
      this.get_package()
    },
    watch: {
    },
    methods: {
      get_package() {
        this.$axios
          .get("/employer/packages/" + this.package_id)
          .then((response) => {
            console.log("pack", response);
            this.package = response.data.data;
          });
      },
    },
  };
</script>

<style>
</style>
