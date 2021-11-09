import { firebase } from "../initFirebase";

const db = firebase.firestore();

/**
 * Get gpx, XML string from database by id
 * @param {String} gpx gpx id
 * @returns {object} Result of fetch process
 */
export async function showGPX(gpx) {
  let result = { err: "", message: "", response: "" };
  const gpxRef = db.collection("gpx").doc(gpx);

  await gpxRef
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        /* Fetch something from the database, and replace the road with the content of the DB
         *  It might get a user, with all pois and points related to this user */
        let data = await gpxRef.get().then((doc) => doc.data().file);
        let parser = new DOMParser();
        let parsed = parser.parseFromString(data, "application/xml");
        let nodes = [...parsed.querySelectorAll("trkpt")];
        let coords = nodes.map((node) => [
          node.attributes.lat.value,
          node.attributes.lon.value,
        ]);
        result = { err: "", message: "Success!", response: coords };
      } else {
        result = {
          err: "Not found!",
          message: `Gpx ${gpx} not found!`,
          response: "",
        };
      }
    })
    .catch((error) => {
      result = {
        err: "Error!",
        message: `Error getting document: ${error}`,
        response: "",
      };
    });

  return result;
}

/**
 *  Get gpx history by user
 * @param {object} user user object
 * @returns {object} Result of fetch process
 */
export async function getGPXAsString(user) {
  let result = { err: "", message: "", response: "" };
  var dataUser = db.collection("users").doc(user.uid);

  await dataUser
    .get()
    .then((doc) => {
      if (doc.exists) {
        result = { err: "", message: "Success", response: doc.data().gpx };
      } else {
        console.log("no such document !");
        result = {
          err: "Not found",
          message: `No gpx stored for user: ${user.uid}`,
          response: "",
        };
      }
    })
    .catch((error) => {
      console.log("Error getting document: ", error);
      result = {
        err: "Error",
        message: `Error getting user gpx: ${error}`,
        response: "",
      };
    });
  return result;
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
/**
 * Get user details
 * @param {object} user User object
 * @returns {object} Result of fetch process
 */
export async function getUserParams(user) {
  let result = { err: "", message: "", response: "" };
  await db
    .collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        result = { err: "", message: "Success", response: doc.data() };
      } else {
        result = { err: "Not found", message: `User not found!`, response: "" };
      }
    })
    .catch((error) => {
      result = {
        err: "Error",
        message: `Error getting user details: ${error}`,
        response: "",
      };
    });

  return result;
}
/**
 * Get POI history by user
 * @param {object} user user object
 * @returns {object} Result of fetch process
 */
export async function getPoisByUser(user) {
  let result = { err: "", message: "", response: "" };
  let myuser = await getUserParams(user);
  let poisToShow = myuser.response.pois;
  await db
    .collection("pois")
    .get()
    .then((querySnapshot) => {
      let pois = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (poisToShow.includes(doc.id) && doc.data().isActive)
          pois.push({ id: doc.id, ...doc.data() });
      });
      result = { err: "", message: "Success", response: pois };
    })
    .catch((error) => {
      result = {
        err: "Error",
        message: `Error getting user pois: ${error}`,
        response: "",
      };
    });

  return result;
}

/**
 * Get all pois from database
 * @returns {object} Result of the fetch process
 */
export async function getAllPois() {
  let result = { err: "", message: "", response: "" };
  const events = db.collection("pois");
  await events
    .get()
    .then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      result = { err: "", message: "Success", response: tempDoc };
    })
    .catch((error) => {
      result = {
        err: "Error",
        message: `Error getting pois: ${error}`,
        response: "",
      };
    });
  return result;
}

/**
 * Updating poi
 * @param {string} id id of poi
 * @param {object} fields poi fields
 * @returns {object} Result of update process
 */
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
      .catch(
        (err) =>
          (result = { err: "Document couldn't be modified!", message: err })
      );
  } else {
    result = { err: "Not found", message: `Document with id ${id} not found!` };
  }

  return result;
}

/**
 *
 * @param {object} fields poi fields
 * @returns {object} Result of insert process
 */
export async function addPoi(fields) {
  let result = { err: "", message: "" };
  const dbCollection = db.collection("pois");
  await dbCollection
    .add({ ...fields })
    .then((result = { err: "", message: "Document successfully written!" }))
    .catch(
      (err) => (result = { err: "Document couldn't be saved!", message: err })
    );
  return result;
}
