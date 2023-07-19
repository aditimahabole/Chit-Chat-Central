import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { Button, Tag } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useToaster,Message } from "rsuite";

const ProviderBlock = () => {
    const toaster = useToaster();
  const currentUser = firebase.auth().currentUser;
  console.log("USER : ", currentUser);
  const [isConnected, setIsConnected] = useState({
    "google.com": currentUser.providerData.some(
      (data) => data.providerId === "google.com"
    ),
    "facebook.com": currentUser.providerData.some(
      (data) => data.providerId === "facebook.com"
    ),
  });
  const updateIsConnected = (providerId,value)=>{
    setIsConnected(prev=>{
        return{
            ...prev,
            [providerId]:value,
        }
       

    })

  }
  const unlink = async(providerId)=>{
    try {
        if(firebase.auth().currentUser.providerData.length === 1){
            throw new Error(`You cannot disconnect from ${providerId}`)
        }
        await firebase.auth().currentUser.unlink(providerId)
        updateIsConnected(providerId,false);
        toaster.push(
            <Message showIcon type="info">
              Disconnected from {providerId}
            </Message>,
            {duration:4000}
          );
    } catch (error) {
        toaster.push(
            <Message showIcon type="error">
              {error.message}
            </Message>,
            {duration:4000}
          );
    }

  }
  const link = async (provider)=>{
    //new firebase.auth.FacebookAuthProvider()
    try {
        
        await firebase.auth().currentUser.linkWithPopup(provider)
        toaster.push(
            <Message showIcon type="success">
              Liked to {provider.providerId}
            </Message>,
            {duration:4000}
          );
          updateIsConnected(provider.providerId,true);
    } catch (error) {
        toaster.push(
            <Message showIcon type="error">
              {error.message}
            </Message>,
            {duration:4000}
          );
        
    }

  }
  const unlinkFacebook = ()=>{
    unlink('facebook.com')

  }
  const unlinkGoogle = ()=>{
    unlink('google.com')
    
  }
  const linkFacebook = ()=>{
    //new firebase.auth.FacebookAuthProvider()
    link(new firebase.auth.FacebookAuthProvider())
    
  }
  const linkGoogle = ()=>{
    link(new firebase.auth.GoogleAuthProvider())
    
  }

  return (
    <div>
      {isConnected["google.com"] && (
        <Tag color="green" closable onClose={unlinkGoogle}>
          <FontAwesomeIcon icon={faGoogle} style={{ marginRight: "5px" }} />
          Connected
        </Tag>
      )}

      {isConnected["facebook.com"] && (
        <Tag color="blue" closable onClose={unlinkFacebook}>
          <FontAwesomeIcon icon={faFacebook} style={{ marginRight: "5px" }} />
          Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected["google.com"] && (
          <Button block color="green" appearance="primary"  onClick={linkGoogle} >
            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: "5px" }} />
            Link to Google
          </Button>
        )}
        {!isConnected["facebook.com"] && (
          <Button block color="blue" appearance="primary"  onClick={linkFacebook} >
            <FontAwesomeIcon icon={faFacebook} style={{ marginRight: "5px" }} />
            Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
