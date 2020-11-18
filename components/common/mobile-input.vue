<template>
  <v-row>
    <v-col md="6" class="mobile-container ml-auto mr-auto">
      <v-row>
        <img
          src="../../assets/mobile-mockup.png"
          style="width: 100%; height: 100%; z-index: 999"
        />

        <v-system-bar
          color="white"
          :height="40"
          window
          style="position: absolute; top: 7.5%; right: 10%; width: 80%"
        >
          <!-- <v-icon>mdi-wifi-strength-4</v-icon> -->
          <!-- <v-icon>mdi-signal-cellular-outline</v-icon> -->
          <v-icon>mdi-battery</v-icon>
          <v-spacer></v-spacer>
          <span>12:30</span>
        </v-system-bar>
        <v-system-bar
          color="white"
          :height="100"
          window
          style="position: absolute; top: 15%; right: 10%; width: 80%"
        >
          <v-row class="d-flex flex-column" style="height: 110%">
            <v-row style="height: 25%">
              <v-col md="12" class="d-flex flex-row">
                <v-icon color="blue darken-2" large
                >mdi-information-outline
                </v-icon
                >
                <v-spacer></v-spacer>
                <div class="d-flex flex-column">
                  <v-avatar>
                    <img
                      src="https://s3-cdn.shaghalni.com/shaghalni_icon.png"
                      alt="Shaghalni"
                    />
                  </v-avatar>
                  شغلني
                </div>
                <v-spacer></v-spacer>
                <v-icon color="blue darken-2" large>mdi-chevron-left</v-icon>
              </v-col>
            </v-row>
            <!-- <v-row style="height: 15%">
              <v-col md="12" class="text-center">
                <h6>ahmed</h6>
              </v-col>
            </v-row> -->
          </v-row>
        </v-system-bar>
      </v-row>
      <v-divider
        style="position: absolute; top: 40%; width: 90%"
        class="ml-0 mr-0"
      ></v-divider>
      <div class="speech-bubble" style="position: absolute; top: 50%; right: 20%; width: 70%">
        <v-row class="form-group">
          <v-col md="3" class="text-center">
            شركة
          </v-col>
          <v-col md="3" class="text-center">
            <v-text-field
              v-model="employer_name"
            ></v-text-field>
          </v-col>
          <v-col md="3" class="text-center">
            تطلب
          </v-col>
          <v-col md="3" class="text-center">
            <v-text-field
              v-model="job_title"
            ></v-text-field>
          </v-col>
          <v-col md="3" class="text-center">
            في منطقة
          </v-col>
          <v-col md="3" class="text-center">
            <v-text-field
              v-model="area"
            ></v-text-field>
          </v-col>
          <v-col md="3" class="text-center">
            للمزيد ت:
          </v-col>
          <v-col md="3" class="text-center">
            <v-text-field
              v-model="phone_number"
            ></v-text-field>
          </v-col>

        </v-row>


      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Mobile",
  data() {
    return {
      employer_name : '',
      job_title : '',
      area : '',
      phone_number : '',
    };
  },
};
</script>
<style>
.mobile-container {
  /* z-index: 9999; */
  /* background-color: red; */
  /* background-image: url(); */
  background-size: 100% 100%;
  height: auto;
}

.speech-bubble {
  z-index: 999;
  position: relative;
  background: rgb(242, 244, 245);
  border-radius: 0.4em;
  padding: 5%;
}

.speech-bubble:after {
  content: "";
  position: absolute;
  bottom: 4%;
  left: 15%;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-top-color: rgb(242, 244, 245);
  border-bottom: 0;
  border-left: 0;
  margin-left: -13.5px;
  margin-bottom: -27px;
}
</style>
