<template>
  <div class="Panel">
    <div class="Panel__header">
        <slot name="header"></slot>
    </div>
    <div class="Panel__body">
        <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
}
</script>

<style scoped lang="scss">
.Panel {
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

  &__header {
      padding: .5em 0 .3em 0;
      border-bottom: 1px solid lightgrey;
  }

  &__body {
      padding: .5em;
  }
}
</style>
