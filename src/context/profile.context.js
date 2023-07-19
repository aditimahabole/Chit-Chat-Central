import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../misc/firebase";
import { getDatabase, ref, onValue, off,onDisconnect , set,serverTimestamp } from "firebase/database";

export const isOfflineForDatabase = {
  state: "offline",
  last_changed: serverTimestamp(),
};

const isOnlineForDatabase = {
  state: "online",
  last_changed:serverTimestamp(),
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let profileRef;
    let userStatusRef;
    const db = getDatabase();
    const auth_unsubscribe = auth.onAuthStateChanged((auth_obj) => {
      console.log("auth object : ", auth_obj);
      if (auth_obj) {
        
        userStatusRef = ref(db, `/status/${auth_obj.uid}`);
        profileRef = ref(db, `profiles/${auth_obj.uid}`);
        onValue(profileRef, (snapshot) => {
          const { name, createdAt, avatar } = snapshot.val();
          const data = {
            name,
            createdAt,
            avatar,
            uid: auth_obj.uid,
            email: auth_obj.email,
          };
          setProfile(data);
          setIsLoading(false);
        
        });
        onValue(ref(db, '.info/connected'), (snapshot) => {
          if (snapshot.val() === false) {
            return;
          }
          onDisconnect(userStatusRef).set(isOfflineForDatabase).then(() => {
            set(userStatusRef, isOnlineForDatabase);
          });


        });
      } else {
        if (profileRef) {
          off(profileRef);
        }
        if (userStatusRef) {
          off(userStatusRef);
        }
        off(ref(db, '.info/connected'))
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      auth_unsubscribe();
      if (profileRef) {
        off(profileRef);
      }
      if (userStatusRef) {
        off(userStatusRef);
      }
      off(ref(db, '.info/connected'))
    };
  }, []);
  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => useContext(ProfileContext);
