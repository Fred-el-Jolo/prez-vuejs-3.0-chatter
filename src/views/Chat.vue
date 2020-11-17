<template>
  <h2>Chat</h2>
  <h3>Connected as {{ userName }}</h3>
  <div class="connected-users">
    <h3>Connected users</h3>
    <div class="connected-users__container">
      <user class="connected-users__user" v-for="user in connectedUsers" :key="user.id" :avatar="user.avatar" :name="user.author" />
    </div>
  </div>
  <div class="messages-container">
    <p>Number of messages: {{ messageNumber }}</p>
    <message v-for="message in messages" :key="message.id" :html="message.html" :name="message.author" :avatar="message.avatar" :date="message.date" />
  </div>
  <message-input class="message-input" v-model="markdown" @keyup.ctrl.enter="submitMessage" />
  <icon-button icon="paper-plane" @click="submitMessage"/>
</template>

<script>
import Message from '@/components/Message';
import MessageInput from '@/components/MessageInput';
import IconButton from '@/components/base/IconButton'
import User from '@/components/User';
import marked from 'marked';

export default {
  name: 'Chat',
  components: {
    Message, MessageInput, IconButton, User
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
    if (!this.userName) {
      console.warn("No user data, redirecting to register page");
      this.$router.push({ name: 'register' });
    }

    // Init messages
    this.messages = [
      {
        id: 'a',
        author: 'admin',
        avatar: 'chat',
        date: new Date(),
        html: '<p>This is a sample message</p>'
      },
      {
        id: 'b',
        author: 'admin',
        avatar: 'chien',
        date: new Date(),
        /* eslint no-useless-escape: 0 */  // --> OFF
        html: `<p>This is a sample message with a fucking XSS shit<script>alert("yoho");<\/script>`
      },
    ];

    // Init connected users
    this.connectedUsers = [
      {
        id: 'a',
        author: 'admin',
        avatar: 'chat',
      },
      {
        id: 'b',
        author: 'robert',
        avatar: 'chien',
      },
      {
        id: 'c',
        author: 'samantha',
        avatar: 'canard',
      },
      {
        id: 'd',
        author: 'rodrigo',
        avatar: 'cochon',
      },
      
    ];
  },
  methods: {
    submitMessage() {
      this.messages.push({
        id:'c',
        author: this.userName,
        avatar: this.avatar,
        date: new Date(),
        html: marked(this.markdown),
      });
      this.markdown = '';
    }
  },
  computed: {
    messageNumber() {
      return this.messages.length;
    }
  }
}
</script>

<style scoped lang="scss">
.message-input {
  margin-left: 3em;
}

.connected-users {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 200px;
  
  &__container {
    text-align: left;
    padding-left: 2em;
  }

  &__user {
    margin-bottom: .5em;
  }
}
</style>
