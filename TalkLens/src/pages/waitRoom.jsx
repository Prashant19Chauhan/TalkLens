import { useEffect } from "react"
import { socket } from "../context/socketProvider";

function waitRoom() {
    const to="hlo"
    const offer="hii"
    useEffect(()=>{
        console.log('calling');
        socket.emit("user-call", {to, offer})
    })
  return (
    <div>
      Wait admin will soon add you to the meeting
    </div>
  )
}

export default waitRoom
