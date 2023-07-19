import React from 'react'
import Top from '../../components/chat_window/top/Top'
import Message from '../../components/chat_window/messages/Message'
import Bottom from '../../components/chat_window/bottom/Bottom'
import {useParams} from 'react-router-dom'
import { useRooms } from '../../context/rooms.context'
import { Loader } from 'rsuite'
import { CurrentRoomProvider } from '../../context/current-room.context'
const Chat = () => {
    const {chatId} = useParams();
    const rooms = useRooms();
    console.log('chat id :' , chatId)
    if(!rooms)
    {
        return (<Loader center vertical  size="md" content="Loading" speed="slow" />)
    }
    const current_room = rooms.find(room=> room.id === chatId)
    console.log('Current ROom : ',current_room)
    if(!current_room)
    {
        return <h6 className='text-center mt-page' > Chat {chatId} not found </h6>
    }
    const {name,description} = current_room
    const current_room_data = 
    {
        name,description
    }
  return (
    
    <CurrentRoomProvider data={current_room_data}  >
        <div className='chat-top'>
            <Top />
        </div>
        <div  className='chat-middle'>
            <Message/>
        </div>
        <div className='chat-bottom'>
            <Bottom />
        </div>
        </CurrentRoomProvider>
   
  )
}

export default Chat