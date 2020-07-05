<template>
  <div class="addnewdeck">
    <AddNewDeckComponent />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import AddNewDeckComponent from "../components/addnewdeck/AddNewDeck.vue";

@Component({
  components: {
    AddNewDeckComponent
  }
})
export default class AddNewDeck extends Vue {}
</script>

<style scoped>
</style>