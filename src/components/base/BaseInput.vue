<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" >
</template>

<script>
export default {
  name: 'BaseInput',
  props: ['modelValue'],
}
</script>

<style scoped>
</style>
