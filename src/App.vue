<template>
  <div id="app">
    <Nav v-bind:height="navHeight"/>
    <main v-bind:style="{margin: navHeight + 'px'}">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "app",
  data() {
    return { navHeight: 60 };
  },
  components: {
    Nav
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
</style>
