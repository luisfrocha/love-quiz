<template>
  <toolbar class="p-shadow-2">
    <template #left>
      <div class="p-fluid">
        <div class="p-text-bold p-text-uppercase">{{ t("header") }}</div>
        <div class="p-text-light p-text-italic author">{{ t("author") }}</div>
      </div>
    </template>

    <template #right>
      <span class="p-buttonset">
        <p-button
          label="English"
          :class="{ 'p-button-outlined': locale !== 'en' }"
          class="p-button-sm"
          @click="locale = 'en'"
        />
        <p-button
          label="Español"
          :class="{ 'p-button-outlined': locale !== 'es' }"
          class="p-button-sm"
          @click="locale = 'es'"
        />
      </span>
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
    setup () {
      const i18n = useI18n( { useScope: 'global' } );
      const { t, locale } = i18n;

      return { t, locale };
    }
  } )
</script>

<style lang="scss" scoped>
  .p-toolbar {
    position: fixed;
    width: 100%;
    z-index: 1;
  }
  .author {
    font-size: 90%;
  }
</style>
