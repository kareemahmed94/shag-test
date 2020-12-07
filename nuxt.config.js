import colors from 'vuetify/es5/util/colors'

const dev = process.env.NODE_ENV !== 'production'

export default {
  telemetry: false,
  debug: true,
  /*
  ** Headers of the page
  */
  head: {
    title: 'شغلني' || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || "احدث فرص عمل من كبرى الشركات في مصر."
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:site",
        name: "twitter:site",
        content: "@Shaghalni",
      },
      {
        hid: "twitter:creator",
        name: "twitter:creator",
        content: "@Shaghalni",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "شغلني - Shaghalni",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "احدث فرص عمل من كبرى الشركات في مصر.",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://i.ibb.co/ZfBByL2/Shaghalni-Preview-Image.png",
      },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: "شغلني - Shaghalni",
      },
      {
        hid: "og:title",
        name: "og:title",
        content: "Shaghalni",
      },
      {
        hid: "og:type",
        name: "og:type",
        content: "website",
      },
      {
        hid: "og:description",
        name: "og:description",
        content: "احدث فرص عمل من كبرى الشركات في مصر.",
      },
      {
        hid: "og:url",
        name: "og:url",
        content: "https://shaghalni.com/",
      },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://i.ibb.co/ZfBByL2/Shaghalni-Preview-Image.png",
      },
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: 'https://i.ibb.co/T08c7RK/shaghalni-fav.png'},
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    "~/assets/css/theme.css",
    "~/assets/css/custom.css",
    "~/assets/css/theme-sections.css",
    "~/assets/css/bootstrap.css",
    'vue-slick-carousel/dist/vue-slick-carousel.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: './plugins/vue-slick-carousel.js'},
    {src: '~plugins/hotjar.js', mode: 'client'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    '@aceforth/nuxt-optimized-images',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/gtm',
    ['@nuxtjs/google-gtag', { id: 'UA-57896372-1' }],
    ['nuxt-facebook-pixel-module', {
      /* module options */
      track: 'PageView',
      pixelId: '1342993099425955',
      disabled: false
    }],
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxtjs/device'
    // ['@nuxtjs/laravel-echo', {
    //   authEndpoint: dev ? 'http://127.0.0.1:8000/broadcasting/auth' : 'https://api.shaghalni.com/broadcasting/auth',
    //   auth: {
    //     headers: {
    //       'Accept': 'application/json, text/plain, */*',
    //       'Accept-Language': 'en-US,en;q=0.9',
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Methods': '*',
    //       'Access-Control-Allow-Headers': '*',
    //       'Cache-Control': 'no-cache',
    //       'Pragma': 'no-cache',
    //     },
    //   },
    //   authHost: dev ? 'http://127.0.0.1:8000' : 'https://api.shaghalni.com',
    //   authModule: true,
    //   broadcaster: 'pusher',
    //   key: '599871ac7a807111bc50',
    //   encrypted: true,
    //   cluster: 'eu',
    // }]
  ],
  gtm: {
    id: 'GTM-T377PM8', // Used as fallback if no runtime config is provided
  },
  optimizedImages: {
    inlineImageLimit: 500,
    imagesName: ({dev}) => dev ? '[path][name][hash:optimized].[ext]' : 'img/[contenthash:7].[ext]',
    responsiveImagesName: ({dev}) => dev ? '[path][name]--[width][hash:optimized].[ext]' : 'img/[contenthash:7]-[width].[ext]',
    handleImages: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: true,
    optimizeImagesInDev: false,
    defaultImageLoader: 'img-loader',
    mozjpeg: {
      quality: 80,
    },
    optipng: {
      optimizationLevel: 3,
    },
    pngquant: false,
    gifsicle: {
      interlaced: true,
      optimizationLevel: 3,
    },
    svgo: {
      // enable/disable svgo plugins here
    },
    webp: {
      preset: 'default',
      quality: 75,
    },
  },
  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  /*
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: dev ? process.env.BASE_URL || "http://127.0.0.1:8000/api/" : process.env.BASE_URL || "https://api.shaghalni.com/api/",
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    StorageUrl: process.env.StorageUrl || 'https://shaghalni.s3.eu-central-1.amazonaws.com/'
  },
  auth: {
    redirect: false,
    strategies: {
      job_seeker: {
        _scheme: 'local',
        endpoints: {
          login: {url: '/auth/job_seeker', method: 'post', propertyName: 'token'},
          logout: {url: '/auth/logout', method: 'post'},
          user: {url: '/user', method: 'get', propertyName: 'data'}
        },
      },
      employer: {
        _scheme: 'local',
        endpoints: {
          login: {url: '/auth/employer', method: 'post', propertyName: 'token'},
          logout: {url: '/auth/logout', method: 'post'},
          user: {url: '/user', method: 'get', propertyName: 'data'}
        },
      },
    },
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    rtl: true,
    icons: {
      iconfont: 'fas',
    },
    theme: {
      light: true,
      dark: false,
      themes: {
        light: {
          primary: '#00796b',
          secondary: '#b0bec5',
          anchor: '#00796b',
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: ['@nuxtjs/auth'],
    /*
    ** You can extends webpack config here
    */
    extend(config, ctx) {
    }
  }
}
