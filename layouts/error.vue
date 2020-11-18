<template>
  <v-app dark>
    <div id="notfound">
      <div class="notfound">
        <div v-if="error.statusCode === 404">
          <div class="notfound-404">
            <h1>{{error.statusCode}}</h1>
          </div>
          <h2>{{ pageNotFound }}</h2>
          <p>الصفحة التي تبحث عنها من الممكن أن يكون تم إزالتها أو تغير الإسم أو غير متاحة مؤقتا
          </p>
          <nuxt-link to="/">العودة للرئيسية</nuxt-link>

        </div>
        <div v-else>
          <div class="notfound-404">
            <h1>{{error.statusCode}}</h1>
          </div>
          <h2>{{ otherError }}</h2>
          <p>حدث عطل فني في الموقع تواصل معنا إذا واجهتك المشكلة مرة أخرى
          </p>
          <nuxt-link to="/">العودة للرئيسية</nuxt-link>
        </div>
        <div class="notfound-social">
          <a href="https://web.facebook.com/ShaghalniOfficial/" target="_blank"><img src="~/assets/img/icons/insta.svg" width="20"/></a>
          <a href="https://twitter.com/Shaghalni" target="_blank"><img src="~/assets/img/icons/twi.svg" width="20"/></a>
          <a href="https://www.instagram.com/shaghalniofficial/" target="_blank"><img src="~/assets/img/icons/insta.svg" width="20"/></a>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
  export default {
    layout: 'empty',
    props: {
      error: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        pageNotFound: 'هذه الصفحة غير موجودة',
        otherError: 'حدثت مشكلة بالموقع'
      }
    },
    head() {
      const title =
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError
      return {
        title
      }
    }
  }
</script>

<style scoped>
  #notfound {
    position: relative;
    height: 100vh;
  }

  #notfound .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .notfound {
    max-width: 767px;
    width: 100%;
    line-height: 1.4;
    text-align: center;
    padding: 15px;
  }

  .notfound .notfound-404 {
    position: relative;
    height: 220px;
  }

  .notfound .notfound-404 h1 {
    font-family: 'Kanit', sans-serif;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 186px;
    font-weight: 200;
    margin: 0px;
    background: #0e4168;
    color:transparent;
    -webkit-background-clip: text;
    background-clip: text;
    text-transform: uppercase;
  }

  .notfound h2 {
    font-size: 33px;
    font-weight: 200;
    text-transform: uppercase;
    margin-top: 0px;
    margin-bottom: 25px;
    letter-spacing: 3px;
    color: #0e4168;

  }


  .notfound p {
    font-family: 'Kanit', sans-serif;
    font-size: 16px;
    font-weight: 200;
    margin-top: 0px;
    margin-bottom: 25px;
  }


  .notfound a {
    font-family: 'Kanit', sans-serif;
    color: #0e4168;
    font-weight: 200;
    text-decoration: none;
    border-bottom: 1px dashed #0e4168;
    border-radius: 2px;
  }

  .notfound-social {
    margin-top: 5%;
  }
  .notfound-social>a {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    width: 40px;
    font-size: 14px;
    color: #0e4168;
    border: 1px solid #efefef;
    border-radius: 50%;
    margin: 3px;
    -webkit-transition: 0.2s all;
    transition: 0.2s all;
    text-align: center;
  }
  .notfound-social>a:hover {
    color: #fff;
    background-color: orange;
    border-color: #0e4168;
  }

  @media only screen and (max-width: 480px) {
    .notfound .notfound-404 {
      position: relative;
      height: 168px;
    }

    .notfound .notfound-404 h1 {
      font-size: 142px;
    }

    .notfound h2 {
      font-size: 22px;
    }
  }

</style>
