<template>
  <div class="rating">
    <svg class="star" v-for="n in 5" :key="n"
      viewBox="0 0 100 100"
    >
      <!-- two circles, radius 18% and 42%, 72 degree steps -->
      <polygon points="50,10 39.4,35.4 10.1,37 32.9,55.6 25.3,84 50,68, 74.7,84 67.1,55.6 89.9,37 60.6,35.4" />
    </svg>
  </div>
</template>

<script>
export default {
    name: "Rating",
}
</script>

<style scoped>
.rating {
  max-height: 20%;
  padding: 0 16px;
  display: flex;
}

svg.star {
    flex-grow: 1;
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