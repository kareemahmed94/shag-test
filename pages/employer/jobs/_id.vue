<template>
  <div>
    <!-- Not Mobile Case -->
    <div v-if="!$device.isMobile">
      <div class="container employer-dashboard">
        <v-row>
          <v-col md="3" sm="12">
            <div class="job-candidates-head" style=" padding-left: 0; padding-right: 0;">
              <v-row class="ml-auto mr-auto">
                <v-avatar class="ml-auto mr-auto" color="grey" size="164" tile>
                  <v-img :src="employer.logo ? storage_url+employer.logo : thumb_logo"></v-img>
                </v-avatar>
              </v-row>
              <v-divider class="mb-0"></v-divider>
              <v-row class="job-title text-center mt-0">
                <v-col md="12">
                  <span>{{ employer.name_ar }}</span>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <v-col md="9" sm="12">
            <div class="job-candidates-head ml-auto mr-auto">
              <div class="job-details">
                <v-row>
                  <v-col md="7" class="job-details-title">
                    <span class="details-title d-inline ml-1">الموقع</span>
                    {{ employer.city ? employer.city.name_ar : '' }} {{ employer.area ? ' ,' + employer.area.name_ar : ''}}
                  </v-col>
                </v-row>

                <v-row>
                  <v-col md="4" class="job-details-title">
                    <span class="details-title d-inline ml-1">الموقع الإلكتروني</span>
                    {{ employer.website }}
                  </v-col>
                  <v-col md="4" class="job-details-title">
                    <span class="details-title d-inline ml-1">حجم الشركة</span>
                    {{ employer.company_size ? employer.company_size.name_ar : 'لا يوجد' }}
                  </v-col>
                </v-row>

                <v-divider></v-divider>

                <v-row>
                  <v-col md="4" class="job-footer">
                    <div class="candidate-details">
                      <span>{{ jobs.length }}</span>
                      عدد الوظائف
                    </div>
                  </v-col>
                  <v-col md="4" class="job-footer">
                    <div class="candidate-details">
                      <span>{{ applications }}</span>
                      المتقدمين
                    </div>
                  </v-col>
                  <v-col md="4" class="job-footer">
                    <div class="candidate-details">
                      <span>{{ employer.views }}</span>
                      شاهدت شركتك
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="12" sm="12">
            <div class="dashboard-job-candidates">
              <v-row>
                <v-col md="8" class="job-title">الوظائف</v-col>
              </v-row>
              <v-divider></v-divider>
              <div v-if="jobs.length > 0">
                <div v-for="(job,index) in jobs" :key="'j'+job.id+index">
                  <div class="job-details">
                    <v-icon
                      dark
                      color="#0e4168"
                      @click="check_on_delete(job)"
                    >{{ icons.mdiTrashCan }}</v-icon>
                    <nuxt-link :to="'/jobs/edit/'+job.slug" style="top: 20px; left: 25px">
                      <img src="~/assets/img/icons/edit.svg" width="20" />
                    </nuxt-link>
                    <nuxt-link
                      :to="'/jobs/'+job.slug"
                      style="top: 20px; left: 25px"
                      target="_blank"
                    >
                      <v-icon dark color="#0e4168">{{ icons.mdiEye }}</v-icon>
                    </nuxt-link>
                    <v-row>
                      <v-col md="6" class="job-details-title">
                        <span class="details-title d-inline">اسم الوظيفة</span>
                        {{ job.title }}
                      </v-col>
                      <v-col md="6" class="job-details-title">
                        <span class="details-title d-inline">وقت العمل</span>
                        {{ job.shift_type ? job.shift_type.name_ar : 'لا يوجد' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="4" class="job-details-title" v-if="job.addresses">
                        <span class="details-title d-inline">المكان</span>
                        {{job.addresses.length > 0 ? job.addresses[0].city !== undefined ? job.addresses[0].city.name_ar :
                        'لا يوجد' : 'لا يوجد'}}
                        {{job.addresses.length > 0 ? job.addresses[0].area && job.addresses[0].area !== undefined ? ',' +
                        job.addresses[0].area.name_ar : '' : ''}}
                      </v-col>
                      <v-col md="4" class="job-details-title">
                        <span class="details-title d-inline">المشاهدات</span>
                        {{ job.views }}
                      </v-col>
                      <v-col md="4" class="job-details-title">
                        <span class="details-title d-inline">موعد النشر</span>
                        {{ job.human_timestamps }}
                      </v-col>
                    </v-row>
                    <v-row class="job-footer">
                      <v-col md="2">
                        <div class="candidate-details">{{ job.job_applications.length }} المتقدمين</div>
                      </v-col>
                      <v-col md="2">
                        <div class="candidate-details">{{ job.invited_job_seekers.length }} المتقدمين المقترحين</div>
                      </v-col>
                      <v-col md="2">
                        <div class="candidate-details">{{
                            job.job_applications.filter( job_application => {
                              return job_application.status_id == 4 ? job_application.status_id : null;
                            }).length
                          }} مقبولين</div>
                      </v-col>
                      <v-col md="2">
                        <div class="candidate-details">
                          {{
                            job.job_applications.filter( job_application => {
                              return job_application.status_id == 5 ? job_application.status_id : null;
                            }).length
                          }}
                          مرفوضين
                        </div>
                      </v-col>
                      <v-col md="3" class="ml-auto mr-auto">
                        <v-btn
                          class="job-submit"
                          type="button"
                          @click="$router.push('/employer/jobs/details/'+job.slug)"
                        >
                          <span style="color: white">عرض المتقدمين</span>
                        </v-btn>
                      </v-col>
                    </v-row>

                  </div>
                  <v-divider v-if="jobs[index+1]"></v-divider>
                </div>
              </div>
              <div class="text-center mt-10 mb-10" style="width: 100%" v-else>
                <v-row>
                  <v-col md="12" class="ml-auto mr-auto">
                    <div
                      class="ml-auto mr-auto"
                      style="height: 175px; width: 175px; background-color: rgba(14, 65, 104, 0.25); border-radius: 50%; display: flex; justify-content: center;"
                    >
                      <img src="~/assets/img/icons/add-package.svg" width="125" />
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12">
                    <span
                      class="job-title d-block text-center"
                      style="font-size: 25px"
                    >لم تقم بتنزيل وظائف حتى الآن</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12">
                    <span
                      class="job-details-title d-block text-center"
                      style="font-size: 25px"
                    >قم بالإشتراك وابدأ بالتعيين</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6" class="ml-auto mr-auto">
                    <v-btn
                      style="width: 50%"
                      class="job-submit"
                      @click="$router.push('/jobs/create')"
                    >اضف وظيفة</v-btn>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-else>
      <div class="container employer-dashboard">
        <v-dialog v-model="notification_dialog" max-width="600">
          <v-card light>
            <div class="dashboard-notification mb-0">
              <div class="job-title">أحدث الإخطارات</div>
              <div v-if="notifications.length > 0">
                <v-row
                  class="dashboard-notification-body"
                  v-for="(notification,index) in notifications"
                  :key="'j' + notification.id + index"
                >
                  <v-col
                    md="12"
                    class="dashboard-notification-content job-title"
                    style="font-size: 16px"
                  >
                    <v-divider class="mt-0"></v-divider>
                    {{ notification.actor ? notification.actor.name : 'شغلني' }}
                    <span
                      class="job-details-title"
                      style="font-size: 15px"
                    >- {{ notification.message_ar }}</span>

                    <div
                      class="notification-time"
                      style="font-size: 12px"
                    >{{ notification.human_timestamps }}</div>
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
          <v-col cols="12">
            <div class="job-candidates-head">
              <v-row class="ml-auto mr-auto">
                <v-avatar class="ml-auto mr-auto" color="grey" size="164" tile>
                  <v-img :src="employer.logo ? storage_url+employer.logo : thumb_logo"></v-img>
                </v-avatar>
              </v-row>
              <v-divider class="mb-0"></v-divider>
              <v-row class="job-title text-center mt-0">
                <v-col md="12">
                  <span>{{ employer.name_ar }}</span>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12">
            <div style="background-color: rgba(25, 63, 91, 0.06); padding: 15px 30px 15px 30px;">
              <div class="job-details">
                <v-row>
                  <div style="top: 20px; left: 25px">
                    <nuxt-link to="/employer/dashboard/edit" style="top: 20px; left: 25px">
                      <img src="~/assets/img/icons/edit.svg" width="20" />
                    </nuxt-link>
                  </div>
                  <v-col cols="12" class="job-details-title">
                    <span class="details-title d-inline">الموقع</span>
                    {{ employer.city ? employer.city.name_ar : '' }} {{ employer.area ? ' ,' + employer.area.name_ar : ''}}
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" class="job-details-title">
                    <span class="details-title d-inline">الموقع الإلكتروني</span>
                    {{ employer.website }}
                  </v-col>
                  <v-col cols="12" class="job-details-title">
                    <span class="details-title d-inline">حجم الشركة</span>
                    {{ employer.company_size ? employer.company_size.name_ar : 'لا يوجد' }}
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      type="button"
                      class="job-submit"
                      @click="$router.push('/jobs/create')"
                    >أضف وظيفة جديدة</v-btn>
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
                      <span>{{ applications }}</span>
                      المتقدمين
                    </div>
                  </v-col>
                  <v-col cols="12" class="job-footer">
                    <div class="candidate-details">
                      <span>{{ employer.views }}</span>
                      شاهدت شركتك
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="dashboard-job-candidates">
              <v-row>
                <v-col cols="12">
                  <div class="job-title">تفاصيل الباقة</div>
                </v-col>
                <v-col v-if="!subscription" cols="12" class="job-title text-left">
                  <span>
                    <v-btn class="btn-dashboard" @click="$router.push('/packages')">شراء باقة جديدة</v-btn>
                  </span>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row v-if="subscription">
                <v-col cols="12">
                  <label class="label-title" style="float: right">أيام حتى تجديد</label>
                  <label class="label-title">{{ subscription.days_left + 'يوم'}}</label>
                  <v-progress-linear :value="days_left" :color="getProgressColor(days_left)"></v-progress-linear>
                </v-col>
                <v-col cols="12">
                  <label class="label-title" style="float: right">وظائف متبقية</label>
                  <label class="label-title" v-if="subscription.package_details">
                    {{ subscription.package_details.job_posts_number - subscription.package_details.job_posts_number_used
                    }} من {{ subscription.package_details.job_posts_number }}
                  </label>
                  <v-progress-linear
                    :value="job_seekers_left"
                    :color="getProgressColor(job_seekers_left)"
                  ></v-progress-linear>
                </v-col>
              </v-row>
              <v-row v-if="subscription">
                <v-col md="12" v-if="subscription.package_details">
                  <label class="label-title" style="float: right">باحثين عن العمل متبقيين</label>
                  <label
                    class="label-title"
                    v-if="subscription.package_details.unlock_profiles_num != null"
                  >
                    {{ subscription.package_details.unlock_profiles_num -
                  subscription.package_details.unlock_profiles_num_used }} من {{
                      subscription.package_details.unlock_profiles_num }}
                  </label>
                  <label class="label-title" v-else>عدد لا نهائي</label>
                  <v-progress-linear
                    :value="unlock_profiles_left"
                    :color="getProgressColor(unlock_profiles_left)"
                  ></v-progress-linear>
                </v-col>
              </v-row>

              <v-row v-if="!subscription" class="mt-6">
                <v-col cols="6">
                  <div>
                    <span
                      class="job-title d-block text-center"
                      style="font-size: 25px"
                    >انت لست مشترك في باقة الآن</span>
                    <span
                      class="job-details-title d-block text-center"
                      style="font-size: 25px"
                    >قم بالإشتراك وابدأ بالتعيين</span>
                  </div>
                </v-col>

                <v-col cols="4" class="text-right">
                  <img src="~/assets/img/icons/subscription-expired.png" width="100" />
                </v-col>

                <v-row>
                  <v-col cols="12" class="ml-auto mr-auto">
                    <v-btn style="width: 50%" class="job-submit">اشترك الآن</v-btn>
                  </v-col>
                </v-row>
              </v-row>
            </div>
            <div class="dashboard-job-candidates">
              <v-divider></v-divider>
              <div v-if="jobs.length > 0">
                <div v-for="(job,index) in jobs" :key="'j'+job.id+index">
                  <div class="job-details">
                    <v-icon
                      dark
                      color="#0e4168"
                      @click="check_on_delete(job)"
                    >{{ icons.mdiTrashCan }}</v-icon>
                    <nuxt-link
                      :to="'/jobs/'+job.slug"
                      style="top: 20px; left: 25px"
                      target="_blank"
                    >
                      <v-icon dark color="#0e4168">{{ icons.mdiEye }}</v-icon>
                    </nuxt-link>
                    <v-row>
                      <v-col cols="12" class="job-details-title">
                        <span class="details-title d-inline">اسم الوظيفة</span>
                        {{ job.title }}
                      </v-col>
                      <v-col cols="12" class="job-details-title">
                        <span class="details-title d-inline">وقت العمل</span>
                        {{ job.shift_type ? job.shift_type.name_ar : 'لا يوجد' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="12" class="job-details-title" v-if="job.addresses">
                        <span class="details-title d-inline">المكان</span>
                        {{job.addresses.length > 0 ? job.addresses[0].city !== undefined ? job.addresses[0].city.name_ar :
                        'لا يوجد' : 'لا يوجد'}}
                        {{job.addresses.length > 0 ? job.addresses[0].area && job.addresses[0].area !== undefined ? ',' +
                        job.addresses[0].area.name_ar : '' : ''}}
                      </v-col>
                      <v-col cols="12" class="job-details-title">
                        <span class="details-title d-inline">المشاهدات</span>
                        {{ job.views }}
                      </v-col>
                      <v-col cols="12" class="job-details-title">
                        <span class="details-title d-inline">موعد النشر</span>
                        {{ job.human_timestamps }}
                      </v-col>
                    </v-row>
                    <v-row class="job-footer">
                      <v-col cols="12">
                        <v-btn
                          style="background-color: rgba(14, 65, 104, 0.25)"
                          class="btn-secondary"
                          @click="$router.push('/employer/jobs/details/'+job.slug)"
                        >
                          <span class="details-title" style="color: #0e4168">المتقدمين الجدد</span>
                        </v-btn>
                      </v-col>
                      <v-col cols="12">
                        <div class="candidate-details">{{ job.vacancies_no }} المتقدمين المقترحين</div>
                      </v-col>
                      <v-col cols="12">
                        <div class="candidate-details">0 مرفوضين</div>
                      </v-col>
                      <v-col cols="12">
                        <v-btn
                          type="button"
                          class="job-submit"
                          @click="$router.push('/employer/jobs/details/'+job.slug)"
                        >
                          <span style="color: white">عرض المتقدمين</span>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                  <v-divider v-if="jobs[index+1]"></v-divider>
                </div>
              </div>

              <div class="text-center mt-10 mb-10" style="width: 100%" v-else>
                <v-row>
                  <v-col cols="12" class="ml-auto mr-auto">
                    <div
                      class="ml-auto mr-auto"
                      style="height: 175px; width: 175px; background-color: rgba(14, 65, 104, 0.25); border-radius: 50%; display: flex; justify-content: center;"
                    >
                      <img src="~/assets/img/icons/add-package.svg" width="125" />
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <span
                      class="job-title d-block text-center"
                      style="font-size: 25px"
                    >لم تقم بتنزيل وظائف حتى الآن</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <span
                      class="job-details-title d-block text-center"
                      style="font-size: 25px"
                    >قم بالإشتراك وابدأ بالتعيين</span>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-row justify="center">
      <v-dialog v-model="delete_dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline" style="float: right">هل تريد مسح الوظيفة؟</v-card-title>
          <v-card-actions>
            <v-btn color="green darken-1" text @click="delete_job">نعم</v-btn>
            <v-btn color="green darken-1" text @click="delete_dialog = false">لا</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-snackbar v-model="message" :color="error_type">{{ error_message }}</v-snackbar>
  </div>
</template>
<script>
import { mdiArrowLeft, mdiArrowRight, mdiEye, mdiTrashCan } from "@mdi/js";

export default {
  middleware: "auth-employer",
  components: {},
  data() {
    return {
      speeddial: false,
      notification_dialog: false,
      icons: {
        mdiArrowLeft,
        mdiArrowRight,
        mdiEye,
        mdiTrashCan,
      },
      sections: [{ label: "Green section", value: 70, color: "#0e4168" }],
      subscription: {},
      account_manager: [],
      rec_specialists: [],
      jobs: [],
      notifications: [],
      applications: 0,
      renew_bar: 30,
      query: {},
      dialog: false,
      dialog_message: "",
      days_left: 0,
      jobs_left: 0,
      unlock_profiles_left: 0,
      message: "",
      error_type: "",
      error_message: "",
      selected_job: {},
      delete_dialog: false,
      job_seekers_left: 0,
      week_jobs_bar: 60,
      CV_bar: 90,
      employer: {},
      thumb_logo: "https://s3-cdn.shaghalni.com/shaghalni_icon.png",
      thumb_avatar:
        "https://www.yourfirstpatient.com/assets/default-user-avatar-thumbnail@2x-ad6390912469759cda3106088905fa5bfbadc41532fbaa28237209b1aa976fc9.png",
      storage_url: process.env.StorageUrl,
      value: 33.333333333,
      max: 50,
      min: 0,
    };
  },
  async mounted() {
    this.query = this.$route.query;
    await this.getData();
  },
  watch: {
    subscription() {
      if (this.subscription && this.subscription != null) {
        let package_details = this.subscription.package_details;
        this.days_left =
          100 - parseInt((30 / 100) * this.subscription.days_left);
        this.jobs_left =
          100 -
          parseInt(
            (package_details.job_posts_number / 100) *
            package_details.job_posts_number_used
          );
        console.log(package_details);
        this.job_seekers_left =
          100 -
          parseInt(
            (package_details.job_posts_number_used * 100) /
            package_details.job_posts_number
          );

        this.unlock_profiles_left =
          100 -
          parseInt(
            (package_details.unlock_profiles_num_used * 100) /
            package_details.unlock_profiles_num
          );
        console.log(
          "hi",
          `${this.unlock_profiles_left} = ${package_details.unlock_profiles_num} : ${package_details.unlock_profiles_num_used}`
        );
      }
    },
  },
  methods: {
    check_on_delete(job) {
      this.delete_dialog = true;
      this.selected_job = job;
    },
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

    delete_job() {
      this.$axios
        .post("/employer/jobs/" + this.selected_job.id)
        .then((response) => {
          this.delete_dialog = false;
          this.message = true;
          this.error_type = "success";
          this.error_message = "تم مسح الوظيفة بنجاح!";
          this.getData();
        });
    },
    getProgressColor(num) {
      if (num > 90) return "#43A047";
      if (num > 80) return "#81C784";
      if (num > 70) return "#69F0AE";
      if (num > 60) return "#F9A825";
      if (num > 50) return "#FBC02D";
      if (num > 40) return "#FFA000";
      if (num > 30) return "#F57C00";
      if (num > 20) return "#FB8C00";
      if (num > 10) return "#EF6C00";
      return "#F44336";
    },
    get_dashboard() {
      this.dialog = false;
      this.$router.push("/employer/dashboard");
    },
    getData() {
      this.$axios.get("/employer/dashboard").then((response) => {
        this.jobs = response.data.data.jobs;
        this.employer = response.data.data.employer;
        this.account_manager = response.data.data.account_manager;
        this.applications = response.data.data.applications;
        this.notifications = response.data.data.notifications;
        this.rec_specialists = response.data.data.rec_specialists;
        this.subscription = response.data.data.subscription || null;
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
</style>
