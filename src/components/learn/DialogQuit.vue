<template>
    <v-dialog
      v-model="showQuitDialog"
      max-width="400"
    >
      <v-card color="#2e2e2e">
        <v-card-title class="headline">Quit Learning?</v-card-title>

        <v-card-text class="text-left">
          Do you really want to quit learning?
          Nevertheless, your progress is saved.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey"
            text
            @click="showQuitDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="$emit('confirmed')"
          >
            Quit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DialogQuit",
    data() {
        return {
            showQuitDialog: false,
        }
    },
    methods: {
        hide() {
            this.showQuitDialog = false;
        },
        show() {
            this.showQuitDialog = true;
        },
    },
};
</script>

<style scoped>
</style>