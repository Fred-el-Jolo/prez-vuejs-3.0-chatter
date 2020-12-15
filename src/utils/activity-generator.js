const generateRandomIndex = function(size) {
    return Math.floor(Math.random() * (size));
}

const generateRandomTimeout15 = function() {
    return Math.floor(Math.random() * 15000 + 15000);
}

const generateRandomTimeout30 = function() {
    return Math.floor(Math.random() * 30000 + 30000);
}

const generateRandom = function() {
    return Math.random();
}


const generateUID= function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

const generateName = function(){
    const names = ['Blair', 'Desiree', 'Cherri', 'Caleb', 'Sharen', 'Aaron', 'Agnus', 'Gay', 'Jo', 'Ching', 'Don', 'Jere', 'Julie', 'Edith', 'Aleen', 'Lyda', 'Yuriko', 'Anjelica', 'Dulcie', 'Nereida', 'Nolan', 'Marquitta', 'Markita', 'Louella', 'Eulah', 'Efrain', 'Tyesha', 'Mabel', 'Ericka', 'Deena', 'Kayleigh', 'Ava', 'Jazmine', 'Edmundo', 'Miriam', 'Letha', 'Criselda', 'Maryanna', 'Lizzette', 'Dayle', 'Modesto', 'Errol', 'Zackary', 'Terence', 'Abe', 'Manie', 'Leticia', 'Magdalen', 'Harland', 'Floyd'];

    return generateMessages(names).next().value;
};


const generateText = function(){
    const texts = ['Hello', 'Salut', 'Hi', 'Nope, I don\'t agree', 'Yes for sure !!!'];

    return generateMessages(texts).next().value;
};

const generateAvatar = function(){
    const avatars = ['canard', 'chat', 'chien', 'cochon', 'hamster', 'hibou', 'hippo', 'leopard', 'lion', 'raton-laveur', 'renard', 'rhino'];

    return generateMessages(avatars).next().value;
};

function* generateMessages(messages){
    // infinite loop!
    while (true){
        const index = generateRandomIndex(messages.length);
        // yield to the generator iterator
        yield messages[index];
    }
}

const generateUser = function() {
    return {
        id: generateUID(),
        author: generateName(),
        avatar: generateAvatar(),
    };
};

const users = [];
const MIN_SIZE = 1;
const MAX_SIZE = 6;

export function generateUsers (callBack) {
    window.setTimeout(()=>{
        const test = generateRandom();
        if (test < 0.7) {
            users.length < MAX_SIZE && users.push(generateUser());
        }
        else {
            users.length > MIN_SIZE && users.splice(generateRandomIndex(users.length), 1);
        }
        console.log('Update users', users);
        callBack(users);
        generateUsers(callBack);
    }, generateRandomTimeout15());
}

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

