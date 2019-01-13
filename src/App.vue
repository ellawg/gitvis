<template>
  <md-app>
    <md-app-toolbar>
      <Nav/>
    </md-app-toolbar>
    <md-app-content>
      <router-view/>
    </md-app-content>
  </md-app>
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
    accent: md-get-palette-color(red, A200),
    theme: dark
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
