<template>
  <chat-view userName="Jolo" avatar="chien" />
</template>

<script>
import ChatView from '@/views/Chat';
export default {
  name: 'App',
  components: {ChatView},
}
</script>

<style>
body {
  /*background: #e2e1e0;*/
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
