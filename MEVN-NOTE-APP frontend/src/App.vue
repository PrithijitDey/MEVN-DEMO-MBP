<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

export default defineComponent({
  name: 'App',

  data() {
    return {
      //
    }
  }
})
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
* {
  margin: 0%;
  padding: 0%;
  box-sizing: border-box;
}
.vue-universal-modal {
  /* Change dimmed color */
  background-color: rgba(255, 255, 0, 0.3);
}
.vue-universal-modal-content {
  /* Align to top (flex-direction property value is set to column) */
  justify-content: flex-start;
}
.v-input__append {
  display: none !important;
}
select {
  appearance: auto !important;
}

body {
  overflow: hidden;
}
</style>
