<template>
  <div class="reviews">
    <hr />
    <h1>آراء عملائنا</h1>
    <VueSlickCarousel :arrows="true" v-bind="reviewsOptions" ref="slick">
      <template #prevArrow="arrowOption">
        <div style="position: absolute; top: -60px; left: 0px" class="custom-arrow">
          <v-btn icon color="#0e4168">
            <v-icon>{{icons.mdiArrowLeft}}</v-icon>
          </v-btn>
        </div>
      </template>
      <template #nextArrow="arrowOption">
        <div style="position: absolute; top: -60px; left: 50px" class="custom-arrow">
          <v-btn icon color="#0e4168">
            <v-icon>{{icons.mdiArrowRight}}</v-icon>
          </v-btn>
        </div>
      </template>
      <div>
        <div class="reviews-slider" style="width: 100%!important;">
          <div class="slider-content-reviews">
            <div class="row">
              <v-col md="3" cols="12" style="text-align: center;">
                <img
                  class="img-border company-logo"
                  src="https://shaghalni.s3.eu-central-1.amazonaws.com/2018/04/Aman-2-120x120.png?webp"
                />
                <div class="reviews-rate">
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                </div>
              </v-col>
              <v-col md="9" cols="12">
                <div class="reviews-body">
                  <h4>مريم نزيه سرور, أخصائي موارد بشرية - شركة أمان</h4>
                  <v-row class="reviews-desc">
                    <v-col md="1" cols="12" class="mt-0">
                      <span class="right-quotes ma-0">“</span>
                    </v-col>
                    <v-col md="10" cols="12">
                      <p>
                        موقع شغلني واحد من أفضل المواقع التي تستطيع أن تبحث بقاعدة بياناتها عن راغبي العمل من
                        العمالة اليدوية وغير اليدوية ، كنا نواجه مشكلة في تعيين موظفي مبيعات خارجية ووجدنا العديد من
                        السير الذاتية التي تتوافق مع متطلباتنا في قاعدة بيانات موقع شغلني. البحث سهل جدا ومفيد لأنه
                        يوفر الوقت من خلال فلتر البحث. راغبي العمل المسجلين بالموقع جيدين جداً وما يكتب في ملفاتهم
                        الشخصية دقيق للغاية. زادت نسبة التوظيف بعد استخدامنا لموقع شغلني. نحن نستخدمه الآن بشكل أساسي
                        للعثور على إحتياجاتنا من الموظفين، ليس فقط ممثلي المبيعات الخارجية ولكن أيضًا مع الوظائف
                        الأخرى مثل أمناء المخازن، ومحاسبي الفواتير، والسعاة
                      </p>
                    </v-col>
                    <v-col md="1" cols="12" style="position: absolute; bottom: 0; left: 0;">
                      <span class="left-quotes ma-0">“</span>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="reviews-slider" style="width: 100%!important;">
          <div class="slider-content-reviews">
            <div class="row">
              <v-col md="3" cols="12" style="text-align: center;">
                <img
                  class="img-border company-logo"
                  src="https://shaghalni.s3.eu-central-1.amazonaws.com/2018/05/Spinneys-120x120.png"
                />
                <div class="reviews-rate">
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                </div>
              </v-col>
              <v-col md="9" cols="12">
                <div class="reviews-body">
                  <h4>رباب حسين, كبير أخصائيي التوظيف - سبينيس مصر</h4>
                  <v-row class="reviews-desc">
                    <v-col md="1" cols="12" class="mt-0">
                      <span class="right-quotes ma-0">“</span>
                    </v-col>
                    <v-col md="10" cols="12">
                      <p>
                        موقع شغلني هو مصدر موثوق للحصول على راغبي العمل خاصة من العمالة اليدوية، مع تأثير واسع وقوي
                        عند نشر إعلان التوظيف، ولديه محرك بحث بسيط وسهل الاستخدام. شكر خاص لفريق موقع شغلني لدعمهم
                        المستمر.
                      </p>
                    </v-col>
                    <v-col md="1" cols="12" style="position: absolute; bottom: 0; left: 0;">
                      <span class="left-quotes ma-0">“</span>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="reviews-slider" style="width: 100%!important;">
          <div class="slider-content-reviews">
            <div class="row">
              <v-col md="3" cols="12" style="text-align: center;">
                <img
                  class="img-border company-logo"
                  src="https://shaghalni.s3.eu-central-1.amazonaws.com/2018/09/saal-120x120.png"
                />
                <div class="reviews-rate">
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                  <img class="rate-star" src="~/assets/img/icons/star-ful.svg" />
                </div>
              </v-col>
              <v-col md="9" cols="12">
                <div class="reviews-body">
                  <h4>هبة طلعت, نائب الرئيس التنفيذي - SAAL Invest Co.</h4>
                  <v-row class="reviews-desc">
                    <v-col md="1" cols="12" class="mt-0">
                      <span class="right-quotes ma-0">“</span>
                    </v-col>
                    <v-col md="10" cols="12">
                      <p>
                        نحن نعلم جميعا مدى صعوبة العثور على المرشحين لوظائفك الشاغرة. لقد تأثرت عند استخدام خدمات
                        موقع شغلني. موقع شغلني كان مفيدا جدا وفعالا في العثور على المرشحين الذين نبحث عنهم. لقد قدموا
                        المساعدة والدعم من البداية إلى النهاية. أوصي بشدة للشركات الأخرى باستخدام خدمات موقع شغلني. هم
                        على مستوى التحدي.
                      </p>
                    </v-col>
                    <v-col md="1" cols="12" style="position: absolute; bottom: 0; left: 0;">
                      <span class="left-quotes ma-0">“</span>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </div>
          </div>
        </div>
      </div>
    </VueSlickCarousel>
    <hr />
  </div>
</template>
<script>
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";

export default {
  name: "testimonials",
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiArrowRight,
      },
      reviewsOptions: {
        dots: false,
        arrows: false,
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
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

      sample_slider: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
};
</script>
