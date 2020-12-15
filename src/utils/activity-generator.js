import { generateUID } from '@/utils/uid-utils.js';

/**
 * Generate a random index given an array size
 * @param {*} size 
 */
const generateRandomIndex = function(size) {
    return Math.floor(Math.random() * (size));
}

/**
 * Generate timeouts from 15 to 30 secs
 */
const generateRandomTimeout15 = function() {
    return Math.floor(Math.random() * 15000 + 15000);
}

/**
 * Generate timeouts from 30 to 60 secs
 */
const generateRandomTimeout30 = function() {
    return Math.floor(Math.random() * 30000 + 30000);
}


/**
 * [Useless] random number generator
 */
const generateRandom = function() {
    return Math.random();
}

/**
 * Generate random user names
 */
const generateName = function(){
    const names = ['Blair', 'Desiree', 'Cherri', 'Caleb', 'Sharen', 'Aaron', 'Agnus', 'Gay', 'Jo', 'Ching', 'Don', 'Jere', 'Julie', 'Edith', 'Aleen', 'Lyda', 'Yuriko', 'Anjelica', 'Dulcie', 'Nereida', 'Nolan', 'Marquitta', 'Markita', 'Louella', 'Eulah', 'Efrain', 'Tyesha', 'Mabel', 'Ericka', 'Deena', 'Kayleigh', 'Ava', 'Jazmine', 'Edmundo', 'Miriam', 'Letha', 'Criselda', 'Maryanna', 'Lizzette', 'Dayle', 'Modesto', 'Errol', 'Zackary', 'Terence', 'Abe', 'Manie', 'Leticia', 'Magdalen', 'Harland', 'Floyd'];

    return generateMessages(names).next().value;
};

/**
 * Generate random text messages
 */
const generateText = function(){
    const texts = ['Hello', 'Salut', 'Hi', 'Nope, I don\'t agree', 'Yes for sure !!!'];

    return generateMessages(texts).next().value;
};

/**
 * Generate random avatars
 */
const generateAvatar = function(){
    const avatars = ['canard', 'chat', 'chien', 'cochon', 'hamster', 'hibou', 'hippo', 'leopard', 'lion', 'raton-laveur', 'renard', 'rhino'];

    return generateMessages(avatars).next().value;
};

/**
 * Generator used to infinitely return random items from a given array
 * @param {*} messages 
 */
function* generateMessages(messages){
    // infinite loop!
    while (true){
        const randomIndex = generateRandomIndex(messages.length);
        yield messages[randomIndex];
    }
}

/**
 * Generate a random user
 */
const generateUser = function() {
    return {
        id: generateUID(),
        author: generateName(),
        avatar: generateAvatar(),
    };
};

// List of created users
const users = [];
const MIN_USERS_SIZE = 1;
const MAX_USERS_SIZE = 6;

/**
 * Continually generate / remove users
 * @param {*} callBack 
 */
export function generateUsers (callBack) {
    window.setTimeout(()=>{
        const test = generateRandom();
        if (test < 0.7) {
            users.length < MAX_USERS_SIZE && users.push(generateUser());
        }
        else {
            users.length > MIN_USERS_SIZE && users.splice(generateRandomIndex(users.length), 1);
        }
        console.log('Update users', users);
        callBack(users);
        generateUsers(callBack);
    }, generateRandomTimeout15());
}

/**
 * Continually generate messages from existing users
 * @param {*} callBack 
 */
export function generateMessage (callBack) {
    window.setTimeout(()=>{
        if (users.length) {
            const user = users[generateRandomIndex(users.length)];
            const id = user.id;
            const author = user.author;
            const avatar = user.avatar;
            const html = generateText();
            
            const message = {
                id: id,
                author: author,
                avatar: avatar,
                date: new Date(),
                html: html
            };
            console.log('Send message', message);
            callBack(message);
        }
        generateMessage(callBack);
    }, generateRandomTimeout30());
}

