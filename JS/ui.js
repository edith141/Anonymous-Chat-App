class UI{
    constructor(list){
        this.list = list;
    }
    
    clearChats(){
        this.list.innerHTML = "";
    }
    
    
    renderElem(data){
        const timeOfMsg = dateFns.distanceInWordsToNow(data.created_at.toDate(), {addSuffix: true});
        // const htmlElem = `
        // <li class = "list-group-item chatbubble">
        //     <div>
        //         <i class="fas fa-user-circle"></i>
        //         <span class = "username">${data.username}: </span>
        //     </div>
        //     <div class = "d-flex justify-content-between align-items-center">
        //         <div class = "message">${data.message} </div>
        //         <div class = "timestamp">${timeOfMsg}</div>  
        //     </div>            
        // </li>
        // `;
        const htmlElem = `
        <li class = "list-group-item chatbubble">
                <div class = "d-flex justify-content-between align-items-center">
                    <div>
                        <i class="fas fa-user-circle"></i>
                        <span class = "username">${data.username}: </span>
                    </div>
                <div class = "timestamp">${timeOfMsg}
                </div>  
                </div>
                    
                <span class = "message">${data.message} </span>
                                
            </li>`;
        // console.log(htmlElem)
        this.list.innerHTML += htmlElem;
        // console.log(this.list.innerHTML)
        // console.log(this.list.innerHTMl);
    }
    
}