<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
        <snack-bar />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SnackBar from '../components/shared/SnackBar.vue'

export default {
  components: {
    SnackBar,
  },
}
</script>

<style lang="scss"></style>
