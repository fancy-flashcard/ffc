<template>
  <div class="ThirdPartyDeckSelection">
    <v-subheader>Third Party Decks</v-subheader>
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

import { ThirdPartyDeck } from "../../types";

@Component
export default class ThirdPartyDeckSelection extends Vue {
  thirdPartyList: ThirdPartyDeck[] = thirdPartyList;
  deckModel = null;

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

    this.$eventHub.$emit("showCustomDialog", options);
  }

  async onDownload(url: string) {
    try {
      const response = await fetch(url);
      const fileContent = await response.json();
      this.$eventHub.$emit("addDecksFromJSON", fileContent);
    } catch (error) {
      this.$eventHub.$emit(
        "snackbarEvent",
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
</style>