// Used Zustand in order to store and maintain global states!


import { doc, getDocFromCache, getDocFromServer } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';
export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
//   isCurrentUserBlocked: false,
//   isReceiverBlocked: false,
  changeChat: (chatId,user) => {
    //Block Feature Pending on Site!
    return set({
        chatId,
        user
    })
  }
}))