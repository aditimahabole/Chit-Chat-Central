// import { getDatabase, ref ,orderByChild,equalTo,query ,onValue,off } from 'firebase/database'
import { getDatabase, ref, query, orderByChild, equalTo, onValue, off } from 'firebase/database';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { tranformToArray } from '../../../misc/helpers'
import MessageItem from './MessageItem'


const Message = () => {
  const {chatId} = useParams()
  const [messages, setMessages] = useState(null);
  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  
  
  // ...
  
  useEffect(() => {
    const db = getDatabase();
    const messageRef = ref(db, '/messages');
    const messagesQuery = query(messageRef, orderByChild('roomId'), equalTo(chatId));
  
    const onValueChange = (snapshot) => {
      const data = tranformToArray(snapshot.val());
      setMessages(data);
    };
  
    const valueEventListener = onValue(messagesQuery, onValueChange);
  
    return () => {
      off(messagesQuery, valueEventListener);
    };
  }, [chatId]);
  

  // useEffect(() => {
  //   const db = getDatabase();
  //   const messageRef = ref(db, '/messages');
  //   messageRef.orderByChild('roomId').equalTo(chatId).on('value',(snap)=>{
  //     const data = tranformToArray(snap.val());
  //     setMessages(data);
  //   })
  
  //   return () => {
  //     messageRef.off('value');
  //   };
  // }, [chatId]);


   // const queryRef = query(messageRef, orderByChild("author/uid"), equalTo(chatId));
  
    // const onValueChange = (snapshot) => {
    //   const data = tranformToArray(snapshot.val());
    //   setMessages(data);
    // };
  
    // onValue(queryRef, onValueChange);
  
  return (
    <ul className='msg-list custom-scroll' >
    {isChatEmpty && <li>No messages yet</li> }
    {
      canShowMessages && messages.map((msg ) => {
        return(<MessageItem key={msg.id} message={msg} />)
        

      })
    }

    </ul>
  )
}

export default Message