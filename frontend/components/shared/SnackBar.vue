<template>
  <v-snackbar
    :value="snackbar.show"
    :timeout="snackbar.timeout"
    @input="closeSnackbar"
  >
    {{ snackbar.message }}

    <template #action="{ attrs }">
      <v-btn color="red" text v-bind="attrs" @click="closeSnackbar">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar() {
      return this.$store.getters['snackbar/snackbar']
    },
  },
  methods: {
    showSnackbar() {
      this.$store.dispatch('snackbar/showSnackbar')
    },
    closeSnackbar() {
      this.$store.dispatch('snackbar/closeSnackbar')
    },
  },
}
</script>
