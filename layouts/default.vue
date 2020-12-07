<!--eslint-disable-->
<template>
  <v-app light>
  <div v-cloak>
    <div id="home" :class="home_class">
      <nav-bar @open_login="" v-if="!employer_login" ></nav-bar>
      <nuxt/>
      <footer-bar v-if="!employer_login"></footer-bar>
      <v-row justify="center">
        <v-dialog v-model="payment_done_dialog" persistent max-width="320">
          <v-card>
            <v-card-title class="headline">{{ payment_message }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="payment_done_dialog = false">أغلق</v-btn>
              <v-btn color="primary" text @click="open_dashboard()">الذهاب لصفحتي</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
  </v-app>

</template>
<script>
  import LoginModal from "~/layouts/Login";
  import FooterBar from "~/layouts/Footer";
  import NavBar from "~/layouts/Nav";
  import $ from "jquery";
  export default {
    name: 'default',
    props: ['append_class'],
    head() {
      return {
        title: this.settings ? this.settings.title : "",
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: "description",
            name: "description",
            content: this.settings ? this.settings.description : "",
          },
          {
            hid: "keywords",
            name: "keywords",
            content: this.settings ? this.settings.keywords : "",
          },
          {
            hid: "twitter:title",
            name: "twitter:title",
            content: this.settings ? this.settings.meta_title : "",
          },
          {
            hid: "twitter:description",
            name: "twitter:description",
            content: this.settings ? this.settings.meta_description : "",
          },
          {
            hid: "twitter:image",
            name: "twitter:image",
            content: this.settings ? this.settings.meta_image : "",
          },
          {
            hid: "og:title",
            name: "og:title",
            content: this.settings ? this.settings.meta_title : "",
          },
          {
            hid: "og:description",
            name: "og:description",
            content: this.settings ? this.settings.meta_description : "",
          },
          {
            hid: "og:url",
            name: "og:url",
            content: this.$route.fullPath,
          },
          {
            hid: "og:image",
            name: "og:image",
            content: this.settings ? this.settings.meta_image : "",
          },
        ],
      };
    },
    components: {
      FooterBar,
      NavBar,
      LoginModal,
    },
    data() {
      return {
        is_mobile: process.client ?  window.innerWidth <= 1024 : false,
        route: this.$route.path,
        employer_login: false,
        payment_done_dialog: false,
        payment_message: '',
        loading: true,
        color: '#0d4168',
        size: '20px',
        home_class: '',
        settings: this.$store.state.settings,
        nav_cover:''
      }
    },
    watch: {
      '$route.path': function () {
        this.check_class()
      }
    },
    mounted() {
      this.loading = false
      this.check_class();
      this.last_active();
    },
    methods: {
      last_active() {
        if (this.$auth.loggedIn) {
          let vm = this;
          $(window).on('beforeunload', function () {
            vm.$axios.post( '/last_active')
          })
        }
      },
      listen_payment() {
        // if(this.$auth.loggedIn) {
        //   let vm = this
        //   this.$echo.private('payment.'+this.$auth.user.id)
        //     .on('App\\Events\\PaymentDone', (e) => {
        //       console.log(e)
        //       if (e.payment.status == 'success') {
        //         vm.payment_message = 'تمت عملية الدفع بنجاح يمكنك إستخدام الباقة الآن!'
        //         vm.payment_done_dialog = true
        //         setInterval(function () {
        //           window.location.replace('/employer/dashboard')
        //         },3000)
        //       } else {
        //         vm.payment_message = 'حدثت مشكلة في الدفع!'
        //         vm.payment_done_dialog = true
        //       }
        //     });
        // }
      },
      open_dashboard() {
        this.payment_done_dialog = false
        this.$router.push('/employer/dashboard')
      },
      check_class () {
        if (this.$route.path.split('/')[1] == '' ) {
          this.employer_login = false;
          this.home_class = 'home-page-holder';
        }  else if (this.$route.path.split('/')[1] == 'employer' && this.$route.path.split('/')[2] && this.$route.path.split('/')[2] == 'login'){
          this.employer_login = true;
          this.home_class = 'employer-login-page-holder';
        }  else if (this.$route.path.split('/')[1] == 'employer' && this.$route.path.split('/')[2] && this.$route.path.split('/')[2] == 'landing'){
          this.employer_login = true;
          this.home_class = 'employer-landing-page-holder';
        } else if (this.$route.path.split('/')[1] == 'employerleads'){
          this.employer_login = true;
          this.home_class = 'employer-landing-page-holder';
        } else {
          this.employer_login = false;
          this.home_class = '';
        }
      }
    }
  }
</script>
<style>

</style>
