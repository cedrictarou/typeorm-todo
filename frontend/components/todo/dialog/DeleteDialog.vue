<template>
  <v-dialog :value="true" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5 justify-center">
        Are you sure?
      </v-card-title>
      <v-card-text class="text-center">
        This Todo will be deleted.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('close')"> Cancel </v-btn>
        <v-btn color="pink darken-1" text @click="deleteTodo(todo.id)">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteTodo(id) {
      this.$store.dispatch('deleteTodo', id)
    },
  },
}
</script>
