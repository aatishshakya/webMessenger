import { auth, firestore } from "firebase";
import { userConstant } from "./constants";

export const getRealTimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstant.GET_REALTIME_USERS}_REQUEST` });
    const db = firestore();

    const unsubscribe = db
      .collection("users")
      // where(uid, "!=", uid)
      .onSnapshot((querySnapshot) => {
        var users = [];
        querySnapshot.forEach(function (doc) {
          if (doc.data().uid != uid) {
            users.push(doc.data());
          }
        });
        dispatch({
          type: `${userConstant.GET_REALTIME_USERS}_SUCCESS`,
          payload: { users },
        });
      });
    return unsubscribe;
  };
};

export const updatedMessage = (message) => {
  return async (dispatch) => {
    const db = firestore();
    db.collection("conversations").add({
      ...message,
    });
  };
};
