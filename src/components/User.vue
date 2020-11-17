<template>
  <div class="user">
      <avatar class="user__avatar" v-if="avatar" :avatar="avatar"/>
      <span class="user__name">{{ name }}</span>
      <span class="user__action-date" v-if="date">,&nbsp;{{ formattedDate }}</span>
  </div>
</template>

<script>
import { formatDistance } from 'date-fns'
import Avatar from '@/components/Avatar'

export default {
  name: 'User',
  components: {Avatar},
  props: {
    name: String,
    avatar: String,
    date: Date,
  },
  data() {
    return {
      formattedDate: this.formatDate(this.date),
    }
  },
  mounted() {
    window.setInterval(() => {
      this.formattedDate = this.formatDate(this.date);
      console.log(this.formattedDate);
    }, 20000);
  },
  methods: {
    formatDate(date) {
      if (date) {
        return formatDistance(date, new Date());
      }
    }
  }

}
</script>

<style scoped lang="scss">
.user {
    &__avatar {
      margin-right: 1em;
    }
}
</style>
