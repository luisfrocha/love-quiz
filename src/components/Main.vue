<template>
  <v-container fluid grid-list-xl>
    <v-layout align-center justify-start row wrap fill-height>
      <v-flex xs12>
        <h3 v-if="currQuestion !== questions.length">
          {{ description[lang] }}
        </h3>
        <v-stepper :value="currQuestion + 1" class="hidden-sm-and-down">
          <v-stepper-header>
            <template v-for="(question, index) in questions">
              <v-stepper-step
                :key="`step${index}`"
                :complete="!!answers[index] && currQuestion !== index"
                :step="index + 1"
                class="stepper-button"
              />
              <v-divider :key="`divider${index}`" />
            </template>
          </v-stepper-header>
        </v-stepper>
        <v-flex class="hidden-md-and-up text-xs-center" xs12>
          {{ lang === "en" ? "Question" : "Pregunta" }}:
          {{ currQuestion + 1 }}/{{ questions.length }}
        </v-flex>
      </v-flex>
      <v-flex xs12>
        <v-container fluid>
          <v-layout column wrap>
            <v-flex xs6 style="position: relative;">
              <v-expand-transition
                v-for="(question, index) in questions"
                :key="index"
              >
                <v-card v-if="index === currQuestion" class="elevation-5">
                  <v-card-text>
                    <v-item-group>
                      <v-container fluid grid-list-md>
                        <v-layout column wrap>
                          <v-flex
                            v-for="(option, index2) in question"
                            :key="index2"
                            xs12
                            md4
                          >
                            <v-item>
                              <v-card
                                slot-scope="{ active, toggle }"
                                :color="
                                  active ||
                                  answers[currQuestion] === option.category
                                    ? 'success'
                                    : ''
                                "
                                :class="{
                                  'white--text':
                                    active ||
                                    answers[currQuestion] === option.category
                                }"
                                class="d-flex align-center pa-5"
                                @click="toggleSelection(option, active, toggle)"
                              >
                                <v-card-text
                                  :class="{
                                    headline:
                                      active ||
                                      answers[currQuestion] === option.category
                                  }"
                                >
                                  {{ option.text[lang] }}
                                </v-card-text>
                              </v-card>
                            </v-item>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-item-group>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      v-if="index !== 0"
                      color="success"
                      small
                      @click="showPreviousQuestion"
                    >
                      {{ lang === "en" ? "Previous" : "Anterior" }}
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      :disabled="!optionSelected"
                      color="success"
                      small
                      @click="showNextQuestion"
                    >
                      {{ lang === "en" ? "Next" : "Siguiente" }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
              <v-expand-transition name="slide-x-transition" mode="in-out">
                <v-card v-if="currQuestion === questions.length">
                  <v-card-title class="headline font-weight-bold">
                    {{
                      lang === "es"
                        ? "He aquí tus resultados"
                        : "Here are your results"
                    }}
                  </v-card-title>
                  <v-card-text>
                    <apexchart
                      :options="chartOptions"
                      :series="chartSeries"
                      type="bar"
                      width="100%"
                      height="200"
                    />
                    <transition-group
                      v-if="false"
                      name="flip-list"
                      tag="v-list"
                    >
                      <v-list-tile
                        v-for="category in results"
                        :key="category.category"
                      >
                        <v-list-tile-title>
                          {{ `${category.category} - ${category.text[lang]}` }}
                        </v-list-tile-title>
                        <v-list-tile-action>{{
                          category.count
                        }}</v-list-tile-action>
                      </v-list-tile>
                    </transition-group>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="success" @click="resetQuiz">{{
                      lang === "es" ? "Empezar de Nuevo" : "Start Again"
                    }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Main",
  props: ["lang"],
  data() {
    return {
      currQuestion: 0,
      optionSelected: null,
      answers: [],
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
      description: {
        en:
          "Read each pair of statements and choose the one that best describes you",
        es:
          "Lee cada par de descripciones y selecciona la que mejor te describe"
      },
      questions: [
        [
          {
            category: "a",
            text: {
              en: "I like to receive notes of affirmation from you",
              es: "Me gusta que me des notas de afirmación"
            }
          },
          {
            category: "e",
            text: {
              en: "I like it when you hug me",
              es: "Me gusta cuando me abrazas"
            }
          }
        ],
        [
          {
            category: "b",
            text: {
              en: "I like to spend one-on-one time with you",
              es: "Me gusta pasar tiempo juntos"
            }
          },
          {
            category: "d",
            text: {
              en: "I feel loved when you give me practical help",
              es: "Me siento amad@ cuando me das ayuda práctica"
            }
          }
        ],
        [
          {
            category: "c",
            text: {
              en: "I like it when you give me gifts",
              es: "Me gusta cuando me das regalos"
            }
          },
          {
            category: "b",
            text: {
              en: "I like taking long walks with you",
              es: "Me gusta hacer largas caminatas contigo"
            }
          }
        ],
        [
          {
            category: "d",
            text: {
              en: "I feel loved when you do things to help me",
              es: "Me siento amad@ cuando haces cosas por ayudarme"
            }
          },
          {
            category: "e",
            text: {
              en: "I feel loved when you hug or touch me",
              es: "Me siento amad@ cuando me abrazas o tocas"
            }
          }
        ],
        [
          {
            category: "e",
            text: {
              en: "I feel loved when you hold me in your arms",
              es: "Me siento amad@ cuando estoy en tus brazos"
            }
          },
          {
            category: "c",
            text: {
              en: "I feel loved when I receive a gift from you",
              es: "Me siento amad@ cuando recibo un regalo de ti"
            }
          }
        ],
        [
          {
            category: "b",
            text: {
              en: "I like to go places with you",
              es: "Me gusta ir a diferentes lugares contigo"
            }
          },
          {
            category: "e",
            text: {
              en: "I like to hold hands with you",
              es: "Me gusta que nos tomemos de las manos"
            }
          }
        ],
        [
          {
            category: "a",
            text: {
              en: "I feel loved when you acknowledge me",
              es: "Me siento amad@ cuando me reconoces"
            }
          },
          {
            category: "c",
            text: {
              en: "Visible symbols of love (gifts) are very important to me",
              es:
                "Los símbolos visibles de amor (regalos) soy muy importantes para mí"
            }
          }
        ],
        [
          {
            category: "e",
            text: {
              en: "I like to sit close to you",
              es: "Me gusta sentarme cerca de ti"
            }
          },
          {
            category: "a",
            text: {
              en: "I like it when you tell me that I am attractive",
              es: "Me gusta cuando me dices que soy atractiv@"
            }
          }
        ],
        [
          {
            category: "b",
            text: {
              en: "I like to spend time with you",
              es: "Me gusta pasar tiempo contigo"
            }
          },
          {
            category: "c",
            text: {
              en: "I like to receive little gifts from you",
              es: "Me gusta que me des regalitos"
            }
          }
        ],
        [
          {
            category: "d",
            text: {
              en: "I know you love me when you help me",
              es: "Sé que me amas cuando me ayudas"
            }
          },
          {
            category: "a",
            text: {
              en: "Your words of acceptance are important to me",
              es: "Tus palabras de aceptación son importantes para mí"
            }
          }
        ],
        [
          {
            category: "b",
            text: {
              en: "I like to be together when we do things",
              es: "Me gusta estar juntos cuando hacemos cosas"
            }
          },
          {
            category: "a",
            text: {
              en: "I like the kind words you say to me",
              es: "Me gusta que me hables bonito"
            }
          }
        ],
        [
          {
            category: "e",
            text: {
              en: "I feel whole when we hug",
              es: "Me siento complet@ cuando me abrazas"
            }
          },
          {
            category: "d",
            text: {
              en: "What you do affects me more than what you say",
              es: "Lo que haces me afecta más que lo que dices"
            }
          }
        ],
        [
          {
            category: "a",
            text: {
              en: "I value your praise and try to avoid your criticism",
              es: "Valoro tus elogios y trato de evitar tus críticas"
            }
          },
          {
            category: "c",
            text: {
              en:
                "Several inexpensive gifts mean more to me than one large expensive gift",
              es: "Varios regalos no caros significan más que un regalo caro"
            }
          }
        ],
        [
          {
            category: "e",
            text: {
              en: "I feel closer to you when you touch me",
              es: "Me siento cercan@ a ti cuando me tocas"
            }
          },
          {
            category: "b",
            text: {
              en:
                "I feel close when we are talking or doing something together",
              es: "Me siento cercan@ cuando hablamos o hacemos algo juntos"
            }
          }
        ],
        [
          {
            category: "a",
            text: {
              en: "I like you to compliment my achievements",
              es: "Me gusta cuando elogias mis logros"
            }
          },
          {
            category: "d",
            text: {
              en:
                "I know you love me when you do things for me that you don't enjoy doing",
              es: "Me encanta cuando haces cosas para mí que no te gusta hacer"
            }
          }
        ],
        [
          {
            category: "e",
            text: {
              en: "I like for you to touch me when you walk by",
              es: "Me gusta que me tocas cuando paso cerca de ti"
            }
          },
          {
            category: "b",
            text: {
              en: "I like when you listen to me sympathetically",
              es: "Me gusta cuando escuchas simpáticamente"
            }
          }
        ],
        [
          {
            category: "c",
            text: {
              en: "I really enjoy receiving gifts from you",
              es: "De verdad disfruto recibir regalos de ti"
            }
          },
          {
            category: "d",
            text: {
              en: "I feel loved when you help me with my home projects",
              es: "Me siento amad@ cuando me ayudas en proyectos de la casa"
            }
          }
        ],
        [
          {
            category: "a",
            text: {
              en: "I like when you compliment my appearance",
              es: "Me gusta cuando elogias mi aparencia"
            }
          },
          {
            category: "b",
            text: {
              en:
                "I feel loved when you take the time to understand my feelings",
              es:
                "Me siento amad@ cuando te tomas el tiempo para entender mis sentimientos"
            }
          }
        ],
        [
          {
            category: "e",
            text: {
              en: "I feel secure when you are touching me",
              es: "Me siento segur@ cuando me tocas"
            }
          },
          {
            category: "d",
            text: {
              en: "Your acts of service make me feel loved",
              es: "Tus actos de servicio me hace sentir amad@"
            }
          }
        ],
        [
          {
            category: "d",
            text: {
              en: "I appreciate the many things you do for me",
              es: "Aprecio las muchas cosas que haces por mí"
            }
          },
          {
            category: "c",
            text: {
              en: "I like receiving gifts that you make",
              es: "Me gusta recibir regalos que haces"
            }
          }
        ],
        [
          {
            category: "b",
            text: {
              en:
                "I really enjoy the feeling I get when you give me your undivided attention",
              es:
                "De verdad disfruto lo que siento cuando me das tu atención completa"
            }
          },
          {
            category: "d",
            text: {
              en:
                "I really enjoy the feeling I get when you do some act of service for me",
              es:
                "De verdad disfruto lo que siento cuando haces un acto servicial para mí"
            }
          }
        ],
        [
          {
            category: "c",
            text: {
              en: "I feel loved when you create my birthday with a gift",
              es: "Me siento amad@ cuando haces un regalo para mi cumpleaños"
            }
          },
          {
            category: "a",
            text: {
              en:
                "I feel loved when you celebrate my birthday with meaningful words (written or spoken)",
              es:
                "Me siento amad@ cuando celebras mi cumpleaños con palabras significativas (escritas o recitadas)"
            }
          }
        ],
        [
          {
            category: "d",
            text: {
              en: "I feel loved when you help me out with my chores",
              es: "Me siento amad@ cuando me ayudas con mis tareas cotidianas"
            }
          },
          {
            category: "c",
            text: {
              en: "I know you are thinking of me when you give me a gift",
              es: "Sé que piensas en mí cuando me das un regalo"
            }
          }
        ],
        [
          {
            category: "c",
            text: {
              en: "I appreaciate it whe you remember special days with a gift",
              es: "Aprecio cuando recuerdas días especiales con un regalo"
            }
          },
          {
            category: "b",
            text: {
              en:
                "I appreciate it when you listen patiently and don't interrupt me",
              es: "Aprecio cuando escuchas pacientemente y no me interrumpes"
            }
          }
        ],
        [
          {
            category: "b",
            text: {
              en: "I enjoy extended trips with you",
              es: "Disfruto viajes largos contigo"
            }
          },
          {
            category: "d",
            text: {
              en:
                "I Like to know that you are concerned enough to help me with my daily tasks",
              es:
                "Me gusta saber que te preocupas suficiente como para ayudarme con mis tareas diarias"
            }
          }
        ],
        [
          {
            category: "e",
            text: {
              en: "Kissing me unexpectedly makes me feel loved",
              es: "Me siento amad@ cuando me besas inesperadamente"
            }
          },
          {
            category: "c",
            text: {
              en: "Giving me a gift for no occasion makes me feel loved",
              es: "Me siento amad@ cuando me das un regalo sin razón"
            }
          }
        ],
        [
          {
            category: "a",
            text: {
              en: "I like to be told that you appreciate me",
              es: "Me gusta que me digas que me aprecias"
            }
          },
          {
            category: "b",
            text: {
              en: "I like for you to look at me when we are talking",
              es: "Me gusta que me veas mientras platicamos"
            }
          }
        ],
        [
          {
            category: "c",
            text: {
              en: "Your gifts are always special to me",
              es: "Tus regalos siempre son especiales para mí"
            }
          },
          {
            category: "e",
            text: {
              en: "I feel loved when you kiss me",
              es: "Me siento amad@ cuando me besas"
            }
          }
        ],
        [
          {
            category: "a",
            text: {
              en: "I feel loved when you tell me how much you appreciate me",
              es: "Me siento amad@ cuando me dices cuánto me aprecias"
            }
          },
          {
            category: "d",
            text: {
              en:
                "I feel loved when you enthusiastically do a task I have requested",
              es:
                "Me siento amad@ cuando haces entusiásticamente alguna tarea una tarea que te pido"
            }
          }
        ],
        [
          {
            category: "e",
            text: {
              en: "I need to be hugged by you every day",
              es: "Necesito que me abraces todos los días"
            }
          },
          {
            category: "a",
            text: {
              en: "I need your words of affirmation daily",
              es: "Necesito tus palabras de afirmación diariamente"
            }
          }
        ]
      ],
      toggles: []
    };
  },
  computed: {
    chartOptions() {
      return {
        type: "bar",
        chart: {
          id: "quiz-results"
        },
        xaxis: {
          categories: this.results.map(res => res.text[this.lang])
        },
        yaxis: [{ seriesName: this.lang === "en" ? "results" : "resultados" }]
      };
    },
    chartSeries() {
      return [
        {
          name: this.lang === "en" ? "results" : "resultados",
          data: this.results.map(res => res.count)
        }
      ];
    },
    results() {
      return this.categories
        .map(category => {
          category.count = this.answers.filter(
            answer => answer === category.category
          ).length;
          return category;
        })
        .sort((a, b) => {
          return b.count - a.count;
        });
    }
  },
  methods: {
    resetQuiz() {
      this.answers = [];
      this.currQuestion = 0;
      this.optionSelected = null;
      this.toggles.forEach(toggle => {
        toggle();
      });
      this.toggles = [];
    },
    showNextQuestion() {
      this.$set(this.answers, this.currQuestion, this.optionSelected.category);
      this.currQuestion++;
      if (this.currQuestion !== this.questions.length) {
        this.optionSelected = this.questions[this.currQuestion].find(
          option => option.category === this.answers[this.currQuestion]
        );
      }
    },
    showPreviousQuestion() {
      this.currQuestion--;
      this.optionSelected = this.questions[this.currQuestion].find(
        option => option.category === this.answers[this.currQuestion]
      );
    },
    toggleSelection(option, active, toggle) {
      this.optionSelected = !active ? option : null;
      toggle();
      setTimeout(() => {
        this.showNextQuestion();
      }, 250);
    }
  }
};
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.question-card {
  position: absolute;
  width: 100%;
}
.v-stepper__header {
  height: 45px;
  .stepper-button {
    padding: 10px;
    /deep/ .v-stepper__label {
      display: none;
    }
  }
}
</style>
