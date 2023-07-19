import React from 'react'
import ProfileAvatars from '../../dashboard/ProfileAvatars';
import TimeAgo from 'timeago-react';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageItem = ({message}) => {
    const {author,createdAt,text}=message;
  return (
    <li>
        <div className='d-flex align-items-center font-bolder mb-1 ' >
            <ProfileAvatars src={author.avatar} name = {author.name} className='ml-1' size="xs" />
            {/* <span className='ml-2' >{author.name} </span> */}
            <ProfileInfoBtnModal profile={author} appearance="link" className="p-0 ml-1 text-black" />
            <TimeAgo datetime={createdAt} className='font-normal text-black-45 ml-2' />
        </div>
        <div className='mt-2 mb-2 ml-1'>
            <span className='word-break-all' >{text} </span>
        </div>
    </li>
  )
}

export default MessageItem