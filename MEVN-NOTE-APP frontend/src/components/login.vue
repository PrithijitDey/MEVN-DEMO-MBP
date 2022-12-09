<template>
  <div class="app">
    <form @submit.prevent="handleSubmit" class="form">
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
  //   const form = reactive({
  //     username: '',
  //     password: ''
  //   })

  //   return { form, onSubmit }
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
    signUp(payload: Record<string, any>) {
      return axios.post('/user/login', payload)
    },

    async handleSubmit() {
      try {
        const response = await this.signUp(this.form)
        console.log(response.status)
        if (response.status === 200) {
          router.push({ path: `/homepage/${this.form.username}` })
        }
        else{
          console.log("else hit")
          window.alert(response.data.message)
        }
      } catch (error) {}
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
