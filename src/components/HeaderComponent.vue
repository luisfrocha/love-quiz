<template>
  <toolbar class="p-shadow-2">
    <template #left>
      <div class="p-grid">
        <div class="p-text-bold p-text-uppercase p-col-12">{{ t("header") }}</div>
        <div class="p-text-light p-text-italic author p-col-12">{{ t("author") }}</div>
      </div>
    </template>

    <template #right>
      <div class="p-grid">
        <div class="p-col-12">
          <span class="p-buttonset">
            <p-button
              label="English"
              :class="{ 'p-button-outlined': locale !== 'en' }"
              class="p-button-sm button"
              @click="locale = 'en'"
            />
            <p-button
              label="Español"
              :class="{ 'p-button-outlined': locale !== 'es' }"
              class="p-button-sm button"
              @click="locale = 'es'"
            />
          </span>
        </div>
      </div>
    </template>
  </toolbar>
</template>

<script>
  import { defineComponent } from 'vue';
  import { useI18n } from 'vue-i18n/dist/vue-i18n.cjs';
  import Button from 'primevue/button';
  import Toolbar from 'primevue/toolbar';

  export default defineComponent( {
    components: { PButton: Button, Toolbar },
    setup() {
      const i18n = useI18n( { useScope: 'global' } );
      const { t, locale } = i18n;

      return { t, locale };
    }
  } );
</script>

<style lang="scss" scoped>
  .author {
    font-size: 90%;
  }
  .button {
    font-size: 0.5em !important;
  }
</style>
