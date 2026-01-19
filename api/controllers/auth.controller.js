import admin from "firebase-admin";
import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password || name==='' || email==='' || password===''){
    return next(errorHandler(400, "fill all the information"));
  }


  try {
    const FindUser = await User.findOne({email});
    if(FindUser){
      return next(errorHandler(400, 'user already exist'))
    }
    else{
        const userRecord = await admin.auth().createUser({
            displayName: name,
            email: email,
            password: password,
        });
        console.log(userRecord)
        const firebaseId = userRecord.uid;
        const newUser = new User({
            firebaseId,
            name,
            email,
        })

        await newUser.save();
        return res.status(201).json({ message: 'User created successfully.' }); 
    }
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      return next(errorHandler(400, 'Email already in use.'))
    } else if (error.code === 'auth/invalid-password') {
      return next(errorHandler( 400, 'Password is too weak.'))
    } 

    return next(errorHandler( 500, 'An error occurred during user registration.'))
  }
};

export const login = async (req, res, next) => {
  const { idToken } = req.body;

  try {
    if (!idToken) {
      return next(errorHandler(400, 'ID token is required' ))
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid, email, name } = decodedToken;

    return res
              .status(201)
              .cookie("access_token", idToken,{httpOnly: true,})
              .json({ message: 'Login successful', uid: uid, name: name, email:email }); 
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return next(errorHandler(401, 'User not found.' ))
    } else if (error.code === 'auth/wrong-password') {
      return next(errorHandler(401, 'Invalid password.' ))
    }

    return next(errorHandler(500, 'An error occurred during login.' ))
  }
};

export const googleAuth = async (req, res, next) => {
  const { idToken } = req.body;
  console.log(idToken);
  
  try {
    if (!idToken) {
      return next(errorHandler(400, 'ID token is required' ))
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log(decodedToken);

    const { uid, email, name } = decodedToken;

    const FindUser = await User.findOne({email});
    if(!FindUser){
      console.log(2)
      const newUser = new User({
        uid: uid,
        name: name,
        email: email,
      })

      await newUser.save();
    }
    console.log(1);
    return res
              .status(201)
              .cookie("access_token", idToken,{httpOnly: true,})
              .json({ message: 'Login successful', uid: uid, name: name, email: email }); 
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return next(errorHandler(401, 'User not found.' ))
    } else if (error.code === 'auth/wrong-password') {
      return next(errorHandler(401, 'Invalid password.' ))
    }

    return next(errorHandler(500, 'An error occurred during login.' ))
  }
};