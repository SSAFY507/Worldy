import * as React from "react";
import { useState, useEffect } from "react";
import LoaderPyramid from "../components/Loaders/LoaderPyramid";
import CreateGame from "../components/create/CreateGame";
import Matching from "../components/create/Matching";
import Waiting from "../components/create/Waiting";

export default function Create() {
  const [mode, setMode] = useState<number>(0);
  const [matchingId, setMatchingId] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  const [loaded, setLoaded] = useState<boolean>(false);
  setTimeout(() => {
    setLoaded(true);
  }, 1000);

  useEffect(() => {
    console.log("matching Id 변경 감지");
    console.log(matchingId);
  }, [matchingId]);

  return (
    <div className="w-screen h-screen bg-white">
      <div>매칭용 임시 룸 id : {matchingId}</div>
      {mode === 0 && (
        <CreateGame
          setMode={setMode}
          setRoomId={setRoomId}
          setMatchingId={setMatchingId}
          roomId={roomId}
        />
      )}
      {mode === 1 && <Matching matchingId={matchingId} />}
      {mode === 2 && <Waiting roomId={roomId} />}
    </div>
  );
}
