import React, { useCallback, useState, useRef } from "react";
import firebase from "firebase/compat/app";
import { Button, Modal, useToaster, Message, Form, Schema } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleArrows } from "@fortawesome/free-solid-svg-icons";
import { useModalState } from "../misc/customHook";
import FormGroup from "rsuite/esm/FormGroup";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormControl from "rsuite/esm/FormControl";
import { serverTimestamp , getDatabase ,ref} from "firebase/database";
// import { database } from "../misc/firebase";

const { StringType } = Schema.Types;


const model = Schema.Model({
  name: StringType().isRequired("Chat name is required!"),
  description: StringType().isRequired("Chat description is required!"),
});
const INITIAL_FORM = {
  name: "",
  description: "",
};

const CreateRoomBtnModal = () => {
  const toaster = useToaster();
  const { isOpen, open, close } = useModalState();
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(null);
  const formRef = useRef();

  const onFormChange = useCallback((value) => {
    setFormValue(value);
  }, []);
  const onSubmit = async () => {
    if(!formRef.current.check()){
        return
    }
    setIsLoading(true)
    const newRoomdata = {
        ...formValue,
        createdAt:serverTimestamp(),
    }

    try {
        // await database.ref('rooms').push(newRoomdata)
        // const database = getDatabase();
        // await database.ref('rooms').push(newRoomdata)
        await firebase.database().ref('rooms').push().set(newRoomdata);




        // await firebase.firestore().collection('rooms').add(newRoomdata);
        setIsLoading(false);
        toaster.push(
            <Message showIcon type="success">
              {formValue.name} has been created !
            </Message>
            , {duration:4000}
          );
        setFormValue(INITIAL_FORM)
        close();
    } catch (error) {
        toaster.push(
            <Message showIcon type="error">
              {error.message}
            </Message>
            ,
            {duration:4000}
          );
    }
  };
  return (
    <div className="mt-2">
      <Button block color="orange" appearance="primary" onClick={open}>
        <FontAwesomeIcon icon={faPeopleArrows} style={{ marginRight: "5px" }} />
        Create a Chat Room
      </Button>

      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <FormControlLabel>Room Name</FormControlLabel>
              <FormControl name="name" placeholder="Enter chat room name..." />
            </FormGroup>
            <FormGroup>
              <FormControlLabel>Description</FormControlLabel>
              {/* <FormControl as="textarea" rows={10}  name = "description" placeholder="Write something..." /> */}
              <FormControl
                rows={5}
                name="description"
                placeholder="Write something..."
                size="lg"
                style={{ height: "auto" }}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button block color="orange" appearance="primary" onClick={onSubmit} disabled= {isLoading} >
            Create New Chat Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
