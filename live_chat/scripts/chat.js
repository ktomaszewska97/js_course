class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message){
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };

    // save in the db
    const response = await this.chats.add(chat);
    return response;
    }

    // callback function (returns a function)
    getChats(callback){
        this.unsub = this.chats
        // method that gets documents based on a condition
        // firestore method
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added') {
                    callback(change.doc.data())
                }
            })
        })
    }

    updateUsername(username){
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateRoom(room){
        this.room = room;
        console.log('room updated');
        // unsubscribe from the current room
        if(this.unsub) {
            this.unsub();
        }
    }
}

//const chat = new Chatroom('general', 'steven');
// chat.addChat('funny message').then( () => {
//     console.log('mess added')
// }).catch(err => {
//     console.log(err)
// });

// chat.getChats( (data) => {
//     console.log(data);
// })