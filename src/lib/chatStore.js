// Used Zustand in order to store and maintain global states!

import { create } from 'zustand'
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