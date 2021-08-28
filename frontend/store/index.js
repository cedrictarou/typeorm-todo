export const state = () => ({
  todos: [],
})

export const getters = {
  todos: (state) => state.todos,
}
export const mutations = {
  addTodo(state, todo) {
    state.todos.push(todo)
  },
  deleteTodo(state, id) {
    state.todos = state.todos.filter((todo) => todo.id !== id)
  },
  editTodo(state, todo) {
    const targetTodo = state.todos.filter((target) => target.id === todo.id)[0]
    targetTodo.text = todo.text
    targetTodo.isDone = todo.isDone
  },
  setTodos(state, todos) {
    // todosをリセット
    state.todos = []
    state.todos.push(...todos)
  },
}

export const actions = {
  async addTodo({ commit }, text) {
    try {
      const response = await this.$axios.$post('/todos', { text })
      commit('addTodo', response.todo)
      commit('snackbar/showSnackbar', response.message)
    } catch (error) {
      alert('Something went wrong')
    }
  },
  async deleteTodo({ commit }, id) {
    try {
      const response = await this.$axios.$delete(`/todos/${id}`)
      commit('deleteTodo', id)
      commit('snackbar/showSnackbar', response.message)
    } catch (error) {
      alert('Something went wrong')
    }
  },
  async editTodo({ commit }, targetTodo) {
    try {
      const response = await this.$axios.$put(
        `/todos/${targetTodo.id}`,
        targetTodo
      )
      commit('editTodo', response.todo)
      commit('snackbar/showSnackbar', response.message)
    } catch (error) {
      alert('Something went wrong')
    }
  },
}
