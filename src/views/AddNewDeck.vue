<template>
  <div class="addnewdeck">
    <AddNewDeckComponent />
  </div>
</template>

<script>
import AddNewDeckComponent from "../components/addnewdeck/AddNewDeck.vue";

export default {
  name: "AddNewDeck",
  props: {
  },
  components: {
    AddNewDeckComponent
  }
};
</script>

<style scoped>
</style>