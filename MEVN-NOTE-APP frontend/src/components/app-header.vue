<template>
  <div class="header-container">
    <div class="header-text">
      <h2 class="app-heading">Welcome,{{user.username }}</h2>
      <div class="online"></div>
      <!-- <button class="btn btn-primary" @click="userStore.logout()">
      Logout
    </button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
  data(){
    return { user : JSON.parse(<string>localStorage.getItem('userData'))}

  }
})
</script>

<style lang="scss" scoped>
.header-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 66px;
  vertical-align: middle;
}
h2 {
  margin-left: 30px;
}
.online {
  height: 15px;
  width: 15px;
  background-color: green;
  border-radius: 15px;
  margin-right: 30px;
}
.app-heading {
  background-color: rgb(221, 221, 221);
  animation-name: example;
  animation-duration: 4s;
  // animation-delay: -0.5s;

}
@keyframes example {
  from {
    opacity: 0;
  }
  to {
    duration: 1.5;
        opacity: 1;
        y: 0;
        delay: 1.3;
        
        stagger: 0.1;
  }
}
</style>
