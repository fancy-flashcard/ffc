<template>
  <div class="learn">
    <LearnComponent
      :decks="decks"
      :numberOfSelectedDecks="numberOfSelectedDecks"
      :learningSession="learningSession"
    />
  </div>
</template>

<script>
import LearnComponent from '../components/learn/Learn.vue';

export default {
  name: "Learn",
  props: {
    decks: Array,
    learningSession: Object,
    numberOfSelectedDecks: Number,
  },
  components: {
    LearnComponent
  }
}
</script>

<style scoped>
.learn {
  height: 100%;
}
</style>