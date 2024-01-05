// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// adding new chats to the page
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chat.addChat(message).then(newChatForm.reset())
    .catch(err => {
        console.log(err);
    });
});

// update name
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = newNameForm.name.value.trim();
    chat.updateUsername(name);
    newNameForm.reset();
    updateMessage.innerText = `Your name was updated to ${name}`;
    setTimeout(() => updateMessage.innerHTML = '',  1000);
})
// updating chat room
rooms.addEventListener('click', e => {
    if(e.target.tagName == 'BUTTON') {
        chatUI.clear();
        chat.updateRoom(e.target.getAttribute('id'));
        chat.getChats(chat => {
            chatUI.render(chat);
        })
    }
})

// check localstorage for an item
const username = localStorage.username ? localStorage.username : 'anonymous';

// class instances
const chat = new Chatroom('general', username);
const chatUI = new ChatUI(chatList);

// get chats and render them on the page
// we are subscribed to this method
chat.getChats( (data) => {
    console.log(data);
    chatUI.render(data);
    })

    

