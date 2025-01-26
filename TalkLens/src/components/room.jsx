import { useState } from "react";
import ReactPlayer from 'react-player'

function Room() {
    const [myStream, setMyStream] = useState(null);

    const media = async() => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video: true,
        });
        setMyStream(stream)
    }

  return (
    <div>
        <button onClick={media}>click me</button>
      {myStream && <ReactPlayer playing muted height="300px" width="300px" url={myStream}/>}
    </div>
  )
}

export default Room
