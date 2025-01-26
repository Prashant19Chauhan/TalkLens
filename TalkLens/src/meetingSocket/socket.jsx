import { socket } from '../context/socketProvider';
import { useState } from "react";

import ConnectionState from '../components/ConnectionState';
import Events from '../components/Events';
import ConnectionManager from '../components/ConnectionManager';

function socketpage() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    
  return (
    <div>
      <ConnectionState isConnected={ isConnected }/>
      <Events events={ fooEvents } />
      <ConnectionManager/>
    </div>
  )
}

export default socketpage
