class Chatroom {
    constructor(room, userName){
        this.room = room;
        this.userName = userName;
        this.chats = db.collection('chats');
    }

    async addChat(message){
        const now = new Date();
        const chat = {
            message: message,
            username: this.userName,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };

        // const response = await this.chats.add(chat);
        // return response;
        await this.chats.add(chat);
    }

    getchat(cb){
        this.chats.where('room', '==', this.room).orderBy('created_at')
        .onSnapshot((snapshot)=> {
            snapshot.docChanges().forEach((change)=> {
                if(change.type == 'added'){
                    cb(change.doc.data())
                }
            })
        })
    }
    
}
const chatroom = new Chatroom('gaming', 'shaun');

chatroom.getchat((data)=> {
    console.log(data);
})

// chatroom.getchat();

// chatroom.addChat("Hey beautiful people!").then(()=> {
//     console.log('added!')
// })
