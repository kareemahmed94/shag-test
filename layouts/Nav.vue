<template>
  <div>
    <div class="verify-bar" v-if="registration_status == false">
      لم تقم بإنهاء تسجيل بياناتك
      <nuxt-link
        class="verify-btn"
        to="/employer/register?type=complete_registration"
        v-if="user_type == 3"
        >أكمل الآن</nuxt-link
      >
      <nuxt-link
        class="verify-btn"
        to="/job-seeker/register?type=complete_registration"
        v-if="user_type == 4"
      >
        أكمل الآن
      </nuxt-link>
    </div>
    <div class="mobile-nav" v-if="check_mob_tablet()">
      <v-app-bar color="transparent">
        <nuxt-link to="/">
          <img
            alt="logo"
            width="100"
            src="~/assets/logo-blue.png"
            class="logo-nav"
          />
        </nuxt-link>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>

      <v-navigation-drawer
        style="height: auto"
        v-model="drawer"
        color="#12406a"
        floating
        fixed
        bottom
        temporary
      >
        <v-list dark nav rounded>
          <v-list-item-group v-model="group">
            <v-list-item v-if="!is_employer">
              <v-list-item-title>
                <nuxt-link to="/jobs" style="float: right; color: white"
                  >إكتشف الوظائف</nuxt-link
                >
              </v-list-item-title>
            </v-list-item>

            <v-list-item v-if="is_employer">
              <v-list-item-title color="white">
                <nuxt-link to="/jobs/create" style="float: right; color: white"
                  >نشر وظيفة</nuxt-link
                >
              </v-list-item-title>
            </v-list-item>

            <v-list-item v-if="is_employer">
              <v-list-item-title>
                <nuxt-link to="/job-seeker" style="float: right; color: white"
                  >إبحث عن موظفيين</nuxt-link
                >
              </v-list-item-title>
            </v-list-item>
            <v-spacer></v-spacer>

            <v-list-item>
              <v-list-item-title>
                <nuxt-link to="/packages" style="float: right; color: white"
                  >خطط الأسعار</nuxt-link
                >
              </v-list-item-title>
            </v-list-item>
            <v-spacer></v-spacer>

            <v-list-item v-if="is_auth">
              <v-list-item-title @click="logout">
                <nuxt-link to="#" style="float: right; color: white"
                  >تسجيل خروج</nuxt-link
                >
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-else>
              <v-list-item-title>
                <div
                  class="navbar-brand"
                  style="
                    margin-left: 50px;
                    display: flex;
                    padding-left: 2px;
                    color: white;
                    margin-right: 0;
                  "
                >
                  تسجيل دخول
                  <div class="worker" @click="open_worker_modal()">
                    كراغب عمل
                  </div>
                  أو
                  <div class="company" @click="$router.push('/employer/login')">
                    كشركة
                  </div>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>

    <nav
      class="navbar navbar-fixed-top navbar-dark navbar-expand-lg"
      :class="nav_class"
      style="color: rgb(13, 65, 104) !important"
      v-else
    >
      <ul class="navbar-nav" style="margin-right: 4%">
        <nuxt-link to="/">
          <img
            alt="logo"
            width="150"
            src="~/assets/logo-blue.png"
            class="logo-nav"
          />
        </nuxt-link>
      </ul>
      <div
        id="nav-collapse"
        class="navbar-collapse collapse"
        style="display: none"
      >
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <nuxt-link
              to="/jobs"
              class="nav-link"
              v-if="!is_employer">
              إكتشف الوظائف
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
              to="/jobs/create"
              class="nav-link"
              v-if="check_if_employer() && registration_status == true"
              >نشر وظيفة</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
              to="/packages"
              class="nav-link"
              >خطط الأسعار</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
              to="/job-seeker"
              class="nav-link"
              v-if="check_if_employer() && registration_status == true"
              >إبحث عن موظفيين</nuxt-link>
          </li>
        </ul>
        <ul class="navbar-nav mr-auto ml-0">
          <li v-if="!check_auth()" class="nav-item">
            <v-menu offset-y transition="slide-y-transition" bottom>
              <template v-slot:activator="{ on, attrs }">
                <a class="nav-link" v-bind="attrs" v-on="on">تسجيل الدخول</a>
              </template>
              <v-list>
                <v-list-item
                  class="company"
                  @click="$router.push('/employer/login')"
                >
                  <v-list-item-content class="company"
                    >كشركة</v-list-item-content
                  >
                </v-list-item>
                <v-list-item class="worker" @click="open_worker_modal()">
                  <v-list-item-content class="worker"
                    >كراغب عمل</v-list-item-content
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </li>
        </ul>
        <!---->
        <div v-if="check_auth()">
          <v-menu :rounded="true" class="dropdown-menu" offset-y light>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                color="#12406a"
                class="white--text ma-8"
                v-bind="attrs"
                v-on="on"
                style="margin: 0 !important"
                >{{ username }}</v-btn
              >
            </template>
            <div style="justify-content: center; display: flex">
              <v-img
                aspect-ratio="1"
                max-width="100"
                position="center"
                :src="avatar_url ? avatar_url : thumb_avatar"
              ></v-img>
            </div>
            <v-list class="nav-menu">
              <hr />
              <v-list-item
                link
                v-if="user_type == 3 && registration_status == true"
                @click="$router.push('/employer/dashboard')"
              >
                <v-list-item-title>صفحتي</v-list-item-title>
              </v-list-item>
              <v-list-item
                link
                v-if="user_type == 4 && registration_status == true"
                @click="$router.push('/job-seeker/dashboard')"
              >
                <v-list-item-title>صفحتي</v-list-item-title>
              </v-list-item>
              <hr v-if="registration_status == true" />
              <v-list-item link @click="$router.push('/jobs')">
                <v-list-item-title>الوظائف</v-list-item-title>
              </v-list-item>
              <hr />
              <v-list-item link @click="logout">
                <v-list-item-title>تسجيل خروج</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </nav>
    <login-modal
      :worker="worker"
      @close_modal="login_modal = false"
      v-if="login_modal"
    ></login-modal>
  </div>
</template>
<script>
import $ from "jquery";
import LoginModal from "~/layouts/Login";

export default {
  name: "NavBar",
  props: {
    nav_class: "",
  },
  components: {
    LoginModal,
  },
  data() {
    return {
      drawer: false,
      group: null,
      is_mobile: process.client ? window.innerWidth <= 1024 : false,
      is_auth: false,
      is_employer: false,
      login_modal: false,
      username: "Username",
      user_type: this.$auth
        ? this.$auth.loggedIn && this.$auth.user
          ? this.$auth.user.account_type_id
          : null
        : null,
      user: this.$auth ? this.$auth.user : null,
      loggedIn: this.$auth ? this.$auth.loggedIn : false,
      color: "#0d4168",
      path_js: this.$route.path.split("/")[1],
      path_emp: this.$route.path.split("/")[2],
      avatar_url: null,
      storage_url: process.env.StorageUrl,
      avatar: "",
      registration_status: true,
      avatar_slash: null,
      isAuthenticated: "",
      authLoading: "",
      isProfileLoaded: "",
      isVerified: "",
      thumb_avatar:
        "https://www.yourfirstpatient.com/assets/default-user-avatar-thumbnail@2x-ad6390912469759cda3106088905fa5bfbadc41532fbaa28237209b1aa976fc9.png",
      size: "20px",
      getProfile: "20px",
      worker: 0,
    };
  },
  mounted() {
    this.get_avatar();
    this.check_registration();
    this.check_auth();
    this.check_if_employer();
    this.listen_payment();
    this.get_username();
  },
  watch: {
    group() {
      this.drawer = false;
    },
    "$route.path": function () {
      this.check_registration();
    },
  },
  methods: {
    get_username() {
      if (this.user) {
        if (this.user.account_type_id == 4) {
          this.username = this.user.name;
        } else {
          if (this.user.employer) {
            this.username = this.user.employer.name_en;
          }
        }
      }
    },
    check_registration() {
      if (this.$auth.loggedIn) {
        if (this.$auth.user && this.$auth.user.account_id) {
          this.registration_status = true;
        } else {
          this.registration_status = false;
        }
      }
      return;
    },
    check_mob_tablet() {
      if (this.$device) {
        if (this.$device.isMobile || this.$device.isTablet) {
          return true;
        }
      }
      return false;
    },
    check_if_employer() {
      if (this.$auth) {
        if (this.$auth.loggedIn && this.user_type == 3) {
          this.is_employer = true;
          return true;
        }
      }
      return false;
    },
    check_auth() {
      if (this.$auth) {
        if (this.$auth.loggedIn) {
          this.is_auth = true;
          return true;
        }
      }
      return false;
    },
    open_nav_toggle() {
      let bar = $(".collapse");
      if (bar.css("display") == "block") {
        $(".collapse").slideUp("fast", function () {});
      } else {
        $(".collapse").slideDown("fast", function () {});
      }
    },
    get_avatar() {
      if (this.$auth) {
        if (this.$auth.user) {
          if (this.$auth.user.employer || this.$auth.user.job_seeker) {
            if (this.$auth.user.employer) {
              this.avatar = this.$auth.user.employer.logo;
              this.avatar_url = this.avatar
                ? process.env.StorageUrl + this.$auth.user.employer.logo
                : null;
              this.avatar_slash = this.avatar
                ? process.env.StorageUrl + "/" + this.$auth.user.employer.logo
                : null;
            } else if (this.$auth.user.job_seeker) {
              this.avatar = this.$auth.user.job_seeker.logo;
              this.avatar_url = this.avatar
                ? process.env.StorageUrl + this.$auth.user.job_seeker.avatar
                : null;
              this.avatar_slash = this.avatar
                ? process.env.StorageUrl +
                  "/" +
                  this.$auth.user.job_seeker.avatar
                : null;
            }
          }
        }
      }
    },
    listen_payment() {
      if (this.user && this.user_type == 3) {
        // console.log('listen')
        // let pusher = new Pusher('599871ac7a807111bc50', { cluster: 'eu' })
        // pusher.subscribe('private-payment407')
        // pusher.bind('paid', data => {
        //   console.log(data)
        //   alert('done')
        // })
      }
    },
    open_worker_modal() {
      this.login_apply_modal = false;
      this.login_modal = true;
      $(".login-modal").fadeIn("slow", function () {});
      $("body").css("overflow", "hidden");
      this.worker = 1;
    },
    open_employer_modal() {
      this.login_modal = true;
      $(".login-modal").fadeIn("slow", function () {});
      $("body").css("overflow", "hidden");
      this.worker = 0;
    },
    logout: function () {
      this.$auth
        .logout()
        .then(() => {
          this.$router.go();
        })
        .catch((e) => {
          this.error_message = "حدثت مشكلة حاول مرة أخرى";
        });
    },
    register_worker() {
      this.$router.push("/seeker/register");
    },
    register_employer() {
      this.$router.push("/employer/register");
    },
  },
};
</script>
<style>
.mobile-nav .v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none !important;
}
</style>
