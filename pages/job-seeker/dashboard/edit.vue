<template>
  <div>
    <div class="container register-section">
      <v-card>
        <div class="clients ml-4 mr-4" style="background-image: none">
          <h2 class="text-center mr-4">تعديل بيانات الحساب</h2>
        </div>
        <v-form ref="SPEForm" class="form-register" v-if="job_seeker">
          <v-row>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
            <v-col md="2" class="text-center"> بيانات شخصية</v-col>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
          </v-row>
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
                      v-model="job_seeker.first_name"
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
                      v-model="job_seeker.last_name"
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
                      :return-value.sync="job_seeker.birth_date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          dense
                          v-model="job_seeker.birth_date"
                          label="تاريخ الميلاد"
                          outlined
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="ar"
                        v-model="job_seeker.birth_date"
                        :reactive="true"
                        :flat="true"
                        :show-current="true"
                        :type="'date'"
                        @change="$refs.menu.save(job_seeker.birth_date)"
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
                      v-model="job_seeker.gender_id"
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
                      @click:append-outer="job_seeker.other_phone_numbers.push('')"
                      dense
                      v-model="job_seeker.phone_number"
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
              v-if="job_seeker.other_phone_numbers && job_seeker.other_phone_numbers.length > 0"
            >
              <v-col
                md="6"
                cols="12"
                class="d-flex"
                v-for="(phone, index) in job_seeker.other_phone_numbers"
                :key="'bc' + index"
              >
                <v-row class="d-flex align-items-baseline">
                  <v-col md="3" cols="12">
                    <label for="phone" class="label-form">الرقم الإضافي:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-text-field
                      :append-outer-icon="icons.mdiClose"
                      @click:append-outer="$delete(job_seeker.other_phone_numbers, index)"
                      :rules="[
                    (v) => !!v || 'رقم الموبايل مطلوب',
                    (v) => !isNaN(v) || 'يجب أن يكون أرقام',
                    (v) => validatePhone(v) || 'يجب أن يكون رقم صحيح',
                  ]"
                      dense
                      v-model="job_seeker.other_phone_numbers[index]"
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
                      v-model="job_seeker.password"
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
                      v-model="job_seeker.avatar"
                      prepend-icon
                      append-icon="mdi-camera"
                      label="الصورة الشخصية"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

          </div>



          <v-row>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
            <v-col md="2" class="text-center"> بياناتك الأساسية</v-col>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <div class="form-register">
            <v-row class="form-group">
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline" style="width: 100%">
                  <v-col md="3" cols="12">
                    <label class="label-form">الدولة:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      :items="countries"
                      v-model="job_seeker.country_id"
                      :rules="[(v) => !!v || 'الدولة مطلوبة',]"
                      label="الدولة"
                      outlined
                      item-value="id"
                      item-text="name_ar"
                      @change="countryUpdateSelect()"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="form-group">
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline" style="width: 100%">
                  <v-col md="3" cols="12">
                    <label class="label-form">المحافظة:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      :items="cities"
                      v-model="job_seeker.city_id"
                      :rules="[(v) => !!v || 'المحافظة مطلوبة',]"
                      label="المحافظة"
                      outlined
                      required
                      item-value="id"
                      item-text="name_ar"
                      @change="cityUpdateSelect()"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="form-group">
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline" style="width: 100%">
                  <v-col md="3" cols="12">
                    <label for="area" class="label-form">المنطقة:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      :items="areas"
                      v-model="job_seeker.area_id"
                      label="المنطقة"
                      outlined
                      item-value="id"
                      item-text="name_ar"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="form-group">
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline" style="width: 100%">
                  <v-col md="3" cols="12">
                    <label for="nationality" class="label-form">الجنسية:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      :items="nationalities"
                      v-model="job_seeker.nationality_id"
                      :rules="[(v) => !!v || 'الجنسية مطلوبة',]"
                      label="الجنسية"
                      outlined
                      required
                      item-value="id"
                      item-text="name_ar"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="form-group">
              <v-col md="6" cols="12" class="d-flex">
                <v-row class="d-flex align-items-baseline" style="width: 100%">
                  <v-col md="3" cols="12">
                    <label for class="label-form" style="width: 100% !important">المستوى التعليمي:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      :items="education_lvls"
                      v-model="job_seeker.education_lvl"
                      :rules="[(v) => !!v || 'المستوى التعليمي مطلوب',]"
                      label="المستوى التعليمي"
                      outlined
                      required
                      item-value="id"
                      item-text="name_ar"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>

          <v-row>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
            <v-col md="2" class="text-center"> بيانات العمل</v-col>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
          </v-row>
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
                        v-model="job_seeker.prevExperience"
                        class="experience-radio-label ml-3"
                        name="experience"
                      />
                      نعم
                    </label>
                    <label class="radio-inline">
                      <input
                        type="radio"
                        value
                        v-model="job_seeker.prevExperience"
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
                <prevWorkBox v-if="job_seeker.prevExperience" :prevExperienceData="data"></prevWorkBox>
              </v-col>

              <v-col md="2" cols="12" v-if="job_seeker.prevExperience && index === 0">
                <v-btn small @click="addPrevWorkBox" class="mx-2" fab dark color="#f3922a">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </v-col>

              <v-col md="2" v-if="job_seeker.prevExperience && index !== 0">
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
                              v-model="job_seeker.workCategories"
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
                      v-model="job_seeker.min_salary"
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
                      v-model="job_seeker.max_salary"
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
                      v-model="job_seeker.driving_licence"
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
                      <input type="radio" value="1" v-model="job_seeker.hasBike" checked />
                      نعم
                    </label>
                    <label class="radio-inline">
                      <input type="radio" value v-model="job_seeker.hasBike" />
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

          <v-row>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
            <v-col md="2" class="text-center"> معلومات إضافية</v-col>
            <v-col md="5">
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <div class="form-work">
            <h2>إمكانية التنقل</h2>
            <v-row class="d-flex justify-content-center">
              <v-col md="6" cols="12">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="4" cols="12">
                    <label class="label-form" style="width: 100%">الدولة:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      :items="countries"
                      v-model="job_seeker.moving_country"
                      label="الدولة"
                      outlined
                      item-value="id"
                      item-text="name_ar"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="d-flex justify-content-center">
              <v-col md="6" cols="12">
                <v-row>
                  <v-col md="4" cols="12">
                    <label class="label-form" style="width: 100%">الانتقال لمحافظات أخرى:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <div class="radio-input">
                      <label class="radio-inline">
                        <input type="radio" value="1" v-model="job_seeker.internationalTravel" />
                        نعم
                      </label>
                      <label class="radio-inline">
                        <input type="radio" value="2" v-model="job_seeker.internationalTravel" checked />
                        لا
                      </label>
                      <label class="radio-inline">
                        <input type="radio" value="3" v-model="job_seeker.internationalTravel" />
                        في حالة توفير سكن
                      </label>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row
              class="d-flex justify-content-center"
              v-if="job_seeker.internationalTravel == 1 || job_seeker.internationalTravel == 3"
            >
              <v-col md="6" cols="12">
                <v-row>
                  <v-col md="8" cols="12" class="ml-0 mr-auto">
                    <v-select
                      dense
                      multiple
                      :items="cities"
                      v-model="job_seeker.moving_cities"
                      label="المحافظة"
                      item-value="id"
                      item-text="name_ar"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <h2>معلومات اضافية</h2>
            <v-row class="d-flex justify-content-center">
              <v-col md="6" cols="12">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="4" cols="12">
                    <label class="label-form" style="width: 100%">حالة البحث عن العمل:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      :items="job_seeker_statuses"
                      v-model="job_seeker.job_seeker_status"
                      label="حالة العمل"
                      outlined
                      item-value="id"
                      item-text="name_ar"
                    ></v-select>
                  </v-col>

                  <v-row>
                    <v-col md="6" sm="12" cols="12" class="text-right">
                      <label class="radio-inline">
                        <input type="checkbox" name="find_me" value="1" v-model="job_seeker.find_me" />
                        دع الشركات تجدني على شغلني (موصى به)
                      </label>
                    </v-col>
                    <v-col md="6" cols="12" class="text-right">
                      <label class="radio-inline">
                        <input type="checkbox" name="public_profile" value="1" v-model="job_seeker.public_profile" />
                        اجعل ملفي الشخصي عامًا (موصى به)
                      </label>
                    </v-col>
                  </v-row>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="d-flex justify-content-center">
              <v-col md="6" cols="12">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="4" cols="12">
                    <label class="label-form" style="width: 100%">الحالة الاجتماعية:</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      :items="martialStatuses"
                      v-model="job_seeker.martial_status_id"
                      label="الحالة الإجتماعية"
                      outlined
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
                  <v-col md="4" cols="12">
                    <label class="label-form" style="width: 100%">هل تقبل العمل فى ورديات :</label>
                  </v-col>
                  <v-col md="8" cols="12">
                    <div class="radio-input">
                      <label class="radio-inline">
                        <input type="radio" value="1" v-model="job_seeker.acceptWorkInShifts" />
                        نعم
                      </label>
                      <label class="radio-inline">
                        <input type="radio" value="0" v-model="job_seeker.acceptWorkInShifts" checked />
                        لا
                      </label>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="d-flex justify-content-center" v-if="job_seeker.acceptWorkInShifts == 1">
              <v-col md="6" cols="12">
                <v-row class="d-flex align-items-baseline">
                  <v-col md="4" cols="12"></v-col>
                  <v-col md="8" cols="12">
                    <v-select
                      dense
                      multiple
                      :items="shift_types"
                      v-model="job_seeker.shift_types"
                      label="الورديات"
                      outlined
                      item-value="id"
                      item-text="name_ar"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-divider></v-divider>

            <v-row class="d-flex justify-content-center">
              <v-col md="6" cols="12">
                <v-row class="d-flex align-items-center">
                  <v-col md="8" cols="12">
                    <label class="label-form" style="width: 100%">هل لديك حالة صحية تعوق عن بعض الأعمال؟</label>
                  </v-col>
                  <v-col md="4" cols="12" class="radio-input">
                    <label class="radio-inline">
                      <input
                        type="radio"
                        name="od"
                        @change="open_disabililities(0)"
                        v-model="job_seeker.is_disability"
                        value="1"
                      />
                      نعم
                    </label>
                    <label class="radio-inline">
                      <input
                        type="radio"
                        name="od"
                        @change="open_disabililities(1)"
                        v-model="job_seeker.is_disability"
                        value="0"
                        checked
                      />
                      لا
                    </label>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="d-flex justify-content-center" v-if="disability_status === 0">
              <v-col md="6" cols="12">
                <v-row class="d-flex">
                  <v-col md="8" cols="12">
                    <label
                      class="label-form"
                      style="width: 100%"
                    >اختر واحدة على الاقل لكي نتمكن من ترشيح أكثر الوظائف المناسبة</label>
                  </v-col>
                  <v-col md="4" cols="12">
                    <div class="radio-input" v-for="dis in disabilities" :key="dis.id+dis.name_ar">
                      <label class="radio-inline" style="text-align: center">
                        <input
                          type="radio"
                          name="disabilities"
                          v-model="job_seeker.disability_id"
                          :value="dis.id"
                          :disabled="disability_status==1"
                        />
                        {{dis.name_ar }}
                      </label>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>



          <v-divider></v-divider>

          <v-row class="form-group">
            <v-col md="12" class="text-center">
              <v-btn
                class="job-submit col-md-2"
                color="orange"
                rounded
                light
                style="color: white"
                :loading="btn_loader"
                @click="update()"
              >تعديل
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="message" :color="error_type">
      {{ error_message }}
    </v-snackbar>
  </div>
</template>
<script>
import $ from "jquery";
import {mdiArrowLeft, mdiArrowRight, mdiClose, mdiPlus} from "@mdi/js";
import Mobile from "@/components/common/mobile-input";
import prevWorkBox from "@/components/common/register/prevWorkBox";

export default {
  name: "SpeRegistration",
  components: {
    Mobile,
  },
  head() {
    return {
      titleTemplate: "%s - تعديل الحساب",
    };
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiArrowRight,
        mdiPlus,
        mdiClose,
      },
      storage_url: process.env.StorageUrl,
      job_seeker_statuses: [],
      martialStatuses: [],
      skills: [],

      job_seeker: {
        email: '',
        education_lvl: '',
        country_id: '',
        city_id: '',
        area_id: '',
        nationality_id: '',
        first_name: '',
        last_name: '',
        gender_id: '',
        phone_number: '',
        birth_date: '',
        acceptWorkInShifts: 0,
        prevExperienceData: [],
        hasBike: '',
        hasBikeLicense: '',
        min_salary: '',
        max_salary: '',
        skills: '',
        bikeLicenseDegree: '',
        other_phone_numbers: [],
        workCategories: [],
        moving_cities : '',
        moving_country_id : '',
        shift_types: '',
        martial_status_id : '',
        seek_status_id : '',
        disability_id : '',
        find_me : '',
        public_profile : '',
        is_disability : '',
        driving_license_id : '',
        password : '',
        avatar: '',
      },
      logo: null,
      tax_card: null,
      commercial_record: null,
      disability_status: 0,

      countries: [],
      cities: [],
      areas: [],
      education_lvls: [],
      business_categories: [],
      company_sizes: [],
      nationalities: [],
      menu: false,
      query: this.$route.query,
      mockup_dialog: false,
      date: false,
      overlay: false,
      btn_loader: false,
      show_password: false,
      message: false,
      error_message: false,
      same_as_phone_number: false,
      error_type: "success",
      categories_message: "",
      // Employer Data
      user: this.$auth.user ? this.$auth.user : {},
      user_data: {},
      v_loading: false,
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
      disabilities: [],
      driving_licences: [],
      categories: [],
    };
  },
  watch: {
    query() {
    },
    avatar() {
      this.get_avatar();
    },
  },
  computed: {},
  mounted() {
  },
  methods: {
    validatePhone(v) {
      return v.startsWith('012') || v.startsWith('011') || v.startsWith('010') || v.startsWith('015')
    },
    JS_data() {
      let user = this.$auth.user;
      console.log(user)

      let JS = user ? this.$auth.user.job_seeker : null;
      if (JS) {
        this.job_seeker = {
          email: user.email,
          education_lvl: JS.education_level_id,
          country_id: JS.country_id,
          city_id: JS.city_id,
          area_id: JS.area_id,
          nationality_id: JS.nationality_id,
          first_name: JS.first_name_en,
          last_name: JS.last_name_en,
          gender_id: JS.gender_id,
          phone_number: user.phone_number,
          birth_date: JS.birth_date,
          prevExperienceData: JS.prevExperience,
          hasBike: JS.hasBike,
          hasBikeLicense: JS.hasBike,
          min_salary: JS.hasBike,
          max_salary: JS.hasBike,
          skills: JS.skills,
          bikeLicenseDegree: JS.bikeLicenseDegree,
          other_phone_numbers: JS.other_phone_numbers,
          workCategories: JS.sub_categories,
          moving_cities : JS.moving_cities,
          moving_country_id : JS.moving_country_id,
          shift_types: JS.shift_types,
          martial_status_id : JS.martial_status_id,
          seek_status_id : JS.seek_status_id,
          disability_id : JS.disability_id,
          find_me : JS.find_me,
          public_profile : JS.public_profile,
          is_disability : JS.is_disability,
          driving_license_id : JS.driving_license_id,
          password : '',
          avatar: '',
        }
      }
    },
    add_phone() {
      this.other_phone_numbers.push("");
    },
    update() {
      this.btn_loader = true;
      this.$axios.post("/employer/update", this.employer).then((response) => {
        this.btn_loader = false;
        this.message = true;
        this.error_type = "success";
        this.error_message = "تم بنجاح";
        this.$router.push("/employer/dashboard");
      });
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

    getCountries() {
      this.$axios.get("/resource/country").then((response) => {
        this.countries = response.data;
      });
    },
    getCities() {
      this.$axios.get("/resource/city").then((response) => {
        this.cities = response.data;
      });
    },
    getAreas() {
      this.$axios.get("/resource/area").then((response) => {
        this.areas = response.data;
      });
    },
    getBusinessCategories(resourceName, type) {
      this.$axios
        .get("/resource/businessCategory", {params: {type: type}})
        .then((response) => {
          this.business_categories = response.data;
        });
    },
    getCompanySizes(resourceName, type) {
      this.$axios
        .get("/resource/companySize", {params: {type: type}})
        .then((response) => {
          this.company_sizes = response.data;
        });
    },
    add_buss_cat() {
      this.employer.businessCategoryData.push("");
    },
    /**
     * Handle relation between areas dropdowns
     *
     *@param {object} dropdown
     */
    countryUpdateSelect() {
      if (this.country !== 0) {
        this.$axios.get("/resource/city").then((response) => {
          this.cities = response.data.filter(
            (city) => city.country_id == this.country
          );
          this.areas = [];
        });
      }
    },
    getEducation_lvls(resourceName, type) {
      this.$axios
        .get("/resource/educationLevel", { params: { type: type } })
        .then((response) => {
          this.education_lvls = response.data;
        });
    },
    getNationalities(resourceName, type) {
      this.$axios
        .get("/resource/nationality", { params: { type: type } })
        .then((response) => {
          this.nationalities = response.data;
        });
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
    switchSkillRadio(index, val) {
      this.skills[index].level = val;
    },
    getMartialStatuses(resourceName, type) {
      this.$axios
        .get("/resource/martialStatus", { params: { type: type } })
        .then((response) => {
          this.martialStatuses = response.data;
        });
    },
    getShiftTypes(resourceName, type) {
      this.$axios
        .get("/resource/shiftType", { params: { type: type } })
        .then((response) => {
          this.shift_types = response.data;
        });
    },
    getJobSeekerStatuses(resourceName, type) {
      this.$axios
        .get("/resource/jobSeekerStatus", { params: { type: type } })
        .then((response) => {
          this.job_seeker_statuses = response.data;
        });
    },
    getDisabilities(resourceName, type) {
      this.$axios
        .get("/resource/disability", { params: { type: type } })
        .then((response) => {
          this.disabilities = response.data;
        });
    },
    open_disabililities(state) {
      this.disability_status = state;
      if (state == 1) {
        this.disability = "";
      }
    },
    /**
     * Handle relation between areas dropdowns
     *
     * @param {object} dropdown
     */
    cityUpdateSelect() {
      if (this.city !== 0) {
        this.$axios.get("/resource/area").then((response) => {
          this.areas = response.data.filter(
            (area) => area.city_id == this.city
          );
        });
      }
    },
  },
  created() {
    this.JS_data();
    this.getCountries();
    this.getCities();
    this.getAreas();
    this.getBusinessCategories();
    this.getCompanySizes();
    this.getEducation_lvls();
    this.getNationalities();
    this.getCategories();
    this.getDriving_licences();

    this.getMartialStatuses();
    this.getShiftTypes();
    this.getJobSeekerStatuses();
    this.getDisabilities();
  },
};
</script>


<style scoped>
.v-stepper__header {
  box-shadow: none !important;
}

.v-card {
  overflow-x: hidden;
}

.form-register {
  text-align: right;
  margin-bottom: 50px;
}

.clients {
  background-image: url("~assets/bg-mail-1.jpg");
  background-size: 100% 100%;
}

.label-form {
  width: auto !important;
}

input {
  font-size: 20px;
  width: auto;
  line-height: normal;
  padding: 8px;
}
</style>
