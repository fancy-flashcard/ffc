<template>
  <div class="deck">
    <input type="checkbox" v-bind:name="deckname" v-bind:value="deckname" />
    <label v-bind:for="deckname">{{ deckname }}</label>
    <br />
  </div>
</template>

<script>
export default {
  name: "Deck",
  props: {
    deckname: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
