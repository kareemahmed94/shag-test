<template>
  <div>
    <div class="container register-section">

      <div
        class="d-flex align-items-center justify-content-center"
        style="
          background-color: #c2ced8;
          padding-top: 2.5%;
          padding-bottom: 2.5%;
        "
      >
        <img src="~/assets/logo-blue.png" width="200" />
      </div>
      <v-row>
        <v-col md="12" v-if="iframe_url">
          <iframe
            id="frame"
            :src="iframe_url"
            style="width: 100%; height: 700px"
          ></iframe>
        </v-col>
        <v-col md="12" v-else>
          <div style="text-align: center;color: #1c3e6a;">
            <h1>سنقوم بتحصيل المبلغ قريبا</h1>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="job-details-title" style="font-size: 20px" md="12"
          >استمتع بخطة التوظيف الشهرية</v-col
        >
      </v-row>
      <v-divider></v-divider>

      <div v-if="package">
        <v-row>
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
          <v-col md="6" sm="6" cols="12">
            <mobile
              :employer_ar="employer_name"
              :category="job_title"
              :city="area"
              :phone_number="phone_number"
            />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";
import Mobile from "@/components/common/mobile";

export default {
  name: "SpeRegistration",
  components: {},
  head() {
    return {
      titleTemplate: "%s - الدفع",
    };
  },
  components: {
    Mobile,
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiArrowRight,
      },
      iframe_status: false,
      iframe_url: "",
      query: "",
      package_id: process.browser ? localStorage.getItem("package_id") : null,
      package: {},
      employer_name: process.browser
        ? localStorage.getItem("employer_name")
        : null,
      job_title: process.browser ? localStorage.getItem("job_title") : null,
      area: process.browser ? localStorage.getItem("area") : null,
      phone_number: process.browser
        ? localStorage.getItem("phone_number")
        : null,
    };
  },

  watch: {
    query() {
      this.$axios
        .post("/front/payment/callback", {
          success: this.query.success,
          order_id: this.query.order,
          response_code: this.query.acq_response_code,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.package = response.data.data;
            this.paid = response.data.data.monthly_price;
            this.overlay = false;
          } else {
            this.failTitle = response.data.message;
            this.failMsg = response.data.body;
            this.overlay = false;
          }
        });
    },
    package_id() {
      this.get_package();
    },
  },
  computed: {},

  mounted() {
    this.query = this.$route.query;

    if (process.browser) {
      this.iframe_url = localStorage.getItem("iframe_url");
      this.iframe_status = true;
    }
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
  created() {
    this.get_package();
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
