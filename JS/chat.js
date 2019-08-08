class Chatroom {
    constructor(room, userName) {
        this.room = room;
        this.userName = userName;
        this.chats = db.collection('chats');
        this.unsubscribe;
    }


    async addChat(message) {
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

    getchat(cb) {
        this.unsubscribe = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type == 'added') {
                        cb(change.doc)
                    }
                })
            });
    }

    setUsername(userName){
        this.userName = userName;
        localStorage.setItem('username', userName);
    }

    changeRoom(room){
        this.room = room;
        console.log(`room updated to ${this.room}`);
        if (this.unsubscribe){
            this.unsubscribe();
        }
    }

    delAllChats() {
        this.unsubscribe = this.chats
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type == 'added') {
                        db.collection('chats').doc(change.doc.id).delete();
                    }
                })
            });
    }

}



// chatroom.getchat();

// chatroom.addChat("Hey beautiful people!").then(()=> {
//     console.log('added!')
// })
