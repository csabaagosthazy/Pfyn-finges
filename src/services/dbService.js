import { firebase } from "../initFirebase";

const db = firebase.firestore();

/* The road parameter has to be an XML string */
export async function showGPX(gpx) {
  var gpxFile = db.collection("gpx").doc(gpx);
  let gpxToShow;
  await gpxFile
    .get()
    .then((doc) => {
      if (doc.exists) {
        gpxToShow = doc.data().file;
        //console.log("Document data:", gpxToShow);
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
  let coords = nodes.map((node) => [node.attributes.lat.value, node.attributes.lon.value]);
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
  let myuser = await getUserParams(user);
  let poisToShow = myuser.pois;
  console.log(poisToShow);
  for (let poi in poisToShow) {
    const poiRef = db.collection("pois").doc(poisToShow[poi]);
    const found = await poiRef.get().then((doc) => doc.exists);
    if (found) {
      await poiRef.get().then((doc) => pois.push({ id: doc.id, ...doc.data() }));
    }
  }

  return pois;
}

export async function getAllPois() {
  const events = db.collection("pois");
  const tempDoc = [];
  await events.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      tempDoc.push({ id: doc.id, ...doc.data() });
    });
    console.log(tempDoc);
  });
  return tempDoc;
}

export async function updatePoi(id, fields) {
  //this method try to find a document with a given id and modify it.
  //if the doc doesn't exist it will return "not found"
  let result = { err: "", message: "" };
  const poiRef = db.collection("pois").doc(id);
  const found = await poiRef.get().then((doc) => doc.exists);

  if (found) {
    const data = await poiRef.get().then((doc) => doc.data());
    const modifiedData = { ...data, ...fields };
    await poiRef
      .set({
        ...modifiedData,
      })
      .then((result = { err: "", message: "Document successfully written!" }))
      .catch((err) => (result = { err: "Document couldn't be modified!", message: err }));
  } else {
    result = { err: "Not found", message: `Document with id ${id} not found!` };
  }

  return result;
}

export async function addPoi(fields) {
  let result = { err: "", message: "" };
  const dbCollection = db.collection("pois");
  await dbCollection
    .add({ ...fields })
    .then((result = { err: "", message: "Document successfully written!" }))
    .catch((err) => (result = { err: "Document couldn't be saved!", message: err }));
  return result;
}
