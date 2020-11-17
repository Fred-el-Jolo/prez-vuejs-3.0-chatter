<template>
  <div class="message">
    <user class="message__header" :name="name" :avatar="avatar" :date="date" />
    <div class="message__content" v-html="sanitizedHtml"></div>
  </div>
</template>

<script>
import DOMPurify from 'dompurify';
import User from '@/components/User';

export default {
  name: 'Message',
  components: {User},
  props: {
    html: String,
    name: String,
    avatar: String,
    date: Date,
  },
  computed: {
      sanitizedHtml() {
        return DOMPurify.sanitize(this.html);
      }
  }
}
</script>

<style scoped lang="scss">
.message {
    width: 400px;
    margin: auto;
    margin-top: 2em;
    margin-bottom: 2em;
    
    &__header {
      text-align: left;
    }

    &__content {
      border: 1px solid;
    }
}
</style>
