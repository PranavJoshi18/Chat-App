import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Notification(props) {
  return (
    <div>
        {toast(props.input)};
        <ToastContainer position='bottom-right' theme='dark'/>
    </div>
  )
}

export default Notification