// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjE1NmdRTnhGIiwiaWF0IjoxNTc4NzkzNjA3MjI4LCJleHAiOjE1Nzg4ODAwMDcsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6ImVkQ2hhdCIsImRhdGEiOnsibW9iaWxlTnVtYmVyIjowLCJlbWFpbCI6Inh0cmVtYXRvckBwdWJnLmNvbSIsImxhc3ROYW1lIjoidGhlIERlc3Ryb3llciIsImZpcnN0TmFtZSI6Ilh0cmVtYXRvciIsInVzZXJJZCI6Ikdxdk5YRnQ3In19.pgI1CwkZ2lEgtxonoBElhhgfbBrZVNY3O7rJC5Jzyaw"
const userId= "GqvNXFt7"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'A7FtTpaQ',//putting user2's id here 
  receiverName: "Decardo",
  senderId: userId,
  senderName: "Decardo"
}

let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authToken);

  });

  socket.on(userId, (data) => {

    console.log("you received a message from "+data.senderName)
    console.log(data.message)

  });

  socket.on("online-user-list", (data) => {

    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)

  });


  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Decardo")

  })

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });



}// end chat socket function

chatSocket();
