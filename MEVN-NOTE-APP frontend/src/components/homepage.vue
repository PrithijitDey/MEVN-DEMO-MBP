<template class="h-full w-full">
  <div class="homepage">
    <div class="navigation"><nav-panel /></div>
    <div class="header"><AppHeader :loggeduser="$route.params.username" /></div>
  </div>
  <div class="mounted"><router-view /></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import NavPanel from './nav-panel.vue'
import AppHeader from './app-header.vue'

export default defineComponent({
  props: ['username'],
  name: 'homepage',

  components: { NavPanel, AppHeader },
  data() {
    return {
      currentPath: window.location.hash
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../scss/variables';

.homepage {
  display: flex;
  position: relative;
}
.navigation {
  background-color: rgb(37, 24, 24);
  width: 250px;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
}
.header {
  position: fixed;
  top: 0%;
  left: 250px;
  height: 66px;
  width: calc(100% - 250px);
  text-align: center;
  background-color: rgb(221, 221, 221);
}
.mounted {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: calc(100% - 250px);
  position: absolute;
  left: 250px;
}
</style>
