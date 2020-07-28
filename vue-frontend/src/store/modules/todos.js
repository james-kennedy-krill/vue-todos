import api from '@/api'

const state = () => ({
  todos: [],
  showCompleted: false,
  loading: false
})

const getters = {
  incompleteTodos: state => {
    return state.todos.filter(todo => !todo.done)
  },
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  },
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}

// TODO next steps, replace dispatch('message') with async axios call to server

const actions = {
  async fetchTodos({commit}) {
    commit('refreshTodos', await api.getTodos())
  },
  async refreshTodos({ dispatch,commit }) {
    commit('toggleLoading')
    await dispatch('fetchTodos')
    commit('toggleLoading')
  },
  async add({commit}, text) {
    commit('add', await api.createTodo({text, done: false}))
  },
  async update({commit}, todo) {
    commit('update', await api.updateTodo(todo.id, todo))
  },
}

const mutations = {
  refreshTodos(state, todos) {
    state.todos = todos
  },
  toggleLoading(state) {
    state.loading = !state.loading
  },
  toggleShowCompleted(state) {
    state.showCompleted = !state.showCompleted
  },
  add(state, todo) {
    state.todos.unshift(todo)
  },
  update(state, todo) {
    state.todos = [
      ...state.todos.map(t => t.id !== todo.id ? t : {...t, ...todo})
    ]
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}