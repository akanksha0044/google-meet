import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from './App'; // Import the useAppContext hook correctly
import Video from 'twilio-video'; // Correct typo 'Vedio' to 'Video'
import { render } from '@testing-library/react';
import Room from './component/Room/Room';
import Header from './component/header/Header';
import Main from './component/main/Main';

const VideoChat = ({ setLoading, loading }) => {
  const [roomName, setRoomName] = useState(uuidv4); // Fix typo in state name
  const [room, setRoom] = useState(null);
  const [username, setUsername] = useState("");
  const { currentUser, appState, connecting, setConnecting } = useAppContext(); // Use the correct hook
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.email);
    }
  }, [currentUser]);

  const handleSubmit = useCallback(async () => {
    setConnecting(true);

    const data = await fetch("video/token", {
      method: "POST",
      body: JSON.stringify({
        identity: username,
        room: roomName,
      }),
      headers: {
        "Content-type": "application/json"
      }
    }).then((res) => res.json());

    Video.connect(data.token, {
      name: roomName,
    }).then((room) => {
      setConnecting(false);
      setRoom(room);
    })
      .catch((err) => {
        console.log(err);
        setConnecting(false);
      });
  }, [roomName, username]);

  const handleLogout = useCallback(() => {
    if (room) {
      room.localParticipant.tracks.forEach((trackPub) => {
        trackPub.track.stop();
      });
      room.disconnect();
    }
  }, [room]);

  useEffect(() => {
    const tidyUp = (event) => {
      if (event.persisted) {
        return;
      }
      handleLogout();
    };

    window.addEventListener("pagehide", tidyUp);
    window.addEventListener("beforeunload", tidyUp);

    return () => {
      window.removeEventListener("pagehide", tidyUp);
      window.removeEventListener("beforeunload", tidyUp);
    };
  }, [handleLogout]);

  let render;
  if (room) {
    render = (
      <Room roomName={roomName} room={room} handleSubmit={handleSubmit} />
    )
  } else {
    render = (
      <>
        <Header setLoading={setLoading} loading={loading} />
        {connecting ? <h1>Loading :</h1> : null}{
          <Main
            username={username}
            roomName={roomName}
            handleSubmit={handleSubmit}

            setRoomName={setRoomName}
          />
        }
      </>
    );
  }
  return render;
};

export default VideoChat;
