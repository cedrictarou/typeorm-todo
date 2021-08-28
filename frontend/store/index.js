export const state = () => ({
  todos: [],
})

export const getters = {
  todos: (state) => state.todos,
}
export const mutations = {
  addTodo(state, payload) {
    const newTodo = {
      id: Date.now(),
      text: payload,
      isDone: false,
    }
    state.todos.push(newTodo)
  },
  deleteTodo(state, id) {
    state.todos = state.todos.filter((todo) => todo.id !== id)
  },
  doneTodo(state, targetTodo) {
    const todo = state.todos.filter((todo) => todo.id === targetTodo.id)[0]
    todo.isDone = !todo.isDone
  },
  editTodo(state, targetTodo) {
    const todo = state.todos.filter((todo) => todo.id === targetTodo.id)[0]
    todo.text = targetTodo.text
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
      commit('addTodo', text)
      setTimeout(() => {
        alert(response.message)
      }, 100)
    } catch (error) {
      // console.log(error)
      alert('Something went wrong')
    }
  },
  async deleteTodo({ commit }, id) {
    try {
      const response = await this.$axios.$delete(`/todos/${id}`)
      commit('deleteTodo', id)
      setTimeout(() => {
        alert(response.message)
      }, 100)
    } catch (error) {
      // console.log(error)
      alert('Something went wrong')
    }
  },
  async doneTodo({ commit }, targetTodo) {
    try {
      const response = await this.$axios.$put(
        `/todos/${targetTodo.id}`,
        targetTodo
      )
      commit('doneTodo', targetTodo)
      setTimeout(() => {
        alert(response.message)
      }, 100)
    } catch (error) {
      // console.log(error)
      alert('Something went wrong')
    }
  },
  async editTodo({ commit }, targetTodo) {
    try {
      const response = await this.$axios.$put(
        `/todos/${targetTodo.id}`,
        targetTodo
      )
      commit('editTodo', targetTodo)
      setTimeout(() => {
        alert(response.message)
      }, 100)
    } catch (error) {
      // console.log(error)
      alert('Something went wrong')
    }
  },
}
