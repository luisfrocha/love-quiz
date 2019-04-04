<template>
  <v-app>
    <v-toolbar app class="elevation-1" height="100">
      <v-flex>
        <v-layout row wrap>
          <v-flex class="subheading text-uppercase font-weight-bold" xs12>
            {{
              lang == "en"
                ? "Five Love Languages Test"
                : "Prueba Cinco Lenguajes del Amor"
            }}
          </v-flex>
          <v-flex class="body-2" xs12>
            {{ lang === "en" ? "By" : "Por" }} Dr. Gary Chapman
          </v-flex>
        </v-layout>
      </v-flex>
      <v-spacer />
      <v-btn-toggle v-model="lang" class="transparent">
        <v-btn value="en" flat small>
          English
        </v-btn>
        <v-btn value="es" flat small>
          Español
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <v-content>
      <Main :lang="lang" />
    </v-content>
  </v-app>
</template>

<script>
import Main from "./components/Main";

export default {
  name: "App",
  components: {
    Main
  },
  data() {
    return {
      lang: "en"
    };
  },
  computed: {
    title: {
      get(value) {
        console.log(value);
        document.title =
          value === "en"
            ? "Five Love Language Test"
            : "Prueba de Cinco Lenguajes de Amor";
        return value;
      }
    }
  }
};
</script>
