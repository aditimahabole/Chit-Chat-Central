import React from 'react'
import { useCurrentRoom } from '../../../context/current-room.context'
import { Button } from 'rsuite';
import { useModalState } from '../../../misc/customHook';
import {Modal} from 'rsuite'
import { memo } from 'react';

const RoomInfoBtnModal = () => {
    const {isOpen, open,close} = useModalState();
    const des = useCurrentRoom(value=>value.description);
    const name = useCurrentRoom(value=> value.name);

  return (
    <>
        <Button appearance='link' className='' onClick={open} >Room information</Button>
        <Modal open={isOpen} onClose={close}>
          <Modal.Header>
            <Modal.Title>About {name} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h6 className='mb-1'>Description</h6>
          <p>{des}</p>
            
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              appearance="primary"
              color='yellow'

              onClick={close}
            
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  )
}

export default memo( RoomInfoBtnModal)