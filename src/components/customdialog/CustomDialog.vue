<template>
  <v-dialog v-model="showDialog" max-width="400" persistent>
    <v-card color="#2e2e2e">
      <v-card-title class="headline">{{ options.title }}</v-card-title>

      <v-card-text class="text-left">{{ options.message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="close()">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props: {},
  data() {
    return {
      showDialog: false,
      options: {
        title: "",
        message: "",
        redirectRouteAfterClose: "/"
      }
    };
  },
  methods: {
    hide() {
      this.showDialog = false;
    },
    show(options) {
      this.showDialog = true;
      this.options = options;
    },
    close() {
      this.showDialog = false;
      if (this.options.redirectRouteAfterClose) {
        this.$router.push(this.options.redirectRouteAfterClose);
      }
    }
  }
};
</script>

<style scoped>
</style>