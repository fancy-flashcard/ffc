<template>
  <v-dialog v-model="showDialog" max-width="400" persistent>
    <v-card color="#2e2e2e">
      <v-card-title class="headline">
        {{ options.title }}
        <v-icon v-if="options.type" size="0.9em" color="indigo" class="mx-2">
          {{options.type === 'sponsored' ?
          'mdi-cash-usd-outline' : options.type === 'curated' ?
          'mdi-check-decagram' : options.type === 'official' ?
          'mdi-flash-circle' : null}}
        </v-icon>
      </v-card-title>

      <v-card-text v-if="options.message" class="text-left">{{ options.message }}</v-card-text>
      <v-card-text v-else-if="options.multipleMessages" class="text-left">
        <p
          class="multiple-messages"
          v-for="message in options.multipleMessages"
          :key="message.name"
        >
          <b>{{message.name}}:</b>
          {{message.value}}
        </p>
      </v-card-text>

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

      <div v-if="options.url" class="share-ffc-url">
        <v-text-field type="text" id="ffc-url" :value="options.url"></v-text-field>
      </div>

      <BarChart v-if="options.barChart" :options="options.barChart" />

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

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { CustomDialogOptions, CustomDialogOptionsButton } from "../../types";
import BarChart from "./BarChart.vue";

@Component({
  components: {
    BarChart
  }
})
export default class Dialog extends Vue {
  showDialog = false;
  options = {
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
        callback: undefined
      }
    ]
  } as CustomDialogOptions;

  hide() {
    this.showDialog = false;
  }
  show(options: CustomDialogOptions) {
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
          callback: undefined
        }
      ];
    }
  }
  close(btn?: CustomDialogOptionsButton) {
    this.showDialog = false;
    if (btn && btn.callback) {
      btn.callback();
    }
  }
}
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
.share-ffc-url {
  text-align: center;
  margin: 0 24px;
}
.multiple-messages {
  margin-bottom: 0;
}
</style>