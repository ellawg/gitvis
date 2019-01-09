<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar>
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
  name: "App",
  components: {
    Nav
  }
};
</script>

<style lang="scss">
// Global style here
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(blue, A200),
    // The primary color of your application
      accent: md-get-palette-color(red, A200)// The accent or secondary color
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
