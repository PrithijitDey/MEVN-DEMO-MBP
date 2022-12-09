<template>
  <div class="app">
    <form @submit.prevent="handleSubmit" class="form">
      <div class="creds">
        <br />
        <input
          v-model="form.name"
          name="name"
          class="input"
          placeholder="Name"
          required
        />
      </div>

      <div class="creds">
        <br />
        <input
          v-model="form.username"
          name="username"
          class="input"
          placeholder="Username"
          required
        />
      </div>

      <div class="creds">
        <br />
        <input
          v-model="form.email"
          name="email"
          class="input"
          placeholder="Email"
          required
          type="email"
        />
      </div>

      <div class="creds">
        <br />
        <input
          v-model="form.password"
          class="input"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>

      <button class="button" type="submit">Sign up</button>
    </form>
    <router-link to="/">Back to login</router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import router from '@/router'
import axios from 'axios'

/* eslint-disable */
export default defineComponent({
  name: 'Register',
  components: {},

  data() {
    return {
      form: reactive({
        name: '',
        username: '',
        email: '',
        password: ''
      })
    }
  },

  // setup() {
  //   // const form = reactive({
  //   //   name: "",
  //   //   username: "",
  //   //   password: "",
  //   // });

  //   return { form, handleSubmit };
  // },

  methods: {
    signUp(payload: Record<string, any>) {
      return axios.post('/user/register', payload)
    },

    async handleSubmit() {
      try {
        const response = await this.signUp(this.form)
        console.log(response)

        router.push({ path: '/' })
      } catch (error:any) {window.alert(error.response.data.message)}
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
