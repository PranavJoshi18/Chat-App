import React from 'react';
import UserInfo from './userInfo/UserInfo';
import ChatList from './chatList/ChatList';
import './List.css'
import { useUserStore } from '../../lib/userStore';
function List() {
  const {currentUser,fetchUserInfo} = useUserStore();
  return (
    <div class="list">
      <UserInfo />
      <ChatList />
    </div>
  )
}

export default List