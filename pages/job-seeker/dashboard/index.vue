<!-- eslint-disable -->
<template>
  <div>
    <!-- Not Mobile Case -->
    <div v-if="!$device.isMobile">
      <div class="container js-dashboard">
        <v-divider class="mt-0"></v-divider>
        <!-- JS Info -->
        <v-row>
          <v-col md="3" sm="12">
            <div
              class="job-candidates-head"
              style="padding-left: 0; padding-right: 0"
            >
              <v-row class="ml-auto mr-auto">
                <v-avatar
                  class="ml-auto mr-auto"
                  color="#f1f3f5"
                  size="164"
                  tile
                >
                  <v-img
                    :src="
                      job_seeker.avatar
                        ? storage_url + job_seeker.avatar
                        : thumb_logo
                    "
                  ></v-img>
                </v-avatar>
              </v-row>
              <v-divider class="mb-0"></v-divider>
              <v-row class="job-title text-center mt-0">
                <v-col md="12">
                  <span>{{
                    `${job_seeker.first_name_en} ${job_seeker.last_name_en}`
                  }}</span>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <v-col md="9">
            <div class="job-candidates-head ml-auto mr-auto">
              <div class="job-details">
                <nuxt-link
                  :to="''"
                  style="position: absolute; top: 20px; left: 25px"
                >
                  <img src="~/assets/img/icons/edit.svg" width="20" />
                </nuxt-link>
                <v-row>
                  <v-col md="4" class="job-details-title">
                    <span class="details-title d-inline ml-1">رقم الهاتف:</span>
                    {{
                      job_seeker.user ? job_seeker.user.phone_number : "لا يوجد"
                    }}
                  </v-col>
                  <v-col md="6" class="job-details-title">
                    <span class="details-title d-inline ml-1"
                      >الرقم التوظيفي:</span
                    >
                    {{ job_seeker.user ? job_seeker.user.email : "لا يوجد" }}
                  </v-col>
                  <v-col md="2" class="job-details-title text-left">
                    <span class="details-title d-inline ml-1"
                      >عرض الصفحة ></span
                    >
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="4" class="job-details-title">
                    <span class="details-title d-inline ml-1">الجنسية:</span>
                    {{
                      job_seeker.nationality
                        ? job_seeker.nationality.name_ar
                        : "لا يوجد"
                    }}
                  </v-col>
                  <v-col md="6" class="job-details-title">
                    <span class="details-title d-inline ml-1"
                      >محل الإقامة:</span
                    >
                    {{ job_seeker.city ? job_seeker.city.name_ar : "" }}
                    {{ job_seeker.area ? " - " + job_seeker.area.name_ar : "" }}
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col md="3" class="job-footer">
                    <div class="candidate-details">
                      <span>{{ jobs.length }}</span>
                      عدد الوظائف
                    </div>
                  </v-col>
                  <v-col md="3" class="job-footer">
                    <div class="candidate-details">
                      <span>{{
                        applications.filter(
                          (application) => application.status_id == 3
                        ).length
                      }}</span>
                      قائمة قصيرة
                    </div>
                  </v-col>
                  <v-col md="3" class="job-footer">
                    <div class="candidate-details">
                      <span style="color: #09b277"
                        >{{
                          applications.filter(
                            (application) => application.status_id == 4
                          ).length
                        }}
                        قبول</span
                      >
                    </div>
                  </v-col>
                  <v-col md="3" class="job-footer">
                    <div class="candidate-details">
                      <span style="color: #ed5757"
                        >{{
                          applications.filter(
                            (application) => application.status_id == 5
                          ).length
                        }}
                        رفض</span
                      >
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- JS Other Things (jobs, notifications) -->
        <v-row>
          <v-col md="3" sm="12">
            <div v-if="!$device.isTablet" class="dashboard-notification">
              <div class="job-title">أحدث الإخطارات</div>
              <div v-if="notifications.length > 0">
                <v-row
                  class="dashboard-notification-body"
                  v-for="(notification, index) in notifications"
                  :key="'j' + notification.id + index"
                >
                  <v-col
                    md="12"
                    class="dashboard-notification-content job-title"
                    style="font-size: 16px"
                  >
                    <v-divider class="mt-0"></v-divider>
                    {{ notification.actor ? notification.actor.name : "شغلني" }}
                    <span class="job-details-title" style="font-size: 15px"
                      >- {{ notification.message_ar }}</span
                    >

                    <div class="notification-time" style="font-size: 12px">
                      {{ notification.human_timestamps }}
                    </div>
                  </v-col>
                </v-row>
              </div>
              <div class="no-data-placeholder" v-else>
                <img src="~/assets/img/icons/notification.png" width="50" />
                <div class="no-data-text">لا توجد إشعارات</div>
              </div>
            </div>
            <div class="about-company" v-if="categories.length">
              <div class="filter-title-head">وظائف حسب المجال</div>
              <div v-if="!more_cat">
                <div
                  class="filter-title"
                  v-for="(category, index) in categories"
                  :key="category.id"
                  v-if="index < 7"
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
          <v-col md="9" sm="12">
            <div class="dashboard-job-candidates">
              <v-row>
                <v-col md="8" class="job-title">الوظائف</v-col>
                <v-col class="job-details-title text-left">
                  <span class="job-title text-left">عرض جميع الوظائف ></span>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <div v-if="jobs.length > 0">
                <div v-for="(job, index) in jobs" :key="'j' + job.id + index">
                  <div class="job-details">
                    <v-row>
                      <v-col md="6" class="job-details-title">
                        <span class="details-title d-inline">اسم الوظيفة</span>
                        {{ job.title }}
                      </v-col>
                      <v-col md="6" class="job-details-title">
                        <span class="details-title d-inline">وقت العمل</span>
                        {{
                          job.shift_type ? job.shift_type.name_ar : "لا يوجد"
                        }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="12" class="job-details-title">
                        <span v-if="job.addresses">
                          <span class="details-title d-inline left-border"
                            >{{
                              job_seeker.city
                                ? job_seeker.city.name_ar + " - "
                                : ""
                            }}
                            {{
                              job_seeker.area ? job_seeker.area.name_ar : ""
                            }}</span
                          >
                          {{
                            job.addresses.length > 0
                              ? job.addresses[0].area &&
                                job.addresses[0].area !== undefined
                                ? "," + job.addresses[0].area.name_ar
                                : ""
                              : ""
                          }}
                        </span>
                        <span v-else>
                          <span class="details-title d-inline left-border">
                            لا يوجد مكان
                          </span>
                        </span>
                        <span class="job-details-title">
                          <span
                            class="details-title d-inline"
                            style="font-weight: 300"
                          >
                            {{ job.human_timestamps }}
                          </span>
                        </span>
                      </v-col>
                    </v-row>
                  </div>

                  <v-row class="job-footer">
                    <v-col md="3">
                      <div
                        class="candidate-details status-box status-not-show"
                        v-if="
                          applications.filter(
                            (application) =>
                              application.job_seeker_id == job_seeker.id &&
                              application.job_id == job.id
                          )[0].status_id == 1
                        "
                      >
                        <img
                          class="ml-2"
                          src="~/assets/img/icons/no-show.svg"
                          width="20"
                        />
                        لم تظهر
                      </div>

                      <div
                        class="candidate-details status-box status-seen"
                        v-if="
                          applications.filter(
                            (application) =>
                              application.job_seeker_id == job_seeker.id &&
                              application.job_id == job.id
                          )[0].status_id == 2
                        "
                      >
                        <font-awesome-icon
                          :icon="['fas', 'eye']"
                          size="xs"
                          :style="{ color: '#ee6261' }"
                        />تم المشاهدة
                      </div>

                      <div
                        class="candidate-details status-box status-accepted"
                        v-if="
                          applications.filter(
                            (application) =>
                              application.job_seeker_id == job_seeker.id &&
                              application.job_id == job.id
                          )[0].status_id == 4
                        "
                      >
                        <img src="~/assets/img/icons/no-show.svg" width="20" />
                        قبول
                      </div>

                      <div
                        class="candidate-details status-box status-rejected"
                        v-if="
                          applications.filter(
                            (application) =>
                              application.job_seeker_id == job_seeker.id &&
                              application.job_id == job.id
                          )[0].status_id == 5
                        "
                      >
                        <img src="~/assets/img/icons/decline.svg" width="20" />
                        رفض
                      </div>

                      <div
                        class="candidate-details status-box status-shorted"
                        v-if="
                          applications.filter(
                            (application) =>
                              application.job_seeker_id == job_seeker.id &&
                              application.job_id == job.id
                          )[0].status_id == 3
                        "
                      >
                        <img
                          src="~/assets/img/icons/short-list.svg"
                          width="20"
                        />
                        قائمة قصيرة
                      </div>
                    </v-col>

                    <v-col md="3">
                      <div class="candidate-details">
                        <img
                          class="ml-2"
                          src="~/assets/img/icons/lock.svg"
                          width="20"
                        />
                        مقفل
                      </div>
                    </v-col>

                    <v-col md="3">
                      <div class="candidate-details">
                        {{ job.applications.length }} المتقدمين
                      </div>
                    </v-col>

                    <v-col md="3">
                      <v-btn
                        dark
                        class="job-submit"
                        @click="$router.push('/jobs/' + job.slug)"
                      >
                        <span style="color: white">عرض الوظيفة</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </div>
              <div class="no-data-placeholder" v-else>
                <img src="~/assets/img/icons/job-icon.png" width="100" />
                <div class="no-data-text">لا توجد وظائف</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Mobile Case -->
    <div v-if="$device.isMobile">
      <div class="container js-dashboard">
        <v-divider class="mt-0"></v-divider>
        <v-dialog v-model="notification_dialog" max-width="600">
          <v-card light>
            <div class="dashboard-notification">
              <div class="job-title">أحدث الإخطارات</div>
              <div v-if="notifications.length > 0">
                <v-row
                  class="dashboard-notification-body"
                  v-for="(notification, index) in notifications"
                  :key="'j' + notification.id + index"
                >
                  <v-col
                    cols="12"
                    class="dashboard-notification-content job-title"
                    style="font-size: 16px"
                  >
                    <v-divider class="mt-0"></v-divider>
                    {{ notification.actor ? notification.actor.name : "شغلني" }}
                    <span class="job-details-title" style="font-size: 15px"
                      >- {{ notification.message_ar }}</span
                    >

                    <div class="notification-time" style="font-size: 12px">
                      {{ notification.human_timestamps }}
                    </div>
                  </v-col>
                </v-row>
              </div>
              <div class="no-data-placeholder" v-else>
                <img src="~/assets/img/icons/notification.png" width="50" />
                <div class="no-data-text">لا توجد إشعارات</div>
              </div>
            </div>
          </v-card>
        </v-dialog>
        <v-row>
          <div class="ml-4 mr-auto">
            <v-btn
              color="#f3922a"
              dark
              rounded
              @click="notification_dialog = true"
            >
              <v-icon left>mdi-bell</v-icon>الإشعارات
            </v-btn>
          </div>
        </v-row>
        <!-- JS Info -->
        <v-row>
          <v-col cols="12">
            <div
              class="job-candidates-head"
              style="padding-left: 0; padding-right: 0; height: auto"
            >
              <v-row class="ml-auto mr-auto">
                <v-avatar
                  class="ml-auto mr-auto"
                  color="#f1f3f5"
                  size="164"
                  tile
                >
                  <v-img
                    :src="
                      job_seeker.avatar
                        ? storage_url + job_seeker.avatar
                        : thumb_logo
                    "
                  ></v-img>
                </v-avatar>
              </v-row>
              <v-divider class="mb-0"></v-divider>
              <v-row class="job-title text-center mt-0">
                <v-col cols="12">
                  <span>{{
                    `${job_seeker.first_name_en} ${job_seeker.last_name_en}`
                  }}</span>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <v-col cols="12">
            <div
              class="job-candidates-head ml-auto mr-auto"
              style="height: auto"
            >
              <div class="job-details">
                <v-row>
                  <nuxt-link
                    :to="''"
                    style="position: absolute; top: 20px; left: 25px"
                  >
                    <img src="~/assets/img/icons/edit.svg" width="20" />
                  </nuxt-link>
                </v-row>
                <v-row>
                  <v-col cols="12" class="job-details-title text-left">
                    <span class="details-title d-inline ml-1"
                      >عرض الصفحة ></span
                    >
                  </v-col>
                  <v-col cols="12" class="job-details-title">
                    <span class="details-title d-inline ml-1">رقم الهاتف:</span>
                    {{
                      job_seeker.user ? job_seeker.user.phone_number : "لا يوجد"
                    }}
                  </v-col>
                  <v-col cols="12" class="job-details-title">
                    <span class="details-title d-inline ml-1"
                      >الرقم التوظيفي:</span
                    >
                    {{ job_seeker.user ? job_seeker.user.email : "لا يوجد" }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="job-details-title">
                    <span class="details-title d-inline ml-1">الجنسية:</span>
                    {{
                      job_seeker.nationality
                        ? job_seeker.nationality.name_ar
                        : "لا يوجد"
                    }}
                  </v-col>
                  <v-col cols="12" class="job-details-title">
                    <span class="details-title d-inline ml-1"
                      >محل الإقامة:</span
                    >
                    {{ job_seeker.city ? job_seeker.city.name_ar : "" }}
                    {{ job_seeker.area ? " - " + job_seeker.area.name_ar : "" }}
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="12" class="job-footer">
                    <div class="candidate-details">
                      <span>{{ jobs.length }}</span>
                      عدد الوظائف
                    </div>
                  </v-col>
                  <v-col cols="12" class="job-footer">
                    <div class="candidate-details">
                      <span>{{
                        applications.filter(
                          (application) => application.status_id == 3
                        ).length
                      }}</span>
                      قائمة قصيرة
                    </div>
                  </v-col>
                  <v-col cols="12" class="job-footer">
                    <div class="candidate-details">
                      <span style="color: #09b277"
                        >{{
                          applications.filter(
                            (application) => application.status_id == 4
                          ).length
                        }}
                        قبول</span
                      >
                    </div>
                  </v-col>
                  <v-col cols="12" class="job-footer">
                    <div class="candidate-details">
                      <span style="color: #ed5757"
                        >{{
                          applications.filter(
                            (application) => application.status_id == 5
                          ).length
                        }}
                        رفض</span
                      >
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- JS Other Things (jobs, notifications) -->
        <v-row>
          <v-col cols="12">
            <div class="dashboard-job-candidates">
              <v-row>
                <v-col cols="12" class="job-title">الوظائف</v-col>
                <v-col class="job-details-title text-left">
                  <span class="job-title text-left">عرض جميع الوظائف ></span>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <div v-if="jobs.length > 0">
                <div v-for="(job, index) in jobs" :key="'j' + job.id + index">
                  <div class="job-details">
                    <v-row>
                      <v-col cols="12" class="job-details-title">
                        <span class="details-title d-inline">اسم الوظيفة</span>
                        {{ job.title }}
                      </v-col>
                      <v-col cols="12" class="job-details-title">
                        <span class="details-title d-inline">وقت العمل</span>
                        {{
                          job.shift_type ? job.shift_type.name_ar : "لا يوجد"
                        }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="job-details-title">
                        <span v-if="job.addresses">
                          <span class="details-title d-inline left-border"
                            >{{
                              job_seeker.city
                                ? job_seeker.city.name_ar + " - "
                                : ""
                            }}
                            {{
                              job_seeker.area ? job_seeker.area.name_ar : ""
                            }}</span
                          >
                          {{
                            job.addresses.length > 0
                              ? job.addresses[0].area &&
                                job.addresses[0].area !== undefined
                                ? "," + job.addresses[0].area.name_ar
                                : ""
                              : ""
                          }}
                        </span>
                        <span v-else>
                          <span class="details-title d-inline left-border">
                            لا يوجد مكان
                          </span>
                        </span>
                        <span class="job-details-title">
                          <span
                            class="details-title d-inline"
                            style="font-weight: 300"
                          >
                            {{ job.human_timestamps }}
                          </span>
                        </span>
                      </v-col>
                    </v-row>
                  </div>

                  <v-row class="job-footer">
                    <v-col cols="12">
                      <div
                        class="candidate-details status-box status-not-show"
                        v-if="
                          applications.filter(
                            (application) =>
                              application.job_seeker_id == job_seeker.id &&
                              application.job_id == job.id
                          )[0].status_id == 1
                        "
                      >
                        <img
                          class="ml-2"
                          src="~/assets/img/icons/no-show.svg"
                          width="20"
                        />
                        لم تظهر
                      </div>

                      <div
                        class="candidate-details status-box status-seen"
                        v-if="
                          applications.filter(
                            (application) =>
                              application.job_seeker_id == job_seeker.id &&
                              application.job_id == job.id
                          )[0].status_id == 2
                        "
                      >
                        <font-awesome-icon
                          :icon="['fas', 'eye']"
                          size="xs"
                          :style="{ color: '#ee6261' }"
                        />تم المشاهدة
                      </div>

                      <div
                        class="candidate-details status-box status-accepted"
                        v-if="
                          applications.filter(
                            (application) =>
                              application.job_seeker_id == job_seeker.id &&
                              application.job_id == job.id
                          )[0].status_id == 4
                        "
                      >
                        <img src="~/assets/img/icons/no-show.svg" width="20" />
                        قبول
                      </div>

                      <div
                        class="candidate-details status-box status-rejected"
                        v-if="
                          applications.filter(
                            (application) =>
                              application.job_seeker_id == job_seeker.id &&
                              application.job_id == job.id
                          )[0].status_id == 5
                        "
                      >
                        <img src="~/assets/img/icons/decline.svg" width="20" />
                        رفض
                      </div>

                      <div
                        class="candidate-details status-box status-shorted"
                        v-if="
                          applications.filter(
                            (application) =>
                              application.job_seeker_id == job_seeker.id &&
                              application.job_id == job.id
                          )[0].status_id == 3
                        "
                      >
                        <img
                          src="~/assets/img/icons/short-list.svg"
                          width="20"
                        />
                        قائمة قصيرة
                      </div>
                    </v-col>

                    <v-col cols="12">
                      <div class="candidate-details">
                        <img
                          class="ml-2"
                          src="~/assets/img/icons/lock.svg"
                          width="20"
                        />
                        مقفل
                      </div>
                    </v-col>

                    <v-col cols="12">
                      <div class="candidate-details">
                        {{ job.applications.length }} المتقدمين
                      </div>
                    </v-col>

                    <v-col cols="12">
                      <v-btn
                        dark
                        class="job-submit"
                        @click="$router.push('/jobs/' + job.slug)"
                      >
                        <span style="color: white">عرض الوظيفة</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </div>
              <div class="no-data-placeholder" v-else>
                <img src="~/assets/img/icons/job-icon.png" width="100" />
                <div class="no-data-text">لا توجد وظائف</div>
              </div>
            </div>

            <div class="about-company" v-if="categories.length">
              <div class="filter-title-head">وظائف حسب المجال</div>
              <div v-if="!more_cat">
                <div
                  class="filter-title"
                  v-for="(category, index) in categories"
                  :key="category.id"
                  v-if="index < 7"
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
      </div>
    </div>
  </div>
</template>
<script>

export default {
  middleware: "auth-job-seeker",
  layout: "default",
  data() {
    return {
      notification_dialog: false,
      sections: [{ label: "Green section", value: 70, color: "#0e4168" }],
      account_managers: [],
      more_cat: 0,
      jobs: [],
      notifications: [],
      categories: [],
      applications: [],
      job_seeker: {},
      thumb_logo: "https://s3-cdn.shaghalni.com/shaghalni_icon.png",
      thumb_avatar:
        "https://www.yourfirstpatient.com/assets/default-user-avatar-thumbnail@2x-ad6390912469759cda3106088905fa5bfbadc41532fbaa28237209b1aa976fc9.png",
      storage_url: process.env.StorageUrl,
      value: 33.333333333,
      max: 50,
      min: 0,
      valueDeterminate: 50,
      form:
        {
          filterShiftType: [],
          filterJobType: [],
          filterEducationLevel: [],
          filterExperienceLevel: [],
          searchStr: "",
          searchCat: 0,
          searchCity: 0,
        },
    };
  },
  async mounted() {
    this.getData();
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.$axios.get("/resource/category").then((response) => {
        this.categories = response.data;
        this.sub_categories = response.data;
      });
    },
    more_filter() {
      this.more_cat = 1;
    },
    less_filter() {
      this.more_cat = 0;
    },
    getData() {
      this.$axios.get("/job_seeker/dashboard").then((response) => {
        this.jobs = response.data.data[0];
        this.job_seeker = response.data.data[1];
        this.account_managers = response.data.data[2];
        this.applications = response.data.data[3];
        this.notifications = response.data.data[4];
      });
    },
  },
};
</script>

<style scoped>
.small {
  max-width: 600px;
  margin: 150px auto;
}
.job-candidates-content .job-details-title .details-title {
  text-align: right !important;
}

.left-border {
  border-left: 3px solid #e0e5e8 !important;
}
.status-box {
  border-radius: 10px;
  background-color: rgba(14, 65, 104, 0.25);
}

.status-not-show {
  font-weight: bold;
  color: #0e4168;
}

.status-seen {
  font-weight: bold;
  /* color: #09b277; */
  color: #0e4168;
}
.status-shorted {
  font-weight: bold;
  color: #57aced;
}
status-accepted {
  font-weight: bold;
  color: #09b277;
}

.status-rejected {
  font-weight: bold;
  color: #ed5757;
}
</style>
