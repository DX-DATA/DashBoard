import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import router from './router';
import elecarRouter from './router/index'
import App from './App.vue';

library.add(fas);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router, elecarRouter).mount('#app');
