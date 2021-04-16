import React, { useEffect, useState, useContext } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import Axios from 'axios';
import SweetRanking from '../components/topRanking/SweetTopRanking';
import OverallRanking from '../components/overalllRanking/OverallRanking';
import { AuthContext } from './_app';

const useStyles = makeStyles({
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
});

type data = {
  id: string;
  name: string;
  evaluation: number;
};

type Props = {
  sweetsData: data[];
};

const Index: React.FC<Props> = () => {
  const [sweetRanking, setsweetRanking] = useState([]);
  const [userRanking, setUserRanking] = useState([]);
  const classes = useStyles();
  const { currentUser, login } = useContext(AuthContext);
  const postButton = () => {
    if (currentUser) {
      return (
        <Button
          variant="outlined"
          className={classes.reviewButton}
          onClick={() => Router.push('/new-review')}
        >
          投稿する
        </Button>
      );
    }
    return (
      <Button
        variant="outlined"
        className={classes.reviewButton}
        onClick={() => login()}
      >
        投稿をするにはログインをしてください
      </Button>
    );
  };
  useEffect(() => {
    const getRanking = async () => {
      const sweetRanking = await Axios.get('/api/sweets/ranking');
      const userRanking = await Axios.get('/api/users/ranking');
      setUserRanking(userRanking.data.reviewTotal);
      setsweetRanking(sweetRanking.data.sortedSweetsRankingData);
    };
    getRanking();
  }, []);
  return (
    <div className={classes.top}>
      <div className={classes.section}>
        <div className={classes.sweetRanking}>
          <Grid container spacing={3}>
            <SweetRanking sweetsData={sweetRanking} />
          </Grid>
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.totalRanking}>
          <Grid container spacing={8}>
            <OverallRanking sweetRanking={sweetRanking} userRanking={userRanking} />
          </Grid>
        </div>
      </div>
      {postButton()}
    </div>
  );
};

export default Index;
