import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { tranformToArray } from "../misc/helpers";

const RoomsContext = createContext();
export const RoomsProvider = ({children})=>{
    const [room,setRoom] = useState(null);
    useEffect(()=>{
        const roomListRef = firebase.database().ref('rooms');
        roomListRef.on('value',(snap)=>{
            const data = tranformToArray(snap.val())
            console.log('snal val room :',data)
            setRoom(data)
        })
        return ()=>{
            roomListRef.off()
        }

    },[])

    return <RoomsContext.Provider  value={room} >{children}</RoomsContext.Provider>

}
export const useRooms = ()=> useContext(RoomsContext)