import _ from "lodash";
import { firebase } from "./initFirebase";
import { useAuth } from "./context/AuthContext";
import MainRouter from "./components/Router";

//create router which takes user auth
//depending on that redirect to a page

// Get the DB object from the firebase app
const db = firebase.firestore();

function App() {
  // Get authenticated state using the custom "auth" hook

  // Normal rendering of the app for authenticated users
  return (
    <div>
      <MainRouter />
    </div>
  );
}

export default App;

const style = {
  container: {
    textAlign: "center",
    backgroundColor: "#282c34",
    minHeight: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    color: "white",
  },
};
