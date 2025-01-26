import { socket } from '../context/socketProvider';

export default function ConnectionManager() {
  function connect() {
    socket.connect();
    console.log(socket)
  }

  function disconnect() {
    socket.disconnect();
    console.log(socket)
  }

  return (
    <>
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
    </>
  );
}