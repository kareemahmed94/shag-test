<template>
  <div>
    <div class="container register-section">
      <div class="clients d-flex align-items-center justify-content-center">
        <h2 style="color: white" class="text-center">
          هنساعدك تعين الموظفين المناسبين في اسرع وقت
        </h2>
      </div>
      <v-card>
        <div class="clients ml-4 mr-4" style="background-image: none">
          <h2 class="text-center mr-4">أكبر شركات مصر تستخدم شغلني</h2>
        </div>
        <v-form ref="SPEForm" class="form-register">
          <v-row>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
            <v-col md="2" class="text-center"> معلومات عن الشركة</v-col>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
          </v-row>

          <v-row class="form-group">
            <v-col md="6" cols="12" class="d-flex">
              <v-row class="d-flex align-items-baseline">
                <v-col md="3" cols="12">
                  <label for="name_en" class="label-form">اسم الشركة</label>
                </v-col>
                <v-col md="8" cols="12">
                  <v-text-field
                    dense
                    label="اسم الشركة"
                    :rules="[(v) => !!v || 'اسم الشركة مطلوب']"
                    v-model="employer_name"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col md="6" cols="12" class="d-flex">
              <v-row class="d-flex align-items-center">
                <v-col md="3" cols="12">
                  <label for="name_en" class="label-form"
                  >البريد الإلكتروني</label
                  >
                </v-col>
                <v-col md="8" cols="12">
                  <v-text-field
                    dense
                    label="البريد الإلكتروني"
                    :rules="[(v) => !!v || 'البريد الإلكتروني مطلوب']"
                    v-model="email"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="form-group">
            <v-col md="6" cols="12" class="d-flex">
              <v-row class="d-flex align-items-baseline">
                <v-col md="3" cols="12">
                  <label for="name_en" class="label-form">رقم الموبايل</label>
                </v-col>
                <v-col md="8" cols="12">
                  <v-text-field
                    dense
                    label="رقم الموبايل"
                    :rules="[(v) => !!v || 'رقم الموبايل مطلوب']"
                    v-model="phone_number"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col md="6" cols="12" class="d-flex">
              <v-row
                class="d-flex align-items-baseline"
                style="text-align: right"
              >
                <v-col md="12" cols="12">
                  <v-switch
                    style="text-align: right"
                    color="#f3922a"
                    label="استخدام رقم الموبايل كرقم الإستعلامات"
                    v-model="same_as_phone_number"
                  ></v-switch>
                </v-col>
                <!-- <v-col md="9" cols="12">
                  <label for="name_en" class="label-form"
                    >استخدام رقم الموبايل كرقم الإستعلامات</label
                  >
                </v-col> -->
              </v-row>
            </v-col>
          </v-row>

          <v-row class="form-group">
            <v-col md="6" cols="12" class="d-flex">
              <v-row class="d-flex align-items-center">
                <v-col md="3" cols="12">
                  <label for="name_en" class="label-form"
                  >رقم الإستعلامات</label
                  >
                </v-col>
                <v-col md="8" cols="12">
                  <v-text-field
                    :disabled="same_as_phone_number"
                    persistent-hint
                    hint="هذا الرقم للرد على استفسارات راغبي العمل"
                    dense
                    label="رقم الإستعلامات"
                    :rules="[(v) => !!v || 'رقم الإستعلامات مطلوب']"
                    v-model="sms_phone_number"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
            <v-col md="2" class="text-center"> معلومات عن الوظيفة</v-col>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
          </v-row>

          <v-row class="form-group">
            <v-col md="6" cols="12" class="d-flex">
              <v-row class="d-flex align-items-baseline">
                <v-col md="3" cols="12">
                  <label for="name_en" class="label-form">مجال الوظيفة</label>
                </v-col>
                <v-col md="8" cols="12">
                  <v-select
                    small-chips
                    v-model="category_id"
                    :menu-props="{ offsetY: true }"
                    :rules="[(v) => !!v || 'مجال الوظيفة مطلوب']"
                    item-text="name_ar"
                    item-value="id"
                    outlined
                    required
                    dense
                    :items="categories"
                    label="مجال الوظيفة"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col md="6" cols="12" class="d-flex">
              <v-row class="d-flex align-items-center">
                <v-col md="3" cols="12">
                  <label for="name_en" class="label-form">المؤهل المطلوب</label>
                </v-col>
                <v-col md="8" cols="12">
                  <v-select
                    small-chips
                    v-model="education_level_id"
                    :menu-props="{ offsetY: true }"
                    :rules="[(v) => !!v || 'المؤهل مطلوب']"
                    item-text="name_ar"
                    item-value="id"
                    outlined
                    required
                    dense
                    :items="education_lvls"
                    label="المؤهل المطلوب"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="form-group">
            <v-col md="6" cols="12" class="d-flex">
              <v-row class="d-flex align-items-baseline">
                <v-col md="3" cols="12">
                  <label for="name_en" class="label-form">المنطقة</label>
                </v-col>
                <v-col md="8" cols="12">
                  <v-select
                    v-model="city_id"
                    :menu-props="{ offsetY: true }"
                    :rules="[(v) => !!v || 'المنطقة مطلوب']"
                    item-value="id"
                    item-text="name_ar"
                    outlined
                    required
                    dense
                    :items="cities"
                    label="المنطقة"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col md="6" cols="12" class="d-flex">
              <v-row class="d-flex align-items-center">
                <v-col md="3" cols="12">
                  <label for="name_en" class="label-form">السن</label>
                </v-col>
                <v-col md="8" cols="12" class="mt-6">
                  <v-range-slider
                    :thumb-size="32"
                    v-model="age"
                    color="#f3922a"
                    :min="18"
                    :max="45"
                    step="1"
                    height="10"
                    thumb-label="always"
                    persistent-hint
                  >
                  </v-range-slider>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="form-group">
            <v-col md="6" cols="12" class="d-flex">
              <v-row class="d-flex align-items-baseline">
                <v-col md="3" cols="12">
                  <label for="name_en" class="label-form">عدد الموظفين</label>
                </v-col>
                <v-col md="8" cols="12">
                  <v-row>
                    <v-col
                      md="6"
                      sm="6"
                      cols="12"
                      v-for="(pack, index) in packages"
                      :key="pack.id"
                    >
                      <label
                        :for="`option${index}-${pack.id}`"
                        :class="`${
                          package_id === pack.id ? 'active' : ''
                        } radio-label skill-radio-${pack.id}`"
                        @click="switchNumRadio(pack.id)"
                        :data-val="pack.id"
                      >{{ `${pack.name_ar}` }}
                      </label>
                      <input
                        :for="`option${index}-${pack.id}`"
                        type="radio"
                        :value="pack.id"
                        class="radio-btn"
                        v-model="package_id"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col md="6" cols="12" class="d-flex">
              <v-row class="d-flex align-items-baseline">
                <v-col md="3" cols="12">
                  <label for="name_en" class="label-form">العنوان</label>
                </v-col>
                <v-col md="8" cols="12">
                  <v-textarea
                    dense
                    label="العنوان"
                    :rules="[(v) => !!v || 'العنوان مطلوب']"
                    v-model="address"
                    outlined
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="form-group">
            <v-row class="d-flex align-items-center">
              <v-col md="3" cols="12">
                <label for="name_en" class="label-form">موعد المقابلة</label>
              </v-col>
              <v-col md="3" cols="12">
                <v-menu
                  v-model="menu"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="0"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      dense
                      :rules="[(v) => !!v || 'الميعاد مطلوب']"
                      outlined
                      required
                      hint="يمكنك اختيار اي تاريخ بعد ٤ ايام من الآن"
                      persistent-hint
                      v-model="interview_date"
                      label="اختيار ميعاد لمقابلة المتقدمين"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    :allowed-dates="allowedDates"
                    :reactive="true"
                    :flat="true"
                    :show-current="true"
                    :type="'date'"
                    locale="ar"
                    v-model="interview_date"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col md="3" cols="12">
                <v-text-field
                  type="time"
                  v-model="interview_from_time"
                  outlined
                  dense
                  label="من"
                  :rules="[(v) => !!v || 'الوقت مطلوب']"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="3" cols="12">
                <v-text-field
                  type="time"
                  v-model="interview_to_time"
                  outlined
                  dense
                  label="إلى"
                  :rules="[(v) => !!v || 'الوقت مطلوب']"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-row>
          <v-divider v-if="selected_package"></v-divider>

          <v-row class="form-group" v-if="selected_package">
            <v-row class="d-flex align-items-center">
              <v-card
                shaped
                class="mx-auto"
                max-width="400"
                style="color: #12406a"
              >
                <!-- <v-img
                  class="white--text align-end"
                  height="150px"
                  src="https://i.ibb.co/KXycqZ7/job-banner1.png"
                > -->
                <v-card-title>المبلغ الذي ستقوم بدفعه</v-card-title>
                <!-- </v-img> -->
                <v-card-text class="text--primary text-center">
                  <h2 style="color: #12406a">
                    ج.م {{ selected_package.monthly_price }}
                  </h2>
                </v-card-text>
              </v-card>
            </v-row>
          </v-row>
          <v-divider></v-divider>

          <v-row class="form-group">
            <v-col md="12" class="text-center">
              <v-btn
                class="job-submit ml-auto mr-auto col-md-2 pa-0"
                color="success"
                rounded
                light
                large
                shaped
                x-large
                style="color: white"
                :loading="btn_loader"
                @click="check_form"
              >
                ابدأ بالتعيين
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="message" :color="error_type">
      {{ error_message }}
    </v-snackbar>
    <v-row justify="center">
      <v-dialog v-model="payment_select_dialog" persistent max-width="600">
        <v-card light>
          <div class="logo-holder-modal">
            <img src="~/assets/logo-blue.png" width="200"/>
          </div>
          <div class="size-modal-content">
            <v-card light>
              <h5>إختر طريقة الدفع للإستمرار</h5>
              <v-row>
                <v-col>
                  <div class="payment-method" @click="payment_select_dialog = false;address_dialog = true;">
                    <h5>دفع كاش</h5>
                    <img src="~/assets/img/icons/cash-pay.svg" width="100%"/>
                  </div>
                </v-col>
                <v-col>
                  <div class="payment-method" @click="store_spe('card')">
                    <h5>دفع ببطاقة</h5>
                    <img src="~/assets/img/icons/credit-cards.svg" width="100%"/>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="address_dialog" persistent max-width="600">
        <v-card light>
          <div class="logo-holder-modal">
            <img src="~/assets/logo-blue.png" width="200"/>
          </div>
          <div class="size-modal-content">
            <v-card light style="padding: 10%">
              <h5>أدخل بيانات تفاصيل العنوان للإستمرار</h5>
              <v-row class="form-group">
                <v-col md="6" cols="12" class="d-flex">
                  <v-row class="d-flex align-items-baseline">
                    <v-col md="3" cols="12">
                      <label for="name_en" class="label-form">الشارع</label>
                    </v-col>
                    <v-col md="8" cols="12">
                      <v-text-field
                        dense
                        label="الشارع"
                        :rules="[(v) => !!v || 'الشارع مطلوب']"
                        v-model="address_details.street"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col md="6" cols="12" class="d-flex">
                  <v-row class="d-flex align-items-center">
                    <v-col md="3" cols="12">
                      <label class="label-form">المبنى</label>
                    </v-col>
                    <v-col md="8" cols="12">
                      <v-text-field
                        dense
                        label="المبنى"
                        :rules="[(v) => !!v || 'المبنى مطلوب']"
                        v-model="address_details.building"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="form-group">
                <v-col md="6" cols="12" class="d-flex">
                  <v-row class="d-flex align-items-baseline">
                    <v-col md="3" cols="12">
                      <label for="name_en" class="label-form">الدور</label>
                    </v-col>
                    <v-col md="8" cols="12">
                      <v-text-field
                        dense
                        label="الدور"
                        :rules="[(v) => !!v || 'الدور مطلوب']"
                        v-model="address_details.floor"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col md="6" cols="12" class="d-flex">
                  <v-row class="d-flex align-items-center">
                    <v-col md="3" cols="12">
                      <label class="label-form">الشقة</label>
                    </v-col>
                    <v-col md="8" cols="12">
                      <v-text-field
                        dense
                        label="الشقة"
                        :rules="[(v) => !!v || 'الشقة مطلوبة']"
                        v-model="address_details.apartment"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="form-group">
                <v-col md="12" class="text-center">
                  <v-btn
                    class="job-submit ml-auto mr-auto col-md-2 pa-0"
                    color="primary"
                    rounded
                    light
                    shaped
                    x-large
                    style="color: white"
                    :loading="btn_loader"
                    @click="store_spe('cash')">
                    تسجيل
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import $ from "jquery";
import {mdiArrowLeft, mdiArrowRight, mdiCash, mdiCard} from "@mdi/js";
import Mobile from "@/components/common/mobile-input";

export default {
  name: "SpeRegistration",
  components: {
    Mobile,
  },
  head() {
    return {
      titleTemplate: "%s - ابدأ تعيين",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "ابدأ التعيين الآن مع شغلني",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:site",
          name: "twitter:site",
          content: "@Shaghalni",
        },
        {
          hid: "twitter:creator",
          name: "twitter:creator",
          content: "@Shaghalni",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "شغلني - ابدأ تعيين",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "ابدأ التعيين الآن مع شغلني",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://i.ibb.co/ZfBByL2/Shaghalni-Preview-Image.png",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "شغلني - ابدأ تعيين",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: "ابدأ التعيين الآن مع شغلني",
        },
        {
          hid: "og:url",
          name: "og:url",
          content: "https://shaghalni.com/employer/spe/register",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "https://i.ibb.co/ZfBByL2/Shaghalni-Preview-Image.png",
        },
      ],
    };
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiArrowRight,
        mdiCash,
        mdiCard,
      },
      address_dialog: false,
      payment_select_dialog: false,
      menu: false,
      mockup_dialog: false,
      date: false,
      overlay: false,
      btn_loader: false,
      message: false,
      error_message: false,
      same_as_phone_number: false,
      error_type: "success",
      // Employer Data
      employer_name: "",
      address: "",
      address_details: {
        apartment : '',
        floor : '',
        street : '',
        building : '',
        city : '',
        country : '',
      },
      email: "",
      sms_employer_name: "",
      sms_job_title: "",
      sms_area: "",
      sms_phone_number: "",
      phone_number: "",
      category_id: "",
      package_id: "",
      city_id: "",
      age: [18, 45],
      education_level_id: "",
      num_of_employees: "",
      interview_date: "",
      interview_from_time: "",
      interview_to_time: "",
      // Employer Options
      min_date: "",
      categories: [],
      cities: [],
      packages: [],
      ages: [
        {
          id: 1,
          title: "من ١٨ إلى ٢٨",
        },
      ],
      education_lvls: [],
      user_id: null,
      selected_package: null,
      user: {},
      user_data: {},
      v_loading: false,
    };
  },
  watch: {
    package_id() {
      this.selected_package = this.packages.filter((pack) => {
        return pack.id == this.package_id ? pack : null;
      })[0];
    },
    same_as_phone_number(val) {
      if (val === true) {
        this.sms_phone_number = this.phone_number;
      } else {
        this.sms_phone_number = "";
      }
    },
    phone_number(val) {
      if (this.same_as_phone_number) this.sms_phone_number = val;
    },
  },
  computed: {},
  mounted() {
  },
  methods: {
    getPackages() {
      this.$axios.get("/employer/packages?is_SP=1").then((response) => {
        this.packages = response.data.data;
      });
    },
    check_form() {
      if (this.$refs.SPEForm.validate() && this.package_id) {
        this.payment_select_dialog = true
      } else {
        this.message = true;
        this.error_type = "error";
        this.error_message = "أكمل البيانات للإستمرار";
      }
    },
    store_spe(payment_type) {
      if (payment_type == 'cash') {
        if (!this.address_details.floor || !this.address_details.street || !this.address_details.building || !this.address_details.apartment) {
          this.message = true;
          this.error_type = "error";
          this.error_message = "أكمل البيانات للإستمرار";
          this.address_dialog = false
          return
        }
        this.address_details.city = this.city_id
      }
        this.btn_loader = true;
        this.overlay = true;
        let form_data = {
          payment_type: payment_type,
          address_details: this.address_details,
          employer_name: this.employer_name,
          address: this.address,
          email: this.email,
          phone_number: this.phone_number,
          city_id: this.city_id,
          category_id: this.category_id,
          education_level_id: this.education_level_id,
          min_age: this.age[0],
          max_age: this.age[1],
          package_id: this.package_id,
          interview_time: this.interview_time,
          interview_date: this.interview_date,
          interview_from_time: this.interview_from_time,
          interview_to_time: this.interview_to_time,
          sms_job_title: this.sms_job_title,
          sms_area: this.sms_area,
          sms_phone_number: this.sms_phone_number,
        };
        this.$axios.post("/employer/spes", form_data).then((response) => {
          this.btn_loader = false;
          this.overlay = false;
          if (response.data.status == 500) {
            this.message = true;
            this.error_type = "error";
            this.error_message = response.data.message;
            return;
          }
          let selected_city =
            this.cities.filter((city) => {
              return city.id == this.city_id ? city : null;
            })[0].name_ar || null;
          let selected_category =
            this.categories.filter((category) => {
              return category.id == this.category_id ? category : null;
            })[0].name_ar || null;
          if (process.browser) {
            if (response.data.url) {
              localStorage.setItem("iframe_url", response.data.url);
            } else {
              localStorage.removeItem('iframe_url')
            }
            localStorage.setItem("package_id", this.package_id);
            localStorage.setItem("employer_name", this.employer_name);
            localStorage.setItem("address", this.address);
            localStorage.setItem("job_title", selected_category);
            localStorage.setItem("area", selected_city);
            localStorage.setItem("phone_number", this.sms_phone_number);
          }
          this.$router.push("/employer/spe/payment");
        });

    },
    getCategories() {
      this.$axios.get("/resource/category").then((response) => {
        this.categories = response.data;
      });
    },
    getCities() {
      this.$axios.get("/resource/city").then((response) => {
        this.cities = response.data;
      });
    },
    getEducation_lvls(resourceName, type) {
      this.$axios
        .get("/resource/educationLevel", {params: {type: type}})
        .then((response) => {
          this.education_lvls = response.data;
        });
    },
    switchNumRadio(id) {
      this.package_id = id;
    },
    allowedDates(val) {
      let new_date = new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000);
      let current_date =
        new_date.getFullYear() +
        "-" +
        (new_date.getMonth() + 1) +
        "-" +
        new_date.getDate();
      let yyyy = parseInt(val.split("-")[0]);
      let mm = parseInt(val.split("-")[1]);
      let dd = parseInt(val.split("-")[2]);
      let min_yyyy = parseInt(current_date.split("-")[0]);
      let min_mm = parseInt(current_date.split("-")[1]);
      let min_dd = parseInt(current_date.split("-")[2]);
      if (yyyy < min_yyyy) return false;
      if (mm < min_mm && yyyy === min_yyyy) return false;
      if (dd < min_dd && mm === min_mm && yyyy === min_yyyy) return false;
      return true;
    },
    getMinDate() {
      let current_date = new Date();
      let yyyy = current_date.getFullYear();
      let mm = current_date.getMonth() + 1;
      let dd = (current_date.getDate() + 4) % 30;
      let date = `${yyyy}-${mm < 10 ? "0" + mm : mm}-${
        dd < 10 ? "0" + dd : dd
      }`;
      let new_date = new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000);
      this.interview_date =
        new_date.getFullYear() +
        "-" +
        (new_date.getMonth() + 1) +
        "-" +
        new_date.getDate();
    },
  },
  created() {
    this.getMinDate();
    this.getPackages();
    this.getCategories();
    this.getCities();
    this.getEducation_lvls();
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

.form-register {
  text-align: right;
  margin-right: 7%;
  margin-left: 7%;
  margin-bottom: 50px;
}

.clients {
  background-image: url("./../../../../assets/bg-mail-1.jpg");
  background-size: 100% 100%;
}

.label-form {
  width: auto !important;
}

input {
  font-size: 20px;
  width: auto;
  line-height: normal;
  padding: 8px;
}
</style>
