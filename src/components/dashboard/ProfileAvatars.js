import React from 'react'
import { Avatar } from 'rsuite'
import { nameInitials } from '../../misc/helpers'

const ProfileAvatars = ({name , ...aprops}) => {
  return (
    <Avatar circle {...aprops}   >
    {
        nameInitials(name)
    }

    </Avatar>
  )
}

export default ProfileAvatars