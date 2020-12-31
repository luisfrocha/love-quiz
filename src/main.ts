import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import messages from './assets/i18nMessages';
import store from './store';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import './assets/main.scss';
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/fluent-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp( App );
const i18n = createI18n( { legacy: false, locale: 'en', fallbackLocale: 'es', messages } );

app.use( PrimeVue, { ripple: true } );
app.use( ToastService );
app.use( i18n );
app.use( store );

app.mount( '#app' );
