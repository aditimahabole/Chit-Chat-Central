
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faWindowClose} from "@fortawesome/free-regular-svg-icons";

import React, { useCallback, useState } from "react";
import { Input, InputGroup } from "rsuite";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Message, useToaster } from "rsuite";

const EditableInput = ({
  initial_value,
  onSave,
  label = null,
  placeholder = "Write username",
  emptyMsg = "you did not enter anything!",
 ...inputprops
}) => {
    const toaster = useToaster();
  const [input, setInput] = useState(initial_value);
  const [isEditable,setIsEditable] = useState(false)
 
  const onInputChange = useCallback((value) => {
    console.log(value)
    setInput(value);
  }, []);
  const onEditClick = (()=>{
    setIsEditable(value => !value);
    setInput(initial_value)
  })
  const onSaveClick = (async ()=>{
    const trimed = input.trim();
    if(trimed === '')
    {
        toaster.push(
            <Message showIcon type="error">
              Enter something!
            </Message>
          );
    }
    if(trimed !== initial_value)
    {
        await onSave(trimed)
    }
  })
  return (
    <div>
      {label}
      <InputGroup>
      <Input
        {...inputprops}
        disabled={!isEditable}
        placeholder={placeholder}
        value={input}
        onChange={onInputChange}
      />
      <InputGroup.Button onClick={onEditClick}>
        <FontAwesomeIcon icon={isEditable?faWindowClose:faPenToSquare} />
      </InputGroup.Button>
      {isEditable && <InputGroup.Button onClick={onSaveClick}>
        <FontAwesomeIcon icon={faCheck} />
      </InputGroup.Button>}

      </InputGroup>
      
    </div>
  );
};

export default EditableInput;
