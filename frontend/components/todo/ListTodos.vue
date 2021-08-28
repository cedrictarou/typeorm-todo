<template>
  <v-list flat>
    <v-list-item-group active-class="">
      <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" />
    </v-list-item-group>
  </v-list>
</template>

<script>
import TodoItem from '@/components/todo/TodoItem.vue'

export default {
  components: { TodoItem },
  computed: {
    todos() {
      return this.$store.getters.todos
    },
  },
}
</script>
