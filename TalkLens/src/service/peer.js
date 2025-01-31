export function createPeer(signalingChannel) {
  const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
  const peerConnection = new RTCPeerConnection(configuration);

  async function makeCall() {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    return offer;
  }

  async function handleOffer(message) {
    if (message.offer) {
      const remoteDesc = new RTCSessionDescription(message.offer);
      await peerConnection.setRemoteDescription(remoteDesc);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      signalingChannel.send({ answer });
    }
  }

  return {
    peerConnection,
    makeCall,
    handleOffer,
  };
}
