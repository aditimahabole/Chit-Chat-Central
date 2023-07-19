import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Input, InputGroup } from "rsuite";
import firebase from "firebase/compat/app";
import { useProfile } from "../../../context/profile.context";
import {useParams} from 'react-router-dom'
import { ref, push, getDatabase, update } from "firebase/database";
import {useToaster, Message} from 'rsuite'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";


function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
}
const Bottom = () => {
  const toaster = useToaster();
  const [input, setInput] = useState("");
  const { chatId } = useParams();
  console.log('Chat Id : ',chatId);
  const { profile } = useProfile();
  console.log('Profile : ',profile);
  const [isLoading,setIsLoading]= useState(false)

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);
  const onKeyDown = (e)=>{
    if(e.keyCode === 13)
    {
      e.preventDefault();
      onSend();
    }
  }
  const onSend = async () => {
    if (input.trim() === "") {
      return;
    }

    const msgData = assembleMessage(profile, chatId);
    console.log('Message Data : ',msgData)
    msgData.text = input;

    const updates = {};
    // const messageId = database.ref('messages').push().key()

    const database = getDatabase();
    const messagesRef = ref(database, "messages");
    const newMessageRef = push(messagesRef);
    const messageId = newMessageRef.key;
    console.log('message Id : ',messageId)
    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };
    
    setIsLoading(true);
    try {
      // await database.ref.update(updates)

      const database = getDatabase();
      const refToUpdate = ref(database); 
      console.log('Refrence to database : ',refToUpdate)
      await update(refToUpdate, updates);
      console.log('Updates : ',updates)
      setInput('')
      setIsLoading(false)

      toaster.push(
        <Message showIcon type="success">
        Message Sent
        </Message> ,  {
          duration:1000
        })
    } catch (error) {
      setIsLoading(false)

      toaster.push(
        <Message showIcon type="error">
        {error.message}
        </Message> ,  {
          duration:6000
        })
    }
  };
  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <InputGroup.Button
        disabled={isLoading}
          color="green"
          appearance="primary"
          onClick={onSend}
        >
          <FontAwesomeIcon icon={faCheckDouble} color="green" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Bottom;
