<template>
  <div>
    <v-dialog v-model="verify_modal" persistent width="600">
      <v-card>
        <v-row class="mb-4">
          <v-col md="12" class="logo-holder-modal text-center">
            <img class="mt-6 mb-6" src="~/assets/logo-blue.png" width="200" />
          </v-col>
        </v-row>

        <v-row style="width: 100%">
          <v-col md="12" cols="12">
            <div class="verify-wrapper">
              <h3 class="message-body">
                تم إرسال رسالة إلى رقم الهاتف برجاء التأكيد
              </h3>
              <v-row>
                <v-col md="12" cols="11">
                  <div class="verify-dialog" style="width: 100%">
                    <v-row class="verify-form">
                      <v-col md="12" cols="12">
                        <input
                          class="ma-0"
                          :style="`${
                            $device.isMobile
                              ? 'padding: 0; font-size: 14px'
                              : ''
                          }`"
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
                          class="ma-0"
                          :style="`${
                            $device.isMobile
                              ? 'padding: 0; font-size: 14px'
                              : ''
                          }`"
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
                          class="ma-0"
                          :style="`${
                            $device.isMobile
                              ? 'padding: 0; font-size: 14px'
                              : ''
                          }`"
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
                          class="ma-0"
                          :style="`${
                            $device.isMobile
                              ? 'padding: 0; font-size: 14px'
                              : ''
                          }`"
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
                          :style="`${
                            $device.isMobile
                              ? 'padding: 0; font-size: 14px'
                              : ''
                          }`"
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
                          class="ma-0"
                          :style="`${
                            $device.isMobile
                              ? 'padding: 0; font-size: 14px'
                              : ''
                          }`"
                          type="text"
                          maxlength="1"
                          size="1"
                          min="0"
                          max="1"
                          pattern="[0-9]{1}"
                          @keyup="focus_next"
                          onclick="this.setSelectionRange(0, this.value.length)"
                        />
                      </v-col>

                      <v-col md="12" cols="12">
                        <v-btn
                          color="primary"
                          light
                          large
                          shaped
                          :loading="v_loading"
                          @click="verify_code"
                        >تأكيد</v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-row class="message-body">
                      <v-col md="12" cols="12">
                        <div class="block_resend" v-if="verify_message">
                          {{ verify_message }}
                        </div>
                      </v-col>
                    </v-row>
                    <v-row class="message-body">
                      <v-col md="12" cols="12">لم يتم إرسال الرسالة؟</v-col>
                    </v-row>
                    <v-row>
                      <v-col md="6" v-if="block_resend == 0">
                        <a href="#" @click="resend_code">إعادة إرسال الكود</a>
                      </v-col>
                      <v-col md="6" v-else>
                        <a href="#">تم الإرسال</a>
                        <div class="block_resend">
                          برجاء الإنتظار
                          <span></span> ثانية
                        </div>
                      </v-col>
                      <v-col md="6">
                        <a href="#" @click="change_phone">تغيير رقم الهاتف</a>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="message" :color="error_type">
      {{ error_message }}
    </v-snackbar>
  </div>

</template>
<script>

  import $ from "jquery";

  export default {
    name: "clients_slider",

    props: {
      verify_modal: false,
      user_id: null,
    },
    data() {
      return {
        message: false,
        block_resend: 0,
        error_message: false,
        v_loading: false,
        error_type: "success",
        verify_message: "",
      };
    },
    mounted() {
    },
    methods: {
      get_verification_code() {
        let inputs = $(".verify-form input");
        let code = "";
        for (let x = 0; x < inputs.length; x++) {
          code += inputs[x].value;
        }
        return code;
      },
      focus_next(e) {
        var t = $(e.target);
        t.next("input").focus();
      },
      verify_code() {
        this.v_loading = true;
        let verification_code = this.get_verification_code();
        if (verification_code.length == 6) {
          this.$axios
            .post("/twilio_verify/verify_code", {
              verification_code: verification_code,
              user_id: this.user_id,
            })
            .then((response) => {
              this.v_loading = false;
              if (response.data.status == 200) {
                this.message = true;
                this.error_type = "success";
                this.error_message = response.data.msg;
                this.$emit('changeVerifyModal' , false)
                this.$emit('addStep' , true)
              } else {
                this.message = true;
                this.error_type = "error";
                this.error_message = response.data.msg;
              }
            });
        }
      },
      resend_code() {
        this.$axios
          .post("/twilio_verify/resend_code", {
            user_id: this.user_id,
          })
          .then((response) => {
            let vm = this;
            if (response.data.status == 200) {
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
            } else {
              this.message = true;
              this.error_type = "error";
              this.error_message = "حدثت مشكلة برجاء المحاولة مرة أخرى";
            }
          });
      },
      change_phone() {
        this.$emit('changeVerifyModal' , false)
        this.change_phone_num = 1;
      },
    },
  };
</script>
