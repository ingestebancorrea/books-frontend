import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPasswortd, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./";

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );//Llamado  de acciones

        const result = await signInWithGoogle();
        if (!result.ok) {
            dispatch(logout(result.errorMessage));
        } else {
            dispatch(login(result));
            return true;
        }
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword({ email, password });

        if ( !result.ok ) {
           dispatch( logout(result) );
           return false;
        }else{
            dispatch( login( result ) );
            return true;
        }
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPasswortd({email, password, displayName});
        console.log(photoURL);

        if( !ok ) {
            dispatch( logout({errorMessage}) );
            return false;
        }else{
            dispatch( login( { uid, displayName, email, photoURL } ) );
            return true;
        }
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();

        dispatch( logout({}) );
    }
}