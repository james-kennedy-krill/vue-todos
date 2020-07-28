<template>
  <li class="list-group-item">
    <div class="input-group">
      <div class="input-group-prepend">
        <div class="input-group-text">
          <input type="checkbox" aria-label="Checkbox for marking todo as done"
                 :name="'todo-done-'+todo.id"
                 @click="toggleDone"
                 :checked="todo.done">
        </div>
      </div>
      <input type="text" class="form-control" aria-label="Text input for todo"
             :name="'todo-text-'+todo.id"
             @keyup.enter="$event.target.blur()"
             v-model.lazy.trim="text">
    </div>
  </li>
</template>

<script>
  export default {
    name: "Todo",
    props: {
      todo: Object
    },
    computed: {
      text: {
        get () {
          return this.$store.state.todos.todos.find(t => t.id === this.todo.id).text
        },
        set (value) {
          this.$store.dispatch('todos/update', {...this.todo, text: value})
        }
      }
    },
    methods: {
      toggleDone() {
        this.$store.dispatch('todos/update', {...this.todo, done: !this.todo.done})
      }
    }
  }
</script>

<style scoped>

</style>