const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat-form');
const newNameForm = document.querySelector('.new-name-form');
const chatRoomButtons = document.querySelector('.chat-rooms-btns');
// console.log(chatList);
if (localStorage.getItem("username")){
    username =  localStorage.getItem("username");
}
else {
    username = 'Anon';
}
const chatroom = new Chatroom('gaming', username);
const ui = new UI(chatList);

chatroom.getchat((data) => {
    ui.renderElem(data);
})

newChatForm.addEventListener('submit', (event)=> {
        event.preventDefault();
        const msg = newChatForm.querySelector('#msg').value.trim();
        chatroom.addChat(msg).then(()=>{
            let bubbles = document.querySelectorAll(".chatbubble");
        last = bubbles[bubbles.length-1];
        last.scrollIntoView();
        })
        newChatForm.querySelector('#msg').value = "";
        
})

newNameForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const name = newNameForm.querySelector('#name').value.trim();
    chatroom.setUsername(name);
    newNameForm.querySelector('#name').value = "";
})

chatRoomButtons.addEventListener('click', (event)=>{
    if(event.target.tagName == 'BUTTON'){
        ui.clearChats();
        console.log(event.target.id);
        chatroom.changeRoom(event.target.id);
        chatroom.getchat((data)=> ui.renderElem(data));

    }
})
