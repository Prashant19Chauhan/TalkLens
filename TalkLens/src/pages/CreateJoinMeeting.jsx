import { useState } from 'react';
import { useSelector } from 'react-redux';

const CreateJoinMeeting = () => {

  const {currentUser} = useSelector(state => state.user);
  const{name, uid} = currentUser;
  const [meetingId, setMeetingId] = useState('');
  const [meetingName, setMeetingName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission for creating or joining a meeting
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isCreating && meetingName) {
      // Logic to create a new meeting
      try{
        const response = await fetch('/api/meeting/create', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({meetingName: meetingName, hostName: name, userId:uid }),
        })
        const data = await response.json()

        if(data.success==true){
          const meetingId = data.roomId;
          console.log(meetingId)
          setIsLoading(false);
        }

      }catch(err){
        console.log(err);
        setIsLoading(false)
      }
      console.log(`Creating meeting with name: ${meetingName}`);
      // Redirect to the created meeting room or similar
    } else if (!isCreating && meetingId) {
      // Logic to join a meeting with the provided ID
      try{
        const response = await fetch('/api/meeting/join', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({roomId: meetingId, userId: uid}),
        })
        const data = await response.json()
        if(data.success==true){
          const meetingId = data.roomId;
          console.log(meetingId)
          setIsLoading(false);
        }
        
      }catch(err){
        console.log(err);
        setIsLoading(false)
      }
      console.log(`Joining meeting with ID: ${meetingId}`);
      // Redirect to the meeting room or similar
    } else {
      alert('Please provide valid input');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Create or Join a Meeting</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Toggle between creating and joining a meeting */}
          <div className="mb-4 flex justify-center gap-6">
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className={`px-4 py-2 rounded-md ${isCreating ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Create Meeting
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className={`px-4 py-2 rounded-md ${!isCreating ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Join Meeting
            </button>
          </div>

          {/* Conditional form based on whether creating or joining */}
          {isCreating ? (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Name</label>
              <input
                type="text"
                value={meetingName}
                onChange={(e) => setMeetingName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter meeting name"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Meeting ID</label>
              <input
                type="text"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter meeting ID"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {isLoading ?<span>loading...</span> : (isCreating ? 'Create Meeting' : 'Join Meeting')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJoinMeeting;
