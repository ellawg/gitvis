<template>
  <div id="app">
    <md-app>
      <md-app-toolbar md-waterfall md-mode="fixed">
        <Nav/>
      </md-app-toolbar>
      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "app",
  components: {
    Nav
  }
};
</script>

<style lang="scss">
// Global style here
</style>
