import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getRealTimeUsers } from "../../actions";

const User = (props) => {
  const { user, onClick } = props;
  return (
    <div key={user.uid} onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
        <img
          src="https://www.firstpaddle.com/static/media/Aatish.3e872f57.jpg"
          alt=""
        />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          margin: "0 10px",
        }}
      >
        <span style={{ fontWeight: 500 }}>
          {user.firstName} {user.lastName}
        </span>
        <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`} />
      </div>
    </div>
  );
};

const Home = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState("");
  let unsubscribe;

  useEffect(() => {
    unsubscribe = dispatch(getRealTimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //component will unmount
  useEffect(() => {
    return () => {
      //cleanup

      unsubscribe.then((f) => f()).catch((err) => console.log(err));
    };
  }, []);

  console.log("the user is:", user);

  const initChat = (user) => {
    setUserUid(`${user.uid}`);
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    console.log(user);
  };

  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message: message,
    };
    console.log(msgObj);
  };

  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          {user.users.length > 0
            ? user.users.map((user) => {
                return <User onClick={initChat} key={user.uid} user={user} />;
              })
            : null}
        </div>
        <div className="chatArea">
          <div className="chatHeader">{chatStarted ? chatUser : ""}</div>

          <div className="messageSections">
            {chatStarted ? (
              <div style={{ textAlign: "left" }}>
                <p className="messageStyle">Hello User</p>
              </div>
            ) : (
              ""
            )}
          </div>

          {chatStarted ? (
            <div className="chatControls">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write Message"
              />
              <button onClick={submitMessage}>Send</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
