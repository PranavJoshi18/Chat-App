import React, { useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { setDoc, doc } from 'firebase/firestore';
import Notification from '../notifications/Notification';
import upload from '../../lib/upload';
function Login() {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(
    {
        file:null,
        url:""
    }
  );
  function handleAvatar(e) {
    if (e.target.files[0]) {
        setAvatar({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
    }
  }
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const {email,password} = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth,email,password);
      <Notification input="Logged In!"/>
    }
    catch(err) {
      console.log(err);
      <Notification input="Check Again!"/>
    }
    finally {
      setLoading(false);
    }
  }
  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const {username,email,password} = Object.fromEntries(formData);
    try {
      const res = await createUserWithEmailAndPassword(auth,email,password);
      const imgUrl = await upload(avatar.file)
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked:[]
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats:[]
      });
      <Notification input="Account Created!"/>
    }
    catch (err) {
      console.log(err);
      <Notification input="Check Again!"/>
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <div class="login">
        <div className="col">
            <h2>Welcome Back!</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder='Email' name='email' />
                <input type="password" placeholder='Password' name='password' />
                <button disabled={loading}>Login</button>
            </form>
        </div>
        <div className="separator"></div>
        <div className="col">
            <h2>Create an Account</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="file">
                    <img src={avatar.url} alt="" width={40} height={40}/>
                    Upload an Avatar</label>
                <input type= "file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
                <input type="text" placeholder='Username' name="username"/>
                <input type="text" placeholder='Email' name='email'/>
                <input type="password" placeholder='Password' name='password'/>
                <button disabled={loading}>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default Login