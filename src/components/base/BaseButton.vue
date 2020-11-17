<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
}
</script>

<style scoped>
  button:hover {
    cursor: pointer;
  }
</style>
