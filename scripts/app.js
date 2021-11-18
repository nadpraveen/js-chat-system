//dom Queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add New chats
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(()=> newChatForm.reset())
    .catch((err)=> console.log(err));
});

//Update username
newNameForm.addEventListener('submit', e=>{
  e.preventDefault();
  //updating name with chatroom class
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  //reset the form
  newNameForm.reset();
  // show then hide update message
  updateMsg.innerText = `Your Name was updated to ${newName}`;
  setTimeout(()=>{updateMsg.innerText = ''},3000)
});

//update chat room
rooms.addEventListener('click', e=>{
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
})

//check local storage for username
const username = localStorage.username?localStorage.username:'anonymus';


//class Instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);


//get chats and render
chatroom.getChats(data => chatUI.render(data));
