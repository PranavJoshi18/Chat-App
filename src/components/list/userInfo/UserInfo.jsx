import React from 'react';
import './UserInfo.css';
import { useUserStore } from '../../../lib/userStore';
function UserInfo() {
  const {currentUser} = useUserStore();
  return (
    <div class="user-info">
        <div className="user">
            <img src={currentUser.avatar} alt="dp" width={30} height={30} style={{borderRadius:50}}/>
            <span>{currentUser.username}</span>
        </div>
        <div className="icons">
            <i class="fa-solid fa-ellipsis"></i>
            <i class="fa-solid fa-video"></i>
            <i class="fa-solid fa-pen-to-square"></i>
        </div>
    </div>
  )
}

export default UserInfo