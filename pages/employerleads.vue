<!--eslint-disable-->
<template>
  <div>
    <div class="landing-employer-text">

      <div class="apart">
        بُعـاد بس قريبين
      </div>
      <div class="landing-headline">
        بالرغم من التباعد هنخليك قريب ونوصلك
        بأفضل المواهب والخبرات في كل المجالات
      </div>
      <div class="landing-social-media">

      </div>
    </div>
    <div class="landing-employer">
      <v-form ref="landingForm" class="landing-employer-form" v-model="valid">

        <div class="row">
          <div class=" m-1">
            <v-text-field v-model="first_name" block background-color="white"  filled rounded :rules="[(v) => !!v || 'الإسم الأول']" label="الإسم الأول" required/>
          </div>

          <div  class=" m-1">
            <v-text-field v-model="last_name" background-color="white"  filled rounded :rules="[(v) => !!v || 'الإسم الأخير']" label="الإسم الأخير" required/>
          </div>
        </div>
        <div class="row">
          <div  class=" m-1">
            <v-text-field v-model="company_name" background-color="white"  filled rounded :rules="[(v) => !!v || 'إسم الشركة']" label="إسم الشركة" required/>
          </div>

          <div  class=" m-1">
            <v-text-field v-model="position" background-color="white"  filled rounded :rules="[(v) => !!v || 'المسمى الوظيفي مطلوب']" label="المسمى الوظيفي" required/>
          </div>
        </div>
        <div class="row">
          <div  class=" m-1">
            <v-text-field v-model="email" background-color="white"  filled rounded type="email" :rules="[(v) => !!v || 'البريد الإلكتروني مطلوب']" label="البريد الإلكتروني" required/>
          </div>

          <div  class=" m-1">
            <v-text-field v-model="phone_number" background-color="white"  filled rounded type="number" :rules="[(v) => !!v || 'رقم الهاتف مطلوب']" label="رقم الهاتف" required/>
          </div>
        </div>
        <div >
          <div >
          </div>
          <div >
            <v-btn color="orange" rounded dark block height="50px" :loading="btn_loader" @click="send_form">إبدأ الآن</v-btn>
          </div>
        </div>
      </v-form>
    </div>
    <div class="landing-employer-logo">
      <nuxt-link to="/">
        <img alt="logo" width="250" src="~/assets/logo.png" class="logo-nav">
      </nuxt-link>
    </div>
    <v-snackbar v-model="message" :color="error_type">
      {{ error_message }}
    </v-snackbar>
  </div>

</template>
<script>
  import login_banner from '~/components/employer/login-banner.vue'
  import home_slider from '~/components/home/home_slider.vue'
  import featured_slider from '~/components/home/featured_slider.vue'
  import clients_slider from '~/components/common/clients_slider.vue'
  import testimonials from '~/components/home/testimonials.vue'

  export default {
    name: 'EmployerLogin',
    layout: 'default',
    middleware: 'guest',
    components: {
      login_banner,
      home_slider,
      featured_slider,
      clients_slider,
      testimonials,
    },
    head() {
      return {
        titleTemplate: '%s - تسجيل الدخول',
      }
    },
    data() {
      return {
        is_mobile: this.$device ? this.$device.isMobile : false,
        thumb_logo: 'https://s3-cdn.shaghalni.com/shaghalni_icon.png',
        storage_url: process.env.StorageUrl,
        email: '',
        first_name: '',
        last_name: '',
        company_name: '',
        position: '',
        phone_number: '',
        searchJobType: '',
        entries: [],
        searchTitle: '',
        message: '',
        error_type: '',
        error_message: '',
        terms: '',
        btn_loader: false,
        valid: false,
        isCitiesLoading: false,
        descriptionLimit: 60,
        filterShiftType: []
      }
    },
    mounted() {
    },
    watch: {},

    methods: {
      send_form() {
        this.btn_loader = true
        if (this.$refs.landingForm.validate()) {
          let form_data = {
            first_name: this.first_name,
            last_name: this.last_name,
            phone_number: this.phone_number,
            position: this.position,
            company_name: this.company_name,
            email: this.email,
          }
          this.$axios.post('/employer/leads',form_data)
            .then(response => {
              this.message = true
              this.error_type = 'success'
              this.error_message = 'تم بنجاح، سيتم التواصل معكم في أقرب وقت ممكن';
              let vm = this
              setInterval(function () {
                window.location.replace('/')
              },2000)
              this.btn_loader = false
            })
        } else {
          this.message = true
          this.error_type = 'error'
          this.error_message = 'أكمل كل الحقول من فضلك';
        }

      },
    }
  }
</script>
