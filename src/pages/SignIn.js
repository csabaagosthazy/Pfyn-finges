// Configure FirebaseUI.
import { firebase } from "../initFirebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import { Link, useHistory } from "react-router-dom";

//https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
//https://github.com/WebDevSimplified/React-Firebase-Auth/blob/master/src/components/Signup.js

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display E-Mail & GitHub sign-in options
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  queryParameterForSignInSuccessUrl: "/successLogin",
  callbacks: {
    /*     signInSuccessWithAuthResult?(
      // tslint:disable-next-line:no-any firebase dependency not available.
      authResult: any,
      redirectUrl?: string isAdmin 
      ): boolean;
      signInFailure?(error: firebaseui.auth.AuthUIError): Promise<void>|void;
      uiShown?(): void; */

    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
    /* { authResult.user.getIdTokenResult().then(tokenResult => {
       if (tokenResult.claims.admin) {
         window.location.assign('/admin');
       } else {
         window.location.assign('/user');
       }
     });
   } */
  },
};

export default function SignIn() {
  return (
    <div className="App">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}
