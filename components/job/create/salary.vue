<template>
  <div>
    <v-form ref="salaryForm" v-model="valid">
      <div class="form-post-job">
        <h2>الراتب</h2>

        <v-row class="form-group">
          <v-col md="8" cols="12">
            <v-row class="d-flex align-items-baseline text-right">
              <v-col md="4" cols="12">
                <label for="" class="label-form">متوسط الراتب الأساسى</label>
              </v-col>
              <v-col md="8" cols="12" class="d-flex flex-row">
                <v-row>
                  <v-col md="6" sm="6" cols="12">
                    <v-text-field
                      dense
                      v-model="min_salary"
                      outlined
                      :rules="[
                        (v) => !!v || 'الحد الأدنى مطلوب',
                        (v) =>
                          v >= 2000 || 'الحد الأدنى يجب أن يكون أكثر من 2000',
                      ]"
                      type="number"
                      label="الحد الأدنى"
                      required
                    />
                  </v-col>

                  <v-col md="6" sm="6" cols="12">
                    <v-text-field
                      dense
                      v-model="max_salary"
                      outlined
                      :rules="[
                        (v) => !!v || 'الحد الأقصى مطلوب',
                        (v) =>
                          v >= 2000 || 'الحد الأدنى يجب أن يكون أكثر من 2000',
                        (v) =>
                          v <= 1000000 || 'الحد الأقصى يجب أن يكون أقل من 1000000',
                      ]"
                      type="number"
                      label="الحد الأقصى"
                      required
                    />
                  </v-col>

                  <v-col md="6" sm="6" cols="12">
                    <v-select
                      dense
                      :items="currencies"
                      v-model="currency"
                      :rules="[(v) => !!v || 'العملة مطلوبة']"
                      label="العملة"
                      outlined
                      item-value="id"
                      item-text="name_ar"
                      required
                    ></v-select>
                  </v-col>

                  <v-col md="6" sm="6" cols="12">
                    <v-select
                      dense
                      :items="salary_periods"
                      v-model="salary_period"
                      label="المدة"
                      :rules="[(v) => !!v || 'المدة مطلوبة']"
                      outlined
                      item-value="id"
                      item-text="name_ar"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="8" cols="12">
            <v-row class="d-flex align-items-baseline text-right">
              <v-col md="4" cols="12">
                <label for="" class="label-form"
                  >ادخل الراتب الإضافى حوافز او عمولات</label
                >
              </v-col>
              <v-col md="8" cols="12" class="d-flex flex-row">
                <v-row>
                  <v-col md="6" sm="6" cols="12">
                    <v-text-field
                      dense
                      v-model="min_commission"
                      outlined
                      type="number"
                      label="الحد الأدنى"
                    />
                  </v-col>
                  <v-col md="6" sm="6" cols="12">
                    <v-text-field
                      dense
                      v-model="max_commission"
                      outlined
                      type="number"
                      label="الحد الأقصى"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="form-group">
          <v-col md="6" cols="12">
            <v-row class="d-flex align-items-baseline text-right">
              <v-col md="12" cols="12">
                <div class="experience">
                  <label class="radio-inline">
                    <input type="checkbox" v-model="show_salary" />
                    إظهر الراتب الأساسى فى إعلان الوظيفة
                  </label>
                </div>
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
      currencies: [],
      valid: false,
      message: "",
      status: "",
      business_categoriesData: [],
      min_salary: "",
      max_salary: "",
      currency: 0,
      salary_period: "daily",
      show_salary: "",
      min_commission: "",
      max_commission: "",
      salary_periods: [
        {
          id: "daily",
          name_ar: "كل يوم",
        },
        {
          id: "monthly",
          name_ar: "كل شهر",
        },
      ],
    };
  },
  watch: {
    validateForm() {
      if (this.$refs.salaryForm.validate()) {
        this.$emit("SalaryValidated", true);
      } else {
        this.$emit("SalaryValidated", false);
      }
    },
  },
  mounted() {
    this.getCurrencies();
  },
  methods: {
    getCurrencies(resourceName, type) {
      this.$axios.get("/resource/currency").then((response) => {
        this.currencies = response.data;
      });
    },
  },
};
</script>
<style>
.error-modal {
  left: -450px !important;
  float: right;
}
</style>
