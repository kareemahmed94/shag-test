<template>
  <div>
    <v-form ref="basicInfoForm" v-model="valid">
      <div class="form-post-job">
        <h2>بيانات الوظيفة الأساسية</h2>
        <v-row class="form-group">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="name_en" class="label-form">اسم الوظيفة</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  dense
                  v-model="job_name"
                  label="اسم الوظيفة عربي"
                  :rules="[(v) => !!v || 'اسم الوظيفة مطلوب']"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>

          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="category" class="label-form">مجال الوظيفة</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="categories"
                  v-model="category"
                  :rules="[(v) => !!v || 'مجال الوظيفة مطلوب']"
                  label="مجال الوظيفة"
                  outlined
                  item-value="id"
                  item-text="name_ar"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group"
          v-for="(address, index) in addresses"
          :key="index">
          <v-col md="5" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="city" class="label-form">المحافظة</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="cities"
                  v-model="address.city"
                  :rules="[(v) => !!v || 'المحافظة مطلوبة']"
                  label="المحافظة"
                  outlined
                  required
                  item-value="id"
                  item-text="name_ar"
                  @change="cityUpdateSelect(index)"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>

          <v-col md="5" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="area" class="label-form">المنطقة</label>
              </v-col>

              <v-col md="8" cols="12">
                <v-select
                  dense
                  :items="address.areas"
                  v-model="address.area"
                  label="المنطقة"
                  outlined
                  item-value="id"
                  item-text="name_ar"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>

          <v-col md="2" cols="12" class="mt-4" v-if="index === 0">
            <v-btn small @click="addAddress" class="add-button" color="success">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col md="2" cols="12" class="mt-4" v-else>
            <v-btn
              small
              @click="removeAddress(index)"
              class="add-button"
              color="error"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="employees_number" class="label-form"
                  >عدد الموظفين
                </label>
              </v-col>
              <v-col md="8" cols="12">
                <v-text-field
                  dense
                  v-model="employees_number"
                  outlined
                  :rules="[(v) => !!v || 'عدد الموظفين مطلوب']"
                  type="number"
                  required
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="" class="label-form">مواعيد العمل</label>
              </v-col>
              <v-col md="8" cols="12">
                <v-radio-group
                  v-model="shift_type"
                  :rules="[(v) => !!v || 'مواعيد العمل مطلوبة']"
                  required
                >
                  <v-row>
                    <v-col
                      md="4"
                      sm="6"
                      cols="12"
                      v-for="shiftType in shift_types"
                      :key="shiftType.id"
                    >
                      <label
                        :for="'st' + shiftType.id"
                        class="radio-label"
                        v-bind:class="{ active: shift_type == shiftType.id }"
                        @click="shift_type = shiftType.id"
                        >{{ shiftType.name_ar }}</label
                      >
                      <v-radio
                        :id="'st' + shiftType.id"
                        :value="shiftType.id"
                        class="radio-btn"
                      ></v-radio>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-baseline">
              <v-col md="3" cols="12">
                <label for="job_details" class="label-form"
                  >تفاصيل الوظيفة</label
                >
              </v-col>
              <v-col md="8" cols="12">
                <v-textarea
                  dense
                  outlined
                  name="input-7-4"
                  label="تفاصيل الوظيفة"
                  v-model="job_details"
                >
                </v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  props: {
    validateForm: Boolean,
  },
  data() {
    return {
      cities: [],
      areas: [],
      categories: [],
      shift_types: [],
      areasData: [],
      message: "",
      status: "",
      categoriesData: [],
      job_name: "",
      employees_number: "",
      company_name_ar: "",
      shift_type: "",
      addresses: [
        {
          city: "",
          area: "",
          areas: [],
        },
      ],
      city: [],
      area: [],
      valid: false,
      company_size: "",
      job_details: "",
      category: "",
    };
  },
  watch: {
    validateForm() {
      if (this.$refs.basicInfoForm.validate()) {
        this.$emit("BasicInfoValidated", true);
      } else {
        this.$emit("BasicInfoValidated", false);
      }
    },
  },
  mounted() {
    this.getCities();
    this.getCategories();
    this.getShiftTypes();
  },
  methods: {
    getResource(resourceName, type) {
      this.$axios
        .get("/resource/" + resourceName, { params: { type: type } })
        .then((response) => {
          return response.data;
        });
    },
    getCities() {
      this.$axios.get("/resource/city").then((response) => {
        this.cities = response.data;
      });
    },
    getCategories() {
      this.$axios.get("/resource/category").then((response) => {
        this.categories = response.data;
      });
    },
    getShiftTypes() {
      this.$axios.get("/resource/shiftType").then((response) => {
        this.shift_types = response.data;
      });
    },
    addAddress() {
      this.addresses.push({
        city: "",
        area: "",
        areas: [],
      });
    },
    removeAddress(index) {
      this.addresses.splice(index, 1);
    },

    cityUpdateSelect(index) {
      this.$axios.get("/resource/area").then((response) => {
        this.addresses[index].areas = response.data.filter(
          (area) => area.city_id == this.addresses[index].city
        );
      });
    },
  },
};
</script>

<style scoped>
.add-button {
  border-radius: 15px;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
}
.form-group {
  margin-right: 0;
  text-align: right;
}
</style>


