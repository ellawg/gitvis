<template>
  <div class="root">
    <div class="value-box">{{min}}</div>
    <div class="slider-container">
      <label for="slider">{{label}}</label>
      <input class="slider" type="range" :min="min" :max="max" v-model="sliderState">
    </div>
    <div class="value-box">{{max}}</div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 100 },
    value: { type: String, default: "50" },
    label: { type: String, default: "Slider" }
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
.root {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 100%;
}

.slider-container {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
}

.slider {
  width: 100%;
  height: 2px;
  outline: none;
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    cursor: pointer;
    border-radius: 50%;
  }
  &::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
    cursor: pointer;
    border-radius: 50%;
  }
}

.value-box {
  width: 10%;
  text-align: center;
}
</style>
