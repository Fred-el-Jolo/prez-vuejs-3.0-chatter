<template>
    <img class="avatar" :src="avatarSrc" title="avatar" alt="avatar" />
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    avatar: String,
    roundedBorders: { type: Boolean, default: false },
  },
  computed: {
      avatarSrc() {
          return require(`@/assets/${this.avatar}.png`);
      },
  }
}
</script>

<style scoped lang="scss">
.avatar {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    vertical-align: middle;
}
</style>
