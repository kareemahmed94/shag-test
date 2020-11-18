<template>
  <div>
    <v-form ref="WorkForm" v-model="valid">
      <div class="form-work" style="margin-bottom: 50px">
        <h2>خبرات العمل السابقة</h2>
        <v-row class="d-flex justify-content-center">
          <v-col md="6" cols="12" class="d-flex">
            <v-row style="width: 100%">
              <v-col md="3" cols="12">
                <label class="label-form">خبرات العمل:</label>
              </v-col>
              <v-col
                class="radio-input d-flex flex-row justify-content-around align-items-center"
                md="8"
                cols="12"
              >
                <label class="radio-inline">
                  <input
                    type="radio"
                    value="1"
                    v-model="prevExperience"
                    class="experience-radio-label ml-3"
                    name="experience"
                  />
                  نعم
                </label>
                <label class="radio-inline">
                  <input
                    type="radio"
                    value
                    v-model="prevExperience"
                    class="experience-radio-label ml-3"
                    name="experience"
                    checked
                  />
                  لأ
                </label>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row
          v-for="(data, index) in prevExperienceData"
          :key="index+'-exp'"
          :class="`${$device.isMobile ? '' : 'd-flex align-items-center justify-content-center'}`"
        >
          <v-col md="8" cols="12">
            <prevWorkBox v-if="prevExperience" :prevExperienceData="data"></prevWorkBox>
          </v-col>

          <v-col md="2" cols="12" v-if="prevExperience && index === 0">
            <v-btn small @click="addPrevWorkBox" class="mx-2" fab dark color="#f3922a">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>

          <v-col md="2" v-if="prevExperience && index !== 0">
            <v-btn
              small
              @click="$delete(prevExperienceData, index)"
              class="mx-2"
              fab
              dark
              color="red"
            >
              <v-icon dark>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <h2>مجالات العمل المطلوبة</h2>
        <v-row class="d-flex justify-content-center">
          <v-col md="8" cols="12" class="mx-auto">
            <v-expansion-panels focusable accordion>
              <v-expansion-panel v-for="parent in categories" :key="parent.id">
                <v-expansion-panel-header
                  style="color: #0e4168; font-weight: 700"
                >{{parent.name_ar}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col
                      md="4"
                      cols="12"
                      v-for="subCat in parent.child"
                      :key="subCat.id"
                      style="text-align: right;"
                    >
                      <label
                        class="radio-inline"
                        style="text-align: center;margin-right: 0;font: 14px;"
                      >
                        <input
                          type="checkbox"
                          :value="subCat.id"
                          v-model="workCategories"
                          @change="setSkills"
                          :data="subCat"
                        />
                        {{subCat.name_ar}}
                      </label>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>

        <div class="v-text-field__details text-center" style="padding-right: 28%;">
          <div class="v-messages theme--light error--text" role="alert">
            <div class="v-messages__wrapper">
              <div class="v-messages__message">{{ categories_message }}</div>
            </div>
          </div>
        </div>

        <v-divider></v-divider>

        <h2>الراتب</h2>
        <v-row class="d-flex justify-content-center">
          <v-col md="5" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label class="label-form">الحد الأدنى:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  dense
                  v-model="min_salary"
                  outlined
                  :rules="[(v) => !!v || 'الراتب مطلوب',(v) => v > 2000 || 'الحد الأدنى يجب أن يكون أكثر من 2000']"
                  type="number"
                  label="الراتب المطلوب"
                  required
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col md="5" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label class="label-form">الحد الأقصى:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  dense
                  v-model="max_salary"
                  outlined
                  :rules="[(v) => !!v || 'الراتب مطلوب',(v) => v > 2000 || 'الحد الأقصى يجب أن يكون أكثر من 2000',
                   (v) => v <= 1000000 || 'الحد الأقصى يجب أن يكون أقل من 1000000']"
                  type="number"
                  label="الراتب المطلوب"
                  required
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <h2>رخصة القيادة</h2>
        <v-row class="d-flex justify-content-center">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label class="label-form" style="width: 100% !important">درجة رخصة القيادة:</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="driving_licences"
                  v-model="driving_licence"
                  :rules="[(v) => !!v || 'نوع الرخصة مطلوبة',]"
                  label="نوع الرخصة"
                  outlined
                  required
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-content-center">
          <v-col md="6" cols="12">
            <v-row class="d-flex">
              <v-col md="3" cols="12">
                <label class="label-form">لديك دراجة نارية:</label>
              </v-col>
              <v-col md="8" cols="12" class="radio-input">
                <label class="radio-inline">
                  <input type="radio" value="1" v-model="hasBikeLicense" checked />
                  نعم
                </label>
                <label class="radio-inline">
                  <input type="radio" value v-model="hasBikeLicense" />
                  لأ
                </label>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <div class="form-group row" v-if="skills.length">
          <h4 style="margin-right: 7.333333%;">المهارات</h4>
        </div>
        <div class="row" v-for="(skill,index) in skills" :key="skill.id+'-skill'">
          <div class="col-md-2 col-lg-offset-right-1">
            <h5>{{skill.name}}</h5>
          </div>
          <div class="col-md-2">
            <label
              :for="'option1-'+skill.id"
              :class="[skills[index].level==0 ? 'active ' : '']+'radio-label skill-radio-'+skill.id"
              @click="switchSkillRadio(index,0)"
              :data-val="skill.id"
            >لا يوجد</label>
            <input
              :id="'option1-'+skill.id"
              type="radio"
              v-model="skills[index].level"
              value="0"
              class="radio-btn"
            />
          </div>
          <div class="col-md-2">
            <label
              :for="'option2-'+skill.id"
              :class="[skills[index].level==1 ? 'active ' : '']+'radio-label skill-radio-'+skill.id"
              @click="switchSkillRadio(index,1)"
              :data-val="skill.id"
            >أساسيات</label>
            <input
              :id="'option2-'+skill.id"
              type="radio"
              v-model="skills[index].level"
              value="1"
              class="radio-btn"
            />
          </div>
          <div class="col-md-2">
            <label
              :for="'option3-'+skill.id"
              :class="[skills[index].level==2 ? 'active ' : '']+'radio-label skill-radio-'+skill.id"
              @click="switchSkillRadio(index,2)"
              :data-val="skill.id"
            >جيد</label>
            <input
              :id="'option3-'+skill.id"
              type="radio"
              v-model="skills[index].level"
              value="2"
              class="radio-btn"
            />
          </div>
          <div class="col-md-2">
            <label
              :for="'option4-'+skill.id"
              :class="[skills[index].level==3 ? 'active ' : '']+'radio-label skill-radio-'+skill.id"
              @click="switchSkillRadio(index,3)"
              :data-val="skill.id"
            >جيد جدا</label>
            <input
              :id="'option4-'+skill.id"
              type="radio"
              v-model="skills[index].level"
              value="3"
              class="radio-btn"
            />
          </div>
        </div>
      </div>
    </v-form>
  </div>
</template>
<script>
/* eslint-disable */
import prevWorkBox from "~/components/common/register/prevWorkBox";

export default {
  components: {
    prevWorkBox,
  },
  props: {
    validateForm: Boolean,
  },
  data() {
    return {
      valid: true,
      driving_licences: [],
      experience: "",
      prevExperience: "",
      categories: [],
      hasBike: 0,
      categories_message: "",
      driving_licence: 0,
      hasBikeLicense: "",
      min_salary: "",
      max_salary: "",
      skills: [],
      bikeLicenseDegree: "",
      driving_licence_validation: "",
      workCategories: [],
      rawWorkCategories: [],
      prevExperienceComponents: [prevWorkBox],
      prevExperienceData: [
        {
          companyName: "",
          jobRole: "",
          from: "",
          to: "",
          to_now: false,
        },
      ],
      min_salary_validation: "",
      max_salary_validation: "",
    };
  },
  watch: {
    validateForm() {
      if (this.workCategories.length == 0) {
        this.$emit("WorkValidated", false);
        this.categories_message = "إختر مجال عمل!";
      }
      if (this.$refs.WorkForm.validate()) {
        this.$emit("WorkValidated", true);
      } else {
        this.$emit("WorkValidated", false);
      }
    },
  },
  mounted() {
    this.getCategories();
    this.getDriving_licences();
  },
  methods: {
    switchSkillRadio(index, val) {
      this.skills[index].level = val;
    },
    getDriving_licences() {
      this.$axios.get("/resource/drivingLicenseType").then((response) => {
        this.driving_licences = response.data;
      });
    },
    getCategories() {
      return this.$axios.get("/category/detailed").then((response) => {
        this.categories = response.data;
      });
    },
    addPrevWorkBox() {
      this.prevExperienceComponents.push(prevWorkBox);
      this.prevExperienceData.push({
        companyName: "",
        jobRole: "",
        from: "",
        to: "",
        to_now: false,
      });
    },
    setSkills() {
      this.skills = [];
      this.categories.filter((category) => {
        category.child.filter((subCategory) => {
          if (this.workCategories.includes(subCategory.id)) {
            subCategory.skills.forEach((skill) => {
              this.skills.push({ id: skill.id, name: skill.name_ar, level: 0 });
            });
          }
        });
      });
    },
  },
};
</script>
<style scoped>
.experience {
  text-align: right;
}

.experience input[type="checkbox"],
.experience input[type="radio"] {
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  width: 17px;
  height: 17px;
  border-radius: 5px;
  border: solid 2px #0e4168;
  margin-left: 10px;
}

.experience input[type="checkbox"]:checked,
.experience input[type="radio"]:checked {
  background-color: #0d4168;
}

.experience label {
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #0e4168;
  padding-left: 30px;
}

.form-work h4 {
  text-align: right;
  font-size: 22px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0e4168;
}

.form-work hr {
  margin-top: 20px;
  border-top: 2px solid #0d4168;
  width: 100%;
}

.container {
  margin-top: 20px !important;
  max-width: 80% !important;
  padding: 0 !important;
  background-color: transparent !important;
}

.radio-btn {
  display: none;
}

.b-form-datepicker .form-control {
  display: block !important;
  width: 100% !important;
  padding: 0.375rem 0.75rem !important;
}

.radio-label {
  padding-top: 4px;
  border: 2px #c2ceda solid;
  border-radius: 10px;
  text-align: center;
}

.radio-label:hover {
  cursor: pointer;
  border: 2px #c2ceda solid;
  border-radius: 10px;
  background-color: #c2ceda;
}

.radio-label.active {
  background-color: #c2ceda;
}

hr {
  border-top: 2px solid #6c7c89;
}

.submit {
  background-color: #f4912c;
  color: white;
}

.submit:hover {
  background-color: #0d4168;
  color: white;
}

.banner {
  background-color: #0d4168 !important;
  color: white;
  text-align: center;
  height: 150px;
}

.banner h4 {
  padding-top: 60px;
}

.list-group-item {
  padding: 10px;
  border: 0;
  width: 25%;
}

.btn-list {
  background-color: #f4f4f6;
  color: #619aac;
  border-radius: 10px;
  padding: 10px;
}

.btn-list:hover {
  background-color: #0d4168;
  color: white;
}

.btn-list.active {
  background-color: #0d4168;
  color: white;
}

.list-group {
  padding: 25px 0 0 0;
}
</style>
