import React, { useCallback, useState } from "react";
import { Button, Drawer, Radio, RadioGroup } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { useModalState } from "../../misc/customHook.js";
import MyDashboard from "./Dashboard";
import { useMediaQuery } from "../../misc/customHook.js";
import { auth } from "../../misc/firebase.js";
import { Message, useToaster } from "rsuite";



const DashboardToggle = () => {
  const toaster = useToaster();
  const { close} = useModalState();
  const [open,setOpen]=useState(false);
  const is_mobile = useMediaQuery('(max-width:992px)')
  const onSignOut = useCallback(()=>{
    auth.signOut();
    toaster.push(
      <Message showIcon type="info">
        Signed Out
      </Message>
    );
    close();
  },[close])
  return (
    <>
    
      <Button block color="blue" appearance="primary" onClick={()=>setOpen(true)}>
        <FontAwesomeIcon icon={faDashboard} /> Dashboard
      </Button>
      <Drawer full={is_mobile} open={open}  placement="left" onClose={() => setOpen(false)}>
        <MyDashboard onSignOut={onSignOut}  />
      </Drawer>
    </>
  );
};
export default DashboardToggle;
