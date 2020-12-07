<template>
  <div id="personal">
    <!-- <clients_slider></clients_slider> -->
    <v-form ref="personalForm" v-model="valid">
      <div class="form-register">
        <v-row class="form-input">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="first-name" class="label-form">الإسم الأول:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  dense
                  v-model="first_name"
                  outlined
                  :rules="[(v) => !!v || 'الإسم الأول مطلوب']"
                  label="الإسم الأول"
                  required
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="last-name" class="label-form">إسم العائلة:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  dense
                  v-model="last_name"
                  outlined
                  :rules="[(v) => !!v || 'إسم العائلة مطلوب']"
                  label="إسم العائلة"
                  required
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-input">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="birth-date" class="label-form"
                  >تاريخ الميلاد:</label
                >
              </v-col>
              <v-col md="8" cols="12">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="birth_date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      dense
                      v-model="birth_date"
                      label="تاريخ الميلاد"
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="ar"
                    v-model="birth_date"
                    :reactive="true"
                    :flat="true"
                    :show-current="true"
                    :type="'date'"
                    @change="$refs.menu.save(birth_date)"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-input">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="gender" class="label-form">النوع:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-radio-group
                  v-model="gender"
                  row
                  :rules="[(v) => !!v || 'النوع مطلوب']"
                >
                  <v-radio label="ذكر" value="1"></v-radio>
                  <img
                    src="~/assets/img/icons/male.svg"
                    width="15"
                    class="mr-3"
                  />
                  <v-radio label="أنثى" value="2"></v-radio>
                  <img
                    src="~/assets/img/icons/fmm.svg"
                    width="15"
                    class="mr-3"
                  />
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-input">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="phone" class="label-form">رقم الموبايل:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  :append-outer-icon="icons.mdiPlus"
                  @click:append-outer="other_phone_numbers.push('')"
                  dense
                  v-model="phone_number"
                  outlined
                  :rules="[
                    (v) => !!v || 'رقم الموبايل مطلوب',
                    (v) => !isNaN(v) || 'يجب أن يكون أرقام',
                    (v) => v.length === 11 || 'يجب أن يكون رقم صحيح',
                    (v) => validatePhone(v) || 'يجب أن يكون رقم صحيح',
                  ]"
                  label="رقم الموبايل"
                  required
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row
          class="form-input"
          v-if="other_phone_numbers && other_phone_numbers.length > 0"
        >
          <v-col
            md="6"
            cols="12"
            class="d-flex"
            v-for="(phone, index) in other_phone_numbers"
            :key="'bc' + index"
          >
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="phone" class="label-form">الرقم الإضافي:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  :append-outer-icon="icons.mdiClose"
                  @click:append-outer="$delete(other_phone_numbers, index)"
                  :rules="[
                    (v) => !!v || 'رقم الموبايل مطلوب',
                    (v) => !isNaN(v) || 'يجب أن يكون أرقام',
                    (v) => v.length === 11 || 'يجب أن يكون رقم صحيح',
                    (v) => validatePhone(v) || 'يجب أن يكون رقم صحيح',
                  ]"
                  dense
                  v-model="other_phone_numbers[index]"
                  outlined
                  label="رقم الموبايل"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-input">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="password" class="label-form">كلمة المرور:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  dense
                  v-model="password"
                  outlined
                  :rules="[
                    (v) => !!v || 'كلمة السر مطلوبة',
                    (v) => v.length >= 8 || 'أقل عدد لكلمة السر هو 8 أحرف',
                  ]"
                  label="كلمة السر"
                  required
                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_password ? 'text' : 'password'"
                  name="input-10-1"
                  @click:append="show_password = !show_password"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-input">
          <v-col md="6" cols="12" class="d-flex">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label class="label-form" style="width: 100% !important"
                  >الصورة الشخصية:</label
                >
              </v-col>
              <v-col md="8" cols="12">
                <v-file-input
                  dense
                  outlined
                  :rules="[
                    (v) => !!v || 'الصورة الشخصية مطلوبة',
                    (v) => !v || v.size < 1000000 || 'حجم الصورة يجب أن يكون أقل من 1 ميجا!',
                  ]"
                  accept="image/png, image/jpeg, image/bmp"
                  v-model="avatar"
                  prepend-icon
                  append-icon="mdi-camera"
                  label="الصورة الشخصية"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-divider></v-divider>
      </div>
    </v-form>
  </div>
</template>
<script>
import $ from "jquery";
import clients_slider from "~/components/common/clients_slider.vue";
import { mdiPlus, mdiClose } from "@mdi/js";

export default {
  name: "Personal",
  props: {
    validateForm: Boolean,
    user: {},
  },
  components: {
    clients_slider,
  },
  data() {
    return {
      icons: {
        mdiPlus,
        mdiClose,
      },
      show_password: false,
      menu: false,
      valid: false,
      clients_status: 0,
      verify_message: "",
      loading: false,
      avatar_status: "ready",
      avatar_loading: false,
      v_loading: false,
      storage_url: process.env.StorageUrl,
      change_phone_num: 0,
      block_resend: 0,
      code: "",
      first_name: "",
      last_name: "",
      email: "",
      job_title: "",
      gender: "",
      phone_number: "",
      other_phone_numbers: [],
      password: "",
      message: "",
      status: "",
      avatar: null,
      avatar_base64: "",
      birth_date: "1990-01-01",
    };
  },
  watch: {
    validateForm() {
      if (this.$refs.personalForm.validate()) {
        this.$emit("PersonalValidated", true);
      } else {
        this.$emit("PersonalValidated", false);
      }
    },
    user() {
      this.first_name = this.user.name.split(" ")[0]
        ? this.user.name.split(" ")[0]
        : "";
      this.last_name = this.user.name.split(" ")[1]
        ? this.user.name.split(" ")[1]
        : "";
      this.email = this.user.email;
      this.phone_number = this.user.phone_number;
    },
    avatar() {
      this.get_avatar();
    },
  },
  mounted() {
    $("body").css("overflow", "auto");
  },
  methods: {
    validatePhone(v) {
      return v.startsWith('012') || v.startsWith('011') || v.startsWith('010') || v.startsWith('015')
    },
    get_avatar() {
      this.avatar_status = 'uploading'
      this.avatar_loading = true
      const file = this.avatar;
      const reader = new FileReader();
      let vm = this;
      reader.addEventListener(
        "load",
        function () {
          vm.avatar_base64 = reader.result;
          vm.avatar_loading = false
          vm.avatar_status = 'ready'
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    upload_avatar() {
      this.loading = true;
    },
    avatar_uploaded() {
      this.loading = false;
      this.avatar = this.$refs.avatar.getAcceptedFiles()[0].dataURL;
      this.$refs.avatar.disable();
    },
    file_deleted() {
      this.$refs.avatar.enable();
    },
  },
};
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
