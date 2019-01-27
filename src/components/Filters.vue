<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-100 chart-card-container">
      <md-card>
        <md-card-header>
          <div class="md-title">Filters</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-chip
                v-for="topic in topics"
                :key="topic"
                class="md-accent"
                md-deletable
                @md-delete="filterToggle({type: 'topics', value: topic})"
              >{{topic}}</md-chip>
            </div>
            <div class="md-layout-item">
              <Slider :min="min" :max="max" v-model="minCount"></Slider>
            </div>
            <div class="md-layout-item">
              <md-chip
                v-for="lang in languages"
                :key="lang"
                class="md-primary"
                md-deletable
                @md-delete="filterToggle({type: 'languages', value: lang})"
              >{{lang}}</md-chip>
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
  watch: {
    minCount(count) {
      this[UPDATE_MIN_COUNT](count);
    }
  },
  computed: {
    ...mapState({
      languages: state => state.filters.languages,
      topics: state => state.filters.topics,
      minCount: state => state.filters.minCount
    })
  },
  methods: {
    ...mapActions(["filterToggle"]),
    ...mapMutations([UPDATE_MIN_COUNT])
  }
};
</script>

