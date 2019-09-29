const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat-form');
const newNameForm = document.querySelector('.new-name-form');
const chatRoomButtons = document.querySelector('.chat-rooms-btns');
let elm = 'html';
const edith = document.querySelector('.edith');
console.log(edith);

VANTA.NET({
    el: elm,
    points: 8.00,
    maxDistance: 20.00,
    color: 0xb3446,
    backgroundColor: 0x100820
})


// console.log(chatList);
if (localStorage.getItem("username")) {
    username = localStorage.getItem("username");
}
else {
    document.querySelector('.alert-info').classList.remove('d-none');
    username = 'Anon';
}
const chatroom = new Chatroom('', username);
const ui = new UI(chatList);
//chatroom.delAllChats();

chatroom.getchat((data) => {
    ui.renderElem(data);
})

newChatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const msg = newChatForm.querySelector('#msg').value.trim();
    chatroom.addChat(msg).then(() => {
        let bubbles = document.querySelectorAll(".chatbubble");
        last = bubbles[bubbles.length - 1];
        last.scrollIntoView();
    })
    newChatForm.querySelector('#msg').value = "";

})

newNameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = newNameForm.querySelector('#name').value.trim();
    chatroom.setUsername(name);
    newNameForm.querySelector('#name').value = "";
})

chatRoomButtons.addEventListener('click', (event) => {
    console.log(event.target.tagName);
    if (event.target.tagName == 'BUTTON' || event.target.tagName == 'SPAN') {
        ui.clearChats();
        console.log(event.target.id);
        chatroom.changeRoom(event.target.id);
        chatroom.getchat((data) => ui.renderElem(data));
    }
})

edith.addEventListener('click', () => {
    document.querySelector('.alerty').classList.remove('d-none');
    console.log('triggered')
    document.querySelector("body > div > div.alert.alerty.alert-dark.alert-dismissible.fade.show > button").addEventListener('click', () => {
        document.querySelector('.alerty').classList.add('d-none')
    })
})