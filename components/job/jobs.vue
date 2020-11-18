<!-- eslint-disable -->
<template>
  <!-- Not Mobile Case -->
  <div v-if="!$device.isMobileOrTablet">
    <v-col cols="11" md="12" style="margin-left: auto; margin-right: auto">
      <div v-if="status == 1">
        <img src="~/assets/img/loader.png" style="width: 100%" />
      </div>
      <div v-else-if="status == 2">
        <div :class="job.employer ? 'job-holder' : ''" v-for="(job,index) in jobs" :key="job.id">
          <v-row v-if="job.employer">
            <div v-if="index==0">
              <div style="position: absolute; top: 0; left: 12px">
                <v-img src="/_nuxt/assets/img/shag-badge.png" max-width="140"></v-img>
              </div>
            </div>
            <v-col cols="4" md="3">
              <nuxt-link :to="'/employer/' + job.employer.slug">
                <div
                  class="logo-mask"
                  :style="`${$device.isMobile ? 'width: 100%; margin-top: 0;' : ''}`"
                >
                  <v-img
                    aspect-ratio="1"
                    :src="job.employer.logo ? storage_url+job.employer.logo : thumb_logo"
                  ></v-img>
                  <!-- lazy-src="https://s3-cdn.shaghalni.com/shaghalni_icon.png" -->
                </div>
              </nuxt-link>
            </v-col>
            <v-col cols="8" md="7">
              <div class="job-details">
                <v-row>
                  <v-col md="12" class="job-title">
                    {{ job.title }}
                    <span class="job-company-title">- {{ job.employer.name_ar }}</span>
                  </v-col>
                </v-row>
                <!-- This col is on screens only (1)-->
                <v-row v-if="!$device.isMobile">
                  <v-col cols="6" md="6" class="job-details-title">
                    <span class="details-title d-inline">الموقع:</span>
                      {{job.addresses.length > 0 ? job.addresses[0].city && job.addresses[0].city !== undefined ? job.addresses[0].city.name_ar : 'لا يوجد' : 'لا يوجد' }}
                      {{
                      job.addresses.length > 0 ? job.addresses[0].area && job.addresses[0].area !== undefined ? ',' + job.addresses[0].area.name_ar : '' : ''
                      }}

                  </v-col>
                  <v-col
                    cols="3"
                    md="3"
                    class="job-details-title"
                    v-if="job.addresses && job.addresses.length > 1"
                  >
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="#12406a" rounded small dark v-bind="attrs" v-on="on">
                          <span style="color: white;padding:0">و {{ job.addresses.length }} آخرون</span>
                        </v-btn>
                      </template>
                      <span>
                        <div v-for="address in job.addresses">
                          {{ address.city && address.city !== undefined ? address.city.name_ar : 'لا يوجد' }}
                          {{ address.area && address.area !== undefined ? ',' + address.area.name_ar : '' }}
                        </div>
                      </span>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="6" md="6" class="job-details-title">
                    <span class="details-title d-inline">الفئة:</span>
                    {{ job.category ? job.category.name_ar : 'لا يوجد' }}
                  </v-col>
                  <v-col cols="6" md="6" class="job-details-title">
                    <span class="details-title d-inline">راتب:</span>
                    {{ job.show_salary ? `${job.min_salary} - ${job.max_salary} شهريا` : 'لا يوجد' }}
                  </v-col>
                  <v-col cols="6" md="6" class="job-details-title">
                    <span class="details-title d-inline">خبرة :</span>
                    {{ job.experience_level ? job.experience_level.name_ar : 'لا يوجد' }}
                  </v-col>
                </v-row>
              </div>
            </v-col>
            <v-col
              cols="6"
              md="2"
              :class="`d-flex flex-end justify-center ${$device.isMobile ? 'flex-row ml-auto mr-auto' : 'flex-column'}`"
            >
              <v-spacer></v-spacer>
              <v-chip
                outlined
                class="ml-auto mr-auto"
                color="#d3dbdf"
                style="font-size: 10px;"
                v-if="job.job_type"
              >
                <strong class="job-title" style="color: #0e4168">{{ job.job_type.name_ar }}</strong>
              </v-chip>
              <!-- <v-btn class="shift-type" v-if="job.job_type">{{job.job_type.name_ar}}</v-btn> -->
              <v-spacer></v-spacer>
              <v-btn class="job-submit" @click="shaghalni(job.slug)">شغلني</v-btn>
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
          <v-divider v-if="job.employer"></v-divider>
          <v-row v-if="job.employer">
            <v-col cols="12" md="8">
              <div class="job-details-title">
                <span class="details-title d-inline">الكلمات الرئيسية:</span>

                <div v-if="job.tags.length !== 0">
                  <div
                    class="d-inline"
                    v-for="(tag, index) in job.tags"
                    :key="tag.id"
                  >{{ index === job.tags.length - 1 ? tag.name_ar : `${tag.name_ar}, ` }}</div>
                </div>
                <div class="d-inline" v-if="job.tags.length === 0">لا يوجد</div>
              </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col
              md="1"
              class="icon-holder d-flex flex-row text-center align-center justify-center"
            >
              <div class="col-md-2 d-inline-block text-center" v-if="job.require_bike_licence == 1">
                <img src="~/assets/img/icons/Bike.svg" width="20" />
              </div>
              <div class="col-md-2 d-inline-block text-center" v-if="job.require_car_licence == 1">
                <img src="~/assets/img/icons/cer..svg" width="20" />
              </div>
              <div class="col-md-3 d-inline-block text-center" v-if="job.required_gender_id == 1">
                <img src="~/assets/img/icons/male.svg" width="10" />
              </div>
              <div
                class="col-md-3 d-inline-block text-center"
                v-else-if="job.required_gender_id == 2"
              >
                <img src="~/assets/img/icons/fmm.svg" width="10" />
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="no-data-placeholder" v-else-if="status == 3">
        <img src="~/assets/img/icons/job-icon.png" width="200" />
        <div class="no-data-text job-details-title text-center">
          <span style="font-size: 18px;">لا توجد وظائف</span>
        </div>
      </div>
    </v-col>
  </div>

  <!-- Mobile & Tablet Case -->
  <div v-else>
    <v-col cols="11" class="ml-auto mr-auto">
      <!-- StillLoadingStatus -->
      <div v-if="status == 1">
        <img src="~/assets/img/loader.png" style="width: 100%" />
      </div>
      <!-- /StillLoadingStatus -->

      <!-- JobCards -->
      <div v-else-if="status == 2">
        <div :class="job.employer ? 'job-holder' : ''" v-for="(job, index) in jobs" :key="job.id">
          <!-- ShaghalniLogo -->
          <div v-if="index === 0">
            <div style="position: absolute; top: 0; left: 12px">
              <v-img src="/_nuxt/assets/img/shag-badge.png" max-width="140"></v-img>
            </div>
          </div>
          <!-- /ShaghalniLogo -->
          <v-row v-if="job.employer">
            <v-col cols="12">
              <nuxt-link :to="'/employer/'+job.employer.slug">
                <div class="logo-mask ml-auto mr-auto">
                  <v-img
                    aspect-ratio="1"
                    :src="job.employer.logo ? storage_url+job.employer.logo : thumb_logo"
                  ></v-img>
                  <!-- lazy-src="https://s3-cdn.shaghalni.com/shaghalni_icon.png" -->
                </div>
              </nuxt-link>
            </v-col>
          </v-row>

          <v-row v-if="job.employer" style="text-align: right">
            <v-col cols="12" class="job-details-title">
              <span class="job-title d-inline">الوظيفة:</span>
              {{ job.title }}
            </v-col>
          </v-row>

          <!-- FirstRow ==> Contains the photo + Name & الفئة + jobType -->
          <v-row v-if="job.employer">
            <!-- Name -->
            <!-- <v-row style="text-align: right">
                <v-col cols="12">
                  <span class="job-company-title">{{ job.employer.name_ar }}</span>
                </v-col>
            </v-row>-->

            <!-- الفئة -->
            <v-col cols="6" class="job-details-title">
              <span class="details-title d-inline">الفئة:</span>
              {{ job.category ? job.category.name_ar : 'لا يوجد' }}
            </v-col>
            <v-col cols="6" class="ml-auto mr-0 job-details-title">
              <v-chip
                color="#d3dbdf"
                class="ml-auto mr-auto"
                style="font-size: 10px;"
                outlined
                v-if="job.job_type"
              >
                <strong class="d-inline job-title" style="color: #0e4168">{{ job.job_type.name_ar }}</strong>
              </v-chip>
            </v-col>
          </v-row>
          <!-- /FirstRow -->

          <!-- SecondRow ==> Contains (الموقع، الراتب) -->
          <v-row v-if="job.employer">
            <v-col cols="6" class="job-details-title">
              الموقع:
              <span class="details-title d-inline">
                {{
                job.addresses.length > 0 ? job.addresses[0].city !== undefined ? job.addresses[0].city.name_ar : 'لا يوجد' : 'لا يوجد'
                }}
                {{
                job.addresses.length > 0 ? job.addresses[0].area && job.addresses[0].area !== undefined ? ',' + job.addresses[0].area.name_ar : '' : ''
                }}
              </span>
            </v-col>
            <v-col
              cols="3"
              md="3"
              class="job-details-title"
              v-if="job.addresses && job.addresses.length > 1"
            >
              <v-btn color="#12406a" rounded small dark @click="show_address(job.id)">
                <span style="color: white;padding:0">و {{ job.addresses.length }} آخرون</span>
              </v-btn>
              <div :id="'address'+job.id" class="addresses-badge hidden">
                <div v-for="address in job.addresses" style="color: white">
                  {{ address.city && address.city !== undefined ? address.city.name_ar : 'لا يوجد' }}
                  {{ address.area && address.area !== undefined ? ',' + address.area.name_ar : '' }}
                </div>
              </div>
            </v-col>

            <v-col cols="6" class="job-details-title">
              <span class="details-title d-inline">راتب:</span>
              {{ job.show_salary ? `${job.min_salary} - ${job.max_salary} شهريا` : 'لا يوجد' }}
            </v-col>
          </v-row>
          <!-- /SecondRow -->

          <!-- ThirdRow ==> Contains (خبرة، ذكر وانثي، العربوية) -->
          <v-row v-if="job.employer">
            <v-col cols="6" class="job-details-title">
              <span class="details-title d-inline">خبرة :</span>
              {{ job.experience_level ? job.experience_level.name_ar : 'لا يوجد' }}
            </v-col>

            <v-col cols="3" class="d-inline-block text-center">
              <img
                v-if="job.required_gender_id === 1"
                class="mx-1"
                src="~/assets/img/icons/male.svg"
                width="10"
              />
              <img
                v-if="job.required_gender_id === 2"
                class="mx-1"
                src="~/assets/img/icons/fmm.svg"
                width="10"
              />
            </v-col>

            <v-col cols="3" class="job-details-title">
              <img
                v-if="job.require_bike_licence === 1"
                class="mx-1"
                src="~/assets/img/icons/Bike.svg"
                width="20"
              />

              <img
                v-if="job.require_car_licence === 1"
                class="mx-1"
                src="~/assets/img/icons/CAR.svg"
                width="20"
              />
            </v-col>
          </v-row>
          <!-- /ThirdRow -->

          <!-- ForthRow ==> Contains The Button -->
          <v-row v-if="job.employer">
            <v-col cols="12">
              <v-btn class="job-submit" @click="shaghalni(job.slug)">شغلني</v-btn>
            </v-col>
          </v-row>
          <!-- /ForthRow -->
        </div>
      </div>

      <div class="no-data-placeholder" v-else-if="status == 3">
        <img src="~/assets/img/icons/job-icon.png" width="100" />
        <div class="no-data-text job-details-title text-center">
          <span style="font-size: 13px;">لا توجد وظائف</span>
        </div>
      </div>
    </v-col>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "Jobs",
  props: ["jobs", "status", "show"],
  data() {
    return {
      thumb_logo:
        "https://ad-venture.org.uk/wp-content/uploads/20~/logo-placeholder.png",
      storage_url: process.env.StorageUrl,
    };
  },
  mounted() {
    console.log(this.$refs.address739);
  },
  computed: {
    parseObj(obj) {
      return JSON.parse(obj, (key, value) => {
        return value + ",";
      });
    },
  },
  methods: {
    show_address(id) {
      if ($("#address" + id).hasClass("hidden")) {
        $("#address" + id).removeClass("hidden");
      } else {
        $("#address" + id).addClass("hidden");
      }
    },
    getGenderIcon(job) {
      return job.required_gender_id === 1 ? ["fa", "male"] : ["fa", "female"];
    },
    shaghalni(slug) {
      this.$router.push("/jobs/" + slug);
    },
  },
};
</script>
