import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../misc/firebase";
import { getDatabase, ref, onValue,off } from "firebase/database";
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [ isLoading , setIsLoading] = useState(true)
  useEffect(() => {
    let profileRef;
    const auth_unsubscribe=  auth.onAuthStateChanged((auth_obj) => {
      console.log("auth object : ", auth_obj);
      if (auth_obj) {
        // const db = getDatabase();
        // db.ref(`/profiles/${auth_obj.uid}`).on('value', (snap)=>{
        //     const profile_data = snap.val()
        //     console.log('PROFILE DATA : ',profile_data)
        // })
        const db = getDatabase();
        profileRef = ref(db, `profiles/${auth_obj.uid}`);
        onValue(profileRef, (snapshot) => {
          const profile_data = snapshot.val();
          console.log("PROFILE DATA:", profile_data);
        });
        const data = {
          name : auth_obj.displayName,
          createdAt:auth_obj.createdAt,
          uid: auth_obj.uid,
          email: auth_obj.email,
        };
        setProfile(data);
        setIsLoading(false);
      } else {
        if(profileRef)
        {
            off(profileRef)
        }
        setProfile(null);
        setIsLoading(false);
      }
    });

    return ()=>{
        auth_unsubscribe();
        if(profileRef)
        {
            off(profileRef);
        }
    }
  }, []);
  return (
    <ProfileContext.Provider value={{isLoading,profile}}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => useContext(ProfileContext);
