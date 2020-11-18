<template>
  <div>
    <!-- Wide Screen Case  -->
    <div v-if="!$device.isMobile">
      <v-row class="slider-container">
        <v-col md="12" cols="11" class="ml-auto mr-auto">
          <cover_slider></cover_slider>
        </v-col>
      </v-row>
      <div class="jobs-page">
        <div class="container-fluid search-bar">
          <div class="row jobs-filter">
            <div class="col-md-3">
              <v-text-field
                v-model="form.searchStr"
                label="بحث بالوظائف"
                solo
                @change="getJobs (1 , 'filter')"
              ></v-text-field>
            </div>
            <div class="col-md-3">
              <v-select
                :items="categories"
                v-model="form.searchCat"
                label="القسم"
                solo
                color="#f3922a"
                item-color="#f3922a"
                item-value="id"
                item-text="name_ar"
                @change="updateFilteredJobs('category' , 1)"
                multiple
              ></v-select>
            </div>
            <div class="col-md-3">
              <v-select
                :items="cities"
                v-model="form.searchCity"
                label="المحافظة"
                solo
                color="#f3922a"
                item-color="#f3922a"
                item-value="id"
                item-text="name_ar"
                @change="updateFilteredJobs('city' , 1)"
                multiple
              ></v-select>
            </div>
            <div class="col-md-2">
              <button type="button" class="btn search-submit" @click="getJobs (1 , 'filter')">شغلني</button>
            </div>
          </div>
        </div>
      </div>
      <div class="jobs-result">
        <div class="records-num">
          <span class="job-title text-sm text-80 px-4">{{ page - 1 }}- {{ jobs ? jobs.length : 7 }} من {{ total_data }} وظيفة</span>
        </div>

        <div class="row">
          <div class="col-md-9" style="padding: 0">
            <Jobs :jobs="jobs" :status="jobs_status"></Jobs>
            <div class="text-center">
              <v-btn
                id="more"
                color="orange"
                dark
                rounded
                :loading="more_loader"
                @click="getJobs(page)"
                v-if="jobs_status == 2"
              >المزيد</v-btn>
            </div>
          </div>
          <div class="col-md-3">
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
                  <label class="form-check-label" :for="area.name_en">{{ area.name_ar }}</label>
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
                    >{{ educationLevel.name_ar }}</label>
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
                      color="#f3922a"
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
                  <label class="form-check-label" :for="jobType.name_en">{{ jobType.name_ar }}</label>
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
                  <label class="form-check-label" :for="shiftType.name_en">{{ shiftType.name_ar }}</label>
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
                  >{{ experienceLevel.name_ar }}</label>
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
                  <label class="form-check-label" :for="disability.name_en">{{ disability.name_ar }}</label>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Case  -->
    <div v-else>
      <!-- Slider Row -->
      <v-row class="slider-container">
        <v-col md="12" cols="11" class="ml-auto mr-auto">
          <cover_slider></cover_slider>
        </v-col>
      </v-row>

      <!-- JobsPage -->
      <div class="jobs-page">
        <div class="container-fluid search-bar">
          <!-- SearchBars -->
          <div class="row jobs-filter">
            <div class="col-md-3">
              <v-text-field
                v-model="form.searchStr"
                label="بحث بالوظائف"
                solo
                @change="getJobs (1 , 'filter')"
              ></v-text-field>
            </div>
            <div class="col-md-3">
              <v-select
                :items="categories"
                v-model="form.searchCat"
                label="القسم"
                solo
                item-value="id"
                item-text="name_ar"
                @change="updateFilteredJobs('category' , 1)"
                multiple
              ></v-select>
            </div>
            <div class="col-md-3">
              <v-select
                :items="cities"
                v-model="form.searchCity"
                label="المحافظة"
                solo
                item-value="id"
                item-text="name_ar"
                @change="updateFilteredJobs('city' , 1)"
                multiple
              ></v-select>
            </div>
            <div class="col-md-2">
              <button type="button" class="btn search-submit" @click="getJobs (1 , 'filter')">شغلني</button>
            </div>
          </div>
          <!-- /SearchBars -->
        </div>
      </div>

      <!-- SearchResults -->
      <div class="jobs-result">
        <div class="records-num">
          <span class="job-title text-sm text-80 px-4">{{ page - 1 }}- {{ jobs ? jobs.length : 7 }} من {{ total_data }} وظيفة</span>
        </div>
        <div class="row">
          <!-- Jobs -->
          <v-col cols="12">
            <div class="ml-auto mr-auto filter-btn">
              <v-btn color="#f3922a" dark small rounded @click="filter_dialog=true">
                <v-icon style="color: white;" left>{{ icons.mdiFilter }}</v-icon>
                <span class="details-title d-inline" style="color: white;">تنقية</span>
              </v-btn>
            </div>
            <Jobs :jobs="jobs" :status="jobs_status"></Jobs>
            <div class="text-center">
              <v-btn
                id="more"
                color="orange"
                dark
                rounded
                :loading="more_loader"
                @click="getJobs(page)"
                v-if="jobs_status == 2"
              >المزيد</v-btn>
            </div>
          </v-col>
          <!-- /Jobs -->
        </div>
      </div>
      <v-dialog v-model="filter_dialog" max-width="600">
        <v-card light>
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
                <label class="form-check-label" :for="area.name_en">{{ area.name_ar }}</label>
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
                  >{{ educationLevel.name_ar }}</label>
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
                    color="#f3922a"
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
                <label class="form-check-label" :for="jobType.name_en">{{ jobType.name_ar }}</label>
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
                <label class="form-check-label" :for="shiftType.name_en">{{ shiftType.name_ar }}</label>
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
                >{{ experienceLevel.name_ar }}</label>
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
                <label class="form-check-label" :for="disability.name_en">{{ disability.name_ar }}</label>
              </div>
              <hr />
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>

    <v-overlay :value="loading_jobs">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
/* eslint-disable */
import VueSlickCarousel from "vue-slick-carousel";
import cover_slider from "~/components/common/cover_slider";
import Jobs from "~/components/job/jobs";
import $ from "jquery";
import { mdiFilter } from "@mdi/js";

export default {
  layout: "default",
  middleware: "not-employer",
  head() {
    return {
      titleTemplate: "%s - الوظائف",
    };
  },
  components: {
    VueSlickCarousel,
    Jobs,
    cover_slider,
  },
  data() {
    return {
      icons: {
        mdiFilter,
      },
      is_mobile: false,
      filter_dialog: false,
      loading_jobs: false,
      categories: [],
      cities: [],
      shiftTypes: [],
      jobTypes: [],
      educationLevels: [],
      experienceLevels: [],
      sub_categories: [],
      min_salary: 2000,
      max_salary: 20000,
      cities_loaded: 0,
      shiftTypes_loaded: 0,
      jobTypes_loaded: 0,
      educationLevels_loaded: 0,
      experienceLevels_loaded: 0,
      sub_categories_loaded: 0,
      disabilities_loaded: 0,
      genders_loaded: 0,
      jobs: [],
      areas: [],
      disabilities: [],
      genders: [],
      thumb_logo:
        "https://ad-venture.org.uk/wp-content/uploads/2017/05/logo-placeholder.png",
      perPage: 7,
      more_sub: 0,
      more_edu: 0,
      more_shift: 0,
      more_job_type: 0,
      more_area: 0,
      more_gender: 0,
      more_exp: 0,
      more_dis: 0,
      page: 1,
      query: this.$route.query,
      more_loader: false,
      jobs_status: 1,
      salary_more: 5,
      category_more: 5,
      disability_more: 5,
      area_more: 5,
      edu_lvl_more: 5,
      currentPage: 1,
      query_status: false,
      total_data: 0,
      loading: false,
      rows: 0,
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
        searchCat: [],
        searchCity: [],
      },
    };
  },

  async mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
    await this.getJobs(this.page);
    await this.get_filter("category");
    await this.get_filter("city");
    await this.get_filter("area");
    await this.get_filter("education_level");
    await this.get_filter("experience_level");
    await this.get_filter("shift_type");
    await this.get_filter("job_type");
    await this.get_filter("disability");
  },
  methods: {
    check_query() {
      let query = this.$route.query;
      if (query.category) {
        this.form.searchCat.push(parseInt(query.category));
      }
      if (query.city) {
        this.form.searchCity.push(parseInt(query.city));
      }
      if (query.job_type) {
        this.form.filterJobType.push(parseInt(query.job_type));
      }
    },
    more_filter(type, page) {
      let data = this.form;
      data.filterType = type;
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
          if (this.query.category) {
            this.form.searchCat.push(parseInt(this.query.category));
            this.updateFilteredJobs("category", 1);
          }
        } else if (model === "city") {
          this.cities = data;
          if (this.query.city) {
            this.form.searchCity.push(parseInt(this.query.city));
            this.updateFilteredJobs("city", 1);
          }
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
          if (this.query.job_type) {
            this.form.filterJobType.push(parseInt(this.query.job_type));
          }
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
      this.$axios.get("/filter/jobs", { params: data }).then((response) => {
        let data = response.data;
        let jobs = data.data;
        this.total_data = data.total;
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
  },
};
</script>
