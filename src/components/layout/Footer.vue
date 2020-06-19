<template>
  <div class="footer">
    <v-footer :inset="footer.inset" app>
      <span class="px-4">&copy; {{ new Date().getFullYear() }} Niko Lockenvitz &amp; Rene-Pascal Fischer</span>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    title: String
  },
  data: () => ({
    footer: {
      inset: false
    }
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
