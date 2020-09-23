import { auth, firestore } from "firebase";
import { authConstant } from "./constants";
export const signup = (user) => {
  return (dispatch) => {
    const db = firestore();

    dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` });
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);
        const currentUser = auth().currentUser;
        const name = `${user.firstName} ${user.lastName}`;
        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            db.collection("users")
              .doc(data.user.uid)
              .set({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                isOnline: true,
                createdAt: new Date(),
              })
              .then(() => {
                const loggedInUser = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  uid: data.user.uid,
                  email: user.email,
                };
                localStorage.setItem("user", JSON.stringify({ loggedInUser }));
                dispatch({
                  type: `${authConstant.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
                console.log("successfully logged in..");
              });
          })
          .catch((err) => {
            dispatch({
              type: `${authConstant.USER_LOGIN}_FAILURE`,
              payload: { err },
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const signin = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` });
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        const db = firestore();
        db.collection("users")
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const name = data.user.displayName.split(" ");
            console.log(name[0]);
            const firstName = name[0];
            const lastName = name[1];

            const loggedInUser = {
              firstName,
              lastName,
              uid: data.user.uid,
              email: data.user.email,
            };
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            dispatch({
              type: `${authConstant.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedInUser },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        dispatch({
          type: `${authConstant.USER_LOGIN}_FAILURE`,
          payload: { error },
        });
      });
  };
};

export const isLoggedInUser = () => {
  return async (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    console.log("from isLoggedInUser is:", user);
    if (user) {
      dispatch({
        type: `${authConstant.USER_LOGIN}_SUCCESS`,
        payload: { user },
      });
    } else {
      dispatch({
        type: `${authConstant.USER_LOGIN}_FAILURE`,
        payload: { error: "login again please" },
      });
    }
  };
};

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstant.USER_LOGOUT}_REQUEST` });
    const db = firestore();
    var user = db
      .collection("users")
      .doc(uid)
      .update({ isOnline: false })
      .then(() => {
        auth()
          .signOut()
          .then(() => {
            localStorage.clear();
            dispatch({ type: `${authConstant.USER_LOGOUT}_SUCCESS` });
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: `${authConstant.USER_LOGOUT}_FAILURE`,
              payload: { error },
            });
          });
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
};
