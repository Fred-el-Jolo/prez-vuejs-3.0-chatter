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
import { generateUID } from '@/utils/uid-utils.js';
import { generateUsers, generateMessage } from '@/utils/activity-generator.js'
import { ref, computed, watch, nextTick } from 'vue';

export default {
  name: 'Chat',
  components: {
    Panel,
    Message,
    MessageInput,
    IconButton,
    User,
  },
  props: {
    userName: String,
    avatar: String,
  },
  setup(props) {
    // Users
    const connectedUsers = ref([]);
    const userId = generateUID();
    
    // No onCreated hook, just do it there !!!
    // Init the array with the current user
    connectedUsers.value = [{
      id: userId,
      author: props.userName,
      avatar: props.avatar,
    }];

    // Generate random users, and always add the current user
    generateUsers((users) => {
      connectedUsers.value =  [...users];
      connectedUsers.value.unshift({
        id: userId,
        author: props.userName,
        avatar: props.avatar,
      })
    });

    // Messages
    const messages = ref([]);
    const messageNumber = computed(() => messages.value.length);
    const markdown= ref('');
    
    // No onCreated hook, just do it there !!!
    // Generate random messages
    generateMessage((message) => {
      messages.value = messages.value.concat([message]);
    });

    // submit method
    const submitMessage = () => {
      messages.value = messages.value.concat([{
        id:userId,
        author: props.userName,
        avatar: props.avatar,
        date: new Date(),
        html: marked(markdown.value),
      }]);
      markdown.value = '';
    }

    // Watch messages in order to scroll to bottom on re-rendering 
    watch(messages, () => {
      nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
      });
    });

    return {
      connectedUsers,
      messages,
      messageNumber,
      markdown,
      submitMessage,
    }
  },
}
</script>

<style scoped lang="scss">
.message-input {
  margin-left: 3em;
}

.connected-users {
  position: fixed;
  top: 30px;
  left: 30px;
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
