<template>
  <v-dialog :value="true" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5"> Edit Your Task </v-card-title>
      <v-card-text class="text-h1">
        <v-text-field
          v-model="dialogText"
          :rules="rules"
          @keyup.enter="saveTodo()"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('close')">
          Cancel
        </v-btn>
        <v-btn color="primary" text @click="saveTodo()"> OK </v-btn>
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
  data() {
    return {
      dialogText: '',
      rules: [(v) => v.length > 0 || 'Please type texts!'],
    }
  },
  computed: {
    dialogTextInvalid() {
      return !this.dialogText
    },
  },
  mounted() {
    this.dialogText = this.todo.text
  },
  methods: {
    saveTodo() {
      if (!this.dialogTextInvalid) {
        this.$emit('close')
        const targetTodo = {
          id: this.todo.id,
          text: this.dialogText,
          isDone: this.todo.isDone,
        }
        this.$store.dispatch('editTodo', targetTodo)
      }
    },
  },
}
</script>
