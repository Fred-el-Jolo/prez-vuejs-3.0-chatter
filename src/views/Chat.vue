<template>
  <h2>Chat room</h2>
  <panel class="connected-users">
    <template v-slot:header>
      Connected users
    </template>
    <template v-slot:body>
      <div class="connected-users__container">
        <user class="connected-users__user" v-for="user in connectedUsers" :key="user.id" :avatar="user.avatar" :name="user.author" :current="user.author === userName"/>
      </div>
    </template>
  </panel>
  <p>Number of messages: {{ messageNumber }}</p>
  <message v-for="message in messages" :key="message.id" :html="message.html" :name="message.author" :avatar="message.avatar" :date="message.date" />
  <message-input class="message-input" v-model="markdown" @keyup.ctrl.enter="submitMessage" />
  <icon-button icon="paper-plane" @click="submitMessage"/>
</template>

<script>
import Panel from '@/components/base/Panel';
import Message from '@/components/Message';
import MessageInput from '@/components/MessageInput';
import IconButton from '@/components/base/IconButton'
import User from '@/components/User';
import marked from 'marked';
import { generateUsers, generateMessage } from '@/utils/activity-generator.js'
import { nextTick } from 'vue';

export default {
  name: 'Chat',
  components: {
    Panel, Message, MessageInput, IconButton, User
  },
  props: {
    userName: String,
    avatar: String,
  },
  data() {
    return {
      connectedUsers: [],
      messages: [],
      markdown: '',
    };
  },
  created() {
    // Init the array with the current user
    this.connectedUsers = [{
      id: '0',
      author: this.userName,
      avatar: this.avatar,
    }];

    // Generate random users, and always add the current user
    generateUsers((users) => {
      this.connectedUsers =  [...users];
      this.connectedUsers.unshift({
        id: '0',
        author: this.userName,
        avatar: this.avatar,
      })
    });

    // Generate random messages
    generateMessage((message) => {
      this.messages = this.messages.concat([message]);
    });
  },
  methods: {
    submitMessage() {
      this.messages = this.messages.concat([{
        id:'c',
        author: this.userName,
        avatar: this.avatar,
        date: new Date(),
        html: marked(this.markdown),
      }]);
      this.markdown = '';
    }
  },
  computed: {
    messageNumber() {
      return this.messages.length;
    }
  },
  watch: {
    messages() {
      nextTick(() => {
        // Scroll to bottom on re-rendering
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
      });
    }
  }
}
</script>

<style scoped lang="scss">
.message-input {
  margin-left: 3em;
}

.connected-users {
  position: sticky;
  top: 20px;
  left: 20px;
  width: 300px;
  
  &__container {
    text-align: left;
    padding-left: 2em;
  }

  &__user {
    margin-bottom: .5em;
  }
}
</style>
