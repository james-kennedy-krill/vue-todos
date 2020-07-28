<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-0">Todo(s)</h1>
      <b-alert :show="loading" variant="info">Loading...</b-alert>
      <div class="btn-group" role="group" aria-label="Filter Controls">
        <button type="button" class="btn"
                :class="{'btn-primary': showCompleted, 'btn-secondary': !showCompleted}"
                @click="toggleShowCompleted">
          Show Completed <span class="badge badge-light">{{ doneCount }}</span>
        </button>
      </div>
    </div>
    <hr>
    <add-todo></add-todo>
    <hr>
    <ul class="list-group">
      <todo v-for="todo in todos" :key="todo.id" :todo="todo"></todo>
    </ul>
    <div v-if="showCompleted">
      <h3 class="mt-4"><em>Completed</em></h3>
      <ul class="list-group">
        <todo v-for="todo in doneTodos" :key="todo.id" :todo="todo"></todo>
      </ul>
    </div>
  </div>
</template>

<script>
  import AddTodo from './AddTodo'
  import Todo from './Todo'
  import {mapGetters, mapState} from 'vuex'

  export default {
    name: "Todos",
    components: {
      AddTodo,
      Todo
    },
    data () {
      return {
        loading: false
      }
    },
    async created() {
      this.$store.dispatch('todos/refreshTodos')
    },
    computed: {
      ...mapState('todos', {
        allTodos: state => state.todos,
        showCompleted: 'showCompleted'
      }),
      ...mapGetters('todos', {
        todos: 'incompleteTodos',
        doneTodos: 'doneTodos',
        doneCount: 'doneTodosCount'
      })
    },
    methods: {
      toggleShowCompleted () {
        this.$store.commit('todos/toggleShowCompleted')
      }
    }
  }
</script>

<style scoped>

</style>