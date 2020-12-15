<template>
    <textarea class="message-input" 
      cols="50" 
      rows="4" 
      placeholder="Write your message here" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" /></template>

<script>

export default {
  name: 'MessageInput',
  props: ['modelValue'],
}
</script>

<style scoped lang="scss">
.message-input {
    resize: none;
}
</style>
