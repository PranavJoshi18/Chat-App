import React, { useState } from 'react';
import './AddUser.css';
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
function AddUser() {
  const [user,setUser] = useState(null);
  const {currentUser} = useUserStore();
  async function handleSearch(e) {
    e.preventDefault(); //to avoid refresh of page
    const formData  = new FormData(e.target);
    const username = formData.get("username");
    console.log(username);
    try {
      const q = query(collection(db,"users"),where("username","==",username));
      const qSnapShot = await getDocs(q);
      console.log(qSnapShot);
      setUser(qSnapShot.docs[0].data());
    }
    catch (err) {
      console.log(err);
    }
  }
  async function addUser() {
    const chatRef = collection(db,"chats");
    const userChatsRef = collection(db,"userchats");
    try {
      // to access a document or create it, use doc
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef,{
        createdAt: serverTimestamp(),
        messages:[],
      })
      await updateDoc(doc(userChatsRef,user.id),{
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now()
        })
      })
      await updateDoc(doc(userChatsRef,currentUser.id),{
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now()
        })
      })
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <div class="add-user">
        <form onSubmit={handleSearch}>
            <input type="text" placeholder='Username' name='username'/>
            <button>Search</button>
        </form>
        {user && <div class="user">
            <div className="details">
              <img src={user.avatar} alt="dp" width={30} height={30} style={{borderRadius:50}}/>
              <span>{user.username}</span>
            </div>
            <button onClick={addUser}>Add User</button>
        </div>}
    </div>
  )
}

export default AddUser