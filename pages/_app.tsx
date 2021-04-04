import React, { ReactElement, useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import NavBar from '../components/navbar';
import firebase from '../Firebase';

export const AuthContext = React.createContext(null);

const MyApp = (props: AppProps): ReactElement => {
  const { Component, pageProps } = props;

  const [currentUser, setCurrentUser] = useState(null);
  const provider = new firebase.auth.GoogleAuthProvider();

  const login = async () => {
    firebase.auth().signInWithPopup(provider);
    // .then((result) => {
    //   // const credential = result.credential as firebase.auth.OAuthCredential;
    //   // // This gives you a Google Access Token. You can use it to access the Google API.
    //   // const token = credential.accessToken;
    //   // // The signed-in user info.
    //   // const user = result.user;
    //   // // ...
    // });
    // .catch((error) => {
    //   // // Handle Errors here.
    //   // const errorCode = error.code;
    //   // const errorMessage = error.message;
    //   // // The email of the user's account used.
    //   // const email = error.email;
    //   // // The firebase.auth.AuthCredential type that was used.
    //   // const credential = error.credential;
    //   // // ...
    // });
  };

  const logout = async () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    firebase.auth().onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        currentUser,
      }}
    >
      <NavBar />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default MyApp;
