import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './Chat.css';
import { arrayUnion, doc, getDoc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
function Chat() {
  const [chat,setChat] = useState();
  const [ep, setEp] = useState(false);
  const [text,setText] = useState("");
  const endRef = useRef(null);
  const {currentUser} = useUserStore();
  const {chatId,user} = useChatStore();
  useEffect(()=>{
    endRef.current?.scrollIntoView({ behaviour: "smooth"});
  },[]);
  function handleEmoji(e) {
    setText(t=>t+e.emoji);
    setEp(false);
  }
  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "chats", chatId), async (item) => {
      setChat(item.data());
    });
    return ()=>{
      unsub();
    }
  },[chatId])
  async function handleSend() {
    if (text==="") return;
    try {
      await updateDoc(doc(db,"chats",chatId),{
        messages: arrayUnion({
          senderId: currentUser,
          text,
          createdAt: new Date()
        })
      })
      const userChatsRef = doc(db,"userchats",currentUser.id);
      const userChatsSnapshot = await getDoc(userChatsRef);
      const userChatsData = userChatsSnapshot.data();
      const chatIndex = userChatsData.chats.findIndex(c=>c.chatId===chatId);
      userChatsData.chats[chatIndex].lastMessage = text;
      userChatsData.chats[chatIndex].isSeen = true;
      userChatsData.chats[chatIndex].updatedAt = Date.now();
      
      await updateDoc(userChatsRef, {
        chats: userChatsData.chats
      })
      setText("");
    }
    catch (err) {
      console.log(err);
      setText("");
    }
  }
  return (
    <div class="chat">
      <div className="top">
        <div className="user">
          <img src={user.avatar} alt="dp" width={30} height={30} style={{borderRadius:50}}/>
          <div className="text">
            <span>{user.username}</span>
            <p>At the Movies!</p>
          </div>
        </div>
        <div className="icons">
          <i class="fa-solid fa-phone"></i>
          <i class="fa-solid fa-video"></i>
          <i class="fa-solid fa-circle-info"></i>
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message)=>(
          <div className={(message.senderId.id==currentUser.id) ? "msg own":"msg"} key={message?.createdAt}>
            {(message.senderId.id!=currentUser.id) ? <img src={message.senderId.avatar} alt="dp" width={30} height={30} style={{borderRadius:50}}/> : ""}
            <div className="text">
              <p>{message.text}</p>
              <span>{}</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <i class="fa-solid fa-image"></i>
          <i class="fa-solid fa-camera"></i>
          <i class="fa-solid fa-microphone"></i>
        </div>
        <input type="text" placeholder='Type a message' value={text} onChange={(e)=>setText(e.target.value)}/>
        <div class="emoji">
          <i class="fa-solid fa-face-smile" onClick={()=>setEp(e=>!e)}></i>
          <div className="emoji-picker">
            <EmojiPicker theme='dark' open={ep} onEmojiClick={handleEmoji} width={350} height={350} reactionsDefaultOpen={true}/>
          </div>
        </div>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Chat