<template>
  <div>
    <div v-if="!$device.isMobile">
      <v-row class="slider-container">
        <v-col md="12" cols="11" class="ml-auto mr-auto">
          <cover_slider></cover_slider>
        </v-col>
      </v-row>
      <div class="jobs-page">
        <div class="container-fluid search-bar">
          <div class="row jobs-filter justify-center">
            <div class="col-md-3">
              <v-text-field
                v-model="form.searchStr"
                label="بحث بالإسم"
                solo
                @change="getJobSeekers (1 , 'filter')"
              ></v-text-field>
            </div>
            <div class="col-md-3">
              <v-select
                :menu-props="{ offsetY: true }"
                :append-icon="icons.mdiChevronDown"
                :items="categories"
                v-model="form.searchCat"
                label="القسم"
                solo
                item-value="id"
                item-text="name_ar"
                @change="updateFilteredJobSeekers('category' , 1)"
                multiple
              ></v-select>
            </div>
            <div class="col-md-3">
              <v-select
                :menu-props="{ offsetY: true }"
                :append-icon="icons.mdiChevronDown"
                :items="cities"
                v-model="form.searchCity"
                :rules="[(v) => !!v || 'المحافظة',]"
                label="المحافظة"
                solo
                item-value="id"
                item-text="name_ar"
                @change="updateFilteredJobSeekers('city' , 1)"
                multiple
              ></v-select>
            </div>
            <div class="col-md-2">
              <button
                type="button"
                class="btn search-submit"
                @click="updateFilteredJobSeekers('category' , 1)"
              >إبحث</button>
            </div>
          </div>
        </div>
      </div>
      <div class="jobs-result">
        <div class="records-num">
          <span class="job-title text-sm text-80 px-4">{{ job_seekers ? job_seekers.length : '7' }} - {{ page - 1 }} من {{ job_seekers[0] ? job_seekers[0].job_seekers_count : '' }} باحث عن وظيفة</span>
        </div>
        <div class="row">
          <div class="col-md-9" style="padding: 0">
            <JobSeekers :job_seekers="job_seekers" :status="job_seekers_status"></JobSeekers>
            <div class="text-center">
              <v-btn
                id="more"
                color="orange"
                dark
                rounded
                :loading="more_loader"
                @click="getJobSeekers(page)"
                v-if="job_seekers_status == 2"
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
                    @change="updateFilteredJobSeekers('area' , 2)"
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
                    @change="updateFilteredJobSeekers('gender' , 3)"
                  />
                  <label class="form-check-label" for="male">ذكر</label>
                </div>
                <div class="filter-option">
                  <input
                    type="checkbox"
                    v-model="form.filterGender"
                    id="female"
                    value="2"
                    @change="updateFilteredJobSeekers('gender' , 3)"
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
                      @change="updateFilteredJobSeekers('education_level' , 3)"
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
                      color="orange"
                      class="align-center"
                      @change="updateFilteredJobSeekers('salary' , 3)"
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
                <div class="filter-title">نوع الوظيفة:</div>
                <div class="filter-option" v-for="jobType in jobTypes" :key="jobType.id">
                  <input
                    type="checkbox"
                    v-model="form.filterJobType"
                    :id="jobType.name_en"
                    :value="jobType.id"
                    @change="updateFilteredJobSeekers('job_type' , 3)"
                  />
                  <label class="form-check-label" :for="jobType.name_en">{{jobType.name_ar}}</label>
                </div>
                <hr />
              </div>
              <div v-if="shiftTypes && shiftTypes[0]">
                <div class="filter-title">نوع الدوام:</div>
                <div class="filter-option" v-for="shiftType in shiftTypes" :key="shiftType.id">
                  <input
                    type="checkbox"
                    v-model="form.filterShiftType"
                    :id="shiftType.name_en"
                    :value="shiftType.id"
                    @change="updateFilteredJobSeekers('shift_type' , 3)"
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
                    @change="updateFilteredJobSeekers('license' , 3)"
                  />
                  <label class="form-check-label" for="s1">رخصة دراجة نارية</label>
                </div>
                <div class="filter-option">
                  <input
                    type="checkbox"
                    v-model="form.filterCLicense"
                    id="s2"
                    value="1"
                    @change="updateFilteredJobSeekers('license' , 3)"
                  />
                  <label class="form-check-label" for="s1">رخصة سيارة</label>
                </div>
                <div class="filter-option">
                  <input
                    type="checkbox"
                    v-model="form.filterHLicense"
                    id="s3"
                    value="1"
                    @change="updateFilteredJobSeekers('license' , 3)"
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
                    @change="updateFilteredJobSeekers('experience_level' , 3)"
                  />
                  <label
                    class="form-check-label"
                    :for="experienceLevel.name_en"
                  >{{experienceLevel.name_ar}}</label>
                </div>
                <hr />
              </div>
              <div v-if="disabilities && disabilities[0]">
                <div class="filter-title">احتياجات خاصة:</div>
                <div class="filter-option" v-for="disability in disabilities" :key="disability.id">
                  <input
                    type="checkbox"
                    v-model="form.filterDisability"
                    :id="disability.name_en"
                    :value="disability.id"
                    @change="updateFilteredJobSeekers('disability' , 3)"
                  />
                  <label class="form-check-label" :for="disability.name_en">{{disability.name_ar}}</label>
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

      <div class="jobs-page">
        <div class="container-fluid search-bar">
          <div class="row jobs-filter justify-center">
            <div class="col-md-3">
              <v-text-field
                v-model="form.searchStr"
                label="بحث بالإسم"
                solo
                @change="getJobSeekers (1 , 'filter')"
              ></v-text-field>
            </div>
            <div class="col-md-3">
              <v-select
                :menu-props="{ offsetY: true }"
                :append-icon="icons.mdiChevronDown"
                :items="categories"
                v-model="form.searchCat"
                label="القسم"
                solo
                item-value="id"
                item-text="name_ar"
                @change="updateFilteredJobSeekers('category' , 1)"
                multiple
              ></v-select>
            </div>
            <div class="col-md-3">
              <v-select
                :menu-props="{ offsetY: true }"
                :append-icon="icons.mdiChevronDown"
                :items="cities"
                v-model="form.searchCity"
                :rules="[(v) => !!v || 'المحافظة',]"
                label="المحافظة"
                solo
                item-value="id"
                item-text="name_ar"
                @change="updateFilteredJobSeekers('city' , 1)"
                multiple
              ></v-select>
            </div>
            <div class="col-md-2">
              <button
                type="button"
                class="btn search-submit"
                @click="updateFilteredJobSeekers('category' , 1)"
              >إبحث</button>
            </div>
          </div>
        </div>
      </div>
      <div class="jobs-result" style="height: auto;">
        <div class="records-num">
          <span class="job-title text-sm text-80 px-4">{{ job_seekers ? job_seekers.length : '7' }} - {{ page - 1 }} من {{ job_seekers[0] ? job_seekers[0].job_seekers_count : '' }} باحث عن وظيفة</span>
        </div>
        <div class="row">
          <div class="ml-auto mr-auto filter-btn">
            <v-btn color="#f3922a" dark rounded @click="filter_dialog=true">تنقية</v-btn>
          </div>
          <div class="col-md-9" style="padding: 0">
            <JobSeekers :job_seekers="job_seekers" :status="job_seekers_status"></JobSeekers>
            <div class="text-center">
              <v-btn
                id="more"
                color="orange"
                dark
                rounded
                :loading="more_loader"
                @click="getJobSeekers(page)"
                v-if="job_seekers_status == 2"
              >المزيد</v-btn>
            </div>
          </div>
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
                  @change="updateFilteredJobSeekers('area' , 2)"
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
                  @change="updateFilteredJobSeekers('gender' , 3)"
                />
                <label class="form-check-label" for="male">ذكر</label>
              </div>
              <div class="filter-option">
                <input
                  type="checkbox"
                  v-model="form.filterGender"
                  id="female"
                  value="2"
                  @change="updateFilteredJobSeekers('gender' , 3)"
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
                    @change="updateFilteredJobSeekers('education_level' , 3)"
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
                    color="orange"
                    @change="updateFilteredJobSeekers('salary' , 3)"
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
              <div class="filter-title">نوع الوظيفة:</div>
              <div class="filter-option" v-for="jobType in jobTypes" :key="jobType.id">
                <input
                  type="checkbox"
                  v-model="form.filterJobType"
                  :id="jobType.name_en"
                  :value="jobType.id"
                  @change="updateFilteredJobSeekers('job_type' , 3)"
                />
                <label class="form-check-label" :for="jobType.name_en">{{jobType.name_ar}}</label>
              </div>
              <hr />
            </div>
            <div v-if="shiftTypes && shiftTypes[0]">
              <div class="filter-title">نوع الدوام:</div>
              <div class="filter-option" v-for="shiftType in shiftTypes" :key="shiftType.id">
                <input
                  type="checkbox"
                  v-model="form.filterShiftType"
                  :id="shiftType.name_en"
                  :value="shiftType.id"
                  @change="updateFilteredJobSeekers('shift_type' , 3)"
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
                  @change="updateFilteredJobSeekers('license' , 3)"
                />
                <label class="form-check-label" for="s1">رخصة دراجة نارية</label>
              </div>
              <div class="filter-option">
                <input
                  type="checkbox"
                  v-model="form.filterCLicense"
                  id="s2"
                  value="1"
                  @change="updateFilteredJobSeekers('license' , 3)"
                />
                <label class="form-check-label" for="s1">رخصة سيارة</label>
              </div>
              <div class="filter-option">
                <input
                  type="checkbox"
                  v-model="form.filterHLicense"
                  id="s3"
                  value="1"
                  @change="updateFilteredJobSeekers('license' , 3)"
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
                  @change="updateFilteredJobSeekers('experience_level' , 3)"
                />
                <label
                  class="form-check-label"
                  :for="experienceLevel.name_en"
                >{{experienceLevel.name_ar}}</label>
              </div>
              <hr />
            </div>
            <div v-if="disabilities && disabilities[0]">
              <div class="filter-title">احتياجات خاصة:</div>
              <div class="filter-option" v-for="disability in disabilities" :key="disability.id">
                <input
                  type="checkbox"
                  v-model="form.filterDisability"
                  :id="disability.name_en"
                  :value="disability.id"
                  @change="updateFilteredJobSeekers('disability' , 3)"
                />
                <label class="form-check-label" :for="disability.name_en">{{disability.name_ar}}</label>
              </div>
              <hr />
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>

    <v-overlay :value="loading_job_seekers">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";
import JobSeekers from "~/components/job_seeker/jobSeekers";
import $ from "jquery";
import { mdiChevronDown } from "@mdi/js";
import cover_slider from "~/components/common/cover_slider";

export default {
  layout: "default",
  middleware: "verified-employer",
  head() {
    return {
      titleTemplate: "%s - الباحثين عن عمل",
    };
  },
  components: {
    VueSlickCarousel,
    JobSeekers,
    cover_slider,
  },
  data() {
    return {
      icons: {
        mdiChevronDown,
      },
      is_mobile: false,
      filter_dialog: false,
      loading_job_seekers: false,
      categories: [],
      cities: [],
      shiftTypes: [],
      jobTypes: [],
      educationLevels: [],
      experienceLevels: [],
      sub_categories: [],
      categories_loaded: 0,
      cities_loaded: 0,
      shiftTypes_loaded: 0,
      jobTypes_loaded: 0,
      educationLevels_loaded: 0,
      experienceLevels_loaded: 0,
      sub_categories_loaded: 0,
      disabilities_loaded: 0,
      genders_loaded: 0,
      job_seekers: [],
      areas: [],
      disabilities: [],
      genders: [],
      thumb_logo:
        "https://ad-venture.org.uk/wp-content/uploads/2017/05/logo-placeholder.png",
      perPage: 7,
      more_sub: 0,
      more_loader: false,
      min_salary: 50,
      max_salary: 50000,
      more_edu: 0,
      more_shift: 0,
      more_job_type: 0,
      more_area: 0,
      more_gender: 0,
      more_exp: 0,
      more_dis: 0,
      page: 1,
      job_seekers_status: 1,
      salary_more: 5,
      category_more: 5,
      disability_more: 5,
      area_more: 5,
      edu_lvl_more: 5,
      currentPage: 1,
      loading: false,
      total_data: 0,
      rows: 0,
      form: {
        filterShiftType: [],
        filterJobType: [],
        filterEducationLevel: [],
        filterMLicense: "",
        filterCLicense: "",
        filterHLicense: "",
        filterCity: [],
        filterArea: [],
        filterSubCategory: [],
        filterSalary: [50, 50000],
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
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
    await this.getJobSeekers(this.page);
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
    more_filter(type, page) {
      let data = this.form;
      data.filterData = type;
      data.filterPage = page;
      this.$axios.get("/filter/job_seekers", { params: data })
        .then((response) => {
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
      this.$axios.get("/filter/job_seekers", { params: data })
        .then((response) => {
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
      this.$axios
        .get("/filter/job_seekers", { params: data })
        .then((response) => {
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
    async updateFilteredJobSeekers(model, level) {
      this.currentPage = 1;
      await this.getJobSeekers(1, "filter");
      await this.filter_filters(model, level);
      this.filter_dialog = false;
    },
    getJobSeekers(page, type) {
      this.loading_job_seekers = true;
      this.more_loader = true;
      this.loading = true;
      let data = this.form;
      data.get_filters = 0

      data.page = page;
      this.$axios
        .get("/filter/job_seekers", {
          params: data,
        })
        .then((response) => {
          let data = response.data;
          let job_seekers = data.data;
          this.total_data = data.total;
          if (type == "filter") {
            if (job_seekers.length > 0) {
              this.job_seekers = job_seekers;
              this.job_seekers_status = 2;
            } else {
              this.job_seekers_status = 3;
            }
          } else {
            if (job_seekers.length > 0) {
              for (let x = 0; x < job_seekers.length; x++) {
                this.job_seekers.push(job_seekers[x]);
              }
              this.job_seekers_status = 2;
            } else {
              this.job_seekers_status = 3;
            }
          }
          this.loading_job_seekers = false;
          this.more_loader = false;
          data.next_page_url ? this.page++ : $("#more").hide();
          this.loading = false;
        });
    },
  },
};
</script>
