const socket = io();

let user;

do{
    user = prompt("Please enter your name: ");
}
while(!user)

const text_area = document.getElementById("textarea");
const messageArea = document.querySelector(".message__area");

text_area.addEventListener('keyup', (e)=>{
    if(e.key == 'Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    var msg = {
        message:message.trim(),
        user
    }

    appendMessage(msg, "outgoing");

    socket.emit("msgSend", msg);
    text_area.value="";
    scrollToBottom();
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className, "message");

    let markup = `<h4>${msg.user}</h4>
                <p>${msg.message}</p>`

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

socket.on("sendToAll", (msg)=>{
    appendMessage(msg, "incoming");
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}