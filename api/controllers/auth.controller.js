import admin from "firebase-admin";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password || name==='' || email==='' || password===''){
    return res.status(400).json({message: 'fill all the information'})
  }

  try {
    const FindUser = await User.findOne({email});
    console.log(FindUser);
    if(FindUser){
        return res.status(400).json({message: 'user already exist'})
    }
    else{
        const userRecord = await admin.auth().createUser({
            displayName: name,
            email: email,
            password: password,
            emailVerified: false,
        });
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
    console.error('Error creating user:', error);

    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'Email already in use.' }); 
    } else if (error.code === 'auth/weak-password') {
      return res.status(400).json({ error: 'Password is too weak.' });
    } 

    return res.status(500).json({ error: 'An error occurred during user registration.' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log(userCredential);

    
    return res.status(200).json({ message: 'Login successful', uid: user.uid }); 
  } catch (error) {
    console.error('Login error:', error);

    if (error.code === 'auth/user-not-found') {
      return res.status(401).json({ error: 'User not found.' });
    } else if (error.code === 'auth/wrong-password') {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    return res.status(500).json({ error: 'An error occurred during login.' });
  }
};

export const googleAuth = async (req, res) => {
  const {name, email, photoURL} = req.body;
   const FindUser = await User.findOne({email});
   try{
        if(FindUser){
            //login logic
        }
    
        else{
            //register logic
        }
   }
   catch(err){
    console.log(err);
    return res.status(500).json({message: "internal server error"})
   }
};