<template>
  <div
    id="app"
    class="app-grid"
  >
    <HeaderComponent />
    <div class="app-container p-px-3">
      <h3 v-if="currQuestion !== questions.length">
        {{ t("description") }}
      </h3>
      <steps
        v-if="false"
        v-model="items"
      />
      <div
        v-if="currQuestion !== questions.length"
        class="p-text-center"
      >
        <chips
          v-model="header"
          :disabled="true"
          class="p-text-center header-chip"
        />
      </div>
      <divider
        v-if="currQuestion !== questions.length"
        align="center"
        class="p-my-3"
      />
      <template
        v-for="(question, index) in questions"
        :key="`${index}`"
      >
        <card v-if="currQuestion !== questions.length && index === currQuestion">
          <template #content>
            <div class="p-grid">
              <div
                class="p-col-12 p-lg-6"
                v-for="(option, index2) in question"
                :key="`${String(index2)}`"
              >
                <card
                  :class="{
                    selected: answers[currQuestion] === option.category,
                  }"
                  class="d-flex align-center pa-5"
                  @click="toggleSelection(option)"
                >
                  <template
                    #content
                    :class="{
                      headline: answers[currQuestion] === option.category,
                    }"
                  >
                    {{ option.text[locale] }}
                  </template>
                </card>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="p-grid">
              <div class="p-col">
                <p-button
                  v-if="currQuestion !== 0"
                  color="success"
                  small
                  @click="showPreviousQuestion"
                >
                  {{ t("previous") }}
                </p-button>
              </div>
              <div class="p-col" />
              <div class="p-col p-text-right">
                <p-button
                  :disabled="!optionSelected"
                  color="success"
                  small
                  @click="showNextQuestion"
                >
                  {{ t("next") }}
                </p-button>
              </div>
            </div>
          </template>
        </card>
      </template>
      <card
        v-if="currQuestion === questions.length"
        class="p-shadow-4 p-mt-3"
      >
        <template #content>
          <apexchart
            :options="chartOptions"
            :series="series"
            type="pie"
            width="100%"
            height="300"
          />
        </template>
        <template #header>
          <p-button
            @click="resetTest"
            class="p-m-2 p-button-sm"
          >
            {{ t("startOver") }}
          </p-button>
        </template>
      </card>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watchEffect } from 'vue';
  import { useStore } from 'vuex';
  import { useI18n } from 'vue-i18n';
  import { Category, CategoryTotal } from './store/modules/categories';
  import { Answer, Question } from './store/modules/questions';
  import Card from 'primevue/card';
  import Chips from 'primevue/chips';
  import Divider from 'primevue/divider';
  import HeaderComponent from './components/HeaderComponent.vue';
  import PButton from 'primevue/button';
  import Steps from 'primevue/steps';

  export default defineComponent( {
    name: 'App',
    components: {
      Card,
      Chips,
      Divider,
      HeaderComponent,
      PButton,
      Steps,
    },
    setup () {
      const { t, locale } = useI18n();
      const store = useStore();
      const answers = computed( () => store.state.questions.answers );
      const currQuestion = computed( () => store.state.questions.currQuestion );
      const questions = computed( () => store.state.questions.questions );
      const categories = computed( () => store.state.categories.categories );
      const header = computed( () => [ `${ t( 'question' ) } ${ currQuestion.value + 1 } ${ t( 'of' ) } ${ questions.value.length }` ] );
      const text = ref( 'Prime' );
      const message = ref( null );
      const optionSelected = computed( () => !!answers.value[ currQuestion.value ] );
      watchEffect(() => {
        document.title = locale.value === 'en' ? 'Five Love Language Test' : 'Prueba de Cinco Lenguajes de Amor';
      })
      const showNextQuestion = () => {
        store.commit( 'questions/nextQuestion' );
      };
      const showPreviousQuestion = () => {
        store.commit( 'questions/previousQuestion' );
      };
      const toggleSelection = async ( option: Answer ) => {
        store.commit( 'questions/setAnswer', { question: currQuestion.value, answer: option.category } );
        setTimeout( () => { showNextQuestion(); }, 300 );
      };
      const resetTest = () => {
        store.commit( 'questions/resetQuiz' );
      };

      const catTotals = computed(
        () => categories.value
          .map( ( cat: Category ) => cat.category )
          .map( ( cat: string ) => ( {
            cat: t( `categories.${ cat }` ),
            total: answers.value.filter( ( answer: string ) => answer === cat ).length,
          } ) )
          .sort( ( a: CategoryTotal, b: CategoryTotal ) => b.total - a.total ) );

      const series = computed( () => catTotals.value.map( ( entry: CategoryTotal ) => entry.total ) );
      const chartOptions = computed( () => ( {
        chart: {
          type: 'donut',
        },
        colors: [ '#8d528f', '#bfa0bf', '#f1f1f1', '#b3e9b7', '#68de7e' ],
        dataLabels: {
          enabled: true,
          formatter: function ( val: any, opts: { w: { globals: { labels: { [ x: string ]: any; }; }; }; seriesIndex: string | number; } ) {
            return opts.w.globals.labels[ opts.seriesIndex ];
          },
          style: {
            fontSize: '0.9em',
            colors: [ '#b3e9b7', '#68de7e', '#8d528f', '#8d528f', '#b3e9b7' ]
          }
        },
        tooltip: {
          enabled: false,
        },
        labels: catTotals.value.map( ( entry: CategoryTotal ) => `${ entry.cat } - ${ entry.total }` ),
        responsive: [ {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        } ],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 230,
        }
      } ) );

      const items = computed(
        (): string[] => store.state.questions.questions.map(
          ( item: Question, index: number ) => ( { label: `${ index + 1 }` } )
        )
      );

      return {
        answers,
        categories,
        chartOptions,
        currQuestion,
        header,
        items,
        locale,
        message,
        optionSelected,
        questions,
        resetTest,
        series,
        showNextQuestion,
        showPreviousQuestion,
        store,
        text,
        toggleSelection,
        t,
      };
    }
  } );
</script>

<style lang="scss" scoped>
  .p-steps .p-steps-item:before {
    margin-top: inherit;
  }
  .p-card.selected {
    background-color: var(--primary-color);
    color: white;
    transition: all 250ms;
  }
  .p-shadow-4 {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12) !important;
  }
  .header-chip {
    :deep {
      .p-inputtext {
        background-color: transparent !important;
        border-color: transparent !important;
        .p-chips-input-token {
          display: none;
        }
        .p-chips-token {
          margin-right: inherit;
          .pi-times-circle {
            display: none;
          }
        }
      }
    }
  }
  .p-divider-horizontal {
    display: -webkit-inline-flex;
    &.p-divider-solid {
      &::before {
        border-top-style: solid !important;
      }
    }
  }
</style>
