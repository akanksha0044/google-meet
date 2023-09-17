import React, { useEffect, useRef, useState } from 'react'

const Particpant = ({ participant }) => {
    const [videoTracks, setVideoTracks] = useState([])
    const [audioTracks, setaudioTracks] = useState([])
    const videoRef = useRef();
    const audioRef = useRef();
    const trackpubsToTracks = (trackMap) =>
        Array.from(trackMap.values())
            .map((publication) => publication.track)
            .filter((track) => track !== null);
    useEffect(() => {
        setVideoTracks(trackpubsToTracks(participant.videoTracks));
        setaudioTracks(trackpubsToTracks(participant.audioTracks));
        const trackSubscribed = (track) => {
            if (track.kind === "video") {
                setVideoTracks((videoTracks) => [...videoTracks, track])
            } else if (track.kind === "audio") {
                setaudioTracks((audioTracks) => [...audioTracks, track])
            }
        };
        const trackUnSubscribed = (track) => {
            if (track.kind === "video") {
                setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track))
            } else if (track.kind === "audio") {
                setaudioTracks((audioTracks) => audioTracks.filter((a) => a !== track))
            }
        }
        participant.on("trackSubscribed", trackSubscribed);
        participant.on("trackUnSubscribed", trackUnSubscribed);
        return () => {
            setVideoTracks([])
            setaudioTracks([])
            participant.removeAllListenrs();
        }
    }, [participant])
    useEffect(() => {
        const videoTrack = videoTracks[0];
        if (videoTrack) {
            videoTrack.attach(videoRef.current)
            return () => {
                videoTrack.detach();
            }
        }
    }, [videoTracks])
    useEffect(() => {
        const audioTrack = audioTracks[0];
        if (audioTrack) {
            audioTrack.attach(audioRef.current)
            return () => {
                audioTrack.detach();
            }
        }
    }, [audioTracks])
    return (
        <div className='participant'>
            <h1>{participant.identy}</h1>
            <video ref={videoRef} autoplay />
            <audio ref={audioRef} autoplay muted />

        </div>
    )
}

export default Particpant
