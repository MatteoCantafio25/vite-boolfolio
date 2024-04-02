<script>
import AppHeader from './components/AppHeader.vue';
import AppLoader from './components/AppLoader.vue';
import { store } from './data/store';

export default {
  name: "Boolfolio",
  components: {
    AppHeader,
  },
  data: () => ({
    store,
  }),
};
</script>

<template>
  <AppHeader />
  <main class="container pt-4">
    <AppLoader v-if="store.isLoading" />
    <RouterView />
  </main>

</template>

<style lang="scss" scoped>
/* Style here */
</style>