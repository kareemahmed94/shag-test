import colors from 'vuetify/es5/util/colors'
const dev = process.env.NODE_ENV !== 'production'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

  // Global page headers (https://go.nuxtjs.dev/config-head)
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
        content:  "https://i.ibb.co/ZfBByL2/Shaghalni-Preview-Image.png",
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
        content:  "https://i.ibb.co/ZfBByL2/Shaghalni-Preview-Image.png",
      },
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: 'https://i.ibb.co/T08c7RK/shaghalni-fav.png'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap'},
      {rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'}
    ],
  },
  loading: {color: '#fff'},

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~/assets/css/theme.css",
    "~/assets/css/custom.css",
    "~/assets/css/theme-sections.css",
    "~/assets/css/bootstrap.css",
    'vue-slick-carousel/dist/vue-slick-carousel.css'
  ],
  
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: './plugins/vue-slick-carousel.js'},
    {src: '~plugins/hotjar.js', mode: 'client'},
    {src: '~plugins/ga.js', mode: 'client'},
    { src: '~/plugins/amplify.js', mode: 'client' }

  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/gtm',
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
    id: 'GTM-TM8ZL85', // Used as fallback if no runtime config is provided
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

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  axios: {
    baseURL: dev ? process.env.BASE_URL || "http://127.0.0.1:8000/api/" : process.env.BASE_URL || "https://api.shaghalni.com/api/",
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    StorageUrl: process.env.StorageUrl || 'https://s3-cdn.shaghalni.com/'
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

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['@nuxtjs/auth'],
    /*
    ** You can extends webpack config here
    */
    extend(config, ctx) {
    }
  }
}
