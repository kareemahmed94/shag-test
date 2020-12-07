<template>
    <div class="job-banner">
      <div class="job-banner-content">
        <h1>ابحث عن وظيفتك</h1>
        <h5>سوف نساعدك في العثور على الوظيفة المناسبة لك</h5>
        <form>
          <div class="form-group"  style="text-align: right;margin-bottom: 1rem!important;">
            <v-autocomplete v-model="title" :items="categories"
                            :loading="isLoadingTitle" :search-input.sync="filterCity" chips clearable
                            @change="filter_filters('category' , 1)"
                            hide-details hide-selected item-text="name_ar" item-value="id"
                            label="ابحث بالمسمى الوظيفي" solo>
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title>
                    أبحث عن
                    <strong>القسم</strong>
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template v-slot:selection="{ attr, on, item, selected }">
                <v-chip v-bind="attr" :input-value="selected" color="primary" class="white--text" v-on="on">
                  <span v-text="item.name_ar"></span>
                </v-chip>
              </template>
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name_ar"></v-list-item-title>
                </v-list-item-content>
              </template>

            </v-autocomplete>
          </div>
          <div class="form-group" style="text-align: right;margin-bottom: 1rem!important;">
            <v-autocomplete v-model="city" :items="cities"
                            :loading="isLoadingCity" :search-input.sync="filterCat" chips clearable @change="filter_filters('city' , 1)"
                            hide-details hide-selected item-text="name_ar" item-value="id"
                            label="المدينة" solo>
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      أبحث عن
                      <strong>المدينة</strong>
                    </v-list-item-title>
                  </v-list-item>
                </template>
                <template v-slot:selection="{ attr, on, item, selected }">
                  <v-chip v-bind="attr" :input-value="selected" color="primary" class="white--text" v-on="on">
                    <span v-text="item.name_ar"></span>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name_ar"></v-list-item-title>
                  </v-list-item-content>
                </template>

            </v-autocomplete>
          </div>
          <div class="form-group" style="text-align: right;">
            <v-radio-group v-model="job_type" row dark>
              <v-radio  v-for="jobType in job_types" :label="jobType.name_ar" :value="jobType.id" :key="'j'+jobType.id"></v-radio>
            </v-radio-group>
          </div>
          <v-btn color="submit"  @click="getJobs()">شغلني</v-btn>
        </form>
      </div>
    </div>
</template>
<script>

  export default {
    name: 'HomeBanner',

    props: {
      validateForm: Boolean
    },
    data() {
      return {
        categories: [],
        cities: [],
        job_types: [],
        isLoadingCity: false,
        isLoadingTitle: false,
        filterCity: '',
        filterCat: '',
        city: '',
        title: '',
        job_type: '',
        validation_message: '',
        error_type: 'success',
        message: false,
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

      }
    },
    mounted() {
      this.getJobTypes();
    },
    watch: {
      filterCity(val) {
        this.isLoadingCity = true
        this.get_filter('city')
        this.$forceUpdate()
      },
      filterCat(val) {
        this.isLoadingTitle = true
        this.get_filter('category')
        this.$forceUpdate()
      },
    },
    methods: {
      get_filter(model) {
        this.city ? this.form.searchCity = [this.city] : null
        this.title ? this.form.searchCat = [this.title] : null
        let data = this.form;
        data.get_filters = 1;
        data.filterType = model;
        this.$axios.get("/filter/jobs", { params: data }).then((response) => {
          let data = response.data;
          if (model === "category") {
            this.categories = data;
            this.isLoadingTitle = false
          } else if (model === "city") {
            this.cities = data;
            this.isLoadingCity = false
          }
        });
      },
      filter_filters(model, level) {
        this.city ? this.form.searchCity = [this.city] : null
        this.title ? this.form.searchCat = [this.title] : null
        let data = this.form;
        data.get_filters = 1;
        data.filterType = model;
        data.filterLevel = level;
        this.$axios.get("/filter/jobs", { params: data }).then((response) => {
          let data = response.data;
          this.categories = data.categories ? data.categories : this.categories;
          this.cities = data.cities ? data.cities : this.cities;
          this.isLoadingTitle = false
          this.isLoadingCity = false
        });
      },
      getJobTypes() {
        this.$axios.get('/resource/jobType').then(res => {
          this.job_types = res.data
        })
      },
      getJobs() {
        if (this.city || this.title || this.job_type) {
          this.validation_message = ''
          this.$router.push('/jobs?category='+this.title+'&city='+this.city+'&job_type='+this.job_type)
        } else {
          this.message = true;
          this.error_type = 'success';
          this.error_message = 'هذه الحقول مطلوبة للبحث';
        }
      },
    }
  }
</script>
