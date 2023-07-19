import React from "react";
import { Button, Divider, Drawer } from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "../EditableInput";
// import { database } from "../../misc/firebase";
import { getDatabase, ref, set, update } from "firebase/database";
import { Message, useToaster } from "rsuite";
import ProviderBlock from "./ProviderBlock";
import AvtarUploadBtn from "./AvtarUploadBtn";
import { getUserUpdates } from "../../misc/helpers";
// import { Message, useToaster } from "rsuite";
// const toaster = useToaster();
// toaster.push(
//   <Message showIcon type="info">
//     Signed Out
//   </Message>
// );
const Dashboard = ({ onSignOut }) => {
  const toaster = useToaster();
  const { profile } = useProfile();
  const onSave = async (newData) => {
    console.log(newData);

    try {
      // const database = getDatabase();
      // const useUsernameRef = ref(database, `profiles/${profile.uid}/name`);
      // await set(useUsernameRef, newData);
      // ---------------------------------------------------------
      const database = getDatabase();
      const refToUpdate = ref(database);
      const updates = await getUserUpdates(
        profile.uid,
        "name",
        newData,
        database
      );
      console.log("UPDATES IN DASHBOARD : ", updates);
      const result = await update(refToUpdate, updates);
      console.log("DASHBOARD RESULT : ", result);

      // ----------------------------------------------------------
      toaster.push(
        <Message showIcon type="success">
          Username updated successfully.
        </Message>
      );
    } catch (error) {
      <Message showIcon type="error">
        Something went wrong.
      </Message>;
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h1>Hey {profile.name}</h1>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          initial_value={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Username</h6>}
        />
        <AvtarUploadBtn />

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
