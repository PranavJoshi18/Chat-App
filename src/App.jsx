import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import Notification from "./components/notifications/Notification";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
function App() {
  const {currentUser,fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();
  useEffect(()=>{
    const unSub = onAuthStateChanged(auth,(user)=>{
      fetchUserInfo(user?.uid);
    })
    return ()=> {
      unSub();
    }
  },[fetchUserInfo])
  return (
    <div class="container">
      {currentUser ? (
      <>
        <List />
        {chatId && <Chat />}
        {chatId && <Detail />}
      </>
    ) : <Login />}
    </div>
  )
}
export default App
