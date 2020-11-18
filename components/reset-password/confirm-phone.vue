<template>
  <div>
    <v-form ref="phoneForm" v-model="valid">
      <div class="form-register">
        <div class=" row">
          <label for="phone" class="label-form col-lg-offset-right-3">رقم الموبايل:</label>
          <div class="col-lg-3">
            <v-text-field v-model="phone_number" outlined
                          :rules="[(v) => !!v || 'رقم الموبايل مطلوب',(v) => !isNaN(v) || 'يجب أن يكون أرقام',]"
                          label="رقم الموبايل" required/>

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
        message: '',
        status: '',
        phone_number: '',
      }
    },
    watch: {
      validateForm () {
        if (this.$refs.phoneForm.validate()) {
          this.$emit("PhoneValidated", true)
        } else {
          this.$emit("PhoneValidated", false)
        }
      },
    },
    mounted() {
    },
    methods: {}
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
