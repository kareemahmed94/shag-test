<template>
  <v-card class="col-md-12">
    <v-card-text>
      <v-row>
        <v-col md="3" cols="12">
          <label class="label-form">اسم الشركة:</label>
        </v-col>
        <v-col md="8" cols="12">
          <v-text-field
            id="company-name"
            dense
            v-model="prevExperienceData.companyName"
            outlined
            :rules="[(v) => !!v || 'الإسم الأول مطلوب',]"
            label="أسم الشركة"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col md="3" cols="12">
          <label class="label-form">الوظيفة:</label>
        </v-col>
        <v-col md="8" cols="12">
          <v-text-field
            id="job-role"
            dense
            v-model="prevExperienceData.jobRole"
            outlined
            :rules="[(v) => !!v || 'الإسم الأول مطلوب',]"
            label="المسمي الوظيفي"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col md="3" cols="12">
          <label class="label-form">مدة العمل:</label>
        </v-col>
        <v-col md="4" cols="12">
          <v-menu
            ref="from_menu"
            v-model="from_menu"
            :close-on-content-click="false"
            :return-value.sync="prevExperienceData.from"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                dense
                v-model="prevExperienceData.from"
                label="من"
                outlined
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="ar"
              v-model="prevExperienceData.from"
              :reactive="true"
              :flat="true"
              :show-current="true"
              :type="'date'"
              @change="$refs.from_menu.save(prevExperienceData.from)"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col md="4" cols="12">
          <v-menu
            ref="to_menu"
            v-model="to_menu"
            :close-on-content-click="false"
            :return-value.sync="prevExperienceData.to"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                dense
                v-model="prevExperienceData.to"
                label="الي"
                outlined
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-checkbox
              background-color="white"
              v-model="prevExperienceData.to_now"
              @change="change_to_value(prevExperienceData.to_now)"
              label="حتى الآن"
            ></v-checkbox>
            <v-date-picker
              v-if="show_to_date"
              locale="ar"
              v-model="prevExperienceData.to"
              :reactive="true"
              :flat="true"
              :show-current="true"
              :type="'date'"
              @change="$refs.to_menu.save(prevExperienceData.to)"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
/* eslint-disable */
export default {
  name: "Prev-work",
  props: ["prevExperienceData"],
  data() {
    return {
      from_menu: false,
      to_menu: false,
      show_to_date: true,
    };
  },
  mounted() {},
  methods: {
    change_to_value(value) {
      if (value == true) {
        this.show_to_date = false;
        this.$refs.to_menu.save("حتى الآن");
      } else {
        this.prevExperienceData.to = "";
        this.show_to_date = true;
      }
    },
  },
};
</script>
<style>
.b-form-btn-label-control > label {
  text-align: right !important;
}

.prev-work-box hr {
  width: 65%;
}
</style>
