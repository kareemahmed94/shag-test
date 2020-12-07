<!-- eslint-disable -->
<template>
  <div v-if="!$device.isMobile">
    <div class="container-fluid employer-dashboard">
      <v-row class="mb-8">
        <v-col md="3">
          <div
            class="job-candidates-head"
            style="height: 225px; padding-left: 0; padding-right: 0;"
          >
            <v-row class="ml-auto mr-auto">
              <v-avatar max-width="164" class="ml-auto mr-auto" color="grey" size="164" tile>
                <v-img :src="employer.logo ? storage_url+employer.logo : thumb_logo"></v-img>
              </v-avatar>
            </v-row>
          </div>
        </v-col>
        <v-col md="9">
          <div class="job-candidates-head ml-auto mr-auto" style="height: 225px;">
            <div class="job-details">
              <v-row>
                <v-col md="8" class="job-details-title">
                  الموقع
                  <div class="details-title d-inline">
                    {{ employer.city ? employer.city.name_ar + ' ,' : '' }}
                    {{ employer.area ? employer.area.name_ar : '' }}
                  </div>
                </v-col>
                <v-col md="4" class="job-details-title text-left">
                  <span class="text-left">
                    <v-btn
                      class="btn-dashboard"
                      @click="$router.push('/jobs/'+job.slug)"
                    >عرض صفحة الوظيفة</v-btn>
                  </span>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col md="4" class="job-details-title">
                  تم النشر بتاريخ
                  <span class="details-title d-inline">{{ job.published_at }}</span>
                </v-col>
                <v-col md="4" class="job-details-title">
                  عدد المتقدمين
                  <span
                    class="details-title d-inline"
                  >{{ applications.length === 0 ? 'لا يوجد متقدمين' : applications.length + ' متقدم ' }}</span>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row class="mb-8">
        <v-col md="12" class="chart-container">
          <v-row class="job-details-title">
            <v-col md="12" class="details-title">
              <span class="ml-auto mr-auto">يعرض الرسم البياني التاريخ الاكثر زيارة</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="10" class="chart-job ml-auto mr-auto" v-if="chart_ready">
              <!-- <GChart type="ColumnChart" :data="chartData" :options="chartOptions" /> -->
              <client-only placeholder="Loading...">
                <apexcharts type="bar" height="350" :options="chartOptions" :series="series"></apexcharts>
              </client-only>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="stats-filter mb-8">
        <v-col md="3" class="pa-4" style="border-left: 3px solid rgba(25, 63, 91, 0.1)">
          <v-row>
            <v-col class="job-title" md="12">سن:</v-col>
            <v-col md="12">
              <v-range-slider
                v-model="value"
                persistent-hint
                step="5"
                height="10"
                @change="getData()"
              ></v-range-slider>
              <label style="float: left">{{ value[1] }}</label>
              <label style="float: right">{{ value[0] }}</label>
            </v-col>
          </v-row>
        </v-col>

        <v-col md="3" class="pa-4" style="border-left: 3px solid rgba(25, 63, 91, 0.1)">
          <v-row class="filter">
            <v-col class="job-title" md="12">النوع:</v-col>
            <v-col md="12">
              <v-radio-group v-model="gender" @change="getData(status)" row>
                <v-radio class="d-inline" label="ذكر" value="1"></v-radio>
                <v-radio class="d-inline" label="أنثى" value="2"></v-radio>
              </v-radio-group>

              <!-- <label class="radio-inline">
                <input type="radio" v-model="gender" value="1" @change="getData(status)" />
                ذكر
              </label>
              <label class="radio-inline">
                <input type="radio" v-model="gender" value="2" @change="getData(status)" />
                أنثى
              </label>-->
            </v-col>
          </v-row>
        </v-col>

        <v-col md="3" class="pa-4" style="border-left: 3px solid rgba(25, 63, 91, 0.1)">
          <v-row>
            <v-col class="job-title" md="12">يسكن في:</v-col>
            <v-col md="12">
              <v-select
                :items="areas"
                v-model="area"
                label="يسكن في"
                outlined
                item-value="id"
                item-text="name_ar"
                @change="getData(status)"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>

        <v-col md="3" class="pa-4">
          <v-row>
            <v-col class="job-title" md="12">خبرة:</v-col>
            <v-col md="12">
              <v-select
                :items="experience_lvls"
                v-model="experience_lvl"
                label="خبرة"
                outlined
                item-value="id"
                item-text="name_ar"
                @change="getData(status)"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- <v-row class="stats-bar" v-if="applications">
        <v-col
          md="3"
          class="stats-bar-content"
          :class="{'left-border': application_statuses[index+1] , 'active' : status == application_status.id}"
          v-for="(application_status,index) in application_statuses"
          :key="application_status.id"
          @click="getData(application_status.id)"
          v-if="application_status.id != 3"
        >
          {{ applications.filter( application => { return application.status_id == application_status.id ? application.status_id : null; }).length}}
          {{ application_status.name_ar }}
        </v-col>
      </v-row>-->
      <v-row>
        <v-row class="stats-bar">
          <v-tabs fixed-tabs v-if="applications">
            <v-tab
              class="stats-bar-content job-details-title"
              v-bind:class="{'left-border': application_statuses[index+1] , 'active' : status == application_status.id}"
              v-for="(application_status, index) in application_statuses"
              :key="application_status.id"
              @click="getData(application_status.id)"
            >
              <span :class="`details-title`">
                {{
                applications.filter(application => {
                return application.status_id == application_status.id ? application.status_id : null;
                }).length
                }}
                {{ application_status.name_ar }}
              </span>
            </v-tab>
          </v-tabs>
        </v-row>
        <v-col md="12">
          <v-row
            style="background-color: rgba(25, 63, 91, 0.06); padding: 20px;"
            v-for="(application,index) in applications"
            :key="'a'+index+application.id"
          >
            <v-col md="1" class="d-flex align-items-center justify-content-center">
              <v-progress-circular size="50" :value="90" color="success">90</v-progress-circular>
            </v-col>
            <v-col md="2">
              <v-avatar :size="!$device.isTablet ? '164' : '130'" tile>
                <!-- :src="application.applier.avatar ? storage_url+application.applier.avatar : thumb_avatar" -->
                <v-img
                  :src="application.applier.avatar ? storage_url+application.applier.avatar : thumb_avatar"
                  @click="getJobSeeker(application.applier.job_seeker_id,application)"
                  onerror="javascript:this.src='https://www.yourfirstpatient.com/assets/default-user-avatar-thumbnail@2x-ad6390912469759cda3106088905fa5bfbadc41532fbaa28237209b1aa976fc9.png'"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col md="9" class="text-right pr-8">
              <v-row>
                <v-col md="2" class="job-details-title">
                  <span
                    class="details-title applier-name"
                    @click="getJobSeeker(application.applier.job_seeker_id,application)"
                  >{{ application.applier.first_name_en }} {{ application.applier.last_name_en }}</span>
                </v-col>
                <v-col md="6" class="job-details-title">
                  <span
                    class="details-title d-inline"
                  >{{ application.applier.education_level ? application.applier.education_level.name_ar : 'لا يوجد مؤهل' }}</span>
                </v-col>
                <v-col md="4" class="job-details-title">
                  <v-rating
                    :value="4"
                    background-color="rgb(17, 65, 105)"
                    color="rgb(17, 65, 105)"
                    medium
                  ></v-rating>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col class="text-center" md="2" style="border-left: 3px solid #ccc">
                  <span
                    class="job-seeker-data"
                    v-if="application.applier.birth_date"
                  >{{ new Date().getFullYear() - parseInt(application.applier.birth_date.split('-')) }} سنة</span>
                </v-col>
                <v-col class="text-center" md="3" style="border-left: 3px solid #ccc">
                  <span
                    class="job-seeker-data"
                  >{{ application.applier.area ? application.applier.area.name_ar : 'لا يوجد منطقة' }}</span>
                </v-col>
                <v-col md="3" style="border-left: 3px solid #ccc">
                  <img
                    v-if="application.applier.require_bike_licence == 1"
                    src="~/assets/img/icons/Bike.svg"
                    width="20"
                  />
                  <!--  -->
                  <img
                    v-if="application.applier.require_car_licence == 1"
                    src="~/assets/img/icons/cer..svg"
                    width="20"
                  />
                  <!--  -->
                  <img
                    v-if="application.applier.gender_id == 1"
                    src="~/assets/img/icons/male.svg"
                    width="20"
                    style="width: 15px"
                  />
                  <!--  -->
                  <img
                    v-else-if="application.applier.gender_id == 2"
                    src="~/assets/img/icons/fmm.svg"
                    width="20"
                    style="width: 15px"
                  />
                  <!--  -->
                  <img v-else src="~/assets/img/icons/fmm.svg" width="20" style="width: 15px" />
                </v-col>
                <v-col class="job-seeker-data pr-8 pl-8" md="4">
                  <div class="form-group row">
                    <v-text-field
                      v-on:keyup.enter="update(application.id,'',$event)"
                      :value="application.employer_comments"
                      label="اترك تعليقا"
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-divider></v-divider>
            <v-col md="12">
              <v-row style="border: 1px solid #ccc">
                <v-col
                  md="3"
                  class="job-seeker-footer-content text-center"
                  @click="getJobSeeker(application.applier.job_seeker_id,application)"
                  style="border: 1px solid #ccc"
                >
                  <img src="~/assets/img/icons/lock.svg" width="20" />
                  الغاء القفل
                </v-col>

                <v-col
                  md="3"
                  class="job-seeker-footer-content text-center"
                  @click="update(application.id,3)"
                  style="border: 1px solid #ccc"
                >
                  <img src="~/assets/img/icons/short-list.svg" width="20" />
                  القائمة المختصرة
                </v-col>

                <v-col
                  md="3"
                  class="job-seeker-footer-content text-center"
                  @click="update(application.id,4)"
                  style="border: 1px solid #ccc"
                >
                  <img src="~/assets/img/icons/accept.svg" width="20" />
                  قبول
                </v-col>
                <v-col
                  md="3"
                  class="job-seeker-footer-content text-center"
                  @click="update(application.id,5)"
                  style="border: 1px solid #ccc"
                >
                  <img src="~/assets/img/icons/decline.svg" width="20" />
                  رفض
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <!-- <div
        class="stats-job-seekers"
        v-for="(application,index) in applications"
        :key="'a'+index+application.id"
      >


        <div class="row job-seeker-footer">
          <div class="col-lg-3 left-border">
            <div
              class="job-seeker-footer-content"
              @click="getJobSeeker(application.applier.job_seeker_id,application)"
            >
              <img src="~/assets/img/icons/lock.svg" width="20" />
              الغاء القفل
            </div>
          </div>
          <div class="col-lg-3 left-border">
            <div class="job-seeker-footer-content" @click="update(application.id,3)">
              <img src="~/assets/img/icons/short-list.svg" width="20" />
              القائمة المختصرة
            </div>
          </div>
          <div class="col-lg-3 left-border">
            <div class="job-seeker-footer-content" @click="update(application.id,4)">
              <img src="~/assets/img/icons/accept.svg" width="20" />
              قبول
            </div>
          </div>
          <div class="col-lg-3">
            <div class="job-seeker-footer-content" @click="update(application.id,5)">
              <img src="~/assets/img/icons/decline.svg" width="20" />
              رفض
            </div>
          </div>
        </div>
        <hr />
    </div>-->

    <v-row justify="center">
      <v-dialog v-model="js_dialog" max-width="80%" :rtl="true" class="pa-10">
        <v-card v-if="job_seeker">
          <div class="jobs-result" v-if="!$device.isMobileOrTablet">
            <v-row class="job-seeker-footer mb-10">
              <v-col md="3" class="left-border">
                <div
                  class="job-seeker-footer-content"
                  @click="getJobSeeker(application.applier.job_seeker_id,application)"
                  v-if="!lock_status && can_unlock"
                >
                  <img src="~/assets/img/icons/lock.svg" width="20" />
                  الغاء القفل
                </div>
                <div class="job-seeker-footer-content" v-if="lock_status">
                  <img src="~/assets/img/icons/lock.svg" width="20" />
                  الحساب مفتوح
                </div>
                <div class="job-seeker-footer-content" v-if="!can_unlock && !lock_status">
                  <v-tooltip v-if="!lock_status" left>
                    <template v-slot:activator="{ on, attrs }">
                      <span class="details-title d-inline" v-if="!lock_status">
                        <v-btn
                          @click="unlock_job_seeker()"
                          small
                          color="orange lighten-3"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                          <span>الغاء القفل</span>
                        </v-btn>
                      </span>
                    </template>
                    <span>قم بترقية حسابك لشغلني بريميوم</span>
                  </v-tooltip>
                </div>
              </v-col>

              <v-col md="3" class="left-border">
                <div class="job-seeker-footer-content" @click="update(application.id,3)">
                  <img src="~/assets/img/icons/short-list.svg" width="20" />
                  القائمة المختصرة
                </div>
              </v-col>

              <v-col md="3" class="left-border">
                <div class="job-seeker-footer-content" @click="update(application.id,4)">
                  <img src="~/assets/img/icons/accept.svg" width="20" />
                  قبول
                </div>
              </v-col>

              <v-col md="3">
                <div class="job-seeker-footer-content" @click="update(application.id,5)">
                  <img src="~/assets/img/icons/decline.svg" width="20" />
                  رفض
                </div>
              </v-col>
            </v-row>

            <v-row v-if="job_seeker">
              <!-- JobSeeker Card -->
              <div>
                <div class="job-holder">
                  <!-- Above The Divider -->
                  <v-row>
                    <!-- Photo -->
                    <v-col md="2">
                      <div
                        class="logo-mask"
                        :style="`${$device.isMobile ? 'width: 100%; margin-top: 0;' : ''}`"
                      >
                        <img :src="job_seeker.avatar ? storage_url+job_seeker.avatar : thumb_logo" />
                      </div>
                    </v-col>

                    <!-- Info -->
                    <v-col md="8" class="pr-10">
                      <!-- Info Row 1 -->
                      <v-row>
                        <v-col md="6" class="job-title">
                          <span>
                            {{ job_seeker.first_name_en }} {{ job_seeker.last_name_en }}
                            -
                            <span
                              class="job-company-title"
                            >لا يوجد وظيفة</span>
                          </span>
                        </v-col>
                      </v-row>

                      <!-- Info Row 2 -->
                      <v-row>
                        <v-col md="6" class="job-details-title">
                          الجنسية:
                          <span
                            class="details-title d-inline"
                          >{{ job_seeker.nationality ? job_seeker.nationality.name_ar : 'لا يوجد' }}</span>
                        </v-col>

                        <v-col md="6" class="job-details-title">
                          محل الإقامة:
                          <span
                            class="details-title d-inline"
                          >{{ job_seeker.country ? job_seeker.country.name_ar : 'لا يوجد' }}</span>

                          <span
                            class="details-title d-inline"
                            v-if="job_seeker.country !== undefined"
                          >{{ job_seeker.city ? '- ' + job_seeker.city.name_ar : '' }}</span>
                        </v-col>
                      </v-row>
                    </v-col>

                    <!-- Hire Button -->
                    <v-col md="2">
                      <!-- <v-row v-if="!job_seeker.CV">
                        <v-col md="12">
                          <nuxt-link to="job_seeker.CV" target="_blank">
                            <v-btn small class="shift-type" rounded outlined>السيرة الذاتية</v-btn>
                          </nuxt-link>
                        </v-col>
                      </v-row>-->
                      <v-row v-if="!lock_status && can_unlock">
                        <v-col md="12">
                          <v-btn
                            color="success"
                            small
                            class="job-submit"
                            @click="unlock_job_seeker"
                          >
                            <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                            <span>إلغاء القفل</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row v-if="lock_status">
                        <v-col md="12">
                          <v-btn
                            color="success"
                            small
                            class="job-submit text-center"
                            @click="unlock_job_seeker"
                          >
                            <span>الحساب مفتوح</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row v-if="!can_unlock && !lock_status">
                        <v-col md="12">
                          <v-tooltip v-if="!lock_status" left>
                            <template v-slot:activator="{ on, attrs }">
                              <span class="details-title d-inline" v-if="!lock_status">
                                <v-btn
                                  @click="unlock_job_seeker()"
                                  small
                                  color="orange lighten-3"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                                  <span>الغاء القفل</span>
                                </v-btn>
                              </span>
                            </template>
                            <span>قم بترقية حسابك لشغلني بريميوم</span>
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-row style="margin-top: -2%; margin-bottom: -1%;">
                    <!-- <v-col md="6" class="job-details-title" style="margin-top: 1%;">
                      رقم الهاتف:
                      <span
                        v-if="lock_status"
                        class="details-title d-inline"
                      >{{ job_seeker.user ? job_seeker.user.phone_number : 'لا يوجد' }}</span>

                      <v-tooltip v-if="can_unlock && !lock_status" left>
                        <template v-slot:activator="{ on, attrs }">
                          <span class="details-title d-inline" v-if="!lock_status">
                            <v-btn
                              @click="unlock_job_seeker()"
                              small
                              color="orange lighten-3"
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                              <span>الغاء القفل</span>
                            </v-btn>
                          </span>
                        </template>
                        <span>قم بترقية حسابك لشغلني بريميوم</span>
                      </v-tooltip>
                    </v-col>-->
                    <v-spacer></v-spacer>
                    <v-col md="3" class="job-details-title">
                      <v-row>
                        <v-col md="8" class="job-details-title">
                          خبرة:
                          <span
                            class="details-title d-inline"
                          >{{ job_seeker.experience_level ? job_seeker.experience_level.name_ar : 'لا يوجد' }}</span>
                        </v-col>
                        <v-col md="4" class="text-center" style="border-right: 3px solid #ccc">
                          <img
                            v-if="job_seeker.gender_id === 1"
                            src="~/assets/img/icons/male.svg"
                            width="10"
                          />
                          <img
                            v-if="job_seeker.gender_id === 2"
                            src="~/assets/img/icons/fmm.svg"
                            width="10"
                          />
                          <img v-else src="~/assets/img/icons/fmm.svg" width="10" />
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>

                <div class="job-title-details">معلومات شخصية</div>
                <v-row class="row" style="margin-top: -2%;">
                  <v-col class="col-md-4 col-sm-6">
                    <div class="job-requirements">
                      <div class="job-title">السن</div>
                      <div class="job-title-desc">{{ job_seeker.age }} سنة</div>
                    </div>
                  </v-col>
                  <div class="col-md-4 col-sm-6">
                    <div class="job-requirements">
                      <div class="job-title">المؤهل المطلوب</div>
                      <div
                        class="job-title-desc"
                      >{{ job_seeker.education_level ? job_seeker.education_level.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="job-requirements">
                      <div class="job-title">رخصة القيادة</div>
                      <div
                        class="job-title-desc"
                      >{{ job_seeker.driving_license ? job_seeker.driving_license.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="job-requirements">
                      <div class="job-title">محل الإقامة</div>
                      <div class="job-title-desc">
                        {{ job_seeker.country ? job_seeker.country.name_ar : 'لا يوجد' }}
                        {{ job_seeker.country && job_seeker.city ? ' , ' + job_seeker.city.name_ar : '' }} {{
                        job_seeker.country && job_seeker.city && job_seeker.area ? ' , ' + job_seeker.area.name_ar : ''
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="job-requirements">
                      <div class="job-title">الحالة التجنيدية المطلوبة</div>
                      <div
                        class="job-title-desc"
                      >{{ job_seeker.military_status ? job_seeker.military_status.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </div>
                </v-row>

                <div class="job-title-details">خبرات العمل السابقة</div>

                <div v-if="job_seeker.previous_experience">
                  <div class="job-requirements" v-if="job_seeker.previous_experience.length > 0">
                    <div
                      class="job-title-desc"
                      v-for="(previous_experience, index) in job_seeker.previous_experience"
                      :key="index"
                    >
                      <ul>
                        <li
                          v-if="previous_experience.jobRole"
                        >الوظيفة : {{ previous_experience.jobRole || "لا يوجد" }}</li>
                        <li
                          v-if="previous_experience.companyName"
                        >الشركة : {{ previous_experience.companyName || "لا يوجد" }}</li>
                        <li
                          v-if="previous_experience.from"
                        >من : {{ previous_experience.from || "لا يوجد" }}</li>
                        <li
                          v-if="previous_experience.to"
                        >إلى : {{ previous_experience.to || "لا يوجد" }}</li>
                      </ul>
                      <v-divider></v-divider>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="job-requirements">
                    <div class="job-title-desc">
                      <ul>
                        <li>لا يوجد</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="job-title-details">ملاحظات على هذه الوظيفة</div>
                <v-row class="mb-8" style="background-color: #f1f3f5">
                  <v-col md="12" style="padding: 35px;">
                    <v-textarea
                      v-on:keyup.enter="update(application.id,'',$event)"
                      outlined
                      counter
                      no-resize
                      label="اترك تعليقا"
                      :value="application.employer_comments"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </div>
            </v-row>
          </div>

          <div class="jobs-result" v-if="$device.isMobileOrTablet">
            <v-row v-if="job_seeker">
              <!-- JobSeeker Card -->
              <v-col cols="11" class="ml-auto mr-auto">
                <!-- Shaghalni Logo -->
                <div style="position: absolute; top: 0; left: 12px">
                  <img :src="storage_url+'Hq1EfAk8OBWqtbxDgtivRPPJpNStw5NGAmSzmTNP.png'" width="140" />
                </div>

                <div class="job-holder">
                  <!-- Above The Divider -->
                  <!-- Photo -->
                  <v-row>
                    <v-col cols="12">
                      <div class="logo-mask ml-auto mr-auto">
                        <img :src="job_seeker.avatar ? storage_url+job_seeker.avatar : thumb_logo" />
                      </div>
                    </v-col>
                  </v-row>

                  <!-- Info -->
                  <v-row>
                    <v-col cols="12">
                      <!-- Info Row 1 -->
                      <v-row>
                        <v-col md="6" class="job-title">
                          <span>{{ job_seeker.first_name_en }} {{ job_seeker.last_name_en }}</span>
                        </v-col>
                        <v-col md="6" class="job-company-title">
                          <span>لا يوجد وظيفة</span>
                        </v-col>
                      </v-row>

                      <!-- Info Row 2 -->
                      <v-row>
                        <v-col md="6" class="job-details-title">
                          الجنسية:
                          <span
                            class="details-title d-inline"
                          >{{ job_seeker.nationality ? job_seeker.nationality.name_ar : 'لا يوجد' }}</span>
                        </v-col>

                        <v-col md="6" class="job-details-title">
                          محل الإقامة:
                          <span
                            class="details-title d-inline"
                          >{{ job_seeker.country ? job_seeker.country.name_ar : 'لا يوجد' }}</span>

                          <span
                            class="details-title d-inline"
                            v-if="job_seeker.country !== undefined"
                          >{{ job_seeker.city ? '- ' + job_seeker.city.name_ar : '' }}</span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <!-- Hire Button -->
                  <v-row>
                    <v-col cols="12">
                      <!-- <v-row v-if="!job_seeker.CV">
                        <v-col md="12">
                          <nuxt-link to="job_seeker.CV" target="_blank">
                            <v-btn small class="shift-type" rounded outlined>السيرة الذاتية</v-btn>
                          </nuxt-link>
                        </v-col>
                      </v-row>-->
                      <v-row v-if="!lock_status && can_unlock">
                        <v-col md="12">
                          <v-btn
                            color="success"
                            small
                            class="job-submit"
                            @click="unlock_job_seeker"
                          >
                            <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                            <span>إلغاء القفل</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row v-if="lock_status">
                        <v-col md="12">
                          <v-btn
                            color="success"
                            small
                            class="job-submit"
                            @click="unlock_job_seeker"
                          >
                            <v-icon left>{{ icons.mdiEy }}</v-icon>
                            <span>الحساب مفتوح</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row v-if="!can_unlock && !lock_status">
                        <v-col md="12">
                          <v-tooltip v-if="!lock_status" left>
                            <template v-slot:activator="{ on, attrs }">
                              <span class="details-title d-inline" v-if="!lock_status">
                                <v-btn
                                  @click="unlock_job_seeker()"
                                  small
                                  color="orange lighten-3"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                                  <span>الغاء القفل</span>
                                </v-btn>
                              </span>
                            </template>
                            <span>قم بترقية حسابك لشغلني بريميوم</span>
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-row style="margin-top: -2%; margin-bottom: -1%;">
                    <v-col cols="6" class="job-details-title">
                      <v-row>
                        <v-col cols="12">
                          رقم الهاتف:
                          <span
                            v-if="lock_status"
                            class="details-title"
                          >{{ job_seeker.user ? job_seeker.user.phone_number : 'لا يوجد' }}</span>

                          <!-- v-if="can_unlock && !lock_status" -->
                          <v-tooltip v-if="can_unlock && !lock_status" left>
                            <template v-slot:activator="{ on, attrs }">
                              <span class="details-title" v-if="!lock_status">
                                <v-btn
                                  @click="unlock_job_seeker()"
                                  small
                                  color="orange lighten-3"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                                  <span>الغاء القفل</span>
                                </v-btn>
                              </span>
                            </template>
                            <span>قم بترقية حسابك لشغلني بريميوم</span>
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6" class="job-details-title">
                      <v-row>
                        <v-col cols="9" class="job-details-title">
                          خبرة:
                          <span
                            class="details-title"
                          >{{ job_seeker.experience_level ? job_seeker.experience_level.name_ar : 'لا يوجد' }}</span>
                        </v-col>
                        <v-col cols="3" class="text-center" style="border-right: 3px solid #ccc">
                          <img
                            v-if="job_seeker.gender_id === 1"
                            src="~/assets/img/icons/male.svg"
                            width="10"
                          />
                          <img
                            v-if="job_seeker.gender_id === 2"
                            src="~/assets/img/icons/fmm.svg"
                            width="10"
                          />
                          <img v-else src="~/assets/img/icons/fmm.svg" width="10" />
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>

                <div class="job-title-details">معلومات شsdخصية</div>
                <div class="row" style="margin-top: -2%;">
                  <v-col cols="12">
                    <div class="job-requirements">
                      <div class="job-title">السن:</div>
                      <div class="job-title-desc">{{ job_seeker.age }} سنة</div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="job-requirements">
                      <div class="job-title">المؤهل المطلوب</div>
                      <div
                        class="job-title-desc"
                      >{{ job_seeker.education_level ? job_seeker.education_level.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="job-requirements">
                      <div class="job-title">رخصة القيادة</div>
                      <div
                        class="job-title-desc"
                      >{{ job_seeker.driving_license ? job_seeker.driving_license.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="job-requirements">
                      <div class="job-title">محل الإقامة</div>
                      <div class="job-title-desc">
                        {{ job_seeker.country ? job_seeker.country.name_ar : 'لا يوجد' }}
                        {{ job_seeker.country && job_seeker.city ? ' , ' + job_seeker.city.name_ar : '' }} {{
                        job_seeker.country && job_seeker.city && job_seeker.area ? ' , ' + job_seeker.area.name_ar : ''
                        }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="job-requirements">
                      <div class="job-title">الحالة التجنيدية المطلوبة</div>
                      <div
                        class="job-title-desc"
                      >{{ job_seeker.military_status ? job_seeker.military_status.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </v-col>
                </div>

                <div class="job-title-details">خبرات العمل السابقة</div>
                <div v-if="job_seeker.previous_experience">
                  <div class="job-requirements" v-if="job_seeker.previous_experience.length > 0">
                    <div
                      class="job-title-desc"
                      v-for="(previous_experience, index) in job_seeker.previous_experience"
                      :key="index"
                    >
                      <ul>
                        <li
                          v-if="previous_experience.jobRole"
                        >الوظيفة : {{ previous_experience.jobRole || "لا يوجد" }}</li>
                        <li
                          v-if="previous_experience.companyName"
                        >الشركة : {{ previous_experience.companyName || "لا يوجد" }}</li>
                        <li
                          v-if="previous_experience.from"
                        >من : {{ previous_experience.from || "لا يوجد" }}</li>
                        <li
                          v-if="previous_experience.to"
                        >إلى : {{ previous_experience.to || "لا يوجد" }}</li>
                      </ul>
                      <v-divider></v-divider>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="job-requirements">
                    <div class="job-title-desc">
                      <ul>
                        <li>لا يوجد</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <v-dialog v-model="unlock_dialog" width="500">
      <v-card>
        <div class="logo-holder-modal">
          <img src="~/assets/logo-blue.png" width="200" />
        </div>
        <v-card-title class="message-title">تم بنجاح</v-card-title>
        <v-card-text class="message-body">{{ unlock_message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#0e4168" width="50%" dark rounded block @click="unlock_dialog = false">حسنا</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="message" :color="error_type">{{ error_message }}</v-snackbar>
  </div>

  <div v-else>
    <div class="container-fluid employer-dashboard">
      <v-row class="mb-8">
        <v-col cols="12">
          <div class="job-candidates-head" style="height: 225px;">
            <v-row class="ml-auto mr-auto">
              <v-avatar class="ml-auto mr-auto" color="grey" size="164" tile>
                <v-img :src="employer.logo ? storage_url+employer.logo : thumb_logo"></v-img>
              </v-avatar>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="job-candidates-head ml-auto mr-auto" style="height: 300px;">
            <div class="job-details">
              <v-row>
                <v-col cols="12" class="job-details-title">
                  الموقع
                  <div class="details-title d-inline">
                    {{ employer.city ? employer.city.name_ar + ' ,' : '' }}
                    {{ employer.area ? employer.area.name_ar : '' }}
                  </div>
                </v-col>
                <v-col cols="12" class="job-details-title text-left">
                  <span class="text-left">
                    <v-btn
                      class="btn-dashboard"
                      @click="$router.push('/jobs/'+job.slug)"
                    >عرض صفحة الوظيفة</v-btn>
                  </span>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" class="job-details-title">
                  تم النشر بتاريخ
                  <span class="details-title d-inline">{{ job.published_at }}</span>
                </v-col>
                <v-col cols="12" class="job-details-title">
                  عدد المتقدمين
                  <span
                    class="details-title d-inline"
                  >{{ applications.length === 0 ? 'لا يوجد متقدمين' : applications.length + ' متقدم ' }}</span>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row class="mb-8">
        <v-col cols="12" class="chart-container">
          <v-row class="job-details-title">
            <v-col cols="12" class="details-title">
              <span class="ml-auto mr-auto">يعرض الرسم البياني التاريخ الاكثر زيارة</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="chart-job ml-auto mr-auto" v-if="chart_ready">
              <!-- <GChart type="ColumnChart" :data="chartData" :options="chartOptions" /> -->
              <client-only placeholder="Loading...">
                <apexcharts type="bar" height="350" :options="chartOptions" :series="series"></apexcharts>
              </client-only>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="stats-filter mb-8">
        <v-col
          cols="12"
          class="pa-4"
          :style="`border-${ $device.isMobileOrTablet ? 'bottom' : 'left'}: 3px solid rgba(25, 63, 91, 0.1)`"
        >
          <v-row>
            <v-col class="job-title" cols="12">سن:</v-col>
            <v-col cols="12">
              <v-range-slider
                v-model="value"
                persistent-hint
                step="5"
                height="10"
                @change="getData()"
              ></v-range-slider>
              <label style="float: left">{{ value[1] }}</label>
              <label style="float: right">{{ value[0] }}</label>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          class="pa-4"
          :style="`border-${ $device.isMobileOrTablet ? 'bottom' : 'left'}: 3px solid rgba(25, 63, 91, 0.1)`"
        >
          <v-row class="filter">
            <v-col class="job-title" cols="12">النوع:</v-col>
            <v-col cols="12">
              <v-radio-group v-model="gender" @change="getData(status)" row>
                <v-radio class="d-inline" label="ذكر" value="1"></v-radio>
                <v-radio class="d-inline" label="أنثى" value="2"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          class="pa-4"
          :style="`border-${ $device.isMobileOrTablet ? 'bottom' : 'left'}: 3px solid rgba(25, 63, 91, 0.1)`"
        >
          <v-row>
            <v-col class="job-title" cols="12">يسكن في:</v-col>
            <v-col cols="12">
              <v-select
                :items="areas"
                v-model="area"
                label="يسكن في"
                outlined
                item-value="id"
                item-text="name_ar"
                @change="getData(status)"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="pa-4">
          <v-row>
            <v-col class="job-title" cols="12">خبرة:</v-col>
            <v-col cols="12">
              <v-select
                :items="experience_lvls"
                v-model="experience_lvl"
                label="خبرة"
                outlined
                item-value="id"
                item-text="name_ar"
                @change="getData(status)"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-tabs fixed-tabs v-if="applications">
          <v-tab
            class="stats-bar-content job-details-title"
            v-bind:class="{'left-border': application_statuses[index+1] , 'active' : status == application_status.id}"
            v-for="(application_status, index) in application_statuses"
            :key="application_status.id"
            @click="getData(application_status.id)"
          >
            <span :class="`details-title`">
              {{
              applications.filter(application => {
              return application.status_id == application_status.id ? application.status_id : null;
              }).length
              }}
              {{ application_status.name_ar }}
            </span>
          </v-tab>
        </v-tabs>
        <v-col cols="12">
          <v-row
            style="background-color: rgba(25, 63, 91, 0.06); padding: 20px;"
            v-for="(application,index) in applications"
            :key="'a'+index+application.id"
          >
            <v-col cols="2" class="d-flex align-items-center justify-content-center">
              <v-progress-circular size="50" :value="90" color="success">90</v-progress-circular>
            </v-col>
            <v-col cols="10">
              <v-avatar size="164" tile>
                <!-- :src="application.applier.avatar ? storage_url+application.applier.avatar : thumb_avatar" -->
                <v-img
                  :src="'https://picsum.photos/200/300'"
                  @click="getJobSeeker(application.applier.job_seeker_id,application)"
                  onerror="javascript:this.src='https://picsum.photos/200/300'"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="12" class="text-right pr-8">
              <v-row>
                <v-col cols="12" class="job-details-title">
                  <span
                    class="details-title applier-name"
                    @click="getJobSeeker(application.applier.job_seeker_id,application)"
                  >{{ application.applier.first_name_en }} {{ application.applier.last_name_en }}</span>
                </v-col>
                <v-col cols="12" class="job-details-title">
                  <span
                    class="details-title d-inline"
                  >{{ application.applier.education_level ? application.applier.education_level.name_ar : 'لا يوجد مؤهل' }}</span>
                </v-col>
                <v-col cols="12" class="job-details-title">
                  <v-rating
                    :value="4"
                    background-color="rgb(17, 65, 105)"
                    color="rgb(17, 65, 105)"
                    medium
                  ></v-rating>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col class="text-center" cols="12" style="border-bottom: 3px solid #ccc">
                  <span
                    class="job-seeker-data"
                    v-if="application.applier.birth_date"
                  >{{ new Date().getFullYear() - parseInt(application.applier.birth_date.split('-')) }} سنة</span>
                </v-col>
                <v-col class="text-center" cols="12" style="border-bottom: 3px solid #ccc">
                  <span
                    class="job-seeker-data"
                  >{{ application.applier.area ? application.applier.area.name_ar : 'لا يوجد منطقة' }}</span>
                </v-col>
                <v-col class="text-center" md="3" style="border-bottom: 3px solid #ccc">
                  <img
                    v-if="application.applier.require_bike_licence == 1"
                    src="~/assets/img/icons/Bike.svg"
                    width="20"
                  />
                  <!--  -->
                  <img
                    v-if="application.applier.require_car_licence == 1"
                    src="~/assets/img/icons/cer..svg"
                    width="20"
                  />
                  <!--  -->
                  <img
                    v-if="application.applier.gender_id == 1"
                    src="~/assets/img/icons/male.svg"
                    width="20"
                    style="width: 15px"
                  />
                  <!--  -->
                  <img
                    v-else-if="application.applier.gender_id == 2"
                    src="~/assets/img/icons/fmm.svg"
                    width="20"
                    style="width: 15px"
                  />
                  <!--  -->
                  <img v-else src="~/assets/img/icons/fmm.svg" width="20" style="width: 15px" />
                </v-col>
                <v-col class="job-seeker-data pr-8 pl-8" cols="12">
                  <div class="form-group row">
                    <v-text-field
                      v-on:keyup.enter="update(application.id,'',$event)"
                      :value="application.employer_comments"
                      label="اترك تعليقا"
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12">
              <v-row style="border: 1px solid #ccc">
                <v-col
                  cols="12"
                  class="job-seeker-footer-content text-center"
                  @click="getJobSeeker(application.applier.job_seeker_id,application)"
                  style="border: 1px solid #ccc"
                >
                  <img src="~/assets/img/icons/lock.svg" width="20" />
                  الغاء القفل
                </v-col>

                <v-col
                  cols="12"
                  class="job-seeker-footer-content text-center"
                  @click="update(application.id,3)"
                  style="border: 1px solid #ccc"
                >
                  <img src="~/assets/img/icons/short-list.svg" width="20" />
                  القائمة المختصرة
                </v-col>

                <v-col
                  cols="12"
                  class="job-seeker-footer-content text-center"
                  @click="update(application.id,4)"
                  style="border: 1px solid #ccc"
                >
                  <img src="~/assets/img/icons/accept.svg" width="20" />
                  قبول
                </v-col>
                <v-col
                  cols="12"
                  class="job-seeker-footer-content text-center"
                  @click="update(application.id,5)"
                  style="border: 1px solid #ccc"
                >
                  <img src="~/assets/img/icons/decline.svg" width="20" />
                  رفض
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <v-row justify="center">
      <v-dialog v-model="js_dialog" max-width="80%" :rtl="true">
        <v-card v-if="job_seeker">
          <div class="jobs-result" v-if="!$device.isMobileOrTablet">
            <div class="row" v-if="job_seeker">
              <!-- JobSeeker Card -->
              <div>
                <div class="job-holder">
                  <!-- Above The Divider -->
                  <v-row>
                    <!-- Photo -->
                    <v-col md="2">
                      <div class="logo-mask">
                        <img :src="job_seeker.avatar ? storage_url+job_seeker.avatar : thumb_logo" />
                      </div>
                    </v-col>

                    <!-- Info -->
                    <v-col md="8" class="pr-10">
                      <!-- Info Row 1 -->
                      <v-row>
                        <v-col md="6" class="job-title">
                          <span>{{ job_seeker.first_name_en }} {{ job_seeker.last_name_en }}</span>
                        </v-col>
                        <v-col md="6" class="job-company-title">
                          <span>لا يوجد وظيفة</span>
                        </v-col>
                      </v-row>

                      <!-- Info Row 2 -->
                      <v-row>
                        <v-col md="6" class="job-details-title">
                          الجنسية:
                          <span
                            class="details-title d-inline"
                          >{{ job_seeker.nationality ? job_seeker.nationality.name_ar : 'لا يوجد' }}</span>
                        </v-col>

                        <v-col md="6" class="job-details-title">
                          محل الإقامة:
                          <span
                            class="details-title d-inline"
                          >{{ job_seeker.country ? job_seeker.country.name_ar : 'لا يوجد' }}</span>

                          <span
                            class="details-title d-inline"
                            v-if="job_seeker.country !== undefined"
                          >{{ job_seeker.city ? '- ' + job_seeker.city.name_ar : '' }}</span>
                        </v-col>
                      </v-row>
                    </v-col>

                    <!-- Hire Button -->
                    <v-col md="2">
                      <!-- <v-row v-if="!job_seeker.CV">
                        <v-col md="12">
                          <nuxt-link to="job_seeker.CV" target="_blank">
                            <v-btn small class="shift-type" rounded outlined>السيرة الذاتية</v-btn>
                          </nuxt-link>
                        </v-col>
                      </v-row>-->
                      <v-row v-if="!lock_status && can_unlock">
                        <v-col md="12">
                          <v-btn
                            color="success"
                            small
                            class="job-submit"
                            @click="unlock_job_seeker"
                          >
                            <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                            <span>إلغاء القفل</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row v-if="lock_status">
                        <v-col md="12">
                          <v-btn
                            color="success"
                            small
                            class="job-submit"
                            @click="unlock_job_seeker"
                          >
                            <span>الحساب مفتوح</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row v-if="!can_unlock && !lock_status">
                        <v-col md="12">
                          <v-tooltip v-if="!lock_status" left>
                            <template v-slot:activator="{ on, attrs }">
                              <span class="details-title d-inline" v-if="!lock_status">
                                <v-btn
                                  @click="unlock_job_seeker()"
                                  small
                                  color="orange lighten-3"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                                  <span>الغاء القفل</span>
                                </v-btn>
                              </span>
                            </template>
                            <span>قم بترقية حسابك لشغلني بريميوم</span>
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-row style="margin-top: -2%; margin-bottom: -1%;">
                    <v-col md="6" class="job-details-title" style="margin-top: 1%;">
                      رقم الهاتف:
                      <span
                        v-if="lock_status"
                        class="details-title d-inline"
                      >{{ job_seeker.user ? job_seeker.user.phone_number : 'لا يوجد' }}</span>

                      <!-- v-if="can_unlock && !lock_status" -->
                      <v-tooltip v-if="!lock_status" left>
                        <template v-slot:activator="{ on, attrs }">
                          <span class="details-title d-inline" v-if="!lock_status">
                            <v-btn
                              @click="unlock_job_seeker()"
                              small
                              color="orange lighten-3"
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                              <span>الغاء القفل</span>
                            </v-btn>
                          </span>
                        </template>
                        <span>قم بترقية حسابك لشغلني بريميوم</span>
                      </v-tooltip>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col md="3" class="job-details-title">
                      <v-row>
                        <v-col md="8" class="job-details-title">
                          خبرة:
                          <span
                            class="details-title d-inline"
                          >{{ job_seeker.experience_level ? job_seeker.experience_level.name_ar : 'لا يوجد' }}</span>
                        </v-col>
                        <v-col md="4" class="text-center" style="border-right: 3px solid #ccc">
                          <img
                            v-if="job_seeker.gender_id === 1"
                            src="~/assets/img/icons/male.svg"
                            width="10"
                          />
                          <img
                            v-if="job_seeker.gender_id === 2"
                            src="~/assets/img/icons/fmm.svg"
                            width="10"
                          />
                          <img v-else src="~/assets/img/icons/fmm.svg" width="10" />
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>
                <div class="job-title-details">معلومات شخصية</div>
                <div class="row" style="margin-top: -2%;">
                  <div class="col-md-4 col-sm-6">
                    <div class="job-requirements">
                      <div class="job-title">السن</div>
                      <div class="job-title-desc">{{ job_seeker.age }} سنة</div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="job-requirements">
                      <div class="job-title">المؤهل المطلوب</div>
                      <div
                        class="job-title-desc"
                      >{{ job_seeker.education_level ? job_seeker.education_level.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="job-requirements">
                      <div class="job-title">رخصة القيادة</div>
                      <div
                        class="job-title-desc"
                      >{{ job_seeker.driving_license ? job_seeker.driving_license.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="job-requirements">
                      <div class="job-title">محل الإقامة</div>
                      <div class="job-title-desc">
                        {{ job_seeker.country ? job_seeker.country.name_ar : 'لا يوجد' }}
                        {{ job_seeker.country && job_seeker.city ? ' , ' + job_seeker.city.name_ar : '' }} {{
                        job_seeker.country && job_seeker.city && job_seeker.area ? ' , ' + job_seeker.area.name_ar : ''
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <div class="job-requirements">
                      <div class="job-title">الحالة التجنيدية المطلوبة</div>
                      <div
                        class="job-title-desc"
                      >{{ job_seeker.military_status ? job_seeker.military_status.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </div>
                </div>

                <div class="job-title-details">خبرات العمل السابقة</div>
                <div v-if="job_seeker.previous_experience">
                  <div class="job-requirements" v-if="job_seeker.previous_experience.length > 0">
                    <div
                      class="job-title-desc"
                      v-for="(previous_experience, index) in job_seeker.previous_experience"
                      :key="index"
                    >
                      <ul>
                        <li
                          v-if="previous_experience.jobRole"
                        >الوظيفة : {{ previous_experience.jobRole || "لا يوجد" }}</li>
                        <li
                          v-if="previous_experience.companyName"
                        >الشركة : {{ previous_experience.companyName || "لا يوجد" }}</li>
                        <li
                          v-if="previous_experience.from"
                        >من : {{ previous_experience.from || "لا يوجد" }}</li>
                        <li
                          v-if="previous_experience.to"
                        >إلى : {{ previous_experience.to || "لا يوجد" }}</li>
                      </ul>
                      <v-divider></v-divider>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="job-requirements">
                    <div class="job-title-desc">
                      <ul>
                        <li>لا يوجد</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="jobs-result" v-if="$device.isMobileOrTablet">
            <v-row v-if="job_seeker">
              <v-row class="job-seeker-footer ml-auto mr-auto mb-8" style="border: 0px">
                <v-col cols="9" class="ml-auto mr-auto" style="border: 1px solid #ccc">
                  <div
                    class="job-seeker-footer-content"
                    @click="getJobSeeker(application.applier.job_seeker_id,application)"
                    v-if="!lock_status && can_unlock"
                  >
                    <img src="~/assets/img/icons/lock.svg" width="20" />
                    الغاء القفل
                  </div>
                  <div class="job-seeker-footer-content" v-if="lock_status">
                    <img src="~/assets/img/icons/lock.svg" width="20" />
                    الحساب مفتوح
                  </div>
                  <div class="job-seeker-footer-content" v-if="!can_unlock && !lock_status">
                    <v-tooltip v-if="!lock_status" left>
                      <template v-slot:activator="{ on, attrs }">
                        <span class="details-title d-inline" v-if="!lock_status">
                          <v-btn
                            @click="unlock_job_seeker()"
                            small
                            color="orange lighten-3"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                            <span>الغاء القفل</span>
                          </v-btn>
                        </span>
                      </template>
                      <span>قم بترقية حسابك لشغلني بريميوم</span>
                    </v-tooltip>
                  </div>
                </v-col>
                <v-col cols="9" class="ml-auto mr-auto" style="border: 1px solid #ccc">
                  <div class="job-seeker-footer-content" @click="update(application.id,3)">
                    <img src="~/assets/img/icons/short-list.svg" width="20" />
                    القائمة المختصرة
                  </div>
                </v-col>
                <v-col cols="9" class="ml-auto mr-auto" style="border: 1px solid #ccc">
                  <div class="job-seeker-footer-content" @click="update(application.id,4)">
                    <img src="~/assets/img/icons/accept.svg" width="20" />
                    قبول
                  </div>
                </v-col>
                <v-col cols="9" class="ml-auto mr-auto" style="border: 1px solid #ccc">
                  <div class="job-seeker-footer-content" @click="update(application.id,5)">
                    <img src="~/assets/img/icons/decline.svg" width="20" />
                    رفض
                  </div>
                </v-col>
              </v-row>

              <!-- JobSeeker Card -->
              <v-col cols="11" class="ml-auto mr-auto">
                <!-- Shaghalni Logo -->
                <div style="position: absolute; top: 0; left: 12px">
                  <img :src="storage_url+'Hq1EfAk8OBWqtbxDgtivRPPJpNStw5NGAmSzmTNP.png'" width="140" />
                </div>

                <div class="job-holder">
                  <!-- Above The Divider -->
                  <!-- Photo -->
                  <v-row>
                    <v-col cols="12">
                      <div class="logo-mask ml-auto mr-auto">
                        <img :src="job_seeker.avatar ? storage_url+job_seeker.avatar : thumb_logo" />
                      </div>
                    </v-col>
                  </v-row>

                  <!-- Info -->
                  <v-row>
                    <v-col cols="12">
                      <!-- Info Row 1 -->
                      <v-row>
                        <v-col md="6" class="job-title">
                          <span>{{ job_seeker.first_name_en }} {{ job_seeker.last_name_en }}</span>
                        </v-col>
                        <v-col md="6" class="job-company-title">
                          <span>لا يوجد وظيفة</span>
                        </v-col>
                      </v-row>

                      <!-- Info Row 2 -->
                      <v-row>
                        <v-col md="6" class="job-details-title">
                          الجنسية:
                          <span
                            class="details-title d-inline"
                          >{{ job_seeker.nationality ? job_seeker.nationality.name_ar : 'لا يوجد' }}</span>
                        </v-col>

                        <v-col md="6" class="job-details-title">
                          محل الإقامة:
                          <span
                            class="details-title d-inline"
                          >{{ job_seeker.country ? job_seeker.country.name_ar : 'لا يوجد' }}</span>

                          <span
                            class="details-title d-inline"
                            v-if="job_seeker.country !== undefined"
                          >{{ job_seeker.city ? '- ' + job_seeker.city.name_ar : '' }}</span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <!-- Hire Button -->
                  <v-row>
                    <v-col cols="12">
                      <!-- <v-row v-if="!job_seeker.CV">
                        <v-col md="12">
                          <nuxt-link to="job_seeker.CV" target="_blank">
                            <v-btn small class="shift-type" rounded outlined>السيرة الذاتية</v-btn>
                          </nuxt-link>
                        </v-col>
                      </v-row>-->
                      <v-row v-if="!lock_status && can_unlock">
                        <v-col md="12">
                          <v-btn
                            color="success"
                            small
                            class="job-submit"
                            @click="unlock_job_seeker"
                          >
                            <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                            <span>إلغاء القفل</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row v-if="lock_status">
                        <v-col md="12">
                          <v-btn
                            color="success"
                            small
                            class="job-submit"
                            @click="unlock_job_seeker"
                          >
                            <v-icon left>{{ icons.mdiEy }}</v-icon>
                            <span>الحساب مفتوح</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row v-if="!can_unlock && !lock_status">
                        <v-col md="12">
                          <v-tooltip v-if="!lock_status" left>
                            <template v-slot:activator="{ on, attrs }">
                              <span class="details-title d-inline" v-if="!lock_status">
                                <v-btn
                                  @click="unlock_job_seeker()"
                                  small
                                  color="orange lighten-3"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                                  <span>الغاء القفل</span>
                                </v-btn>
                              </span>
                            </template>
                            <span>قم بترقية حسابك لشغلني بريميوم</span>
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>

                  <v-row style="margin-top: -2%; margin-bottom: -1%;">
                    <v-col cols="6" class="job-details-title">
                      <v-row>
                        <v-col cols="12">
                          رقم الهاتف:
                          <span
                            v-if="lock_status"
                            class="details-title"
                          >{{ job_seeker.user ? job_seeker.user.phone_number : 'لا يوجد' }}</span>

                          <!-- v-if="can_unlock && !lock_status" -->
                          <v-tooltip v-if="can_unlock && !lock_status" left>
                            <template v-slot:activator="{ on, attrs }">
                              <span class="details-title" v-if="!lock_status">
                                <v-btn
                                  @click="unlock_job_seeker()"
                                  small
                                  color="orange lighten-3"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon left>{{ icons.mdiLockOpenOutline }}</v-icon>
                                  <span>الغاء القفل</span>
                                </v-btn>
                              </span>
                            </template>
                            <span>قم بترقية حسابك لشغلني بريميوم</span>
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6" class="job-details-title">
                      <v-row>
                        <v-col cols="9" class="job-details-title">
                          خبرة:
                          <span
                            class="details-title"
                          >{{ job_seeker.experience_level ? job_seeker.experience_level.name_ar : 'لا يوجد' }}</span>
                        </v-col>
                        <v-col cols="3" class="text-center" style="border-right: 3px solid #ccc">
                          <img
                            v-if="job_seeker.gender_id === 1"
                            src="~/assets/img/icons/male.svg"
                            width="10"
                          />
                          <img
                            v-if="job_seeker.gender_id === 2"
                            src="~/assets/img/icons/fmm.svg"
                            width="10"
                          />
                          <img v-else src="~/assets/img/icons/fmm.svg" width="10" />
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>

                <div class="job-title-details">معلومات شخصية</div>
                <div class="row" style="margin-top: -2%;">
                  <v-col cols="12">
                    <div class="job-requirements">
                      <div class="job-title">السن:</div>
                      <div class="job-title-desc">{{ job_seeker.age }} سنة</div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="job-requirements">
                      <div class="job-title">المؤهل المطلوب</div>
                      <div
                        class="job-title-desc"
                      >{{ job_seeker.education_level ? job_seeker.education_level.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="job-requirements">
                      <div class="job-title">رخصة القيادة</div>
                      <div
                        class="job-title-desc"
                      >{{ job_seeker.driving_license ? job_seeker.driving_license.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="job-requirements">
                      <div class="job-title">محل الإقامة</div>
                      <div class="job-title-desc">
                        {{ job_seeker.country ? job_seeker.country.name_ar : 'لا يوجد' }}
                        {{ job_seeker.country && job_seeker.city ? ' , ' + job_seeker.city.name_ar : '' }} {{
                        job_seeker.country && job_seeker.city && job_seeker.area ? ' , ' + job_seeker.area.name_ar : ''
                        }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="job-requirements">
                      <div class="job-title">الحالة التجنيدية المطلوبة</div>
                      <div
                        class="job-title-desc"
                      >{{ job_seeker.military_status ? job_seeker.military_status.name_ar : 'لا يوجد' }}</div>
                    </div>
                  </v-col>
                </div>

                <div class="job-title-details">خبرات العمل السابقة</div>
                <div v-if="job_seeker.previous_experience">
                  <div class="job-requirements" v-if="job_seeker.previous_experience.length > 0">
                    <div
                      class="job-title-desc"
                      v-for="(previous_experience, index) in job_seeker.previous_experience"
                      :key="index"
                    >
                      <ul>
                        <li
                          v-if="previous_experience.jobRole"
                        >الوظيفة : {{ previous_experience.jobRole || "لا يوجد" }}</li>
                        <li
                          v-if="previous_experience.companyName"
                        >الشركة : {{ previous_experience.companyName || "لا يوجد" }}</li>
                        <li
                          v-if="previous_experience.from"
                        >من : {{ previous_experience.from || "لا يوجد" }}</li>
                        <li
                          v-if="previous_experience.to"
                        >إلى : {{ previous_experience.to || "لا يوجد" }}</li>
                      </ul>
                      <v-divider></v-divider>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="job-requirements">
                    <div class="job-title-desc">
                      <ul>
                        <li>لا يوجد</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="job-title-details">ملاحظات على هذه الوظيفة</div>
                <v-row class="ml-auto mr-auto mb-8" style="background-color: #f1f3f5; width: 100%">
                  <v-col cols="12" style="padding: 35px;">
                    <v-textarea
                      v-on:keyup.enter="update(application.id,'',$event)"
                      outlined
                      counter
                      no-resize
                      label="اترك تعليقا"
                      :value="application.employer_comments"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <v-dialog v-model="unlock_dialog" width="500">
      <v-card>
        <div class="logo-holder-modal">
          <img src="~/assets/logo-blue.png" width="200" />
        </div>
        <v-card-title class="message-title">تم بنجاح</v-card-title>
        <v-card-text class="message-body">{{ unlock_message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#0e4168" width="50%" dark rounded block @click="unlock_dialog = false">حسنا</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="message" :color="error_type">{{ error_message }}</v-snackbar>
  </div>
</template>
<script>
import { mdiChevronDown, mdiLockOpenOutline, mdiThumbUpOutline } from "@mdi/js";

export default {
  middleware: "auth-employer",

  components: {
    Apexcharts: () => import("vue-apexcharts"),
  },
  data() {
    return {
      series: [],
      chartOptions: {
        colors: ["#12406a", "#f0913b"],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          title: {
            text: "",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " شخص";
            },
          },
        },
      },

      icons: {
        mdiChevronDown,
        mdiThumbUpOutline,
        mdiLockOpenOutline,
      },
      // sections: [{ label: "Green section", value: 70, color: "#0e4168" }],
      // chartData: [
      //   ["Year", "Sales"],
      //   ["2014", 1000],
      //   ["2015", 1170],
      //   ["2016", 660],
      //   ["2017", 1030],
      // ],
      // chartOptions: {
      //   chart: {
      //     title: "Company Performance",
      //     subtitle: "Sales, Expenses, and Profit: 2014-2017",
      //   },
      // },
      can_unlock: false,
      unlock_dialog: false,
      unlock_message: "",
      lock_status: false,
      message: "",
      error_type: "",
      error_message: "",
      areas: [],
      experience_lvls: [],
      applications: [],
      job_seeker: {},
      application: {},
      job: {},
      application_statuses: {},
      employer: {},
      thumb_logo: "https://shaghalni.s3.eu-central-1.amazonaws.com/shaghalni_icon.png",
      thumb_avatar:
        "https://www.yourfirstpatient.com/assets/default-user-avatar-thumbnail@2x-ad6390912469759cda3106088905fa5bfbadc41532fbaa28237209b1aa976fc9.png",
      storage_url: process.env.StorageUrl,
      datacollection: null,
      chart_ready: false,
      bgStyle: {},
      chart: {},
      tooltipStyle: {},
      processStyle: {},
      value: [100, 0],
      js_dialog: false,
      min: 0,
      status: 0,
      max: 100,
      experience_lvl: 0,
      area: 0,
      job_app_status: "",
      gender: "",
    };
  },
  async mounted() {
    this.getAreas();
    this.getExperienceLvls();
    this.getApplicationStatuses();
    this.getData(this.status);
    this.fillData();
    this.create_slider();
  },
  watch: {
    chart() {
      this.series = [
        {
          name: "المشاهدات",
          data: this.chart.views,
        },
        {
          name: "المتقدمين",
          data: this.chart.applies,
        },
      ];
      this.chartOptions.xaxis.categories = this.chart.dates;
      this.chart_ready = true;
    },
  },
  methods: {
    open_js(js, application) {
      this.job_seeker = js;
      this.application = application;
      this.js_dialog = true;
    },
    getAreas() {
      this.$axios.get("/resource/area").then((response) => {
        this.areas = response.data;
      });
    },
    getExperienceLvls() {
      this.$axios.get("/resource/experienceLevel").then((response) => {
        this.experience_lvls = response.data;
      });
    },
    getApplicationStatuses() {
      this.$axios.get("/resource/jobApplicationStatus").then((response) => {
        this.application_statuses = response.data;
      });
    },
    create_slider() {
      let vm = this;
      // $( "#slider-range" ).slider({
      //   range: true,
      //   min: 16,
      //   max: 60,
      //   values: [ 16, 60 ],
      //   slide: function( event, ui ) {
      //     $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      //     vm.min = ui.values[ 0 ];
      //     vm.max = ui.values[ 1 ];
      //   }
      // });
    },
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    getData(status) {
      this.$axios
        .get("/employer/jobs/" + this.$route.params.id, {
          params: {
            gender: this.gender,
            area: this.area,
            experience_lvl: this.experience_lvl,
            min_age: this.value[0],
            max_age: this.value[1],
            status: status,
          },
        })
        .then((response) => {
          if (response.data.error_code == 200) {
            this.status = status;
            this.job = response.data.data.job;
            this.employer = response.data.data.employer;
            this.applications = response.data.data.applications;
            this.chart = response.data.data.chart;
          } else {
            return this.$nuxt.error({ statusCode: 404 });
          }
        });
    },
    update(id, status, event) {
      this.$axios
        .post("/employer/job_applications/update", {
          job_application_id: id,
          status: status,
          comment: event ? event.target.value : "",
        })
        .then((response) => {
          this.error_type = "success";
          this.error_message = "تم بنجاح";
          this.message = true;
          this.getData();
        });
    },
    getJobSeeker(id, application) {
      this.$axios.get("/job_seeker/show/" + id).then((response) => {
        if (response.data.error_code == 200) {
          this.job_seeker = response.data.data.job_seeker;
          this.application = application;
          this.lock_status = response.data.data.lock_status;
          this.can_unlock = response.data.data.can_unlock;
          this.js_dialog = true;
        } else {
          return this.$nuxt.error({ statusCode: 404 });
        }
      });
    },
    unlock_job_seeker() {
      this.$axios
        .post("/employer/job_seekers/unlock/" + this.job_seeker.job_seeker_id)
        .then((response) => {
          if (response.data.error_code == 200) {
            this.unlock_message = response.data.msg;
            this.unlock_dialog = true;
            this.getJobSeeker();
          }
        });
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}

.ui-state-default,
.ui-widget-content .ui-state-default,
.ui-widget-header .ui-state-default,
.ui-button,
html .ui-button.ui-state-disabled:hover,
html .ui-button.ui-state-disabled:active {
  border-radius: 4px !important;
  background-color: #0e4168 !important;
}

#slider-range {
  background: transparent !important;
  border: solid 1px rgba(14, 65, 104, 0.25) !important;
}
</style>
