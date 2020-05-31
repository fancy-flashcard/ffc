<template>
    <v-dialog
      v-model="showDeleteDialog"
      max-width="400"
    >
      <v-card color="#2e2e2e">
        <v-card-title class="headline">Delete Deck{{numberOfSelectedDecks > 1 ? "s" : ""}}?</v-card-title>

        <v-card-text class="text-left">
          Do you really want to delete the {{numberOfSelectedDecks > 1 ? numberOfSelectedDecks + " " : ""}}selected
          deck{{numberOfSelectedDecks > 1 ? "s" : ""}}?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey"
            text
            @click="showDeleteDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="$emit('confirmed')"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DialogDeleteDecks",
    props: {
        numberOfSelectedDecks: Number,
    },
    data() {
        return {
            showDeleteDialog: false,
        }
    },
    methods: {
        hide() {
            this.showDeleteDialog = false;
        },
        show() {
            this.showDeleteDialog = true;
        },
    },
};
</script>

<style scoped>
</style>