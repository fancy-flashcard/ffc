<template>
  <div class="about">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <span class="title">Fancy Flashcard</span>
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

<script>
import { copyToClipboard } from "../helpers/copyToClipboardHelper";

export default {
  name: "About",
  methods: {
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
        this.$eventHub.$emit("showCustomDialog", options);
      }
    }
  }
};
</script>

<style scoped>
.about {
  text-align: center;
}
.copyright {
  margin: auto;
}
</style>
