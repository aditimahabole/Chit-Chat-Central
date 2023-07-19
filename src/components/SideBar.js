
import React ,{useEffect, useRef, useState}from 'react'
import DashboardToggle from './dashboard/DashboardToggle'
import CreateRoomBtnModal from './CreateRoomBtnModal'
import { Divider } from 'rsuite'
import ChatRoomList from './rooms/ChatRoomList'

const SideBar = () => {
  const topSideRef = useRef();
  const [height,setHeight] = useState(0)
  useEffect(()=>{
    if(topSideRef.current)
    {
      setHeight(topSideRef.current.scrollHeight)
    }

  },[topSideRef])
  return (
    <div  className='h-100 pt-2'>
    <div ref={topSideRef} >
        <DashboardToggle />
        <CreateRoomBtnModal/>
        <Divider>Join Conversation</Divider>
    </div>
    <ChatRoomList  aboveElHeight = {height} />
    
    </div>
  )
}

export default SideBar