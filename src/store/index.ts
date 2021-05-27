import { createStore, createLogger } from 'vuex';
import questions from './modules/questions';
import categories from './modules/categories';

const debug = process.env.NODE_ENV !== 'production';

export default createStore( {
  modules: { questions, categories },
  strict: debug,
  plugins: debug ? [ createLogger() ] : [],
} );
