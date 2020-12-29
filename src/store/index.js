import {createStore, createLogger} from 'vuex';
import questions from './modules/questions';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {questions},
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
