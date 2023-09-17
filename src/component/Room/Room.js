import React, { useEffect, useState } from 'react';
import Particpant from '../Particpant/Particpant';


const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipant] = useState([]);
  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipant(prevParticipant => [...prevParticipant, participant]);
    }
    const participantdisConnected = (participant) => {
      setParticipant((prevParticipant) =>
        prevParticipant.filter((p) => p !== participant)
      );
    };
    room.on("participantConnected", participantConnected)
    room.on("participandisConnected", participantdisConnected);
    room.participants.forEach(participantConnected);
    return () => {
      // Clean up event listeners when the component unmounts
      room.off('participantConnected', participantConnected);
      room.off('participantDisconnected', participantdisConnected);
    };
  }, [room]);
  const remoteParticipants = participants.map((participant) => (
    <Particpant key={participant.id} participant={participant} />
  ));

  return (
    <div className='room'>
      <h2>Room:{roomName}</h2>
      <button onClick={handleLogout}>Leave Meeting </button>
      <div className='all-participants'>
        {room && (
          <Particpant key={room.localParticipant.sid} participant={room.localParticipant} />
        )}
        {remoteParticipants}

      </div>
    </div>
  )
}

export default Room
