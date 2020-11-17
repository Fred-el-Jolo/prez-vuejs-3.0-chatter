<template>
  <h2>Register</h2>
  <h3>Choose an avatar</h3>
  <div class="register__avatars">
    <avatar-selector :avatars="avatars" @select="onAvatarSelected" />
  
  </div>
  <span>Name:</span>&nbsp;<base-input v-model="name" />
  <base-button @click="onRegister">Register</base-button>
</template>

<script>
import BaseInput from '@/components/base/BaseInput';
import BaseButton from '@/components/base/BaseButton';
import AvatarSelector from '@/components/AvatarSelector';
export default {
  name: 'Register',
  components: {
    BaseInput,
    BaseButton,
    AvatarSelector,
  },
  data: function() {
    return {
      name: '',
      avatar: null,
      avatars: [],
    };
  },
  created() {
    this.avatars = ['canard', 'chat', 'chien', 'cochon', 'hamster', 'hibou', 'hippo', 'leopard', 'lion', 'raton-laveur', 'renard', 'rhino'];
  },
  methods: {
    onRegister() {
      if (this.name) {
        this.$router.push({ name: 'chat', params: { userName: this.name, avatar: this.avatar } });
      }
    },
    onAvatarSelected(value) {
      this.avatar = value;
    }
  }
}
</script>

<style scoped lang="scss">
  .register__avatars {
    display: flex;
    flex-wrap: wrap;
    width: 500px;
    margin: auto;
  }
</style>
