<template>
  <div class="bar-chart">
    <div class="bar-container" :style="{ minHeight: 'min(20vw, 100px)' }">
      <div v-for="(bar, index) in options.bars" :key="index" class="bar-wrapper">
        <div class="bar-value">{{ bar.value }}</div>
        <div class="bar" :style="getHeight(bar)"></div>
      </div>
    </div>
    <div class="bar-container" style="padding-top: 0;">
      <div v-for="(bar, index) in options.bars" :key="index" class="bar-name">{{ bar.name || "" }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import {
  CustomDialogOptionsBarChart,
  CustomDialogOptionsBarChartBar
} from "../../types";

const BarChartProps = Vue.extend({
  props: {
    options: { type: Object as () => CustomDialogOptionsBarChart }
  }
});

@Component
export default class BarChart extends BarChartProps {
  getHeight(bar: CustomDialogOptionsBarChartBar) {
    const relValue = this.maxBarValue > 0 ? bar.value / this.maxBarValue : 0;
    return {
      height: `${relValue*32}vw`,
      maxHeight: `${relValue*150}px`
    };
  }
  get maxBarValue (): number {
    return Math.max(...this.options.bars.map(bar => bar.value));
  }
}
</script>

<style scoped>
.bar-container {
  display: flex;
  padding: 12px 24px;
  justify-content: space-evenly;
  align-items: flex-end;
}
.bar-wrapper {
  flex-grow: 1;
  height: 100%;
  margin: 0 5%;
  display: flex;
  flex-direction: column;
}
.bar-value {
  text-align: center;
  color: #fc0;
  font-size: 0.7em;
}
.bar {
  width: 100%;
  background: #fc0;
  min-height: 1px;
}
.bar-name {
  flex-grow: 1;
  margin: 0 5%;
  text-align: center;
}
</style>