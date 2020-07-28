<template>
  <div class="input-group mb-3">
    <input type="text" class="form-control"
           placeholder="Enter a new todo item here..."
           aria-label="Enter a new todo item here"
           aria-describedby="button-addon2"
           @keyup.enter="add"
            v-model.trim="todo">
    <div class="input-group-append">
      <button class="btn btn-primary" type="button" id="button-addon2" @click="add">Add New Todo</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddTodo",
    data() {
      return {
        todo: ""
      }
    },
    methods: {
      add() {
        this.$store.dispatch('todos/add', this.todo)
        this.todo = ""
      }
    }
  }
</script>

<style scoped>

</style>