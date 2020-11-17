<template>
    <avatar v-for="avatar in refinedAvatars" :key="avatar.id" :class="{ avatar__selected: avatar.name === selectedAvatar }" :avatar="avatar.name" @click="selectAvatar(avatar.name)"/>
</template>

<script>
import { generateUID } from '@/utils/uid-utils';
import Avatar from '@/components/Avatar'

export default {
  name: 'AvatarSelector',
  components: { Avatar },
  props: {
    avatars: Array,
  },
  emits: ['select'],
  data() {
    return {
      selectedAvatar: null,
      refinedAvatars: [],
    };
  },
  created() {
    this.refinedAvatars = this.avatars.map(avatar => {
      return {
        name: avatar,
        id: generateUID(),
      };
    });
  },
  methods: {
    selectAvatar(avatar) {
      this.selectedAvatar = avatar;
      this.$emit('select', avatar);
    }
  }
}
</script>

<style scoped lang="scss">
.avatar {
    width: 50px;
    height: 50px;
    margin: 1em;
    vertical-align: middle;

    &:hover {
      background-color: lightgrey;
      cursor: pointer;
    }

    &__selected {
      background-color: lightgrey;
    }
}
</style>
