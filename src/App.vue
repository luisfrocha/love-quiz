<template>
  <div id="app" class="app-grid">
    <header-component />
    <div class="app-container p-px-3">
      <h3 v-if="currQuestion !== questions.length">
        {{ t("description") }}
      </h3>
      <steps v-if="false" v-model="items"></steps>
      <div v-if="currQuestion !== questions.length" class="p-text-center">
        <chip class="p-text-center">
          {{
            `${t("question")} ${currQuestion + 1} ${t("of")} ${
              questions.length
            }`
          }}
        </chip>
      </div>
      <divider v-if="currQuestion !== questions.length" />
      <template v-for="(question, index) in questions" :key="`${index}`">
        <card
          v-if="currQuestion !== questions.length && index === currQuestion"
          class="elevation-5"
        >
          <template #content>
            <div class="app-grid">
              <div
                class="p-col"
                v-for="(option, index2) in question"
                :key="`${index2}`"
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
              <div class="p-col"></div>
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
      <card v-if="currQuestion === questions.length" class="p-shadow-4">
        <template #content>
          <chart
            type="pie"
            :data="testResults"
            :options="chartOptions"
            :height="100"
          />
        </template>
        <template #footer>
          <p-button @click="resetTest">{{ t("startOver") }}</p-button>
        </template>
      </card>
    </div>
    <!-- <toast /> -->
  </div>
</template>

<script>
  import { computed, defineComponent, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useI18n } from 'vue-i18n/dist/vue-i18n.cjs';

  import HeaderComponent from '@/components/Header';
  // import { useToast } from 'primevue/usetoast';
  import Button from 'primevue/button';
  import Card from 'primevue/card';
  import Chart from 'primevue/chart';
  import Chip from 'primevue/components/chip/chip.common';
  import Divider from 'primevue/divider';
  import Steps from 'primevue/steps';
  // import Toast from 'primevue/toast';

  export default defineComponent( {
    components: { PButton: Button, Card, Chart, Chip, Divider, HeaderComponent, Steps/* , Toast */ },
    setup () {
      const { t, locale } = useI18n();
      const store = useStore();
      const chartOptions = ref( {
        tooltips: {
          callbacks: {
            label: function ( tooltipItem, data ) {
              return data.labels[ tooltipItem.index ];
            },
          }
        }
      } );
      const answers = computed( () => store.state.questions.answers );
      const currQuestion = computed( () => store.state.questions.currQuestion )
      const questions = computed( () => store.state.questions.questions )
      // const toast = useToast();
      const text = ref( 'Prime' );
      const message = ref( null );
      const optionSelected = computed( () => !!answers.value[ currQuestion.value ] );
      const showNextQuestion = () => {
        store.commit( 'questions/nextQuestion' );
      }
      const showPreviousQuestion = () => {
        store.commit( 'questions/previousQuestion' );
      }
      const toggleSelection = async option => {
        store.commit( 'questions/setAnswer', { question: currQuestion.value, answer: option.category } );
        setTimeout( () => { showNextQuestion(); }, 300 );
      }
      const resetTest = () => {
        store.commit( 'questions/resetQuiz' );
      }

      const testResults = computed( () => {
        const catVals = [ 'a', 'b', 'c', 'd', 'e' ];
        const catTotals = catVals
          .map( cat => ( {
            cat: t( `categories.${ cat }` ),
            total: answers.value.filter( answer => answer === cat ).length,
          } ) )
          .sort( ( a, b ) => b.total - a.total );
        return {
          labels: catTotals.map( val => `${ val.cat } - ${ val.total }` ),
          datasets: [
            {
              label: t( 'resultsHeader' ),
              backgroundColor: [
                '#8d528f', '#bfa0bf', '#f1f1f1', '#b3e9b7', '#68de7e',
              ],
              data: catTotals.map( val => val.total ),
            },
          ]
        };
      } )

      return {
        items: computed( () => store.state.questions.questions.map( ( item, index ) => ( { label: `${ index + 1 }` } ) ) ),
        currQuestion,
        questions,
        text,
        chartOptions,
        message,
        optionSelected,
        showNextQuestion,
        showPreviousQuestion,
        toggleSelection,
        answers,
        resetTest,
        testResults,
        t,
        locale,
        store,
      };
    }
  } )
</script>

<style lang="scss" scoped>
  .app-container {
    padding-top: 90px;
  }
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
</style>
