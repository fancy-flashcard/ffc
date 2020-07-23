<template>
  <div class="ThirdPartyDeckSelection">
    <v-subheader>Third Party Decks
      <v-icon size="1em" @click="showHelpText = !showHelpText" class="mx-1">mdi-help-circle-outline</v-icon>
    </v-subheader>
    <p class="description" v-show="showHelpText">
      Easily import decks created by others.
      If you want to add your own deck to the selection, check out our
      <a
        href="https://github.com/fancy-flashcard/ffc/"
      >GitHub repository</a>!
      Decks can be official
      <v-icon size="1em" color="indigo">mdi-flash-circle</v-icon>, curated
      <v-icon size="1em" color="indigo">mdi-check-decagram</v-icon>, sponsored
      <v-icon size="1em" color="indigo">mdi-cash-usd-outline</v-icon> or just plain old normal decks.
      <br>
      Click on a deck to see the details and add it by clicking on the download button.
    </p>
    <v-list>
      <v-list-item-group @change="onChange" v-model="deckModel">
        <v-list-item
          v-for="(deck, index) in thirdPartyList"
          :key="index"
          :value="deck.url"
          :id="deck.url"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ deck.name }}
              <v-icon size="1em" color="indigo">
                {{deck.type === 'sponsored' ?
                'mdi-cash-usd-outline' : deck.type === 'curated' ?
                'mdi-check-decagram' : deck.type === 'official' ?
                'mdi-flash-circle' : null}}
              </v-icon>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn icon dark @click.stop="onDownload(deck.url)">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import thirdPartyList from "../../../third-party-decks.json";

import { Event, ThirdPartyDeck } from "../../types";

@Component
export default class ThirdPartyDeckSelection extends Vue {
  thirdPartyList: ThirdPartyDeck[] = thirdPartyList;
  deckModel = null;
  showHelpText = false;

  onChange() {
    const currentURL = this.deckModel;
    const currentDeck = thirdPartyList.find(deck => deck.url === currentURL);

    const options = {
      title: currentDeck?.name,
      type: currentDeck?.type,
      multipleMessages: [
        {
          name: "Author",
          value: currentDeck?.author
        },
        {
          name: "Description",
          value: currentDeck?.desc
        },
        {
          name: "Type",
          value: currentDeck?.type
        }
      ],
      buttons: [
        {
          name: "Close",
          color: "indigo",
          callback: () => {
            this.deckModel = null;
          }
        }
      ]
    };

    this.$eventHub.$emit(Event.SHOW_CUSTOM_DIALOG, options);
  }

  async onDownload(url: string) {
    try {
      const response = await fetch(url);
      const fileContent = await response.json();
      this.$eventHub.$emit(Event.ADD_DECKS_FROM_JSON, fileContent, url);
    } catch (error) {
      this.$eventHub.$emit(
        Event.SNACKBAR_EVENT,
        "An error occurred while loading the third party deck"
      );
    }

    this.deckModel = null;
  }
}
</script>

<style scoped>
.v-list-item__icon {
  margin: 8px;
}
.theme--dark.v-list-item--active:hover::before,
.theme--dark.v-list-item--active::before {
  opacity: 0;
}
.v-subheader .v-icon {
  color: inherit;
}
.description {
  align-items: center;
  font-size: 0.875rem;
  font-weight: 400;
  padding: 0 16px;
  color: rgba(255, 255, 255, 0.7);
}
</style>