<template>
  <div class="root">
    <div class="slider-container">
      <input class="slider" type="range" :min="min" :max="max" v-model="sliderState">
    </div>
    <div class="value-box">{{value}}</div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 100 },
    value: { type: String, default: "50" }
  },
  model: {
    prop: "value",
    event: "valueUpdate"
  },
  computed: {
    sliderState: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("valueUpdate", value);
      }
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
