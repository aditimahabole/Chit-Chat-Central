import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Container, Grid, Row, Col, Panel, Button } from "rsuite";
import { auth } from "../misc/firebase";
import firebase from "firebase/compat/app";
import { Message, useToaster } from "rsuite";
import { signInWithPopup } from "firebase/auth";
import { getDatabase, ref, serverTimestamp, set } from "firebase/database";

const SignIn = () => {
  const toaster = useToaster();
  const signin_with_provider = async (provider) => {
    try {
      const db = getDatabase();
      const { user } = await signInWithPopup(auth, provider);
      console.log('PERSON : \n',user);
      if (user.uid !== null) {
        await set( ref(db,`/profiles/${user.uid}`),{
          name: user.displayName,
          email:user.email,
          createdAt:serverTimestamp(),
        });
      }
      toaster.push(
        <Message showIcon type="success">
          SignedIn Successfully
        </Message>
      );
    } catch (err) {
      toaster.push(
        <Message showIcon type="info">
          Permission Denied
        </Message>
      );
    }
  };
  const on_facebook_signin = () => {
    signin_with_provider(new firebase.auth.FacebookAuthProvider());
  };
  const on_google_signin = () => {
    signin_with_provider(new firebase.auth.GoogleAuthProvider());
  };
  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chit-Chat</h2>
                <p>Revolutionary chat platform tailored for newcomers</p>
              </div>
              <div className="mt-3">
                <Button
                  block
                  color="blue"
                  appearance="primary"
                  onClick={on_facebook_signin}
                >
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    style={{ marginRight: "5px" }}
                  />
                  Continue with Facebook
                </Button>
                <Button
                  block
                  color="green"
                  appearance="primary"
                  onClick={on_google_signin}
                >
                  <FontAwesomeIcon
                    icon={faGoogle}
                    style={{ marginRight: "5px" }}
                  />
                  Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};
export default SignIn;
