<!-- eslint-disable -->
<template>
  <v-col
    cols="11"
    md="12"
    style="margin-left: auto; margin-right: auto"
    v-if="!$device.isMobileOrTablet"
  >
    <div v-if="status == 1">
      <img src="~/assets/img/loader.png" style="width: 100%" />
    </div>
    <div v-else-if="status == 2">
      <div class="job-holder" v-for="(job_seeker) in job_seekers" :key="job_seeker.id">
        <div class="row">
          <v-col cols="4" md="3" sm="12">
            <div class="logo-mask"
              :style="`${$device.isMobile ? 'width: 100%; margin-top: 0;' : ''}`">
              <v-img aspect-ratio="1"
                :src="job_seeker.avatar ? storage_url + job_seeker.avatar : thumb_avatar"
              ></v-img>
                <!-- lazy-src="https://s3-cdn.shaghalni.com/shaghalni_icon.png" -->
            </div>
          </v-col>
          <v-col cols="8" md="7" sm="12">
            <div class="job-details">
              <div class="row">
                <v-col cols="6" md="6" class="job-title">
                  {{ job_seeker.first_name_en }} {{ job_seeker.last_name_en}}
                  <span
                    class="job-company-title"
                  >- {{ job_seeker.category_string }}</span>
                </v-col>
              </div>
              <div class="row">
                <v-col cols="6" md="4" class="job-details-title">
                  <span class="details-title d-inline ml-1">الجنسية:</span>
                  {{ job_seeker.nationality ? job_seeker.nationality.name_ar : 'لا يوجد' }}
                </v-col>
                <v-col cols="6" md="6" class="job-details-title">
                  <span class="details-title d-inline ml-1">محل الاقامة:</span>
                  {{ job_seeker.country ? job_seeker.country.name_ar : 'لا يوجد' }}
                  <div
                    class="d-inline"
                    v-if="job_seeker.country !== undefined"
                  >{{ job_seeker.city ? "- " + job_seeker.city.name_ar : '' }}</div>
                </v-col>
              </div>
              <div class="row">
                <v-col cols="6" md="12" class="job-details-title">
                  <span class="details-title d-inline ml-1">اخر ظهور:</span>
                  {{ job_seeker.user.last_activity ? job_seeker.user.last_activity : 'منذ فترة طويلة' }}
                </v-col>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="2" sm="12">
            <!-- <div class v-if="is_employer">
              <button
                class="shift-type"
                @click="get_job_seeker(job_seeker.job_seeker_id)"
              >إلغاء القفل</button>
            </div>-->
            <div class="work-btn">
              <button
                class="job-submit"
                @click="get_job_seeker(job_seeker.job_seeker_id)"
              >عرض الصفحة</button>
            </div>
          </v-col>
        </div>
        <v-divider></v-divider>
        <div class="row">
          <v-col cols="12" md="4">
            <div class="job-details-title">
              <span class="details-title d-inline ml-1">الكلمات الرئيسية:</span>
              {{ job_seeker.category_string ? job_seeker.category_string : 'لا يوجد' }}
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="job-details-title">
              <span class="details-title d-inline ml-1">آخر ظهور:</span>
              {{ job_seeker.user.last_active ? job_seeker.user.last_active : 'غير متوفر' }}
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="10" md="3">
            <div class="job-details-title">
              <span class="details-title d-inline ml-1">خبرة:</span>
              {{ job_seeker.experience_level ? job_seeker.experience_level.name_ar : 'لا يوجد' }}
            </div>
          </v-col>

          <v-col
            cols="2"
            md="1"
            class="text-center"
            :style="`${$device.isMobile ? 'margin-top: 5%;' : ''} border-right: 3px solid #ccc;`"
          >
            <!-- For testing only -->
            <img v-if="job_seeker.gender_id === null" src="~/assets/img/icons/male.svg" width="10" />
            <!-- For testing only -->

            <img v-if="job_seeker.gender_id === 1" src="~/assets/img/icons/male.svg" width="10" />
            <img v-if="job_seeker.gender_id === 2" src="~/assets/img/icons/fmm.svg" width="10" />
          </v-col>
        </div>
      </div>
    </div>
    <div class="no-data-placeholder" v-else-if="status == 3">
      <img width="100" src="~/assets/img/icons/job-icon.png" />
      <div class="no-data-text">لا يوجد باحثين عن وظيفة</div>
    </div>
  </v-col>

  <v-col cols="11" style="margin-left: auto; margin-right: auto" v-else>
    <div v-if="status == 1">
      <img src="~/assets/img/loader.png" style="width: 100%" />
    </div>
    <div v-else-if="status == 2">
      <div class="job-holder" v-for="(job_seeker) in job_seekers" :key="job_seeker.id">
        <v-row>
          <v-col cols="12">
            <div class="logo-mask ml-auto mr-auto">
              <v-img
                aspect-ratio="1"
                :src="job_seeker.avatar ? storage_url + job_seeker.avatar : thumb_avatar"
              ></v-img>
                <!-- lazy-src="https://s3-cdn.shaghalni.com/shaghalni_icon.png" -->
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="job-details">
              <v-row class="row">
                <v-col cols="12" class="job-title">
                  {{ job_seeker.first_name_en }} {{ job_seeker.last_name_en}}
                  <span
                    class="job-company-title"
                  >- {{ job_seeker.category_string }}</span>
                </v-col>
              </v-row>
              <v-row class="row">
                <v-col cols="6" class="job-details-title">
                  <span class="details-title d-inline ml-1">الجنسية:</span>
                  {{ job_seeker.nationality ? job_seeker.nationality.name_ar : 'لا يوجد' }}
                </v-col>
                <v-col cols="6" class="job-details-title">
                  <span class="details-title d-inline ml-1">محل الاقامة:</span>
                  {{ job_seeker.country ? job_seeker.country.name_ar : 'لا يوجد' }}
                  <div
                    class="d-inline"
                    v-if="job_seeker.country !== undefined"
                  >{{ job_seeker.city ? "- " + job_seeker.city.name_ar : '' }}</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="job-details-title">
                  <span class="details-title d-inline ml-1">اخر ظهور:</span>
                  {{ job_seeker.user.last_activity ? job_seeker.user.last_activity : 'منذ فترة طويلة' }}
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12">
            <div class v-if="is_employer">
              <!-- <button
                class="shift-type"
                @click="get_job_seeker(job_seeker.job_seeker_id)"
              >إلغاء القفل</button>-->
            </div>
            <div class="work-btn">
              <button
                class="job-submit"
                @click="get_job_seeker(job_seeker.job_seeker_id)"
              >عرض الصفحة</button>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="4">
            <div class="job-details-title">
              <span class="details-title d-inline">الكلمات الرئيسية:</span>
              {{ job_seeker.category_string ? job_seeker.category_string : 'لا يوجد' }}
            </div>
          </v-col>
          <v-col md="3">
            <div class="job-details-title">
              <span class="details-title d-inline ml-1">آخر ظهور:</span>
              {{ job_seeker.user.last_active ? job_seeker.user.last_active : 'لا يوجد' }}
            </div>
          </v-col>
          <v-col cols="4">
            <div class="job-details-title">
              <span class="details-title d-inline">خبرة:</span>
              {{ job_seeker.experience_level ? job_seeker.experience_level.name_ar : 'لا يوجد' }}
            </div>
          </v-col>

          <v-col
            cols="1"
            class="pr-1"
            :style="`${$device.isMobile ? 'margin-top: 5%;' : ''} border-right: 3px solid #ccc;`"
          >
            <!-- For testing only -->
            <img v-if="job_seeker.gender_id === null" src="~/assets/img/icons/male.svg" width="10" />
            <!-- For testing only -->

            <img v-if="job_seeker.gender_id === 1" src="~/assets/img/icons/male.svg" width="10" />
            <img v-if="job_seeker.gender_id === 2" src="~/assets/img/icons/fmm.svg" width="10" />
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="no-data-placeholder" v-else-if="status == 3">
      <img width="100" src="~/assets/img/icons/job-icon.png" />
      <div class="no-data-text">لا يوجد باحثين عن وظيفة</div>
    </div>
  </v-col>
</template>

<script>
import { mdiHumanMale, mdiHumanFemale } from "@mdi/js";

/* eslint-disable */
export default {
  name: "job-seekers",
  props: ["job_seekers", "status"],
  data() {
    return {
      icons: {
        mdiHumanMale,
        mdiHumanFemale,
      },
      thumb_avatar:
        "https://www.yourfirstpatient.com/assets/default-user-avatar-thumbnail@2x-ad6390912469759cda3106088905fa5bfbadc41532fbaa28237209b1aa976fc9.png",
      storage_url: process.env.StorageUrl,
      is_employer: this.$auth.loggedIn
        ? this.$auth.user.employer
          ? true
          : false
        : false,
    };
  },
  mounted() {},
  computed: {
    parseObj(obj) {
      return JSON.parse(obj, (key, value) => {
        return value + ",";
      });
    },
  },
  methods: {
    getGenderIcon(job) {
      return job.required_gender_id === 1 ? ["fa", "male"] : ["fa", "female"];
    },
    get_job_seeker(id) {
      this.$router.push("/job-seeker/" + id);
    },
  },
};
</script>
