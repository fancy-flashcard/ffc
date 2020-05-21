<template>
  <div class="titlebar">
    <h1>{{ title }}</h1>
    <hr />
  </div>
</template>

<script>
export default {
  name: "TitleBar",
  props: {
    title: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
