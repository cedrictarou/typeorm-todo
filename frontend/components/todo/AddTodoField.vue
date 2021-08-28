<template>
  <v-text-field
    v-model="newTodoText"
    hide-details
    outlined
    clearable
    label="Add Task"
    @keyup.enter="addTodo()"
  >
    <template #append>
      <v-icon color="primary" @click="addTodo()">mdi-plus-box</v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newTodoText: '',
    }
  },
  computed: {
    newTodoTextInvalid() {
      return !this.newTodoText
    },
  },
  methods: {
    addTodo() {
      if (!this.newTodoTextInvalid) {
        const text = this.newTodoText
        this.$store.dispatch('addTodo', text)
        this.newTodoText = ''
      }
    },
  },
}
</script>
