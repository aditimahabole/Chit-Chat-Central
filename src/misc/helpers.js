// import { ref, update, orderByChild, equalTo, get, getDatabase } from 'firebase/database';
// // import { getDatabase } from 'firebase/database';
// import { ref, update, startAt, endAt, get } from 'firebase/database';
// import { getDatabase } from 'firebase/database';
// import { ref, update, query, orderByChild, equalTo, get, startAt, endAt } from 'firebase/database';
// import { getDatabase } from 'firebase/database';

import {
  query,
  getDatabase,
  ref,
  update,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";

export function nameInitials(name) {
  const splitName = name.toUpperCase().split(" ");
  if (splitName.length > 1) {
    let n = splitName.length - 1;
    return splitName[0][0] + splitName[n][0];
  }
  return splitName[0][0];
}

export function tranformToArray(snap_val) {
  return snap_val
    ? Object.keys(snap_val).map((roomId) => {
        return { ...snap_val[roomId], id: roomId };
      })
    : [];
}

// export async function getUserUpdates(userId,keytoUpdate,value,database)
// {
//   const updates ={};
//   updates[`/profiles/${userId}/${keytoUpdate}`] = value;
//   const getMsgs = database.ref('/messages').orderByChild('author/uid').equalTo(userId).once('value');
//   const getRooms= database.ref('/rooms').orderByChild('lastMessage/author/uid').equalTo(userId).once('value');
//   const [mSnap,rSnap] = await Promise.all([getMsgs,getRooms])
//   mSnap.forEach(msgSnap =>{
//     updates[`/messages/${msgSnap.key}/author/${keytoUpdate}`]=value
//   })

//   rSnap.forEach(roomSnap =>{
//     updates[`/rooms/${roomSnap.key}/lastMessage/author/${keytoUpdate}`]=value

//   })
//   return updates;

// }

export async function getUserUpdates(userId, keyToUpdate, value, db) {
  console.log("INSIDE GET USER UPDATE FUNCTION ");
  const database = getDatabase();
  const updates = {};
  updates[`/profiles/${userId}/${keyToUpdate}`] = value;
  console.log(`/profiles/${userId}/${keyToUpdate}`);
  const msgsQuery = query(
    ref(database, "messages"),
    orderByChild("author/uid"),
    equalTo(userId)
  );
  const msgsSnapshot = await get(msgsQuery);
  msgsSnapshot.forEach((msgSnap) => {
    updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
  });

  const roomsQuery = query(
    ref(database, "rooms"),
    orderByChild("lastMessage/author/uid"),
    equalTo(userId)
  );
  const roomsSnapshot = await get(roomsQuery);

  roomsSnapshot.forEach((roomSnap) => {
    updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });
  await update(ref(database), updates);

  return updates;
}
