<template>
  <div :class="cssClasses">
      <avatar class="user__avatar" v-if="avatar" :avatar="avatar"/>
      <span class="user__name">{{ displayName }}</span>
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
    current: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      formattedDate: this.formatDate(this.date),
      intervalId: null,
    }
  },
  mounted() {
    this.intervalId = window.setInterval(() => {
      this.formattedDate = this.formatDate(this.date);
      //console.log(this.formattedDate);
    }, 20000);
  },
  beforeUnmount() {
    window.clearInterval(this.intervalId);
  },
  computed: {
    cssClasses() {
      return ['user', {current: this.current}];
    },
    displayName() {
      return `${this.current ? 'Connected as ' : ''}${this.name}`;
    }
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

    &.current {
      font-weight: 600;
    }
}
</style>
