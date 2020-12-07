<!-- eslint-disable -->
<template>
  <div>
    <div class="container employer-dashboard" v-if="!$device.isMobileOrTablet">
      <v-row>
        <v-col md="9">
          <v-row>
            <v-col md="4">
              <!--  -->
              <div class="job-candidates-head">
                <v-row class="ml-auto mr-auto">
                  <v-avatar class="ml-auto mr-auto" color="grey" size="164" tile>
                    <v-img
                      :src="employer.logo ? storage_url + employer.logo : thumb_logo"
                    ></v-img>
                      <!-- lazy-src="https://shaghalni.s3.eu-central-1.amazonaws.com/shaghalni_icon.png" -->
                  </v-avatar>
                </v-row>
                <v-divider class="mb-0"></v-divider>
                <v-row class="job-title text-center mt-0">
                  <v-col md="12">
                    <span>{{ employer.name_ar }}</span>
                  </v-col>
                </v-row>
              </div>

              <!--  -->
            </v-col>
            <v-col md="8">
              <div class="job-candidates-head">
                <div class="job-details">
                  <div class="row">
                    <div class="job-details-title">
                      الموقع:
                      <div
                        class="details-title d-inline"
                      >{{ employer.city ? employer.city.name_ar+' ,' : 'لا يوجد' }} {{ employer.area ? employer.area.name_ar : ''}}</div>
                    </div>
                  </div>
                  <div class="row" style="margin-top: 40px">
                    <div class="job-details-title" style="display: flex">
                      الفئة:
                      <div
                        class="details-title"
                        v-if="employer.business_categories"
                      >{{ employer.business_categories[0] ? employer.business_categories[0].name_ar : 'لا يوجد' }}</div>
                    </div>
                    <div class="job-details-title" style="display: flex">
                      موقع الشركة:
                      <div
                        class="details-title"
                      >{{ employer.website ? employer.website : 'لا يوجد' }}</div>
                    </div>
                    <div class="job-details-title" style="display: flex">
                      حجم الشركة:
                      <div
                        class="details-title"
                      >{{ employer.company_size ? employer.company_size.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </div>
                </div>

                <hr />
                <div class="row job-footer">
                  <div class="col-lg-4">
                    <div class="candidate-details">
                      <span>{{ jobs.length }}</span>عدد الوظائف
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="candidate-details">
                      <span>{{ applications }}</span>المتقدمين
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="candidate-details">
                      <span>{{ employer.views }}</span>شاهدت الشركة
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" style="padding: 0">
              <Jobs :jobs="jobs" :status="jobs_status"></Jobs>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="3">
          <v-row>
            <v-col md="12">
              <div class="job-candidates-head" style="height: auto">
                <div class="job-title">عن هذه الشركة</div>
                <hr />
                <div class="job-details-title">{{ employer.about }}</div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <div class="job-filter">
                <div v-if="areas.data && areas.data[0]">
                  <div class="filter-title">المنطقة</div>
                  <div class="filter-option" v-for="(area,index) in areas.data" :key="area.id">
                    <input
                      type="checkbox"
                      v-model="form.filterArea"
                      :id="area.name_en"
                      :value="area.id"
                      @change="updateFilteredJobs('area' , 2)"
                    />
                    <label class="form-check-label" :for="area.name_en">{{area.name_ar}}</label>
                  </div>
                  <div
                    class="more-filter"
                    v-if="areas.next_page_url"
                    @click="more_filter('area', areas.current_page+1)"
                  >
                    مزيد
                    <span></span>
                  </div>
                  <hr />
                </div>
                <div>
                  <div class="filter-title">النوع</div>
                  <div class="filter-option">
                    <input
                      type="checkbox"
                      v-model="form.filterGender"
                      id="male"
                      value="1"
                      @change="updateFilteredJobs('gender' , 3)"
                    />
                    <label class="form-check-label" for="male">ذكر</label>
                  </div>
                  <div class="filter-option">
                    <input
                      type="checkbox"
                      v-model="form.filterGender"
                      id="female"
                      value="2"
                      @change="updateFilteredJobs('gender' , 3)"
                    />
                    <label class="form-check-label" for="female">أنثى</label>
                  </div>
                  <hr />
                </div>
                <div v-if="educationLevels.data && educationLevels.data[0]">
                  <div>
                    <div class="filter-title">المستوي التعليمي</div>
                    <div
                      class="filter-option"
                      v-for="(educationLevel,index) in educationLevels.data"
                      :key="educationLevel.id"
                    >
                      <input
                        type="checkbox"
                        v-model="form.filterEducationLevel"
                        :id="educationLevel.name_en"
                        :value="educationLevel.id"
                        @change="updateFilteredJobs('education_level' , 3)"
                      />
                      <label
                        class="form-check-label"
                        :for="educationLevel.name_en"
                      >{{educationLevel.name_ar}}</label>
                    </div>
                  </div>
                  <div
                    class="more-filter"
                    v-if="educationLevels.next_page_url"
                    @click="more_filter('education_level', educationLevels.current_page+1)"
                  >
                    مزيد
                    <span></span>
                  </div>
                  <hr />
                </div>
                <div>
                  <div class="filter-title">المرتب</div>
                  <v-row>
                    <v-col class="px-4">
                      <v-range-slider
                        v-model="form.filterSalary"
                        :max="max_salary"
                        :min="min_salary"
                        hide-details
                        class="align-center"
                        @change="updateFilteredJobs('salary' , 3)"
                      >
                        <template v-slot:prepend>
                          <v-text-field
                            v-model="form.filterSalary[0]"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 60px"
                            @change="$set(form.filterSalary, 0, $event)"
                            readonly
                          ></v-text-field>
                        </template>
                        <template v-slot:append>
                          <v-text-field
                            v-model="form.filterSalary[1]"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 60px"
                            @change="$set(form.filterSalary, 1, $event)"
                            readonly
                          ></v-text-field>
                        </template>
                      </v-range-slider>
                    </v-col>
                  </v-row>
                  <hr />
                </div>
                <div v-if="jobTypes && jobTypes[0]">
                  <div class="filter-title">نوع الوظيفة</div>
                  <div class="filter-option" v-for="jobType in jobTypes" :key="jobType.id">
                    <input
                      type="checkbox"
                      v-model="form.filterJobType"
                      :id="jobType.name_en"
                      :value="jobType.id"
                      @change="updateFilteredJobs('job_type' , 3)"
                    />
                    <label class="form-check-label" :for="jobType.name_en">{{jobType.name_ar}}</label>
                  </div>
                  <hr />
                </div>
                <div v-if="shiftTypes && shiftTypes[0]">
                  <div class="filter-title">نوع الدوام</div>
                  <div class="filter-option" v-for="shiftType in shiftTypes" :key="shiftType.id">
                    <input
                      type="checkbox"
                      v-model="form.filterShiftType"
                      :id="shiftType.name_en"
                      :value="shiftType.id"
                      @change="updateFilteredJobs('shift_type' , 3)"
                    />
                    <label class="form-check-label" :for="shiftType.name_en">{{shiftType.name_ar}}</label>
                  </div>
                  <hr />
                </div>

                <div>
                  <div class="filter-title">الرخصة</div>
                  <div class="filter-option">
                    <input
                      type="checkbox"
                      v-model="form.filterMLicense"
                      id="s1"
                      value="1"
                      @change="updateFilteredJobs('license' , 3)"
                    />
                    <label class="form-check-label" for="s1">رخصة دراجة نارية</label>
                  </div>
                  <div class="filter-option">
                    <input
                      type="checkbox"
                      v-model="form.filterCLicense"
                      id="s2"
                      value="1"
                      @change="updateFilteredJobs('license' , 3)"
                    />
                    <label class="form-check-label" for="s1">رخصة سيارة</label>
                  </div>
                  <div class="filter-option">
                    <input
                      type="checkbox"
                      v-model="form.filterHLicense"
                      id="s3"
                      value="1"
                      @change="updateFilteredJobs('license' , 3)"
                    />
                    <label class="form-check-label" for="s3">رخصة معدات ثقيلة</label>
                  </div>
                  <hr />
                </div>
                <div v-if="experienceLevels && experienceLevels[0]">
                  <div class="filter-title">المستوي الوظيفي</div>
                  <div
                    class="filter-option"
                    v-for="experienceLevel in experienceLevels"
                    :key="experienceLevel.id"
                  >
                    <input
                      type="checkbox"
                      v-model="form.filterExperienceLevel"
                      :id="experienceLevel.name_en"
                      :value="experienceLevel.id"
                      @change="updateFilteredJobs('experience_level' , 3)"
                    />
                    <label
                      class="form-check-label"
                      :for="experienceLevel.name_en"
                    >{{experienceLevel.name_ar}}</label>
                  </div>
                  <hr />
                </div>
                <div v-if="disabilities && disabilities[0]">
                  <div class="filter-title">احتياجات خاصة</div>
                  <div
                    class="filter-option"
                    v-for="disability in disabilities"
                    :key="disability.id"
                  >
                    <input
                      type="checkbox"
                      v-model="form.filterDisability"
                      :id="disability.name_en"
                      :value="disability.id"
                      @change="updateFilteredJobs('disability' , 3)"
                    />
                    <label class="form-check-label" :for="disability.name_en">{{disability.name_ar}}</label>
                  </div>
                  <hr />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <div class="container" v-if="$device.isMobileOrTablet">
      <v-col cols="11" class="ml-auto mr-auto">
        <v-row>
          <v-col cols="12">
            <div class="job-candidates-head" style="height: auto;">
              <div class="logo-mask ml-auto mr-auto">
                <v-img
                  aspect-ratio="1"
                  :src="employer.logo ? storage_url + employer.logo : thumb_logo"
                ></v-img>
                  <!-- lazy-src="https://shaghalni.s3.eu-central-1.amazonaws.com/shaghalni_icon.png" -->
              </div>
              <v-divider></v-divider>
              <div
                class="job-title"
                style="text-align: center;margin-top: 15%;"
              >{{ employer.name_ar }}</div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="job-candidates-head" style="height: auto;">
              <div class="job-details">
                <div class="row">
                  <div class="job-details-title">
                    الموقع:
                    <div
                      class="details-title d-inline"
                    >{{ employer.city ? employer.city.name_ar+' ,' : 'لا يوجد' }} {{ employer.area ? employer.area.name_ar : ''}}</div>
                  </div>
                </div>
                <div class="row" style="margin-top: 40px">
                  <div class="job-details-title" style="display: flex">
                    الفئة:
                    <div
                      class="details-title"
                      v-if="employer.business_categories"
                    >{{ employer.business_categories[0] ? employer.business_categories[0].name_ar : 'لا يوجد' }}</div>
                  </div>
                  <div class="job-details-title" style="display: flex">
                    موقع الشركة:
                    <div class="details-title">{{ employer.website ? employer.website : 'لا يوجد' }}</div>
                  </div>
                  <div class="job-details-title" style="display: flex">
                    حجم الشركة
                    <div
                      class="details-title"
                    >{{ employer.company_size ? employer.company_size.name_ar : 'لا يوجد' }}</div>
                  </div>
                </div>
              </div>

              <hr />
              <div class="row job-footer">
                <div class="col-lg-4">
                  <div class="candidate-details">
                    <span>{{ jobs.length }}</span>عدد الوظائف
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="candidate-details">
                    <span>{{ applications }}</span>المتقدمين
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="candidate-details">
                    <span>{{ employer.views }}</span>شاهدت شركتك
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <Jobs :jobs="jobs" :status="jobs_status"></Jobs>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="11" class="ml-auto mr-auto">
        <v-row>
          <v-col md="12">
            <div class="job-candidates-head" style="height: auto">
              <div class="job-title">عن هذه الشركة</div>
              <hr />
              <div class="job-details-title">{{ employer.about }}</div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="job-filter">
              <div v-if="areas.data && areas.data[0]">
                <div class="filter-title">المنطقة</div>
                <div class="filter-option" v-for="(area,index) in areas.data" :key="area.id">
                  <input
                    type="checkbox"
                    v-model="form.filterArea"
                    :id="area.name_en"
                    :value="area.id"
                    @change="updateFilteredJobs('area' , 2)"
                  />
                  <label class="form-check-label" :for="area.name_en">{{area.name_ar}}</label>
                </div>
                <div
                  class="more-filter"
                  v-if="areas.next_page_url"
                  @click="more_filter('area', areas.current_page+1)"
                >
                  مزيد
                  <span></span>
                </div>
                <hr />
              </div>
              <div>
                <div class="filter-title">النوع</div>
                <div class="filter-option">
                  <input
                    type="checkbox"
                    v-model="form.filterGender"
                    id="male"
                    value="1"
                    @change="updateFilteredJobs('gender' , 3)"
                  />
                  <label class="form-check-label" for="male">ذكر</label>
                </div>
                <div class="filter-option">
                  <input
                    type="checkbox"
                    v-model="form.filterGender"
                    id="female"
                    value="2"
                    @change="updateFilteredJobs('gender' , 3)"
                  />
                  <label class="form-check-label" for="female">أنثى</label>
                </div>
                <hr />
              </div>
              <div v-if="educationLevels.data && educationLevels.data[0]">
                <div>
                  <div class="filter-title">المستوي التعليمي</div>
                  <div
                    class="filter-option"
                    v-for="(educationLevel,index) in educationLevels.data"
                    :key="educationLevel.id"
                  >
                    <input
                      type="checkbox"
                      v-model="form.filterEducationLevel"
                      :id="educationLevel.name_en"
                      :value="educationLevel.id"
                      @change="updateFilteredJobs('education_level' , 3)"
                    />
                    <label
                      class="form-check-label"
                      :for="educationLevel.name_en"
                    >{{educationLevel.name_ar}}</label>
                  </div>
                </div>
                <div
                  class="more-filter"
                  v-if="educationLevels.next_page_url"
                  @click="more_filter('education_level', educationLevels.current_page+1)"
                >
                  مزيد
                  <span></span>
                </div>
                <hr />
              </div>
              <div>
                <div class="filter-title">المرتب</div>
                <v-row>
                  <v-col class="px-4">
                    <v-range-slider
                      v-model="form.filterSalary"
                      :max="max_salary"
                      :min="min_salary"
                      hide-details
                      class="align-center"
                      @change="updateFilteredJobs('salary' , 3)"
                    >
                      <template v-slot:prepend>
                        <v-text-field
                          v-model="form.filterSalary[0]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(form.filterSalary, 0, $event)"
                          readonly
                        ></v-text-field>
                      </template>
                      <template v-slot:append>
                        <v-text-field
                          v-model="form.filterSalary[1]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(form.filterSalary, 1, $event)"
                          readonly
                        ></v-text-field>
                      </template>
                    </v-range-slider>
                  </v-col>
                </v-row>
                <hr />
              </div>
              <div v-if="jobTypes && jobTypes[0]">
                <div class="filter-title">نوع الوظيفة</div>
                <div class="filter-option" v-for="jobType in jobTypes" :key="jobType.id">
                  <input
                    type="checkbox"
                    v-model="form.filterJobType"
                    :id="jobType.name_en"
                    :value="jobType.id"
                    @change="updateFilteredJobs('job_type' , 3)"
                  />
                  <label class="form-check-label" :for="jobType.name_en">{{jobType.name_ar}}</label>
                </div>
                <hr />
              </div>
              <div v-if="shiftTypes && shiftTypes[0]">
                <div class="filter-title">نوع الدوام</div>
                <div class="filter-option" v-for="shiftType in shiftTypes" :key="shiftType.id">
                  <input
                    type="checkbox"
                    v-model="form.filterShiftType"
                    :id="shiftType.name_en"
                    :value="shiftType.id"
                    @change="updateFilteredJobs('shift_type' , 3)"
                  />
                  <label class="form-check-label" :for="shiftType.name_en">{{shiftType.name_ar}}</label>
                </div>
                <hr />
              </div>

              <div>
                <div class="filter-title">الرخصة</div>
                <div class="filter-option">
                  <input
                    type="checkbox"
                    v-model="form.filterMLicense"
                    id="s1"
                    value="1"
                    @change="updateFilteredJobs('license' , 3)"
                  />
                  <label class="form-check-label" for="s1">رخصة دراجة نارية</label>
                </div>
                <div class="filter-option">
                  <input
                    type="checkbox"
                    v-model="form.filterCLicense"
                    id="s2"
                    value="1"
                    @change="updateFilteredJobs('license' , 3)"
                  />
                  <label class="form-check-label" for="s1">رخصة سيارة</label>
                </div>
                <div class="filter-option">
                  <input
                    type="checkbox"
                    v-model="form.filterHLicense"
                    id="s3"
                    value="1"
                    @change="updateFilteredJobs('license' , 3)"
                  />
                  <label class="form-check-label" for="s3">رخصة معدات ثقيلة</label>
                </div>
                <hr />
              </div>
              <div v-if="experienceLevels && experienceLevels[0]">
                <div class="filter-title">المستوي الوظيفي</div>
                <div
                  class="filter-option"
                  v-for="experienceLevel in experienceLevels"
                  :key="experienceLevel.id"
                >
                  <input
                    type="checkbox"
                    v-model="form.filterExperienceLevel"
                    :id="experienceLevel.name_en"
                    :value="experienceLevel.id"
                    @change="updateFilteredJobs('experience_level' , 3)"
                  />
                  <label
                    class="form-check-label"
                    :for="experienceLevel.name_en"
                  >{{experienceLevel.name_ar}}</label>
                </div>
                <hr />
              </div>
              <div v-if="disabilities && disabilities[0]">
                <div class="filter-title">احتياجات خاصة</div>
                <div class="filter-option" v-for="disability in disabilities" :key="disability.id">
                  <input
                    type="checkbox"
                    v-model="form.filterDisability"
                    :id="disability.name_en"
                    :value="disability.id"
                    @change="updateFilteredJobs('disability' , 3)"
                  />
                  <label class="form-check-label" :for="disability.name_en">{{disability.name_ar}}</label>
                </div>
                <hr />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Jobs from "~/components/job/jobs";
import LoginModal from "~/layouts/Login";

export default {
  layout: "default",
  components: {
    LoginModal,
    Jobs,
  },
  head() {
    return {
      title: "شغلني - " + this.employer ? this.employer.name_ar : "",
    };
  },
  data() {
    return {
      sample_slider: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      shiftTypes: [],
      jobTypes: [],
      educationLevels: [],
      experienceLevels: [],
      sub_categories: [],
      areas: [],
      disabilities: [],
      genders: [],
      worker: 1,
      login_modal: 0,
      can_unlock: false,
      unlock_dialog: false,
      unlock_message: "",
      lock_status: false,
      related_job_seekers: [],
      categories: [],
      cities: [],
      thumb_avatar:
        "https://www.yourfirstpatient.com/assets/default-user-avatar-thumbnail@2x-ad6390912469759cda3106088905fa5bfbadc41532fbaa28237209b1aa976fc9.png",
      user_type: this.$auth.user ? this.$auth.user.account_type_id : null,
      apply_modal: false,
      login_apply_modal: false,
      jobs: [],
      employer: {},
      applications: 0,
      applied: 0,
      more_btn: false,
      more_sub: 0,
      page: 1,
      more_edu: 0,
      min_salary: 2000,
      max_salary: 20000,
      more_shift: 0,
      more_job_type: 0,
      more_area: 0,
      more_gender: 0,
      more_exp: 0,
      more_dis: 0,
      more_loader: false,
      jobs_status: 1,
      salary_more: 5,
      category_more: 5,
      disability_more: 5,
      area_more: 5,
      edu_lvl_more: 5,
      categories_loaded: 0,
      cities_loaded: 0,
      shiftTypes_loaded: 0,
      jobTypes_loaded: 0,
      educationLevels_loaded: 0,
      experienceLevels_loaded: 0,
      sub_categories_loaded: 0,
      disabilities_loaded: 0,
      genders_loaded: 0,
      user: this.$auth.user,
      registration_status: this.$auth.user
        ? this.$auth.user.account_type_id == 4
        : null,
      isJobSeeker: this.$auth.user
        ? this.$auth.user.account_type_id == 4
        : null,
      loggedIn: this.$auth.loggedIn,
      more_cat: 0,
      related_job_seekers_loaded: 0,
      thumb_logo: "https://shaghalni.s3.eu-central-1.amazonaws.com/shaghalni_icon.png",
      storage_url: process.env.StorageUrl,
      related_jobs: {},
      form: {
        filterShiftType: [],
        filterJobType: [],
        filterEducationLevel: [],
        filterCategory: "",
        filterMLicense: "",
        filterCLicense: "",
        filterHLicense: "",
        filterCity: [],
        filterArea: [],
        filterSubCategory: [],
        filterSalary: [2000, 20000],
        filterDisability: [],
        filterGender: [],
        filterExperienceLevel: [],
        searchStr: "",
        searchCat: 0,
        searchCity: 0,
      },
    };
  },
  async mounted() {
    await this.getEmployer();
    await this.get_filter("category");
    await this.get_filter("city");
    await this.get_filter("area");
    await this.get_filter("education_level");
    await this.get_filter("experience_level");
    await this.get_filter("shift_type");
    await this.get_filter("job_type");
    await this.get_filter("disability");
  },
  watch: {
    employer() {
      this.getJobs(this.page);
    },
  },
  methods: {
    more_filter(type, page) {
      let data = this.form;
      data.filterData = type;
      data.filterPage = page;
      this.$axios.get("/filter/jobs", { params: data }).then((response) => {
        if (type == "area") {
          for (let x = 0; x < response.data.data.length; x++) {
            this.areas.data.push(response.data.data[x]);
          }
          this.areas.current_page = response.data.current_page;
          this.areas.next_page_url = response.data.next_page_url;
        } else if (type == "education_level") {
          for (let x = 0; x < response.data.data.length; x++) {
            this.educationLevels.data.push(response.data.data[x]);
          }
          this.educationLevels.current_page = response.data.current_page;
          this.educationLevels.next_page_url = response.data.next_page_url;
        }
      });
    },
    get_filter(model) {
      let data = this.form;
      data.get_filters = 1;
      data.filterType = model;
      this.$axios.get("/filter/jobs", { params: data }).then((response) => {
        let data = response.data;
        if (model === "category") {
          this.categories = data;
        } else if (model === "city") {
          this.cities = data;
        } else if (model === "area") {
          this.areas = data;
        } else if (model === "education_level") {
          this.educationLevels = data;
        } else if (model === "experience_level") {
          this.experienceLevels = data;
        } else if (model === "shift_type") {
          this.shift_types = data;
        } else if (model === "job_type") {
          this.job_types = data;
        } else if (model === "disability") {
          this.disabilities = data;
        }
      });
    },
    filter_filters(model, level) {
      let data = this.form;
      data.get_filters = 1;
      data.filterType = model;
      data.filterLevel = level;
      this.$axios.get("/filter/jobs", { params: data }).then((response) => {
        let data = response.data;
        this.categories = data.categories ? data.categories : this.categories;
        this.cities = data.cities ? data.cities : this.cities;
        this.areas = data.areas ? data.areas : this.areas;
        this.educationLevels = data.education_lvls;
        this.experienceLevels = data.exp_lvls;
        this.shift_types = data.shift_types;
        this.job_types = data.job_types;
        this.disabilities = data.disabilities;
      });
    },
    async updateFilteredJobs(model, level) {
      this.currentPage = 1;
      await this.getJobs(1, "filter");
      await this.filter_filters(model, level);
      this.filter_dialog = false;
    },
    getJobs(page, type) {
      this.loading_jobs = true;
      this.more_loader = true;
      this.loading = true;
      let data = this.form;
      data.page = page;
      data.get_filters = 0
      data.employer_id = this.employer.id;
      this.$axios.get("/filter/jobs", { params: data }).then((response) => {
        let data = response.data;
        let jobs = data.data;
        if (type == "filter") {
          if (jobs.length > 0) {
            this.jobs = jobs;
            this.jobs_status = 2;
          } else {
            this.jobs_status = 3;
          }
        } else {
          if (jobs.length > 0) {
            for (let x = 0; x < jobs.length; x++) {
              this.jobs.push(jobs[x]);
            }
            this.jobs_status = 2;
          } else {
            this.jobs_status = 3;
          }
        }
        this.loading_jobs = false;
        this.more_loader = false;
        data.next_page_url ? this.page++ : $("#more").hide();
        this.loading = false;
      });
    },

    // getRelatedJobSeekers() {
    //   this.$axios.get('/job_seeker/related', {
    //     params: {
    //       slug: this.$route.params.id
    //     }
    //   }).then(response => {
    //     this.related_job_seekers = response.data.data
    //     this.related_job_seekers_loaded = 1
    //   })
    // },
    getEmployer() {
      this.$axios
        .get("/employer/show/" + this.$route.params.id)
        .then((response) => {
          if (response.data.error_code == 200) {
            this.employer = response.data.data.employer;
            this.applications = response.data.data.applications;
          } else {
            this.$router.push("/404");
          }
        });
    },

    get_related_job_seeker(job_seeker) {
      $("body").scrollTop(1000);
      this.$router.push("/job-seeker/" + job_seeker.job_seeker_id);
      this.$axios
        .get("/job_seeker/show/" + job_seeker.job_seeker_id)
        .then((response) => {
          this.job_seeker = response.data.data[0];
          this.lock_status = response.data.data[1];
          this.can_unlock = response.data.data[2];
        });
      this.$axios
        .get("/job_seeker/related", {
          params: {
            slug: job_seeker.job_seeker_id,
          },
        })
        .then((response) => {
          this.related_job_seekers = response.data.data;
        });
    },
    apply(id, event) {
      if (!this.registration_status) {
        this.$toast.open({
          message: "برجاء إتمام عملية التسجيل!",
          type: "error",
          position: "bottom",
          duration: "5000",
        });
        return;
      }
      this.$axios
        .post("/job_seeker/jobs/apply", { job_id: id })
        .then((response) => {
          if (response.data.error_code == 200) {
            this.apply_modal = true;
            $("#shag1").attr("disabled", true);
            $("#shag1").html("تم التقديم");
            $("#shag2").attr("disabled", true);
            $("#shag2").html("تم التقديم");
          }
        });
    },
    login_to_continue() {
      this.login_apply_modal = true;
    },
  },
};
</script>
