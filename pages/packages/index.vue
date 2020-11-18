<!-- eslint-disable -->
<template>
  <div>
    <div class="container register-section packages">
      <div class="clients">
        <h2 class="text-center">اختر خطة التوظيف التي تناسب احتياجات شركتك</h2>
      </div>
      <div class="clients">
        <h2>أكبر شركات مصر تستخدم شغلني</h2>
        <VueSlickCarousel
          v-bind="clientsOptions"
          ref="slick"
          v-if="clients_status == 0"
        >
          <div v-for="x in sample_slider" :key="'s' + x">
            <img src="~/assets/img/slider-loader.png" width="200" />
          </div>
        </VueSlickCarousel>
        <VueSlickCarousel v-bind="clientsOptions" ref="slick" v-else>
          <div v-for="our_client in our_clients" :key="'c' + our_client.id">
            <div>
              <div class="clients-slider-content ml-auto mr-auto">
                <img
                  class="ml-auto mr-auto"
                  :src="storage_url + our_client.logo"
                  width="200"
                />
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
      <div class="packages-slider">
        <VueSlickCarousel
          v-bind="packagesOptions"
          ref="slick"
          v-if="!packages_loaded"
        >
          <div v-for="x in sample_slider" :key="'s' + x">
            <img src="~/assets/img/slider-loader.png" width="200" />
          </div>
        </VueSlickCarousel>
        <VueSlickCarousel v-bind="packagesOptions" ref="slick" v-else>
          <div
            v-for="(employer_package, index) in packages"
            :key="'p' + index + '-' + employer_package.id"
          >
            <div class="package-holder">
              <v-row>
                <v-col
                  md="11"
                  cols="11"
                  class="ml-auto mr-auto package-title text-center d-flex flex-column align-items-center justify-content-around"
                  :style="{ 'background-color': colors[index] }"
                >
                  <span>{{ employer_package.name_ar }}</span>
                  <span style="font-size: 12px">{{ subtitle[index] }}</span>
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  class="package-item desc ml-auto mr-auto d-flex align-items-center justify-content-center"
                  md="11"
                  cols="11"
                >
                  <div class="package-item-title text-center">
                    {{ employer_package.description_ar }}
                  </div>
                </v-col>
              </v-row>
              <div
                class="mb-8"
                v-if="
                  !employer_package.is_enterprise && employer_package.id !== 21
                "
              >
                <v-row>
                  <v-col
                    class="package-item ml-auto mr-auto d-flex flex-column justify-content-around align-items-center"
                    md="11"
                    cols="11"
                  >
                    <span class="package-item-content d-block"
                      >عدد إعلانات الوظائف على الموقع</span
                    >
                    <span
                      class="package-item-title d-block"
                      v-if="employer_package.job_posts_num > 0"
                      >{{ employer_package.job_posts_num }} إعلان</span
                    >
                    <span class="package-item-content d-block" v-else>
                      <img
                        src="~/assets/img/icons/lo-dash.png"
                        width="30"
                        class="ml-auto mr-auto"
                      />
                    </span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    md="11"
                    cols="11"
                    class="package-item ml-auto mr-auto d-flex flex-column justify-content-around align-items-center"
                  >
                    <span class="package-item-content d-block">رسائل نصية</span>
                    <span
                      class="package-item-title d-block"
                      v-if="employer_package.sms"
                      >{{ employer_package.sms_num }} رسالة</span
                    >
                    <span class="package-item-content d-block" v-else>
                      <img
                        src="~/assets/img/icons/lo-dash.png"
                        width="30"
                        class="ml-auto mr-auto"
                      />
                    </span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    md="11"
                    cols="11"
                    class="package-item ml-auto mr-auto d-flex flex-column justify-content-around align-items-center"
                  >
                    <span class="d-block package-item-content text-center"
                      >نشر إعلانات وظائف على وسائل التواصل الإجتماعي</span
                    >
                    <span
                      class="d-block package-item-title"
                      v-if="employer_package.social_media_posts"
                    >
                      {{ employer_package.social_media_num }}
                      منشور
                      {{
                        employer_package.social_media_period == "monthly"
                          ? "كل شهر"
                          : ""
                      }}
                      {{
                        employer_package.social_media_period == "weekly"
                          ? "كل إسبوع"
                          : ""
                      }}
                      {{
                        employer_package.social_media_period == "daily"
                          ? "كل يوم"
                          : ""
                      }}
                    </span>
                    <span class="d-block package-item-title" v-else>
                      <img
                        src="~/assets/img/icons/lo-dash.png"
                        width="30"
                        class="ml-auto mr-auto"
                      />
                    </span>
                  </v-col>
                </v-row>
                <!--                <div class="package-item">-->
                <!--                  <div class="package-item-title">-->
                <!--                    فتح بيانات المتقدمين-->
                <!--                  </div>-->
                <!--                  <div class="package-item-content" v-if="employer_package.unlock_profiles">-->
                <!--                    {{ employer_package.unlock_profiles_num }} ملف-->
                <!--                  </div>-->
                <!--                  <div class="package-item-content" v-else>-->
                <!--                    <img src="~/assets/false.png" width="30" style="margin-top: 10px;margin-right: 20px">-->

                <!--                  </div>-->
                <!--                </div>-->
                <v-row>
                  <v-col
                    md="11"
                    cols="11"
                    class="package-item ml-auto mr-auto d-flex flex-column justify-content-around align-items-center"
                  >
                    <span class="d-block package-item-content text-center"
                      >الحصول على خدمات مسئول توظيف</span
                    >
                    <span
                      class="d-block package-item-title"
                      v-if="employer_package.dedicate_recruiter"
                    >
                      <img
                        src="~/assets/true.png"
                        width="30"
                        class="ml-auto mr-auto"
                      />
                    </span>
                    <span class="d-block package-item-content" v-else>
                      <img
                        src="~/assets/img/icons/lo-dash.png"
                        width="30"
                        class="ml-auto mr-auto"
                      />
                    </span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    md="11"
                    cols="11"
                    class="package-item ml-auto mr-auto d-flex flex-column justify-content-around align-items-center"
                  >
                    <span class="d-block package-item-content text-center"
                      >تنظيم يوم مفتوح للتوظيف</span
                    >
                    <span
                      class="d-block package-item-title text-center"
                      v-if="employer_package.open_day_number"
                      >{{ employer_package.open_day_number }} يوم مفتوح</span
                    >
                    <span class="d-block package-item-content" v-else>
                      <img
                        src="~/assets/img/icons/lo-dash.png"
                        width="30"
                        class="ml-auto mr-auto"
                      />
                    </span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    md="11"
                    cols="11"
                    class="package-item ml-auto mr-auto d-flex flex-column justify-content-around align-items-center"
                  >
                    <span class="d-block package-item-content text-center"
                      >السعر</span
                    >
                    <span
                      style="font-size: 20px"
                      class="d-block package-item-price text-center"
                      v-if="employer_package.show_cost"
                    >
                      <span>ج.م</span>
                      {{ employer_package.monthly_price }}
                    </span>
                    <span class="d-block package-item-price" v-else>
                      <img
                        src="~/assets/img/icons/lo-dash.png"
                        width="30"
                        class="ml-auto mr-auto"
                      />
                    </span>
                  </v-col>
                </v-row>

                <div class="text-center">
                  <v-btn
                    color="orange"
                    dark
                    rounded
                    block
                    @click="open_payment_window(employer_package.id)"
                    >إبدأ الآن</v-btn
                  >
                </div>
              </div>
              <div v-else>
                <div class="text-center">
                  <v-btn
                    color="orange"
                    dark
                    rounded
                    block
                    @click="
                      employer_package.id === 21
                        ? goToSpe()
                        : (enterprise_form_dialog = true)
                    "
                  >
                    {{
                      employer_package.id === 21 ? "ابدأ الآن" : "إعرف المزيد"
                    }}
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
      <div class="package-bottom">
        <div class="site-info">
          <hr />
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
        </div>
        <div class="reviews">
          <hr />
          <h1>آراء عملائنا</h1>
          <VueSlickCarousel v-bind="reviewsOptions" ref="slick">
            <div>
              <div class="reviews-slider" style="width: 100% !important">
                <div class="slider-content-reviews">
                  <div class="row">
                    <div class="col-lg-3" style="text-align: center">
                      <img
                        class="img-border company-logo"
                        src="https://s3-cdn.shaghalni.com/2018/04/Aman-2-120x120.png"
                      />
                      <div class="reviews-rate">
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <!--                        <img class="rate-star" src="~/assets/img/icons/star-em.svg" v-else>-->
                      </div>
                    </div>

                    <div class="col-lg-9">
                      <div class="reviews-body">
                        <h4>مريم نزيه سرور, أخصائي موارد بشرية - شركة أمان</h4>
                        <div class="reviews-desc">
                          <div class="right-quotes">“</div>
                          <p>
                            موقع شغلني واحد من أفضل المواقع التي تستطيع أن تبحث
                            بقاعدة بياناتها عن راغبي العمل من العمالة اليدوية
                            وغير اليدوية ، كنا نواجه مشكلة في تعيين موظفي مبيعات
                            خارجية ووجدنا العديد من السير الذاتية التي تتوافق مع
                            متطلباتنا في قاعدة بيانات موقع شغلني. البحث سهل جدا
                            ومفيد لأنه يوفر الوقت من خلال فلتر البحث. راغبي
                            العمل المسجلين بالموقع جيدين جداً وما يكتب في
                            ملفاتهم الشخصية دقيق للغاية. زادت نسبة التوظيف بعد
                            استخدامنا لموقع شغلني. نحن نستخدمه الآن بشكل أساسي
                            للعثور على إحتياجاتنا من الموظفين، ليس فقط ممثلي
                            المبيعات الخارجية ولكن أيضًا مع الوظائف الأخرى مثل
                            أمناء المخازن، ومحاسبي الفواتير، والسعاة
                          </p>
                          <div class="left-quotes">“</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="reviews-slider" style="width: 100% !important">
                <div class="slider-content-reviews">
                  <div class="row">
                    <div class="col-lg-3" style="text-align: center">
                      <img
                        class="img-border company-logo"
                        src="https://s3-cdn.shaghalni.com/2018/05/Spinneys-120x120.png"
                      />
                      <div class="reviews-rate">
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <!--                        <img class="rate-star" src="~/assets/img/icons/star-em.svg" v-else>-->
                      </div>
                    </div>
                    <div class="col-lg-9">
                      <div class="reviews-body">
                        <h4>رباب حسين, كبير أخصائيي التوظيف - سبينيس مصر</h4>

                        <div class="reviews-desc">
                          <div class="right-quotes">“</div>
                          <p>
                            موقع شغلني هو مصدر موثوق للحصول على راغبي العمل خاصة
                            من العمالة اليدوية، مع تأثير واسع وقوي عند نشر إعلان
                            التوظيف، ولديه محرك بحث بسيط وسهل الاستخدام. شكر خاص
                            لفريق موقع شغلني لدعمهم المستمر.
                          </p>
                          <div class="left-quotes">“</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="reviews-slider" style="width: 100% !important">
                <div class="slider-content-reviews">
                  <div class="row">
                    <div class="col-lg-3" style="text-align: center">
                      <img
                        class="img-border company-logo"
                        src="https://s3-cdn.shaghalni.com/2018/09/saal-120x120.png"
                      />
                      <div class="reviews-rate">
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <img
                          class="rate-star"
                          src="~/assets/img/icons/star-ful.svg"
                        />
                        <!--                        <img class="rate-star" src="~/assets/img/icons/star-em.svg" v-else>-->
                      </div>
                    </div>
                    <div class="col-lg-9">
                      <div class="reviews-body">
                        <h4>
                          هبة طلعت, نائب الرئيس التنفيذي - SAAL Invest Co.
                        </h4>
                        <div class="reviews-desc">
                          <div class="right-quotes">“</div>
                          <p>
                            نحن نعلم جميعا مدى صعوبة العثور على المرشحين لوظائفك
                            الشاغرة. لقد تأثرت عند استخدام خدمات موقع شغلني.
                            موقع شغلني كان مفيدا جدا وفعالا في العثور على
                            المرشحين الذين نبحث عنهم. لقد قدموا المساعدة والدعم
                            من البداية إلى النهاية. أوصي بشدة للشركات الأخرى
                            باستخدام خدمات موقع شغلني. هم على مستوى التحدي.
                          </p>
                          <div class="left-quotes">“</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </VueSlickCarousel>
          <hr />
        </div>
        <div class="payment_url" data-url></div>
      </div>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <v-dialog v-model="login_package_modal" max-width="600">
      <v-card light>
        <div class="logo-holder-modal">
          <img src="~/assets/logo-blue.png" width="200" />
        </div>
        <div class="size-modal-content">
          <h5>سجل دخول كصاحب عمل حتى يمكنك الإشتراك في الباقة</h5>
          <div class="row">
            <div class="col-md-6">
              <button
                class="btn btn-main"
                style="width: 100%"
                @click="$router.push('/employer/login')"
              >
                تسجيل دخول
              </button>
            </div>
            <div class="col-md-6">
              <button
                class="btn btn-main"
                style="width: 100%"
                @click="$router.push('/employer/register')"
                v-if="!loggedIn"
              >
                أشترك كصاحب عمل
              </button>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="JS_package_modal" max-width="600">
      <v-card light>
        <div class="logo-holder-modal">
          <img src="~/assets/logo-blue.png" width="200" />
        </div>
        <div class="size-modal-content">
          <h5>سجل دخول كصاحب عمل حتى يمكنك الإشتراك في الباقة</h5>
        </div>
      </v-card>
    </v-dialog>
    <enterprise_form
      :dialog="enterprise_form_dialog"
      @closeForm="enterprise_form_dialog = false"
    ></enterprise_form>
  </div>
</template>
<script>
import enterprise_form from "~/components/package/enterprise-form.vue";

export default {
  name: "Packages",
  head() {
    return {
      titleTemplate: "%s - خطط الأسعار",
    };
  },
  components: {
    enterprise_form,
  },
  data() {
    return {
      packages: {},
      colors: [
        "rgb(7 54 90)",
        "rgb(132 127 127)",
        "rgb(228 169 60)",
        "rgb(0 0 0)",
        "#00796b",
        "#ed5757",
        "#09b277",
        "#f3922a",
      ],
      subtitle: [
        "الأمثل لتعيين من 1 - 3 موظفين شهرياً",
        "الأمثل لتعيين من 4 إلى 7 موظفين شهرياً",
        "الأمثل لتعيين من 8 - 15 موظفاً شهرياً",
        "الأمثل لتعيين من أكثر من  15 موظفاً شهرياً",
      ],
      overlay: false,
      enterprise_form_dialog: false,
      login_package_modal: false,
      JS_package_modal: false,
      loggedIn: this.$auth.loggedIn,
      reviews: {},
      reviewsOptions: {
        rtl: true,
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      clientsOptions: {
        rtl: true,
        arrows: false,
        centerPadding: "200px",
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 6,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        slidesToScroll: 1,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 3,
              infinite: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              rtl: false,
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              rtl: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      sample_slider: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      packagesOptions: {
        rtl: true,
        dots: false,
        arrows: false,
        centerMode: true,
        centerPadding: "20px",
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 5,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 2000,
        slidesToScroll: 1,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 1050,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 850,
            settings: {
              rtl: false,
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              rtl: false,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              rtl: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            },
          },
        ],
      },

      user_type: this.$auth
        ? this.$auth.loggedIn && this.$auth.user
          ? this.$auth.user.account_type_id
          : null
        : null,
      our_clients: [],
      selected_package: 0,
      clients_status: 0,
      verify_dialog: false,
      packages_loaded: false,
      is_employer: false,
      iframe_status: false,
      is_verified: false,
      confirm_payment_dialog: false,
      rates: [1, 2, 3, 4, 5],
      thumb_logo: "https://s3-cdn.shaghalni.com/shaghalni_icon.png",
      storage_url: process.env.StorageUrl,
      message: "Message ",
      iframe_url: "",
      loading: false,
      continue_loader: false,
      color: "#0d4168",
      size: "20px",
    };
  },
  mounted() {
    this.check_if_employer();
    this.getPackages();
    this.getOurClients();
  },
  methods: {
    goToSpe() {
      this.$router.push("/employer/spe/register");
    },
    check_if_employer() {
      if (this.$auth) {
        if (this.$auth.loggedIn && this.user_type == 3) {
          this.is_employer = true;
        }
      }
    },
    open_verify_dialog(package_id) {
      this.selected_package = package_id;
      this.verify_dialog = true;
    },
    open_payment_window(package_id) {
      if (!this.is_employer && this.$auth.loggedIn) {
        this.JS_package_modal = true;
        return;
      } else if (!this.is_employer && !this.$auth.loggedIn) {
        this.login_package_modal = true;
        return;
      }
      this.overlay = true;
      this.$forceUpdate();
      this.$axios
        .post("/employer/packages/subscribe", { package_id: package_id })
        .then((response) => {
          this.overlay = false;
          if (process.browser) {
            localStorage.setItem("iframe_url", response.data.url);
          }
          this.iframe_url = response.data.url;
          this.confirm_payment_dialog = true;
          this.verify_dialog = false;
          this.continue_loader = false;
          this.$router.push("/payment");
        });
    },
    getOurClients() {
      this.$axios.get("/employer/our_clients").then((response) => {
        this.our_clients = response.data.data;
        this.clients_status = 1;
      });
    },
    getPackages() {
      this.$axios.get("/employer/packages").then((response) => {
        this.packages = response.data.data;
        this.packages_loaded = true;
      });
    },
  },
};
</script>

<style scoped>
</style>
