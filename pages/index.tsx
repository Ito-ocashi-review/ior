import React, { useEffect, useState } from 'react';
import {
  Button, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Router from 'next/router';
import Axios from 'axios';
import SweetRanking from '../components/topRanking/SweetRanking';
import TotalRanking from '../components/totalRanking/TotalRanking';
import firebase from '../Firebase';

const MySwal = withReactContent(Swal);

const provider = new firebase.auth.GoogleAuthProvider();

const handleFirebaseLogout = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  console.log('logoutするよ');
};

const useStyles = makeStyles(theme => ({
  top: {
    color: '#270000',
    height: '100vh',
    textAlign: 'center',
  },
  section: {
    margin: '80px 50px',
  },
  title: {
    fontSize: '100px',
    font: 'MotoyalMaru',
  },
  sweetRanking: {
    margin: '30px 0',
  },
  reviewButton: {
    color: 'black',
    border: '2px solid #984B15',
    backgroundColor: '#984B15',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#984B15',
      borderRadius: '30px',
      transition: 'all 0.2s linear',
    },
  },
  totalRanking: {
    margin: '30px 0',
  },
}));

type data = {
  id: string,
  name: string,
  evaluation: number,
}

type Props ={
  sweetsData: data[]
}

const Index: React.FC<Props> = ({ sweetsData }) => {
  const [sweetRanking, setsweetRanking] = useState([]);
  const [user, setUser] = useState('ログインユーザはいません');

  const handleFirebaseLogin = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential as firebase.auth.OAuthCredential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user.displayName);
      // ...
      }).catch((error) => {
      // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
      // ...
      });
  };

  const classes = useStyles();

  useEffect(() => {
    const getRanking = async() => {
      const ranking = await Axios.get('/api/sweets/ranking');
      setsweetRanking(ranking.data.sortedSweetsRankingData);
    };
    getRanking();
  }, []);

  return (
    <div className={classes.top}>
      <div className={classes.section}>
        <span className={classes.title}>お菓子ランキングトップ３</span>
        <div className={classes.sweetRanking}>
          <Grid container spacing={3}>
            <SweetRanking sweetsData={sweetRanking} />
          </Grid>
        </div>
      </div>
      <div className={classes.section}>
        <span className={classes.title}>総合ランキング</span>
        <div className={classes.totalRanking}>
          <Grid container spacing={8}>
            <TotalRanking />
          </Grid>
        </div>
        <span>ログインユーザ:{user}</span><br />
        <button type="button" onClick={() => handleFirebaseLogin()}>firebaseのログイン</button>
        <button type="button" onClick={() => handleFirebaseLogout()}>firebaseのログアウト</button>
      </div>

      <Button
        variant="outlined"
        className={classes.reviewButton}
        onClick={() => Router.push('/new-review')}
      >
        投稿する
      </Button>
    </div>
  );
};

export default Index;
