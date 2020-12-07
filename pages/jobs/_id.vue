<!-- eslint-disable -->
<template>
  <div>
    <cover_slider></cover_slider>
    <div class="jobs-page">
      <div class="container-fluid search-bar">
        <div class="row jobs-filter">
          <div class="col-md-3">
            <v-text-field
              v-model="form.searchStr"
              label="بحث بالوظائف"
              solo
              @change="getJobs()"
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
              @change="getJobs()"
              multiple
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-select
              :items="cities"
              v-model="form.searchCity"
              :rules="[(v) => !!v || 'المحافظة']"
              label="المحافظة"
              solo
              item-value="id"
              item-text="name_ar"
              @change="getJobs()"
              multiple
            ></v-select>
          </div>
          <div class="col-md-2">
            <button type="button" class="btn search-submit" @click="getJobs()">
              شغلني
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- !isMobile -->
    <div v-if="!$device.isMobileOrTablet" class="jobs-result">
      <div class="row" v-if="job">
        <v-row>
          <div class="col-md-9">
            <div class="job-holder">
              <v-row>
                <div style="position: absolute; top: 0; left: 12px">
                  <img :src="storage_url+'Hq1EfAk8OBWqtbxDgtivRPPJpNStw5NGAmSzmTNP.png'" width="140" />
                </div>
                <v-col md="3">
                  <div
                    class="logo-mask"
                    :style="`${
                      $device.isMobile ? 'width: 100%; margin-top: 0;' : ''
                    }`"
                  >
                    <v-img
                      aspect-ratio="1"
                      :src="
                        job.employer_logo
                          ? storage_url + job.employer_logo
                          : thumb_logo
                      "
                      onerror="javascript:this.src='https://shaghalni.s3.eu-central-1.amazonaws.com/shaghalni_icon.png'"
                    ></v-img>
                  </div>
                </v-col>
                <v-col md="7">
                  <v-row>
                    <v-col md="6" class="job-details-title">
                      <span class="job-title col-md-5">الوظيفة:</span>
                      {{ job.job_title }}
                    </v-col>
                    <v-col md="6" class="job-details-title">
                      <span class="job-company-title">اسم الشركة:</span>
                      {{ job.employer_name }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" class="job-details-title">
                      <div class="details-title d-inline">الموقع:</div>

                      <div
                        v-if="job.addresses && job.addresses[0]"
                        class="d-inline"
                      >
                        {{
                          job.addresses[0].city
                            ? job.addresses[0].city.name_ar
                            : ""
                        }}
                        {{ job.addresses[0].area ? "," : "" }}
                        {{
                          job.addresses[0].area
                            ? job.addresses[0].area.name_ar
                            : ""
                        }}
                      </div>
                      <div class="d-inline" v-else>لا يوجد</div>
                      <!-- <div
                        class="other-addresses"
                        v-if=" job.addresses.length > 1 "
                        @click="focus_addresses()"
                        >{{ ', و '+(parseInt(job.addresses.length - 1 )) +' آخرون' }}</div>-->
                    </v-col>
                    <v-col cols="6" class="job-details-title">
                      <span class="details-title d-inline">الفئة:</span>
                      {{ job.category ? job.category.name_ar : "لا يوجد" }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col md="6" class="job-details-title">
                      <span class="details-title d-inline">راتب: </span>
                      {{
                        `${job.show_salary ? job.min_salary : "لا يوجد"}
                        ${
                          job.show_salary && job.salary_period === "monthly"
                            ? "شهري"
                            : job.show_salary
                            ? "يومي"
                            : ""
                        }`
                      }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col md="2">
                  <v-row>
                    <v-col md="12">
                      <v-chip
                        outlined
                        class="ml-auto mr-auto"
                        color="#d3dbdf"
                        style="font-size: 10px"
                        v-if="job.job_type"
                      >
                        <strong class="job-title" style="color: #0e4168">{{
                          job.job_type.name_ar
                        }}</strong>
                      </v-chip>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col md="12">
                      <div v-if="isJobSeeker && loggedIn">
                        <v-btn class="job-submit" v-if="job.applied" disabled
                          >تم التقديم</v-btn
                        >
                        <v-btn
                          class="job-submit"
                          id="shag1"
                          @click="apply(job.id, $event)"
                          v-else
                          >شغلني</v-btn
                        >
                      </div>
                      <v-btn
                        class="job-submit"
                        @click="login_to_continue"
                        v-else
                        >شغلني</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col md="3" class="job-details-title">
                  <span class="details-title d-inline">العمالة المطلوبة:</span>
                  {{ job.vacancies_no }}
                </v-col>
                <v-col md="3" class="job-details-title">
                  <span class="details-title d-inline">متقدمين:</span>
                  {{ job.applications ? job.applications.length : "لا يوجد" }}
                </v-col>
                <v-spacer></v-spacer>
                <v-col md="3" class="job-details-title text-left">
                  <span class="details-title d-inline">خبرة:</span>
                  {{
                    job.experience_level
                      ? job.experience_level.name_ar
                      : "لا يوجد"
                  }}
                </v-col>
                <v-col
                  v-if="job.required_gender_id === 1"
                  md="1"
                  class="job-details-title text-center"
                  style="border-right: 3px solid #ccc"
                >
                  <span>
                    <img src="~/assets/img/icons/male.svg" width="10" />
                  </span>
                </v-col>
                <v-col
                  v-if="job.required_gender_id === 2"
                  md="1"
                  class="job-details-title text-center"
                >
                  <span>
                    <img src="~/assets/img/icons/fmm.svg" width="10" />
                  </span>
                </v-col>
              </v-row>
            </div>

            <div class="job-title-details">وصف الوظيفة</div>
            <div class="job-requirements">
              <div class="job-title">{{ job.description }}</div>
            </div>

            <div class="job-title-details">متطلبات الوظيفة</div>
            <div class="row">
              <div class="col-lg-4" v-if="job.min_age || job.max_age">
                <div class="job-requirements">
                  <div class="job-title-desc">السن المطلوب</div>
                  <div class="job-title">
                    {{ job.min_age }} - {{ job.max_age }} سنة
                  </div>
                </div>
              </div>
              <div class="col-lg-4" v-if="job.education_level">
                <div class="job-requirements">
                  <div class="job-title-desc">المؤهل المطلوب</div>
                  <div class="job-title">
                    {{ job.education_level.name_ar }}
                  </div>
                </div>
              </div>
              <div
                class="col-lg-4"
                v-if="
                  job.require_bike_licence ||
                  job.require_car_licence ||
                  job.require_heavy_machine_licence
                "
              >
                <div class="job-requirements">
                  <div class="job-title-desc">رخصة القيادة</div>
                  <div class="job-title" v-if="job.require_car_licence">
                    يشترط رخصة قيادة سيارة
                  </div>
                  <div class="job-title" v-if="job.require_bike_licence">
                    يشترط رخصة قيادة دراجة نارية
                  </div>
                  <div
                    class="job-title"
                    v-if="job.require_heavy_machine_licence"
                  >
                    يشترط رخصة قيادة معدات ثقيلة
                  </div>
                </div>
              </div>
              <div
                id="addresses"
                :ref="addresses"
                class="col-lg-4"
                v-if="job.addresses && job.addresses[0]"
              >
                <div class="job-requirements">
                  <div class="job-title-desc">اماكن الوظيفة</div>
                  <div
                    class="job-title"
                    v-for="(address, index) in job.addresses"
                    :key="index"
                  >
                    {{ address.city ? address.city.name_ar : "" }}
                    {{ address.area ? " , " + address.area.name_ar : "" }}
                  </div>
                </div>
              </div>
              <div class="col-lg-4" v-if="job.military_status">
                <div class="job-requirements">
                  <div class="job-title-desc">الحالة التجنيدية المطلوبة</div>
                  <div class="job-title">
                    {{ job.military_status.name_ar }}
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="
                job.optional_requirements &&
                job.optional_requirements.length != 0
              "
            >
              <div class="job-title-details">متطلبات الوظيفة</div>
              <div class="job-requirements">
                <div
                  class="job-title"
                  v-for="(or, index) in job.optional_requirements"
                  :key="index"
                >
                  - {{ index }} {{ or }}
                </div>
              </div>
            </div>
            <div v-if="job.job_benefits && job.job_benefits.length != 0">
              <div class="job-title-details">مميزات الوظيفة</div>
              <div class="job-requirements">
                <div
                  class="job-title"
                  v-for="(jb, index) in job.job_benefits"
                  :key="index"
                >
                  - {{ Number.isInteger(index) ? "" : index }} {{ jb }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="about-company">
              <div class="filter-title">عن هذه الشركة</div>
              <div class="job-details-title">{{ job.about_employer }}</div>
            </div>
            <br />
            <div class="about-company">
              <div class="filter-title-head">وظائف حسب المجال</div>
              <div v-if="!more_cat">
                <div
                  class="filter-title"
                  v-for="(category, index) in categories"
                  v-if="index < 13"
                  :key="category"
                  @click="getJobs(category.id)"
                >
                  {{ category.name_ar }}
                </div>
              </div>
              <div v-else>
                <div
                  class="filter-title"
                  v-for="category in categories"
                  :key="category.id"
                  @click="getJobs(category.id)"
                >
                  {{ category.name_ar }}
                </div>
              </div>
              <div class="more-filter" v-if="!more_cat" @click="more_filter">
                مزيد
                <span></span>
              </div>
              <div class="more-filter" v-else @click="less_filter">
                أقل
                <span class="less"></span>
              </div>
            </div>
          </div>
        </v-row>
        <v-row>
          <v-col md="4" class="ml-auto mr-auto text-center">
            <div v-if="isJobSeeker && loggedIn">
              <v-btn class="job-submit" v-if="job.applied" disabled
                >تم التقديم</v-btn
              >
              <v-btn
                class="job-submit"
                id="shag2"
                @click="apply(job.id, $event)"
                v-else
                >شغلني</v-btn
              >
            </div>
            <div class="ml-auto mr-auto" v-else>
              <v-btn class="job-submit" @click="login_to_continue">شغلني</v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="related-jobs">
        <hr />
        <h6>
          وظائف مثل وظيفة
          <span>{{ job.job_title }}</span>
        </h6>
        <div class="related-jobs-slider">
          <VueSlickCarousel v-bind="specialOptions" v-if="!relatedJobs_loaded">
            <div v-for="x in sample_slider" :key="'s' + x">
              <img src="~/assets/img/slider-loader.png" width="200" />
            </div>
          </VueSlickCarousel>
          <VueSlickCarousel v-bind="specialOptions" v-else>
            <div
              v-for="(related_job, index) in related_jobs"
              :key="'r' + related_job.id"
            >
              <div class="slider-content-related-jobs">
                <img
                  :src="
                    related_job.logo
                      ? storage_url + related_job.logo
                      : thumb_logo
                  "
                  onerror="javascript:this.src='https://shaghalni.s3.eu-central-1.amazonaws.com/shaghalni_icon.png'"
                />
                <v-divider></v-divider>
                <div
                  class="employer-title"
                  @click="get_related_job(related_job)"
                >
                  {{ related_job.job_title }}
                </div>

                <v-row class="job-items" v-if="related_job.experience_name">
                  <v-col md="4">
                    <img src="../../assets/img/icons/cer..svg" />
                  </v-col>
                  <v-col md="8">
                    <span>{{ related_job.experience_name }}</span>
                  </v-col>
                </v-row>

                <v-row class="job-items" v-if="related_job.job_type">
                  <v-col md="4">
                    <img src="../../assets/img/icons/clock.svg" />
                  </v-col>
                  <v-col md="8">
                    <span>{{ related_job.job_type.name_ar }}</span>
                  </v-col>
                </v-row>

                <v-row class="job-items">
                  <v-col md="4">
                    <img src="../../assets/img/icons/loc.svg" />
                  </v-col>
                  <v-col md="8">
                    <span
                      >{{
                        related_job.area_name ? related_job.area_name + "،" : ""
                      }}
                      {{ related_job.city_name }}</span
                    >
                  </v-col>
                </v-row>
              </div>
            </div>
          </VueSlickCarousel>
          <div class="text-center" style="margin-top: 40px">
            <button
              type="button"
              class="btn btn-main"
              @click="$router.push('/jobs')"
            >
              مزيد من وظائف
              {{ job.category ? job.category.name_ar : "" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- isMobile -->
    <div v-if="$device.isMobileOrTablet" class="jobs-result">
      <div class="row" v-if="job">
        <v-row>
          <v-col cols="10" class="ml-auto mr-auto">
            <div class="job-holder">
              <v-row>
                <div style="position: absolute; top: 0; left: 12px">
                  <img :src="storage_url+'Hq1EfAk8OBWqtbxDgtivRPPJpNStw5NGAmSzmTNP.png'" width="140" />
                </div>
                <v-col cols="12">
                  <div class="logo-mask ml-auto mr-auto">
                    <v-img
                      aspect-ratio="1"
                      :src="
                        job.employer_logo
                          ? storage_url + job.employer_logo
                          : thumb_logo
                      "
                      onerror="javascript:this.src='https://shaghalni.s3.eu-central-1.amazonaws.com/shaghalni_icon.png'"
                    ></v-img>
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="8" class="job-details-title">
                      <span class="job-title">الوظيفة:</span>
                      {{ job.job_title }}
                    </v-col>
                    <v-col cols="4">
                      <v-chip
                        class="ml-auto mr-auto"
                        outlined
                        color="#d3dbdf"
                        style="font-size: 10px"
                        v-if="job.job_type"
                      >
                        <strong class="job-title" style="color: #0e4168">{{
                          job.job_type.name_ar
                        }}</strong>
                      </v-chip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" class="job-details-title">
                      <div class="details-title d-inline">الموقع:</div>

                      <div
                        class="d-inline"
                        v-if="job.addresses && job.addresses[0]"
                      >
                        {{
                          job.addresses[0].city
                            ? job.addresses[0].city.name_ar
                            : ""
                        }}
                        {{ job.addresses[0].area ? "," : "" }}
                        {{
                          job.addresses[0].area
                            ? job.addresses[0].area.name_ar
                            : ""
                        }}
                      </div>
                      <div class="d-inline" v-else>لا يوجد</div>
                      <!-- <div
                        class="other-addresses"
                        v-if=" job.addresses.length > 1 "
                        @click="focus_addresses()"
                        >{{ ', و '+(parseInt(job.addresses.length - 1 )) +' آخرون' }}</div>-->
                    </v-col>
                    <v-col cols="6" class="job-details-title">
                      <span class="details-title d-inline">الفئة:</span>
                      {{ job.category ? job.category.name_ar : "لا يوجد" }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" class="job-details-title">
                      <span class="details-title d-inline">راتب:</span>

                      {{
                        `${job.show_salary ? job.min_salary : "لا يوجد"}
                        ${
                          job.show_salary && job.salary_period === "monthly"
                            ? "شهري"
                            : job.show_salary
                            ? "يومي"
                            : ""
                        }`
                      }}
                    </v-col>
                    <v-col cols="6" class="job-details-title">
                      <span class="job-company-title"> اسم الشركة:</span>
                      {{ job.employer_name }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col md="12">
                      <div v-if="isJobSeeker && loggedIn">
                        <v-btn class="job-submit" v-if="job.applied" disabled
                          >تم التقديم</v-btn
                        >
                        <v-btn
                          class="job-submit"
                          id="shag1"
                          @click="apply(job.id, $event)"
                          v-else
                          >شغلني</v-btn
                        >
                      </div>
                      <v-btn
                        class="job-submit"
                        @click="login_to_continue"
                        v-else
                        >شغلني</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="4" class="job-details-title">
                  <span class="details-title">العمالة المطلوبة:</span>
                  {{ job.vacancies_no }}
                </v-col>
                <v-col cols="3" class="job-details-title">
                  <span class="details-title">متقدمين:</span>
                  {{ job.applications ? job.applications.length : "لا يوجد" }}
                </v-col>
                <v-col cols="3" class="job-details-title">
                  <span class="details-title">خبرة:</span>
                  {{
                    job.experience_level
                      ? job.experience_level.name_ar
                      : "لا يوجد"
                  }}
                </v-col>

                <v-col
                  v-if="job.required_gender_id === 1"
                  cols="1"
                  class="job-details-title pl-0 pr-0 text-center"
                  style="border-right: 3px solid #ccc"
                >
                  <span>
                    <img src="~/assets/img/icons/male.svg" width="10" />
                  </span>
                </v-col>

                <v-col
                  v-if="job.required_gender_id === 2"
                  cols="1"
                  class="job-details-title pl-0 pr-0"
                >
                  <span>
                    <img src="~/assets/img/icons/fmm.svg" width="10" />
                  </span>
                </v-col>
              </v-row>
            </div>

            <div class="job-title-details">وصف الوظيفة</div>
            <div class="job-requirements">
              <div class="job-title">{{ job.description }}</div>
            </div>

            <div class="job-title-details">متطلبات الوظيفة</div>
            <div class="row">
              <div class="col-lg-4" v-if="job.min_age || job.max_age">
                <div class="job-requirements">
                  <div class="job-title-desc">السن المطلوب</div>
                  <div class="job-title">
                    {{ job.min_age }} - {{ job.max_age }} سنة
                  </div>
                </div>
              </div>
              <div class="col-lg-4" v-if="job.education_level">
                <div class="job-requirements">
                  <div class="job-title-desc">المؤهل المطلوب</div>
                  <div class="job-title">
                    {{ job.education_level.name_ar }}
                  </div>
                </div>
              </div>
              <div
                class="col-lg-4"
                v-if="
                  job.require_bike_licence ||
                  job.require_car_licence ||
                  job.require_heavy_machine_licence
                "
              >
                <div class="job-requirements">
                  <div class="job-title-desc">رخصة القيادة</div>
                  <div class="job-title" v-if="job.require_car_licence">
                    يشترط رخصة قيادة سيارة
                  </div>
                  <div class="job-title" v-if="job.require_bike_licence">
                    يشترط رخصة قيادة دراجة نارية
                  </div>
                  <div
                    class="job-title"
                    v-if="job.require_heavy_machine_licence"
                  >
                    يشترط رخصة قيادة معدات ثقيلة
                  </div>
                </div>
              </div>
              <div
                id="addresses"
                :ref="addresses"
                class="col-lg-4"
                v-if="job.addresses && job.addresses[0]"
              >
                <div class="job-requirements">
                  <div class="job-title-desc">اماكن الوظيفة</div>
                  <div
                    class="job-title"
                    v-for="(address, index) in job.addresses"
                    :key="index"
                  >
                    {{ address.city ? address.city.name_ar : "" }}
                    {{ address.area ? " , " + address.area.name_ar : "" }}
                  </div>
                </div>
              </div>
              <div class="col-lg-4" v-if="job.military_status">
                <div class="job-requirements">
                  <div class="job-title-desc">الحالة التجنيدية المطلوبة</div>
                  <div class="job-title">
                    {{ job.military_status.name_ar }}
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="
                job.optional_requirements &&
                job.optional_requirements.length != 0
              "
            >
              <div class="job-title-details">متطلبات الوظيفة</div>
              <div class="job-requirements">
                <div
                  class="job-title"
                  v-for="(or, index) in job.optional_requirements"
                  :key="index"
                >
                  - {{ index }} {{ or }}
                </div>
              </div>
            </div>
            <div v-if="job.job_benefits && job.job_benefits.length != 0">
              <div class="job-title-details">مميزات الوظيفة</div>
              <div class="job-requirements">
                <div
                  class="job-title"
                  v-for="(jb, index) in job.job_benefits"
                  :key="index"
                >
                  - {{ Number.isInteger(index) ? "" : index }} {{ jb }}
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="10" class="ml-auto mr-auto">
            <div class="about-company">
              <div class="filter-title">عن هذه الشركة</div>
              <div class="job-details-title">{{ job.about_employer }}</div>
            </div>
            <br />
            <div class="about-company">
              <div class="filter-title-head">وظائف حسب المجال</div>
              <div v-if="!more_cat">
                <div
                  class="filter-title"
                  v-for="(category, index) in categories"
                  v-if="index < 13"
                  :key="category"
                  @click="getJobs(category.id)"
                >
                  {{ category.name_ar }}
                </div>
              </div>
              <div v-else>
                <div
                  class="filter-title"
                  v-for="category in categories"
                  :key="category.id"
                  @click="getJobs(category.id)"
                >
                  {{ category.name_ar }}
                </div>
              </div>
              <div class="more-filter" v-if="!more_cat" @click="more_filter">
                مزيد
                <span></span>
              </div>
              <div class="more-filter" v-else @click="less_filter">
                أقل
                <span class="less"></span>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="ml-auto mr-auto text-center" cols="6">
            <div v-if="isJobSeeker && loggedIn">
              <v-btn class="job-submit" v-if="job.applied" disabled
                >تم التقديم</v-btn
              >
              <v-btn
                class="job-submit"
                id="shag2"
                @click="apply(job.id, $event)"
                v-else
                >شغلني</v-btn
              >
            </div>
            <div v-else>
              <v-btn class="job-submit" @click="login_to_continue">شغلني</v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col cols="10" class="ml-auto mr-auto">
          <div class="related-jobs">
            <v-divider></v-divider>
            <h6>
              وظائف مثل وظيفة
              <span>{{ job.job_title }}</span>
            </h6>
            <div class="related-jobs-slider">
              <VueSlickCarousel
                v-bind="specialOptions"
                v-if="!relatedJobs_loaded"
              >
                <div v-for="x in sample_slider" :key="'s' + x">
                  <img src="~/assets/img/slider-loader.png" width="200" />
                </div>
              </VueSlickCarousel>
              <VueSlickCarousel v-bind="specialOptions" v-else>
                <div
                  v-for="(related_job, index) in related_jobs"
                  :key="'r' + related_job.id"
                >
                  <div class="slider-content-related-jobs ml-auto mr-auto">
                    <img
                      :src="
                        related_job.logo
                          ? storage_url + related_job.logo
                          : thumb_logo
                      "
                      onerror="javascript:this.src='https://shaghalni.s3.eu-central-1.amazonaws.com/shaghalni_icon.png'"
                    />
                    <v-divider></v-divider>
                    <div
                      class="employer-title"
                      @click="get_related_job(related_job)"
                    >
                      {{ related_job.job_title }}
                    </div>

                    <v-row class="job-items" v-if="related_job.experience_name">
                      <v-col cols="4">
                        <img src="../../assets/img/icons/cer..svg" />
                      </v-col>
                      <v-col cols="8">
                        <span>{{ related_job.experience_name }}</span>
                      </v-col>
                    </v-row>

                    <v-row class="job-items" v-if="related_job.job_type">
                      <v-col cols="4">
                        <img src="../../assets/img/icons/clock.svg" />
                      </v-col>
                      <v-col cols="8">
                        <span>{{ related_job.job_type.name_ar }}</span>
                      </v-col>
                    </v-row>

                    <v-row class="job-items">
                      <v-col cols="4">
                        <img src="../../assets/img/icons/loc.svg" />
                      </v-col>
                      <v-col cols="8">
                        <span
                          >{{
                            related_job.area_name
                              ? related_job.area_name + "،"
                              : ""
                          }}
                          {{ related_job.city_name }}</span
                        >
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </VueSlickCarousel>
              <div class="text-center" style="margin-top: 40px">
                <button
                  type="button"
                  class="btn btn-main"
                  @click="$router.push('/jobs')"
                >
                  مزيد من وظائف
                  {{ job.category ? job.category.name_ar : "" }}
                </button>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="apply_modal" max-width="600">
      <v-card light>
        <div class="logo-holder-modal">
          <img src="~/assets/logo-blue.png" width="200" />
        </div>
        <div class="size-modal-content">
          <h2>شكرا لأستخدامك شغلني</h2>
          <h5>تم التقديم بنجاح</h5>
          <button class="btn btn-main" @click="apply_modal = false">
            أغلق
          </button>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="login_apply_modal" max-width="600">
      <v-card light>
        <div class="logo-holder-modal">
          <img src="~/assets/logo-blue.png" width="200" />
        </div>
        <div class="size-modal-content">
          <h5>سجل دخول كباحث عن العمل حتى يمكنك التقديم على الوظيفة</h5>
          <div class="row">
            <div class="col-md-6">
              <button
                class="btn btn-main"
                style="width: 100%"
                @click="login_modal = 1"
                v-if="!loggedIn"
              >
                تسجيل دخول
              </button>
            </div>
            <div class="col-md-6">
              <button
                class="btn btn-main"
                style="width: 100%"
                @click="$router.push('/job-seeker/register')"
                v-if="!loggedIn"
              >
                أشترك كراغب عمل
              </button>
            </div>
          </div>
        </div>
      </v-card>
      <login-modal
        ref="login"
        :worker="worker"
        v-if="login_modal"
        @close_modal="login_modal = 0"
      ></login-modal>
    </v-dialog>
  </div>
</template>
<script>
import $ from "jquery";
import LoginModal from "~/layouts/Login";
import cover_slider from "~/components/common/cover_slider";
export default {
  layout: "default",
  components: {
    LoginModal,
    cover_slider,
  },
  async asyncData({ params, store }) {
    try {
      const Single = await store.dispatch("job/getJob", { params });
      return {
        jobData: Single,
      };
    } catch (error) {
      return {
        Error: error,
      };
    }
  },
  head() {
    return {
      title:
        "شغلني - " + this.jobData ? this.jobData.job_title : this.job.job_title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.jobData ? this.jobData.description : "",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.jobData ? this.jobData.job_title : "",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.jobData ? this.jobData.description : "",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.jobData
            ? this.jobData.employer_logo
              ? this.storage_url + this.jobData.employer_logo
              : this.thumb_logo
            : "",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.jobData ? this.jobData.job_title : "",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.jobData ? this.jobData.description : "",
        },
        {
          hid: "og:url",
          name: "og:url",
          content: this.jobData ? this.jobData.description : "",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.jobData
            ? this.jobData.employer_logo
              ? this.storage_url + this.jobData.employer_logo
              : this.thumb_logo
            : "",
        },
      ],
    };
  },
  data() {
    return {
      sample_slider: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      worker: 1,
      login_modal: 0,
      categories: [],
      cities: [],
      user_type: this.$auth.user ? this.$auth.user.account_type_id : null,
      specialOptions: {
        centerMode: process.client
          ? window.innerWidth <= 1024
            ? false
            : true
          : false,
        arrows: false,
        centerPadding: "200px",
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        slidesToScroll: 1,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      apply_modal: false,
      login_apply_modal: false,
      jobs: [],
      job: {},
      jobData: {},
      applied: 0,
      user: this.$auth.user,
      registration_status: this.$auth.user
        ? this.$auth.user.account_type_id == 4
        : null,
      isJobSeeker: this.$auth.user
        ? this.$auth.user.account_type_id == 4
        : null,
      loggedIn: this.$auth.loggedIn,
      more_cat: 0,
      relatedJobs_loaded: 0,
      thumb_logo: "https://shaghalni.s3.eu-central-1.amazonaws.com/shaghalni_icon.png",
      storage_url: process.env.StorageUrl,
      related_jobs: {},
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
        filterSalary: [],
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
    this.getJob();
    this.getRelatedJobs();
    this.getCategories();
    this.getCities();
  },
  watch: {
    job() {
      this.jobData = this.job;
    },
  },
  methods: {
    focus_addresses() {
      this.$nextTick(() => {
        window.location.hash = "#addresses";
        $(document).on("scroll", function () {
          window.location.hash = "";
        });
      });
    },
    getCategories() {
      this.$axios
        .get("/resource/category", { params: { type: "jobs" } })
        .then((response) => {
          this.categories = response.data;
        });
    },
    getCities() {
      this.$axios
        .get("/resource/city", { params: { type: "jobs" } })
        .then((response) => {
          this.cities = response.data;
        });
    },
    more_filter() {
      this.more_cat = 1;
    },
    less_filter() {
      this.more_cat = 0;
    },
    getRelatedJobs() {
      this.$axios
        .get("/job/jobs/related", {
          params: {
            slug: this.$route.params.id,
          },
        })
        .then((response) => {
          this.related_jobs = response.data.data;
          this.relatedJobs_loaded = 1;
        });
    },
    getJob() {
      this.$axios
        .get("/job/jobs/show/" + this.$route.params.id)
        .then((response) => {
          if (response.data.error_code == 200) {
            this.job = response.data.data["job_data"];
            this.applied = response.data.data["applied"];
          } else {
            return this.$nuxt.error({ statusCode: 404 });
          }
        });
    },
    get_related_job(job) {
      $("body").scrollTop(1000);
      this.$router.push("/jobs/" + job.slug);
      this.$axios.get("/job/jobs/show/" + job.slug).then((response) => {
        this.job = response.data.data["job_data"];
        this.applied = response.data.data["applied"];
      });
      this.$axios
        .get(process.env.ApiUrl + "job/jobs/related", {
          params: {
            slug: job.slug,
          },
        })
        .then((response) => {
          this.related_jobs = response.data.data;
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
    getJobs(category) {
      if (category) {
        this.form.searchCat = [category];
      }
      this.$router.push(
        "/jobs?title=" +
          this.form.searchStr +
          "category=" +
          this.form.searchCat +
          "&city=" +
          this.form.searchCity
      );
    },
    login_to_continue() {
      this.login_apply_modal = true;
    },
  },
};
</script>
