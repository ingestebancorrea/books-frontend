import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try{
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        const { displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
        
    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const loginWithEmailPassword = async({ email, password }) => {
    try{
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photURL, displayName
        }
    }catch(error){
        return{
            ok: false,
            errorMessage: error.message
        }
    }
}

export const registerUserWithEmailPasswortd = async( { email, password, displayName } ) => {
    try{
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        
        updateProfile( FirebaseAuth.currentUser, { displayName } );//Conocer usuario actual

        return {
            ok: true,
            uid, photoURL, displayName
        }
    }catch(error){
        return{
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}