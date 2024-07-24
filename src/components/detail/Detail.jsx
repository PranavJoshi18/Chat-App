import React from 'react'
import './Detail.css'
import { auth } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
function Detail() {
  const {user} = useChatStore();
  return (
    <div class="detail">
      <div className="user">
        <img src={user.avatar} alt="dp" width={50} height={50} style={{borderRadius:50}}/> 
        <span>{user.username}</span>
        <p>At the Movies!</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <i class="fa-solid fa-caret-up"></i>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy and help</span>
            <i class="fa-solid fa-caret-up"></i>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <i class="fa-solid fa-caret-down"></i>
          </div>
          <div className="photos">
            <div className="photo">
              <div className="photo-item">
                <i class="fa-solid fa-user"></i>
                <span>photo.png</span>
              </div>
              <i class="fa-solid fa-download"></i>
            </div>
            <div className="photo">
              <div className="photo-item">
                <i class="fa-solid fa-user"></i>
                <span>photo.png</span>
              </div>
              <i class="fa-solid fa-download"></i>
            </div>
            <div className="photo">
              <div className="photo-item">
                <i class="fa-solid fa-user"></i>
                <span>photo.png</span>
              </div>
              <i class="fa-solid fa-download"></i>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <i class="fa-solid fa-caret-up"></i>
          </div>
        </div>
        <button>Block User</button><br />
        <button onClick={()=>auth.signOut()}>LogOut</button>
      </div>
    </div>
  )
}

export default Detail