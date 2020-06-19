<template>
  <div class="settings">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <span class="title">Settings</span>
          <br />
          <v-btn color="red" @click="clearLocalStorage" class="my-4">Clear Local Storage</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Settings",
  methods: {
    clearLocalStorage() {
      this.$eventHub.$emit("clearLocalStorage");
    }
  }
}
</script>

<style scoped>
.settings {
  text-align: center;
}
</style>