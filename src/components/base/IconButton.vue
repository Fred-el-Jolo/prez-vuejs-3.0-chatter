<template>
  <font-awesome-icon class="icon-button fa-lg" role="button" :icon="icon" />
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'IconButton',
  components: {FontAwesomeIcon},
  props: ['icon'],
}
</script>

<style scoped lang="scss">
.icon-button {
  vertical-align: unset;
  margin-left: .5em;
  margin-right: .5em;
  cursor: pointer;
}
</style>
