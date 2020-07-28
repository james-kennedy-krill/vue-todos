import Vue from "vue";
import axios from "axios";

const client = axios.create({
  baseURL: 'http://localhost:8081',
  json: true
})

export default {
  async execute (method, resource, data) {
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getTodos () {
    return this.execute('get', '/todos')
  },
  getTodo (id) {
    return this.execute('get', `/todos/${id}`)
  },
  createTodo (data) {
    return this.execute('post', '/todos', data)
  },
  updateTodo (id, data) {
    return this.execute('put', `/todos/${id}`, data)
  },
  deleteTodo (id) {
    return this.execute('delete', `/todos/${id}`)
  }
}