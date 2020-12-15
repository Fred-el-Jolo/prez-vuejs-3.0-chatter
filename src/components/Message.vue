<template>
  <panel class="message">
    <template v-slot:header>
      <user class="message__header" :name="name" :avatar="avatar" :date="date" />
    </template>
    <template v-slot:body>
      <div class="message__content" v-html="sanitizedHtml"></div>
    </template>
  </panel>
</template>

<script>
import DOMPurify from 'dompurify';
import User from '@/components/User';
import Panel from '@/components/base/Panel';

export default {
  name: 'Message',
  components: {User, Panel},
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
    animation: fadein 2s;
    
    &__header {
      text-align: left;
    }
}

@keyframes fadein {
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}
</style>
