<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { initSettings } from './util/settings';
export default {
  name: 'App',
  mounted () {
    initSettings();
  }
};
</script>
