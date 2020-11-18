<template>
  <div>
    <v-form ref="passwordForm" v-model="valid">
      <div class="form-register">
        <div class=" row">
          <label for="password" class="label-form col-lg-offset-right-3">كلمة المرور:</label>
          <div class="col-lg-3">
            <v-text-field v-model="password" outlined
                          :rules="[(v) => !!v || 'كلمة السر مطلوبة',(v) => v.length >= 8 || 'أقل عدد لكلمة السر هو 8 أحرف']"
                          label="كلمة السر" required
                          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show_password ? 'text' : 'password'"
                          name="input-10-1"
                          @click:append="show_password = !show_password"/>
          </div>
        </div>
        <div class=" row">
          <label for="password-confirmation" class="label-form col-lg-offset-right-3">تأكيد كلمة المرور:</label>
          <div class="col-lg-3">
            <v-text-field v-model="password_confirmation" outlined
                          :rules="[(v) => !!v || 'تأكيد كلمة السر مطلوبة',(v) => v == password || 'كلمة السر غير متطابقة']" label="كلمة السر" required
                          :append-icon="show_confirm_password ? 'mdi-eye' : 'mdi-eye-off'" :type="show_confirm_password ? 'text' : 'password'"
                          name="input-10-1" @click:append="show_confirm_password = !show_confirm_password"/>
          </div>
        </div>
        <div class="" style="margin-top: 60px">
          <hr>

        </div>
      </div>

    </v-form>
  </div>
</template>
<script>
  export default {
    name: 'Basic',

    props: {
      validateForm: Boolean
    },
    data() {
      return {
        loading: false,
        valid: false,
        show_password: false,
        show_confirm_password: false,
        message: '',
        status: '',
        avatar: null,
        password: '',
        password_confirmation: '',
      }
    },
    watch: {
      validateForm () {
        if (this.$refs.passwordForm.validate()) {
          this.$emit("BasicValidated", true)
        } else {
          this.$emit("BasicValidated", false)
        }
      },
    },
    mounted() {
    },
    methods: {

    }
  }
</script>
<style scoped>
  .label-form {
    width: 135px !important;
  }

  .v-spinner {
    display: block;
    background-color: transparent !important;
    padding: 0 !important;
    position: inherit !important;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    top: 15px;
    opacity: 1;
    overflow: auto;
    height: 50px;
  }

  .clients {
    padding-bottom: 50px;
    margin-left: 65px;
    margin-right: 65px;
  }

  .clients hr {
    margin-top: 0 !important;
  }
</style>
