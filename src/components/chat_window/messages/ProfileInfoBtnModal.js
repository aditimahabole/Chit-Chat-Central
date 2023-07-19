import React from 'react'
import {useModalState} from '../../../misc/customHook'
import { Button, Modal } from 'rsuite';
import ProfileAvatars from '../../dashboard/ProfileAvatars';

const ProfileInfoBtnModal = ({profile, ...btnProps}) => {
    const {isOpen , close , open} = useModalState();
    const shortName = profile.name.split(' ')[0];
    const {name,avatar,createdAt} = profile;
    const memberSince = new Date(createdAt).toLocaleDateString();

  return (
    <>
    <Button  {...btnProps}  onClick={open}>
        {shortName}
    </Button>
    <Modal open={isOpen} onClose={close} >
    <Modal.Header>
        <Modal.Title> {shortName} profile </Modal.Title>
    </Modal.Header>
    <Modal.Body className='text-center' >
    <ProfileAvatars src={avatar} name={name} className = 'width-200 height-200 img-fullsize font-huge'  />
    <h4 className='mt-2' >{name} </h4>
    <p>Member since {memberSince} </p>

    </Modal.Body>
    <Modal.Footer>
    <Button block onClick={close} color='orange' appearance='primary'  >Close</Button>

    </Modal.Footer>

    </Modal>
    </>
  )
}

export default ProfileInfoBtnModal