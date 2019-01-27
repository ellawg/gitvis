<template>
  <div class="root">
    <div class="slider-container">
      <input class="slider" @change="onChange" type="range" :min="min" :max="max" v-model="value">
    </div>
    <div class="value-box">{{value}}</div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 100 },
    value: { type: Number, default: 50 }
  },
  methods: {
    onChange() {
      this.$emit("change", this.value);
    }
  }
};
</script>


<style lang="scss" scoped>
.slider-container {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}

.slider {
  width: 100%;
}

.value-box {
  width: 30%;
}
</style>
