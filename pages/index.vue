<!--eslint-disable-->
<template>
  <div data-app>
    <div class="mobile" v-if="is_mobile">
      <home_banner></home_banner>
      <home_slider :home_jobs="home_jobs" :home_status="home_status"></home_slider>
    </div>
    <div class="web" v-else>
      <home_slider :home_jobs="home_jobs" :home_status="home_status"></home_slider>
      <home_banner></home_banner>
    </div>
    <div class="special-jobs">
      <div class="special-jobs-text">
        <h1>وظائف مميزة</h1>
      </div>
    </div>
    <featured_slider :special_jobs="special_jobs" :special_jobs_loaded="special_jobs_loaded"></featured_slider>

    <div class="home-register">
      <hr v-if="!loggedIn"/>
      <div class="register-holder" v-if="!loggedIn">
        <div class="row">
          <div class="col-md-6">
            <div class="home-register-content job-seeker-box">
              <div class="register-title">
                أنا راغب عمل
                <img
                  src="../assets/img/icons/worker.svg"
                  width="50"
                  style="margin-bottom: 20px;"
                />
              </div>
              <hr/>
              <div class="register-content">
                انشئ حسابك الآن ليتم ترشيحك لأكثر الوظائف المناسبة لتخصصك
                وقدم على احدث الوظائف الخالية من كبرى الشركات مجاناً
              </div>
              <div class="text-center">
                <v-btn
                  class="btn-register-job-seeker"
                  @click="$router.push('/job-seeker/register')"
                >
                  الاشتراك كراغب
                  عمل
                </v-btn>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="home-register-content">
              <div class="register-title">
                انا صاحب عمل / مسئول توظيف
                <img
                  src="../assets/img/icons/name.svg"
                  width="50"
                  style="margin-bottom: 20px;"
                />
              </div>
              <hr/>
              <div class="register-content">
                انشئ حسابك الآن لتعيين إحتياجاتك من العمالة. نشر إعلانات توظيف خاصة بشركتك والتواصل مع المرشحين
                للوظائف مباشرة. سيتاح لك مدير حساب مخصص لشركتك لمساعدتك في إدارة حسابك والإستفادة بمميزاته بالشكل
                الأمثل
              </div>
              <div class="text-center">
                <v-btn
                  class="btn-register-employer"
                  @click="$router.push('/employer/register')"
                >سجل شركتك
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr/>
    </div>
    <div class="why-us">
      <h2>لماذا شغلني؟</h2>
      <div class="why-us-content">
        <v-row>
          <v-col md="5" cols="12">
            <h3>
              نجحنا في السنوات القليلة الماضية في تشغيل الآلاف من راغبي العمل من جميع المؤهلات وفي مختلف
              التخصصات
            </h3>
            <p>
              وذلك لتقديمنا أحدث فرص العمل المتاحة في السوق المصري من كبرى الشركات في مصر. بصورة منظمة وبخيارات فرز
              متعددة.حتى أصبحت منصة شغلني الالكترونية Shaghalni.com وجهه رئيسية للباحثين عن فرص عمل، خاصةً حاملي
              المؤهلات المتوسطة والفنية وذوي الإعاقة
            </p>
          </v-col>
          <v-col md="7" cols="12" style="padding: 0 30px 20px 20px">
            <div class="home-job-holder" style="width: 100%;">
              <div class="row">
                <v-col md="3" cols="12">
                  <div class="logo-mask">
                    <img :src="thumb_logo"/>
                  </div>
                </v-col>
                <v-col md="7" cols="12">
                  <div class="job-details">
                    <v-row>
                      <v-col class="job-title" md="6" cols="12">
                        موظف إستقبال
                        <span class="job-company-title d-inline">- شغلني</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="4" cols="12" class="job-details-title">
                        الموقع
                        <span class="details-title d-inline">الجيزة, القاهرة</span>
                      </v-col>
                      <v-col md="4" cols="12" class="job-details-title">
                        الفئة
                        <span class="details-title d-inline">مجال الخدمات العامة</span>
                      </v-col>
                      <v-col md="4" cols="12" class="job-details-title">
                        راتب
                        <span class="details-title d-inline">3500 شهريا</span>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
                <v-col md="2" cols="12">
                  <v-row>
                    <v-chip class="shift-type d-block text-center" color="#f2f4f5">دوام جزئى</v-chip>
                  </v-row>
                  <v-row class="mt-4">
                    <v-btn class="job-submit">شغلني</v-btn>
                  </v-row>
                </v-col>
              </div>
              <v-divider></v-divider>
              <v-row>
                <v-col class="job-details-title" md="7" cols="12">
                  الكلمات الرئيسية:
                  <span
                    class="details-title d-inline"
                  >الإستقبال, وظيفة ثانوية,الحاسوب, الرد على الهاتف</span>
                </v-col>
                <v-col class="job-details-title" md="3" cols="8">
                  خبرة:
                  <span class="details-title d-inline">1-4 سنوات</span>
                </v-col>
                <v-col md="1" cols="2" class="icon-holder">
                  <img src="~assets/img/icons/male.svg" width="10"/>
                </v-col>
                <v-col md="1" cols="2" class="icon-holder">
                  <img src="~assets/img/icons/fmm.svg" width="10"/>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <testimonials></testimonials>

    <div class="about-website">
      <h1>أكبر موقع توظيف</h1>
      <v-row class="about-website-content ma-0 pa-6 justify-center align-center">
        <v-col
          md="4"
          cols="12"
          :style="`border-${$device.isMobileOrTablet ? 'bottom' : 'left'}: 2px solid #0e4168`"
        >
          <h2 class="ml-auto mr-auto" style="width: auto">٥٠،١٤٨</h2>
          <h2 class="ml-auto mr-auto" style="width: auto">فرصة عمل</h2>
        </v-col>
        <v-col
          md="4"
          cols="12"
          :style="`border-${$device.isMobileOrTablet ? 'bottom' : 'left'}: 2px solid #0e4168`"
        >
          <h2 class="ml-auto mr-auto" style="width: auto">١،٥٤٨،٣٠٠</h2>
          <h2 class="ml-auto mr-auto" style="width: auto">راغب عمل</h2>
        </v-col>
        <v-col md="4" cols="12">
          <h2 class="ml-auto mr-auto" style="width: auto">١٠،٧٨٣</h2>
          <h2 class="ml-auto mr-auto" style="width: auto">شركة</h2>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
    <clients_slider></clients_slider>
  </div>
</template>
<script>
  import home_banner from "~/components/home/home_banner.vue";
  import home_slider from "~/components/home/home_slider.vue";
  import featured_slider from "~/components/home/featured_slider.vue";
  import clients_slider from "~/components/common/clients_slider.vue";
  import testimonials from "~/components/home/testimonials.vue";

  export default {
    name: "Home",
    layout: "default",
    middleware: "not-employer",
    components: {
      home_banner,
      home_slider,
      featured_slider,
      clients_slider,
      testimonials,
    },
    head() {
      return {
        titleTemplate: "%s - الرئيسية",
      };
    },
    data() {
      return {
        is_mobile: this.$device ? this.$device.isMobile : false,
        loggedIn: this.$auth.loggedIn,
        job_types: [],
        home_jobs: {},
        special_jobs: {},
        reviews: {},
        citiesData: [],
        city: "",
        searchCityName: "",
        addressSearch: "",
        selectedAddress: null,
        is_loaded: 0,
        validation_message: "",
        home_status: 1,
        slider: {},
        sample_slider: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        rates: [1, 2, 3, 4, 5],
        thumb_logo: "https://s3-cdn.shaghalni.com/shaghalni_icon.png",
        storage_url: process.env.StorageUrl,
        message: "Message ",
        searchJobType: "",
        entries: [],
        searchTitle: "",
        special_jobs_loaded: false,
        isCitiesLoading: false,
        descriptionLimit: 60,
        filterShiftType: [],
      };
    },
    async mounted() {
      this.$axios.setHeader(
        "Access-Control-Allow-Origin",
        "http://127.0.0.1:8000"
      );
      this.is_loaded = 1;
      await this.getHomeJobs();
      await this.getSpecialJobs();
      await this.getReviews();
      await this.getJobType();
      await this.$forceUpdate();
    },
    watch: {},

    methods: {
      getJobType() {
        this.$axios.get("/resource/jobType").then((response) => {
          this.job_types = response.data;
        });
      },
      searchCity() {
        this.isCitiesLoading = true;
        this.$axios.get("/resource/city", {params: {q: val}}).then((res) => {
          let data = res.data;
          if (data.length > 0) {
            for (let x = 0; x < data.length; x++) {
              this.citiesData.push({
                text: data[x].name_ar,
                value: data[x].id,
              });
            }
          }
        });
      },

      getHomeJobs() {
        this.$axios.get("/job/jobs/home").then((response) => {
          this.home_jobs = response.data.data;
          this.home_status = 2;
        });
      },
      getSpecialJobs() {
        this.$axios
          .get("/job/jobs/special", {crossdomain: true})
          .then((response) => {
            this.special_jobs = response.data.data;
            this.special_jobs_loaded = true;
          });
      },
      apply(id, event) {
        this.$axios
          .post("/job_seeker/jobs/apply", {job_id: id})
          .then((response) => {
            if (response.data.error_code == 200) {
              this.$modal.show("apply-modal");
              event.target.setAttribute("disabled", true);
              event.target.innerHTML = "تم التقديم";
            }
          });
      },
      login_to_continue() {
        this.$modal.show("login-apply-modal");
      },
      getReviews() {
        this.$axios
          .get("/job/reviews", {crossdomain: true})
          .then((response) => {
            this.reviews = response.data.data;
          });
      },
    },
  };
</script>

<style>
  @media only screen and (min-width: 1050px) {
    .home-slider .slick-slider .slick-slide {
      opacity: 0.5;
      margin-top: 20px;
    }

    .home-slider .slick-slider .slick-center {
      opacity: 1 !important;
      margin-top: 0 !important;
      /*margin-left: 4% !important;*/
    }

    .slick-slide * {
      outline: none !important;
    }
  }
</style>
