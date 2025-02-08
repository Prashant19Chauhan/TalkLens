import Meeting from '../models/Meeting.js';
import { errorHandler } from "../utils/error.js";

// Create a new meeting
export const createMeeting = async (req, res, next) => {
    const { meetingName, hostName, userId } = req.body;
    try {
        const newMeeting = new Meeting({
            hostName,
            meetingName,
            ownerId:userId,
            participants: [userId],
        });
        await newMeeting.save();
        return res.status(200).json({ roomId: newMeeting._id, hostName, meetingName, ownerId:userId, success:true });
    } catch (error) {
        return next(errorHandler(400, "Can't create meeting. Try again."));
    }
};

// Join an existing meeting
export const joinMeeting = async (req, res, next) => {
    const { roomId, userId } = req.body;
    try {
        const meeting = await Meeting.findById(roomId);
        const ownerId = meeting.ownerId;
        const noParticipants = meeting.participants.length;
        const isUserExist = Meeting.findOne({participants:userId});
        if (meeting && noParticipants<=1){
            if(!isUserExist){
                meeting.participants.push(userId);
                await meeting.save();
            }
            return res.status(200).json({ success: true, roomId, userId, ownerId });
        } else {
            return next(errorHandler(404, "Room is full."));
        }
    } catch (error) {
        return next(errorHandler(400, "Can't join meeting. Try again."));
    }
};

// Exit a meeting
export const exitMeeting = async (req, res, next) => {
    const { userId, roomId } = req.body;

    try {
        const meeting = await Meeting.findById(roomId);

        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found or already closed." });
        }

        // Remove the user from the participants array
        await Meeting.findByIdAndUpdate(roomId, {
            $pull: { participants: userId },
        });

        // Check if participants array is empty
        const updatedMeeting = await Meeting.findById(roomId);
        if (updatedMeeting.participants.length === 0) {
            // If no participants, close the meeting
            await Meeting.deleteOne({ _id: roomId });
            return res.status(200).json({ message: "Meeting closed as no participants remain." });
        }

        return res.status(200).json({ message: "User exited the meeting successfully." });
    } catch (error) {
        return next(errorHandler(500, "Can't exit the meeting. Please try again."));
    }
};

// Close a meeting manually
export const closeMeeting = async (req, res, next) => {
    const { hostName, roomId } = req.body;
    try {
        const meeting = await Meeting.findById(roomId);
        if (!meeting) {
            return res.status(404).json({ message: "Meeting already closed or not found." });
        }

        if (hostName === meeting.hostName) {
            await Meeting.deleteOne({ _id: roomId });
            return res.status(200).json({ message: "Meeting closed successfully." });
        } else {
            return res.status(403).json({ message: "You don't have access to close this meeting." });
        }
    } catch (error) {
        return next(errorHandler(500, "Can't close the meeting. Please try again."));
    }
};
