class UI{
    constructor(list){
        this.list = list;
    }

    clearChats(){
        this.list.innerHTML = "";
    }


    renderElem(data){
        const timeOfMsg = dateFns.distanceInWordsToNow(data.created_at.toDate(), {addSuffix: true});
        const htmlElem = `
            <li class = "list-group-item chatbubble">
                <span class = "username">${data.username}: </span>
                <span class = "message">${data.message} </span>
                <div class = "timestamp">${timeOfMsg}</div>              
            </li>
        `
        // console.log(htmlElem)
        this.list.innerHTML += htmlElem;
        // console.log(this.list.innerHTML)
        // console.log(this.list.innerHTMl);
    }

}