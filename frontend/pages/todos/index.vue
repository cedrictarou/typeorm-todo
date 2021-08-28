<template>
  <div class="pl-4 pr-4 pt-2">
    <add-todo-field :todos="todos"></add-todo-field>
    <list-todos v-if="todos.length"></list-todos>
    <no-todo v-else />
  </div>
</template>

<script>
import AddTodoField from '@/components/todo/AddTodoField.vue'
import ListTodos from '@/components/todo/ListTodos.vue'
import NoTodo from '@/components/todo/NoTodo.vue'
export default {
  components: {
    ListTodos,
    AddTodoField,
    NoTodo,
  },
  async fetch({ store, $axios }) {
    const res = await $axios.$get('/todos')
    store.commit('setTodos', res)
  },
  computed: {
    todos() {
      return this.$store.getters.todos
    },
  },
}
</script>
