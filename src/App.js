// npm install react-router-dom@5
import React from "react";
import "rsuite/dist/rsuite.min.css";
import "./styles/main.scss";
import { Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home/Home";
import PublicRoute from "./components/PublicRoute";
import { ProfileProvider } from "./context/profile.context";
const App = () => {
  return (
    <ProfileProvider>
    <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
    </ProfileProvider>
  );
};
export default App;

// {
//   "rules": {
//     ".read": false,
//     ".write": false
//   }
// }

// {
//   "rules": {
//     "profiles": {
//       "$uid": {
//         ".write": "$uid === auth.uid"
//       }
//     }
//   }
// }