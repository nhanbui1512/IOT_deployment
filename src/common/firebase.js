const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, child } = require("firebase/database");
const firebaseConfig = require("../config/firebase");

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

async function writeRealtime(reference, value) {
  try {
    console.log("ref, value", reference, value);
    await set(ref(database, reference), value);
    console.log("Data written successfully:", value);
  } catch (error) {
    console.log("Failed with error:", error);
  }
}

async function readRealtime(reference) {
  try {
    console.log("ref", reference);
    const snapshot = await get(child(ref(database), reference));
    if (snapshot.exists()) {
      console.log("Data:", snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.log("Read failure:", error);
  }
}

module.exports = { writeRealtime, readRealtime };
