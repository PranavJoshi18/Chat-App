import React, { useEffect, useState } from 'react'
import AddUser from '../../addUser/AddUser';
import './ChatList.css';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useUserStore } from '../../../lib/userStore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';
function ChatList() {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const {currentUser} = useUserStore();
  const {changeChat} = useChatStore();
  const [input,setInput] = useState("");
  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (item) => {
      // setChats(item.data()); this would just add the chats and not each user info
      const items = item.data().chats;
      const promises = items.map(async (item) => {
        const userDocRef = doc(db,"users",item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.data();
        return {...item,user};
      })
      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a,b)=>b.updatedAt-a.updatedAt));
    });
    return ()=>{
      unsub()
    }
  },)
  async function handleSelect(e) {
    changeChat(e.chatId,e.user);
  }
  const filteredChats = chats.filter((c)=>c.user.username.toLowerCase().includes(input.toLowerCase()))
  return (
    <div class="chat-list">
      <div className="search">
        <div className="search-bar">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" onChange={(e)=>setInput(e.target.value)}/>
        </div>
        <i class={addMode ? "fa-solid fa-minus" : "fa-solid fa-plus"} onClick={()=>setAddMode(a=>!a)}></i>
      </div>
      {}
      {
        filteredChats.map((chat,index) => (
          <div className="item" key={index} onClick={()=>handleSelect(chat)}>
            <img src={chat.user.avatar} alt="dp" width={30} height={30} style={{borderRadius:50}}/>
            <div class="text">
              <span>{chat.user.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))
      }
      {addMode && <AddUser />} 
    </div>
  )
}

export default ChatList