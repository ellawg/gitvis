<template>
  <div class="md-layout md-alignment-center-center">
    <div class="md-layout-item md-size-100 md-layout md-gutter">
      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title">Search</div>
          </md-card-header>
          <md-card-content>
            <form form novalidate @submit.prevent="submit">
              <div class="md-layout">
                <div class="md-layout-item md-layout md-gutter">
                  <div class="md-layout-item">
                    <md-field md-inline>
                      <label>query</label>
                      <md-input v-model="query"></md-input>
                    </md-field>
                  </div>
                </div>
              </div>
            </form>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    submit() {
      this.$router.push("/search/" + this.query);
    }
  }
};
</script>
