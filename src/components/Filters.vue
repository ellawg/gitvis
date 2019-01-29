<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-100 filters-card-container">
      <md-card>
        <md-card-header>
          <div class="md-title">Filters</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-layout md-gutter">
              <div class="slider-container md-layout-item md-size-100">
                <Slider
                  label="min count"
                  :min="min"
                  :max="max"
                  v-model="sliderState"
                ></Slider>
              </div>
              <div class="md-layout-item">
                <md-chip
                  v-for="topic in topics"
                  :key="topic"
                  class="md-accent"
                  md-deletable
                  @md-delete="filterToggle({ type: 'topics', value: topic })"
                  >{{ topic }}</md-chip
                >
              </div>

              <div class="md-layout-item">
                <md-chip
                  v-for="lang in languages"
                  :key="lang"
                  class="md-primary"
                  md-deletable
                  @md-delete="filterToggle({ type: 'languages', value: lang })"
                  >{{ lang }}</md-chip
                >
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import { UPDATE_MIN_COUNT } from "../utils/mutations.js";

import Slider from "@/components/Slider";

export default {
  name: "Filters",
  components: {
    Slider
  },
  data() {
    return {
      min: 1,
      max: 10
    };
  },
  computed: {
    ...mapState({
      languages: state => state.filters.languages,
      topics: state => state.filters.topics,
      minCount: state => state.filters.minCount
    }),
    sliderState: {
      get() {
        return this.minCount;
      },
      set(value) {
        this[UPDATE_MIN_COUNT](value);
      }
    }
  },
  methods: {
    ...mapActions(["filterToggle"]),
    ...mapMutations([UPDATE_MIN_COUNT])
  }
};
</script>

<style lang="scss" scoped>
.filters-card-container {
  margin-top: 24px;
}
.slider-container {
  margin-bottom: 24px;
}
</style>
