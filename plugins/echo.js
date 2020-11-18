import Echo from '@nuxtjs/laravel-echo';

const echo = {};

echo.install = function (Vue) {
  Vue.prototype.$pusher = require('pusher-js');
  Vue.prototype.$echo = new Echo({
    authEndpoint: 'http://your-domain.test/api/broadcasting/auth',
    broadcaster: 'pusher',
    key: 'your-key',
    encrypted: true,
  });
};
