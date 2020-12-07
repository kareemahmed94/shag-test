<!-- eslint-disable -->
<template>
  <div>
    <!-- <cover_slider></cover_slider> -->
    <!--
    <div class="jobs-page">
      <div class="container-fluid search-bar">
        <div class="row jobs-filter justify-center">
          <div class="col-md-3">
            <v-text-field
              v-model="form.searchStr"
              label="بحث بالإسم"
              solo
              @change="getJobSeekers ()"
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
              @change="getJobSeekers()"
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
              @change="getJobSeekers()"
              multiple
            ></v-select>
          </div>
          <div class="col-md-2">
            <button type="button" class="btn search-submit" @click="getJobSeekers()">إبحث</button>
          </div>
        </div>
      </div>
    </div>-->

    <div class="jobs-result" v-if="!$device.isMobileOrTablet">
      <div class="row" v-if="job_seeker">
        <!-- JobSeeker Card -->
        <div class="col-md-9">
          <!-- Shaghalni Logo -->
          <div style="position: absolute; top: 0; left: 12px">
            <img :src="storage_url+'Hq1EfAk8OBWqtbxDgtivRPPJpNStw5NGAmSzmTNP.png'" width="140"/>
          </div>

          <div class="job-holder">
            <!-- Above The Divider -->
            <v-row>
              <!-- Photo -->
              <v-col md="2">
                <div class="logo-mask">
                  <img
                    :src="
                      job_seeker.avatar
                        ? storage_url + job_seeker.avatar
                        : thumb_avatar
                    "
                  />
                </div>
              </v-col>

              <!-- Info -->
              <v-col md="8" class="pr-10">
                <!-- Info Row 1 -->
                <v-row>
                  <v-col md="12" class="job-title">
                    <span
                    >{{ job_seeker.first_name_en }}
                      {{ job_seeker.last_name_en }} -</span
                    >

                    <span>لا يوجد وظيفة</span>
                  </v-col>
                </v-row>

                <!-- Info Row 2 -->
                <v-row>
                  <v-col md="6" class="job-details-title">
                    <span class="details-title d-inline">الجنسية:</span>
                    {{
                      job_seeker.nationality
                        ? job_seeker.nationality.name_ar
                        : "لا يوجد"
                    }}
                  </v-col>

                  <v-col md="6" class="job-details-title">
                    <span class="details-title d-inline">محل الإقامة:</span>
                    {{
                      job_seeker.country
                        ? job_seeker.country.name_ar
                        : "لا يوجد"
                    }}
                    <div
                      class="d-inline"
                      v-if="job_seeker.country !== undefined"
                    >
                      {{
                        job_seeker.city ? "- " + job_seeker.city.name_ar : ""
                      }}
                    </div>
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

                <v-row v-if="lock_status">
                  <v-col md="12">
                    <v-btn color="success" small class="job-submit">
                      <span>الحساب مفتوح</span>
                    </v-btn>
                  </v-col>
                </v-row>
                <div v-else-if="user.employer.subscription && user.employer.subscription.is_valid">
                  <v-row v-if="!lock_status && can_unlock">
                    <v-col md="12" class="job-details-title">
                      <v-btn class="job-submit" @click="unlock_job_seeker()"
                             small dark color="success">
                        <v-icon style="color: white" left>{{ icons.mdiLockOpenOutline }}</v-icon>
                        <span class="details-title d-inline"
                              style="color: white">الغاء القفل</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row v-if="!can_unlock">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="success"
                          small
                          class="job-submit"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon style="color: white" left>{{
                              icons.mdiLockOpenOutline
                            }}
                          </v-icon>
                          <span
                            class="details-title d-inline"
                            style="color: white"
                          >الغاء القفل</span
                          >
                        </v-btn>
                      </template>
                      <span>إنتهت باقة فتح الباحثين عن العمل</span>
                    </v-tooltip>

                  </v-row>

                </div>
                <div v-else>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="success"
                        small
                        class="job-submit"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon style="color: white" left>{{
                            icons.mdiLockOpenOutline
                          }}
                        </v-icon>
                        <span
                          class="details-title d-inline"
                          style="color: white"
                        >الغاء القفل</span
                        >
                      </v-btn>
                    </template>
                    <span>إشترك في باقات شغلني لتتمكن من فتح الملف</span>
                  </v-tooltip>
                </div>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row style="margin-top: -2%; margin-bottom: -1%">
              <v-col
                md="6"
                class="job-details-title"
                style="margin-top: 1%; display: flex; flex-direction: row"
              >
                <span class="details-title d-inline ml-1">رقم الهاتف:</span>
                <div class="d-inline" v-if="lock_status">
                  {{
                    job_seeker.user ? job_seeker.user.phone_number : "لا يوجد"
                  }}
                </div>
                <span
                  v-if="!lock_status"
                  class="details-title d-inline"
                  style="color: #ce0000"
                >يرجى الغاء القفل لإظهار رقم الهاتف</span
                >

                <!-- v-if="can_unlock && !lock_status" -->
              </v-col>
              <v-spacer></v-spacer>
              <v-col md="3" class="job-details-title">
                <v-row>
                  <v-col md="8" class="job-details-title">
                    <span class="details-title d-inline">خبرة:</span>
                    {{
                      job_seeker.experience_level
                        ? job_seeker.experience_level.name_ar
                        : "لا يوجد"
                    }}
                  </v-col>
                  <v-col
                    md="4"
                    class="text-center"
                    style="border-right: 3px solid #ccc"
                  >
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
                    <img v-else src="~/assets/img/icons/fmm.svg" width="10"/>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
          <div class="job-title-details">معلومات شخصية</div>
          <div class="row" style="margin-top: -2%">
            <div class="col-md-4 col-sm-6">
              <div class="job-requirements">
                <div class="job-title-desc">السن</div>
                <div class="job-title" v-if="job_seeker.birth_date">
                  {{ job_seeker.age }} سنة
                </div>
                <div class="job-title" v-else>لا يوجد</div>
              </div>
            </div>
            <div class="col-md-4 col-sm-6">
              <div class="job-requirements">
                <div class="job-title-desc">المؤهل المطلوب</div>
                <div class="job-title">
                  {{
                    job_seeker.education_level
                      ? job_seeker.education_level.name_ar
                      : "لا يوجد"
                  }}
                </div>
              </div>
            </div>
            <div class="col-md-4 col-sm-6">
              <div class="job-requirements">
                <div class="job-title-desc">رخصة القيادة</div>
                <div class="job-title">
                  {{
                    job_seeker.driving_license
                      ? job_seeker.driving_license.name_ar
                      : "لا يوجد"
                  }}
                </div>
              </div>
            </div>
            <div class="col-md-4 col-sm-6">
              <div class="job-requirements">
                <div class="job-title-desc">محل الإقامة</div>
                <div class="job-title">
                  {{
                    job_seeker.country ? job_seeker.country.name_ar : "لا يوجد"
                  }}
                  {{
                    job_seeker.country && job_seeker.city
                      ? " , " + job_seeker.city.name_ar
                      : ""
                  }}
                  {{
                    job_seeker.country && job_seeker.city && job_seeker.area
                      ? " , " + job_seeker.area.name_ar
                      : ""
                  }}
                </div>
              </div>
            </div>
            <div class="col-md-4 col-sm-6">
              <div class="job-requirements">
                <div class="job-title-desc">الحالة التجنيدية المطلوبة</div>
                <div class="job-title">
                  {{
                    job_seeker.military_status
                      ? job_seeker.military_status.name_ar
                      : "لا يوجد"
                  }}
                </div>
              </div>
            </div>
          </div>

          <div class="job-title-details">خبرات العمل السابقة</div>
          <div v-if="job_seeker.previous_experience">
            <div
              class="job-title-desc"
              v-if="job_seeker.previous_experience.length > 0"
            >
              <div
                class="job-requirements"
                v-for="(previous_experience,
                index) in job_seeker.previous_experience"
                :key="index"
              >
                <ul>
                  <li v-if="previous_experience.jobRole">
                    الوظيفة : {{ previous_experience.jobRole || "لا يوجد" }}
                  </li>
                  <li v-if="previous_experience.companyName">
                    الشركة : {{ previous_experience.companyName || "لا يوجد" }}
                  </li>
                  <li v-if="previous_experience.from">
                    من : {{ previous_experience.from || "لا يوجد" }}
                  </li>
                  <li v-if="previous_experience.to">
                    إلى : {{ previous_experience.to || "لا يوجد" }}
                  </li>
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

        <!-- Other Candidates -->
        <v-col md="3">
          <div class="about-company">
            <div class="filter-title">مرشحين مشابهين</div>
            <div class="related-candidates">
              <v-row
                class
                v-for="(related_job_seeker, index) in related_job_seekers"
                :key="'s' + related_job_seeker.id"
              >
                <v-col md="12" cols="12" v-if="index < 5">
                  <v-row class="candidate-card">
                    <v-row>
                      <v-col md="5">
                        <v-img
                          aspect-ratio="1"
                          :src="
                            related_job_seeker.avatar
                              ? storage_url + related_job_seeker.avatar
                              : thumb_avatar
                          "
                          max-width="150"
                        ></v-img>
                        <!-- lazy-src="https://shaghalni.s3.eu-central-1.amazonaws.com/shaghalni_icon.png" -->
                      </v-col>
                      <v-col md="7" class="job-title">
                        <v-row>
                          <v-col md="12" style="padding: 0; font-size: 14px">
                            {{ related_job_seeker.first_name_en }}
                            <span class="job-details-title"
                            >-
                              {{
                                related_job_seeker.category_string.split("-")[0]
                              }}</span
                            >
                          </v-col>
                        </v-row>
                        <v-divider class="mb-2"></v-divider>
                        <v-row>
                          <v-col md="9" class="job-title" style="padding: 0">
                            خبرة:
                            <span
                              class="job-details-title"
                              style="font-weight: 500"
                            >{{
                                related_job_seeker.experience_level
                                  ? related_job_seeker.experience_level.name_ar
                                  : "بدون خبرة"
                              }}</span
                            >
                          </v-col>

                          <v-col
                            v-if="related_job_seeker.gender_id == 1"
                            md="3"
                            class="icon-holder"
                            style="padding: 0"
                          >
                            <img
                              src="~/assets/img/icons/male.svg"
                              width="7"
                              style="margin-left: 15px; margin-right: 15px"
                            />
                          </v-col>

                          <v-col
                            v-else-if="related_job_seeker.gender_id == 2"
                            md="3"
                            class="icon-holder"
                            style="padding: 0"
                          >
                            <img
                              src="~/assets/img/icons/fmm.svg"
                              width="7"
                              style="margin-left: 15px; margin-right: 15px"
                            />
                          </v-col>
                          <v-col
                            v-else
                            md="3"
                            class="icon-holder"
                            style="padding: 0"
                          >
                            <img
                              src="~/assets/img/icons/fmm.svg"
                              width="7"
                              style="margin-left: 15px; margin-right: 15px"
                            />
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="12">
                        <v-btn
                          style="width: 100%"
                          color="rgba(14, 65, 104, 0.25)"
                          rounded
                          @click="get_related_job_seeker(related_job_seeker)"
                          dark
                        >عرض الصفحة
                        </v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-row>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </div>
          </div>
          <br/>
        </v-col>
      </div>
      <v-dialog v-model="unlock_dialog" width="500">
        <v-card>
          <div class="logo-holder-modal pl-0 mb-6 text-center">
            <img src="~/assets/logo-blue.png" width="200"/>
          </div>
          <v-card-title class="message-title">تم بنجاح</v-card-title>
          <v-card-text class="message-body">{{ unlock_message }}</v-card-text>
          <v-card-actions>
            <v-btn
              color="#f3922a"
              class="col-md-6 ml-auto mr-auto mb-8"
              dark
              rounded
              @click="unlock_dialog = false"
            >حسنا
            </v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div class="jobs-result" v-if="$device.isMobileOrTablet">
      <div class="row" v-if="job_seeker">
        <!-- JobSeeker Card -->
        <v-col cols="11" class="ml-auto mr-auto">
          <!-- Shaghalni Logo -->
          <div style="position: absolute; top: 0; left: 12px">
            <img :src="storage_url+'Hq1EfAk8OBWqtbxDgtivRPPJpNStw5NGAmSzmTNP.png'" width="140"/>
          </div>

          <div class="job-holder">
            <!-- Above The Divider -->
            <!-- Photo -->
            <v-row>
              <v-col cols="12">
                <div class="logo-mask ml-auto mr-auto">
                  <img
                    :src="
                      job_seeker.avatar
                        ? storage_url + job_seeker.avatar
                        : thumb_avatar
                    "
                  />
                </div>
              </v-col>
            </v-row>

            <!-- Info -->
            <v-row>
              <v-col cols="12">
                <!-- Info Row 1 -->
                <v-row>
                  <v-col md="12" class="job-title">
                    <span
                    >{{ job_seeker.first_name_en }}
                      {{ job_seeker.last_name_en }} -</span
                    >

                    <span>لا يوجد وظيفة</span>
                  </v-col>
                </v-row>

                <!-- Info Row 2 -->
                <v-row>
                  <v-col md="6" class="job-details-title">
                    <span class="details-title d-inline">الجنسية:</span>
                    {{
                      job_seeker.nationality
                        ? job_seeker.nationality.name_ar
                        : "لا يوجد"
                    }}
                  </v-col>

                  <v-col md="6" class="job-details-title">
                    <span class="details-title d-inline">محل الإقامة:</span>
                    {{
                      job_seeker.country
                        ? job_seeker.country.name_ar
                        : "لا يوجد"
                    }}
                    <div
                      class="d-inline"
                      v-if="job_seeker.country !== undefined"
                    >
                      {{
                        job_seeker.city ? "- " + job_seeker.city.name_ar : ""
                      }}
                    </div>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" class="job-details-title">
                    <span class="details-title d-inline ml-1">اخر ظهور:</span>
                    {{
                      job_seeker.last_activity
                        ? job_seeker.last_activity
                        : "منذ فترة طويلة"
                    }}
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
                <v-row v-if="lock_status">
                  <v-col md="12">
                    <v-btn color="success" small class="job-submit">
                      <v-icon left>{{ icons.mdiEy }}</v-icon>
                      <span>الحساب مفتوح</span>
                    </v-btn>
                  </v-col>
                </v-row>
                <div v-else-if="user.employer.subscription && user.employer.subscription.is_valid">
                  <v-row v-if="!lock_status && can_unlock">
                    <v-col md="12" class="job-details-title">
                      <v-btn
                        class="job-submit"
                        @click="unlock_job_seeker()"
                        small
                        dark
                        color="success"
                      >
                        <v-icon style="color: white" left>{{
                            icons.mdiLockOpenOutline
                          }}
                        </v-icon>
                        <span
                          class="details-title d-inline"
                          style="color: white"
                        >الغاء القفل</span
                        >
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row v-if="!can_unlock">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="success"
                          small
                          class="job-submit"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon style="color: white" left>{{
                              icons.mdiLockOpenOutline
                            }}
                          </v-icon>
                          <span
                            class="details-title d-inline"
                            style="color: white"
                          >الغاء القفل</span
                          >
                        </v-btn>
                      </template>
                      <span>إنتهت باقة فتح الباحثين عن العمل</span>
                    </v-tooltip>

                  </v-row>
                </div>
                <div v-else>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="success"
                        small
                        class="job-submit"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon style="color: white" left>{{
                            icons.mdiLockOpenOutline
                          }}
                        </v-icon>
                        <span
                          class="details-title d-inline"
                          style="color: white"
                        >الغاء القفل</span
                        >
                      </v-btn>
                    </template>
                    <span>إشترك في باقات شغلني لتتمكن من فتح الملف</span>
                  </v-tooltip>
                </div>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row style="margin-top: -2%; margin-bottom: -1%">
              <v-col cols="6" class="job-details-title">
                <v-row>
                  <v-col cols="12">
                    <span class="details-title">رقم الهاتف:</span>
                    <div v-if="lock_status">
                      {{
                        job_seeker.user
                          ? job_seeker.user.phone_number
                          : "لا يوجد"
                      }}
                    </div>
                    <span
                      v-if="!lock_status"
                      style="color: #ce0000"
                      class="details-title"
                    >يرجى الغاء القفل</span
                    >
                  </v-col>
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="6" class="job-details-title">
                <v-row>
                  <v-col cols="9" class="job-details-title">
                    <span class="details-title">خبرة:</span>
                    {{
                      job_seeker.experience_level
                        ? job_seeker.experience_level.name_ar
                        : "لا يوجد"
                    }}
                  </v-col>
                  <v-col
                    cols="3"
                    class="text-center"
                    style="border-right: 3px solid #ccc"
                  >
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
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>

          <div class="job-title-details">معلومات شخصية</div>
          <div class="row" style="margin-top: -2%">
            <v-col cols="12">
              <div class="job-requirements">
                <div class="job-title-desc">السن:</div>
                <div class="job-title" v-if="job_seeker.birth_date">
                  {{ job_seeker.age }} سنة
                </div>
                <div class="job-title" v-else>لا يوجد</div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="job-requirements">
                <div class="job-title-desc">المؤهل المطلوب</div>
                <div class="job-title">
                  {{
                    job_seeker.education_level
                      ? job_seeker.education_level.name_ar
                      : "لا يوجد"
                  }}
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="job-requirements">
                <div class="job-title-desc">رخصة القيادة</div>
                <div class="job-title">
                  {{
                    job_seeker.driving_license
                      ? job_seeker.driving_license.name_ar
                      : "لا يوجد"
                  }}
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="job-requirements">
                <div class="job-title-desc">محل الإقامة</div>
                <div class="job-title">
                  {{
                    job_seeker.country ? job_seeker.country.name_ar : "لا يوجد"
                  }}
                  {{
                    job_seeker.country && job_seeker.city
                      ? " , " + job_seeker.city.name_ar
                      : ""
                  }}
                  {{
                    job_seeker.country && job_seeker.city && job_seeker.area
                      ? " , " + job_seeker.area.name_ar
                      : ""
                  }}
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="job-requirements">
                <div class="job-title-desc">الحالة التجنيدية المطلوبة</div>
                <div class="job-title">
                  {{
                    job_seeker.military_status
                      ? job_seeker.military_status.name_ar
                      : "لا يوجد"
                  }}
                </div>
              </div>
            </v-col>
          </div>

          <div class="job-title-details">خبرات العمل السابقة</div>
          <div v-if="job_seeker.previous_experience">
            <div
              class="job-requirements"
              v-if="job_seeker.previous_experience.length > 0"
            >
              <div
                class="job-title-desc"
                v-for="(previous_experience,
                index) in job_seeker.previous_experience"
                :key="index"
              >
                <ul>
                  <li v-if="previous_experience.jobRole">
                    الوظيفة : {{ previous_experience.jobRole || "لا يوجد" }}
                  </li>
                  <li v-if="previous_experience.companyName">
                    الشركة : {{ previous_experience.companyName || "لا يوجد" }}
                  </li>
                  <li v-if="previous_experience.from">
                    من : {{ previous_experience.from || "لا يوجد" }}
                  </li>
                  <li v-if="previous_experience.to">
                    إلى : {{ previous_experience.to || "لا يوجد" }}
                  </li>
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

        <!-- Other Candidates -->
        <v-col cols="11" class="ml-auto mr-auto">
          <div class="about-company">
            <div class="filter-title">مرشحين مشابهين</div>
            <div class="related-candidates">
              <v-row
                class
                v-for="related_job_seeker in related_job_seekers"
                :key="'s' + related_job_seeker.id"
              >
                <v-col cols="12">
                  <v-row class="candidate-card">
                    <v-col cols="12">
                      <v-img
                        class="ml-auto mr-auto"
                        aspect-ratio="1"
                        :src="
                          related_job_seeker.avatar
                            ? storage_url + related_job_seeker.avatar
                            : thumb_avatar
                        "
                        max-width="150"
                      ></v-img>
                      <!-- lazy-src="https://shaghalni.s3.eu-central-1.amazonaws.com/shaghalni_icon.png" -->
                    </v-col>
                    <v-col cols="6" class="text-right job-details-title">
                      <span class="job-title" style="padding: 0">الاسم:</span>
                      {{ related_job_seeker.first_name_en }}
                    </v-col>
                    <v-col cols="6" class="text-right job-details-title">
                      <span class="job-title">الوظيفة:</span>
                      <div
                        class="d-inline"
                        v-if="related_job_seeker.category_string"
                      >
                        {{ related_job_seeker.category_string.split("-")[0] }}
                      </div>
                    </v-col>
                    <v-col cols="6" class="job-details-title">
                      <span class="details-title d-inline">الخبرة:</span>
                      {{
                        related_job_seeker.experience_level
                          ? related_job_seeker.experience_level.name_ar
                          ? related_job_seeker.experience_level.name_ar
                          : "لا يوجد"
                          : "لا يوجد"
                      }}
                    </v-col>

                    <v-col cols="6" class="text-right">
                      <img
                        v-if="related_job_seeker.gender_id === 1"
                        src="~/assets/img/icons/male.svg"
                        width="10"
                      />
                      <img
                        src="~/assets/img/icons/fmm.svg"
                        width="10"
                        v-else-if="related_job_seeker.gender_id === 2"
                      />
                      <img src="~/assets/img/icons/fmm.svg" width="10" v-else/>
                    </v-col>
                  </v-row>
                  <div>
                    <v-btn
                      color="rgba(14, 65, 104, 0.25)"
                      rounded
                      block
                      @click="get_related_job_seeker(related_job_seeker)"
                      dark
                    >عرض الصفحة
                    </v-btn
                    >
                  </div>
                  <v-divider></v-divider>
                  <!-- <v-row class="candidate-card">
                    <div>


                      <hr />
                    </div>
                  </v-row>-->
                </v-col>
              </v-row>
            </div>
          </div>
          <br/>
        </v-col>
      </div>
      <v-dialog v-model="unlock_dialog" width="500">
        <v-card>
          <div class="logo-holder-modal pl-0 text-center">
            <img src="~/assets/logo-blue.png" width="200"/>
          </div>
          <v-card-title class="message-title">تم بنجاح</v-card-title>
          <v-card-text class="message-body">{{ unlock_message }}</v-card-text>
          <v-card-actions>
            <v-btn
              class="col-6 ml-auto mr-auto mb-6"
              color="#f3922a"
              dark
              rounded
              @click="unlock_dialog = false"
            >حسنا
            </v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import LoginModal from "~/layouts/Login";
import {mdiChevronDown, mdiThumbUpOutline, mdiLockOpenOutline} from "@mdi/js";
import cover_slider from "~/components/common/cover_slider";

export default {
  layout: "default",
  middleware: "auth-employer",
  components: {
    LoginModal,
    cover_slider,
  },
  head() {
    return {
      title:
        "شغلني - " + this.job_seeker
          ? this.job_seeker.first_name_en
          : this.job_seeker.last_name_en,
    };
  },
  data() {
    return {
      icons: {
        mdiChevronDown,
        mdiThumbUpOutline,
        mdiLockOpenOutline,
      },
      sample_slider: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      worker: 1,
      today_date: "",
      login_modal: 0,
      show: false,
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
      job_seeker: {},
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
      sub_date_status: false,
      related_job_seekers_loaded: 0,
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
        searchCat: 0,
        searchCity: 0,
      },
    };
  },
  async mounted() {
    this.getJobSeeker();
    this.getRelatedJobSeekers();
    this.getCategories();
    this.getCities();
  },
  methods: {
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
    redirectToPackages() {
      this.$router.push("/packages");
    },
    getCategories() {
      this.$axios
        .get("/resource/category", {params: {type: "jobs"}})
        .then((response) => {
          this.categories = response.data;
        });
    },
    getCities() {
      this.$axios
        .get("/resource/city", {params: {type: "jobs"}})
        .then((response) => {
          this.cities = response.data;
        });
    },
    getRelatedJobSeekers() {
      this.$axios
        .get("/job_seeker/related", {
          params: {
            slug: this.$route.params.id,
          },
        })
        .then((response) => {
          this.related_job_seekers = response.data.data;
          this.related_job_seekers_loaded = 1;
        });
    },
    getJobSeeker() {
      this.$axios
        .get("/job_seeker/show/" + this.$route.params.id)
        .then((response) => {
          if (response.data.error_code == 200) {
            this.job_seeker = response.data.data.job_seeker;
            this.lock_status = response.data.data.lock_status;
            this.can_unlock = response.data.data.can_unlock;
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
          this.job_seeker = response.data.data.job_seeker;
          this.lock_status = response.data.data.lock_status;
          this.can_unlock = response.data.data.can_unlock;
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
        .post("/job_seeker/jobs/apply", {job_id: id})
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
    getJobSeekers() {
      this.$router.push("/job-seeker");
    },
    login_to_continue() {
      this.login_apply_modal = true;
    },
  },
};
</script>
