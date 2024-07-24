// Used Zustand in order to store and maintain global states!


import { doc, getDocFromCache, getDocFromServer } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';
export const useUserStore = create((set) => ({
  currentUser: null,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({currentUser:null});
    const docRef = doc(db, "users", uid);
    try {
        const doc  = await getDocFromServer(docRef);
        if (doc.exists()) {
            set({currentUser:doc.data()})
        }
    }
    catch (err) {
        console.log(err)
        return set({currentUser:null});
    }
  }
}))