import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import messages from './assets/i18nMessages';
import store from './store';

const app = createApp( App );

app.use( store );

const i18n = createI18n( { legacy: false, locale: 'en', fallbackLocale: 'es', messages } );
app.use( i18n );

import PrimeVue from 'primevue/config';
// import ToastService from 'primevue/toastservice';

import './assets/main.scss';
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/fluent-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

app.use( PrimeVue, { ripple: true } );
// app.use( ToastService );

import VueApexCharts from 'vue3-apexcharts';
app.use( VueApexCharts );

app.mount( '#app' );
