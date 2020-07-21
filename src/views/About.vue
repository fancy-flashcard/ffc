<template>
  <div class="about">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <span class="title">Fancy Flashcard</span>
          <br />
          <span class="version">Version {{getVersion()}}</span>
          <br />
          <v-btn color="indigo" @click="shareApp" class="my-4">Share Fancy Flashcard</v-btn>

          <v-footer app>
            <span class="px-4 copyright">
              &copy; {{ new Date().getFullYear() }} Niko Lockenvitz &amp; Rene-Pascal Fischer
              <br />
              <a
                href="https://github.com/fancy-flashcard/ffc"
              >https://github.com/fancy-flashcard/ffc</a>
            </span>
          </v-footer>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Event } from "../types";
import { copyToClipboard } from "../helpers/copyToClipboardHelper";

@Component
export default class About extends Vue {
  shareApp() {
    if (navigator.share) {
      navigator
        .share({
          title: "Fancy Flashcard",
          url: "https://fancy-flashcard.github.io/ffc/",
          text: "Try out this cool app I found."
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      const options = {
        title: "Share Fancy Flashcard",
        url: "https://fancy-flashcard.github.io/ffc/",
        buttons: [
          {
            name: "Close",
            color: "grey"
          },
          {
            name: "Copy URL",
            color: "indigo",
            callback: copyToClipboard
          }
        ]
      };
      this.$eventHub.$emit(Event.SHOW_CUSTOM_DIALOG, options);
    }
  }
  getVersion() {
    return process.env.VERSION;
  }
}
</script>

<style scoped>
.about {
  text-align: center;
}
.copyright {
  margin: auto;
}
</style>
