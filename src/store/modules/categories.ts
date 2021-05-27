// initial state
// shape: [{ id, quantity }]
const state = {
  categories: [
    {
      category: "a",
      text: {
        en: "Words of Affirmation",
        es: "Palabras de Ratificación"
      }
    },
    {
      category: "b",
      text: {
        en: "Quality Time",
        es: "Tiempo de Calidad"
      }
    },
    {
      category: "c",
      text: {
        en: "Receiving Gifts",
        es: "Recibir Regalos"
      }
    },
    {
      category: "d",
      text: {
        en: "Acts of Service",
        es: "Actos Serviciales"
      }
    },
    {
      category: "e",
      text: {
        en: "Physical Touch",
        es: "Contacto Físico"
      }
    }
  ],
};

export interface CategoryLabels {
  en: string;
  es: string;
}

type CategoryType = 'a' | 'b' | 'c' | 'd' | 'e';

export interface Category {
  category: CategoryType;
  text: CategoryLabels;
}

export interface CategoryTotal {
  cat: string;
  total: number;
}

interface State {
  categories: Category[];
}
// getters
const getters = {
  categories: ( state: State ) => state.categories,
};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
