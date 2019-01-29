<template>
  <div id="app">
    <Nav/>
    <main id="main">
      <router-view/>
    </main>
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
    primary: md-get-palette-color(orange, A200),
    accent: md-get-palette-color(lightgreen, A200),
    theme: dark
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme

#main {
  margin: 24px 2%;
}
</style>
