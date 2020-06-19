<template>
  <v-dialog v-model="showDialog" max-width="400" persistent>
    <v-card color="#2e2e2e">
      <v-card-title class="headline">{{ options.title }}</v-card-title>

      <v-card-text v-if="options.message" class="text-left">{{ options.message }}</v-card-text>
      <v-list v-if="options.table">
        <v-list-item v-if="options.tableHead">
          <v-list-item-content class="font-weight-bold">{{ options.tableHead.name }}</v-list-item-content>
          <v-list-item-content class="font-weight-bold">{{ options.tableHead.value }}</v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in options.table" :key="item.name">
          <v-list-item-content>{{ item.name }}</v-list-item-content>
          <v-list-item-content>{{ item.value }}</v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-for="btn in options.buttons"
          :key="btn.name"
          :color="btn.color"
          text
          @click="close(btn)"
        >{{ btn.name }}</v-btn>
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
        format: "",
        message: "",
        tableHead: {
          name: "",
          value: ""
        },
        table: [
          {
            name: "",
            value: ""
          }
        ],
        buttons: [
          {
            name: "Close",
            color: "indigo",
            callback: null
          }
        ]
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
      if (
        !this.options.buttons ||
        (this.options.buttons && this.options.buttons.length === 0)
      ) {
        this.options.buttons = [
          {
            name: "Close",
            color: "indigo",
            callback: null
          }
        ];
      }
    },
    close(btn) {
      this.showDialog = false;
      if (btn && btn.callback) {
        btn.callback();
      }
    }
  }
};
</script>

<style scoped>
.v-list,
.v-sheet {
  background-color: unset;
}
.v-list {
  padding: 0 24px;
}
.v-list-item {
  padding: 0;
}
.v-dialog > .v-card > .v-card__text {
  padding: 12px 24px;
}
.v-list-item__content {
  padding: 6px 0;
}
</style>