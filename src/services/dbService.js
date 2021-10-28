import { firebase } from "../initFirebase";
import { forEach } from "lodash/fp/_util";
import { signOut } from "firebase/auth";

const db = firebase.firestore();

/* The road parameter has to be an XML string */
export async function showGPX(gpx) {
  console.log("gpxToshow", gpx);

  var gpxFile = db.collection("gpx").doc(gpx);
  let gpxToShow;
  await gpxFile
    .get()
    .then((doc) => {
      if (doc.exists) {
        gpxToShow = doc.data().file;
        console.log("Document data:", gpxToShow);
      } else {
        console.log("no such document !");
      }
    })
    .catch((error) => {
      console.log("Error getting document: ", error);
    });

  const result = gpxToShow;
  /* Fetch something from the database, and replace the road with the content of the DB
   *  It might get a user, with all pois and points related to this user */
  let parser = new DOMParser();
  let parsed = parser.parseFromString(result, "application/xml");
  let nodes = [...parsed.querySelectorAll("trkpt")];
  let coords = nodes.map((node) => [
    node.attributes.lat.value,
    node.attributes.lon.value,
  ]);
  console.log(coords);
  return coords;
}

export async function createUserData(user, firstname, lastname) {
  let users = db.collection("users");
  let userDocumentRef = users.doc(user.user.uid);
  let userDocument = await userDocumentRef.get();

  if (!userDocument.exists) {
    await userDocumentRef.set({
      firstname: firstname,
      lastname: lastname,
      email: user.user.email,
      pois: [],
      gpx: [],
    });
  }
  return user;
}

export async function getGPXAsString(user) {
  var dataUser = db.collection("users").doc(user.uid);
  let gpxToShow;
  await dataUser
    .get()
    .then((doc) => {
      if (doc.exists) {
        gpxToShow = doc.data().gpx;
        console.log("Document data:", gpxToShow);
      } else {
        console.log("no such document !");
      }
    })
    .catch((error) => {
      console.log("Error getting document: ", error);
    });
  return gpxToShow;
}

export async function getUserParams(user) {
  var userObj = db
    .collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("User found", doc.data());
        return doc.data();
      } else {
        console.log("no such document !");
      }
    })
    .catch((error) => {
      console.log("Error getting document: ", error);
    });

  return userObj;
}

export async function getPoisByUser(user, isAdmin) {
  let pois = [];
  if (isAdmin) {
    db.collection("pois")
      .get()
      .then((item) => {
        pois = item.docs.map((doc) => doc.data());
        console.log("POI FOR ", isAdmin, " are ", pois);
        return pois;
      });
  } else {
    let myuser = await getUserParams(user);
    let poisToShow = myuser.pois;
    for (let poi in poisToShow) {
      db.collection("pois")
        .doc(poisToShow[poi])
        .get()
        .then((poi) => pois.push({ id: poi.id, ...poi.data() }));
    }
    console.log("POI FOR ", isAdmin, " are ", pois);
    return pois;
  }
}
