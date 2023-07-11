import React from "react";
import { Button, Divider, Drawer } from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "../EditableInput";

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  const onSave = async newData =>{
    console.log(newData)
  }
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h1>Hey {profile.name}</h1>
        <Divider/>
        <EditableInput 
          name = "nickname"
          initial_value = {profile.name}
          onSave = {onSave}
          label = {<h6 className="mb-2">Username</h6>}
        />

        <Drawer.Actions>
      <div>
          <Button block color="red" appearance="primary" onClick={onSignOut}>
            SignOut
          </Button>
      </div>

      </Drawer.Actions>
      </Drawer.Body>
      
      
    </>
  );
};

export default Dashboard;
