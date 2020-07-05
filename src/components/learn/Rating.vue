<template>
  <div class="rating">
    <div v-for="n in numberOfStars" :key="n" class="star-wrapper">
      <span
        class="overline grey--text text--darken-1"
        :class="{ 'invisible': (n !== 1 && n !== numberOfStars) }"
      >{{ n === 1 ? "Hard" : "Easy" }}</span>
      <svg class="star" :class="{ 'filled': (numberOfSelectedStar >= n) }" viewBox="0 0 100 100">
        <!-- two circles, radius 18% and 42%, 72 degree steps -->
        <polygon
          points="50,10 39.4,35.4 10.1,37 32.9,55.6 25.3,84 50,68, 74.7,84 67.1,55.6 89.9,37 60.6,35.4"
          @click="onClickStar(n)"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

const RatingProps = Vue.extend({
  props: {
    numberOfStars: Number
  }
});

@Component
export default class Rating extends RatingProps {
  numberOfSelectedStar = 0;
  onClickStar(n: number) {
    this.numberOfSelectedStar = n;
    this.$emit("rated", n);
  }
  setRating(n: number) {
    this.numberOfSelectedStar = n;
    this.$emit("rated", n, true);
  }
}
</script>

<style scoped>
.rating {
  padding: 0 16px;
  display: flex;
  justify-content: center;
}

.star-wrapper {
  display: flex;
  flex-flow: column;
  flex: 1 1 0;
  max-width: 20vw;
  max-height: 16vh;
}

.invisible {
  visibility: hidden;
}

svg.star {
  stroke-width: 5;
  stroke-linejoin: round;
}
svg.star polygon {
  cursor: pointer;
}
svg.star.filled polygon {
  fill: #fc0;
  stroke: #fc0;
  transition: 0.2s;
}
svg.star polygon {
  fill: #222;
  stroke: #fc0;
  transition: 0.5s;
}
</style>