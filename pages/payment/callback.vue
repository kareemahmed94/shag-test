<!--eslint-disable-->
<template>
  <div>
    <v-row justify="center">
      <v-overlay :opacity="1" :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-row>
  </div>
</template>
<script>
import { mdiPhone, mdiAt } from "@mdi/js";

export default {
  name: "PaymentStatus",
  layout: "default",
  components: {},
  props: {
    status: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Number | String,
      default: "",
      required: false,
    },
    failTitle: {
      type: String,
      required: false,
      default: "لا يوجد رصيد كافي في حسابك المصرفي",
    },
    failMsg: {
      type: String,
      required: false,
      default: "يرجى الاتصال بالبنك الذي تتعامل معه",
    },
  },
  head() {
    return {};
  },
  data() {
    return {
      icons: { mdiPhone, mdiAt },
      query: {},
      package: {},
      overlay: true,
    };
  },
  mounted() {
    this.query = this.$route.query;
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
            if (process.client) {
              localStorage.setItem('package_id' , response.data.data.id)
              localStorage.setItem('paid' , response.data.data.monthly_price)
            }
            this.$router.push('/payment/success')
          } else {
            if (process.client) {
              localStorage.setItem('fail_title' , response.data.message)
              localStorage.setItem('fail_message' , response.data.body)
            }
            this.$router.push('/payment/fail')
          }
        });
    },
  },
  methods: {},
};
</script>

<style>
</style>
