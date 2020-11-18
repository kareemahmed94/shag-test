<!-- eslint-disable -->
<template>
  <div>
    <v-form ref="extraForm" v-model="valid">
      <div class="form-post-job">
        <h2>متطلبات أخرى (هذا القسم اختيارى)</h2>
        <div class="form-group row">
          <label class="col-sm-2 label-form">النوع</label>
          <v-radio-group
            v-model="required_gender"
            row
            :rules="[(v) => !!v || 'النوع مطلوب']"
          >
            <v-radio label="ذكر" value="1"></v-radio>
            <img
              src="~/assets/img/icons/male.svg"
              width="15"
              style="margin-left: 20px; margin-right: 20px"
            />
            <v-radio label="أنثى" value="2"></v-radio>
            <img
              src="~/assets/img/icons/fmm.svg"
              width="15"
              style="margin-left: 20px; margin-right: 20px"
            />
            <v-radio label="لا يشترط" value=""></v-radio>
          </v-radio-group>
        </div>

        <div
          class="form-group row optional-requirements"
          v-for="(OR, main_index) in ORs"
          :key="OR.id + 'o'"
        >
          <label :id="'or-label' + OR.id" class="col-md-2 label-form">
            {{ OR.title_ar }}
          </label>
          <div
            class="col-md-2"
            v-for="(option, index) in OR.option_json"
            :key="option"
          >
            <label
              :for="index + 'or' + OR.id"
              class="radio-label"
              v-bind:class="{
                active: optional_requirements_values[main_index] == option,
              }"
              @click="updateOR(main_index, option, OR.title_ar)"
              >{{ option }}</label
            >
            <input
              :id="index + 'or' + OR.id"
              type="radio"
              :name="'OR' + OR.id"
              :value="option"
              class="radio-btn"
            />
          </div>
        </div>
        <hr />
        <h2>مميزات الوظيفة (هذا القسم اختيارى)</h2>

        <div
          class="form-group row job-benefits"
          v-for="(JB, main_index) in JBs"
          :key="JB.id + 'j'"
        >
          <label :id="'jb-label' + JB.id" class="col-md-2 label-form">
            {{ JB.name_ar }}
          </label>
          <div
            class="col-md-2"
            v-for="(option, index) in JB.option_json"
            :key="option"
          >
            <label
              :for="index + 'jb' + JB.id"
              class="radio-label"
              v-bind:class="{
                active: job_benefits_values[main_index] == option,
              }"
              @click="updateJB(main_index, option, JB.name_ar)"
              >{{ option }}</label
            >
            <input
              :id="index + 'jb' + JB.id"
              type="radio"
              :name="'JB' + JB.id"
              :value="option"
              class="radio-btn"
            />
          </div>
        </div>
        <hr />
        <h2>هل تقبل الوظيفة القادرون بإختلاف (ذوى الإحتياجات الخاصة) ؟</h2>
        <div class="form-group" style="margin-right: 0; margin-bottom: 70px">
          <div class="radio-input">
            <label class="radio-inline">
              <input
                type="radio"
                name="od"
                @click="disability_status = 0"
                v-model="is_disability"
                value="1"
              />
              نعم
            </label>
            <label class="radio-inline">
              <input
                type="radio"
                name="od"
                @click="disability_status = 1"
                v-model="is_disability"
                value="0"
                checked
              />
              لا
            </label>
          </div>
        </div>
        <div class="form-group" style="margin-right: 0">
          <div
            class="disabilities"
            v-bind:class="{ 'disabilities-active': disability_status == 0 }"
            style="margin-top: 79px"
          >
            <h5 style="margin-right: 25px">
              اختر واحدة على الاقل لكي نتمكن من ترشيح أكثر الوظائف المناسبة
            </h5>
            <div class="row">
              <div
                class="col-md-4"
                style="text-align: right"
                v-for="dis in disabilities"
                :key="dis.id + 'd'"
              >
                <label class="radio-inline">
                  <input
                    type="checkbox"
                    name="disabilities"
                    v-model="disability"
                    :value="dis.id"
                    :disabled="disability_status == 1"
                  />
                  تقبل {{ dis.name_ar }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-form>
    <v-dialog
      name="res-message"
      :classes="['v--modal', 'error-modal']"
      :pivot-y="0.2"
      :left="0"
      :width="400"
      :height="300"
    >
      <div class="error-modal-content">
        <div class="bugs-label" style="padding: 20px">{{ status }}</div>
        <h3 style="padding: 100px">{{ message }}</h3>
      </div>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    validateForm: Boolean,
  },
  data() {
    return {
      ORs: [],
      JBs: [],
      disabilities: [],
      valid: false,
      disability_status: 1,
      required_gender: "",
      is_disability: 0,
      disability: [],
      optional_requirements_labels: [],
      optional_requirements_values: [],
      job_benefits_labels: [],
      job_benefits_values: [],
      message: "",
      status: "",
    };
  },
  watch: {
    validateForm() {
      if (this.$refs.extraForm.validate()) {
        this.$emit("ExtraValidated", true);
      } else {
        this.$emit("ExtraValidated", false);
      }
    },
  },
  async mounted() {
    this.getOR();
    this.getJB();
    this.getDisabilities();
  },
  methods: {
    getDisabilities() {
      this.$axios.get("/resource/disability").then((response) => {
        this.disabilities = response.data;
      });
    },
    getOR() {
      return this.$axios.get("/OR").then((response) => {
        this.ORs = response.data;
      });
    },
    getJB() {
      this.$axios.get("/JB").then((response) => {
        this.JBs = response.data;
      });
    },
    updateOR(index, value, title) {
      this.optional_requirements_labels[index] = title;
      this.optional_requirements_values[index] = value;
      this.$forceUpdate();
    },
    updateJB(index, value, title) {
      this.job_benefits_labels[index] = title;
      this.job_benefits_values[index] = value;
      this.$forceUpdate();
    },
    getJobBenefits() {
      let JBData = [];
      for (let x = 0; x < $(".job-benefits input[type=radio]").length; x++) {
        let rad_inp = $(".job-benefits input[type=radio]")[x];
        let target_id = rad_inp.getAttribute("id");
        if ($("#" + target_id).prop("checked") == true) {
          let jb_id = target_id.split("jb")[1];
          let jb_label = $("#jb-label" + jb_id).text();
          let jb_val = $('label[for="' + target_id + '"]').text();
          this.job_benefits_labels.push(jb_label);
          this.job_benefits_values.push(jb_val);
        }
      }
    },
    getOptionalReqs() {
      for (
        let x = 0;
        x < $(".optional-requirements input[type=radio]").length;
        x++
      ) {
        let rad_inp = $(".optional-requirements input[type=radio]")[x];
        let target_id = rad_inp.getAttribute("id");
        if ($("#" + target_id).prop("checked") == true) {
          let or_id = target_id.split("or")[1];
          let or_label = $("#or-label" + or_id).text();
          let or_val = $('label[for="' + target_id + '"]').text();
          this.optional_requirements_labels.push(or_label);
          this.optional_requirements_values.push(or_val);
        }
      }
    },
    switchRadio(e) {
      let target_id = e.target.getAttribute("id");
      let target_name = e.target.getAttribute("name");
      for (let x = 0; x < $("input[name=" + target_name + "]").length; x++) {
        let inp_id = $("input[name=" + target_name + "]")[x].getAttribute("id");
        $('label[for="' + inp_id + '"]').removeClass("active");
        $("#" + inp_id).attr("checked", false);
      }
      $('label[for="' + target_id + '"]').addClass("active");
      $("#" + target_id).attr("checked", true);
    },
  },
};
</script>
<style>
.error-modal {
  left: -450px !important;
  float: right;
}
</style>
