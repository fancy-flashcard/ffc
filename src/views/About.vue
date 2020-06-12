<template>
  <div class="about">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <span class="title">Fancy Flashcard</span>
          <br />
          <span>&copy; {{ new Date().getFullYear() }} Niko Lockenvitz &amp; Rene-Pascal Fischer</span>
          <br />
          <a href="https://github.com/fancy-flashcard/ffc">https://github.com/fancy-flashcard/ffc</a>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.about {
  text-align: center;
}
</style>
