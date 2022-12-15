<template>
  <div class="app">
    <form @submit.prevent="handleSubmit" class="form">
      <img
        src="https://www.advanceinnovationgroup.com/blog/uploads/images/image_750x_5cc19d28aa796.jpg"
      />
      <div class="creds">
        <br />
        <input
          v-model="form.username"
          class="input"
          placeholder="Username"
          required
        />
      </div>
      <div class="creds">
        <br />
        <input
          v-model="form.password"
          class="input"
          type="password"
          placeholder="Password"
          required
        />
      </div>

      <button class="button" type="submit">Login</button>
    </form>
    <router-link to="/register">Sign Up?</router-link>
  </div>
</template>
<script lang="ts">
import router from '@/router'
import axios from 'axios'
import { defineComponent, reactive } from 'vue'
/* eslint-disable */
export default defineComponent({
  name: 'Login',
  components: {},

  // setup() {

  // },
  data() {
    return {
      form: reactive({
        username: '',
        password: ''
      })
    }
  },
  methods: {
    login(payload: Record<string, any>) {
      return axios.post('/user/login', payload)
    },

    async handleSubmit() {
      try {
        const response = await this.login(this.form)

        localStorage.setItem('userData', JSON.stringify(response.data?.data))
        router.push({ path: `/homepage` })
      } catch (error: any) {
        window.alert(error.response.data.message)
      }
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../scss/variables';

.app {
  height: 100vh;
  width: 100vw;
  display: grid;
  place-content: center;
  align-items: center;
  margin: -10px;
}
.form {
  display: grid;
  place-items: center;
}
img {
  height: 150px;
  width: 160px;
}
.creds {
  margin-top: px;
  text-align: center;
}
.input {
  width: 200px;
  height: 30px;
  padding: 10px;
  border: 2px solid;
  border-radius: 4px;
  border-color: rgb(117, 170, 245);
}
.error {
}
.button {
  height: 40px;
  width: 90px;
  border: 1px;
  border-radius: 4px;
  margin-top: 20px;
  background-color: rgb(117, 170, 245);
}
a {
  text-decoration: none;
  color: rgb(73, 73, 73);
}
</style>
